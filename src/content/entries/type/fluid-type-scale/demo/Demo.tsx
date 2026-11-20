import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 视口 px→rem 折算根字号,与 Utopia 换算一致(调研 05§13 输出样本反推验证) */
const ROOT_PX = 16;
const STEPS = [0, 1, 2, 3, 4, 5] as const;

interface StepInfo {
  n: number;
  /** 该级下限 rem */
  min: number;
  /** 该级上限 rem */
  max: number;
  /** 斜率 rem/rem */
  slope: number;
  /** 直线截距 rem */
  inter: number;
}

interface ScaleParams {
  minViewport: number;
  maxViewport: number;
  minSize: number;
  maxSize: number;
  ratio: number;
}

const fmt = (n: number): number => Number(n.toFixed(4));

/** Utopia 插值:minSize/maxSize 按比率逐级放大,slope=(max−min)/(maxVw−minVw),inter=min−slope·minVw */
function buildSteps(p: ScaleParams): StepInfo[] {
  const minVwRem = p.minViewport / ROOT_PX;
  const maxVwRem = p.maxViewport / ROOT_PX;
  const span = maxVwRem - minVwRem;
  return STEPS.map((n) => {
    const min = p.minSize * Math.pow(p.ratio, n);
    const max = p.maxSize * Math.pow(p.ratio, n);
    // minViewport ≥ maxViewport 时分母为 0:斜率退化为 0(静态字阶),避免除零
    const slope = span > 0 ? (max - min) / span : 0;
    const inter = min - slope * minVwRem;
    return { n, min, max, slope, inter };
  });
}

/** 生成 clamp() 值字符串(4 位小数,与 Utopia 输出精度一致) */
function clampValue(s: StepInfo): string {
  return `clamp(${fmt(s.min)}rem, ${fmt(s.inter)}rem + ${fmt(s.slope * 100)}vw, ${fmt(s.max)}rem)`;
}

/** 模拟视口宽度下的实际渲染字号(px),按 clamp 的 max(MIN, min(VAL, MAX)) 语义 */
function pxAt(s: StepInfo, viewportPx: number): number {
  const rem = Math.max(s.min, Math.min(s.inter + s.slope * (viewportPx / ROOT_PX), s.max));
  return rem * ROOT_PX;
}

const css = `
.fts-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.fts-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
  gap: 12px;
  align-items: stretch;
}
.fts-code {
  margin: 0;
  padding: 12px 14px;
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 7%, transparent);
  font: 12px/1.75 ui-monospace, "Cascadia Code", Menlo, Consolas, monospace;
  white-space: pre;
  overflow-x: auto;
}
.fts-preview {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
  padding: 12px 14px;
  border: 1px dashed color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px;
}
.fts-row { display: flex; align-items: baseline; gap: 10px; min-width: 0; }
.fts-label {
  flex: none;
  width: 58px;
  font: 11px/1.4 ui-monospace, Menlo, Consolas, monospace;
  opacity: 0.6;
}
.fts-sample { line-height: 1.15; overflow-wrap: anywhere; min-width: 0; }
.fts-px {
  flex: none;
  margin-left: auto;
  font: 11px/1.4 ui-monospace, Menlo, Consolas, monospace;
  opacity: 0.72;
  white-space: nowrap;
}
.fts-sim { display: flex; align-items: center; gap: 10px; font-size: 12px; }
.fts-sim input { flex: 1; min-width: 0; }
.fts-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (max-width: 760px) { .fts-grid { grid-template-columns: 1fr; } }
`;

/**
 * 流式字阶演示:六个 JS 型参数(minViewport/maxViewport/minSize/maxSize/ratio)
 * 订阅 store 后实时生成 --step-0..5 的 clamp() 字符串——既展示代码,
 * 又写进预览区的 CSS 变量(字号随真实浏览器视口缩放);
 * 另配「模拟视口宽度」滑杆,按同一公式换算出该宽度下的实际 px 值。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readScale = (): StepInfo[] =>
    buildSteps({
      minViewport: store.get("minViewport") as number,
      maxViewport: store.get("maxViewport") as number,
      minSize: store.get("minSize") as number,
      maxSize: store.get("maxSize") as number,
      ratio: store.get("ratio") as number,
    });

  const [steps, setSteps] = useState<StepInfo[]>(readScale);
  const [simVw, setSimVw] = useState(768);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => store.subscribe(() => setSteps(readScale())), [store]);

  // 把生成的 clamp() 写为 --step-0..5,应用到预览区(随真实视口缩放)
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    for (const s of steps) el.style.setProperty(`--step-${s.n}`, clampValue(s));
  }, [steps]);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="fts-wrap">
        <div className="fts-grid">
          <pre className="fts-code" aria-label="生成的 clamp 代码 generated clamp code">
            {steps.map((s) => `--step-${s.n}: ${clampValue(s)};`).join("\n")}
          </pre>
          <div className="fts-preview" ref={previewRef}>
            {steps.map((s) => (
              <div className="fts-row" key={s.n}>
                <span className="fts-label">--step-{s.n}</span>
                <span className="fts-sample" style={{ fontSize: `var(--step-${s.n})` }}>
                  排版 Fluid Type Aa 123
                </span>
                <span className="fts-px">
                  @{simVw}px ≈ {pxAt(s, simVw).toFixed(1)}px
                </span>
              </div>
            ))}
          </div>
        </div>
        <label className="fts-sim">
          <span>
            模拟视口宽度 Simulated viewport <strong>{simVw}px</strong>
          </span>
          <input
            type="range"
            min={320}
            max={1920}
            step={1}
            value={simVw}
            aria-label="模拟视口宽度 Simulated viewport width"
            onChange={(e) => setSimVw(Number(e.target.value))}
          />
        </label>
        <p className="fts-hint">
          预览字号由生成的 clamp() 变量驱动,直接缩放浏览器窗口即可看到插值;右侧数值为模拟视口宽度下按同一公式换算的实际 px。
          The preview sizes are driven by the generated clamp() variables — resize the browser to see interpolation; the badges show px values computed by the same formula at the simulated width.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
