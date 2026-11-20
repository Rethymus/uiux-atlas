import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/**
 * 三色为 demo 固定示意配色(参数只调占比):
 * LogRocket 例证记述为「Material 白底 60 / 浅灰组件 30 / 亮蓝按钮 10」(调研 06§9),
 * 具体灰/蓝 hex 属示意呈现,非精确取样值。
 */
const COLORS = {
  dominant: "#FFFFFF",
  secondary: "#E9EBEE",
  accent: "#1B62E4",
};

const css = `
.r60-stage {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
}
.r60-strip {
  display: flex;
  height: 34px;
  border-radius: 10px;
  overflow: hidden;
  font-size: 11.5px;
  font-weight: 600;
}
.r60-seg {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  white-space: nowrap;
  overflow: hidden;
  transition: flex-grow 0.3s ease;
  font-variant-numeric: tabular-nums;
}
.r60-total {
  font-size: 11.5px;
  color: #5b6472;
  font-variant-numeric: tabular-nums;
}
.r60-frame {
  flex: 1;
  min-height: 0;
  display: flex;
  gap: 6px;
  border-radius: 14px;
  border: 1px solid #d7dbe2;
  padding: 8px;
  background: #F6F7F9;
}
.r60-band {
  border-radius: 10px;
  transition: flex-grow 0.3s ease;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  overflow: hidden;
}
.r60-band-label {
  font-size: 11px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.r60-line { height: 9px; border-radius: 5px; background: rgba(0, 0, 0, 0.1); }
.r60-line.w60 { width: 60%; }
.r60-line.w40 { width: 40%; }
.r60-card { height: 34px; border-radius: 8px; background: #FFFFFF; border: 1px solid rgba(0, 0, 0, 0.08); }
.r60-cta {
  align-self: flex-start;
  padding: 6px 14px;
  border-radius: 999px;
  border: 0;
  background: #FFFFFF;
  color: #1B62E4;
  font-size: 12px;
  font-weight: 700;
}
.r60-dot { width: 22px; height: 22px; border-radius: 50%; background: rgba(255, 255, 255, 0.4); }
@media (prefers-reduced-motion: reduce) {
  .r60-seg, .r60-band { transition: none; }
}
`;

const BANDS = [
  { key: "dominant", zh: "主导 Dominant" },
  { key: "secondary", zh: "辅助 Secondary" },
  { key: "accent", zh: "强调 Accent" },
] as const;

/**
 * 60-30-10 演示:三个占比为 JS 型参数——订阅后归一化为 100(总和不必为 100),
 * 驱动构图条与线框示意三段的 flex 比例;三色固定,参数只调占比。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [, setTick] = useState(0);

  useEffect(
    () =>
      store.subscribe(() => {
        setTick((n) => n + 1);
      }),
    [store],
  );

  const dominant = store.get("dominant") as number;
  const secondary = store.get("secondary") as number;
  const accent = store.get("accent") as number;
  const total = dominant + secondary + accent;
  const pct = (v: number) => (total === 0 ? 0 : (v / total) * 100);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="r60-stage">
        <div className="r60-strip">
          {BANDS.map((b) => {
            const v = store.get(b.key) as number;
            return (
              <div
                key={b.key}
                className="r60-seg"
                style={{ flexGrow: Math.max(total, 0) === 0 ? 0 : v, background: COLORS[b.key], color: b.key === "dominant" ? "#374151" : "#FFFFFF" }}
              >
                {b.zh} {pct(v).toFixed(1)}%
              </div>
            );
          })}
        </div>
        <div className="r60-total">
          {dominant} + {secondary} + {accent} = {total}
          {total !== 100 ? " → 已归一化 / normalized" : ""}
        </div>
        <div className="r60-frame">
          <section className="r60-band" style={{ flexGrow: dominant, background: COLORS.dominant }}>
            <span className="r60-band-label" style={{ color: "#374151" }}>
              主导画布 Canvas · {pct(dominant).toFixed(1)}%
            </span>
            <span className="r60-line w60" />
            <span className="r60-line w40" />
            <span className="r60-line w60" />
          </section>
          <section className="r60-band" style={{ flexGrow: secondary, background: COLORS.secondary }}>
            <span className="r60-band-label" style={{ color: "#374151" }}>
              辅助面板 Panel · {pct(secondary).toFixed(1)}%
            </span>
            <span className="r60-card" />
            <span className="r60-card" />
          </section>
          <section className="r60-band" style={{ flexGrow: accent, background: COLORS.accent }}>
            <span className="r60-band-label" style={{ color: "#FFFFFF" }}>
              强调 Accent · {pct(accent).toFixed(1)}%
            </span>
            <span className="r60-cta">CTA</span>
            <span className="r60-dot" />
          </section>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
