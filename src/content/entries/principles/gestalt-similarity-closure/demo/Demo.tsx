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
  --gc-mouth: 24deg;
}
.gc-field { position: absolute; inset: 0; }
.gc-list {
  position: absolute;
  left: 12px;
  top: 36px;
  width: min(220px, 46%);
  display: grid;
  gap: 4px;
}
.gc-title { font-size: 11px; opacity: 0.65; margin: 0 0 2px; }
.gc-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  font-size: 12.5px;
  color: oklch(0.3 0.02 250);
  cursor: pointer;
  text-align: left;
}
.gc-ico {
  width: 18px;
  height: 18px;
  flex: none;
  border-radius: 4px;
  background: oklch(0.55 0 0 / 0.35);
}
/* 相似线索:双通道(颜色+形状) */
.gc-row[data-marked="true"] .gc-ico {
  border-radius: 50%;
  background: oklch(0.6 0.15 250);
}
.gc-row[data-marked="true"][data-cue="color"] { color: oklch(0.45 0.14 250); }
.gc-row[data-marked="true"][data-cue="shape"] { color: oklch(0.32 0.03 250); }
.gc-row[data-marked="true"][data-cue="color"] .gc-ico { border-radius: 4px; background: oklch(0.6 0.15 250); }
.gc-row[data-marked="true"][data-cue="shape"] .gc-ico { border-radius: 50%; background: oklch(0.45 0 0 / 0.55); }
.gc-row:hover { background: oklch(0.5 0 0 / 0.08); }
.gc-caption { font-size: 11px; opacity: 0.6; margin: 4px 0 0; }

.gc-closure {
  position: absolute;
  right: min(24px, 12%);
  top: 50%;
  translate: 0 -50%;
  width: 150px;
  aspect-ratio: 1;
}
.gc-pac {
  position: absolute;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  /* 缺口朝向中心:每个盘旋转一个方位角 */
  background: conic-gradient(from var(--gc-rot, 0deg), transparent var(--gc-mouth), oklch(0.45 0.05 260) var(--gc-mouth));
}
.gc-pac[data-pos="tl"] { left: 0; top: 0; --gc-rot: 135deg; }
.gc-pac[data-pos="tr"] { right: 0; top: 0; --gc-rot: 225deg; }
.gc-pac[data-pos="bl"] { left: 0; bottom: 0; --gc-rot: 45deg; }
.gc-pac[data-pos="br"] { right: 0; bottom: 0; --gc-rot: 315deg; }
.gc-illusory {
  position: absolute;
  inset: 30px;
  border: 0;
  pointer-events: none;
}
.gc-verdict {
  position: absolute;
  right: 12px;
  bottom: 12px;
  font-size: 11px;
  opacity: 0.7;
}
.gc-verdict[data-ok="false"] { color: oklch(0.55 0.19 25); opacity: 1; }
@media (max-width: 480px) {
  .gc-list { width: calc(100% - 24px); top: 34px; }
  .gc-closure { position: relative; margin: 16px auto 0; top: auto; translate: none; right: auto; display: block; }
}
`;

export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [cue, setCue] = useState(() => store.get("cue") as string);
  const [marked, setMarked] = useState(() => store.get("marked") as number);

  useEffect(
    () =>
      store.subscribe(() => {
        setCue(store.get("cue") as string);
        setMarked(store.get("marked") as number);
      }),
    [store],
  );

  const mouth = store.get("mouth") as number;
  const closureOk = mouth <= 60;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="gc-field">
        <div className="gc-list">
          <p className="gc-title">相似 pane · 前 {marked} 行同类(可点击)</p>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const isMarked = i < marked;
            return (
              <button
                key={i}
                type="button"
                className="gc-row"
                data-marked={isMarked}
                data-cue={cue}
                tabIndex={isMarked ? 0 : -1}
                aria-disabled={!isMarked}
              >
                <span className="gc-ico" aria-hidden="true" />
                条目 {i + 1} Item
              </button>
            );
          })}
          <p className="gc-caption">
            {cue === "color"
              ? "color 线索:颜色+图标色 双通道"
              : "shape 线索:圆角→圆形 图标形状差"}
          </p>
        </div>

        <div className="gc-closure" role="img" aria-label={`闭合演示:四个缺口 ${mouth} 度的圆盘${closureOk ? ",可感知中间的正方形" : ",补全已崩解"}`}>
          <span className="gc-pac" data-pos="tl" style={{ "--gc-mouth": `${mouth}deg` } as React.CSSProperties} />
          <span className="gc-pac" data-pos="tr" style={{ "--gc-mouth": `${mouth}deg` } as React.CSSProperties} />
          <span className="gc-pac" data-pos="bl" style={{ "--gc-mouth": `${mouth}deg` } as React.CSSProperties} />
          <span className="gc-pac" data-pos="br" style={{ "--gc-mouth": `${mouth}deg` } as React.CSSProperties} />
          <span className="gc-illusory" aria-hidden="true" />
        </div>
        <p className="gc-verdict" data-ok={closureOk}>
          {closureOk
            ? `缺口 ${mouth}° → 大脑自动补全正方形(闭合)`
            : `缺口 ${mouth}° ≥ 60° → 闭合崩解,只见四个缺角圆`}
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
