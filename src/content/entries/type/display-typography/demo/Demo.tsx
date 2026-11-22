import { useEffect, useMemo, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** SF Pro 官方 tracking 曲线锚点(调研 01§2.2,HIG Typography §Tracking values 66 行实抓;em = ‱/1000) */
const SF_CURVE: [size: number, em: number][] = [
  [11, 0.006], [12, 0], [13, -0.006], [15, -0.016], [17, -0.026],
  [20, -0.023], [22, -0.012], [24, 0.003], [28, 0.014], [34, 0.012],
  [40, 0.01], [48, 0.008], [56, 0.006], [64, 0.004], [72, 0.002], [80, 0], [96, 0],
];

/** 分段线性插值(pt 档位按 1x 折算近似) */
function sfTracking(px: number): number {
  const pts = SF_CURVE;
  if (px <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    if (px <= pts[i][0]) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      return y0 + ((px - x0) / (x1 - x0)) * (y1 - y0);
    }
  }
  return pts[pts.length - 1][1];
}

/** apple.com 实测行高比锚点(调研 01§2.3):56→1.0714、40→1.10、28→1.1429、19→1.2105、12→1.3334 */
const LH_ANCHORS: [size: number, lh: number][] = [
  [12, 1.3334], [17, 1.2354], [19, 1.2105], [28, 1.1429], [40, 1.1], [48, 1.0835], [56, 1.0714], [96, 1.0714],
];

function suggestedLh(px: number): number {
  const pts = LH_ANCHORS;
  if (px <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    if (px <= pts[i][0]) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      return y0 + ((px - x0) / (x1 - x0)) * (y1 - y0);
    }
  }
  return pts[pts.length - 1][1];
}

/* 曲线小图 SVG:把锚点画成折线,x=12..96px,y=-0.03..+0.02em */
const CHART_W = 260;
const CHART_H = 84;
function curvePoints(): [number, number][] {
  return SF_CURVE.map(([s, em]) => [
    ((s - 8) / (100 - 8)) * CHART_W,
    CHART_H / 2 - em * (CHART_H / 0.055),
  ]);
}
const POLYLINE = curvePoints().map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

const css = `
.dt-stage { padding: 12px; display: flex; flex-direction: column; gap: 10px; }
.dt-spec {
  border: 1px solid color-mix(in srgb, currentColor 16%, transparent);
  border-radius: 10px; padding: 16px 18px; overflow: hidden;
}
.dt-line {
  font-size: var(--dt-size); font-weight: var(--dt-weight);
  line-height: 1.12; letter-spacing: var(--dt-tracking);
  font-family: inherit; margin: 0; white-space: nowrap;
}
.dt-stage[data-mode="auto"] .dt-line { letter-spacing: var(--dt-auto, 0em); }
.dt-caption { margin: 8px 0 0; font-size: 12px; opacity: 0.62; }
.dt-panels { display: flex; flex-wrap: wrap; gap: 10px; align-items: stretch; }
.dt-chart { border: 1px solid color-mix(in srgb, currentColor 16%, transparent);
  border-radius: 10px; padding: 10px 12px; }
.dt-chart svg { display: block; }
.dt-chart .dot { transition: cx 0.15s ease, cy 0.15s ease; }
.dt-read { display: flex; flex-direction: column; gap: 5px; flex: 1; min-width: 210px; }
.dt-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px;
  padding: 3px 10px; border-radius: 999px; width: fit-content;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  font-variant-numeric: tabular-nums; }
.dt-badge strong { font-weight: 650; }
.dt-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (prefers-reduced-motion: reduce) {
  .dt-chart .dot { transition: none; }
}
`;

/**
 * 展示级排版演示:size/weight/manualTracking 为 CSS 变量型参数(经 DemoStage 注入);
 * trackingMode 为 JS 型参数——auto 模式下 SF 曲线插值经 --dt-auto 内联到样张,
 * manual 模式直接用 --dt-tracking(默认 −0.02em = 本站 hero 档)。
 * 曲线小图为官方锚点折线(01§2.2),游标随字号移动;行高比读数出自 apple.com 实测锚点(01§2.3)。
 * 无动画样张;游标过渡在 prefers-reduced-motion 时关闭。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [tick, setTick] = useState(0);
  const [trackingMode, setTrackingMode] = useState(() => store.get("trackingMode") as string);

  useEffect(
    () =>
      store.subscribe(() => {
        setTrackingMode(store.get("trackingMode") as string);
        setTick((n) => n + 1);
      }),
    [store],
  );

  const size = store.get("size") as number;
  const weight = store.get("weight") as number;
  const manual = store.get("manualTracking") as number;
  void tick;

  const autoEm = useMemo(() => sfTracking(size), [size]);
  const applied = trackingMode === "auto" ? autoEm : manual;
  const lh = suggestedLh(size).toFixed(4);
  const dot = curvePoints()[SF_CURVE.findIndex(([s]) => s >= size)] ?? curvePoints()[curvePoints().length - 1];
  const manualDotX = ((size - 8) / (100 - 8)) * CHART_W;
  const manualDotY = CHART_H / 2 - manual * (CHART_H / 0.055);
  const dotX = trackingMode === "auto" ? dot[0] : manualDotX;
  const dotY = trackingMode === "auto" ? dot[1] : manualDotY;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="dt-stage" data-mode={trackingMode} style={{ "--dt-auto": `${autoEm.toFixed(4)}em` } as React.CSSProperties}>
        <div className="dt-panels">
          <div className="dt-chart" aria-hidden="true">
            <svg width={CHART_W} height={CHART_H} role="img">
              <line x1="0" x2={CHART_W} y1={CHART_H / 2} y2={CHART_H / 2}
                stroke="currentColor" strokeOpacity="0.25" strokeDasharray="3 3" />
              <polyline points={POLYLINE} fill="none" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" />
              <circle className="dot" cx={dotX} cy={dotY} r="4"
                fill="oklch(0.62 0.17 255)" stroke="none" />
              <text x="4" y={CHART_H - 2} fontSize="9" fill="currentColor" opacity="0.6">8px</text>
              <text x={CHART_W - 26} y={CHART_H - 2} fontSize="9" fill="currentColor" opacity="0.6">96px</text>
              <text x="4" y="10" fontSize="9" fill="currentColor" opacity="0.6">+em</text>
              <text x="4" y={CHART_H / 2 - 3} fontSize="9" fill="currentColor" opacity="0.6">0</text>
            </svg>
          </div>
          <div className="dt-read">
            <span className="dt-badge">trackingMode <strong>{trackingMode}</strong></span>
            <span className="dt-badge">应用字距 <strong>{applied >= 0 ? "+" : ""}{applied.toFixed(4)}em</strong>
              {trackingMode === "auto" ? "(SF 曲线插值)" : "(手动)"}</span>
            <span className="dt-badge">字号 <strong>{size}px</strong> · 字重 <strong>{weight}</strong>(wght 轴)</span>
            <span className="dt-badge">建议行高比 <strong>{lh}</strong>(apple.com 实测锚点插值)</span>
            <span className="dt-badge">本站 hero 档 <strong>48px / −0.02em / 1.12</strong></span>
            <span className="dt-badge">apple.com 56px 档 <strong>600 / −0.005em / 1.0714</strong></span>
          </div>
        </div>
        <div className="dt-spec">
          <p className="dt-line">Display 展示级排版 0123</p>
          <p className="dt-caption">
            字号越大字距越紧、行高比越低——样张行高固定 1.12(本站 hero 同款);
            auto 模式下字距随上方游标在 SF 官方曲线上移动。
            注意原生曲线与网页实践在 48–56px 段的分歧(+0.006 vs −0.005/−0.02em),两套数值并列如实展示。
          </p>
        </div>
        <p className="dt-note">
          曲线锚点:SF Pro tracking(HIG Typography §Tracking values,66 行实抓,调研 01§2.2;
          17pt −26‱ 全曲线最紧、80pt+ 归零);行高比锚点:apple.com 网页实测(01§2.3);
          本站手法:--step-5 clamp + lh 1.12 + ls −0.02em(src/styles/global.css:163、883-888)。
          pt 档按 1x 折算近似,曲线用于教学感知而非像素复刻。
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
