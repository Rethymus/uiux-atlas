import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Transition } from "motion/react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface ToastParams {
  stiffness: number;
  damping: number;
  edge: string;
  lifetime: number;
}

interface ToastItem {
  id: number;
  text: string;
}

const MAX_STACK = 3;

const css = `
.ts-stage { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 8px; }
.ts-launch {
  border: 1px solid transparent; border-radius: 999px; padding: 9px 22px;
  font-size: 13px; font-weight: 600; color: #fff; cursor: pointer;
  background: linear-gradient(180deg, oklch(0.58 0.16 255), oklch(0.5 0.16 255));
}
.ts-launch:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.ts-readout { font-size: 12px; color: var(--text-dim); font-variant-numeric: tabular-nums; display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
.ts-tag { padding: 1px 10px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); }
.ts-stack {
  position: absolute; left: 50%; translate: -50% 0;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  width: min(300px, calc(100% - 28px)); z-index: 5; pointer-events: none;
}
.ts-stage[data-edge="bottom"] .ts-stack { bottom: 14px; }
.ts-stage[data-edge="top"] .ts-stack { top: 14px; }
.ts-toast {
  pointer-events: auto;
  display: flex; align-items: center; gap: 10px;
  width: 100%; padding: 10px 12px; border-radius: 11px;
  background: var(--surface); border: 1px solid var(--border);
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.3);
  font-size: 13px; color: var(--text);
}
.ts-dot { width: 9px; height: 9px; border-radius: 50%; background: oklch(0.68 0.16 150); flex: none; }
.ts-toast .ts-close {
  margin-left: auto; border: 0; background: transparent; color: var(--text-faint);
  font-size: 13px; cursor: pointer; padding: 2px 6px; border-radius: 6px;
}
.ts-toast .ts-close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.ts-hint { max-width: 560px; font-size: 12px; color: var(--text-faint); line-height: 1.6; text-align: center; }
`;

/**
 * Toast 弹簧入场演示:真弹簧(Motion spring, stiffness/damping 可调)从边缘弹入,
 * 退场 0.4s 纯缓出(research 10§5.1 出场曲线),生命周期 lifetime 到点自动消失(sonner 同款)。
 * 全部四个参数为 JS 型——订阅 store 后组装 Transition 与堆叠方向。
 * 容器 role=status(aria-live=polite);reduced-motion 时入/出均退化为纯 fade。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = (): ToastParams => ({
    stiffness: store.get("stiffness") as number,
    damping: store.get("damping") as number,
    edge: store.get("edge") as string,
    lifetime: store.get("lifetime") as number,
  });
  const [params, setParams] = useState<ToastParams>(readParams);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const reduced = useReducedMotion() === true;
  const idRef = useRef(0);
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  // 卸载时清理全部计时器
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      for (const t of timers.values()) clearTimeout(t);
      timers.clear();
    };
  }, []);

  const dismiss = (id: number) => {
    const t = timersRef.current.get(id);
    if (t) {
      clearTimeout(t);
      timersRef.current.delete(id);
    }
    setToasts((list) => list.filter((x) => x.id !== id));
  };

  const fire = (text: string) => {
    const id = ++idRef.current;
    setToasts((list) => [...list.slice(-(MAX_STACK - 1)), { id, text }]);
    const timer = setTimeout(() => dismiss(id), params.lifetime);
    timersRef.current.set(id, timer);
  };

  const dir = params.edge === "top" ? -1 : 1;
  const enterTransition = (): Transition =>
    reduced
      ? { duration: 0.2, ease: "linear" }
      : { type: "spring", stiffness: params.stiffness, damping: params.damping, mass: 1 };
  const exitTransition = (): Transition =>
    reduced ? { duration: 0.2, ease: "linear" } : { duration: 0.4, ease: [0.06, 0.71, 0.55, 1] };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ts-stage" data-edge={params.edge}>
        <button type="button" className="ts-launch" onClick={() => fire("已保存到云端 Saved to cloud")}>
          触发成功 Toast Fire a success toast
        </button>
        <div className="ts-readout" aria-live="off">
          <span className="ts-tag">stiffness {params.stiffness}</span>
          <span className="ts-tag">damping {params.damping}</span>
          <span className="ts-tag">lifetime {params.lifetime}ms</span>
          <span className="ts-tag">{reduced ? "reduced-motion: 纯 fade" : "spring 入场 · 0.4s 缓出退场"}</span>
        </div>
        <div
          className="ts-stack"
          role="status"
          aria-live="polite"
        >
          <AnimatePresence initial={false}>
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                className="ts-toast"
                initial={{ y: `${dir * 160}%`, scale: 0.6, opacity: 0.5 }}
                animate={{ y: "0%", scale: 1, opacity: 1, transition: enterTransition() }}
                exit={{
                  y: `${dir * 160}%`,
                  scale: 0.6,
                  opacity: 0,
                  transition: exitTransition(),
                }}
              >
                <span className="ts-dot" aria-hidden="true" />
                <span>{t.text}</span>
                <button
                  type="button"
                  className="ts-close"
                  aria-label={`关闭 ${t.text}`}
                  onClick={() => dismiss(t.id)}
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <p className="ts-hint">
          入场真弹簧(参数可调),退场 0.4s 纯缓出回边缘,{params.lifetime}ms 自动消失,堆叠上限 {MAX_STACK} 条;
          toast 只承载非关键信息,与 components/toast(全局提示)条目互为姊妹条目 /
          True spring in, 0.4s ease-out back to the edge, auto-dismiss at {params.lifetime}ms, stack capped at {MAX_STACK}.
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
