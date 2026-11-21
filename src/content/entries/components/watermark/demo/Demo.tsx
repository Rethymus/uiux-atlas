import { useCallback, useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Scene = "light" | "dark";

const SCENES: { id: Scene; zh: string; en: string }[] = [
  { id: "light", zh: "浅色", en: "Light" },
  { id: "dark", zh: "深色", en: "Dark" },
];

/** content 三档预设文案(schema enum 的 value → 实际水印文字) */
const CONTENT_TEXT: Record<string, string> = {
  atlas: "UIUX Atlas",
  internal: "内部资料 · 请勿外传",
  user: "张晓 · 工号 10086",
};

/** 单格尺寸 = antd Watermark 默认 width/height(06-antdesign §4.24) */
const TILE_W = 120;
const TILE_H = 64;

const css = `
.wm-scene { position: absolute; inset: 0; display: grid; place-items: center; padding: 28px; overflow: hidden; }
.wm-card {
  position: relative;
  z-index: 1;
  width: min(560px, 100%);
  max-height: 100%;
  overflow: auto;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  padding: 24px 28px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  color: #1b2437;
  animation: wm-in 0.4s ease-out both;
}
.wm-scene[data-scene="dark"] .wm-card {
  background: #23262e;
  border-color: rgba(255, 255, 255, 0.14);
  color: #e8ebf2;
}
.wm-card h3 { margin: 0 0 10px; font-size: 17px; font-weight: 650; }
.wm-card p { margin: 0 0 12px; font-size: 13px; line-height: 1.7; opacity: 0.85; }
.wm-stats { display: flex; gap: 10px; margin: 16px 0; }
.wm-stat {
  flex: 1;
  padding: 10px 12px;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.05);
  text-align: center;
}
.wm-scene[data-scene="dark"] .wm-stat { background: rgba(255, 255, 255, 0.07); }
.wm-stat b { display: block; font-size: 20px; font-weight: 650; }
.wm-stat span { font-size: 11px; opacity: 0.7; }
/* 水印层:CSS/DOM 瓦片方案(参数经 --wm-* CSS 变量实时驱动) */
.wm-layer {
  position: absolute;
  inset: 0;
  z-index: 9;
  opacity: var(--wm-opacity);
  pointer-events: none;
  overflow: hidden;
}
.wm-grid {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, ${TILE_W}px);
  grid-auto-rows: ${TILE_H}px;
  column-gap: var(--wm-gap);
  row-gap: var(--wm-gap);
  align-content: start;
  justify-content: start;
}
.wm-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(var(--wm-rotate));
  font: 400 16px sans-serif;
  white-space: nowrap;
  color: #000;
}
.wm-scene[data-scene="dark"] .wm-tile { color: #fff; }
.wm-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.35);
  z-index: 10;
}
@media (max-width: 480px) {
  .wm-toolbar { top: auto; bottom: 12px; left: 12px; right: auto; }
}
.wm-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.wm-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
@keyframes wm-in {
  from { opacity: 0; translate: 0 10px; }
  to { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .wm-card { animation: none; }
}
`;

/**
 * 水印演示:内容卡上叠加重复水印层。
 * rotate / opacity / gap 为 CSS 变量型参数(经 DemoStage 注入 .demo-stage,CSS 即时消费);
 * content 为 JS 型参数(enum 三档预设)——订阅 store 后改写瓦片文字;
 * 瓦片数量按容器尺寸 + gap 用 ResizeObserver 计算,防溢出由 overflow:hidden 兜底。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [content, setContent] = useState(() => store.get("content") as string);
  const [scene, setScene] = useState<Scene>("light");
  const areaRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState({ cols: 6, rows: 4 });

  const relayout = useCallback(() => {
    const el = areaRef.current;
    if (!el) return;
    const g = store.get("gap") as number;
    const cols = Math.ceil(el.clientWidth / (TILE_W + g)) + 1;
    const rows = Math.ceil(el.clientHeight / (TILE_H + g)) + 1;
    setCount((c) => (c.cols === cols && c.rows === rows ? c : { cols, rows }));
  }, [store]);

  useEffect(() => {
    relayout();
    const ro = new ResizeObserver(relayout);
    if (areaRef.current) ro.observe(areaRef.current);
    return () => ro.disconnect();
  }, [relayout]);

  useEffect(
    () =>
      store.subscribe(() => {
        setContent(store.get("content") as string);
        relayout();
      }),
    [store, relayout],
  );

  const tiles = Array.from({ length: count.cols * count.rows }, (_, i) => i);
  const text = CONTENT_TEXT[content] ?? CONTENT_TEXT.atlas;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="wm-scene" data-scene={scene} ref={areaRef}>
        <div className="wm-card">
          <h3>
            Q4 设计系统巡检报告 <span lang="en">Design System Audit</span>
          </h3>
          <p>
            本报告面向设计与工程团队,覆盖组件覆盖率、对比度达标率与 token 治理三项指标;外发前请确认已接入访问者水印。{" "}
            <span lang="en">
              Distributed to design &amp; engineering; confirm the visitor watermark is attached before sharing.
            </span>
          </p>
          <div className="wm-stats">
            <div className="wm-stat">
              <b>92%</b>
              <span>组件覆盖 Coverage</span>
            </div>
            <div className="wm-stat">
              <b>100%</b>
              <span>对比度达标 Contrast pass</span>
            </div>
            <div className="wm-stat">
              <b>3</b>
              <span>待整改项 Open issues</span>
            </div>
          </div>
          <p>
            水印仅为威慑与溯源手段,不能替代权限控制;密文数据的分发仍需走审批流。{" "}
            <span lang="en">Watermarks deter and trace — they do not replace access control.</span>
          </p>
        </div>
        <div className="wm-layer" aria-hidden="true">
          <div className="wm-grid">
            {tiles.map((i) => (
              <span key={i} className="wm-tile">
                {text}
              </span>
            ))}
          </div>
        </div>
        <div className="wm-toolbar" role="group" aria-label="场景切换 Scene switcher">
          {SCENES.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={scene === s.id}
              title={s.en}
              onClick={() => setScene(s.id)}
            >
              {s.zh}
            </button>
          ))}
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
