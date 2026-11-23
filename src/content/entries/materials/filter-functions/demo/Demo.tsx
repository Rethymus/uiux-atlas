import { useEffect, useState } from "react";
import { getEntryStore, serializeParamValue } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import { withBase } from "@/lib/urls";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Backdrop = "alps" | "nebula";

const BACKDROPS: { id: Backdrop; zh: string; en: string; w: number; h: number }[] = [
  // w/h = 照片内在尺寸(JPEG SOFn 实测:alps 1600×1067、nebula 1600×1520),
  // 随 <img width/height> 声明(清单 photo-alt-nits:CSS absolute/inset 定尺寸
  // 之外补内在尺寸声明);alt 携带当前背景名,背景切换时读屏可感知样本变化。
  { id: "alps", zh: "雪山", en: "Alps photo", w: 1600, h: 1067 },
  { id: "nebula", zh: "星空", en: "Nebula photo", w: 1600, h: 1520 },
];

const TILES = [
  { id: "original", zh: "原图", en: "Original", fn: null },
  { id: "blur", zh: "模糊", en: "blur", fn: "blur(var(--ff-blur))" },
  { id: "brightness", zh: "亮度", en: "brightness", fn: "brightness(var(--ff-brightness))" },
  { id: "contrast", zh: "对比", en: "contrast", fn: "contrast(var(--ff-contrast))" },
  { id: "hue", zh: "色相", en: "hue-rotate", fn: "hue-rotate(var(--ff-hue))" },
  {
    id: "combo",
    zh: "组合",
    en: "combined",
    fn: "blur(var(--ff-blur)) brightness(var(--ff-brightness)) contrast(var(--ff-contrast)) hue-rotate(var(--ff-hue))",
  },
] as const;

/* 组合瓦片角标的链序参数名(schema 既有参数;组合 = 四者按规范链序叠加) */
const PARAM_ORDER = ["blur", "brightness", "contrast", "hue-rotate"];

const css = `
.demo-stage {
  --ff-blur: 0px;
  --ff-brightness: 100%;
  --ff-contrast: 100%;
  --ff-hue: 0deg;
}
.ff-scene { position: absolute; inset: 0; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
.ff-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.ff-title { margin: 0; font-size: 13px; font-weight: 600; color: inherit; opacity: 0.75; }
.ff-toolbar { display: flex; gap: 2px; padding: 3px; border-radius: 999px; background: rgb(0 0 0 / 0.35); }
.ff-toolbar button { border: 0; border-radius: 999px; padding: 3px 12px; font-size: 12px; cursor: pointer; color: rgb(255 255 255 / 0.75); background: transparent; }
.ff-toolbar button[aria-pressed="true"] { background: rgb(255 255 255 / 0.25); color: #fff; }
.ff-grid { flex: 1; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 10px; min-height: 0; }
.ff-tile {
  position: relative; margin: 0; overflow: hidden; border-radius: 12px;
  border: 1px solid rgb(255 255 255 / 0.25); background: rgb(0 0 0 / 0.2);
  animation: ff-in 0.45s ease-out both;
}
.ff-tile img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.ff-tile[data-fn="blur"] img { filter: blur(var(--ff-blur)); }
.ff-tile[data-fn="brightness"] img { filter: brightness(var(--ff-brightness)); }
.ff-tile[data-fn="contrast"] img { filter: contrast(var(--ff-contrast)); }
.ff-tile[data-fn="hue"] img { filter: hue-rotate(var(--ff-hue)); }
.ff-tile[data-fn="combo"] img {
  filter: blur(var(--ff-blur)) brightness(var(--ff-brightness)) contrast(var(--ff-contrast)) hue-rotate(var(--ff-hue));
}
.ff-tile figcaption {
  position: absolute; left: 0; right: 0; bottom: 0; z-index: 1;
  display: flex; justify-content: space-between; align-items: center; gap: 6px;
  padding: 4px 10px; font-size: 11px; color: #fff;
  background: rgb(0 0 0 / 0.45); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
}
.ff-tile figcaption code { font-size: 10.5px; opacity: 0.85; min-width: 0; flex: 1; text-align: right; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ff-tile:nth-child(1) { animation-delay: 0s; } .ff-tile:nth-child(2) { animation-delay: 0.05s; }
.ff-tile:nth-child(3) { animation-delay: 0.1s; } .ff-tile:nth-child(4) { animation-delay: 0.15s; }
.ff-tile:nth-child(5) { animation-delay: 0.2s; } .ff-tile:nth-child(6) { animation-delay: 0.25s; }
@keyframes ff-in {
  from { opacity: 0; translate: 0 8px; }
  to { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .ff-tile { animation: none; }
}
`;

/**
 * filter 函数族演示:同一张图的多滤镜对照。
 * blur / brightness / contrast / hue-rotate 均为 CSS 变量型参数(经 DemoStage 注入),
 * 每块瓦片只链入一个函数,组合瓦片按规范链序叠加;demo 另订阅 store 在瓦片角标上
 * 实时显示当前值,便于和原图瓦片对照。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [backdrop, setBackdrop] = useState<Backdrop>("nebula");
  const [values, setValues] = useState(() => store.snapshot());

  useEffect(
    () =>
      store.subscribe(() => {
        setValues(store.snapshot());
      }),
    [store],
  );

  const fmt = (name: string) => serializeParamValue(store.param(name), values[name]);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ff-scene">
        <div className="ff-head">
          <p className="ff-title">
            同图多滤镜对比 Same image · multiple filters
          </p>
          <div className="ff-toolbar" role="group" aria-label="源图切换 Source image switcher">
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
        </div>
        <div className="ff-grid">
          {TILES.map((tile) => {
            const bd = BACKDROPS.find((b) => b.id === backdrop)!;
            return (
              <figure key={tile.id} className="ff-tile" data-fn={tile.id}>
                <img
                  src={withBase(`photos/glass-${backdrop}.jpg`)}
                  alt={`${bd.zh}/${bd.en} · ${tile.en} 滤镜示例 filtered sample`}
                  width={bd.w}
                  height={bd.h}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <span>{tile.zh} {tile.en}</span>
                  <code>
                    {tile.fn
                      ? tile.id === "combo"
                        ? /* 组合瓦片 = 链序四参数实时值(FIXME 历史:此前查 store.param("combo")
                             抛 Unknown param 使整个 demo 岛屿水合即崩,舞台全空) */
                          PARAM_ORDER.map(fmt).join("+")
                        : fmt(tile.id === "hue" ? "hue-rotate" : tile.id)
                      : "—"}
                  </code>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
