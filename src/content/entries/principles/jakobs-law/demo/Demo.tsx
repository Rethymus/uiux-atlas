import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.jk-field { position: absolute; inset: 0; }
.jk-panel {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(330px, calc(100% - 190px));
  padding: 18px 20px;
  border: 1px solid oklch(0.5 0 0 / 0.3);
  border-radius: 14px;
  background: oklch(1 0 0 / 0.8);
  font-size: 13px;
}
.jk-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 0;
  border-bottom: 1px solid oklch(0.5 0 0 / 0.14);
}
.jk-row label { font-weight: 600; }
.jk-switch {
  position: relative;
  width: 44px;
  height: 26px;
  border: 0;
  border-radius: 999px;
  background: oklch(0.7 0 0 / 0.5);
  cursor: pointer;
  transition: background 0.15s ease;
}
.jk-switch::after {
  content: "";
  position: absolute;
  left: 3px;
  top: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  translate: 0 0;
  transition: translate 0.15s ease;
}
.jk-switch[aria-checked="true"] { background: oklch(0.6 0.14 250); }
.jk-switch[aria-checked="true"]::after { translate: 18px 0; }
.jk-slider {
  width: 150px;
  accent-color: oklch(0.55 0.13 250);
}
.jk-slider[data-reversed="true"] { direction: rtl; }
.jk-save {
  display: block;
  margin: 14px 0 0 auto;
  border: 0;
  border-radius: 10px;
  padding: 8px 18px;
  background: oklch(0.55 0.13 250);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}
/* alien 反范式 */
.jk-panel[data-variant="alien"] .jk-row { direction: rtl; border-bottom-style: dashed; }
.jk-panel[data-variant="alien"] .jk-save {
  background: transparent;
  color: oklch(0.5 0 0 / 0.55);
  font-size: 11px;
  padding: 4px;
}
.jk-moon {
  border: 0;
  background: transparent;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  padding: 2px;
  border-radius: 8px;
}
.jk-moon[aria-pressed="true"] { background: oklch(0.4 0.06 265 / 0.25); }
.jk-note {
  margin: 12px 0 0;
  font-size: 11px;
  color: oklch(0.55 0.18 25);
}
.jk-task {
  position: absolute;
  left: 12px;
  top: 36px;
  max-width: 34%;
  font-size: 12px;
  line-height: 1.6;
}
.jk-task strong { display: block; font-size: 13px; }
.jk-task button {
  margin-top: 6px;
  border: 1px solid oklch(0.5 0 0 / 0.4);
  border-radius: 8px;
  padding: 4px 10px;
  background: oklch(1 0 0 / 0.7);
  font-size: 12px;
  cursor: pointer;
}
.jk-score {
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
.jk-score b { font-size: 13px; }
.jk-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 34%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
@media (max-width: 480px) {
  .jk-score { display: none; }
  .jk-panel { width: calc(100% - 28px); }
  .jk-hint { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .jk-switch, .jk-switch::after { transition: none; }
}
`;

export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [variant, setVariant] = useState(() => store.get("variant") as string);
  const [hint, setHint] = useState(() => store.get("hint") as string);
  const [running, setRunning] = useState(false);
  const [night, setNight] = useState(false);
  const [volume, setVolume] = useState(80);
  const [misclicks, setMisclicks] = useState(0);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [best, setBest] = useState<{ familiar: number | null; alien: number | null }>({ familiar: null, alien: null });
  const t0 = useRef(0);

  useEffect(
    () =>
      store.subscribe(() => {
        setVariant(store.get("variant") as string);
        setHint(store.get("hint") as string);
      }),
    [store],
  );

  const alien = variant === "alien";

  // 完成判定:夜间开 + 音量最小。volume slider 反向时 value=100 才是最小听感。
  const done = night && (alien ? volume === 100 : volume === 0);

  useEffect(() => {
    if (running && done && elapsed == null) {
      const ms = performance.now() - t0.current;
      setElapsed(ms);
      setRunning(false);
      setBest((b) => ({
        ...b,
        [alien ? "alien" : "familiar"]:
          b[alien ? "alien" : "familiar"] == null ? ms : Math.min(b[alien ? "alien" : "familiar"]!, ms),
      }));
    }
  }, [running, done, elapsed, alien]);

  const startTask = () => {
    setNight(false);
    setVolume(alien ? 100 : 80);
    setMisclicks(0);
    setElapsed(null);
    t0.current = performance.now();
    setRunning(true);
  };

  const clickIrrelevant = () => {
    if (running) setMisclicks((m) => m + 1);
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="jk-field">
        <div className="jk-task">
          <strong>任务 Task</strong>
          {hint === "show" ? (
            <p style={{ margin: 0 }}>
              打开夜间模式,并把音量调到最小。
              Enable night mode and set volume to minimum.
            </p>
          ) : (
            <p style={{ margin: 0, opacity: 0.6 }}>提示已隐藏,自己找 / Hint hidden — find it yourself</p>
          )}
          <button type="button" onClick={startTask}>
            {running ? "重置 Reset" : "开始计时 Start"}
          </button>
          {running && <span aria-live="polite">⏱ 计时中… timing</span>}
          {elapsed != null && <span aria-live="polite">✔ 用时 {Math.round(elapsed / 100) / 10}s</span>}
        </div>

        <div className="jk-panel" data-variant={alien ? "alien" : "familiar"}>
          {alien ? (
            <>
              <div className="jk-row">
                {/* 反范式:无标签图标按钮(演示反面教材,仍带可读名称) */}
                <button
                  type="button"
                  className="jk-moon"
                  aria-pressed={night}
                  aria-label="月亮(疑似夜间模式?)Moon (maybe night mode?)"
                  onClick={() => setNight((n) => !n)}
                >
                  🌙
                </button>
                <span style={{ fontSize: 12, opacity: 0.6 }}>外观 Appearance?</span>
              </div>
              <div className="jk-row">
                <input
                  type="range"
                  className="jk-slider"
                  data-reversed="true"
                  min={0}
                  max={100}
                  value={volume}
                  aria-label="声音(反向:左大声右静音)Sound (reversed: left loud, right quiet)"
                  onChange={(e) => setVolume(Number(e.target.value))}
                />
                <span style={{ fontSize: 12, opacity: 0.6 }}>{volume}</span>
              </div>
              <button type="button" className="jk-save" onClick={clickIrrelevant}>
                ↩ some-text
              </button>
            </>
          ) : (
            <>
              <div className="jk-row">
                <label htmlFor="jk-night">夜间模式 Night mode</label>
                <button
                  type="button"
                  id="jk-night"
                  className="jk-switch"
                  role="switch"
                  aria-checked={night}
                  onClick={() => setNight((n) => !n)}
                />
              </div>
              <div className="jk-row">
                <label htmlFor="jk-vol">音量 Volume</label>
                <input
                  type="range"
                  id="jk-vol"
                  className="jk-slider"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                />
                <span style={{ fontSize: 12, opacity: 0.6 }}>{volume}</span>
              </div>
              {/* 完成判定不依赖 Save;此处点击不计误触 */}
              <button type="button" className="jk-save">
                保存 Save
              </button>
            </>
          )}
          {alien && <p className="jk-note">⚠ 反范式演示:真实产品请给图标可读名称并遵循惯例。Anti-pattern exhibit.</p>}
        </div>

        <aside className="jk-score">
          <b>最近成绩 Latest</b>
          <p style={{ margin: 0 }}>
            熟悉范式 familiar: {best.familiar == null ? "—" : `${Math.round(best.familiar / 100) / 10}s`}
            <br />
            反范式 alien: {best.alien == null ? "—" : `${Math.round(best.alien / 100) / 10}s`}
            <br />
            本次误触 misclicks: {misclicks}
          </p>
        </aside>

        <p className="jk-hint">
          同一任务分别用两种范式完成一次,对比计时——期望来自你用过的其他产品。
          Complete the task once per paradigm and compare — expectations come from other products.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
