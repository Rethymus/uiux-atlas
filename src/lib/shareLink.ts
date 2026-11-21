import { serializeParamValue, type ParamStore } from "./store";
import type { EntrySchema, Param, ParamValue } from "./types";

/**
 * 分享参数链接(快照序列化 ↔ hash 恢复),供 PromptExport(生成)与
 * DemoStage(恢复)两端共用。约定格式:`#s=name=value&name2=value2`,
 * 键值均经 encodeURIComponent(值内的 = & # 自然转义,按首个 = 切分即可还原)。
 *
 * 值编码:除 shadow 外全部走 store.serializeParamValue(即面板/复刻 Prompt
 * 里的展示字符串,人读 URL 也能对上参数值);shadow 是多层复合值,展示串
 * 无法无损还原,改用 JSON 编码(hash 值 encodeURIComponent 后仍是合法 URL)。
 */

const HASH_PREFIX = "#s=";

/** 当前快照 → "#s=name=value&…"(value 已 encodeURIComponent) */
export function buildShareHash(schema: EntrySchema, get: (name: string) => ParamValue): string {
  const parts = schema.params.map((p) => {
    const raw = p.type === "shadow" ? JSON.stringify(get(p.name)) : serializeParamValue(p, get(p.name));
    return `${encodeURIComponent(p.name)}=${encodeURIComponent(raw)}`;
  });
  return `${HASH_PREFIX}${parts.join("&")}`;
}

/** 完整分享链接 = 去掉现有 hash 的当前地址 + "#s=…" */
export function buildShareLink(schema: EntrySchema, get: (name: string) => ParamValue): string {
  const base = window.location.href.split("#")[0];
  return `${base}${buildShareHash(schema, get)}`;
}

/** 解析 "#s=…" → Record<参数名, 原始字符串>;非 #s= 开头返回空对象 */
export function parseShareHash(hash: string): Record<string, string> {
  if (!hash.startsWith(HASH_PREFIX)) return {};
  const out: Record<string, string> = {};
  for (const kv of hash.slice(HASH_PREFIX.length).split("&")) {
    if (!kv) continue;
    const i = kv.indexOf("=");
    if (i <= 0) continue;
    try {
      out[decodeURIComponent(kv.slice(0, i))] = decodeURIComponent(kv.slice(i + 1));
    } catch {
      // 畸形百分号编码:丢弃该键值,不中断整体恢复
    }
  }
  return out;
}

const LEADING_NUM = /^-?\d*\.?\d+/;
const BEZIER_RE = /cubic-bezier\(\s*([^)]+)\)/;

/**
 * hash 字符串 → ParamValue(按参数类型换回);不可还原的值返回 undefined,
 * 调用方跳过该参数(恢复恒为「有则更、无则跳」,绝不抛错)。
 * 数值型按 schema min/max 收敛(与 ParamPanel commit 同法)。
 */
export function decodeParamValue(p: Param, raw: string): ParamValue | undefined {
  switch (p.type) {
    case "dimension":
    case "number": {
      const m = raw.trim().match(LEADING_NUM);
      if (!m) return undefined;
      const n = Number(m[0]);
      if (!Number.isFinite(n)) return undefined;
      return Math.min(p.max, Math.max(p.min, n));
    }
    case "color":
      return raw.trim() === "" ? undefined : raw.trim();
    case "enum":
      return p.options.some((o) => o.value === raw) ? raw : undefined;
    case "cubicBezier": {
      const m = raw.match(BEZIER_RE);
      if (!m) return undefined;
      const nums = m[1].split(",").map((s) => Number(s.trim()));
      if (nums.length !== 4 || nums.some((n) => !Number.isFinite(n))) return undefined;
      return [nums[0], nums[1], nums[2], nums[3]];
    }
    case "shadow": {
      try {
        const arr: unknown = JSON.parse(raw);
        if (!Array.isArray(arr) || arr.length === 0) return undefined;
        const layers = arr.filter(
          (l): l is Record<string, unknown> =>
            typeof l === "object" &&
            l !== null &&
            Number.isFinite((l as Record<string, unknown>).x) &&
            Number.isFinite((l as Record<string, unknown>).y) &&
            Number.isFinite((l as Record<string, unknown>).blur) &&
            typeof (l as Record<string, unknown>).color === "string",
        );
        if (layers.length === 0) return undefined;
        return layers.map((l) => ({
          x: l.x as number,
          y: l.y as number,
          blur: l.blur as number,
          spread: Number.isFinite(l.spread) ? (l.spread as number) : 0,
          color: l.color as string,
        }));
      } catch {
        return undefined;
      }
    }
  }
}

/**
 * 挂载时从 location.hash 恢复参数快照:仅恢复 schema 中存在的参数
 * (逐参数 store.set;非法/越界值经 decodeParamValue 过滤或收敛)。
 */
export function applyShareHash(store: ParamStore, schema: EntrySchema): void {
  if (typeof window === "undefined") return;
  const values = parseShareHash(window.location.hash);
  for (const p of schema.params) {
    const raw = values[p.name];
    if (raw === undefined) continue;
    const v = decodeParamValue(p, raw);
    if (v !== undefined) store.set(p.name, v);
  }
}
