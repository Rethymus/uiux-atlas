import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.demo-stage {
  --gp-gap: 36px;
  --gp-inner: 10px;
}
.gp-field { position: absolute; inset: 0; }
.gp-board {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  display: flex;
  gap: var(--gp-gap);
  transition: gap 0.2s ease;
}
.gp-group {
  display: flex;
  gap: var(--gp-inner);
  padding: 0;
  border: 0;
  background: transparent;
  transition: gap 0.2s ease;
}
.gp-cell {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: oklch(0.62 0.1 250);
  color: #fff;
  font-size: 12px;
  font-weight: 650;
}
.gp-readout {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 168px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
  line-height: 1.7;
  font-variant-numeric: tabular-nums;
}
.gp-verdict[data-strong="true"] { color: oklch(0.45 0.13 150); }
.gp-verdict[data-strong="false"] { color: oklch(0.55 0.19 25); }
.gp-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 34%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
@media (max-width: 480px) {
  .gp-readout { display: none; }
  .gp-board { flex-direction: column; align-items: center; }
  .gp-group { flex-wrap: wrap; justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .gp-board, .gp-group { transition: none; }
}
`;

export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [layout, setLayout] = useState(() => store.get("layout") as string);

  useEffect(
    () =>
      store.subscribe(() => {
        setLayout(store.get("layout") as string);
      }),
    [store],
  );

  const uniform = layout === "uniform";

  const boardStyle = uniform
    ? { gap: "var(--gp-inner)" }
    : { gap: "var(--gp-gap)" };

  const groupStyle = uniform ? { gap: "var(--gp-inner)" } : undefined;

  const gap = store.get("gap") as number;
  const inner = store.get("inner") as number;
  const ratio = inner > 0 ? gap / inner : Infinity;
  const strong = uniform ? false : gap >= inner * 2;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="gp-field">
        <div className="gp-board" style={boardStyle}>
          {[0, 1, 2].map((g) => (
            <div key={g} className="gp-group" style={groupStyle} aria-label={`组 ${g + 1},4 个元素`}>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="gp-cell">{g * 4 + i + 1}</span>
              ))}
            </div>
          ))}
        </div>

        <aside className="gp-readout">
          <b>间距读数 Spacing</b>
          <p style={{ margin: 0 }}>
            {uniform ? (
              <>
                均匀网格 uniform:全部等距
                <br />
                分组感知 <span className="gp-verdict" data-strong="false">无 none</span>
              </>
            ) : (
              <>
                组间 gap: {gap}px
                <br />
                组内 inner: {inner}px
                <br />
                比值 ratio: {ratio === Infinity ? "∞" : `${ratio.toFixed(1)} : 1`}
                <br />
                分组感知{" "}
                <span className="gp-verdict" data-strong={strong}>
                  {strong ? "成立 strong" : "崩解 weak"}
                </span>
              </>
            )}
          </p>
        </aside>

        <p className="gp-hint">
          把 gap 拖小到等于 inner,三组退化成 12 个散点;切到 uniform 看阴性对照。
          Drag gap down to equal inner and the groups dissolve; uniform is the negative control.
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
