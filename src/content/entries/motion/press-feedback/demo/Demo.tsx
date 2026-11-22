import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.pf-stage { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 8px; }
.pf-row { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; justify-content: center; }
.pf-btn {
  border: 1px solid transparent; border-radius: 10px;
  padding: 11px 22px; font-size: 14px; font-weight: 600; color: #fff;
  background: linear-gradient(180deg, oklch(0.58 0.16 255), oklch(0.5 0.16 255));
  cursor: pointer; user-select: none; touch-action: manipulation;
  /* 松手回弹:120ms + Arco decelerate(调研 10§1.3);按下瞬时由 data-response 控制 */
  transition: all var(--press-release-ms, 120ms) cubic-bezier(0.4, 0.8, 0.74, 1);
}
.pf-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
/* 按压瞬时(Arco 官方 :active{transition:none} 的等价实现) */
.pf-stage[data-response="instant"] .pf-btn[data-pressed="true"] { transition: none; }
/* scale+alpha 按压对(社区常见值,未证实) */
.pf-stage[data-mode="scale"] .pf-btn[data-pressed="true"] {
  transform: scale(var(--press-scale, 0.97));
  opacity: var(--press-alpha, 0.8);
}
/* 色彩阶进:库默认语义——只换底色/明度,不动 transform(AntD 五属性/Apple 官网 :active 同族) */
.pf-stage[data-mode="color"] .pf-btn[data-pressed="true"] { filter: brightness(0.88) saturate(1.05); }
.pf-stage[data-mode="color"] .pf-btn[data-hover="true"] { filter: brightness(1.07); }
.pf-ghost {
  border: 1px solid var(--border); border-radius: 10px;
  padding: 11px 22px; font-size: 14px; color: var(--text);
  background: var(--surface); cursor: pointer; user-select: none; touch-action: manipulation;
  transition: all var(--press-release-ms, 120ms) cubic-bezier(0.4, 0.8, 0.74, 1);
}
.pf-ghost:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.pf-stage[data-response="instant"] .pf-ghost[data-pressed="true"] { transition: none; }
.pf-stage[data-mode="scale"] .pf-ghost[data-pressed="true"] {
  transform: scale(var(--press-scale, 0.97));
  opacity: var(--press-alpha, 0.8);
}
.pf-stage[data-mode="color"] .pf-ghost[data-pressed="true"] { background: color-mix(in srgb, var(--border) 55%, var(--surface)); }
.pf-readout {
  display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-dim);
  font-variant-numeric: tabular-nums;
}
.pf-badge {
  padding: 2px 12px; border-radius: 999px; border: 1px solid var(--border);
  background: var(--surface); color: var(--text-dim); min-width: 9.5em; text-align: center;
  transition: color 0.1s linear, border-color 0.1s linear, background-color 0.1s linear;
}
.pf-badge[data-hot="true"] { background: var(--accent); border-color: transparent; color: var(--bg); }
.pf-hint { max-width: 560px; font-size: 12px; color: var(--text-faint); line-height: 1.6; text-align: center; }
@media (prefers-reduced-motion: reduce) {
  .pf-btn, .pf-ghost, .pf-badge { transition: none; }
  .pf-stage[data-mode="scale"] .pf-btn[data-pressed="true"],
  .pf-stage[data-mode="scale"] .pf-ghost[data-pressed="true"] { transform: none; }
}
`;

/**
 * 按压反馈对演示:按下瞬时、松手 120ms 缓出(Arco 工艺结构)。
 * pressScale / pressAlpha / releaseDuration 为 CSS 变量型参数(经 DemoStage 注入);
 * pressResponse / mode 为 JS 型参数——订阅 store 后切 data-response / data-mode。
 * 按压态用 pointer + 键盘事件驱动(等价 UIControl.isHighlighted:按下进入、释放/移出退出),
 * 让鼠标按住、键盘按住 Space/Enter、触摸长按都能实时看到成对状态。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({
    pressResponse: store.get("pressResponse") as string,
    mode: store.get("mode") as string,
  });
  const [params, setParams] = useState(readParams);
  const [hot, setHot] = useState<"idle" | "primary" | "ghost">("idle");

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  const bind = (key: "primary" | "ghost") => ({
    "data-pressed": hot === key ? "true" : "false",
    "data-hover": hot === key ? "true" : "false",
    onPointerDown: (e: React.PointerEvent) => {
      // 指针捕获:按住拖出按钮仍保持 highlighted,释放即退出(成对语义)
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      setHot(key);
    },
    onPointerUp: () => setHot("idle"),
    onPointerCancel: () => setHot("idle"),
    onKeyDown: (e: React.KeyboardEvent) => {
      if ((e.key === " " || e.key === "Enter") && !e.repeat) setHot(key);
    },
    onKeyUp: (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") setHot("idle");
    },
    onBlur: () => setHot("idle"),
  });

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="pf-stage" data-response={params.pressResponse} data-mode={params.mode}>
        <div className="pf-row">
          <button type="button" className="pf-btn" {...bind("primary")}>
            主操作 Primary
          </button>
          <button type="button" className="pf-ghost" {...bind("ghost")}>
            次操作 Secondary
          </button>
        </div>
        <div className="pf-readout" aria-live="off">
          <span>UIControl.isHighlighted:</span>
          <span className="pf-badge" data-hot={hot !== "idle" ? "true" : "false"}>
            {hot !== "idle" ? "highlighted(按下中)" : "normal(释放)"}
          </span>
        </div>
        <p className="pf-hint">
          按住不放观察:按下瞬时生效(0ms),松手才走 {`--press-release-ms`} 缓出——状态成对、跟手即时 /
          Hold to observe: the press lands instantly, only the release eases back — a paired state with instant response.
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
