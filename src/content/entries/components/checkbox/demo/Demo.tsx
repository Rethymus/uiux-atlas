import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const CHANNELS = [
  { value: "email", label: "邮件通知 Email" },
  { value: "sms", label: "短信通知 SMS" },
  { value: "inapp", label: "站内信通知 In-app" },
];

const css = `
.ck-stage { width: min(300px, calc(100% - 48px)); }
.ck-group { border: 1px solid #f0f0f0; border-radius: 8px; padding: 12px 16px 8px; background: #fff; margin: 0; }
.ck-group legend { font-size: 14px; font-weight: 500; color: rgba(0, 0, 0, 0.88); padding: 0 4px; }
.ck-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  cursor: pointer;
}
.ck-row input {
  appearance: none;
  width: 16px;
  height: 16px;
  margin: 0;
  flex: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.ck-row input:hover { border-color: #1677ff; }
.ck-row input:focus-visible { outline: 2px solid #1677ff; outline-offset: 1px; }
.ck-row input:checked, .ck-row input:indeterminate { background: #1677ff; border-color: #1677ff; }
.ck-row input:checked::after {
  content: "";
  width: 8px;
  height: 4px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translate(0, -1px);
}
.ck-row input:indeterminate::after {
  content: "";
  width: 8px;
  height: 2px;
  background: #fff;
}
.ck-group[data-disabled="on"] { opacity: 0.45; }
.ck-group[data-disabled="on"] .ck-row { cursor: not-allowed; }
.ck-state { margin: 10px 0 0; font-size: 12px; color: rgba(0, 0, 0, 0.45); font-variant-numeric: tabular-nums; }
.ck-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
@media (prefers-reduced-motion: reduce) {
  .ck-row input { transition: none; }
}
`;

/**
 * 多选框演示:fieldset/legend 组语义 + 全选框(半选 indeterminate)+ 三个子项。
 * selectAll 为双向参数:子项点击重算派生后回写;面板改动与派生不一致时才广播给子项
 * (避免回环)。半选态双通道:input.indeterminate(ref 命令式设置)+ aria-checked="mixed"。
 * disabled 经 fieldset 原生属性整组禁用。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [disabled, setDisabled] = useState(() => store.get("disabled") as string);
  const [checkedSet, setCheckedSet] = useState<Set<string>>(() => new Set());
  const allRef = useRef<HTMLInputElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setDisabled(store.get("disabled") as string);
        // 全选参数 → 子项:仅当参数与当前派生不一致(即来源是面板)时广播,避免回环
        const sel = store.get("selectAll") as string;
        setCheckedSet((prev) => {
          const paramOn = sel === "on";
          const derivedOn = prev.size === CHANNELS.length;
          if (paramOn === derivedOn) return prev;
          return paramOn ? new Set(CHANNELS.map((c) => c.value)) : new Set<string>();
        });
      }),
    [store],
  );

  const allChecked = checkedSet.size === CHANNELS.length;
  const someChecked = checkedSet.size > 0 && !allChecked;

  // 半选态视觉通道:indeterminate DOM 属性(React 不透传,须命令式设置)
  useEffect(() => {
    if (allRef.current) allRef.current.indeterminate = someChecked;
  }, [someChecked]);

  const toggleAll = () => {
    const next = new Set(allChecked ? [] : CHANNELS.map((c) => c.value));
    setCheckedSet(next);
    store.set("selectAll", next.size === CHANNELS.length ? "on" : "off");
  };

  const toggleChild = (value: string) => {
    const next = new Set(checkedSet);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setCheckedSet(next);
    store.set("selectAll", next.size === CHANNELS.length ? "on" : "off");
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ck-stage">
        <fieldset
          className="ck-group"
          data-disabled={disabled}
          disabled={disabled === "on"}
        >
          <legend>通知方式 Notification channels</legend>
          <label className="ck-row">
            <input
              ref={allRef}
              type="checkbox"
              checked={allChecked}
              aria-checked={someChecked ? "mixed" : undefined}
              onChange={toggleAll}
            />
            <span>全选 Select all</span>
          </label>
          {CHANNELS.map((c) => (
            <label className="ck-row" key={c.value}>
              <input
                type="checkbox"
                checked={checkedSet.has(c.value)}
                onChange={() => toggleChild(c.value)}
              />
              <span>{c.label}</span>
            </label>
          ))}
          <p className="ck-state" aria-live="polite">
            aria-checked = {someChecked ? '"mixed" (半选 indeterminate)' : allChecked ? '"true" (on)' : '"false" (off)'}
            {" · 已选 selected "}
            {checkedSet.size}/{CHANNELS.length}
          </p>
        </fieldset>
      </div>
      <style>{css}</style>
      <p className="ck-hint">键盘 Keyboard:Space 切换 Toggle · 半选时点全选 = 补齐 Select-all completes</p>
    </DemoStage>
  );
}
