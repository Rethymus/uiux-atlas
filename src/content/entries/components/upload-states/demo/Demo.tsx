import { useEffect, useRef, useState } from "react";
import type { ChangeEvent as ReactChangeEvent, DragEvent as ReactDragEvent } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type UpStatus = "uploading" | "done" | "error";

interface UpFile {
  id: number;
  name: string;
  size: string;
  status: UpStatus;
  percent: number;
  willFail: boolean;
}

const STATUS_TEXT: Record<UpStatus, string> = {
  uploading: "上传中 Uploading",
  done: "已完成 Done",
  error: "上传失败 Failed",
};

const css = `
.up-stage { width: min(520px, calc(100% - 48px)); }
.up-drop {
  display: grid;
  justify-items: center;
  gap: 4px;
  width: 100%;
  box-sizing: border-box;
  padding: 22px 16px;
  border: 1px dashed #d9d9d9;                 /* colorBorder */
  border-radius: 6px;
  background: transparent;
  color: rgba(0, 0, 0, 0.88);
  font: inherit;
  cursor: pointer;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
              border-width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
              background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.up-drop:hover { border-color: #1677ff; }
.up-drop:focus-visible { outline: 2px solid #1677ff; outline-offset: -2px; }
.up-drop.is-drag {
  border: 2px solid #1677ff;                  /* Carbon:拖入边框变色加粗(07§14) */
  background: #E6F4FF;                        /* controlItemBgActive 蓝板第 1 阶 */
}
.up-head { font-size: 14px; font-weight: 500; }
.up-desc { font-size: 12px; color: rgba(0, 0, 0, 0.45); }
.up-ic { font-size: 20px; color: #1677ff; }
.up-btn {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: #fff;
  color: rgba(0, 0, 0, 0.88);
  font: inherit;
  font-size: 14px;
  padding: 4px 14px;
  cursor: pointer;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.up-btn:hover { border-color: #1677ff; color: #1677ff; }
.up-btn:focus-visible { outline: 2px solid #1677ff; outline-offset: 2px; }
.up-input {
  /* 视觉隐藏(MUI label+隐藏 input 模式,07§1) */
  position: absolute;
  width: 1px;
  height: 1px;
  clip-path: inset(50%);
  overflow: hidden;
  white-space: nowrap;
}
.up-note { margin: 8px 0 0; font-size: 12px; color: #ff4d4f; min-height: 1.4em; }
.up-live { margin: 8px 0 0; font-size: 12px; color: rgba(0, 0, 0, 0.45); }
.up-list { margin: 10px 0 0; padding: 0; list-style: none; }
.up-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 7px 8px;
  border-radius: 4px;
  font-size: 13px;
}
.up-row + .up-row { border-top: 1px solid #f0f0f0; }
.up-row:hover { background: rgba(0, 0, 0, 0.04); }   /* FillTertiary */
.up-ic-sm { width: 16px; text-align: center; font-size: 12px; }
.up-ic-sm.is-done { color: #52c41a; }
.up-ic-sm.is-error { color: #ff4d4f; }
.up-ic-sm.is-upload { color: #1677ff; animation: up-spin 1s linear infinite; }
@keyframes up-spin { to { rotate: 360deg; } }
.up-line { display: flex; align-items: center; gap: 8px; min-width: 0; }
.up-line + .up-line { margin-top: 3px; }
.up-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.88);
}
.up-size { flex: none; color: rgba(0, 0, 0, 0.45); font-size: 12px; }
.up-bar {
  position: relative;
  flex: none;
  width: 72px;
  height: 4px;
  border-radius: 2px;
  background: #f0f0f0;
  overflow: hidden;
}
.up-bar-fill {
  position: absolute;
  inset: 0 auto 0 0;
  background: #1677ff;
  transition: width 0.12s linear;
}
.up-state { flex: none; font-size: 12px; color: rgba(0, 0, 0, 0.45); }
.up-row[data-status="done"] .up-state { color: #52c41a; }
.up-row[data-status="error"] .up-state { color: #ff4d4f; }
.up-fix {
  margin-top: 4px;
  font-size: 12px;
  color: #ff4d4f;
  display: flex;
  align-items: center;
  gap: 8px;
}
.up-act {
  border: 0;
  padding: 2px 6px;
  border-radius: 4px;
  background: transparent;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  cursor: pointer;
}
.up-act.up-act-retry { color: #1677ff; }
.up-act:hover { color: rgba(0, 0, 0, 0.88); background: rgba(0, 0, 0, 0.06); }
.up-act.up-act-retry:hover { color: #0958d9; background: #E6F4FF; }
.up-act:focus-visible { outline: 2px solid #1677ff; outline-offset: 1px; }
.up-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
@media (prefers-reduced-motion: reduce) {
  .up-drop, .up-btn { transition: none; }
  .up-ic-sm.is-upload { animation: none; }
  .up-bar-fill { transition: none; }
}
`;

let uid = 0;

/**
 * 上传五态演示:入口(点击/拖拽)→ 拖拽悬停 → uploading(百分比)→ done / error(+修复指引+重试)→ removed。
 * variant / simulate / maxCount 为 JS 型参数——订阅 store 后驱动;
 * 进度为教学模拟(150ms × 10 步 ≈ 1.5s),不发送网络请求;入口是视觉隐藏的原生 <input type="file">。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [variant, setVariant] = useState(() => store.get("variant") as string);
  const [simulate, setSimulate] = useState(() => store.get("simulate") as string);
  const [maxCount, setMaxCount] = useState(() => store.get("maxCount") as number);

  const [files, setFiles] = useState<UpFile[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const noticeTimer = useRef<number | null>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setVariant(store.get("variant") as string);
        setSimulate(store.get("simulate") as string);
        setMaxCount(store.get("maxCount") as number);
      }),
    [store],
  );

  // 单一心跳推进所有 uploading 文件(教学模拟:150ms × 10 步 ≈ 1.5s)
  useEffect(() => {
    const t = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.status !== "uploading") return f;
          const pct = Math.min(100, f.percent + 10);
          if (f.willFail && pct >= 60) return { ...f, percent: 60, status: "error" as const };
          if (pct >= 100) return { ...f, percent: 100, status: "done" as const };
          return { ...f, percent: pct };
        }),
      );
    }, 150);
    return () => clearInterval(t);
  }, []);

  // 状态变化播报(aria-live)
  const doneCount = files.filter((f) => f.status === "done").length;
  const errCount = files.filter((f) => f.status === "error").length;
  const liveMsg =
    files.length === 0
      ? "文件列表为空 Empty list"
      : `${files.length} 个文件:${doneCount} 已完成,${errCount} 失败,${files.length - doneCount - errCount} 上传中`;

  const flashNotice = (msg: string) => {
    setNotice(msg);
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(null), 2600);
  };

  const addFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const room = maxCount - files.length;
    if (room <= 0) {
      flashNotice(`已达上限 ${maxCount} 个文件 Limit reached`);
      return;
    }
    const take = Array.from(list).slice(0, room);
    if (list.length > room) flashNotice(`已达上限 ${maxCount} 个文件,仅添加 ${room} 个 Limit reached`);
    setFiles((prev) => [
      ...prev,
      ...take.map((f) => ({
        id: ++uid,
        name: f.name,
        size: `${Math.max(1, Math.round(f.size / 1024))} KB`,
        status: "uploading" as const,
        percent: 0,
        willFail: simulate === "fail",
      })),
    ]);
  };

  const onInputChange = (e: ReactChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = "";
    // Carbon:文件选择框关闭后焦点回触发元素(07§14)——浏览器原生行为,显式兜底
    triggerRef.current?.focus();
  };

  const onDrop = (e: ReactDragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: ReactDragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const remove = (id: number) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const retry = (id: number) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: "uploading", percent: 0, willFail: simulate === "fail" } : f,
      ),
    );
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="up-stage">
        {variant === "dropzone" ? (
          <button
            type="button"
            ref={triggerRef}
            className={`up-drop${dragOver ? " is-drag" : ""}`}
            aria-describedby="up-desc"
            onClick={() => inputRef.current?.click()}
            onDragOver={onDragOver}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
          >
            <span className="up-ic" aria-hidden="true">⇪</span>
            <span className="up-head">点击或拖拽文件到此处 Click or drop files</span>
            <span className="up-desc" id="up-desc">
              支持 JPG / PNG,单个不超过 2 MB(demo 文案)JPG/PNG up to 2 MB each
            </span>
          </button>
        ) : (
          <button
            type="button"
            ref={triggerRef}
            className="up-btn"
            onClick={() => inputRef.current?.click()}
          >
            选择文件 Select file
          </button>
        )}
        <input
          ref={inputRef}
          className="up-input"
          type="file"
          multiple
          tabIndex={-1}
          aria-hidden="true"
          onChange={onInputChange}
        />
        <p className="up-note" role="status">{notice ?? ""}</p>
        {files.length > 0 && (
          <ul className="up-list" aria-label="上传文件列表 Upload list">
            {files.map((f) => (
              <li key={f.id} className="up-row" data-status={f.status}>
                <span
                  className={`up-ic-sm ${f.status === "done" ? "is-done" : f.status === "error" ? "is-error" : "is-upload"}`}
                  aria-hidden="true"
                >
                  {f.status === "done" ? "✓" : f.status === "error" ? "✕" : "⟳"}
                </span>
                <div className="up-main">
                  <div className="up-line">
                    <span className="up-name" title={f.name}>{f.name}</span>
                    <span className="up-size">{f.size}</span>
                  </div>
                  {f.status === "uploading" && (
                    <div className="up-line">
                      <span className="up-bar" aria-hidden="true">
                        <span className="up-bar-fill" style={{ width: `${f.percent}%` }} />
                      </span>
                      <span className="up-state">{f.percent}% · {STATUS_TEXT.uploading}</span>
                    </div>
                  )}
                  {f.status !== "uploading" && (
                    <div className="up-line">
                      <span className="up-state">{STATUS_TEXT[f.status]}</span>
                    </div>
                  )}
                  {f.status === "error" && (
                    <div className="up-fix">
                      网络中断,请检查连接后重试 Network hiccup — retry
                      <button
                        type="button"
                        className="up-act up-act-retry"
                        aria-label={`重试上传 ${f.name}`}
                        onClick={() => retry(f.id)}
                      >
                        重试 Retry
                      </button>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="up-act"
                  aria-label={`删除文件 ${f.name}`}
                  onClick={() => remove(f.id)}
                >
                  ✕ 删除
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="up-live" aria-live="polite">{liveMsg}</p>
      </div>
      <style>{css}</style>
      <p className="up-hint">五态 Five states:点击/拖拽入口 · 拖入悬停 · 上传中(%)· 成功 ✓ · 失败 ✕(修复指引/重试)· 删除=removed</p>
    </DemoStage>
  );
}
