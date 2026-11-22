import { useEffect, useMemo, useState } from "react";
import "@fontsource-variable/inter/standard.css";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const HEADLINE = "Weight you can feel";

interface Token {
  text: string;
  index: number;
}

/** 拆字(补研 12§6 无库兜底路线):按词分组、按字符给序号 */
const tokenize = (text: string, granularity: string): Token[][] => {
  const words = text.split(" ");
  let i = 0;
  if (granularity === "words") {
    return words.map((w) => [{ text: w, index: i++ }]);
  }
  return words.map((w) => [...w].map((ch) => ({ text: ch, index: i++ })));
};

const css = `
.demo-stage {
  --kinetic-rise: 600ms;
  --k-wght: 400;
  transition: --k-wght 0.5s;  /* 注册轴的过渡时长取补研 12§6 片段(transition --wght .5s) */
}
@property --k-wght {
  syntax: "<number>";
  inherits: true;
  initial-value: 400;
}
.kt-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 12px; padding: 18px 20px; overflow: hidden; }
.kt-headline {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  gap: 0 0.3em;
  font-family: "Inter Variable", system-ui, sans-serif;
  font-size: clamp(30px, 6vw, 52px);
  line-height: 1.25;
  color: var(--text);
  font-variation-settings: "wght" var(--k-wght);
}
.kt-unit-mask { display: inline-block; overflow: hidden; padding-bottom: 0.08em; margin-bottom: -0.08em; }
.kt-unit {
  display: inline-block;
  animation: kt-rise var(--kinetic-rise, 600ms) cubic-bezier(0.2, 0.7, 0.3, 1) both;
}
@keyframes kt-rise {
  from { transform: translateY(110%); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
.kt-toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 12px; color: var(--text-dim); }
.kt-btn {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 5px 16px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.kt-btn:hover { border-color: var(--accent); color: var(--accent); }
.kt-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.kt-chip-accent { border-color: var(--accent); color: var(--accent); }
.kt-hint { margin: 0; font-size: 12px; color: var(--text-faint); line-height: 1.5; }
@media (prefers-reduced-motion: reduce) {
  .kt-unit { animation: none; }
  .demo-stage { transition: none; }
}
`;

/**
 * 动态文字演示(补研 12§6 双路线合一,零动画库):
 * - 逐字/逐词揭示:手写拆字,每个单元套 overflow:hidden 的 mask 容器(SplitText mask 语义),
 *   上升 keyframes rise 同款(translateY(110%) → 0,cubic-bezier(.2,.7,.3,1),默认 600ms),
 *   交错 = index × stagger 内联 animation-delay(默认 40ms);
 * - 字重轴动画:@property 注册 --k-wght(参数经 cssVar 注入舞台),标题 font-variation-settings:
 *   "wght" var(--k-wght),0.5s 过渡——字体为打包的 Inter Variable(与 variable-fonts 条目同源);
 * - a11y:标题容器 aria-label 整句 + 拆分 span aria-hidden(等价 SplitText aria:"auto");
 * - reduced-motion:上升与轴过渡全部关闭,文字直出。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [stagger, setStagger] = useState(() => store.get("stagger") as number);
  const [reveal, setReveal] = useState(() => store.get("reveal") as string);
  const [wght, setWght] = useState(() => store.get("wght") as number);
  const [runId, setRunId] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(
    () =>
      store.subscribe(() => {
        setStagger(store.get("stagger") as number);
        setReveal(store.get("reveal") as string);
        setWght(store.get("wght") as number);
      }),
    [store],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const words = useMemo(() => tokenize(HEADLINE, reveal), [reveal]);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="kt-stage">
        <h2 className="kt-headline" aria-label={HEADLINE} key={runId}>
          {words.map((word, wi) => (
            <span key={wi} aria-hidden="true" className="kt-word" style={{ whiteSpace: "nowrap", display: "inline-flex" }}>
              {word.map((token) => (
                <span key={token.index} className="kt-unit-mask">
                  <span className="kt-unit" style={{ animationDelay: `${token.index * stagger}ms` }}>
                    {token.text}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h2>
        <div className="kt-toolbar">
          <button type="button" className="kt-btn" onClick={() => setRunId((n) => n + 1)}>
            重播 Replay
          </button>
          <span className="kt-chip">
            wght → {wght}
          </span>
          <span className="kt-chip">
            stagger {stagger}ms · rise 600ms · {reveal}
          </span>
          <span className="kt-chip kt-chip-accent">Inter Variable wght 轴 / wght axis</span>
          {reduced && <span className="kt-chip">reduced-motion: 揭示与轴过渡关闭 / rise & axis transition off</span>}
        </div>
        <p className="kt-hint">
          拖动 wght 参数:标题字重经注册轴变量以 0.5s 平滑过渡(字体为打包的 Inter Variable);「重播」重跑逐字上升——每个字符在
          overflow hidden 的 mask 里从下方升起,间隔按 stagger 交错 / drag the wght param and the headline weight glides over
          0.5s on the registered axis (bundled Inter Variable); Replay re-runs the per-character rise — each char climbs out
          of an overflow-hidden mask, staggered by the interval.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
