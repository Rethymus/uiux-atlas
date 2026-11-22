import { useEffect, useMemo, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 字段定义:name + 系统可代填的示例值(assisted 模式用) */
const FIELD_POOL = [
  { key: "recipient", label: "收件人 Recipient", system: "王小明 W. Xiao" },
  { key: "phone", label: "电话 Phone", system: "138****8888" },
  { key: "address", label: "地址 Address", system: "杭州市…区…号" },
  { key: "timeslot", label: "时段 Timeslot", system: "工作日 14:00–18:00" },
  { key: "packing", label: "包装 Packing", system: "标准纸箱" },
  { key: "note", label: "备注 Note", system: "放前台" },
  { key: "invoice", label: "发票 Invoice", system: "电子普票" },
  { key: "insurance", label: "保价 Insurance", system: "按申报价" },
];

const css = `
.tl-field { position: absolute; inset: 0; }
.tl-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(340px, calc(100% - 200px));
  padding: 16px 18px;
  border: 1px solid oklch(0.5 0 0 / 0.3);
  border-radius: 14px;
  background: oklch(1 0 0 / 0.8);
  font-size: 12.5px;
}
.tl-form-title { margin: 0 0 10px; font-size: 14px; }
.tl-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px dashed oklch(0.5 0 0 / 0.15);
}
.tl-row label { font-weight: 600; }
.tl-value { font-size: 12px; color: oklch(0.3 0.02 250); }
.tl-fill {
  border: 1px solid oklch(0.55 0.13 250 / 0.6);
  border-radius: 8px;
  padding: 3px 10px;
  background: transparent;
  color: oklch(0.45 0.12 250);
  font-size: 12px;
  cursor: pointer;
}
.tl-lock {
  font-size: 11px;
  color: oklch(0.45 0.1 150);
  white-space: nowrap;
}
.tl-unlock {
  border: 0;
  background: transparent;
  color: oklch(0.5 0 0 / 0.6);
  font-size: 11px;
  cursor: pointer;
  text-decoration: underline;
}
.tl-actions { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
.tl-btn {
  border: 0;
  border-radius: 9px;
  padding: 7px 14px;
  background: oklch(0.55 0.13 250);
  color: #fff;
  font-size: 12.5px;
  cursor: pointer;
}
.tl-btn[disabled] { opacity: 0.45; cursor: default; }
.tl-meter {
  position: absolute;
  left: 12px;
  bottom: 12px;
  width: min(300px, calc(100% - 220px));
  font-size: 12px;
}
.tl-bar {
  display: flex;
  height: 14px;
  border-radius: 7px;
  overflow: hidden;
  margin-top: 5px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
}
.tl-bar .user { background: oklch(0.62 0.15 300); transition: width 0.25s ease; }
.tl-bar .sys { background: oklch(0.62 0.13 150); transition: width 0.25s ease; }
.tl-legend { display: flex; gap: 14px; margin-top: 4px; font-size: 11px; opacity: 0.8; }
.tl-panel {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 170px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
  line-height: 1.7;
  font-variant-numeric: tabular-nums;
}
.tl-hint {
  position: absolute;
  left: 12px;
  top: 36px;
  max-width: 32%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.65;
}
@media (max-width: 480px) {
  .tl-panel, .tl-hint { display: none; }
  .tl-card { width: calc(100% - 24px); }
}
@media (prefers-reduced-motion: reduce) {
  .tl-bar .user, .tl-bar .sys { transition: none; }
}
`;

export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [mode, setMode] = useState(() => store.get("mode") as string);
  const [fields, setFields] = useState(() => store.get("fields") as number);
  const [filled, setFilled] = useState<Record<string, string>>({});
  const [unlocked, setUnlocked] = useState<Record<string, boolean>>({});
  const [clicks, setClicks] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(
    () =>
      store.subscribe(() => {
        setMode(store.get("mode") as string);
        setFields(store.get("fields") as number);
      }),
    [store],
  );

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const active = useMemo(() => FIELD_POOL.slice(0, fields), [fields]);
  const assisted = mode === "assisted";
  const sysCount = assisted ? Math.max(0, fields - 2) : 0;

  // 模式/字段数变化时重建预填
  useEffect(() => {
    const next: Record<string, string> = {};
    active.forEach((f, i) => {
      if (assisted && i < sysCount) next[f.key] = f.system;
    });
    setFilled(next);
    setUnlocked({});
    setClicks(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, fields]);

  const userRemaining = active.length - sysCount;
  const userDone = active.filter(
    (f, i) => filled[f.key] && !(assisted && i < sysCount && !unlocked[f.key]),
  ).length;

  const fillOne = (key: string, value: string) => {
    setFilled((f) => ({ ...f, [key]: value }));
    setClicks((c) => c + 1);
  };

  const autoFill = () => {
    active.forEach((f, i) => {
      if (filled[f.key]) return;
      if (assisted && active.findIndex((x) => x.key === f.key) < sysCount) return;
      const t = window.setTimeout(() => fillOne(f.key, `示例值 ${i + 1}`), 300 * i);
      timers.current.push(t);
    });
  };

  const allReady = active.every((f) => filled[f.key]);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="tl-field">
        <p className="tl-hint">
          同一张表单两种模式:manual 全部手填,assisted 系统代填并锁定——复杂度没有消失,只是换了承担方。
          One form, two modes: manual fills everything, assisted delegates to the system — complexity moves, it never vanishes.
        </p>

        <div className="tl-card">
          <p className="tl-form-title">寄件表单 Shipping form</p>
          {active.map((f, i) => {
            const sysFilled = assisted && i < sysCount && !unlocked[f.key];
            return (
              <div className="tl-row" key={f.key}>
                <label htmlFor={`tl-${f.key}`}>{f.label}</label>
                {filled[f.key] ? (
                  <span className="tl-value">
                    {filled[f.key]}
                    {sysFilled && (
                      <button type="button" className="tl-unlock" onClick={() => { setUnlocked((u) => ({ ...u, [f.key]: true })); setClicks((c) => c + 1); }}>
                        修改 change
                      </button>
                    )}
                  </span>
                ) : sysFilled ? (
                  <span className="tl-lock">系统代填 by system</span>
                ) : (
                  <button type="button" id={`tl-${f.key}`} className="tl-fill" onClick={() => fillOne(f.key, `示例值 ${i + 1}`)}>
                    填写 fill
                  </button>
                )}
              </div>
            );
          })}
          <div className="tl-actions">
            <button type="button" className="tl-btn" onClick={autoFill} disabled={allReady}>
              演示填写 Auto-fill demo
            </button>
            <button type="button" className="tl-btn" disabled={!allReady} style={{ background: allReady ? "oklch(0.6 0.13 150)" : undefined }}>
              提交 Submit
            </button>
          </div>
        </div>

        <div className="tl-meter">
          <strong>复杂度承担 Complexity borne by</strong>
          <div className="tl-bar" role="img" aria-label={`用户承担 ${userRemaining} 项,系统承担 ${sysCount} 项`}>
            <span className="user" style={{ width: `${(userRemaining / active.length) * 100}%` }} />
            <span className="sys" style={{ width: `${(sysCount / active.length) * 100}%` }} />
          </div>
          <div className="tl-legend">
            <span>■ 用户 user {userRemaining} 项</span>
            <span>■ 系统 system {sysCount} 项</span>
            <span>点击 {clicks} 次</span>
          </div>
        </div>

        <aside className="tl-panel">
          <b>当前模式 Mode</b>
          <p style={{ margin: 0 }}>
            {assisted ? "assisted 系统代办" : "manual 全手动"}
            <br />
            字段 fields: {fields}
            <br />
            已就绪 ready: {userDone}/{fields}
            <br />
            <span style={{ fontSize: 11, opacity: 0.7 }}>
              assisted 里紫色=仍由用户承担;锁定项可「修改」解锁。
            </span>
          </p>
        </aside>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
