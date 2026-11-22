import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.fp-stage { padding: 12px; }
.fp-toolbar { display: flex; flex-wrap: wrap; gap: 6px; margin-block-end: 10px; }
.fp-toolbar button { border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  background: transparent; color: inherit; border-radius: 999px;
  padding: 4px 12px; font-size: 12px; cursor: pointer; }
.fp-toolbar button[aria-pressed="true"] {
  background: color-mix(in srgb, oklch(0.55 0.15 260) 60%, transparent); color: #fff;
  border-color: transparent; }
.fp-card {
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
  border-radius: 10px; padding: 20px 22px;
}
.fp-kicker { margin: 0 0 10px; font-size: 11px; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.62; }
.fp-h2 { margin: 0 0 12px; font-size: var(--fp-head-size); line-height: 1.15;
  font-weight: var(--fp-head-weight); letter-spacing: -0.01em; }
.fp-lead { margin: 0 0 12px; font-size: 15px; line-height: 1.6; font-weight: 500; }
.fp-body { margin: 0 0 12px; font-size: 14px; line-height: 1.7; max-width: 56ch; }
.fp-quote { margin: 0 0 12px; padding-inline-start: 14px;
  border-inline-start: 3px solid color-mix(in srgb, currentColor 30%, transparent);
  font-size: 15px; line-height: 1.6; opacity: 0.85; }
.fp-caption { margin: 0; font-size: 12px; opacity: 0.6; }
/* 衬线栈:零第三方依赖,泛型收尾;中文落宋体一类系统衬线,因平台而异 */
.fp-stage[data-pairing="serif-head"] .fp-h2,
.fp-stage[data-pairing="serif-head"] .fp-quote { font-family: Georgia, "Times New Roman", "Songti SC", SimSun, serif; }
.fp-stage[data-pairing="sans-head"] .fp-body,
.fp-stage[data-pairing="sans-head"] .fp-quote { font-family: Georgia, "Times New Roman", "Songti SC", SimSun, serif; }
/* 单字族:全部继承站点无衬线,层级只动字重/字号/色彩(Apple HIG 原则) */
.fp-stage[data-pairing="single"] .fp-h2 { font-family: inherit; }
.fp-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px;
  padding: 3px 10px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  margin-block-end: 10px; }
.fp-badges { display: flex; flex-wrap: wrap; gap: 6px; margin-block-end: 4px; }
`;

const PAIRINGS = [
  { id: "serif-head", zh: "衬线标题 × 无衬线正文", en: "Serif head × sans body" },
  { id: "sans-head", zh: "无衬线标题 × 衬线正文", en: "Sans head × serif body" },
  { id: "single", zh: "单字族多字重", en: "Single family" },
];

/**
 * 字体搭配演示:headingSize/headingWeight 为 CSS 变量型参数(经 DemoStage 注入);
 * pairing 为 JS 型参数——订阅 store 后切换 data-pairing。
 * 三组策略:衬线标题×无衬线正文 / 反向 / 单字族多字重(Inter Variable 真实 wght 轴)。
 * 衬线一律走系统衬线栈(零第三方依赖),并以泛型 serif 收尾兜底。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [tick, setTick] = useState(0);
  const [pairing, setPairing] = useState(() => store.get("pairing") as string);

  useEffect(
    () =>
      store.subscribe(() => {
        setPairing(store.get("pairing") as string);
        setTick((n) => n + 1);
      }),
    [store],
  );

  const headingSize = store.get("headingSize") as number;
  const headingWeight = store.get("headingWeight") as number;
  void tick; // 订阅触发重渲染;值直接经 store.get 读取
  const strategy =
    pairing === "single"
      ? "单字族:Inter Variable,层级只动字号/字重(Apple HIG 一字族原则,已核)"
      : pairing === "sans-head"
        ? "无衬线标题 × 衬线正文(杂志正文路线,系统衬线栈)"
        : "衬线标题 × 无衬线正文(经典对比路线,系统衬线栈)";

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="fp-stage" data-pairing={pairing}>
        <div className="fp-toolbar" role="group" aria-label="搭配策略 Pairing strategy">
          {PAIRINGS.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={pairing === p.id}
              title={p.en}
              onClick={() => store.set("pairing", p.id)}
            >
              {p.zh}
            </button>
          ))}
        </div>
        <div className="fp-badges">
          <span className="fp-badge">{strategy}</span>
          <span className="fp-badge">
            标题 {headingSize}px / wght {headingWeight} · 字号比 {(headingSize / 14).toFixed(1)}×
          </span>
          <span className="fp-badge">回退栈 Georgia → 宋体 → serif(泛型收尾)</span>
        </div>
        <article className="fp-card">
          <p className="fp-kicker">Typography · 搭配研究</p>
          <h2 className="fp-h2">两种声音,一个层次 / Two voices, one hierarchy</h2>
          <p className="fp-lead">
            搭配不是选两枚「好看」的字体,而是给页面分派两个声音:一个负责调性,一个负责阅读。
          </p>
          <p className="fp-body">
            The classic contract assigns the serif to display and the sans to reading — or the
            reverse, as magazines have done for a century. What matters is that the two voices
            differ enough to be told apart at a glance, and that hierarchy never rests on the
            family alone: size, weight and color carry it together (Apple HIG, verified).
            搭配方法论细则属社区实践共识(Google Fonts Knowledge 正文未能核验,如实标注)。
          </p>
          <blockquote className="fp-quote">
            「Minimize the number of typefaces you use.」—— Apple HIG Typography:全站一个字族,
            层级只动 size / weight / color。单字族策略即由此而来。
          </blockquote>
          <p className="fp-caption">
            演示用系统衬线栈,零第三方依赖;可变字重由本站 Inter Variable(wght 100–900)真实驱动。
          </p>
        </article>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
