import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Backdrop = "alps" | "nebula";

const BACKDROPS: { id: Backdrop; zh: string; en: string }[] = [
  { id: "alps", zh: "雪山", en: "Alps photo" },
  { id: "nebula", zh: "星空", en: "Nebula photo" },
];

const VIBRANCY_ROWS = [
  { id: "default", zh: "default 主级 · 正文与关键信息", en: "default · body & key info" },
  { id: "secondary", zh: "secondary 次级 · 辅助说明", en: "secondary · supporting copy" },
  { id: "tertiary", zh: "tertiary 三级 · 时间戳/占位", en: "tertiary · timestamps/placeholders" },
  { id: "quaternary", zh: "quaternary 四级 · 装饰性", en: "quaternary · decorative" },
] as const;

const css = `
.demo-stage { --sm-alpha: 0.30; --sm-blur: 20px; }
.sm-scene { position: absolute; inset: 0; overflow: hidden; }
.sm-bg img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.sm-toolbar {
  position: absolute; right: 12px; top: 12px; display: flex; gap: 2px; padding: 3px;
  border-radius: 999px; background: rgb(0 0 0 / 0.35);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
}
.sm-toolbar button { border: 0; border-radius: 999px; padding: 4px 12px; font-size: 12px; cursor: pointer; color: rgb(255 255 255 / 0.75); background: transparent; }
.sm-toolbar button[aria-pressed="true"] { background: rgb(255 255 255 / 0.25); color: #fff; }
/* 伪材质面板:薄层透明度/模糊按档位切换(社区近似值,未证实) */
.sm-panel {
  position: absolute; left: 50%; top: 52%; translate: -50% -50%;
  width: min(400px, calc(100% - 36px));
  padding: 18px 22px; border-radius: 16px;
  background: rgb(255 255 255 / var(--sm-alpha));
  -webkit-backdrop-filter: blur(var(--sm-blur));
  backdrop-filter: blur(var(--sm-blur));
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.4), 0 10px 30px rgb(0 0 0 / 0.22);
  color: #14213d;
  transition: background 0.25s ease, -webkit-backdrop-filter 0.25s ease, backdrop-filter 0.25s ease;
  animation: sm-in 0.45s ease-out both;
}
/* 社区近似表(未证实):六档 → Web 薄层 alpha / blur */
.sm-scene[data-material="ultraThin"]  .sm-panel { --sm-alpha: 0.08; --sm-blur: 12px; }
.sm-scene[data-material="thin"]       .sm-panel { --sm-alpha: 0.18; --sm-blur: 16px; }
.sm-scene[data-material="regular"]    .sm-panel { --sm-alpha: 0.30; --sm-blur: 20px; }
.sm-scene[data-material="thick"]      .sm-panel { --sm-alpha: 0.44; --sm-blur: 24px; }
.sm-scene[data-material="ultraThick"] .sm-panel { --sm-alpha: 0.60; --sm-blur: 28px; }
.sm-scene[data-material="bar"]        .sm-panel { --sm-alpha: 0.36; --sm-blur: 16px; }
.sm-panel > * { position: relative; }
.sm-panel h3 { margin: 0 0 4px; font-size: 15px; font-weight: 650; }
.sm-panel .sm-note { margin: 0 0 12px; font-size: 11px; opacity: 0.62; }
.sm-rows { display: flex; flex-direction: column; gap: 6px; }
.sm-row {
  display: flex; align-items: center; gap: 8px; margin: 0;
  font-size: 12.5px; padding: 5px 8px; border-radius: 8px;
  animation: sm-fade 0.25s ease-out both;
}
.sm-row[data-tier="default"]    { color: rgb(20 33 61 / 1); }
.sm-row[data-tier="secondary"]  { color: rgb(20 33 61 / 0.65); }
.sm-row[data-tier="tertiary"]   { color: rgb(20 33 61 / 0.45); }
.sm-row[data-tier="quaternary"] { color: rgb(20 33 61 / 0.30); }
.sm-row[aria-selected="true"] { box-shadow: inset 3px 0 0 rgb(20 33 61 / 0.75); background: rgb(255 255 255 / 0.28); }
.sm-sep { height: 1px; margin: 4px 8px; background: rgb(20 33 61 / 0.35); border: 0; }
.sm-warn {
  margin: 12px 0 0; padding: 7px 10px; border-radius: 8px; font-size: 11.5px;
  color: #7a3b00; background: rgb(255 176 32 / 0.3);
  animation: sm-fade 0.25s ease-out both;
}
@keyframes sm-in { from { opacity: 0; translate: -50% calc(-50% + 10px); } to { opacity: 1; translate: -50% -50%; } }
@keyframes sm-fade { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .sm-panel, .sm-row, .sm-warn { animation: none; }
  .sm-panel { transition: none; }
}
.sm-alpha-table { position: absolute; left: 12px; bottom: 10px; margin: 0; font-size: 10.5px; color: rgb(255 255 255 / 0.85); padding: 4px 10px; border-radius: 999px; background: rgb(0 0 0 / 0.45); }
`;

/**
 * SwiftUI Materials 演示:伪材质面板 + vibrancy 层级。
 * material / vibrancy 均为 JS 型参数(官方未公布 Web 数值,不走 cssVar)——
 * 订阅 store 切 data-material(驱动社区近似的薄层透明度/模糊)与 data-vibrancy(高亮层级行);
 * quaternary + ultraThin/thin 为官方禁用组合(A10),出现时显示警告。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [material, setMaterial] = useState(() => store.get("material") as string);
  const [vibrancy, setVibrancy] = useState(() => store.get("vibrancy") as string);
  const [backdrop, setBackdrop] = useState<Backdrop>("nebula");

  useEffect(
    () =>
      store.subscribe(() => {
        setMaterial(store.get("material") as string);
        setVibrancy(store.get("vibrancy") as string);
      }),
    [store],
  );

  const disallowed = vibrancy === "quaternary" && (material === "ultraThin" || material === "thin");

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="sm-scene" data-material={material} data-vibrancy={vibrancy}>
        <img src={`/photos/glass-${backdrop}.jpg`} alt="" width={1600} height={1067} loading="lazy" decoding="async" />
        <section className="sm-panel" aria-label="材质面板示例 Material panel sample">
          <h3>材质面板 Material Panel</h3>
          <p className="sm-note">
            档位越厚越实:alpha/blur 为社区近似值,官方未公布数值 /
            Thicker tiers are more opaque: alpha/blur are community approximations, Apple publishes no numbers.
          </p>
          <div className="sm-rows" role="listbox" aria-label="vibrancy 层级 vibrancy tiers">
            {VIBRANCY_ROWS.map((row) => (
              <p
                key={row.id}
                className="sm-row"
                role="option"
                aria-selected={vibrancy === row.id}
                data-tier={row.id}
                style={{ animationDelay: `${VIBRANCY_ROWS.findIndex((r) => r.id === row.id) * 0.04}s` }}
              >
                {row.zh} / {row.en}
              </p>
            ))}
            <hr className="sm-sep" aria-hidden="true" />
          </div>
          {disallowed ? (
            <p className="sm-warn" role="alert">
              官方禁用:quaternary 在 ultraThin/thin 材质上对比度不足(HIG A10)/
              Officially disallowed: quaternary on ultraThin/thin lacks contrast (HIG A10).
            </p>
          ) : null}
        </section>
        <div className="sm-toolbar" role="group" aria-label="背景切换 Backdrop switcher">
          {BACKDROPS.map((b) => (
            <button
              key={b.id}
              type="button"
              aria-pressed={backdrop === b.id}
              title={b.en}
              onClick={() => setBackdrop(b.id)}
            >
              {b.zh}
            </button>
          ))}
        </div>
        <p className="sm-alpha-table">
          material={material} · vibrancy={vibrancy} · 近似 alpha≈{MATERIAL_ALPHA[material] ?? "?"}
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}

/** 与 demo CSS 中 data-material 映射一致的社区近似 alpha(未证实,仅作读数提示) */
const MATERIAL_ALPHA: Record<string, string> = {
  ultraThin: "0.08",
  thin: "0.18",
  regular: "0.30",
  thick: "0.44",
  ultraThick: "0.60",
  bar: "0.36",
};
