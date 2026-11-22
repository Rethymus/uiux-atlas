import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import { contrastRatio, oklchToSrgb } from "@/lib/color";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 0–1 域 gamma sRGB 三元组(本文件局部类型;函数从 @/lib/color 取,类型不从其导入) */
type Rgb01 = [number, number, number];

const hexToRgb01 = (h: string): Rgb01 => {
  const m = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(m.slice(i, i + 2), 16) / 255) as Rgb01;
};
const rgb01ToHex = (rgb: Rgb01) =>
  "#" + rgb.map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("").toUpperCase();

/* ---------- 三套主题 primitive 值(补研 12§11 片段逐字):
   blue oklch(0.62 0.19 250) / crimson oklch(0.58 0.2 20) / forest oklch(0.6 0.15 150)
   本会话离线复算:sRGB #0088F2(越域裁剪)/ #D73246 / #25984D;
   白字对比 3.62 / 4.74 / 3.70:1;on-brand(white 85%)对品牌底 3.06 / 3.90 / 3.13:1;
   深字 on soft(白底近似)15.07 / 14.62 / 15.00:1 ---------- */

type ThemeKey = "blue" | "crimson" | "forest";

const THEMES: Record<ThemeKey, { l: number; c: number; h: number; oklch: string }> = {
  blue: { l: 0.62, c: 0.19, h: 250, oklch: "oklch(0.62 0.19 250)" },
  crimson: { l: 0.58, c: 0.2, h: 20, oklch: "oklch(0.58 0.2 20)" },
  forest: { l: 0.6, c: 0.15, h: 150, oklch: "oklch(0.6 0.15 150)" },
};

/** oklab 域混色(color-mix in oklab 等价):lerp L/a/b 后转回 oklch 域取 sRGB */
function mixInOklab(a: { l: number; c: number; h: number }, b: { l: number; c: number; h: number }, pctA: number) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const ax = a.c * Math.cos(rad(a.h)), ay = a.c * Math.sin(rad(a.h));
  const bx = b.c * Math.cos(rad(b.h)), by = b.c * Math.sin(rad(b.h));
  const t = pctA / 100;
  const L = a.l * t + b.l * (1 - t);
  const A = ax * t + bx * (1 - t);
  const B = ay * t + by * (1 - t);
  return { l: L, c: Math.hypot(A, B), h: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360 };
}
const WHITE = { l: 1, c: 0, h: 0 };

const css = `
.tk-scene {
  position: absolute; inset: 0; display: flex; gap: 14px; padding: 16px; background: #ffffff;
  /* ── 第 1 层 primitive(主题相关,data-theme 只换这一行)── */
  --tk-brand: #6b7280; /* 中性灰兜底,@supports 内按主题覆写 */
  /* ── 第 2 层 semantic(主题无关;color-mix 不支持时兜底保持中性灰,不冒认派生)── */
  --tk-primary: var(--tk-brand);
  --tk-primary-hover: #4b5563;
  --tk-primary-soft: #f3f4f6;
  --tk-border: rgba(107, 114, 128, 0.4);
  --tk-on-primary: #e5e7eb;
}
@supports (color: color-mix(in oklab, red, blue)) {
  .tk-scene[data-theme="blue"]    { --tk-brand: oklch(0.62 0.19 250); }
  .tk-scene[data-theme="crimson"] { --tk-brand: oklch(0.58 0.2 20); }
  .tk-scene[data-theme="forest"]  { --tk-brand: oklch(0.6 0.15 150); }
  .tk-scene {
    --tk-primary: var(--tk-brand);
    --tk-primary-hover: color-mix(in oklab, var(--tk-brand), black calc(var(--tk-hover-mix)));
    --tk-primary-soft: color-mix(in oklab, var(--tk-brand) calc(var(--tk-soft-bg)), transparent);
    --tk-border: color-mix(in oklab, var(--tk-brand) calc(var(--tk-border-mix)), transparent);
    --tk-on-primary: color-mix(in oklab, var(--tk-brand), white 85%);
  }
}
/* ── 第 3 层 component:零 hex,只消费语义变量 ── */
.tk-card {
  flex: 1.15; min-width: 0; border: 1px solid var(--tk-border); border-radius: 13px;
  padding: 14px 16px; display: flex; flex-direction: column; gap: 9px; background: #ffffff;
  animation: tk-in 0.4s ease-out both;
  transition: border-color 0.25s ease;
}
.tk-head { display: flex; align-items: center; gap: 9px; }
.tk-dot { width: 18px; height: 18px; border-radius: 50%; background: var(--tk-primary); transition: background-color 0.25s ease; }
.tk-head b { font-size: 14px; }
.tk-card p { margin: 0; font-size: 12px; line-height: 1.6; color: #5b6472; }
.tk-chipRow { display: flex; gap: 6px; flex-wrap: wrap; }
.tk-chip {
  padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600;
  background: var(--tk-primary-soft); color: #1c1b1f;
  border: 1px solid var(--tk-border);
  transition: background-color 0.25s ease, border-color 0.25s ease;
}
.tk-btn {
  width: fit-content; border: 0; border-radius: 999px; padding: 8px 18px;
  font-size: 12.5px; font-weight: 650; cursor: pointer;
  background: var(--tk-primary); color: var(--tk-on-primary);
  transition: background-color 0.25s ease;
}
.tk-btn:hover { background: var(--tk-primary-hover); }
.tk-panel { flex: 1; min-width: 265px; display: flex; flex-direction: column; gap: 8px; font-size: 12px; }
.tk-layer {
  background: #fff; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 11px; padding: 8px 11px;
  display: flex; flex-direction: column; gap: 3px;
  animation: tk-in 0.4s ease-out both;
}
.tk-layerTag { font-size: 10.5px; font-weight: 700; letter-spacing: 0.02em; color: #5b6472; }
.tk-layerTag[data-active="true"] { color: #0b1220; }
.tk-layerTag em { font-style: normal; color: #9aa3b2; font-weight: 500; }
.tk-code {
  font-family: ui-monospace, Consolas, monospace; font-size: 10.5px; color: #1c1b1f;
  white-space: pre-wrap; word-break: break-all; line-height: 1.5;
}
.tk-metric {
  display: flex; align-items: center; gap: 8px; background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 11px; padding: 8px 11px;
  animation: tk-in 0.4s ease-out both;
}
.tk-metric b { font-size: 15px; font-variant-numeric: tabular-nums; }
.tk-metric span { flex: 1; color: #5b6472; font-size: 10.5px; line-height: 1.4; }
.tk-badge { font-size: 10px; font-weight: 650; border-radius: 999px; padding: 2px 7px; }
.tk-badge[data-ok="true"] { background: oklch(0.86 0.09 150); color: oklch(0.35 0.09 150); }
.tk-badge[data-ok="false"] { background: oklch(0.88 0.07 25); color: oklch(0.42 0.15 25); }
.tk-chips { display: flex; gap: 2px; padding: 3px; border-radius: 999px; background: #e6e9ee; align-self: flex-start; }
.tk-chips button {
  border: 0; border-radius: 999px; padding: 4px 12px; font-size: 11.5px; cursor: pointer;
  color: #374151; background: transparent;
}
.tk-chips button[aria-pressed="true"] { background: #fff; font-weight: 650; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.14); }
.tk-note { font-size: 11px; color: #5b6472; line-height: 1.5; margin: 0; }
.tk-off { display: none; padding: 8px 11px; border-radius: 10px; background: #fff4e5; color: #7a4b00; font-size: 11px; }
@supports not (color: color-mix(in oklab, red, blue)) {
  .tk-off { display: block; }
}
@keyframes tk-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (max-width: 560px) {
  .tk-scene { flex-direction: column; overflow: auto; }
  .tk-panel { min-width: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .tk-card, .tk-layer, .tk-metric { animation: none; }
  .tk-btn, .tk-dot, .tk-chip, .tk-card { transition: none; }
}
`;

/**
 * 多主题 Token 演示:theme 为 JS 型参数(只改 data-theme = 只换 primitive 层);
 * softBg/borderMix/hoverMix 为 CSS 变量型参数(进语义层 color-mix 的 calc)。
 * JS 侧只做复核读数:品牌 hex、白字与 on-brand 的对比度(层结构本体全在 CSS)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const read = () => ({
    theme: store.get("theme") as ThemeKey,
    softBg: store.get("softBg") as number,
  });
  const [p, setP] = useState(read);

  useEffect(
    () =>
      store.subscribe(() => {
        setP(read());
      }),
    [store],
  );

  const t = THEMES[p.theme];
  const brandHex = rgb01ToHex(oklchToSrgb(t.l, t.c, t.h).rgb);
  // on-brand = color-mix(in oklab, brand, white 85%) → brand 15% + white 85%(补研 12§11 片段)
  const onBrand = mixInOklab(t, WHITE, 15);
  const onBrandHex = rgb01ToHex(oklchToSrgb(onBrand.l, onBrand.c, onBrand.h).rgb);
  // soft = color-mix(brand softBg%, transparent),场景为白底,透明混合按白底近似取 hex 复核
  const soft = mixInOklab(t, WHITE, p.softBg);
  const softHex = rgb01ToHex(oklchToSrgb(soft.l, soft.c, soft.h).rgb);

  const whiteOnBrand = contrastRatio(hexToRgb01("#FFFFFF"), hexToRgb01(brandHex));
  const onBrandOnBrand = contrastRatio(hexToRgb01(onBrandHex), hexToRgb01(brandHex));
  const darkOnSoft = contrastRatio(hexToRgb01("#1C1B1F"), hexToRgb01(softHex));

  const semanticCode = [
    `--tk-primary:        var(--tk-brand);`,
    `--tk-primary-hover:  color-mix(in oklab, var(--tk-brand),`,
    `                     black calc(var(--tk-hover-mix)));`,
    `--tk-primary-soft:   color-mix(in oklab, var(--tk-brand)`,
    `                     calc(var(--tk-soft-bg)), transparent);`,
    `--tk-border:         color-mix(in oklab, var(--tk-brand)`,
    `                     calc(var(--tk-border-mix)), transparent);`,
    `--tk-on-primary:     color-mix(in oklab, var(--tk-brand), white 85%);`,
  ].join("\n");

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="tk-scene" data-theme={p.theme}>
        <div className="tk-card">
          <div className="tk-head">
            <span className="tk-dot" aria-hidden="true" />
            <b>多品牌换肤 Multi-brand theme · {p.theme}</b>
          </div>
          <p>
            卡片/按钮/徽章的 CSS 一个字都没改——上面只重挂了 primitive 层的 --tk-brand。
            Not a byte of this card's CSS changed — only the primitive --tk-brand remounted above.
          </p>
          <div className="tk-chipRow">
            <span className="tk-chip">soft bg 语义底</span>
            <span className="tk-chip">border 语义边</span>
            <span className="tk-chip">on-primary 语义字</span>
          </div>
          <button type="button" className="tk-btn">
            主操作(hover 试加深)Action
          </button>
        </div>
        <div className="tk-panel">
          <div className="tk-chips" role="group" aria-label="主题 Theme(primitive 层)">
            {(Object.keys(THEMES) as ThemeKey[]).map((k) => (
              <button key={k} type="button" aria-pressed={p.theme === k} onClick={() => store.set("theme", k)}>
                {k}
              </button>
            ))}
          </div>
          <div className="tk-layer">
            <span className="tk-layerTag" data-active="true">
              ① primitive <em>每主题一行 · brand {brandHex}{p.theme === "blue" ? "(越域裁剪)" : ""}</em>
            </span>
            <span className="tk-code">{`--tk-brand: ${t.oklch};`}</span>
          </div>
          <div className="tk-layer">
            <span className="tk-layerTag">② semantic <em>主题无关 · color-mix 现场派生</em></span>
            <span className="tk-code">{semanticCode}</span>
          </div>
          <div className="tk-layer">
            <span className="tk-layerTag">③ component <em>零 hex · 只消费语义变量</em></span>
            <span className="tk-code">{`.tk-btn { background: var(--tk-primary);\n  color: var(--tk-on-primary); }\n.tk-btn:hover { background: var(--tk-primary-hover); }`}</span>
          </div>
          <div className="tk-metric">
            <b>{whiteOnBrand.toFixed(2)}:1</b>
            <span>白字 on 品牌底(三主题同配方实测 3.62 / 4.74 / 3.70——结论不跨主题搬运)</span>
            <span className="tk-badge" data-ok={whiteOnBrand >= 4.5}>
              AA {whiteOnBrand >= 4.5 ? "✓" : "✗"}
            </span>
          </div>
          <div className="tk-metric">
            <b>{onBrandOnBrand.toFixed(2)}:1</b>
            <span>
              on-brand({onBrandHex})on 品牌底:过 UI/大字档、不过正文 AA(3.06–3.90,补研 12§11 配方)
            </span>
            <span className="tk-badge" data-ok={onBrandOnBrand >= 4.5}>
              AA {onBrandOnBrand >= 4.5 ? "✓" : "✗"}
            </span>
          </div>
          <div className="tk-metric">
            <b>{darkOnSoft.toFixed(2)}:1</b>
            <span>深字(#1C1B1F)on soft 语义底({softHex}):淡底配深字是安全侧</span>
            <span className="tk-badge" data-ok={darkOnSoft >= 4.5}>
              AA {darkOnSoft >= 4.5 ? "✓" : "✗"}
            </span>
          </div>
          <p className="tk-off">
            当前浏览器不支持 color-mix(),语义层退化为中性灰兜底 token(@supports 回退),不冒认任何主题派生色。
          </p>
          <p className="tk-note">
            三套 primitive 值逐字取自补研 12§11 片段;三层架构为 Primer 实测分层 + Android「语义化分配 color
            role」同构(调研 06§10)。判定不四舍五入(调研 06§17);换主题 = 整组对比度重跑。
          </p>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
