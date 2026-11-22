import { useEffect, useState, type CSSProperties } from "react";
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

/* ---------- 三套 token 表 ----------
   light:M3 官方亮色基线 surface #FFFBFE / on-surface #1C1B1F / error #B3261E(调研 06§7);
   dark-semantic:表面阶为演示阶梯(L 0.17/0.21/0.25,官方逐档 elevation overlay 表调研未找到,06§13 已记录),
     文字 oklch(0.92 0.01 297)≈#E5E3EB(本会话实测三档对比 15.09/13.97/12.64);
   dark-inverted:light 值逐通道反转(教学反模式,代码即 invert 关系)。 ---------- */

const LIGHT = {
  canvas: "#FFFBFE",
  surface: "#FFFFFF",
  overlay: "#FFFFFF",
  fg: "#1C1B1F",
  badge: "#B3261E", // M3 error 官方基线(调研 06§7),作高饱和徽标样本
};
const invertHex = (h: string) =>
  rgb01ToHex(hexToRgb01(h).map((v) => 1 - v) as Rgb01);
const INVERTED = {
  canvas: invertHex(LIGHT.canvas),
  surface: invertHex(LIGHT.surface),
  overlay: invertHex(LIGHT.overlay),
  fg: invertHex(LIGHT.fg),
  badge: LIGHT.badge, // 反转策略原样保留高饱和徽标——反模式的一部分
};
const css = `
.dp-scene {
  position: absolute; inset: 0; display: flex; gap: 14px; padding: 16px;
  --dp-canvas: var(--dp-canvas-v, #FFFBFE);
  --dp-surface: var(--dp-surface-v, #FFFFFF);
  --dp-fg: var(--dp-fg-v, #1C1B1F);
  --dp-accent: var(--dp-accent-v, #6750A4);
  --dp-on-accent: var(--dp-on-accent-v, #FFFFFF);
  --dp-badge: var(--dp-badge-v, #B3261E);
  --dp-shadow: var(--dp-shadow-v, 0 6px 16px rgba(0, 0, 0, 0.18));
  background: var(--dp-canvas); color: var(--dp-fg);
  border-radius: 14px;
}
.dp-window {
  flex: 1.35; min-width: 0; display: flex; flex-direction: column; gap: 10px;
}
.dp-bar {
  padding: 9px 14px; border-radius: 11px; font-size: 12px; font-weight: 650;
  background: var(--dp-surface); box-shadow: var(--dp-shadow);
  transition: background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
  animation: dp-in 0.4s ease-out both;
}
.dp-card {
  flex: 1; padding: 14px 16px; border-radius: 13px;
  background: var(--dp-surface); box-shadow: var(--dp-shadow);
  display: flex; flex-direction: column; gap: 9px;
  transition: background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
  animation: dp-in 0.4s ease-out 60ms both;
}
.dp-card h3 { margin: 0; font-size: 15px; }
.dp-card p { margin: 0; font-size: 12px; line-height: 1.6; opacity: 0.8; }
.dp-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.dp-btn {
  border: 0; border-radius: 999px; padding: 7px 16px; font-size: 12.5px; font-weight: 600; cursor: pointer;
  background: var(--dp-accent); color: var(--dp-on-accent);
  transition: background-color 0.25s ease, color 0.25s ease;
}
.dp-badgeChip {
  padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 650;
  color: var(--dp-badge); border: 1px solid color-mix(in srgb, var(--dp-badge) 55%, transparent);
  background: color-mix(in srgb, var(--dp-badge) 12%, transparent);
  transition: color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}
.dp-figure {
  height: 58px; border-radius: 10px; position: relative; overflow: hidden;
  background: linear-gradient(120deg, #ffffff 0%, #e8ecf4 55%, #dfe6f1 100%);
}
.dp-figure::after {
  content: ""; position: absolute; inset: 0; background: rgba(8, 6, 12, var(--dp-dim, 0));
  transition: background-color 0.25s ease;
}
.dp-figure[data-glow="true"]::before {
  content: "白底图未处理 → 暗底上发光"; position: absolute; z-index: 1; inset-inline: 0; top: 50%;
  translate: 0 -50%; text-align: center; font-size: 10.5px; font-weight: 650; color: #451a1a;
}
.dp-panel { flex: 1; min-width: 240px; display: flex; flex-direction: column; gap: 8px; font-size: 12px; }
.dp-metric {
  background: #fff; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 11px;
  padding: 9px 11px; display: flex; align-items: center; gap: 9px;
  animation: dp-in 0.4s ease-out 120ms both;
}
.dp-metric b { font-size: 16px; font-variant-numeric: tabular-nums; }
.dp-metric span { flex: 1; color: #5b6472; font-size: 11px; line-height: 1.45; }
.dp-badge { font-size: 10px; font-weight: 650; border-radius: 999px; padding: 2px 8px; font-variant-numeric: tabular-nums; }
.dp-badge[data-ok="true"] { background: oklch(0.86 0.09 150); color: oklch(0.35 0.09 150); }
.dp-badge[data-ok="false"] { background: oklch(0.88 0.07 25); color: oklch(0.42 0.15 25); }
.dp-controls { display: flex; flex-direction: column; gap: 6px; }
.dp-chips { display: flex; gap: 2px; padding: 3px; border-radius: 999px; background: #e6e9ee; align-self: flex-start; }
.dp-chips button {
  border: 0; border-radius: 999px; padding: 4px 12px; font-size: 11.5px; cursor: pointer;
  color: #374151; background: transparent;
}
.dp-chips button[aria-pressed="true"] { background: #fff; font-weight: 650; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.14); }
.dp-legend { display: flex; flex-wrap: wrap; gap: 4px; }
.dp-legend span {
  font-size: 10.5px; font-weight: 600; padding: 2px 8px; border-radius: 999px;
  border: 1px dashed rgba(0, 0, 0, 0.25); color: #5b6472;
}
.dp-legend span[data-on="true"] { border-style: solid; color: #0b1220; background: #fff; }
.dp-note { font-size: 11px; color: #5b6472; line-height: 1.5; margin: 0; }
@keyframes dp-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (max-width: 560px) {
  .dp-scene { flex-direction: column; overflow: auto; }
}
@media (prefers-reduced-motion: reduce) {
  .dp-bar, .dp-card, .dp-metric { animation: none; }
  .dp-bar, .dp-card, .dp-btn, .dp-badgeChip, .dp-figure, .dp-figure::after { transition: none; }
}
`;

type Strategy = "light" | "dark-inverted" | "dark-semantic";
type Elevation = "base" | "raised" | "overlay";

const ELEV_IDX: Record<Elevation, number> = { base: 0, raised: 1, overlay: 2 };

/**
 * 暗色设计模式演示:三档策略(浅色参照 / 直接反转反模式 / 语义四模式)× 三档层级。
 * strategy/elevation 为 JS 型参数;accentLight/accentDark 为 CSS 变量型参数(demo 同时读值做对比度复核)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const read = () => ({
    strategy: store.get("strategy") as Strategy,
    elevation: store.get("elevation") as Elevation,
    accentLight: store.get("accentLight") as string,
    accentDark: store.get("accentDark") as string,
  });
  const [p, setP] = useState(read);

  useEffect(
    () =>
      store.subscribe(() => {
        setP(read());
      }),
    [store],
  );

  const { strategy, elevation, accentLight, accentDark } = p;
  const tier = ELEV_IDX[elevation];

  // 语义暗色表面阶:演示值(L 0.17/0.21/0.25,色相 297 低色度);官方逐档表未见于调研(06§13)
  const darkSurfaces = [oklchToSrgb(0.17, 0.012, 297).rgb, oklchToSrgb(0.21, 0.014, 297).rgb, oklchToSrgb(0.25, 0.016, 297).rgb].map(rgb01ToHex);
  const darkFg = rgb01ToHex(oklchToSrgb(0.92, 0.01, 297).rgb); // ≈ #E5E3EB
  // 高饱和徽标的暗色降饱和变体(演示值;M3 只给出 #B3261E/#6750A4→#D0BCFF 的提亮降饱和方向)
  const badgeDark = rgb01ToHex(oklchToSrgb(0.76, 0.075, 25).rgb);

  // 三档策略各自的 token 解析(canvas/表面/文字/accent/on-accent/徽标/阴影/图片压暗)
  const t =
    strategy === "light"
      ? {
          canvas: LIGHT.canvas,
          surface: tier === 0 ? LIGHT.canvas : tier === 1 ? LIGHT.surface : LIGHT.overlay,
          fg: LIGHT.fg,
          accent: accentLight,
          onAccent: "#FFFFFF", // M3 亮色 on-primary 官方基线(调研 06§7)
          badge: LIGHT.badge,
          shadow: "0 6px 16px rgba(0, 0, 0, 0.18)",
          dim: 0,
          glow: false,
        }
      : strategy === "dark-inverted"
        ? {
            canvas: INVERTED.canvas,
            surface: tier === 0 ? INVERTED.canvas : tier === 1 ? INVERTED.surface : INVERTED.overlay,
            fg: INVERTED.fg,
            accent: accentLight, // 反转策略:亮色 accent 原样上暗底——反模式核心
            onAccent: INVERTED.fg,
            badge: INVERTED.badge,
            shadow: "0 6px 16px rgba(0, 0, 0, 0.55)", // 纯黑加重阴影:黑底上不可辨——反模式
            dim: 0,
            glow: true, // 白底图不处理,暗底上发光
          }
        : {
            canvas: darkSurfaces[0],
            surface: darkSurfaces[tier],
            fg: darkFg,
            accent: accentDark,
            onAccent: "#381E72", // M3 暗色 on-primary 官方基线(调研 06§7),本会话实测 7.71:1
            badge: badgeDark,
            shadow: "0 6px 16px rgba(0, 0, 0, 0.32)", // 阴影保留但降权重:层级主要由表面提亮承载
            dim: 0.25, // 图片压暗 25%(演示值;Apple 只说「适当压暗」,无数字,调研 06§13)
            glow: false,
          };

  const textRatio = contrastRatio(hexToRgb01(t.fg), hexToRgb01(t.surface));
  const accentRatio = contrastRatio(hexToRgb01(t.accent), hexToRgb01(t.surface));
  const patternsOn = strategy === "dark-semantic";

  const vars = {
    "--dp-canvas-v": t.canvas,
    "--dp-surface-v": t.surface,
    "--dp-fg-v": t.fg,
    "--dp-accent-v": t.accent,
    "--dp-on-accent-v": t.onAccent,
    "--dp-badge-v": t.badge,
    "--dp-shadow-v": t.shadow,
    "--dp-dim": String(t.dim),
  } as CSSProperties;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="dp-scene" style={vars} data-strategy={strategy}>
        <div className="dp-window">
          <div className="dp-bar">窗口栏 Window bar(base 层)</div>
          <div className="dp-card">
            <h3>{strategy === "dark-semantic" ? "语义暗色卡片" : strategy === "dark-inverted" ? "直接反转卡片" : "浅色卡片"}</h3>
            <p>
              表面 {t.surface} · 文字 {t.fg}
              {strategy === "dark-inverted" && " · 三档层级无差异,层级表达失效"}
            </p>
            <div className="dp-row">
              <button type="button" className="dp-btn">主操作 Action</button>
              <span className="dp-badgeChip">状态 Status</span>
            </div>
            <div className="dp-figure" data-glow={t.glow} aria-hidden="true" />
          </div>
        </div>
        <div className="dp-panel">
          <div className="dp-metric">
            <b>{textRatio.toFixed(2)}:1</b>
            <span>
              正文/表面(WCAG;语义暗色三档实测 15.09 / 13.97 / 12.64,纯反转白黑 21:1 为过冲)
            </span>
            <span className="dp-badge" data-ok={textRatio >= 4.5}>
              AA {textRatio >= 4.5 ? "✓" : "✗"}
            </span>
          </div>
          <div className="dp-metric">
            <b>{accentRatio.toFixed(2)}:1</b>
            <span>accent/表面(非文本 3:1 闸;语义暗色 #D0BCFF 对暗表面实测 11.25:1)</span>
            <span className="dp-badge" data-ok={accentRatio >= 3}>
              3:1 {accentRatio >= 3 ? "✓" : "✗"}
            </span>
          </div>
          <div className="dp-controls">
            <div className="dp-chips" role="group" aria-label="策略 Strategy">
              {(["light", "dark-inverted", "dark-semantic"] as Strategy[]).map((s) => (
                <button key={s} type="button" aria-pressed={strategy === s} onClick={() => store.set("strategy", s)}>
                  {s === "light" ? "浅色参照" : s === "dark-inverted" ? "直接反转" : "语义四模式"}
                </button>
              ))}
            </div>
            <div className="dp-chips" role="group" aria-label="层级 Elevation">
              {(["base", "raised", "overlay"] as Elevation[]).map((e) => (
                <button key={e} type="button" aria-pressed={elevation === e} onClick={() => store.set("elevation", e)}>
                  {e === "base" ? "基面" : e === "raised" ? "抬升" : "浮层"}
                </button>
              ))}
            </div>
          </div>
          <div className="dp-legend" aria-label="四模式清单">
            <span data-on={patternsOn}>① 分层 base/elevated</span>
            <span data-on={patternsOn}>② 饱和度 提亮降饱和</span>
            <span data-on={patternsOn}>③ 阴影 → 表面提亮</span>
            <span data-on={patternsOn}>④ 品牌色换对 + 图片压暗</span>
          </div>
          <p className="dp-note">
            语义暗色的表面阶为演示值(官方逐档 elevation overlay 表未见于调研);M3 官方锚点:暗色 accent
            #D0BCFF / on-accent #381E72(调研 06§7)。Semantic dark surface values are a demo ladder; the
            official anchors are #D0BCFF / #381E72 (research 06 §7).
          </p>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
