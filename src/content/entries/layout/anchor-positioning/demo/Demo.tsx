import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** area → 语义方位(回退路径换算坐标用) */
const AREA_SIDE: Record<string, "top" | "bottom" | "left" | "right"> = {
  "bottom center": "bottom",
  "top center": "top",
  "right center": "right",
  "left center": "left",
};
const OPPOSITE: Record<string, string> = {
  "bottom center": "top center",
  "top center": "bottom center",
  "right center": "left center",
  "left center": "right center",
};
/** 原生路径:position-area → 间距落在哪条 margin */
const AREA_MARGIN: Record<string, string> = {
  "bottom center": "margin-top",
  "top center": "margin-bottom",
  "right center": "margin-left",
  "left center": "margin-right",
};

const css = `
.ap-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.ap-stage {
  position: relative;
  height: 260px;
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 12px;
  overflow: hidden;
  background:
    repeating-linear-gradient(45deg, color-mix(in srgb, currentColor 4%, transparent) 0 12px, transparent 12px 24px);
}
.ap-btn {
  position: absolute;
  right: 16px;
  bottom: 16px;
  anchor-name: --ap-btn;   /* 命名锚点(不支持的浏览器忽略此声明) */
  border: 1px solid color-mix(in srgb, currentColor 35%, transparent);
  border-radius: 999px;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 650;
  cursor: pointer;
  background: color-mix(in srgb, oklch(0.66 0.13 250) 35%, color-mix(in srgb, Canvas 88%, transparent));
  color: inherit;
}
.ap-btn:focus-visible { outline: 2px solid oklch(0.62 0.15 250); outline-offset: 2px; }
.ap-pop {
  position: fixed;
  position-anchor: --ap-btn;          /* 关联锚点 */
  position-area: bottom center;        /* 声明式九宫格(引擎不支持时整组声明无效,走 JS 回退) */
  margin-top: var(--ap-offset);
  position-visibility: anchors-visible;
  width: min(230px, 60vw);
  padding: 10px 12px;
  border: 1px solid color-mix(in srgb, currentColor 32%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, Canvas 92%, currentColor);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.16);
  font-size: 12px;
  line-height: 1.55;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.ap-pop[data-open="true"] { opacity: 1; pointer-events: auto; }
.ap-pop b { display: block; font-size: 12.5px; margin-bottom: 2px; }
.ap-pop[data-path="js"] {
  /* JS 回退路径:absolute 定位,坐标由 React 计算(声明见下方生成 style) */
  position: absolute;
  position-anchor: auto;
  position-area: auto;
  position-visibility: visible;
}
.ap-readout {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  font: 12px/1.5 ui-monospace, Menlo, Consolas, monospace;
}
.ap-chip {
  padding: 2px 10px;
  border-radius: 999px;
  font: 11px/1.5 ui-monospace, Menlo, Consolas, monospace;
  transition: background-color 0.25s ease;
}
.ap-chip-native { background: color-mix(in srgb, oklch(0.68 0.15 160) 30%, transparent); }
.ap-chip-js { background: color-mix(in srgb, oklch(0.68 0.14 75) 30%, transparent); }
.ap-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
.ap-hint code {
  font: 11.5px/1.5 ui-monospace, Menlo, Consolas, monospace;
  background: color-mix(in srgb, currentColor 8%, transparent);
  border-radius: 5px;
  padding: 1px 5px;
}
@media (prefers-reduced-motion: reduce) {
  .ap-pop { transition: none; }
  .ap-chip { transition: none; }
}
`;

/**
 * 锚点定位演示:area 为 JS 型参数(生成 position-area 声明 + 回退坐标换算);
 * offset 为 CSS 型参数(--ap-offset);tryFallback 为 JS 型参数(生成/移除
 * position-try-fallbacks 与 @position-try 规则)。运行时以
 * CSS.supports('anchor-name: --a') 检测:原生支持 → 纯 CSS 锚定;
 * 不支持 → getBoundingClientRect 的 JS 回退(按钮右下角,浮层朝容器中心
 * 反方向溢出时由回退翻面逻辑换边)。demo 如实报告当前路径。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [area, setArea] = useState(() => store.get("area") as string);
  const [offset, setOffset] = useState(() => store.get("offset") as number);
  const [tryFallback, setTryFallback] = useState(() => store.get("tryFallback") as string);
  const [open, setOpen] = useState(true);
  const [jsPos, setJsPos] = useState<{ left: number; top: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setArea(store.get("area") as string);
        setOffset(store.get("offset") as number);
        setTryFallback(store.get("tryFallback") as string);
      }),
    [store],
  );

  const native =
    typeof CSS !== "undefined" && typeof CSS.supports === "function"
      ? CSS.supports("anchor-name: --a")
      : false;

  // JS 回退:按 area 语义换算浮层坐标(相对舞台);溢出且 tryFallback=on 时翻到对侧
  useEffect(() => {
    if (native || !open) {
      setJsPos(null);
      return;
    }
    const stage = stageRef.current;
    const btn = btnRef.current;
    const pop = popRef.current;
    if (!stage || !btn || !pop) return;
    const s = stage.getBoundingClientRect();
    const b = btn.getBoundingClientRect();
    const w = pop.offsetWidth;
    const h = pop.offsetHeight;
    const side = AREA_SIDE[area] ?? "bottom";
    let left: number;
    let top: number;
    if (side === "bottom") {
      left = b.left - s.left + b.width / 2 - w / 2;
      top = b.bottom - s.top + offset;
    } else if (side === "top") {
      left = b.left - s.left + b.width / 2 - w / 2;
      top = b.top - s.top - h - offset;
    } else if (side === "right") {
      left = b.right - s.left + offset;
      top = b.top - s.top + b.height / 2 - h / 2;
    } else {
      left = b.left - s.left - w - offset;
      top = b.top - s.top + b.height / 2 - h / 2;
    }
    const out =
      left < 0 || top < 0 || left + w > s.width || top + h > s.height;
    if (out && tryFallback === "on") {
      const opp = OPPOSITE[area] ?? "top center";
      const oSide = AREA_SIDE[opp] ?? "top";
      if (oSide === "top") { left = b.left - s.left + b.width / 2 - w / 2; top = b.top - s.top - h - offset; }
      else if (oSide === "bottom") { left = b.left - s.left + b.width / 2 - w / 2; top = b.bottom - s.top + offset; }
      else if (oSide === "right") { left = b.right - s.left + offset; top = b.top - s.top + b.height / 2 - h / 2; }
      else { left = b.left - s.left - w - offset; top = b.top - s.top + b.height / 2 - h / 2; }
    }
    setJsPos({ left: Math.max(4, left), top: Math.max(4, top) });
  }, [native, open, area, offset, tryFallback]);

  const marginProp = AREA_MARGIN[area] ?? "margin-top";
  const flipArea = OPPOSITE[area] ?? "top center";

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ap-wrap">
        <div ref={stageRef} className="ap-stage">
          <button
            ref={btnRef}
            type="button"
            className="ap-btn"
            aria-expanded={open}
            aria-describedby="ap-pop-body"
            onClick={() => setOpen((v) => !v)}
          >
            帮助 Help
          </button>
          <div
            ref={popRef}
            className="ap-pop"
            id="ap-pop-body"
            role="note"
            data-open={open ? "true" : "false"}
            data-path={native ? "css" : "js"}
            style={
              !native && jsPos
                ? { left: jsPos.left, top: jsPos.top }
                : { [marginProp]: `var(--ap-offset)` } as CSSProperties
            }
          >
            <b>锚点浮层 Anchored pop</b>
            <span>
              {native
                ? `position-area: ${area};${tryFallback === "on" ? ` 溢出翻面 → ${flipArea}(@position-try)。` : " 未启用溢出换位。"}`
                : `JS 回退:getBoundingClientRect + ${area} 语义换算${tryFallback === "on" ? ",溢出翻面对侧。" : ",不翻面。"}`}
            </span>
          </div>
          {/* 原生路径的动态声明:position-area / margin / @position-try */}
          <style>{`
.ap-pop[data-path="css"] {
  position-area: ${area};
  ${marginProp}: var(--ap-offset);
  ${tryFallback === "on" ? "position-try-fallbacks: --ap-flip;" : ""}
}
${tryFallback === "on" ? `@position-try --ap-flip { position-area: ${flipArea}; }` : ""}
`}</style>
        </div>
        <div className="ap-readout" aria-live="polite">
          <span>area = {area}</span>
          <span>offset = {offset}px</span>
          <span>tryFallback = {tryFallback}</span>
          <span className={`ap-chip ${native ? "ap-chip-native" : "ap-chip-js"}`}>
            {native ? "本浏览器:原生 anchor 定位(纯 CSS)" : "本浏览器:JS 回退(getBoundingClientRect)"}
          </span>
        </div>
        <p className="ap-hint">
          原生路径:<code>anchor-name: --ap-btn</code> 命名锚点 → <code>position-area</code> 贴合 → <code>@position-try</code> 溢出翻面 → <code>position-visibility: anchors-visible</code> 条件隐藏,零 JS。
          切 area 四向 / 开关 tryFallback 观察换位;支持面:Chrome/Edge 125、Safari 26(position-visibility 增补 26.2)、Firefox 147(调研 11§1)。
          Native path: <code>anchor-name: --ap-btn</code> names the anchor → <code>position-area</code> pins it → <code>@position-try</code> flips on overflow → <code>position-visibility: anchors-visible</code> hides conditionally, all CSS.
          Switch area / toggle tryFallback to watch the flip; support: Chrome/Edge 125, Safari 26 (position-visibility in 26.2), Firefox 147 (research 11 §1).
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
