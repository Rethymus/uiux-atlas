import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.os-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px;
}
.os-cells { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
.os-cell { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.os-cell svg {
  background: #f8fafc;
  border-radius: 10px;
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08);
}
.os-blur .os-cell svg { filter: blur(1.5px); }
.os-cell figcaption { font-size: 12px; color: rgba(0, 0, 0, 0.5); white-space: nowrap; }
.os-blurbtn {
  border: 1px solid rgba(15, 23, 42, 0.18);
  background: #fff;
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.65);
}
.os-blurbtn[aria-pressed="true"] {
  background: rgba(15, 23, 42, 0.88);
  color: #fff;
  border-color: transparent;
}
.os-note {
  max-width: 460px;
  font-size: 12px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
}
.os-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.55);
  text-align: center;
}
`;

/** 中心十字 + 单位参考(设计期示意,随 cell 一起渲染) */
function Crosshair() {
  return (
    <g aria-hidden="true" stroke="rgba(100, 116, 139, 0.4)" strokeWidth={0.5} strokeDasharray="1 1.2">
      <line x1={12} y1={2} x2={12} y2={22} />
      <line x1={2} y1={12} x2={22} y2={12} />
    </g>
  );
}

/**
 * 光学缩放演示:baseSize / compensate 均为 JS 型参数(订阅 store 后重算)。
 * 官方锚值:方形键程 18×18、圆形键程 Ø20(Material,07 §2,+11.1% = 20/18);
 * 不对称三角形按 Lucide 规则做 0.5px 光学偏心(规则官方,数值为 demo 取值)。
 * 线宽用 vector-effect: non-scaling-stroke 恒定 2px 绝对值,示意 opsz「放大线相对变细」方向
 * (官方补偿曲线未公开,demo 为方向示意)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [baseSize, setBaseSize] = useState(() => store.get("baseSize") as number);
  const [compensate, setCompensate] = useState(() => store.get("compensate") as string);
  const [blur, setBlur] = useState(false);

  useEffect(
    () =>
      store.subscribe(() => {
        setBaseSize(store.get("baseSize") as number);
        setCompensate(store.get("compensate") as string);
      }),
    [store],
  );

  const on = compensate === "on";
  const px = (units: number) => ((units / 24) * baseSize).toFixed(1);
  const strokeProps = {
    fill: "none" as const,
    stroke: "rgba(15, 23, 42, 0.85)",
    strokeWidth: 2,
    vectorEffect: "non-scaling-stroke" as const,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className={blur ? "os-scene os-blur" : "os-scene"}>
        <div className="os-cells">
          <figure className="os-cell">
            <svg width={baseSize} height={baseSize} viewBox="0 0 24 24" aria-hidden="true">
              <Crosshair />
              <rect x={3} y={3} width={18} height={18} {...strokeProps} />
            </svg>
            <figcaption>方 18×18 → {px(18)}px</figcaption>
          </figure>
          <figure className="os-cell">
            <svg width={baseSize} height={baseSize} viewBox="0 0 24 24" aria-hidden="true">
              <Crosshair />
              <circle cx={12} cy={12} r={on ? 10 : 9} {...strokeProps} />
            </svg>
            <figcaption>{on ? "圆 Ø20 → " : "圆 Ø18 → "}{px(on ? 20 : 18)}px</figcaption>
          </figure>
          <figure className="os-cell">
            <svg width={baseSize} height={baseSize} viewBox="0 0 24 24" aria-hidden="true">
              <Crosshair />
              <g transform={on ? "translate(0.5 0)" : undefined}>
                <path d="M8 7.5v9l7.5-4.5z" {...strokeProps} />
              </g>
            </svg>
            <figcaption>{on ? "三角 +0.5px 偏心" : "三角 几何居中"}</figcaption>
          </figure>
        </div>
        <div className="os-readout" aria-live="polite">
          baseSize={baseSize}px · compensate={compensate} ·
          {on
            ? ` Δ圆=+${(Number(px(20)) - Number(px(18))).toFixed(1)}px(+11.1%)`
            : " Δ圆=0(同尺寸对照)"}
        </div>
        <button
          type="button"
          className="os-blurbtn"
          aria-pressed={blur}
          onClick={() => setBlur((v) => !v)}
        >
          模糊法验收 Blur test
        </button>
        <p className="os-note">
          圆 Ø20 比方 18 大 2 个网格单位(≈ +11.1%,Material 官方键程);关掉补偿后并排模糊,圆明显显轻。
          Lucide 规则:不对称图形可小幅偏离几何中心(演示取 0.5px,官方未给数值)。
          Circle Ø20 overshoots the 18×18 square by 2 units (≈ +11.1%, official keylines);
          blur them uncompensated and the circle clearly reads lighter.
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
