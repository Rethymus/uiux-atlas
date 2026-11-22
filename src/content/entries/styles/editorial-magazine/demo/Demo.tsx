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
  --em-measure: 65ch;
  --em-lead: 1.6;
}
.ed-scene {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background: oklch(0.985 0.002 90);
  color: oklch(0.2 0.01 60);
  display: flex;
  justify-content: center;
}
.ed-article {
  width: min(560px, 100%);
  padding: 26px clamp(16px, 4vw, 32px) 36px;
  font-family: Georgia, "Times New Roman", serif;
  animation: ed-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.ed-kicker {
  font-family: system-ui, "Helvetica Neue", Arial, sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: oklch(0.45 0.01 60);
  margin: 0 0 10px;
}
.ed-headline {
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(26px, 6vw, 34px);
  line-height: 1.12;
  font-weight: 700;
  margin: 0 0 10px;
  letter-spacing: -0.01em;
}
.ed-scene[data-display="sans"] .ed-headline {
  font-family: system-ui, "Helvetica Neue", Arial, sans-serif;
  letter-spacing: -0.02em;
}
.ed-standfirst {
  font-size: 16.5px;
  line-height: 1.45;
  font-style: italic;
  color: oklch(0.35 0.01 60);
  margin: 0 0 12px;
}
.ed-byline {
  font-family: system-ui, "Helvetica Neue", Arial, sans-serif;
  font-size: 11.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: oklch(0.45 0.01 60);
  margin: 0 0 18px;
  padding-bottom: 14px;
  border-bottom: 2px solid oklch(0.2 0.01 60);
}
.ed-figure {
  margin: 0 0 18px;
  aspect-ratio: 16 / 9;
  background:
    radial-gradient(70% 90% at 22% 20%, oklch(0.72 0.08 85 / 0.9), transparent 65%),
    linear-gradient(155deg, oklch(0.42 0.06 230), oklch(0.6 0.07 210) 55%, oklch(0.3 0.05 240));
  position: relative;
}
.ed-figcaption {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 6px 10px;
  font-family: system-ui, "Helvetica Neue", Arial, sans-serif;
  font-size: 10.5px;
  letter-spacing: 0.04em;
  color: oklch(0.97 0 0);
  background: oklch(0 0 / 0.55);
}
.ed-body {
  font-size: 15px;
  line-height: var(--em-lead);
  max-width: min(100%, var(--em-measure));
  margin: 0 auto;
}
.ed-scene[data-cols="2"] .ed-body { columns: 2; column-gap: 24px; }
.ed-scene[data-cols="3"] .ed-body { columns: 3; column-gap: 20px; }
@media (max-width: 560px) {
  .ed-scene[data-cols="2"] .ed-body,
  .ed-scene[data-cols="3"] .ed-body { columns: 1; }
}
.ed-body p { margin: 0 0 0.9em; text-wrap: pretty; }
.ed-body .ed-opener { font-weight: 700; }
.ed-scene[data-dropcap="on"] .ed-body > p:first-of-type::first-letter {
  float: left;
  font-size: 3.2em;
  line-height: 0.86;
  padding: 2px 8px 0 0;
  font-weight: 700;
}
.ed-pullquote {
  column-span: all;
  margin: 14px 0;
  padding: 12px 0;
  border-top: 2px solid oklch(0.2 0.01 60);
  border-bottom: 1px solid oklch(0.2 0.01 60);
  font-size: 19px;
  line-height: 1.4;
  font-weight: 700;
  font-style: italic;
}
.ed-pullquote footer {
  margin-top: 8px;
  font-family: system-ui, "Helvetica Neue", Arial, sans-serif;
  font-size: 10.5px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: oklch(0.45 0.01 60);
}
.ed-toggle {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border: 1px solid oklch(0 0 / 0.15);
  background: oklch(1 0 0 / 0.9);
}
@media (max-width: 480px) {
  .ed-toggle { top: auto; bottom: 12px; left: 12px; right: auto; }
}
.ed-toggle button {
  border: 0;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: oklch(0.2 0.01 60);
  background: transparent;
  font-family: system-ui, sans-serif;
}
.ed-toggle button[aria-pressed="true"] { background: oklch(0.2 0.01 60); color: oklch(0.98 0 0); }
.ed-toggle button:focus-visible { outline: 2px solid oklch(0.2 0.01 60); outline-offset: 2px; }
@keyframes ed-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .ed-article { animation: none; }
}
`;

/**
 * 杂志编辑风演示:五级排版层级(kicker/headline/standfirst/byline/body/caption)
 * + 分栏正文 + pull quote + 首字下沉。
 * measure / lead 为 CSS 变量型参数(经 DemoStage 注入 .demo-stage);
 * cols / dropcap 为 JS 型参数——订阅 store 切换 data-cols / data-dropcap。
 * 字体为系统衬线(Georgia)/无衬线栈,不加载商业字体。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [cols, setCols] = useState(() => store.get("cols") as string);
  const [dropcap, setDropcap] = useState(() => store.get("dropcap") as string);
  const [display, setDisplay] = useState<"serif" | "sans">("serif");

  useEffect(
    () =>
      store.subscribe(() => {
        setCols(store.get("cols") as string);
        setDropcap(store.get("dropcap") as string);
      }),
    [store],
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ed-scene" data-cols={cols} data-dropcap={dropcap} data-display={display}>
        <article className="ed-article">
          <p className="ed-kicker">Dispatch · Typography</p>
          <h1 className="ed-headline">
            The Quiet Authority of the Column
          </h1>
          <p className="ed-standfirst">
            栏格、行长与五级层级,如何把一屏文字变成「可信任的阅读」。
          </p>
          <p className="ed-byline">By the Atlas Desk · 2026-11</p>
          <figure className="ed-figure">
            <figcaption className="ed-figcaption">Fig. 01 — 版心与栏格(示意)</figcaption>
          </figure>
          <div className="ed-body">
            <p className="ed-opener">
              编辑风的词汇表在 1950 年代确立:动态版式、留白为工具、图片与文字平等。
            </p>
            <p>
              正文坐进栏格后,行长被约束在 45–90 字符区间,行高不低于字号的 1.5 倍——这些不是审美偏好,而是数十年排字与可访问性研究留下的工作区间。
            </p>
            <blockquote className="ed-pullquote">
              「留白是编辑自信的信号。」
              <footer>The editorial vocabulary, 1950s</footer>
            </blockquote>
            <p>
              图片在这里是叙事伙伴:图注承担信息,题图承担节奏。pull quote 横跨所有栏,把长阅读切成可喘息的段落。
            </p>
          </div>
        </article>
        <div className="ed-toggle" role="group" aria-label="标题字体配对 Display pairing switcher">
          <button
            type="button"
            aria-pressed={display === "serif"}
            onClick={() => setDisplay("serif")}
          >
            衬线 Serif
          </button>
          <button
            type="button"
            aria-pressed={display === "sans"}
            onClick={() => setDisplay("sans")}
          >
            无衬线 Sans
          </button>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
