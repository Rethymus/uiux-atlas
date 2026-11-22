import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.st-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 16px; color-scheme: light dark; }

/* ===== 第 2 层:semantic 语义变量(每主题一张映射表;值为演示映射,非官方 hex) ===== */
.st-scene {
  /* light 基座:表面/on-surface 取 M3 官方基线 #FFFBFE / #1C1B1F;accent/on-accent 取 M3 基线 #6750A4 / #FFFFFF(调研 06§7) */
  --st-bg: oklch(0.992 0.006 334);
  --st-fg: oklch(0.225 0.008 297);
  --st-fg-muted: oklch(0.55 0.01 297);
  --st-accent: #6750A4;
  --st-on-accent: #FFFFFF;
  --st-border-accent-muted: color-mix(in srgb, var(--st-accent) 40%, transparent);
}
.st-scene[data-theme="dark"] {
  /* dark accent 基线官方 #D0BCFF / on-primary #381E72(调研 06§7);表面为演示值 */
  --st-bg: oklch(0.19 0.01 297);
  --st-fg: oklch(0.92 0.01 297);
  --st-fg-muted: oklch(0.68 0.012 297);
  --st-accent: #D0BCFF;
  --st-on-accent: #381E72;
}
.st-scene[data-theme="dark-dimmed"] {
  --st-bg: oklch(0.23 0.008 297);
  --st-fg: oklch(0.88 0.008 297);
  --st-fg-muted: oklch(0.64 0.01 297);
  --st-accent: color-mix(in srgb, #D0BCFF 70%, oklch(0.7 0.02 297));
  --st-on-accent: oklch(0.16 0.01 297);
}
.st-scene[data-theme="light-high-contrast"] {
  --st-bg: #FFFFFF;
  --st-fg: #000000;
  --st-fg-muted: oklch(0.35 0.01 297);
  --st-accent: oklch(0.36 0.12 294);
  --st-on-accent: #FFFFFF;
  --st-border-accent-muted: color-mix(in srgb, var(--st-accent) 75%, transparent);
}
.st-scene[data-theme="dark-high-contrast"] {
  --st-bg: oklch(0.12 0.008 297);
  --st-fg: #FFFFFF;
  --st-fg-muted: oklch(0.8 0.008 297);
  --st-accent: oklch(0.88 0.09 298);
  --st-on-accent: oklch(0.12 0.008 297);
  --st-border-accent-muted: color-mix(in srgb, var(--st-accent) 75%, transparent);
}
/* colorblind / tritanopia:accent 移向蓝区 220°(Evil Martians 色相映射 蓝≈220°)——演示映射 */
.st-scene[data-theme="light-colorblind"], .st-scene[data-theme="light-tritanopia"] {
  --st-accent: oklch(0.55 0.15 220);
  --st-on-accent: #FFFFFF;
  --st-fg-muted: oklch(0.5 0.01 297);
}
.st-scene[data-theme="dark-colorblind"], .st-scene[data-theme="dark-tritanopia"] {
  --st-bg: oklch(0.19 0.01 297);
  --st-fg: oklch(0.92 0.01 297);
  --st-fg-muted: oklch(0.68 0.012 297);
  --st-accent: oklch(0.72 0.13 220);
  --st-on-accent: oklch(0.15 0.01 250);
}

/* ===== 第 3 层:component 组件(只消费语义变量,零具体色值) ===== */
.st-card {
  background-color: var(--st-bg, #ffffff);   /* 每条语义变量带兜底值 */
  color: var(--st-fg, #1c1b1f);
  border: 1px solid color-mix(in srgb, var(--st-fg) 14%, transparent);
  border-radius: 12px;
  padding: 14px 16px;
  display: flex; flex-direction: column; gap: 7px;
  transition: background-color 0.25s ease, color 0.25s ease;
}
.st-card h3 { margin: 0; font-size: 15px; font-weight: 650; }
.st-card p { margin: 0; font-size: 12px; line-height: 1.6; color: var(--st-fg-muted, #59636e); }
.st-badge {
  width: fit-content; font-size: 11px; padding: 2px 9px; border-radius: 999px;
  border: 1px solid var(--st-border-accent-muted, color-mix(in srgb, var(--st-accent) 40%, transparent));
  color: var(--st-accent);
}
.st-button {
  width: fit-content; border: 0; border-radius: 8px; padding: 6px 14px;
  font-size: 12px; font-weight: 600; cursor: pointer;
  background: var(--st-accent); color: var(--st-on-accent);
}
.st-card [data-role-hit="true"] { outline: 2px dashed var(--st-accent); outline-offset: 3px; }

/* ===== 映射面板(第 1+2 层的展开) ===== */
.st-panel {
  flex: 0 0 auto; font-family: ui-monospace, Consolas, monospace; font-size: 10.5px;
  line-height: 1.6; padding: 9px 11px; border-radius: 10px;
  background: rgb(16 19 26 / 0.92); color: #e8ecf5; white-space: pre; overflow: auto;
}
.st-panel .st-hit { color: #ffd479; font-weight: 700; }
.st-meta { display: flex; flex-wrap: wrap; gap: 6px; font-size: 12px; }
.st-chip { padding: 2px 9px; border-radius: 999px; border: 1px solid rgb(128 138 160 / 0.35); background: rgb(255 255 255 / 0.55); }
.st-note { font-size: 11px; opacity: 0.75; }
@media (max-width: 480px) {
  .st-scene { padding: 10px; }
  .st-panel { font-size: 9.5px; }
}
@media (prefers-reduced-motion: reduce) {
  .st-card { transition: none; }
}
`;

const ROLE_KEYS: Record<string, { primitive: string; usageZh: string; usageEn: string }> = {
  "bgColor-default": { primitive: "base.color.neutral.0", usageZh: "卡片底色", usageEn: "card surface" },
  "fgColor-muted": { primitive: "base.color.neutral.5", usageZh: "次级文字", usageEn: "muted text" },
  "borderColor-accent.muted": { primitive: "base.color.accent.3", usageZh: "强调描边", usageEn: "accent border" },
};

const LAYER_SNIPPETS: Record<string, (role: string, prim: string) => string> = {
  primitive: (role, prim) =>
    [
      `/* 第 1 层 primitive:原始值,序号即明度层级(经 style-dictionary 编译,调研 06§10) */`,
      `{`,
      `  "${prim}": { "$value": "#6750a4", "$type": "color" },`,
      `  /* 官方 README 的 alpha 变换写法(原形,blue.3 为官方示例键): */`,
      `  "border-${role}": { "$value": "{base.color.blue.3}", "alpha": 0.4 }`,
      `}`,
      `(demo 中 primitive 键名与色值为演示映射;官方值见 primer/primitives 仓库)`,
    ].join("\n"),
  semantic: (role, prim) =>
    [
      `/* 第 2 层 semantic:角色词命名,引用 primitive(Primer 实测分层,调研 06§10) */`,
      `{`,
      `  "${role}": {`,
      `    "$value": "{${prim}}",   /* 引用第 1 层,不落具体值 */`,
      `    "$type": "color",`,
      `    "$extensions": { "org.primer.lifecycle": "current" }  /* DTCG 扩展位 */`,
      `  }`,
      `}`,
      `/* 9 套主题 = 9 张这样的表:换表即换主题,组件零改动 */`,
    ].join("\n"),
  component: () =>
    [
      `/* 第 3 层 component:组件 CSS 只消费语义变量 + 兜底值 */`,
      `.card {`,
      `  background-color: var(--st-bg, #ffffff);`,
      `  color: var(--st-fg, #1c1b1f);`,
      `}`,
      `.card p { color: var(--st-fg-muted, #59636e); }`,
      `.badge { border: 1px solid var(--st-border-accent-muted); }`,
      `/* 全文件零 hex —— Android 文档:语义化分配 color role 而非具体值(调研 06§10) */`,
    ].join("\n"),
};

/**
 * 语义色三层架构演示:theme/role/layer 三个 JS 型参数。
 * theme → data-theme 重映射语义变量(9 套官方主题名;色值为演示映射);
 * role → 卡片上高亮该语义角色的宿主元素 + 面板行;
 * layer → 映射面板切换 primitive/semantic/component 三层定义。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({
    theme: store.get("theme") as string,
    role: store.get("role") as string,
    layer: store.get("layer") as string,
  });
  const [params, setParams] = useState(readParams);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  const { theme, role, layer } = params;
  const prim = ROLE_KEYS[role]?.primitive ?? "";
  const snippet = (LAYER_SNIPPETS[layer] ?? LAYER_SNIPPETS.semantic)(role, prim);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="st-scene" data-theme={theme}>
        <div className="st-card" data-role-hit={role === "bgColor-default"}>
          <h3>三层 token 卡片 Token-driven card</h3>
          <p data-role-hit={role === "fgColor-muted"}>
            组件 CSS 里没有一个 hex——换 9 张映射表,它就是 9 个主题。
            No hex in the component CSS — nine mapping sheets, nine themes.
          </p>
          <span className="st-badge" data-role-hit={role === "borderColor-accent.muted"}>
            {theme}
          </span>
          <button type="button" className="st-button">主操作 Action</button>
        </div>
        <pre className="st-panel">{snippet}</pre>
        <div className="st-meta">
          <span className="st-chip">theme: {theme}</span>
          <span className="st-chip">role: {role} → {prim}</span>
          <span className="st-note">主题名与三层结构为官方(Primer README,调研 06§10);颜色值为演示映射 / Theme names &amp; layering are official (Primer README); colors are illustrative mappings.</span>
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
