import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface GridParams {
  container: number;
  columns: number;
  gap: number;
  minCol: number;
}

const css = `
.gm-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 5px; padding: 30px 14px 10px; overflow: hidden; }
.gm-model {
  border: 1px solid var(--border); border-radius: 10px; background: var(--surface);
  padding: 8px; min-height: 0;
}
.gm-model svg { width: 100%; height: auto; display: block; }
.gm-formulas { display: flex; flex-direction: column; gap: 3px; }
.gm-formulas code {
  font-size: 11px; color: var(--text-dim); font-variant-numeric: tabular-nums;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.gm-formulas code b { color: var(--text); font-weight: 600; }
.gm-warn { color: oklch(0.55 0.19 25); }
.gm-foot { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 11px; color: var(--text-faint); font-variant-numeric: tabular-nums; }
.gm-tag { padding: 1px 8px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); }
.gm-stage { animation: gm-in 0.4s ease-out both; }
@keyframes gm-in { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .gm-stage { animation: none; } }
`;

const VB_H = 110;

/**
 * 网格数学演示:container/columns/gap/minCol 均为 JS 型参数(订阅 store);
 * SVG viewBox = 容器宽,等比真尺度画列轨,读数为真实 px;
 * 附 auto-fit 列数推导;无自主动画。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const read = (): GridParams => ({
    container: store.get("container") as number,
    columns: store.get("columns") as number,
    gap: store.get("gap") as number,
    minCol: store.get("minCol") as number,
  });
  const [p, setP] = useState<GridParams>(read);

  useEffect(
    () =>
      store.subscribe(() => {
        setP(read());
      }),
    [store],
  );

  const { container: C, columns: n, gap: g, minCol } = p;
  const colW = (C - (n - 1) * g) / n;
  const squeezed = colW <= 0;
  const autoFit = Math.max(1, Math.floor((C + g) / (minCol + g)));
  const fitW = (C - (autoFit - 1) * g) / autoFit;

  const trackW = Math.max(0, colW);
  const tracks = Array.from({ length: n }, (_, i) => i * (trackW + g));

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="gm-stage">
        <div className="gm-model" aria-hidden="true">
          <svg viewBox={`0 0 ${C} ${VB_H}`} preserveAspectRatio="xMidYMid meet">
            {tracks.map((x, i) => (
              <g key={i}>
                <rect
                  x={x}
                  y={14}
                  width={trackW}
                  height={VB_H - 28}
                  rx={6}
                  fill="oklch(0.62 0.16 250 / 0.28)"
                  stroke="oklch(0.55 0.14 250)"
                  strokeWidth={Math.max(1, C / 900)}
                />
                {n <= 16 && (
                  <text
                    x={x + trackW / 2}
                    y={VB_H / 2 + 4}
                    textAnchor="middle"
                    fontSize={Math.max(10, C / 90)}
                    fill="oklch(0.45 0.1 250)"
                  >
                    {Math.round(colW * 100) / 100}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>
        <div className="gm-formulas">
          <code>
            colW = ({C} − ({n}−1)×{g}) / {n} = <b>{squeezed ? "塌陷 ≤ 0" : (Math.round(colW * 100) / 100).toFixed(2) + "px"}</b>
            {squeezed && <span className="gm-warn">(槽过宽:/ gutter too wide)</span>}
          </code>
          <code>
            auto-fit ⌊({C}+{g})/({minCol}+{g})⌋ = <b>{autoFit} 列 / columns</b> → 实宽 realized{" "}
            <b>{(Math.round(fitW * 100) / 100).toFixed(2)}px</b>
          </code>
        </div>
        <div className="gm-foot">
          <span className="gm-tag">C = {C}px(TDesign/Ant 画板默认 1440)</span>
          <span className="gm-tag">gap = {g}px(TDesign 官方固定槽)</span>
          <span className="gm-tag">minmax({minCol}px, 1fr)</span>
          <span className="gm-tag">subgrid:卡片行 = 父网格行</span>
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
