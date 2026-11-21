import { useCallback, useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Placement =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type ToastKind = "success" | "error" | "warning" | "info";

interface ToastEntry {
  id: number;
  kind: ToastKind;
  text: string;
}

const TRIGGERS: { kind: ToastKind; zh: string; en: string }[] = [
  { kind: "success", zh: "成功", en: "Success" },
  { kind: "error", zh: "失败", en: "Error" },
  { kind: "warning", zh: "警告", en: "Warning" },
  { kind: "info", zh: "信息", en: "Info" },
];

const TOAST_TEXT: Record<ToastKind, string> = {
  success: "已保存到草稿箱 Saved to drafts",
  error: "网络错误,保存失败 Network error",
  warning: "存储空间不足 Storage almost full",
  info: "已同步 3 项更改 3 changes synced",
};

const css = `
.demo-stage { --toast-accent: #1677ff; }
.tst-page {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;
}
.tst-page-title { margin: 0; font-size: 13px; color: var(--text-faint); }
.tst-btns { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.tst-btn {
  border: 1px solid var(--border); border-radius: 8px; padding: 7px 14px;
  font-size: 13px; cursor: pointer; background: #fff; color: rgba(0, 0, 0, 0.88);
}
.tst-btn:hover { border-color: #1677ff; color: #1677ff; }
.tst-hint { margin: 0; font-size: 12px; color: var(--text-faint); }
.tst-stack {
  position: absolute; inset: 0; z-index: 20;
  display: flex; flex-direction: column; gap: 10px; padding: 14px;
  pointer-events: none; overflow: hidden;
}
.tst-stack[data-placement="top-left"] { align-items: flex-start; justify-content: flex-start; }
.tst-stack[data-placement="top-center"] { align-items: center; justify-content: flex-start; }
.tst-stack[data-placement="top-right"] { align-items: flex-end; justify-content: flex-start; }
.tst-stack[data-placement="bottom-left"] { align-items: flex-start; justify-content: flex-end; }
.tst-stack[data-placement="bottom-center"] { align-items: center; justify-content: flex-end; }
.tst-stack[data-placement="bottom-right"] { align-items: flex-end; justify-content: flex-end; }
.tst-item {
  display: flex; align-items: center; gap: 8px;
  max-width: min(340px, 100%); padding: 9px 14px;
  background: #fff; border: 1px solid #f0f0f0; border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05), 0 1px 6px -1px rgba(0,0,0,.03), 0 2px 4px 0 rgba(0,0,0,.03);
  font-size: 13px; color: rgba(0, 0, 0, 0.88); pointer-events: auto;
  animation: tst-in 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
.tst-item[data-kind="success"] { --toast-accent: #52c41a; }
.tst-item[data-kind="error"] { --toast-accent: #ff4d4f; }
.tst-item[data-kind="warning"] { --toast-accent: #faad14; }
.tst-item[data-kind="info"] { --toast-accent: #1677ff; }
.tst-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--toast-accent); flex: none; }
@keyframes tst-in {
  from { opacity: 0; translate: 0 -8px; }
  to { opacity: 1; translate: 0 0; }
}
.tst-stack[data-placement^="bottom"] .tst-item { animation-name: tst-in-bottom; }
@keyframes tst-in-bottom {
  from { opacity: 0; translate: 0 8px; }
  to { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .tst-item { animation: none; }
}
`;

/**
 * 单条 toast:挂载即启动计时,到时整块移除(antd「出场不排队」原则);
 * duration 变化会以新时长重启计时。
 */
function ToastRow({
  toast,
  duration,
  onDone,
}: {
  toast: ToastEntry;
  duration: number;
  onDone: (id: number) => void;
}) {
  useEffect(() => {
    const timer = window.setTimeout(() => onDone(toast.id), duration);
    return () => window.clearTimeout(timer);
  }, [toast.id, duration, onDone]);

  return (
    <div className="tst-item" role="alert" data-kind={toast.kind}>
      <span className="tst-dot" aria-hidden="true" />
      {toast.text}
    </div>
  );
}

/**
 * 全局提示演示:duration / placement / maxCount 均为 JS 型参数——订阅 store 后
 * 分别驱动计时器、堆栈容器对齐(data-placement)与最旧条目截断;
 * 每条 toast 用 role=alert(APG Alert 语义),Esc 清空全部(MUI Snackbar 无障碍要求)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [duration, setDuration] = useState(() => store.get("duration") as number);
  const [placement, setPlacement] = useState(() => store.get("placement") as Placement);
  const [maxCount, setMaxCount] = useState(() => store.get("maxCount") as number);
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const nextId = useRef(1);

  useEffect(
    () =>
      store.subscribe(() => {
        setDuration(store.get("duration") as number);
        setPlacement(store.get("placement") as Placement);
        setMaxCount(store.get("maxCount") as number);
      }),
    [store],
  );

  const push = (kind: ToastKind) => {
    setToasts((prev) => {
      const next: ToastEntry[] = [
        ...prev,
        { id: nextId.current, kind, text: TOAST_TEXT[kind] },
      ];
      nextId.current += 1;
      // AntD message.config.maxCount:超出上限移除最旧一条
      return next.length > maxCount ? next.slice(next.length - maxCount) : next;
    });
  };

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setToasts([]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toasts.length]);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="tst-page">
        <p className="tst-page-title">页面内容 Page content</p>
        <div className="tst-btns" role="group" aria-label="触发全局提示 Trigger toasts">
          {TRIGGERS.map((b) => (
            <button key={b.kind} type="button" className="tst-btn" onClick={() => push(b.kind)}>
              {b.zh} {b.en}
            </button>
          ))}
        </div>
        <p className="tst-hint">点按钮触发,Esc 清空全部 · Click to fire, Esc clears all</p>
      </div>
      <div className="tst-stack" data-placement={placement}>
        {toasts.map((t) => (
          <ToastRow key={t.id} toast={t} duration={duration} onDone={dismiss} />
        ))}
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
