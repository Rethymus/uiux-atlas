import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** WCAG SC 1.4.12 四阈值(字号倍数;W3C 理解文档原文核对,调研 05§18) */
const THRESHOLDS = {
  lineHeight: 1.5,
  paragraphGap: 2,
  letterSpacing: 0.12,
  wordSpacing: 0.16,
} as const;

const css = `
.ts-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.ts-panel { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.ts-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px;
  padding: 3px 10px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent); }
.ts-badge strong { font-variant-numeric: tabular-nums; }
.ts-badge[data-pass="true"] { background: color-mix(in srgb, oklch(0.72 0.15 150) 22%, transparent); }
.ts-badge[data-pass="false"] { background: color-mix(in srgb, oklch(0.68 0.19 30) 18%, transparent); }
.ts-btn { border: 1px solid color-mix(in srgb, currentColor 30%, transparent); border-radius: 999px;
  padding: 5px 14px; font-size: 12px; cursor: pointer; background: transparent; color: inherit; }
.ts-btn-primary { background: color-mix(in srgb, oklch(0.55 0.15 260) 75%, transparent); border-color: transparent; color: #fff; }
.ts-prose {
  max-width: 62ch;
  line-height: var(--ts-line-height);
  letter-spacing: var(--ts-letter-spacing);
  word-spacing: var(--ts-word-spacing);
}
.ts-prose p { margin: 0 0 var(--ts-para-gap); }
.ts-prose p:last-child { margin-block-end: 0; }
.ts-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
`;

/**
 * WCAG 文字间距演示:四个比率参数为 CSS 变量型(经 DemoStage 注入 .demo-stage);
 * demo 订阅 store 实时比对该四值与 SC 1.4.12 阈值,展示达标徽标;
 * 「设为 WCAG 阈值」经 store.set 写回,参数面板同步更新。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [tick, setTick] = useState(0);

  useEffect(() => store.subscribe(() => setTick((n) => n + 1)), [store]);

  const lineHeight = store.get("lineHeight") as number;
  const paragraphGap = store.get("paragraphGap") as number;
  const letterSpacing = store.get("letterSpacing") as number;
  const wordSpacing = store.get("wordSpacing") as number;

  const checks = [
    {
      name: "行高 line-height",
      value: lineHeight,
      threshold: THRESHOLDS.lineHeight,
      pass: lineHeight >= THRESHOLDS.lineHeight,
      fmt: (v: number) => `${v.toFixed(2)}×`,
    },
    {
      name: "段距 paragraph",
      value: paragraphGap,
      threshold: THRESHOLDS.paragraphGap,
      pass: paragraphGap >= THRESHOLDS.paragraphGap,
      fmt: (v: number) => `${v.toFixed(2)}em`,
    },
    {
      name: "字距 letter-spacing",
      value: letterSpacing,
      threshold: THRESHOLDS.letterSpacing,
      pass: letterSpacing >= THRESHOLDS.letterSpacing,
      fmt: (v: number) => `${v.toFixed(3)}em`,
    },
    {
      name: "词距 word-spacing",
      value: wordSpacing,
      threshold: THRESHOLDS.wordSpacing,
      pass: wordSpacing >= THRESHOLDS.wordSpacing,
      fmt: (v: number) => `${v.toFixed(3)}em`,
    },
  ];
  const allPass = checks.every((c) => c.pass);

  void tick; // 订阅触发重渲染;值直接经 store.get 读取

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ts-wrap">
        <div className="ts-panel">
          {checks.map((c) => (
            <span key={c.name} className="ts-badge" data-pass={c.pass}>
              {c.pass ? "✓" : "✗"} {c.name} <strong>{c.fmt(c.value)}</strong>
              <span aria-hidden="true">/ 阈值 {c.fmt(c.threshold)}</span>
            </span>
          ))}
          <span className="ts-badge" data-pass={allPass}>
            {allPass ? "SC 1.4.12 达标 Pass" : "低于阈值 Below thresholds"}
          </span>
        </div>
        <div className="ts-panel">
          <button
            type="button"
            className="ts-btn ts-btn-primary"
            onClick={() => {
              store.set("lineHeight", THRESHOLDS.lineHeight);
              store.set("paragraphGap", THRESHOLDS.paragraphGap);
              store.set("letterSpacing", THRESHOLDS.letterSpacing);
              store.set("wordSpacing", THRESHOLDS.wordSpacing);
            }}
          >
            设为 WCAG 阈值 Set to WCAG thresholds
          </button>
          <button type="button" className="ts-btn" onClick={() => store.reset()}>
            还原默认 Reset defaults
          </button>
        </div>
        <div className="ts-prose">
          <p>
            Users, assistive technologies and reading modes may override text spacing to
            improve readability. When line height is set to at least 1.5 times the font
            size, paragraph spacing to 2 times, letter spacing to 0.12 times and word
            spacing to 0.16 times, no content or functionality may be lost.
          </p>
          <p>
            文本可以被覆写:行高涨到字号的 1.5 倍、段距涨到 2 倍、字距涨到 0.12 倍时,
            标题不截断、按钮不错位、弹层不裁字——这就是 1.4.12 要求的「内容仍可用」。
            词距对无空格分词的中文基本无效,中文站点请重点核对行高与段距。
          </p>
        </div>
        <p className="ts-note">
          四阈值出自 WCAG 成功准则 1.4.12(W3C 理解文档原文核对):行高 ≥1.5×、段距 ≥2×、字距 ≥0.12×、词距 ≥0.16× 字号,均为用户覆写值而非设计默认。
          The four thresholds come from WCAG SC 1.4.12 (verified against the W3C Understanding document): line height ≥1.5×, paragraph spacing ≥2×, letter spacing ≥0.12×, word spacing ≥0.16× the font size — user-override values, not design defaults.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
