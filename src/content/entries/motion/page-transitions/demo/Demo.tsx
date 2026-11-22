import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type PatternId = "container" | "forward" | "lateral" | "toplevel" | "enterexit" | "skeleton";

/** 六模式的官方描述与推荐配对(调研 04§3.3 + §1.4);settle = 动画序列总时长系数 */
const PATTERNS: Record<PatternId, { desc: { zh: string; en: string }; pair: { zh: string; en: string }; settle: number }> = {
  container: {
    desc: { zh: "持久容器连接起止态:Card/FAB/搜索框无缝展开为详情,关系最强", en: "A persistent container links both states: Card/FAB/search expands into detail — the strongest relationship" },
    pair: { zh: "推荐 Emphasized 500ms(屏内大面积;CSS 无等价,Standard 兜底)", en: "Emphasized 500ms (large on-screen; no CSS equivalent — Standard fallback)" },
    settle: 1,
  },
  forward: {
    desc: { zh: "层级前进/后退:Android 滑动+淡出(减少位移量)、iOS 视差", en: "Hierarchy travel: Android slide+fade (minimized travel), iOS parallax" },
    pair: { zh: "按官方配对表:进入 decel 400ms / 退出 accel 200ms", en: "Per the pairing table: enter decel 400ms / exit accel 200ms" },
    settle: 1,
  },
  lateral: {
    desc: { zh: "同级横滑(tabs/carousels):成组齐滑,无淡出/视差,暗示可手势滑动", en: "Same-level slide (tabs/carousels): the group moves together, no fade/parallax, hinting swipe" },
    pair: { zh: "屏内起止 Standard 300ms", en: "On-screen Standard 300ms" },
    settle: 1,
  },
  toplevel: {
    desc: { zh: "顶层目的地切换(nav/rail/drawer):先快速淡出再淡入,刻意不用持久元素", en: "Top-level destinations (nav/rail/drawer): quick fade out then in, deliberately without a persistent element" },
    pair: { zh: "退出 accel 200ms + 进入 Standard 300ms(按官方配对表)", en: "Exit accel 200ms + enter Standard 300ms (per the pairing table)" },
    settle: 1,
  },
  enterexit: {
    desc: { zh: "沿出入点方向进出:sheet/键盘自底部、抽屉自侧缘;临时退出暗示可召回", en: "In/out along the origin direction: sheets/keyboards from the bottom, drawers from a side; temporary exits hint recallability" },
    pair: { zh: "临时退出/进入官方指定 Emphasized(CSS 用 Standard 兜底)", en: "Temporary exits/enters officially take Emphasized (Standard fallback in CSS)" },
    settle: 1,
  },
  skeleton: {
    desc: { zh: "骨架脉动暗示内容落点,稳定布局;完成后内容快速淡入", en: "A pulsing skeleton hints where content lands and stabilizes layout; content fades in fast after" },
    pair: { zh: "脉动时长官方未定值;完成后快速淡入(官方)", en: "No official pulse duration; fast fade-in on completion (official)" },
    settle: 2.3,
  },
};

const BEZIER = "cubic-bezier(0.2, 0, 0, 1)"; // Standard;Emphasized 的官方 CSS 兜底(调研 04§1.4)

const css = `
.pt-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 14px; }
.pt-device {
  position: relative; flex: 1; min-height: 0; margin: 0 auto; width: min(340px, 100%);
  border: 1px solid var(--border); border-radius: 18px; overflow: hidden;
  background: color-mix(in srgb, var(--accent) 4%, var(--surface));
}
.pt-screen { position: absolute; inset: 0; padding: 16px; display: flex; flex-direction: column; gap: 8px; background: var(--surface); }
.pt-screen h3 { margin: 2px 0 0; font-size: 14px; font-weight: 650; }
.pt-row {
  padding: 9px 12px; border-radius: 10px; border: 1px solid var(--border);
  font-size: 12px; color: var(--text-dim); background: color-mix(in srgb, var(--accent) 4%, var(--surface));
}
.pt-fab {
  position: absolute; right: 14px; bottom: 14px; width: 44px; height: 44px;
  border-radius: 999px; background: color-mix(in srgb, var(--accent) 80%, black);
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.25);
}
.pt-fab::before { content: "+"; position: absolute; inset: 0; display: grid; place-items: center; color: #fff; font-size: 20px; }
.pt-detail p { margin: 8px 0 0; font-size: 12px; line-height: 1.6; color: var(--text-dim); }
.pt-b-content { display: flex; flex-direction: column; gap: 8px; }
.pt-scrim { position: absolute; inset: 0; background: rgb(0 0 0 / 0.45); opacity: 0; pointer-events: none; }

/* —— 模式动画:时长统一走 --pt-dur,曲线固定 Standard(Emphasized 的官方 CSS 兜底)—— */
/* container:FAB 以右下角为原点展开为整屏(持久容器;origin 对准 FAB 中心) */
.pt-b.in-container, .pt-b.out-container { transform-origin: calc(100% - 36px) calc(100% - 36px); }
.pt-b.in-container { animation: pt-container-in var(--pt-dur) ${BEZIER} both; }
.pt-b.out-container { animation: pt-container-out var(--pt-dur) ${BEZIER} both; }
.pt-a.in-container, .pt-a.out-container { animation: none; }
@keyframes pt-container-in {
  from { transform: scale(0.15); border-radius: 999px; }
  to { transform: none; border-radius: 0; }
}
@keyframes pt-container-out {
  from { transform: none; border-radius: 0; }
  to { transform: scale(0.15); border-radius: 999px; }
}
/* forward:正向=新屏自右滑入、旧屏小幅左移+淡出(Android 滑动+淡出);反向=旧屏退回右侧 */
.pt-b.in-forward { animation: pt-slide-from-right var(--pt-dur) ${BEZIER} both; }
.pt-b.out-forward { animation: pt-slide-out-back var(--pt-dur) ${BEZIER} both; }
.pt-a.out-forward { animation: pt-slide-out-forward var(--pt-dur) ${BEZIER} both; }
.pt-a.in-forward { animation: pt-slide-from-left var(--pt-dur) ${BEZIER} both; }
@keyframes pt-slide-from-right { from { transform: translateX(100%); } to { transform: none; } }
@keyframes pt-slide-out-back { from { transform: none; } to { transform: translateX(100%); } }
@keyframes pt-slide-out-forward { from { transform: none; opacity: 1; } to { transform: translateX(-26%); opacity: 0.35; } }
@keyframes pt-slide-from-left { from { transform: translateX(-26%); opacity: 0.35; } to { transform: none; opacity: 1; } }

/* lateral:成组齐滑,无淡出 */
.pt-b.in-lateral { animation: pt-slide-from-right var(--pt-dur) linear both; }
.pt-a.out-lateral { animation: pt-slide-fully-left var(--pt-dur) linear both; }
.pt-a.in-lateral { animation: pt-slide-fully-left-rev var(--pt-dur) linear both; }
.pt-b.out-lateral { animation: pt-slide-from-right-rev var(--pt-dur) linear both; }
@keyframes pt-slide-fully-left { from { transform: none; } to { transform: translateX(-100%); } }
@keyframes pt-slide-fully-left-rev { from { transform: translateX(-100%); } to { transform: none; } }
@keyframes pt-slide-from-right-rev { from { transform: none; } to { transform: translateX(100%); } }

/* toplevel:先快速淡出(0.3×)再淡入(0.7×) */
.pt-a.out-toplevel, .pt-b.out-toplevel, .pt-a.in-toplevel, .pt-b.in-toplevel { animation: pt-fade-out calc(var(--pt-dur) * 0.3) ease-out both; }
.pt-a.in-toplevel, .pt-b.in-toplevel { animation-name: pt-fade-in; animation-duration: calc(var(--pt-dur) * 0.7); animation-delay: calc(var(--pt-dur) * 0.3); }
@keyframes pt-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes pt-fade-in { from { opacity: 0; } to { opacity: 1; } }

/* enterexit:sheet 自底部滑入屏缘 + 渐入遮罩(临时退出语义) */
.pt-b.in-enterexit { animation: pt-sheet-up var(--pt-dur) ${BEZIER} both; }
.pt-b.out-enterexit { animation: pt-sheet-down var(--pt-dur) ${BEZIER} both; }
.pt-a.in-enterexit, .pt-a.out-enterexit { animation: none; }
@keyframes pt-sheet-up { from { transform: translateY(100%); } to { transform: none; } }
@keyframes pt-sheet-down { from { transform: none; } to { transform: translateY(100%); } }
.pt-scrim.scrim-in { animation: pt-scrim-in var(--pt-dur) ease-out both; }
.pt-scrim.scrim-out { animation: pt-scrim-in var(--pt-dur) ease-out both; animation-direction: reverse; }
@keyframes pt-scrim-in { from { opacity: 0; } to { opacity: 1; } }

/* skeleton:骨架脉动(官方:微妙脉动)×2 → 内容快速淡入 */
.pt-skel { position: absolute; inset: 0; padding: 16px; display: flex; flex-direction: column; gap: 10px; background: var(--surface); }
.pt-skel-block { border-radius: 8px; background: color-mix(in srgb, var(--border) 80%, transparent); }
.pt-skel.on { animation: pt-skel-pulse calc(var(--pt-dur) * 2.3) linear both; }
@keyframes pt-skel-pulse {
  0% { opacity: 0.45; } 12% { opacity: 0.9; } 26% { opacity: 0.45; }
  40% { opacity: 0.9; } 54% { opacity: 0.45; } 68% { opacity: 0.85; } 100% { opacity: 0; }
}
.pt-b.in-skeleton .pt-b-content { animation: pt-fade-in calc(var(--pt-dur) * 0.5) ease-out both; animation-delay: calc(var(--pt-dur) * 1.8); }

.pt-scene[data-reduced="true"] .pt-a,
.pt-scene[data-reduced="true"] .pt-b,
.pt-scene[data-reduced="true"] .pt-skel.on,
.pt-scene[data-reduced="true"] .pt-scrim { animation: none !important; }
.pt-scene[data-reduced="true"] .pt-skel { display: none; }

.pt-readout { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; color: var(--text-dim); }
.pt-chip {
  padding: 2px 10px; border-radius: 999px; border: 1px solid var(--border);
  background: var(--surface); font-variant-numeric: tabular-nums;
}
.pt-chip-official { border-color: color-mix(in srgb, var(--accent) 55%, var(--border)); color: var(--accent); }
.pt-chip-note { max-width: 100%; white-space: normal; line-height: 1.5; font-family: inherit; }
.pt-btn {
  border: 1px solid var(--border); border-radius: 999px; padding: 4px 13px;
  font-size: 12px; cursor: pointer; background: var(--surface); color: inherit;
}
`;

/** 骨架块的演示尺寸(布局占位,内容语义) */
const SKEL_BLOCKS = ["62%", "88%", "74%", "40%"];

/**
 * M3 六大转场模式选型演示(纯 CSS,零动画库):
 * - pattern/duration 为 JS 型参数;duration 以 --pt-dur 下发统一播放速度;
 * - 正向:B 承载「进入」动画、A 承载「退出」(container/enterexit 中 A 静置=持久容器/被遮层);
 * - 反向(B→A)角色互换;skeleton 的反向退化为快速淡入淡出;
 * - settle 时间后落位;reduced-motion 全部直切。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({ pattern: store.get("pattern") as PatternId, duration: store.get("duration") as number });
  const [params, setParams] = useState(readParams);
  const [pos, setPos] = useState<"a" | "b">("a");
  const [run, setRun] = useState<{ dir: "fwd" | "back"; nonce: number } | null>(null);
  const [reduced, setReduced] = useState(false);
  const timerRef = useRef(0);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
        setPos("a");
        setRun(null);
      }),
    [store],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const play = () => {
    const dir: "fwd" | "back" = pos === "a" ? "fwd" : "back";
    const meta = PATTERNS[params.pattern] ?? PATTERNS.container;
    setRun({ dir, nonce: Date.now() });
    window.clearTimeout(timerRef.current);
    if (reduced) {
      setPos(dir === "fwd" ? "b" : "a"); // 直切
      return;
    }
    timerRef.current = window.setTimeout(() => {
      setPos(dir === "fwd" ? "b" : "a");
      setRun(null);
    }, params.duration * meta.settle);
  };

  const pattern = params.pattern in PATTERNS ? params.pattern : "container";
  const meta = PATTERNS[pattern];
  const dir = run?.dir ?? (pos === "a" ? "fwd" : "back");
  const animating = run !== null && !reduced;
  // incoming/outgoing 角色分配;container/enterexit 的 A 静置(持久容器/被遮层);
  // skeleton 正向骨架覆盖、反向退化为 toplevel 快淡
  const animName = pattern === "skeleton" && dir === "back" ? "toplevel" : pattern;
  const aRole = pattern === "container" || pattern === "enterexit" ? "stay" : dir === "fwd" ? "out" : "in";
  const bRole = pattern === "container" || pattern === "enterexit" ? (dir === "fwd" ? "in" : "out") : dir === "fwd" ? "in" : "out";
  const aCls = animating && aRole !== "stay" ? `${aRole}-${animName}` : "";
  const bCls = animating ? `${bRole}-${animName}` : "";
  // 非动画期:按落位隐藏另一屏
  const aVisible = animating || pos === "a";
  const bVisible = animating || pos === "b";
  const animKey = `${pattern}-${dir}-${run?.nonce ?? 0}`;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="pt-scene" data-reduced={reduced} style={{ ["--pt-dur" as string]: `${params.duration}ms` }}>
        <div className="pt-device">
          {aVisible && (
            <div key={`a-${animKey}`} className={`pt-screen pt-a ${aCls}`}>
              <h3>列表屏 List</h3>
              <div className="pt-row">项目 Alpha</div>
              <div className="pt-row">项目 Beta</div>
              <div className="pt-row">项目 Gamma</div>
              <span className="pt-fab" aria-hidden="true" />
            </div>
          )}
          {pattern === "enterexit" && animating && (
            <div key={`s-${animKey}`} className={`pt-scrim ${dir === "fwd" ? "scrim-in" : "scrim-out"}`} aria-hidden="true" />
          )}
          {bVisible && (
            <div key={`b-${animKey}`} className={`pt-screen pt-b ${bCls}`}>
              {pattern === "skeleton" && animating && dir === "fwd" && (
                <div className="pt-skel on" aria-hidden="true">
                  {SKEL_BLOCKS.map((w, i) => (
                    <div key={i} className="pt-skel-block" style={{ width: w, height: i === 0 ? 18 : 12 }} />
                  ))}
                </div>
              )}
              <div className="pt-b-content pt-detail">
                <h3>详情屏 Detail</h3>
                <p>这是转场后的目的界面。观察所选模式如何建立两个状态之间的关系 / The destination surface. Watch how the selected pattern relates the two states.</p>
              </div>
            </div>
          )}
        </div>
        <div className="pt-readout">
          <button type="button" className="pt-btn" onClick={play}>
            {pos === "a" ? "播放 A→B" : "播放 B→A"} Play
          </button>
          <span className="pt-chip">{pattern}</span>
          <span className="pt-chip">duration: {params.duration}ms{animating ? " · playing" : ""}</span>
          <span className="pt-chip pt-chip-official">{meta.desc.zh}</span>
          <span className="pt-chip">{meta.desc.en}</span>
          <span className="pt-chip pt-chip-note">配对 / pair: {meta.pair.zh} · {meta.pair.en}</span>
          {reduced && <span className="pt-chip">reduced-motion: 直切 / hard cut</span>}
          <span className="pt-chip pt-chip-note">工程化落地(整页/路由级)用 View Transitions API,见 view-transitions 条目 / land route-level via View Transitions — see view-transitions</span>
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
