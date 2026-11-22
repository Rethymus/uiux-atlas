import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const TIERS = ["lowest", "low", "container", "high", "highest"] as const;
type Tier = (typeof TIERS)[number];

const ROLE_NAME: Record<Tier, string> = {
  lowest: "surface-container-lowest",
  low: "surface-container-low",
  container: "surface-container",
  high: "surface-container-high",
  highest: "surface-container-highest",
};

/** demo 的 L 阶梯(演示值,非官方逐档 tone):亮色降 L、深色升 L(提亮=前进) */
const L_LADDER: Record<string, number[]> = {
  light: [0.985, 0.96, 0.93, 0.9, 0.87],
  dark: [0.06, 0.1, 0.14, 0.18, 0.22],
};

const css = `
.ts-scene {
  position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 16px;
  color-scheme: light dark;
  /* on-surface 取 M3 官方基线换算:亮 #1C1B1F → oklch(0.225 0.008 297)(调研 06§7);暗侧为演示值 */
  --ts-on-light: oklch(0.225 0.008 297);
  --ts-on-dark: oklch(0.92 0.01 297);
}
.ts-stack { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 8px; }
.ts-card {
  flex: 1; min-height: 0; border-radius: 12px; padding: 9px 13px;
  display: flex; flex-direction: column; justify-content: center; gap: 2px;
  border: 1px solid transparent;
  font-size: 12px;
  transition: transform 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}
.ts-card h4 { margin: 0; font-size: 12.5px; font-weight: 650; }
.ts-card .ts-sub { opacity: 0.72; font-size: 11px; font-variant-numeric: tabular-nums; }
.ts-scene[data-mode="light"] .ts-card { color: var(--ts-on-light); }
.ts-scene[data-mode="dark"] .ts-card { color: var(--ts-on-dark); }
.ts-card[data-active="true"] {
  border-color: color-mix(in srgb, currentColor 45%, transparent);
  transform: translateX(6px);
}
.ts-card[data-active="true"] h4::after {
  content: " ← tier"; font-weight: 400; opacity: 0.7;
}
.ts-meta { display: flex; flex-wrap: wrap; gap: 6px; font-size: 12px; }
.ts-chip { padding: 2px 9px; border-radius: 999px; border: 1px solid rgb(128 138 160 / 0.35); background: rgb(255 255 255 / 0.55); font-variant-numeric: tabular-nums; }
.ts-note { font-size: 11px; opacity: 0.75; }
@media (max-width: 480px) {
  .ts-scene { padding: 10px; }
  .ts-card { padding: 6px 11px; }
  .ts-card .ts-sub { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .ts-card { transition: none; }
  .ts-card[data-active="true"] { transform: none; }
}
`;

/**
 * M3 色调表面演示:五档表面卡片,层级只靠色调差(无阴影无描边语义)。
 * mode/tier 为 JS 型参数;hue/chroma 经 --ts-hue/--ts-chroma 注入(CSS 变量型)。
 * L 阶梯为演示值(官方逐档 tone 值未在本调研中核实):亮色降 L、深色升 L(提亮=前进)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({
    mode: store.get("mode") as string,
    tier: store.get("tier") as string,
  });
  const [params, setParams] = useState(readParams);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  const { mode, tier } = params;
  const ladder = L_LADDER[mode] ?? L_LADDER.light;
  const hue = store.get("hue") as number;
  const chroma = store.get("chroma") as number;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ts-scene" data-mode={mode}>
        <div className="ts-stack">
          {TIERS.map((t, i) => {
            const L = ladder[i];
            const active = tier === t;
            return (
              <div
                key={t}
                className="ts-card"
                data-active={active}
                style={{ backgroundColor: `oklch(${L} var(--ts-chroma) var(--ts-hue))` }}
              >
                <h4>{ROLE_NAME[t]}</h4>
                <span className="ts-sub">
                  oklch({L} · {mode}) · L×100 ≈ {Math.round(L * 100)}(tone 模拟 / simulated)
                </span>
              </div>
            );
          })}
        </div>
        <div className="ts-meta">
          <span className="ts-chip">mode: {mode}(层级方向:提亮=前进)</span>
          <span className="ts-chip">
            tier: {ROLE_NAME[tier as Tier] ?? tier} · oklch({ladder[TIERS.indexOf(tier as Tier)]} {chroma} {hue})
          </span>
          <span className="ts-note">五档角色名为官方(M3 博客,调研 02§B7);L 阶梯与 chroma 为演示值,官方逐档 tone 值未核实 / Tier names official; ladder values illustrative.</span>
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
