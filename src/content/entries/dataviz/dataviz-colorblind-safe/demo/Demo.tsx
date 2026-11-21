import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type SimId = "normal" | "deuteranopia" | "protanopia" | "tritanopia";

const SIM_OPTIONS: { id: SimId; zh: string; en: string }[] = [
  { id: "normal", zh: "正常", en: "Normal" },
  { id: "deuteranopia", zh: "绿盲", en: "Deutan" },
  { id: "protanopia", zh: "红盲", en: "Protan" },
  { id: "tritanopia", zh: "蓝盲", en: "Tritan" },
];

// feColorMatrix 3×3 系数:社区流传的 Machado et al. 2009 severity=1 矩阵
// (社区常见值,未证实——调研只记载模型机制,未记载系数原文)。
// 已知偏差:feColorMatrix 直接作用于 sRGB 编码值 = 调研点名的流行 bug(整体偏暗)。
const CVD_MATRICES: Record<Exclude<SimId, "normal">, string> = {
  protanopia:
    "0.152386 1.052583 -0.204968 0 0  0.114506 0.786281 0.099216 0 0  -0.003882 -0.048116 1.051998 0 0  0 0 0 1 0",
  deuteranopia:
    "0.367322 0.860646 -0.227968 0 0  0.11978 0.916484 -0.036264 0 0  -0.01009 0.029069 0.981061 0 0  0 0 0 1 0",
  tritanopia:
    "1.255528 -0.076749 -0.178779 0 0  -0.078411 0.930809 0.147602 0 0  0.004733 0.691367 0.3039 0 0  0 0 0 1 0",
};

// Okabe-Ito(R grDevices 固化值):故意入选红绿混淆对(朱红 vs 蓝绿),让崩溃可见
const SERIES = [
  { zh: "朱红", en: "vermillion", hex: "#D55E00", pattern: "cvd-pat-hatch", dash: "none", marker: "circle" },
  { zh: "蓝绿", en: "bluish green", hex: "#009E73", pattern: "cvd-pat-cross", dash: "10 6", marker: "square" },
  { zh: "蓝", en: "blue", hex: "#0072B2", pattern: "cvd-pat-dots", dash: "3 5", marker: "diamond" },
];

const CATS = ["Q1", "Q2", "Q3", "Q4"];
// 柱图:3 系列 × 4 类目
const BAR_DATA = [
  [62, 48, 71, 58],
  [55, 63, 49, 66],
  [40, 52, 58, 44],
];
// 折线:3 系列 × 8 点
const LINE_DATA = [
  [30, 44, 52, 47, 61, 58, 70, 66],
  [55, 50, 58, 54, 63, 60, 68, 64],
  [36, 41, 38, 48, 45, 55, 50, 58],
];

const BW = 300;
const BH = 210;
const LW = 300;
const LH = 210;
const M = { top: 14, right: 10, bottom: 26, left: 30 };
const Y_MAX = 100;

const css = `
.cb-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; padding: 16px 18px 10px; }
.cb-toolbar { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
.cb-toolbar button {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text-dim);
  background: var(--surface);
}
.cb-toolbar button[aria-pressed="true"] { background: var(--accent-dim); border-color: var(--accent); color: var(--text); }
.cb-charts { flex: 1; min-height: 0; display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; align-items: center; }
.cb-charts figure { margin: 0; filter: var(--cvd-filter, none); }
.cb-charts figcaption { font-size: 11px; color: var(--text-dim); text-align: center; margin-top: 2px; }
.cb-charts svg { display: block; max-width: 100%; }
.cb-note { text-align: center; font-size: 11.5px; line-height: 1.5; color: var(--text-faint); }
`;

/** 折线标记形状(冗余编码) */
function Marker({ x, y, shape, fill }: { x: number; y: number; shape: string; fill: string }) {
  const s = 4.5;
  if (shape === "square") return <rect x={x - s} y={y - s} width={s * 2} height={s * 2} fill={fill} />;
  if (shape === "diamond") return <rect x={x - s} y={y - s} width={s * 2} height={s * 2} fill={fill} transform={`rotate(45 ${x} ${y})`} />;
  return <circle cx={x} cy={y} r={s} fill={fill} />;
}

/**
 * 色盲安全演示:同一组柱图+折线图,四种模拟视图(feColorMatrix 滤镜)× 冗余编码开关。
 * simulation / redundancy 均为 JS 型参数——订阅 store。
 * 滤镜经 CSS 变量 --cvd-filter 注入 figure;矩阵系数为社区流传值,已如实标注。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({
    simulation: store.get("simulation") as SimId,
    redundancy: store.get("redundancy") as string,
  });
  const [params, setParams] = useState(readParams);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  const sim = params.simulation;
  const red = params.redundancy === "on";
  const filterVar = sim === "normal" ? "none" : `url(#cvd-filter-${sim})`;

  const barGroupW = (BW - M.left - M.right) / CATS.length;
  const barW = Math.min(30, (barGroupW / SERIES.length) * 0.7);
  const yBar = (v: number) => M.top + (BH - M.top - M.bottom) * (1 - v / Y_MAX);

  const lx = (i: number) => M.left + ((LW - M.left - M.right) * i) / (LINE_DATA[0].length - 1);
  const yLine = (v: number) => M.top + (LH - M.top - M.bottom) * (1 - v / Y_MAX);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="cb-stage">
        {/* SVG 滤镜定义(对图表 figure 施加) */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
          <defs>
            {(Object.keys(CVD_MATRICES) as Exclude<SimId, "normal">[]).map((id) => (
              <filter id={`cvd-filter-${id}`} key={id} colorInterpolationFilters="sRGB">
                <feColorMatrix type="matrix" values={CVD_MATRICES[id]} />
              </filter>
            ))}
            {/* 冗余纹理:斜线 / 交叉 / 圆点 */}
            <pattern id="cvd-pat-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="6" height="6" fill="none" />
              <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" />
            </pattern>
            <pattern id="cvd-pat-cross" width="7" height="7" patternUnits="userSpaceOnUse">
              <rect width="7" height="7" fill="none" />
              <path d="M0 3.5 H7 M3.5 0 V7" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" />
            </pattern>
            <pattern id="cvd-pat-dots" width="7" height="7" patternUnits="userSpaceOnUse">
              <rect width="7" height="7" fill="none" />
              <circle cx="3.5" cy="3.5" r="1.5" fill="rgba(255,255,255,0.9)" />
            </pattern>
          </defs>
        </svg>

        <div className="cb-toolbar" role="group" aria-label="模拟模式切换 Simulation mode switcher">
          {SIM_OPTIONS.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={sim === o.id}
              onClick={() => store.set("simulation", o.id)}
            >
              {o.zh} {o.en}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={red}
            onClick={() => store.set("redundancy", red ? "off" : "on")}
          >
            冗余编码 {red ? "On" : "Off"}
          </button>
        </div>

        <div className="cb-charts" style={{ "--cvd-filter": filterVar } as React.CSSProperties}>
          {/* 图 A:分组柱状图 */}
          <figure>
            <svg viewBox={`0 0 ${BW} ${BH}`} width={BW} role="img" aria-label="分组柱状图 Grouped bar chart">
              {[0, 50, 100].map((v) => (
                <line key={v} x1={M.left} x2={BW - M.right} y1={yBar(v)} y2={yBar(v)} stroke="currentColor" opacity="0.14" />
              ))}
              {CATS.map((c, qi) => (
                <g key={c}>
                  {SERIES.map((s, si) => {
                    const v = BAR_DATA[si][qi];
                    const x = M.left + barGroupW * qi + (barGroupW - barW * SERIES.length) / 2 + si * barW;
                    return (
                      <g key={s.en}>
                        <rect x={x} y={yBar(v)} width={barW - 2} height={yBar(0) - yBar(v)} fill={s.hex} />
                        {red && (
                          <rect x={x} y={yBar(v)} width={barW - 2} height={yBar(0) - yBar(v)} fill={`url(#${s.pattern})`} opacity="0.55" />
                        )}
                      </g>
                    );
                  })}
                  <text x={M.left + barGroupW * qi + barGroupW / 2} y={BH - 8} textAnchor="middle" fontSize="10.5" fill="var(--text-dim)">
                    {c}
                  </text>
                </g>
              ))}
            </svg>
            <figcaption>柱 Bars</figcaption>
          </figure>

          {/* 图 B:折线图 */}
          <figure>
            <svg viewBox={`0 0 ${LW} ${LH}`} width={LW} role="img" aria-label="折线图 Line chart">
              {[0, 50, 100].map((v) => (
                <line key={v} x1={M.left} x2={LW - M.right} y1={yLine(v)} y2={yLine(v)} stroke="currentColor" opacity="0.14" />
              ))}
              {SERIES.map((s, si) => (
                <g key={s.en}>
                  <polyline
                    points={LINE_DATA[si].map((v, i) => `${lx(i)},${yLine(v)}`).join(" ")}
                    fill="none"
                    stroke={s.hex}
                    strokeWidth="2.5"
                    strokeDasharray={red && s.dash !== "none" ? s.dash : undefined}
                  />
                  {LINE_DATA[si].map((v, i) =>
                    red ? <Marker key={i} x={lx(i)} y={yLine(v)} shape={s.marker} fill={s.hex} /> : null,
                  )}
                </g>
              ))}
            </svg>
            <figcaption>线 Lines</figcaption>
          </figure>
        </div>

        <p className="cb-note">
          {sim === "normal"
            ? "绿盲/红盲下朱红与蓝绿会塌成相近色——切到模拟视图亲自验证。"
            : "注意朱红与蓝绿系列的塌缩;打开冗余编码后靠纹理/线型/标记仍可区分。"}
          {" "}feColorMatrix 直接作用于 sRGB(近似,偏暗);系数为社区流传 Machado 2009 值,未证实。
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
