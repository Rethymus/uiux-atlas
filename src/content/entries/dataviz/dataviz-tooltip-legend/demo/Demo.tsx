import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type LegendPos = "top" | "right" | "none";

const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月"];
const SERIES = [
  { zh: "本年", en: "This year", hex: "#0072B2", values: [64, 58, 71, 66, 78, 84] },
  { zh: "上年", en: "Last year", hex: "#E69F00", values: [42, 47, 39, 52, 48, 56] },
];

const W = 560;
const H = 300;
const M = { top: 26, right: 14, bottom: 36, left: 42 };
const PLOT_W = W - M.left - M.right;
const PLOT_H = H - M.top - M.bottom;
const Y_MAX = 100;
const HIDE_DELAY = 100; // ECharts tooltip.hideDelay 默认 100(源码核验)

interface Hover {
  si: number;
  qi: number;
}

const css = `
.tl-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; padding: 16px 18px 10px; }
.tl-toolbar { display: flex; flex-wrap: wrap; gap: 6px 10px; justify-content: center; align-items: center; font-size: 12px; color: var(--text-dim); }
.tl-toolbar button {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 3px 12px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text-dim);
  background: var(--surface);
}
.tl-toolbar button[aria-pressed="true"] { background: var(--accent-dim); border-color: var(--accent); color: var(--text); }
.tl-panel {
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
}
.tl-legend { display: flex; gap: 14px; justify-content: center; font-size: 12.5px; color: var(--text); }
.tl-row { display: flex; gap: 8px; align-items: center; justify-content: center; min-height: 0; }
.tl-row svg { max-height: 100%; max-width: 100%; }
.tl-bar { cursor: pointer; }
.tl-bar:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.tl-tip {
  position: absolute;
  z-index: 4;
  max-width: 200px;
  padding: 7px 10px;
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  background: var(--surface);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  font-size: 12px;
  line-height: 1.5;
  color: var(--text);
  pointer-events: auto;
}
.tl-tip b { font-variant-numeric: tabular-nums; }
.tl-hint { text-align: center; font-size: 11.5px; line-height: 1.5; color: var(--text-faint); }
`;

/**
 * 图例与提示演示:分组柱状图 × 图例位置(top/right/none)× tooltip 跟随(on/off)。
 * legendPos / tooltipFollow 均为 JS 型参数——订阅 store。
 * tooltip 按 WCAG 1.4.13 实现:Esc 可关 + 可移入 + 移出 100ms 宽限(ECharts hideDelay)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({
    legendPos: store.get("legendPos") as LegendPos,
    tooltipFollow: store.get("tooltipFollow") as string,
  });
  const [params, setParams] = useState(readParams);
  const [hover, setHover] = useState<Hover | null>(null);
  const [tipPos, setTipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  // Dismissible:Esc 关闭(不移动指针/焦点)
  useEffect(() => {
    if (!hover) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (hideTimer.current) clearTimeout(hideTimer.current);
        setHover(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hover]);

  const follow = params.tooltipFollow === "on";

  const scheduleHide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setHover(null), HIDE_DELAY);
  };
  const cancelHide = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const y = (v: number) => M.top + PLOT_H * (1 - v / Y_MAX);
  const groupW = PLOT_W / MONTHS.length;
  const barW = Math.min(34, (groupW / SERIES.length) * 0.62);

  const onBarMove = (si: number, qi: number) => (e: React.PointerEvent<SVGRectElement>) => {
    cancelHide();
    setHover({ si, qi });
    const rect = panelRef.current?.getBoundingClientRect();
    if (rect) setTipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const legendItems = SERIES.map((s) => (
    <span key={s.en} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span
        aria-hidden="true"
        style={{ width: 12, height: 12, borderRadius: 3, background: s.hex, border: "1px solid var(--border-strong)", display: "inline-block" }}
      />
      {s.zh} {s.en}
    </span>
  ));

  const hovered = hover ? SERIES[hover.si] : null;
  const hoveredValue = hover ? SERIES[hover.si].values[hover.qi] : 0;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="tl-stage">
        <div className="tl-toolbar" role="group" aria-label="图例与提示设置 Legend and tooltip settings">
          {(["top", "right", "none"] as const).map((p) => (
            <button key={p} type="button" aria-pressed={params.legendPos === p} onClick={() => store.set("legendPos", p)}>
              图例 {p === "top" ? "顶部 Top" : p === "right" ? "右侧 Right" : "无 None"}
            </button>
          ))}
          <button type="button" aria-pressed={follow} onClick={() => store.set("tooltipFollow", follow ? "off" : "on")}>
            tooltip {follow ? "跟随 Follow" : "停靠 Docked"}
          </button>
        </div>

        <div
          className="tl-panel"
          ref={panelRef}
          onPointerLeave={() => {
            // Persistent:移出触发区后 100ms 才隐藏(ECharts hideDelay),给「移入提示」留窗口
            scheduleHide();
          }}
        >
          {params.legendPos === "top" && <div className="tl-legend">{legendItems}</div>}
          <div className="tl-row">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              role="img"
              aria-label="分组柱状图 Grouped bar chart"
              style={params.legendPos === "right" ? { flex: "1 1 auto", minHeight: 0 } : undefined}
            >
              {[0, 25, 50, 75, 100].map((v) => (
                <line key={v} x1={M.left} x2={M.left + PLOT_W} y1={y(v)} y2={y(v)} stroke="currentColor" opacity="0.12" />
              ))}
              <text key="ylab" x={M.left - 8} y={y(50) + 4} textAnchor="end" fontSize="11" fill="var(--text-dim)">
                50
              </text>
              {MONTHS.map((mo, qi) => (
                <g key={mo}>
                  <text x={M.left + groupW * qi + groupW / 2} y={y(0) + 18} textAnchor="middle" fontSize="12" fill="var(--text-dim)">
                    {mo}
                  </text>
                  {SERIES.map((s, si) => {
                    const v = s.values[qi];
                    const bx = M.left + groupW * qi + (groupW - barW * SERIES.length) / 2 + si * barW;
                    return (
                      <rect
                        key={s.en}
                        className="tl-bar"
                        tabIndex={0}
                        x={bx}
                        y={y(v)}
                        width={barW - 2}
                        height={y(0) - y(v)}
                        fill={s.hex}
                        opacity={hover && !(hover.si === si && hover.qi === qi) ? 0.55 : 1}
                        aria-label={`${s.zh} ${MONTHS[qi]}:${v}`}
                        onPointerMove={onBarMove(si, qi)}
                        onPointerDown={onBarMove(si, qi)}
                        onFocus={() => {
                          cancelHide();
                          setHover({ si, qi });
                          const rect = panelRef.current?.getBoundingClientRect();
                          if (rect) setTipPos({ x: bx + barW, y: y(v) });
                        }}
                        onBlur={scheduleHide}
                      />
                    );
                  })}
                  {/* legendPos=none:首组直标系列名(jfly 图上直标原则) */}
                  {params.legendPos === "none" &&
                    qi === 0 &&
                    SERIES.map((s, si) => (
                      <text
                        key={s.en}
                        x={M.left + groupW * 0 + (groupW - barW * SERIES.length) / 2 + si * barW + (barW - 2) / 2}
                        y={y(SERIES[si].values[0]) - 8}
                        textAnchor="middle"
                        fontSize="10.5"
                        fill={s.hex === "#E69F00" ? "var(--text)" : s.hex}
                        fontWeight="600"
                      >
                        {s.zh}
                      </text>
                    ))}
                </g>
              ))}
            </svg>
            {params.legendPos === "right" && <div className="tl-legend" style={{ flexDirection: "column", gap: 8 }}>{legendItems}</div>}
          </div>

          {/* tooltip:跟随指针 or 停靠右上;可移入(Hoverable)、Esc 可关(Dismissible) */}
          {hovered && hover && (
            <div
              className="tl-tip"
              role="status"
              onPointerEnter={cancelHide}
              style={
                follow
                  ? {
                      left: Math.min(Math.max(8, tipPos.x + 14), (panelRef.current?.clientWidth ?? W) - 170),
                      top: Math.max(4, tipPos.y - 46),
                    }
                  : { right: 12, top: 6 }
              }
            >
              <div>
                <span
                  aria-hidden="true"
                  style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: hovered.hex, marginRight: 6, border: "1px solid var(--border-strong)" }}
                />
                {hovered.zh} {hovered.en} · {MONTHS[hover.qi]}
              </div>
              <div>
                值 value: <b>{hoveredValue}</b>
              </div>
              <div style={{ color: "var(--text-faint)", fontSize: 11 }}>Esc 关闭 · hideDelay 100ms</div>
            </div>
          )}
        </div>

        <p className="tl-hint">
          hover/点击柱体显示提示;Esc 可关;指针可移入提示本体;移出 100ms 后隐藏(ECharts 默认)。
          {" "}Hover/tap a bar; Esc dismisses; the pointer may enter the tooltip; it hides 100ms after pointer-out (ECharts default)。
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
