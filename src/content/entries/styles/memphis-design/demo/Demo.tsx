import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Motif = "squiggle" | "zigzag" | "dot";

/** 14 个确定性槽位:位置/旋转/缩放由槽位本身决定,seed 只决定取哪些槽 */
const SLOTS = [
  { x: 8, y: 14, r: -18, s: 1.1 },
  { x: 84, y: 10, r: 24, s: 0.9 },
  { x: 92, y: 38, r: -8, s: 1.2 },
  { x: 16, y: 44, r: 12, s: 0.8 },
  { x: 62, y: 30, r: -30, s: 1 },
  { x: 34, y: 8, r: 6, s: 0.7 },
  { x: 6, y: 72, r: 20, s: 1.15 },
  { x: 88, y: 66, r: -14, s: 0.85 },
  { x: 46, y: 84, r: 8, s: 1.05 },
  { x: 26, y: 64, r: -26, s: 0.75 },
  { x: 70, y: 52, r: 16, s: 0.95 },
  { x: 12, y: 92, r: -4, s: 0.9 },
  { x: 78, y: 88, r: 30, s: 1.1 },
  { x: 52, y: 6, r: -12, s: 0.8 },
];

/** 简单整数 hash → 0..1 伪随机(确定性,可复现) */
function rnd(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function MotifShape({ motif, slot, seed }: { motif: Motif; slot: (typeof SLOTS)[number]; seed: number }) {
  const pick = rnd(seed);
  // 冲突色随机取一(40% 青/30% 珊瑚/20% 黄/10% 黑);var() 必须走 style,SVG 表现属性不解析 CSS 变量
  const paint =
    pick < 0.4 ? "var(--mm-a)" : pick < 0.7 ? "var(--mm-b)" : pick < 0.9 ? "var(--mm-c)" : "var(--mm-ink)";
  const style: CSSProperties = {
    fill: motif === "dot" ? paint : "none",
    stroke: paint,
    strokeWidth: "var(--mm-stroke)",
    transform: `translate(${slot.x}px, ${slot.y}px) rotate(${slot.r}deg) scale(${slot.s})`,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (motif === "dot") {
    return <circle cx={0} cy={0} r={9} style={style} />;
  }
  if (motif === "zigzag") {
    return <polyline points="0,0 8,-10 16,0 24,-10 32,0 40,-10 48,0" style={style} />;
  }
  // squiggle:三次波动的蚯蚓线
  return <path d="M0 0 q6 -12 12 0 t12 0 t12 0 t12 0" style={style} />;
}

const css = `
.demo-stage {
  --mm-stroke: 3px;
  --mm-turquoise: #3eb8b0;
  --mm-coral: #ff6f61;
  --mm-yellow: #ffd449;
  --mm-ink: #141414;
  --mm-cream: #f6f1e7;
}
.mm-scene {
  --mm-a: var(--mm-turquoise);
  --mm-b: var(--mm-coral);
  --mm-c: var(--mm-yellow);
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: var(--mm-cream);
  color: var(--mm-ink);
}
/* 角色互换:同一四色重排角色,不加第五色 */
.mm-scene[data-palette="shuffle"] {
  --mm-a: var(--mm-coral);
  --mm-b: var(--mm-yellow);
  --mm-c: var(--mm-turquoise);
  background: var(--mm-turquoise);
}
.mm-pattern {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.mm-pattern circle,
.mm-pattern polyline,
.mm-pattern path { stroke-width: var(--mm-stroke); }
.mm-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(300px, calc(100% - 48px));
  padding: 22px 24px;
  background: var(--mm-cream);
  border: var(--mm-stroke) solid var(--mm-ink);
  box-shadow: calc(var(--mm-stroke) * 2) calc(var(--mm-stroke) * 2) 0 var(--mm-ink);
  animation: mm-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.mm-scene[data-palette="shuffle"] .mm-card { background: var(--mm-yellow); }
.mm-card h2 {
  margin: 0 0 6px;
  font-size: 26px;
  font-weight: 900;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  -webkit-text-stroke: calc(var(--mm-stroke) / 3) var(--mm-ink);
}
.mm-card p { margin: 0 0 16px; font-size: 13px; line-height: 1.55; }
.mm-btn {
  padding: 9px 18px;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--mm-ink);
  background: var(--mm-b);
  border: var(--mm-stroke) solid var(--mm-ink);
  box-shadow: calc(var(--mm-stroke) * 1.5) calc(var(--mm-stroke) * 1.5) 0 var(--mm-ink);
  cursor: pointer;
  transition: translate 0.12s ease, box-shadow 0.12s ease;
}
.mm-btn:hover { translate: -1px -1px; box-shadow: calc(var(--mm-stroke) * 2.5) calc(var(--mm-stroke) * 2.5) 0 var(--mm-ink); }
.mm-btn:active { translate: 2px 2px; box-shadow: 0 0 0 var(--mm-ink); }
.mm-btn:focus-visible { outline: 3px solid var(--mm-a); outline-offset: 3px; }
.mm-toggle {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border: 2px solid var(--mm-ink);
  border-radius: 0;
  background: var(--mm-cream);
}
@media (max-width: 480px) {
  .mm-toggle { top: auto; bottom: 12px; left: 12px; right: auto; }
}
.mm-toggle button {
  border: 0;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  color: var(--mm-ink);
  background: transparent;
}
.mm-toggle button[aria-pressed="true"] { background: var(--mm-a); }
.mm-toggle button:focus-visible { outline: 3px solid var(--mm-b); outline-offset: 2px; }
@keyframes mm-in {
  from { opacity: 0; translate: -50% calc(-50% + 14px) rotate(-2deg); }
  to { opacity: 1; translate: -50% -50% rotate(0deg); }
}
@media (prefers-reduced-motion: reduce) {
  .mm-card { animation: none; }
  .mm-btn { transition: none; }
}
`;

/**
 * 孟菲斯演示:确定性槽位铺排黑描边几何母题 + 冲突色板 + 硬偏移卡片。
 * stroke 为 CSS 变量型参数(经 DemoStage 注入 .demo-stage);
 * density / motif / palette 为 JS 型参数——订阅 store 重排母题/换母题/换编排。
 * Shuffle 按钮换 seed(本地状态,非条目参数)。prefers-reduced-motion:关闭入场动画。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [density, setDensity] = useState(() => store.get("density") as number);
  const [motif, setMotif] = useState(() => store.get("motif") as Motif);
  const [palette, setPalette] = useState(() => store.get("palette") as string);
  const [seed, setSeed] = useState(1);

  useEffect(
    () =>
      store.subscribe(() => {
        setDensity(store.get("density") as number);
        setMotif(store.get("motif") as Motif);
        setPalette(store.get("palette") as string);
      }),
    [store],
  );

  const motifs = useMemo(() => {
    const count = Math.max(3, Math.min(14, Math.round(density)));
    // seed 打乱槽位顺序,取前 count 个
    const order = SLOTS.map((slot, i) => ({ slot, k: rnd(i * 7 + seed * 13) })).sort(
      (a, b) => a.k - b.k,
    );
    return order.slice(0, count).map((o, i) => ({ ...o.slot, seed: i * 17 + seed * 5 }));
  }, [density, seed]);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="mm-scene" data-palette={palette}>
        <svg className="mm-pattern" aria-hidden="true" role="presentation">
          {motifs.map((m, i) => (
            <MotifShape key={`${motif}-${seed}-${i}`} motif={motif} slot={m} seed={m.seed} />
          ))}
        </svg>
        <div className="mm-card">
          <h2>MEMPHIS</h2>
          <p>
            之字纹、波点与蚯蚓线拒绝和谐 / Zigzags, dots & squiggles refuse to harmonize.
          </p>
          <button type="button" className="mm-btn" onClick={() => setSeed((s) => s + 1)}>
            Shuffle ↻
          </button>
        </div>
        <div className="mm-toggle" role="group" aria-label="母题切换 Motif switcher">
          {(["squiggle", "zigzag", "dot"] as Motif[]).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={motif === m}
              onClick={() => store.set("motif", m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
