import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const LABELS = ["3月", "4月", "5月", "6月", "7月", "8月"];
const VALUES = [42, 58, 51, 67, 74, 69]; // 千次,确定性数据
const BAR_HEX = "#0072B2"; // Okabe-Ito 蓝(R grDevices 固化值,调研 08§1.1)
const UNIT = "千次";

const niceCeil = (v: number) => Math.ceil(v / 10) * 10;
const Y_MAX = niceCeil(Math.max(...VALUES)); // 80
const TICKS = [0, 20, 40, 60, 80];
const GRID_OP = 0.09; // Grafana getGridColor 9% 公式(坐标轴条目同源,写死)

const W = 560;
const H = 330;
const M = { top: 20, right: 16, bottom: 40, left: 46 };
const PLOT_W = W - M.left - M.right;
const PLOT_H = H - M.top - M.bottom;
const TICK_LEN = 5;

const css = `
.ac-stage { position: absolute; inset: 0; padding: 16px 18px 10px; min-height: 0; }
.ac-fig { display: flex; gap: 14px; height: 100%; min-height: 0; }
.ac-plot { flex: 1.3; min-width: 0; min-height: 0; display: flex; }
.ac-plot svg { flex: 1; min-height: 0; width: 100%; color: var(--text); }
/* figcaption = 长描述载体(WAI 首选:对所有人可见) */
.ac-fig figcaption {
  flex: 1; min-width: 0; min-height: 0;
  display: flex; flex-direction: column; gap: 8px;
  font-size: 12px; color: var(--text-dim);
}
.ac-tabs { display: flex; gap: 4px; }
.ac-tabs [role="tab"] {
  border: 1px solid var(--border); border-radius: 999px;
  padding: 4px 12px; font-size: 12px; cursor: pointer;
  color: var(--text-dim); background: var(--surface);
}
.ac-tabs [role="tab"][aria-selected="true"] { color: var(--text); border-color: var(--text-dim); font-weight: 600; }
.ac-panel {
  flex: 1; min-height: 0; overflow: auto;
  border: 1px solid var(--border); border-radius: 10px;
  background: var(--surface); padding: 10px 12px;
  font-size: 12px; color: var(--text-dim); line-height: 1.6;
}
.ac-panel table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
.ac-panel caption { text-align: left; font-weight: 600; color: var(--text); padding-bottom: 4px; }
.ac-panel th, .ac-panel td { border-top: 1px solid var(--border); padding: 3px 6px; text-align: right; }
.ac-panel th:first-child, .ac-panel td:first-child { text-align: left; }
.ac-actions { display: flex; gap: 6px; }
.ac-actions button {
  border: 1px solid var(--border); border-radius: 999px;
  padding: 5px 12px; font-size: 12px; cursor: pointer;
  color: var(--text); background: var(--surface);
}
.ac-chips { display: flex; flex-direction: column; gap: 4px; font-size: 11.5px; color: var(--text-dim); }
.ac-chips b { color: var(--text); font-weight: 600; }
.ac-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (max-width: 640px) {
  .ac-fig { flex-direction: column; }
}
`;

type Params = { decal: string; directLabel: string; longDesc: string };

/**
 * sonification 自研示意:数值 → 音高(220–880Hz)正弦短音序列。
 * 产品级 sonification 实现(具体库/默认参数)本轮调研未核验,不引具体数值。
 */
function playSonification(ctxRef: { current: AudioContext | null }, announce: (s: string) => void) {
  try {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) throw new Error("no AudioContext");
      ctxRef.current = new Ctx();
    }
    const ctx = ctxRef.current;
    const t0 = ctx.currentTime + 0.05;
    VALUES.forEach((v, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = Math.round(220 + (v / Y_MAX) * 660);
      const start = t0 + i * 0.22;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.05, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.22);
    });
    announce(`sonification 播放中:${VALUES.length} 个音,音高随访问量上升`);
  } catch {
    announce("当前环境不支持 WebAudio,sonification 不可用");
  }
}

/**
 * 图表无障碍演示:figure role=group 内 svg role=img + title/desc,
 * figcaption 可见承载长描述(数据表/文字描述,ARIA tablist 方向键漫游);
 * decal(默认 off = ECharts aria.decal.show 默认 false)/ directLabel(默认 on = jfly 直标)/
 * longDesc 为 JS 型参数——订阅 store,tab 点击写回 store 保持参数面板同步。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = (): Params => ({
    decal: store.get("decal") as string,
    directLabel: store.get("directLabel") as string,
    longDesc: store.get("longDesc") as string,
  });
  const [params, setParams] = useState(readParams);
  const [announce, setAnnounce] = useState("");
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  const decalOn = params.decal === "on";
  const labelOn = params.directLabel === "on";
  const showTable = params.longDesc === "table";

  const barW = (PLOT_W / VALUES.length) * 0.56;
  const x = (i: number) => M.left + (PLOT_W * (i + 0.5)) / VALUES.length;
  const y = (v: number) => M.top + PLOT_H * (1 - v / Y_MAX);

  // WAI 清单四项:趋势结论 / 比例尺 / 颜色顺序 / 相对高度
  const trendText =
    `趋势:3 月 ${VALUES[0]} ${UNIT}起步,4 月升至 ${VALUES[1]},5 月小幅回落至 ${VALUES[2]},` +
    `6-7 月持续攀升并于 7 月达峰值 ${VALUES[4]},8 月回落至 ${VALUES[5]}——整体上升约 64%。` +
    `比例尺 0-${Y_MAX} ${UNIT};颜色顺序仅 1 项(单系列,Okabe-Ito 蓝 #0072B2);相对高度:最高柱为 7 月(${VALUES[4]}),最低柱为 3 月(${VALUES[0]})。`;

  const switchTab = (v: string) => {
    store.set("longDesc", v);
  };
  const onTabKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      switchTab(showTable ? "text" : "table");
    }
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ac-stage">
        <figure className="ac-fig" role="group" aria-label="图表与可见长描述组合(WAI 复杂图像模式)">
          <div className="ac-plot">
            <svg role="img" aria-label={`柱状图:示例站点 2025 年 3-8 月访问量(${UNIT}),总体上升,详见长描述`}>
              <title>示例站点访问量柱状图</title>
              <desc>3 月 42 千次起步,7 月达峰值 74 千次,8 月 69 千次,整体上升;柱高即值,详见 figcaption 长描述。</desc>
              <defs>
                {/* 贴花纹理(SVG pattern 等效示意;ECharts decal 参数为 dashArrayX/Y/rotation,见 util/decal.ts) */}
                <pattern id="ac-decal" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" />
                </pattern>
              </defs>
              {/* 参考层(静止):网格 + 轴 + 刻度 */}
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
              {LABELS.map((mo, i) => (
                <text key={mo} x={x(i)} y={y(0) + 18} textAnchor="middle" fontSize="12" fill="var(--text-dim)">{mo}</text>
              ))}
              {/* 数据层:柱 + 贴花(可选)+ 直标(可选) */}
              {VALUES.map((v, i) => (
                <g key={i}>
                  <rect x={x(i) - barW / 2} y={y(v)} width={barW} height={y(0) - y(v)} fill={BAR_HEX} rx="2">
                    <title>{`${LABELS[i]} · ${v} ${UNIT}`}</title>
                  </rect>
                  {decalOn && (
                    <rect x={x(i) - barW / 2} y={y(v)} width={barW} height={y(0) - y(v)} fill="url(#ac-decal)" rx="2" aria-hidden="true" />
                  )}
                  {labelOn && (
                    <text x={x(i)} y={y(v) - 6} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text)">{v}</text>
                  )}
                </g>
              ))}
            </svg>
          </div>
          <figcaption>
            <div className="ac-tabs" role="tablist" aria-label="长描述载体 Long description carrier">
              <button
                type="button"
                role="tab"
                id="ac-tab-table"
                aria-selected={showTable}
                aria-controls="ac-panel"
                tabIndex={showTable ? 0 : -1}
                onKeyDown={onTabKeyDown}
                onClick={() => switchTab("table")}
              >
                数据表 Table
              </button>
              <button
                type="button"
                role="tab"
                id="ac-tab-text"
                aria-selected={!showTable}
                aria-controls="ac-panel"
                tabIndex={!showTable ? 0 : -1}
                onKeyDown={onTabKeyDown}
                onClick={() => switchTab("text")}
              >
                文字描述 Text
              </button>
            </div>
            <div
              id="ac-panel"
              role="tabpanel"
              aria-labelledby={showTable ? "ac-tab-table" : "ac-tab-text"}
              className="ac-panel"
            >
              {showTable ? (
                <table>
                  <caption>示例站点 2025 年 3-8 月访问量({UNIT})</caption>
                  <thead>
                    <tr><th scope="col">月份</th><th scope="col">访问量({UNIT})</th></tr>
                  </thead>
                  <tbody>
                    {LABELS.map((mo, i) => (
                      <tr key={mo}><th scope="row">{mo}</th><td>{VALUES[i]}</td></tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>{trendText}</p>
              )}
            </div>
            <div className="ac-actions">
              <button type="button" onClick={() => playSonification(audioRef, setAnnounce)}>播放数据旋律 Sonify</button>
            </div>
            <div className="ac-chips">
              <span>长描述载体 <b>{showTable ? "figcaption 数据表(对所有用户可见)" : "figcaption 文字描述"}</b>;aria-describedby 仅适合纯文本(WAI 原文)</span>
              <span>贴花 <b>{decalOn ? "on(色相之外的第二视觉编码)" : "off(ECharts aria.decal.show 官方默认 false)"}</b> · 直标 <b>{labelOn ? "on(jfly 原则)" : "off(仅轴刻度)"}</b></span>
              <span>sonification 为自研示意(数值→音高 220-880Hz);产品级实现本轮调研未核验</span>
            </div>
          </figcaption>
        </figure>
        <span className="ac-sr" aria-live="polite">{announce}</span>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
