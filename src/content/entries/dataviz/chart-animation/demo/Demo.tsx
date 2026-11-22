import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const MONTHS8 = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"];
// 单系列确定性数据;单色取 Okabe-Ito 蓝 #0072B2(R grDevices 固化值,调研 08§1.1)
const VALUES = [42, 58, 51, 67, 74, 69, 83, 78];
const BAR_HEX = "#0072B2";

const niceCeil = (v: number) => Math.ceil(v / 10) * 10;
const Y_MAX = niceCeil(Math.max(...VALUES)); // 90
const TICKS = [0, 30, 60, 90];

const W = 600;
const H = 340;
const M = { top: 20, right: 20, bottom: 40, left: 46 };
const PLOT_W = W - M.left - M.right;
const PLOT_H = H - M.top - M.bottom;
const TICK_LEN = 5; // ECharts axisTick.length 默认 5(坐标轴条目同源)
const GRID_OP = 0.09; // Grafana getGridColor 9% 公式(坐标轴条目同源,写死)

const css = `
.ca-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; padding: 16px 18px 10px; }
.ca-chart { flex: 1; min-height: 0; display: flex; justify-content: center; }
.ca-chart svg { max-width: 100%; max-height: 100%; color: var(--text); }
/* 动画只落在数据层(.ca-bars);轴/网格层静止 */
.ca-bars {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  animation: ca-grow var(--ca-dur, 1000ms) var(--ca-ease, cubic-bezier(0.165, 0.84, 0.44, 1)) both;
}
.ca-stage[data-entrance="fade"] .ca-bars { animation-name: ca-fade; }
.ca-stage[data-entrance="sweep"] .ca-bars { animation-name: ca-sweep; }
/* 关键帧只写 from:基态 = 终态,不支持动画/减少动效时直出终态 */
@keyframes ca-grow { from { transform: scaleY(0); } }
@keyframes ca-fade { from { opacity: 0; } }
@keyframes ca-sweep {
  from { clip-path: inset(-8% 100% -8% 0); }
  to { clip-path: inset(-8% -2% -8% 0); }
}
@media (prefers-reduced-motion: reduce) {
  .ca-bars { animation: none; }
}
.ca-readout { display: flex; flex-wrap: wrap; gap: 6px 8px; justify-content: center; font-size: 12px; color: var(--text-dim); }
.ca-chip { padding: 2px 10px; border: 1px solid var(--border); border-radius: 999px; background: var(--surface); font-variant-numeric: tabular-nums; }
.ca-chip b { color: var(--text); font-weight: 600; }
.ca-toolbar { position: absolute; right: 12px; top: 12px; display: flex; }
.ca-toolbar button {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text);
  background: var(--surface);
}
.ca-toolbar button:hover { border-color: var(--text-dim); }
.ca-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (max-width: 480px) {
  .ca-toolbar { top: auto; bottom: 12px; }
}
`;

type Params = { entrance: string; duration: number; easing: [number, number, number, number] };

const ENTRANCE_LABEL: Record<string, string> = {
  grow: "生长 grow(scaleY 从零基线长出)",
  fade: "淡入 fade(整组 opacity)",
  sweep: "扫描 sweep(clip-path 左→右揭示)",
};

/**
 * 图表动效演示:单系列柱状图,三式入场可切换 + 重播。
 * entrance 为 JS 型参数——订阅 store 后切换 data-entrance;
 * duration / easing 为 CSS 变量型(--ca-dur / --ca-ease 注入 .demo-stage)。
 * 默认:1000ms / easeOutQuart 近似(Chart.js 官方默认;系数为社区近似,未证实)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = (): Params => ({
    entrance: store.get("entrance") as string,
    duration: store.get("duration") as number,
    easing: store.get("easing") as Params["easing"],
  });
  const [params, setParams] = useState(readParams);
  const [runId, setRunId] = useState(0);
  const [announce, setAnnounce] = useState("图表已就绪");

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // onComplete → aria-live 播报(补研 12§13 Chart.js 片段同款模式)
  useEffect(() => {
    if (reduceMotion || params.duration <= 0) {
      setAnnounce("已直出终态(reduce / 0ms)");
      return;
    }
    setAnnounce("入场动画播放中…");
    const t = setTimeout(() => setAnnounce("图表加载完成"), Math.min(params.duration, 4000));
    return () => clearTimeout(t);
  }, [runId, params.duration, reduceMotion]);

  const barW = (PLOT_W / VALUES.length) * 0.62;
  const x = (i: number) => M.left + (PLOT_W * (i + 0.5)) / VALUES.length;
  const y = (v: number) => M.top + PLOT_H * (1 - v / Y_MAX);
  const easeText = `cubic-bezier(${params.easing.map((n) => Number(n.toFixed(3))).join(", ")})`;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ca-stage" data-entrance={params.entrance}>
        <div className="ca-chart">
          {/* key=runId:重播时整树重挂,CSS 动画重新触发 */}
          <svg key={runId} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`柱状图:1-8月数值,入场动效 ${params.entrance} ${params.duration}ms`}>
            {/* 参考层:网格 + 轴 + 刻度,全程静止(轴不参与动画) */}
            {TICKS.map((t) => (
              <line key={t} x1={M.left} x2={M.left + PLOT_W} y1={y(t)} y2={y(t)} stroke="currentColor" style={{ opacity: GRID_OP }} />
            ))}
            <g stroke="#6E7079" strokeWidth="1">
              <line x1={M.left} x2={M.left} y1={M.top} y2={M.top + PLOT_H} />
              <line x1={M.left} x2={M.left + PLOT_W} y1={y(0)} y2={y(0)} />
            </g>
            {TICKS.map((t) => (
              <line key={`tk${t}`} x1={M.left - TICK_LEN} x2={M.left} y1={y(t)} y2={y(t)} stroke="#6E7079" strokeWidth="1" />
            ))}
            {TICKS.map((t) => (
              <text key={`lb${t}`} x={M.left - 8} y={y(t) + 4} textAnchor="end" fontSize="12" fill="var(--text-dim)">{t}</text>
            ))}
            {MONTHS8.map((mo, i) => (
              <text key={mo} x={x(i)} y={y(0) + 18} textAnchor="middle" fontSize="12" fill="var(--text-dim)">{mo}</text>
            ))}
            {/* 数据层:唯一被动画的层 */}
            <g className="ca-bars">
              {VALUES.map((v, i) => (
                <g key={i}>
                  <rect x={x(i) - barW / 2} y={y(v)} width={barW} height={y(0) - y(v)} fill={BAR_HEX} rx="2">
                    <title>{`${MONTHS8[i]} · ${v}`}</title>
                  </rect>
                </g>
              ))}
            </g>
          </svg>
        </div>
        <div className="ca-toolbar">
          <button type="button" onClick={() => setRunId((n) => n + 1)}>重播 Replay</button>
        </div>
        <div className="ca-readout">
          <span className="ca-chip">入场 <b>{ENTRANCE_LABEL[params.entrance] ?? params.entrance}</b></span>
          <span className="ca-chip">
            时长 <b>{params.duration}ms</b>(Chart.js 默认 1000;0 = 直出终态)
          </span>
          <span className="ca-chip">
            缓动 <b>{easeText}</b>(easeOutQuart 社区近似,未证实)
          </span>
          <span className="ca-chip">轴/网格层静止 · resize 不做过渡(Chart.js duration 0 纪律)</span>
          <span className="ca-chip">{announce}</span>
        </div>
        <span className="ca-sr" aria-live="polite">{announce}</span>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
