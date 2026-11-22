import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
// 四个区域、同一单位(指数),确定性数据;色板 = Okabe-Ito(R grDevices 固化 hex,调研 08§1.1)
const REGIONS = [
  { zh: "华东", en: "East", hex: "#0072B2", values: [62, 66, 71, 68, 76, 82, 79, 85, 88, 84, 90, 93] },
  { zh: "华南", en: "South", hex: "#E69F00", values: [48, 52, 49, 58, 63, 61, 70, 66, 74, 78, 72, 81] },
  { zh: "华北", en: "North", hex: "#009E73", values: [30, 34, 41, 38, 45, 42, 50, 55, 51, 58, 63, 60] },
  { zh: "西部", en: "West", hex: "#D55E00", values: [22, 19, 26, 31, 28, 35, 33, 40, 38, 44, 41, 47] },
];

// 刻度上限:极值向上取整到 10 的倍数(简单取整,非 nice-ticks——面板够小,一把尺就够)
const niceCeil = (v: number) => Math.ceil(v / 10) * 10;
const SHARED_MAX = niceCeil(Math.max(...REGIONS.flatMap((r) => r.values))); // 100:同标度 = 全部面板共用
const RIGHT_MAX = niceCeil(Math.max(...REGIONS.slice(2).flatMap((r) => r.values))); // 70:双轴右轴
const indepMax = (r: (typeof REGIONS)[number]) => niceCeil(Math.max(...r.values));

const PW = 300;
const PH = 190;
const PM = { top: 34, right: 12, bottom: 26, left: 38 };
// 网格透明度 0.09:与坐标轴条目同源(Grafana getGridColor 9% 公式,08§5.2;此处无参数,写死保持跨条目一致)
const GRID_OP = 0.09;

const css = `
.sm-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 16px 18px 10px; }
.sm-grid {
  flex: 1; min-height: 0;
  display: grid; grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 1fr);
  gap: var(--sm-gap, 8px);
}
.sm-grid svg { width: 100%; height: 100%; color: var(--text); transition: opacity 0.2s ease; }
.sm-single { flex: 1; min-height: 0; display: flex; justify-content: center; transition: opacity 0.2s ease; }
.sm-single svg { max-width: 100%; max-height: 100%; color: var(--text); }
.sm-readout { display: flex; flex-wrap: wrap; gap: 6px 8px; justify-content: center; font-size: 12px; color: var(--text-dim); }
.sm-chip { padding: 2px 10px; border: 1px solid var(--border); border-radius: 999px; background: var(--surface); font-variant-numeric: tabular-nums; }
.sm-chip b { color: var(--text); font-weight: 600; }
@media (prefers-reduced-motion: reduce) {
  .sm-grid svg, .sm-single { transition: none; }
}
`;

type Params = { layout: string; scaleMode: string };

/** 单个小倍数面板:基线 + 中线 + 上限刻度 + 一条线 + 标题直标(jfly 直标原则) */
function MiniPanel({ region, yMax }: { region: (typeof REGIONS)[number]; yMax: number }) {
  const x = (i: number) => PM.left + ((PW - PM.left - PM.right) * i) / (MONTHS.length - 1);
  const y = (v: number) => PM.top + (PH - PM.top - PM.bottom) * (1 - v / yMax);
  const last = region.values[region.values.length - 1];
  return (
    <svg
      viewBox={`0 0 ${PW} ${PH}`}
      role="img"
      aria-label={`${region.zh}${region.en}:1-12月指数走势,标度 0-${yMax},最新 ${last}`}
    >
      {/* 参考层:基线/中线/上限线,极浅(Grafana 9% 公式,写死) */}
      {[0, yMax / 2, yMax].map((t) => (
        <line
          key={t}
          x1={PM.left}
          x2={PW - PM.right}
          y1={y(t)}
          y2={y(t)}
          stroke="currentColor"
          style={{ opacity: GRID_OP }}
        />
      ))}
      <text x={PM.left - 8} y={y(0) + 4} textAnchor="end" fontSize="11" fill="var(--text-dim)">0</text>
      <text x={PM.left - 8} y={y(yMax) + 4} textAnchor="end" fontSize="11" fill="var(--text-dim)">{yMax}</text>
      {/* 面板标题:系列名 + 最新值直标(jfly:图上直标优于远处对色图例) */}
      <text x={PM.left} y={20} fontSize="12" fontWeight="600" fill="var(--text)">
        {region.zh} {region.en}
        <tspan fill={region.hex}> ▲{last}</tspan>
      </text>
      <text x={PW - PM.right} y={20} textAnchor="end" fontSize="11" fill="var(--text-dim)">
        0–{yMax}
      </text>
      {/* 数据层 */}
      <polyline
        points={region.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")}
        fill="none"
        stroke={region.hex}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {region.values.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r="3" fill={region.hex}>
          <title>{`${region.zh} · ${MONTHS[i]} · ${v}`}</title>
        </circle>
      ))}
      {/* 类目轴:仅首末月份,小面板不放整排标签 */}
      <text x={x(0)} y={PH - 8} textAnchor="middle" fontSize="11" fill="var(--text-dim)">{MONTHS[0]}</text>
      <text x={x(MONTHS.length - 1)} y={PH - 8} textAnchor="middle" fontSize="11" fill="var(--text-dim)">{MONTHS[MONTHS.length - 1]}</text>
    </svg>
  );
}

/** 双轴混杂对照:同四条线塞一张图,左轴 0–100(华东/华南)、右轴 0–70(华北/西部) */
function DualAxisChart() {
  const W = 620;
  const H = 340;
  const m = { top: 26, right: 56, bottom: 40, left: 50 };
  const plotW = W - m.left - m.right;
  const plotH = H - m.top - m.bottom;
  const x = (i: number) => m.left + (plotW * i) / (MONTHS.length - 1);
  const yL = (v: number) => m.top + plotH * (1 - v / SHARED_MAX);
  const yR = (v: number) => m.top + plotH * (1 - v / RIGHT_MAX);
  const leftTicks = [0, 50, 100];
  const rightTicks = [0, 35, 70];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="双轴混杂对照图:华东华南走左轴 0-100,华北西部走右轴 0-70;交叉点不构成比较"
    >
      {/* 参考层(浅网格,9%) */}
      {[...leftTicks, 25, 75].map((t) => (
        <line key={`gl${t}`} x1={m.left} x2={m.left + plotW} y1={yL(t)} y2={yL(t)} stroke="currentColor" style={{ opacity: GRID_OP }} />
      ))}
      {/* 左轴(0–100)与右轴(0–70)刻度标签 */}
      {leftTicks.map((t) => (
        <text key={`lt${t}`} x={m.left - 8} y={yL(t) + 4} textAnchor="end" fontSize="12" fill="var(--text-dim)">{t}</text>
      ))}
      {rightTicks.map((t) => (
        <text key={`rt${t}`} x={m.left + plotW + 8} y={yR(t) + 4} textAnchor="start" fontSize="12" fill="var(--text-dim)">{t}</text>
      ))}
      <text x={m.left} y={16} fontSize="11" fill="var(--text-dim)">左轴 0–100(华东/华南)</text>
      <text x={m.left + plotW} y={16} textAnchor="end" fontSize="11" fill="var(--text-dim)">右轴 0–70(华北/西部)</text>
      {/* 类目轴标签 */}
      {MONTHS.map((mo, i) =>
        i % 2 === 0 ? (
          <text key={mo} x={x(i)} y={m.top + plotH + 18} textAnchor="middle" fontSize="12" fill="var(--text-dim)">{mo}</text>
        ) : null,
      )}
      {/* 数据层:左轴组按 0–100 归一,右轴组按 0–70 归一——各自被自己的轴拉伸 */}
      {REGIONS.map((r) => {
        const onRight = r.en === "North" || r.en === "West";
        const y = onRight ? yR : yL;
        return (
          <g key={r.en}>
            <polyline
              points={r.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")}
              fill="none"
              stroke={r.hex}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {r.values.map((v, i) => (
              <circle key={i} cx={x(i)} cy={y(v)} r="3" fill={r.hex}>
                <title>{`${r.zh} · ${MONTHS[i]} · ${v}${onRight ? `(右轴)` : `(左轴)`}`}</title>
              </circle>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/**
 * 小倍数演示:同标度小面板阵列 vs 双轴混杂反面对照。
 * layout / scaleMode 为 JS 型参数——订阅 store 后切换视图;
 * panelGap 为 CSS 变量型(--sm-gap 注入 .demo-stage,CSS grid gap 消费)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = (): Params => ({
    layout: store.get("layout") as string,
    scaleMode: store.get("scaleMode") as string,
  });
  const [params, setParams] = useState(readParams);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  const isDual = params.layout === "dual-axis";
  const shared = params.scaleMode === "shared";

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="sm-stage">
        {isDual ? (
          <div className="sm-single">
            <DualAxisChart />
          </div>
        ) : (
          <div className="sm-grid">
            {REGIONS.map((r) => (
              <MiniPanel key={r.en} region={r} yMax={shared ? SHARED_MAX : indepMax(r)} />
            ))}
          </div>
        )}
        <div className="sm-readout">
          <span className="sm-chip">
            {isDual
              ? (
                <>双轴混杂:左轴 <b>0–100</b> / 右轴 <b>0–70</b> —— 华北被右轴拉高,与华东的交叉点纯属标度巧合</>
              )
              : shared
                ? (
                  <>同标度 <b>0–{SHARED_MAX}</b>:四面板一把尺,线高即大小(Tufte 定义性要求)</>
                )
                : (
                  <>独立标度:{REGIONS.map((r) => `${r.zh} 0–${indepMax(r)}`).join(" / ")} —— 仅强调相对变化,量级比较失效(Wikipedia 变体)</>
                )}
          </span>
          <span className="sm-chip">
            间距 <b>var(--sm-gap)</b>(默认 8px = Grafana GRID_CELL_VMARGIN)
          </span>
          <span className="sm-chip">色板 Okabe-Ito(R grDevices 固化值)· 面板标题直标最新值(jfly)</span>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
