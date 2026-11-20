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
  --neu-bg: #e0e5ec;
  --neu-offset: 9px;
  --neu-blur: 18px;
  --neu-dark: color-mix(in srgb, var(--neu-bg) 85%, black);
}
.neu-scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--neu-bg);
  animation: neu-in 0.4s ease-out both;
}
/* 凸起阴影对:暗影=底色加深15%(经典 #e0e5ec→#bec3c9),亮影=纯白 #ffffff */
.neu-raised {
  box-shadow:
    var(--neu-offset) var(--neu-offset) var(--neu-blur) var(--neu-dark),
    calc(-1 * var(--neu-offset)) calc(-1 * var(--neu-offset)) var(--neu-blur) #ffffff;
}
.neu-inset {
  box-shadow:
    inset var(--neu-offset) var(--neu-offset) var(--neu-blur) var(--neu-dark),
    inset calc(-1 * var(--neu-offset)) calc(-1 * var(--neu-offset)) var(--neu-blur) #ffffff;
}
[data-mode="raised"] .neu-card { box-shadow: var(--neu-offset) var(--neu-offset) var(--neu-blur) var(--neu-dark), calc(-1 * var(--neu-offset)) calc(-1 * var(--neu-offset)) var(--neu-blur) #ffffff; }
[data-mode="inset"] .neu-card { box-shadow: inset var(--neu-offset) var(--neu-offset) var(--neu-blur) var(--neu-dark), inset calc(-1 * var(--neu-offset)) calc(-1 * var(--neu-offset)) var(--neu-blur) #ffffff; }
.neu-card {
  width: min(320px, calc(100% - 32px));
  padding: 24px;
  border-radius: 20px; /* 调研区间 16–24px */
  background: var(--neu-bg);
  color: #3a4453;
  transition: box-shadow 0.15s ease;
}
.neu-card h3 { margin: 0 0 4px; font-size: 16px; font-weight: 650; letter-spacing: 0.01em; }
.neu-hint { margin: 0 0 18px; font-size: 12px; color: #6b7686; }
.neu-label { display: block; margin: 0 0 6px; font-size: 12px; color: #57616f; }
.neu-input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  border: 0;
  border-radius: 12px;
  background: var(--neu-bg);
  color: #3a4453;
  font-size: 13px;
  box-shadow:
    inset calc(var(--neu-offset) * 0.7) calc(var(--neu-offset) * 0.7) calc(var(--neu-blur) * 0.7) var(--neu-dark),
    inset calc(-1 * var(--neu-offset) * 0.7) calc(-1 * var(--neu-offset) * 0.7) calc(var(--neu-blur) * 0.7) #ffffff;
  outline: none;
}
.neu-input:focus-visible { box-shadow:
    inset calc(var(--neu-offset) * 0.7) calc(var(--neu-offset) * 0.7) calc(var(--neu-blur) * 0.7) var(--neu-dark),
    inset calc(-1 * var(--neu-offset) * 0.7) calc(-1 * var(--neu-offset) * 0.7) calc(var(--neu-blur) * 0.7) #ffffff,
    0 0 0 2px #5b7db1;
}
.neu-row { display: flex; gap: 14px; align-items: center; margin-top: 18px; }
.neu-btn {
  flex: 1;
  padding: 10px 0;
  border: 0;
  border-radius: 12px;
  background: var(--neu-bg);
  color: #3a4453;
  font-size: 13px;
  cursor: pointer;
  transition: box-shadow 0.15s ease;
}
.neu-btn:active { box-shadow:
    inset var(--neu-offset) var(--neu-offset) var(--neu-blur) var(--neu-dark),
    inset calc(-1 * var(--neu-offset)) calc(-1 * var(--neu-offset)) var(--neu-blur) #ffffff; }
.neu-btn:focus-visible { outline: 2px solid #5b7db1; outline-offset: 3px; }
/* 开关:轨道常驻压入(槽位),旋钮凸起 */
.neu-toggle { margin-left: auto; }
.neu-toggle input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.neu-track {
  display: block;
  width: 54px;
  height: 30px;
  border-radius: 999px;
  background: var(--neu-bg);
  box-shadow:
    inset calc(var(--neu-offset) * 0.6) calc(var(--neu-offset) * 0.6) calc(var(--neu-blur) * 0.6) var(--neu-dark),
    inset calc(-1 * var(--neu-offset) * 0.6) calc(-1 * var(--neu-offset) * 0.6) calc(var(--neu-blur) * 0.6) #ffffff;
  cursor: pointer;
}
.neu-knob {
  width: 22px;
  height: 22px;
  margin: 4px;
  border-radius: 999px;
  background: var(--neu-bg);
  box-shadow: 3px 3px 6px var(--neu-dark), -3px -3px 6px #ffffff;
  transition: translate 0.2s ease;
}
.neu-toggle input:checked + .neu-track .neu-knob { translate: 24px 0; }
.neu-toggle input:focus-visible + .neu-track { outline: 2px solid #5b7db1; outline-offset: 3px; }
@keyframes neu-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .neu-scene { animation: none; }
  .neu-card, .neu-btn, .neu-knob { transition: none; }
}
`;

/**
 * 新拟物演示:同色底双阴影挤出/压入。
 * base / offset / blur 为 CSS 变量型参数(经 DemoStage 注入 .demo-stage);
 * mode 为 JS 型参数——订阅 store 后切换 data-mode,由 demo 内 CSS 消费。
 * 暗影经 color-mix 由底色现算(加深 15%),亮影取经典配方纯白 #ffffff。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [mode, setMode] = useState(() => store.get("mode") as string);
  const [on, setOn] = useState(false);

  useEffect(
    () =>
      store.subscribe(() => {
        setMode(store.get("mode") as string);
      }),
    [store],
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="neu-scene" data-mode={mode}>
        <div className="neu-card">
          <h3>软塑料面板 Soft Panel</h3>
          <p className="neu-hint">
            点击按钮看凸起→压入 / Click a button to see raised → inset.
          </p>
          <label className="neu-label" htmlFor="neu-input-field">
            输入槽 Input well(常驻压入)
          </label>
          <input id="neu-input-field" className="neu-input" type="text" placeholder="Inset by default…" />
          <div className="neu-row">
            <button type="button" className="neu-btn">按钮 A</button>
            <button type="button" className="neu-btn">按钮 B</button>
            <span className="neu-toggle">
              <input
                id="neu-toggle-input"
                type="checkbox"
                checked={on}
                onChange={(e) => setOn(e.target.checked)}
              />
              <label className="neu-track" htmlFor="neu-toggle-input" aria-label="开关 Toggle">
                <span className="neu-knob" aria-hidden="true" />
              </label>
            </span>
          </div>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
