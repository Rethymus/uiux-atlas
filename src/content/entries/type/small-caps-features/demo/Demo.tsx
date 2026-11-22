import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.sc-stage { padding: 12px; display: flex; flex-direction: column; gap: 10px; }
.sc-spec { border: 1px solid color-mix(in srgb, currentColor 16%, transparent);
  border-radius: 10px; padding: 12px 14px; }
.sc-kicker { font-size: 15px; font-weight: 600; letter-spacing: 0.08em;
  font-variant-caps: var(--sc-caps); margin: 0 0 6px; }
.sc-liga { font-size: 17px; font-variant-ligatures: var(--sc-lig); margin: 0 0 6px; }
.sc-zero { font-family: var(--font-mono, ui-monospace, monospace); font-size: 15px;
  font-variant-numeric: var(--sc-zero); margin: 0; }
.sc-caption { margin: 6px 0 0; font-size: 12px; opacity: 0.62; line-height: 1.55; }
.sc-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 0; }
.sc-pair span { border: 1px dashed color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 8px; padding: 6px 10px; font-size: 15px; }
.sc-pair .sc-b { font-variant-caps: var(--sc-caps);
  font-variant-ligatures: var(--sc-lig); font-variant-numeric: var(--sc-zero); }
.sc-panel { display: flex; flex-wrap: wrap; gap: 6px; }
.sc-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px;
  padding: 3px 10px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  font-variant-numeric: tabular-nums; }
.sc-badge[data-active="true"] { background: color-mix(in srgb, oklch(0.72 0.15 150) 22%, transparent); }
.sc-badge[data-active="false"] { background: color-mix(in srgb, oklch(0.68 0.19 30) 16%, transparent); }
.sc-code { margin: 4px 0 0; font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 12px; opacity: 0.75; white-space: pre-wrap; }
`;

/**
 * 小型大写与开放特性演示:caps/ligatures/zero 三个 CSS 变量型参数
 * 分别落到高层属性 font-variant-caps / font-variant-ligatures / font-variant-numeric;
 * 宽度探针对照「原样 vs 特性生效」的实测渲染宽度:Δ>0 = 字形已替换
 * (真 smcp/c2sc 字形,或 MDN 记载的缺字形合成;无法从宽度区分二者);
 * Δ≈0 = 特性未生效(字体缺特性表)——结论由测量产生,不写死。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [tick, setTick] = useState(0);
  const [probes, setProbes] = useState({ caps: 0, liga: 0 });

  const capsARef = useRef<HTMLSpanElement>(null);
  const capsBRef = useRef<HTMLSpanElement>(null);
  const ligaARef = useRef<HTMLSpanElement>(null);
  const ligaBRef = useRef<HTMLSpanElement>(null);

  useEffect(() => store.subscribe(() => setTick((n) => n + 1)), [store]);

  useLayoutEffect(() => {
    const w = (el: HTMLElement | null) => el?.getBoundingClientRect().width ?? 0;
    setProbes({ caps: Math.abs(w(capsARef.current) - w(capsBRef.current)), liga: Math.abs(w(ligaARef.current) - w(ligaBRef.current)) });
  }, [tick]);

  const caps = store.get("caps") as string;
  const ligatures = store.get("ligatures") as string;
  const zero = store.get("zero") as string;
  void tick;

  const capsTag =
    caps === "all-small-caps" ? `"c2sc" 1, "smcp" 1` : caps === "small-caps" ? `"smcp" 1` : `"smcp" 0`;
  const ligaTag = ligatures === "no-common-ligatures" ? `"liga" 0` : `"liga" 1`;
  const capsApplied = probes.caps > 0.5;
  const ligaOff = ligatures === "no-common-ligatures" && probes.liga > 0.5;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="sc-stage">
        <div className="sc-panel">
          <span className="sc-badge" data-active={capsApplied}>
            {capsApplied ? `✓ 小型大写渲染已变化 Δ=${probes.caps.toFixed(1)}px` : `• 小型大写无宽度变化 Δ=${probes.caps.toFixed(1)}px`}
          </span>
          <span className="sc-badge" data-active={ligaOff}>
            {ligatures === "common-ligatures"
              ? `连字开启 liga on(默认)—切到关闭可测宽度差`
              : ligaOff
                ? `✓ 连字已关 liga off:宽度差 Δ=${probes.liga.toFixed(1)}px`
                : `连字关闭但无宽度差(字体可能无 liga 表)`}
          </span>
          <span className="sc-badge" data-active={zero === "slashed-zero"}>
            斜杠零 {zero === "slashed-zero" ? "开" : "关"}(zero)
          </span>
        </div>
        <div className="sc-spec">
          <p className="sc-kicker">Uiux Atlas · Typography Notes · Chapter 07</p>
          <p className="sc-liga">Difficult waffles — efficient airflow; final office film.</p>
          <p className="sc-zero">O0 · 编号 0070 · ¥1,200.00</p>
          <p className="sc-caption">
            眉标行走 font-variant-caps(all-small-caps 默认);连字样例走
            font-variant-ligatures(fi/fl/ffi);编号行走 font-variant-numeric。
            注意:中文不受 smcp/liga 影响,视觉重量需单独核对。
          </p>
        </div>
        <div className="sc-pair">
          <span ref={capsARef}>Homepage 0070</span>
          <span className="sc-b" ref={capsBRef}>Homepage 0070</span>
        </div>
        <div className="sc-pair">
          <span ref={ligaARef}>waffle airflow</span>
          <span className="sc-b" ref={ligaBRef}>waffle airflow</span>
        </div>
        <p className="sc-code">{`/* 高层属性(演示所用) */ font-variant-caps: ${caps}; font-variant-ligatures: ${ligatures}; font-variant-numeric: ${zero};`}</p>
        <p className="sc-code">{`/* 等价低层标签(仅注释展示;官方明确不要用它启用小型大写) */ font-feature-settings: ${capsTag}, ${ligaTag}${zero === "slashed-zero" ? `, "zero" 1` : ""};`}</p>
        <p className="sc-caption">
          探针说明:小型大写 Δ&gt;0 表示字形已替换——可能是字体真 smcp/c2sc 字形,也可能是 MDN
          记载的「缺字形时由大写字形合成」,宽度无法区分二者;Δ≈0 表示当前字体未产生变化。
          Probe notes: a small-caps Δ&gt;0 means glyphs were substituted — either true smcp/c2sc
          glyphs or, per MDN, synthesis from uppercase glyphs when absent; width cannot tell the
          two apart. Δ≈0 means the current font produced no change.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
