import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Lang = "en" | "zh";

/** 拉丁样例:含空格计数口径(45–90 字符区间出自 Butterick,调研 05§19) */
const SAMPLE_EN =
  "Typography is the craft of endowing human language with a durable visual form. Good typography depends on quiet judgments made about each character, word and line of text; judgments the reader is not consciously aware of, but which accumulate into a texture of reading. The measure, or line length, is one of those quiet decisions: lines that run too long strain the eye's vertical tracking, while lines that break too soon chop the rhythm into fragments.";

/** 中文样例:仅演示换行行为,不给出字符数判定(中文行长指导值未核实) */
const SAMPLE_ZH =
  "中文正文同样受行长约束。一行过长时,视线从行尾回到下一行首容易串行;一行过短则换行过频,阅读节奏被打碎。中西文混排时,ch 单位以数字 0 的宽度为基准,同一 ch 数在不同字体与字号下的物理宽度并不相同,需要结合实际度量核对。";

/** 45–90 为已核实区间(Butterick,调研 05§19) */
const BAND_MIN = 45;
const BAND_MAX = 90;
/** 判定标尺的展示区间(演示用,非规范值) */
const SCALE_MIN = 20;
const SCALE_MAX = 120;

/** 逐字符 span 分组统计每一行的字符数(含空格;中文样例只看行数,判定由调用方区分) */
function countLines(container: HTMLElement): number[] {
  const spans = container.querySelectorAll<HTMLElement>("[data-char]");
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
.m1-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.m1-band { position: relative; height: 34px; border-radius: 8px; overflow: hidden;
  background: color-mix(in srgb, currentColor 8%, transparent); }
.m1-band-ok { position: absolute; top: 0; bottom: 0;
  left: ${(((BAND_MIN - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100).toFixed(2)}%;
  width: ${(((BAND_MAX - BAND_MIN) / (SCALE_MAX - SCALE_MIN)) * 100).toFixed(2)}%;
  background: color-mix(in srgb, oklch(0.72 0.15 150) 30%, transparent); }
.m1-band-tick { position: absolute; top: 0; bottom: 0; width: 1px;
  background: color-mix(in srgb, currentColor 45%, transparent); }
.m1-band-tick span { position: absolute; top: 2px; left: 4px; font-size: 10px; opacity: 0.75; white-space: nowrap; }
.m1-needle { position: absolute; top: 4px; bottom: 4px; width: 2px; border-radius: 1px;
  background: currentColor; transition: left 0.25s ease; }
.m1-column {
  max-width: min(100%, calc(var(--measure-width) * 1ch));
  font-size: var(--measure-font);
  text-align: var(--measure-align);
  line-height: 1.7;
  padding: 14px 16px;
  border: 1px dashed color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px;
  overflow-wrap: anywhere;
}
.m1-readout { display: flex; flex-wrap: wrap; gap: 8px 18px; align-items: center;
  font-size: 12px; opacity: 0.85; }
.m1-readout strong { font-variant-numeric: tabular-nums; }
.m1-verdict { font-size: 12px; padding: 2px 10px; border-radius: 999px; border: 1px solid color-mix(in srgb, currentColor 30%, transparent); }
.m1-langbar { align-self: flex-end; display: flex; gap: 2px; padding: 3px;
  border-radius: 999px; background: color-mix(in srgb, currentColor 12%, transparent); }
.m1-langbar button { border: 0; border-radius: 999px; padding: 4px 12px; font-size: 12px;
  cursor: pointer; color: inherit; background: transparent; }
.m1-langbar button[aria-pressed="true"] { background: color-mix(in srgb, currentColor 28%, transparent); }
.m1-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (prefers-reduced-motion: reduce) {
  .m1-needle { transition: none; }
}
`;

/**
 * 行长演示:measure / fontSize / align 为 CSS 变量型参数(经 DemoStage 注入 .demo-stage);
 * demo 内用逐字符 span + offsetTop 实时统计每行字符数,给出最长/平均行与 45–90 区间判定。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [tick, setTick] = useState(0);
  const [lang, setLang] = useState<Lang>("en");
  const columnRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => store.subscribe(() => setTick((n) => n + 1)), [store]);

  const chars = useMemo(() => Array.from(lang === "en" ? SAMPLE_EN : SAMPLE_ZH), [lang]);

  const [lines, setLines] = useState<number[]>([]);
  const measure = useCallback(() => {
    const el = columnRef.current;
    if (!el) return;
    setLines(countLines(el));
  }, []);

  // 参数变化后布局重排完成再测量;rAF 双帧保证样式已应用
  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(measure));
    return () => cancelAnimationFrame(raf);
  }, [measure, tick]);

  // 容器随视口收缩时(min(100%, …) 生效)重测
  useEffect(() => {
    const el = columnRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const max = lines.length ? Math.max(...lines) : 0;
  const avg = lines.length ? Math.round(lines.reduce((a, b) => a + b, 0) / lines.length) : 0;
  const verdict = lang !== "en"
    ? { zh: "中文样例:仅展示换行,不判定", en: "CJK sample: no verdict" }
    : avg > BAND_MAX
      ? { zh: "过长:垂直追踪吃力", en: "Too long: tracking strains" }
      : avg < BAND_MIN
        ? { zh: "过短:换行过频", en: "Too short: choppy" }
        : { zh: "适读区间内", en: "Within the readable band" };
  const needlePct = Math.min(
    100,
    Math.max(0, ((avg - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100),
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="m1-wrap">
        <div className="m1-band" aria-hidden="true">
          <div className="m1-band-ok" />
          <div className="m1-band-tick" style={{ left: `${((BAND_MIN - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100}%` }}>
            <span>45</span>
          </div>
          <div className="m1-band-tick" style={{ left: `${((BAND_MAX - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100}%` }}>
            <span>90</span>
          </div>
          <div className="m1-needle" style={{ left: `${needlePct}%` }} />
        </div>
        <p className="m1-column" ref={columnRef}>
          {chars.map((c, i) => (
            <span key={i} data-char={c === " " ? "sp" : undefined}>{c}</span>
          ))}
        </p>
        <div className="m1-readout">
          <span>行数 Lines <strong>{lines.length}</strong></span>
          <span>最长行 Longest <strong>{max}</strong></span>
          <span>平均行 Average <strong>{avg}</strong></span>
          <span className="m1-verdict">{verdict.zh} / {verdict.en}</span>
        </div>
        <p className="m1-note">
          判定口径为拉丁文本「字符(含空格)」;45–90 出自 Butterick《Practical Typography》(已核实),65ch 默认为社区常见惯例(未证实)。
          The verdict counts Latin characters incl. spaces; 45–90 is verified from Butterick's Practical Typography, while the 65ch default is a community convention (unverified).
        </p>
        <div className="m1-langbar" role="group" aria-label="样例语言 Sample language">
          {([["en", "英文 EN"], ["zh", "中文 ZH"]] as const).map(([id, label]) => (
            <button key={id} type="button" aria-pressed={lang === id} onClick={() => setLang(id)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
