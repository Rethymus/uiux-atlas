import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
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
/* 弹簧宿主:逐帧直写 transform(调研 10 §7.4),--tst-from 仅作首帧占位
   (起点 = 自身高度 200% 外滑入,react-hot-toast 入场,调研 10 §5.1) */
.tst-item {
  position: relative;
  max-width: min(340px, 100%);
  pointer-events: auto;
  transform: translate3d(0, var(--tst-from, 0px), 0);
  will-change: transform;
}
/* 卡片层:视觉 + react-hot-toast 同款缩放/淡入(0.35s 过冲 bezier,调研 10 §5.1) */
.tst-card {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 14px;
  background: #fff; border: 1px solid #f0f0f0; border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05), 0 1px 6px -1px rgba(0,0,0,.03), 0 2px 4px 0 rgba(0,0,0,.03);
  font-size: 13px; color: rgba(0, 0, 0, 0.88);
  animation: tst-card-in 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) both;
}
.tst-item[data-kind="success"] { --toast-accent: #52c41a; }
.tst-item[data-kind="error"] { --toast-accent: #ff4d4f; }
.tst-item[data-kind="warning"] { --toast-accent: #faad14; }
.tst-item[data-kind="info"] { --toast-accent: #1677ff; }
.tst-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--toast-accent); flex: none; }
@keyframes tst-card-in {
  from { transform: scale(0.6); opacity: 0.5; }
  to { transform: scale(1); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .tst-item { transform: none; }
  .tst-card { animation: none; }
}
`;

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface ToastRowProps {
  toast: ToastEntry;
  duration: number;
  stiffness: number;
  damping: number;
  isTop: boolean;
  onDone: (id: number) => void;
}

/** 单条 toast:计时到点整块移除(antd「出场不排队」原则);入场由物理弹簧驱动。 */
function ToastRow({ toast, duration, stiffness, damping, isTop, onDone }: ToastRowProps) {
  const itemRef = useRef<HTMLDivElement | null>(null);
  /** 弹簧状态跨 effect 保留:调参中途从当前位置+当前速度继续(速度接力,调研 10 §2.2/§7.3) */
  const posRef = useRef<{ x: number; v: number }>({ x: Number.NaN, v: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    const timer = window.setTimeout(() => onDone(toast.id), duration);
    return () => window.clearTimeout(timer);
  }, [toast.id, duration, onDone]);

  // 入场弹簧:半隐式欧拉积分 m=1,公式与停机阈值对齐调研 10 §2.2 手写积分器(Motion spring.ts 同构);
  // 起点 = 自身高度 200% 外(react-hot-toast,调研 10 §5.1);逐帧直写 el.style.transform(调研 10 §7.4)。
  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    if (prefersReducedMotion()) {
      posRef.current = { x: 0, v: 0 };
      el.style.transform = "translate3d(0, 0, 0)";
      return;
    }
    let { x, v } = posRef.current;
    if (Number.isNaN(x)) {
      const h = el.offsetHeight || 44;
      x = isTop ? -2 * h : 2 * h;
      v = 0;
    }
    let last = performance.now();
    const restDelta = 0.002; // Motion granular restDelta = 0.01/5(调研 10 §2.2)
    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30); // 单步上限防跳帧爆炸
      last = now;
      const a = -stiffness * x - damping * v; // m·x'' + c·x' + k·x = 0(m=1)
      v += a * dt;
      x += v * dt;
      el.style.transform = `translate3d(0, ${x}px, 0)`;
      posRef.current = { x, v };
      if (Math.abs(v) > 0.01 || Math.abs(x) > restDelta) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        posRef.current = { x: 0, v: 0 };
        el.style.transform = "translate3d(0, 0, 0)";
      }
    };
    el.style.transform = `translate3d(0, ${x}px, 0)`;
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [stiffness, damping, isTop]);

  return (
    <div
      ref={itemRef}
      className="tst-item"
      role="alert"
      data-kind={toast.kind}
      style={{ "--tst-from": `${isTop ? "-" : ""}120px` } as CSSProperties}
    >
      <div className="tst-card">
        <span className="tst-dot" aria-hidden="true" />
        {toast.text}
      </div>
    </div>
  );
}

/**
 * 全局提示演示:duration / placement / maxCount / stiffness / damping 均为 JS 型参数——订阅 store 后
 * 分别驱动计时器、堆栈容器对齐(data-placement)、最旧条目截断与入场弹簧;
 * 每条 toast 用 role=alert(APG Alert 语义),Esc 清空全部(MUI Snackbar 无障碍要求)。
 * 入场弹簧默认 stiffness=100 / damping=10 = Motion spring.ts 源码默认(调研 10 §6.3);
 * 卡片层缩放/淡入 0.35s cubic-bezier(.21,1.02,.73,1) 为 react-hot-toast 入场曲线(调研 10 §5.1)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [duration, setDuration] = useState(() => store.get("duration") as number);
  const [placement, setPlacement] = useState(() => store.get("placement") as Placement);
  const [maxCount, setMaxCount] = useState(() => store.get("maxCount") as number);
  const [stiffness, setStiffness] = useState(() => store.get("stiffness") as number);
  const [damping, setDamping] = useState(() => store.get("damping") as number);
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const nextId = useRef(1);

  useEffect(
    () =>
      store.subscribe(() => {
        setDuration(store.get("duration") as number);
        setPlacement(store.get("placement") as Placement);
        setMaxCount(store.get("maxCount") as number);
        setStiffness(store.get("stiffness") as number);
        setDamping(store.get("damping") as number);
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

  const isTop = placement.startsWith("top");

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
        <p className="tst-hint">
          点按钮触发,Esc 清空全部;入场弹簧由面板 stiffness/damping 驱动 · Click to fire, Esc clears
          all; the entrance spring is driven by panel stiffness/damping
        </p>
      </div>
      <div className="tst-stack" data-placement={placement}>
        {toasts.map((t) => (
          <ToastRow
            key={t.id}
            toast={t}
            duration={duration}
            stiffness={stiffness}
            damping={damping}
            isTop={isTop}
            onDone={dismiss}
          />
        ))}
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
