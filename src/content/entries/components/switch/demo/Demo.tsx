import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.sw-stage { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.sw-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border: 1px solid var(--border, #d9d9d9);
  border-radius: 8px;
  background: #fff;
}
.sw-label { font-size: 14px; color: rgba(0, 0, 0, 0.88); }
.switch-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  border: 0;
  border-radius: 999px;
  padding: 0;
  background: rgba(0, 0, 0, 0.25);
  cursor: pointer;
  flex: none;
  transition: background 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.switch-btn[aria-checked="true"] { background: #1677ff; }
.switch-btn:focus-visible { outline: 2px solid #1677ff; outline-offset: 2px; }
.switch-btn .thumb {
  position: absolute;
  left: 2px;
  top: 50%;
  translate: 0 -50%;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: translate 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.switch-btn[aria-checked="true"] .thumb { translate: var(--thumb-travel) -50%; }
.sw-glyph {
  position: absolute;
  font-size: 10px;
  line-height: 1;
  color: #fff;
  letter-spacing: 0.04em;
}
.sw-glyph.is-on { left: 7px; }
.sw-glyph.is-off { right: 7px; color: rgba(0, 0, 0, 0.45); }
.switch-btn[data-loading="on"] .thumb::after {
  content: "";
  position: absolute;
  inset: 3px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-top-color: transparent;
  border-radius: 50%;
  animation: sw-spin 0.6s linear infinite;
}
.switch-btn[data-disabled="on"], .switch-btn[data-loading="on"] { cursor: not-allowed; }
.switch-btn[data-disabled="on"] { opacity: 0.45; }
/* 尺寸档位(md 默认,自绘示意尺寸) */
.sw-stage[data-size="md"] .switch-btn { width: 40px; height: 22px; }
.sw-stage[data-size="md"] .thumb { width: 18px; height: 18px; }
.sw-stage[data-size="md"] .switch-btn { --thumb-travel: 18px; }
.sw-stage[data-size="md"] .sw-glyph { font-size: 10px; }
.sw-stage[data-size="sm"] .switch-btn { width: 28px; height: 16px; }
.sw-stage[data-size="sm"] .thumb { width: 12px; height: 12px; }
.sw-stage[data-size="sm"] .switch-btn { --thumb-travel: 12px; }
.sw-stage[data-size="sm"] .sw-glyph { font-size: 9px; }
.sw-stage[data-size="sm"] .sw-glyph.is-on { left: 5px; }
.sw-stage[data-size="sm"] .sw-glyph.is-off { right: 5px; }
.sw-stage[data-size="sm"] .switch-btn[data-loading="on"] .thumb::after { inset: 2px; border-width: 1.5px; }
.sw-state { font-size: 12px; color: rgba(0, 0, 0, 0.45); font-variant-numeric: tabular-nums; }
.sw-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
@keyframes sw-spin { to { rotate: 360deg; } }
@media (prefers-reduced-motion: reduce) {
  .switch-btn, .switch-btn .thumb { transition: none; }
  .switch-btn[data-loading="on"] .thumb::after { animation: none; }
}
`;

/**
 * 开关演示:恒定 label + role="switch" 拨杆。
 * size / loading / disabled 为 JS 型参数(订阅 store);
 * checked 为双向参数——面板改动即时反映到开关,点击开关经 store.set 回写面板。
 * 键盘 Space 切换(原生 button 行为);loading/disabled 下交互被抑制并置 aria-disabled。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [size, setSize] = useState(() => store.get("size") as string);
  const [loading, setLoading] = useState(() => store.get("loading") as string);
  const [disabled, setDisabled] = useState(() => store.get("disabled") as string);
  const [checked, setChecked] = useState(() => store.get("checked") as string);

  useEffect(
    () =>
      store.subscribe(() => {
        setSize(store.get("size") as string);
        setLoading(store.get("loading") as string);
        setDisabled(store.get("disabled") as string);
        setChecked(store.get("checked") as string);
      }),
    [store],
  );

  const locked = loading === "on" || disabled === "on";
  const isChecked = checked === "on";

  const toggle = () => {
    if (locked) return;
    const next = isChecked ? "off" : "on";
    setChecked(next);
    store.set("checked", next); // 回写参数面板,保持双向同步
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="sw-stage" data-size={size} data-loading={loading} data-disabled={disabled}>
        <div className="sw-row">
          <span className="sw-label" id="sw-demo-label">
            接收产品更新邮件 Receive product emails
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={isChecked}
            aria-labelledby="sw-demo-label"
            aria-disabled={locked}
            data-loading={loading}
            data-disabled={disabled}
            onClick={toggle}
          >
            <span className="sw-glyph is-on" aria-hidden="true">
              开 ON
            </span>
            <span className="sw-glyph is-off" aria-hidden="true">
              关 OFF
            </span>
            <span className="thumb" aria-hidden="true" />
          </button>
        </div>
        <p className="sw-state" aria-live="polite">
          aria-checked = {isChecked ? "true (on)" : "false (off)"}
          {loading === "on" ? " · loading 生效中" : ""}
          {disabled === "on" ? " · disabled" : ""}
        </p>
      </div>
      <style>{css}</style>
      <p className="sw-hint">键盘 Keyboard:Space 切换 Toggle · loading/disabled 时不响应 No-op</p>
    </DemoStage>
  );
}
