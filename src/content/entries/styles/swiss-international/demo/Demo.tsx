import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.demo-stage {
  --sw-ratio: 1.414;
  --sw-accent: #e30613;
}
.sw-scene {
  --sw-base: 15px;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: oklch(0.94 0.01 260);
  color: #111;
}
.sw-poster {
  position: relative;
  width: min(430px, calc(100% - 32px));
  aspect-ratio: 4 / 5;
  max-height: calc(100% - 8px);
  background: #fff;
  box-shadow: 0 10px 30px oklch(0 0 / 0.12);
  padding: 20px 22px;
  display: grid;
  gap: 12px;
  grid-template-rows: auto auto 1fr auto;
  overflow: hidden;
  animation: sw-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  font-family: "Helvetica Neue", Helvetica, Arial, "Inter", system-ui, sans-serif;
}
/* 栅格叠层(装饰):N 列红色半透明条纹,列数与海报内联同步 */
.sw-overlay {
  position: absolute;
  inset: 20px 22px;
  display: none;
  pointer-events: none;
  gap: 12px;
}
.sw-scene[data-grid="on"] .sw-overlay { display: grid; }
.sw-overlay i { background: oklch(0.55 0.23 25 / 0.13); border-left: 1px solid oklch(0.55 0.23 25 / 0.35); }
.sw-meta {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.sw-title {
  margin: 0;
  grid-column: 1 / -1;
  align-self: end;
  font-size: calc(var(--sw-base) * var(--sw-ratio) * var(--sw-ratio) * var(--sw-ratio) * var(--sw-ratio));
  line-height: 0.98;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}
.sw-accentbar {
  height: calc(var(--sw-base) * 0.6);
  background: var(--sw-accent);
}
.sw-kicker {
  align-self: center;
  font-size: calc(var(--sw-base) * var(--sw-ratio));
  font-weight: 500;
  color: var(--sw-accent);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.sw-photo {
  background: linear-gradient(160deg, oklch(0.4 0.04 240), oklch(0.55 0.05 220) 58%, oklch(0.32 0.04 250));
  min-height: 0;
  position: relative;
}
.sw-caption {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 4px 8px;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: oklch(0.97 0 0);
  background: oklch(0 0 / 0.55);
}
.sw-body {
  font-size: var(--sw-base);
  line-height: 1.5;
  align-content: start;
  min-width: 0;
}
.sw-body p { margin: 0 0 0.9em; }
.sw-body p:first-child { font-weight: 600; }
.sw-foot {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-top: 2px solid #111;
  padding-top: 8px;
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.sw-foot strong { color: var(--sw-accent); font-size: calc(var(--sw-base) * var(--sw-ratio) * var(--sw-ratio)); }
.sw-toggle {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  background: oklch(1 0 0 / 0.85);
  border: 1px solid oklch(0 0 / 0.15);
}
@media (max-width: 480px) {
  .sw-toggle { top: auto; bottom: 12px; left: 12px; right: auto; }
  .sw-title { font-size: calc(var(--sw-base) * var(--sw-ratio) * var(--sw-ratio) * var(--sw-ratio)); }
}
.sw-toggle button {
  border: 0;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: #111;
  background: transparent;
}
.sw-toggle button[aria-pressed="true"] { background: var(--sw-accent); color: #fff; }
.sw-toggle button:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
@keyframes sw-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .sw-poster { animation: none; }
}
`;

/**
 * 瑞士国际主义演示:N 列数学栅格海报(巨大齐左标题 / 红色强调 / 客观图块 / 图注)。
 * ratio / accent 为 CSS 变量型参数(经 DemoStage 注入 .demo-stage);
 * cols / grid 为 JS 型参数——订阅 store 后以内联 style 重算栅格列数/跨列(span 不走 calc,保证兼容)。
 * 字体为系统无衬线栈近似 Helvetica(不加载商业字体);栅格叠层 aria-hidden。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [cols, setCols] = useState(() => store.get("cols") as number);
  const [grid, setGrid] = useState(() => store.get("grid") as string);

  useEffect(
    () =>
      store.subscribe(() => {
        setCols(store.get("cols") as number);
        setGrid(store.get("grid") as string);
      }),
    [store],
  );

  const n = Math.max(2, Math.min(8, Math.round(cols)));
  const photoSpan = Math.max(1, Math.floor(n / 2));
  const bodySpan = Math.max(1, n - photoSpan);
  const template = `repeat(${n}, minmax(0, 1fr))`;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="sw-scene" data-grid={grid}>
        <div className="sw-poster" style={{ gridTemplateColumns: template }}>
          <div className="sw-meta" aria-hidden="true">
            <span>Gestaltung · Nr. 06</span>
            <span>1959 / Zürich</span>
          </div>
          <h1 className="sw-title">
            Die neue
            <br />
            Gestaltung
          </h1>
          <div className="sw-accentbar" style={{ gridColumn: `1 / span ${Math.max(1, Math.round(n / 3))}` }} aria-hidden="true" />
          <div className="sw-kicker" style={{ gridColumn: `${Math.max(1, Math.round(n / 3)) + 1} / -1` }}>
            Grid &amp; Type
          </div>
          <div className="sw-photo" style={{ gridColumn: `1 / span ${photoSpan}` }}>
            <span className="sw-caption">Fig. 01 — Objektiv</span>
          </div>
          <div className="sw-body" style={{ gridColumn: `span ${bodySpan}` }}>
            <p>数学网格是信息结构手段 / The grid is a device for information structure.</p>
            <p>
              层级只靠尺寸、字重与位置建立——齐左不齐右,非对称但平衡;唯一的强调色只出现在结构处。
            </p>
          </div>
          <div className="sw-foot">
            <span>Müller-Brockmann Nachfolge</span>
            <strong>{n} columns</strong>
          </div>
          {/* 栅格叠层:纯装饰 */}
          <div className="sw-overlay" style={{ gridTemplateColumns: template }} aria-hidden="true">
            {Array.from({ length: n }, (_, i) => (
              <i key={i} />
            ))}
          </div>
        </div>
        <div className="sw-toggle" role="group" aria-label="栅格叠层 Grid overlay switcher">
          <button
            type="button"
            aria-pressed={grid === "on"}
            onClick={() => store.set("grid", grid === "on" ? "off" : "on")}
          >
            栅格 Grid
          </button>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
