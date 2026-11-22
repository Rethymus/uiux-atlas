import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const HEADLINE = "平衡换行让标题的每一行都好看 Balanced headline";
const BODY =
  "text-wrap: pretty 用更慢但更优的算法为长正文重新分配断点,把段落末行只剩一两个词的孤行减到最少;balance 则把短文本的各行字数尽量抹平,让标题的两三行长度趋同。两者的分工是:标题与短文本用 balance,长正文用 pretty,可编辑内容用 stable。";

/** 逐字符 span 按 offsetTop 分组,返回每行字符数 */
function countLines(container: HTMLElement): number[] {
  const spans = container.querySelectorAll<HTMLElement>("[data-ch]");
  const lines: number[] = [];
  let lastTop = -1;
  for (const s of spans) {
    const top = Math.round(s.offsetTop);
    if (top !== lastTop) {
      lines.push(0);
      lastTop = top;
    }
    lines[lines.length - 1] += 1;
  }
  return lines;
}

const css = `
.twb-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.twb-support { display: flex; flex-wrap: wrap; gap: 8px; }
.twb-badge { font-size: 12px; padding: 3px 10px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  background: color-mix(in srgb, currentColor 8%, transparent); }
.twb-head {
  margin: 0;
  max-width: calc(var(--tw-width) * 1ch);
  text-wrap: var(--tw-heading);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.35;
}
.twb-body {
  margin: 0;
  max-width: calc(var(--tw-width) * 1ch);
  text-wrap: var(--tw-body);
  line-height: 1.8;
  padding: 12px 14px;
  border: 1px dashed color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px;
}
.twb-lines { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.twb-line { font-size: 11px; padding: 2px 9px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  font-variant-numeric: tabular-nums; opacity: 0.85; }
.twb-line[data-last="true"] { border-style: solid; opacity: 1;
  background: color-mix(in srgb, oklch(0.7 0.14 85) 30%, transparent); }
.twb-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.7; }
`;

/**
 * text-wrap 平衡换行演示:headingWrap / bodyWrap / width 均为 CSS 变量型参数,
 * 经 DemoStage 注入;标题逐行统计用逐字符 span + offsetTop,
 * balance/pretty 支持态用 CSS.supports 实时探测。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [tick, setTick] = useState(0);
  const headRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => store.subscribe(() => setTick((n) => n + 1)), [store]);

  const chars = useMemo(() => Array.from(HEADLINE), []);

  const [lines, setLines] = useState<number[]>([]);
  const measure = useCallback(() => {
    const el = headRef.current;
    if (!el) return;
    setLines(countLines(el));
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(measure));
    return () => cancelAnimationFrame(raf);
  }, [measure, tick]);

  const [supportsBalance, setSupportsBalance] = useState<boolean | null>(null);
  const [supportsPretty, setSupportsPretty] = useState<boolean | null>(null);
  useEffect(() => {
    setSupportsBalance(typeof CSS !== "undefined" && CSS.supports("text-wrap", "balance"));
    setSupportsPretty(typeof CSS !== "undefined" && CSS.supports("text-wrap", "pretty"));
  }, []);

  const lastLen = lines.length ? lines[lines.length - 1] : 0;
  const orphanish = lines.length >= 2 && lastLen <= 3;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="twb-wrap">
        <div className="twb-support">
          <span className="twb-badge">
            balance <strong>{supportsBalance === null ? "…" : supportsBalance ? "✓ 本浏览器支持" : "✗ 回退 auto"}</strong>
          </span>
          <span className="twb-badge">
            pretty <strong>{supportsPretty === null ? "…" : supportsPretty ? "✓ 本浏览器支持" : "✗ Firefox 未支持,回退 auto"}</strong>
          </span>
          <span className="twb-badge">
            标题末行 <strong>{lines.length} 行 · 末行 {lastLen} 字{orphanish ? " · 孤字!" : ""}</strong>
          </span>
        </div>
        <h2 className="twb-head" ref={headRef}>
          {chars.map((c, i) => (
            <span key={i} data-ch={c === " " ? "sp" : undefined}>{c}</span>
          ))}
        </h2>
        <div className="twb-lines" aria-hidden="true">
          {lines.map((n, i) => (
            <span key={i} className="twb-line" data-last={i === lines.length - 1 ? "true" : undefined}>
              L{i + 1}: {n} 字
            </span>
          ))}
        </div>
        <p className="twb-body">{BODY}</p>
        <p className="twb-note">
          行数上限:balance 仅作用于 ≤6 行(Chromium)/≤10 行(Firefox)的文本块(MDN);分值支持 balance=Chrome 114/Firefox 121/Safari 17.5,pretty=Chrome 117/Safari 26/Firefox 未支持(BCD,调研 11§2)。收窄 width 观察孤字与孤行。
          Line caps: balance applies only to blocks of ≤6 lines (Chromium) / ≤10 lines (Firefox) (MDN); per-value support balance=Chrome 114/Firefox 121/Safari 17.5, pretty=Chrome 117/Safari 26/Firefox unsupported (BCD, research 11 §2). Narrow the width to expose orphans.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
