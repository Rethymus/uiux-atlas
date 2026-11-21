import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.ip-stage {
  width: min(400px, calc(100% - 48px));
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ip-label { font-size: 14px; font-weight: 500; color: rgba(0, 0, 0, 0.88); }
.ip-wrap { position: relative; }
.ip-wrap input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  color: rgba(0, 0, 0, 0.88);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.ip-wrap input::placeholder { color: rgba(0, 0, 0, 0.25); }
.ip-wrap input:hover { border-color: #1677ff; }
/* 尺寸三档:antd controlHeight 派生 24/32/40 + 字阶 12/14/16 + 圆角 SM 4/6 */
.ip-stage[data-size="sm"] input { height: 24px; font-size: 12px; padding: 0 8px; border-radius: 4px; }
.ip-stage[data-size="md"] input { height: 32px; font-size: 14px; padding: 0 12px; border-radius: 6px; }
.ip-stage[data-size="lg"] input { height: 40px; font-size: 16px; padding: 0 12px; border-radius: 6px; }
.ip-stage[data-clearable="on"] input { padding-right: 30px; }
/* 状态边框:colorBorder / colorError / colorWarning */
.ip-stage[data-status="default"] input { border-color: #d9d9d9; }
.ip-stage[data-status="error"] input { border-color: #ff4d4f; }
.ip-stage[data-status="warning"] input { border-color: #faad14; }
.ip-wrap input:focus {
  outline: none;
  border-color: #1677ff;
  box-shadow: 0 0 0 2px color-mix(in srgb, #1677ff 25%, transparent);
}
.ip-wrap input:focus-visible {
  outline: 2px solid #1677ff;
  outline-offset: -2px;
}
.ip-clear {
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  right: 6px;
  width: 18px;
  height: 18px;
  border: 0;
  border-radius: 50%;
  padding: 0;
  display: grid;
  place-items: center;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.45);
  background: rgba(0, 0, 0, 0.06);
}
.ip-clear:hover { color: rgba(0, 0, 0, 0.88); background: rgba(0, 0, 0, 0.12); }
.ip-meta { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; min-height: 18px; }
.ip-help { margin: 0; font-size: 12px; color: rgba(0, 0, 0, 0.45); }
.ip-stage[data-status="error"] .ip-help { color: #ff4d4f; }
.ip-stage[data-status="warning"] .ip-help { color: #faad14; }
.ip-count { margin: 0; font-size: 12px; color: rgba(0, 0, 0, 0.45); font-variant-numeric: tabular-nums; }
.ip-count.is-over { color: #ff4d4f; font-weight: 600; }
.ip-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
@media (prefers-reduced-motion: reduce) {
  .ip-wrap input { transition: none; }
}
`;

const HELP_TEXT: Record<string, { zh: string; en: string }> = {
  default: { zh: "支持字母、数字与下划线", en: "Letters, digits and underscores" },
  error: { zh: "该用户名已被占用", en: "This username is already taken" },
  warning: { zh: "用户名偏短,建议 6 个字符以上", en: "Short username — 6+ characters advised" },
};

/**
 * 输入框演示:label + 原生 textbox + 可清空后缀 + n/max 计数。
 * size / status / clearable / maxLength 均为 JS 型参数——订阅 store 后
 * 改写舞台 data-*;输入值与清空为 demo 本地状态。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [size, setSize] = useState(() => store.get("size") as string);
  const [status, setStatus] = useState(() => store.get("status") as string);
  const [clearable, setClearable] = useState(() => store.get("clearable") as string);
  const [maxLength, setMaxLength] = useState(() => store.get("maxLength") as number);
  const [value, setValue] = useState("");

  useEffect(
    () =>
      store.subscribe(() => {
        setSize(store.get("size") as string);
        setStatus(store.get("status") as string);
        setClearable(store.get("clearable") as string);
        setMaxLength(store.get("maxLength") as number);
      }),
    [store],
  );

  const over = maxLength > 0 && value.length > maxLength;
  const showClear = clearable === "on" && value.length > 0;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ip-stage" data-size={size} data-status={status} data-clearable={clearable}>
        <label className="ip-label" htmlFor="ip-demo-input">
          用户名 Username
        </label>
        <div className="ip-wrap">
          <input
            id="ip-demo-input"
            type="text"
            value={value}
            placeholder="请输入用户名 / Enter a username"
            aria-invalid={status === "error"}
            aria-describedby="ip-demo-help ip-demo-count"
            onChange={(e) => setValue(e.target.value)}
          />
          {showClear && (
            <button
              type="button"
              className="ip-clear"
              aria-label="清空用户名 Clear username"
              onClick={() => {
                setValue("");
                document.getElementById("ip-demo-input")?.focus();
              }}
            >
              ×
            </button>
          )}
        </div>
        <div className="ip-meta">
          <p id="ip-demo-help" className="ip-help">
            {HELP_TEXT[status]?.zh} / {HELP_TEXT[status]?.en}
          </p>
          {maxLength > 0 && (
            <p id="ip-demo-count" className={`ip-count${over ? " is-over" : ""}`} aria-live="polite">
              {value.length}/{maxLength}
              {over ? " 已超出 over" : ""}
            </p>
          )}
        </div>
      </div>
      <style>{css}</style>
      <p className="ip-hint">键盘 Keyboard:Tab 聚焦 · Ctrl/Cmd+A + Delete 清空 Clear</p>
    </DemoStage>
  );
}
