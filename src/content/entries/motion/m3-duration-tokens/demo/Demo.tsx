import { useEffect, useMemo, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** M3 官方时长令牌表(调研 04§1.4,tokens-specs 页):四档 × 4 序号 */
const TIERS: Record<string, { token: string; ms: number[]; guidance: { zh: string; en: string }; example: Record<number, { zh: string; en: string }> }> = {
  short: {
    token: "short",
    ms: [50, 100, 150, 200],
    guidance: { zh: "小工具类:选择控件、芯片、小面积状态变化", en: "Small utility: selection controls, chips, small state changes" },
    example: { 4: { zh: "官方示例:选择控件 200ms + Standard easing", en: "Official example: selection controls, 200ms + Standard easing" } },
  },
  medium: {
    token: "medium",
    ms: [250, 300, 350, 400],
    guidance: { zh: "中等面积转场:卡片组、面板进出", en: "Medium-area transitions: card groups, panels" },
    example: { 4: { zh: "官方示例:FAB→Sheet 400ms", en: "Official example: FAB→Sheet at 400ms" } },
  },
  long: {
    token: "long",
    ms: [450, 500, 550, 600],
    guidance: { zh: "大面积转场:全屏化容器、大面板", en: "Large-area transitions: full-screen containers, large panels" },
    example: { 2: { zh: "官方示例:Card→全屏 500ms + Emphasized", en: "Official example: Card→fullscreen at 500ms + Emphasized" } },
  },
  XL: {
    token: "extra-long",
    ms: [700, 800, 900, 1000],
    guidance: { zh: "环境类转场:仅限无用户输入的场景(官方口径)", en: "Ambient transitions: no user input, per official guidance" },
    example: {},
  },
};

const css = `
.mtk-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 14px; }
.mtk-stage {
  position: relative; flex: 1; min-height: 0; overflow: hidden;
  border: 1px solid var(--border); border-radius: 12px;
  background:
    radial-gradient(80% 100% at 20% 0%, color-mix(in srgb, var(--accent) 10%, var(--surface)), var(--surface));
  display: flex; align-items: center; justify-content: center;
}
.mtk-card {
  width: min(300px, calc(100% - 40px));
  padding: 14px 16px; border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: 0 6px 18px rgb(0 0 0 / 0.12);
}
.mtk-card h3 { margin: 0 0 4px; font-size: 14px; font-weight: 650; }
.mtk-card p { margin: 0; font-size: 12px; line-height: 1.55; color: var(--text-dim); }
.mtk-run {
  animation: mtk-in var(--mtk-dur, 200ms) cubic-bezier(0.2, 0, 0, 1) both;
}
@keyframes mtk-in {
  from { opacity: 0.25; transform: translateY(14px) scale(0.97); }
  to { opacity: 1; transform: none; }
}
.mtk-scene[data-reduced="true"] .mtk-run { animation: none; }
.mtk-readout { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; color: var(--text-dim); }
.mtk-chip {
  padding: 2px 10px; border-radius: 999px; border: 1px solid var(--border);
  background: var(--surface); font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-variant-numeric: tabular-nums;
}
.mtk-chip-official { border-color: color-mix(in srgb, var(--accent) 55%, var(--border)); color: var(--accent); }
.mtk-chip-warn { color: oklch(0.65 0.15 70); }
`;

/**
 * M3 时长令牌演示:tier/step 两个 JS 型参数(demo 订阅 store)选中官方令牌
 * md.sys.motion.duration.{token}{step},采样卡片以该时长重播入场
 * (曲线固定 Standard cubic-bezier(0.2,0,0,1)——short4 官方示例档的配对;
 *   long2 的官方搭档是 Emphasized,但 CSS 无等价贝塞尔,官方以 Standard 兜底)。
 * reduced-motion:直出终态,不按时长播放。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({ tier: store.get("tier") as string, step: store.get("step") as string });
  const [params, setParams] = useState(readParams);
  const [nonce, setNonce] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
        setNonce((n) => n + 1);
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

  const tier = TIERS[params.tier] ?? TIERS.short;
  const stepIndex = Math.min(Math.max(Number(params.step) - 1, 0), 3);
  const ms = tier.ms[stepIndex];

  const tokenName = useMemo(() => `md.sys.motion.duration.${tier.token}${params.step}`, [tier.token, params.step]);
  const example = tier.example[Number(params.step)];

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="mtk-scene" data-reduced={reduced}>
        <div className="mtk-stage">
          <div
            // 参数或重播变化 → 重挂载,动画按新时长从头播
            key={`${params.tier}-${params.step}-${nonce}`}
            className="mtk-card mtk-run"
            style={{ ["--mtk-dur" as string]: `${ms}ms` }}
          >
            <h3>采样卡片 Sample card</h3>
            <p>
              入场时长 = {tokenName} = {ms}ms;曲线固定 Standard cubic-bezier(0.2, 0, 0, 1)。
              {" "}
              Entrance duration follows the selected official token.
            </p>
          </div>
        </div>
        <div className="mtk-readout">
          <span className="mtk-chip">{tokenName} = {ms}ms</span>
          <span className="mtk-chip">tier: {params.tier} / step: {params.step}</span>
          {example && <span className="mtk-chip mtk-chip-official">{example.zh} / {example.en}</span>}
          <span className="mtk-chip">{tier.guidance.zh} / {tier.guidance.en}</span>
          {ms > 600 && (
            <span className="mtk-chip mtk-chip-warn">
              &gt;600ms:官方仅限无用户输入的环境转场 / official: ambient, no user input
            </span>
          )}
          {reduced && <span className="mtk-chip">reduced-motion: 直出终态 / final state rendered directly</span>}
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
