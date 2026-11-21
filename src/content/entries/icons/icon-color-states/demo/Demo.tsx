import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.cs-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px;
}
/* 宿主一行:唯一 color 声明,图标 + 文字全部 currentColor 跟随 */
.cs-line {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 12px 18px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.1);
  transition: color 0.2s ease;
}
.cs-scene[data-state="default"] .cs-line { color: #1192e8; }
.cs-scene[data-state="hover"] .cs-line { color: #002d9c; }
.cs-scene[data-state="danger"] .cs-line { color: #da1e28; }
.cs-line svg {
  opacity: calc(var(--cs-opacity, 100) / 100);
  transition: opacity 0.15s ease;
}
.cs-label { font-size: 14px; }
.cs-swatchrow { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.cs-swatch {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
}
.cs-swatch i {
  width: 16px;
  height: 16px;
  border-radius: 5px;
  border: 1px solid rgba(15, 23, 42, 0.15);
}
.cs-panel {
  min-width: 250px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  background: #f8fafc;
  padding: 10px 16px;
  text-align: center;
}
.cs-ratio {
  font-family: var(--font-mono, monospace);
  font-size: 20px;
  font-weight: 650;
}
.cs-ratio.cs-pass { color: #15803d; }
.cs-ratio.cs-fail { color: #da1e28; }
.cs-verdict { font-size: 12px; color: rgba(0, 0, 0, 0.55); }
.cs-note {
  max-width: 470px;
  font-size: 12px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
}
@media (prefers-reduced-motion: reduce) {
  .cs-line, .cs-line svg { transition: none; }
}
`;

const STATE_HEX: Record<string, string> = {
  default: "#1192e8",
  hover: "#002d9c",
  danger: "#da1e28",
};

/** WCAG 相对亮度 + 对白底混合核算(官方 1.4.11 公式) */
function channel(v: number): number {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function luminance(r: number, g: number, b: number): number {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}
function ratioOnWhite(hex: string, alpha: number): number {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const mix = (c: number) => Math.round(c * alpha + 255 * (1 - alpha));
  const l1 = luminance(mix(r), mix(g), mix(b));
  const l2 = luminance(255, 255, 255);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const ARTS = {
  star: <polygon points="12,3.6 14.5,8.8 20.3,9.5 16.1,13.5 17.2,19.3 12,16.5 6.8,19.3 7.9,13.5 3.7,9.5 9.5,8.8" />,
  bell: (
    <>
      <path d="M18.2 9.2a6.2 6.2 0 0 0-12.4 0c0 5.6-2.3 7-2.3 7h17c0 0-2.3-1.4-2.3-7z" />
      <path d="M10.4 19.8a1.9 1.9 0 0 0 3.2 0" />
    </>
  ),
  bolt: <path d="M13.5 2.75 6 13.5h4.9L10.5 21.25 18 10.5h-4.9z" />,
} as const;

function Icon({ art }: { art: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={22}
      height={22}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {art}
    </svg>
  );
}

/**
 * 图标色彩与状态演示:state 为 JS 型参数(驱动宿主 color),opacity 为 CSS 变量型
 * (--cs-opacity 注入,svg 整体透明度);对比度面板按 WCAG 1.4.11 官方公式实时核算。
 * 状态色 = IBM Carbon 数据可视化色板已核实值(08 §1.3,Apache-2.0):
 * default #1192e8(Cyan 50)/ hover #002d9c(Blue 80 深档,官方未定义 hover 色的演示替代)/ danger #da1e28。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [state, setState] = useState(() => store.get("state") as string);
  const [opacity, setOpacity] = useState(() => store.get("opacity") as number);

  useEffect(
    () =>
      store.subscribe(() => {
        setState(store.get("state") as string);
        setOpacity(store.get("opacity") as number);
      }),
    [store],
  );

  const hex = STATE_HEX[state] ?? STATE_HEX.default;
  const ratio = ratioOnWhite(hex, opacity / 100);
  const pass = ratio >= 3;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="cs-scene" data-state={state}>
        <div className="cs-line">
          <Icon art={ARTS.star} />
          <Icon art={ARTS.bell} />
          <Icon art={ARTS.bolt} />
          <span className="cs-label">收藏 · 通知 · 快速操作</span>
        </div>
        <div className="cs-swatchrow">
          <span className="cs-swatch"><i style={{ background: "#1192e8" }} /> default #1192e8</span>
          <span className="cs-swatch"><i style={{ background: "#002d9c" }} /> hover #002d9c</span>
          <span className="cs-swatch"><i style={{ background: "#da1e28" }} /> danger #da1e28</span>
        </div>
        <div className="cs-panel">
          <div className={`cs-ratio ${pass ? "cs-pass" : "cs-fail"}`} aria-live="polite">
            {ratio.toFixed(2)}:1 {pass ? "≥ 3:1 通过" : "< 3:1 失败"}
          </div>
          <div className="cs-verdict">
            (图标色 × {opacity}%) 混白后 vs 白底 · WCAG 1.4.11
          </div>
        </div>
        <p className="cs-note">
          宿主一处 color,图标与文字全部 currentColor 跟随(CSS Color 4 §6.4);拖低透明度,对比度实时跌破
          3:1 即标红。Carbon 官方未定义 hover 色,#002d9c 取同板已核实深档作演示语义(已标注)。
          One host color re-inks icons and text via currentColor; drag opacity down and the live
          3:1 check turns red the moment it fails.
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
