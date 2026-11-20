import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/**
 * WCAG 2.1 相对亮度与对比度(公式出处:W3C WCAG 2.1 Understanding / contrast-minimum):
 *
 *   相对亮度 L = 0.2126·R + 0.7152·G + 0.0722·B
 *   其中通道先线性化: c = (c_srgb <= 0.03928) ? c_srgb / 12.92
 *                                     : ((c_srgb + 0.055) / 1.055) ^ 2.4
 *
 *   对比度 = (较亮亮度 + 0.05) / (较暗亮度 + 0.05)   ——与前后景顺序无关
 *
 * 判定用未舍入原值(WCAG 原文要求 4.499:1 不达标),仅显示值保留两位。
 */
function parseHex(hex: string): { rgb: [number, number, number]; ok: boolean } {
  const m = hex.trim().replace(/^#/, "");
  const full = m.length === 3 ? m.split("").map((ch) => ch + ch).join("") : m;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) {
    return { rgb: [0, 0, 0], ok: false };
  }
  return {
    rgb: [
      parseInt(full.slice(0, 2), 16),
      parseInt(full.slice(2, 4), 16),
      parseInt(full.slice(4, 6), 16),
    ],
    ok: true,
  };
}

function luminance([r, g, b]: [number, number, number]): number {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

const css = `
.wc-stage {
  --wc-fg: #1C1B1F;
  --wc-bg: #FFFBFE;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: stretch;
  gap: 16px;
  padding: 18px;
}
.wc-preview {
  flex: 1.1;
  border-radius: 16px;
  padding: 22px 26px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  min-width: 0;
  transition: background-color 0.18s ease;
  /* CSS 变量型参数由 DemoStage 注入 .demo-stage,此处直接消费 */
  background-color: var(--wc-bg);
  color: var(--wc-fg);
}
.wc-sample-normal { font-size: 14px; line-height: 1.55; }
.wc-sample-large { font-size: 24px; line-height: 1.4; font-weight: 400; }
.wc-sample-large-bold { font-size: 18.66px; line-height: 1.4; font-weight: 700; }
.wc-nonText {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}
.wc-check {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 2px solid currentColor; /* 非文本样本:前景描边,对相邻色按 3:1 判 */
  position: relative;
}
.wc-check::after {
  content: "";
  position: absolute;
  inset: 3px 2px 5px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(40deg);
}
.wc-panel {
  flex: 1;
  min-width: 230px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  font-size: 12.5px;
}
.wc-ratioRow { display: flex; align-items: baseline; gap: 10px; font-variant-numeric: tabular-nums; }
.wc-ratio { font-size: 24px; font-weight: 700; }
.wc-lum { color: #5b6472; font-size: 11.5px; font-family: ui-monospace, Consolas, monospace; }
.wc-badges { display: flex; flex-wrap: wrap; gap: 6px; }
.wc-badge {
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 600;
  color: #fff;
  font-variant-numeric: tabular-nums;
}
.wc-pass { background: oklch(0.6 0.15 150); }
.wc-fail { background: oklch(0.55 0.19 25); }
.wc-scale {
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: #e6e9ee;
  align-self: flex-start;
}
.wc-scale button {
  border: 0;
  border-radius: 999px;
  padding: 4px 13px;
  font-size: 12px;
  cursor: pointer;
  color: #374151;
  background: transparent;
}
.wc-scale button[aria-pressed="true"] { background: #fff; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.14); }
.wc-note { font-size: 11.5px; color: #5b6472; line-height: 1.5; }
.wc-invalid { color: oklch(0.55 0.19 25); font-size: 12px; }
@media (prefers-reduced-motion: reduce) {
  .wc-preview { transition: none; }
}
`;

/** 四项阈值:AA 正文 4.5 / AAA 正文 7 / 大字 AA 3 / 非文本 3(WCAG 2.1 Understanding) */
const GATES = [
  { key: "aa", label: "AA 4.5:1", threshold: 4.5 },
  { key: "aaa", label: "AAA 7:1", threshold: 7 },
  { key: "large", label: "大字 Large 3:1", threshold: 3 },
  { key: "nontext", label: "非文本 Non-text 3:1", threshold: 3 },
] as const;

/**
 * WCAG 对比度演示:前景/背景为 CSS 变量型参数(demo 同时读值计算),
 * textScale 为 JS 型参数——订阅后切换样字档位与适用阈值(大字减半)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [scale, setScale] = useState(() => store.get("textScale") as string);
  const [, setTick] = useState(0);

  useEffect(
    () =>
      store.subscribe(() => {
        setScale(store.get("textScale") as string);
        setTick((n) => n + 1);
      }),
    [store],
  );

  const fg = store.get("foreground") as string;
  const bg = store.get("background") as string;
  const fgParsed = parseHex(fg);
  const bgParsed = parseHex(bg);
  const valid = fgParsed.ok && bgParsed.ok;

  // 相对亮度与对比度(公式见文件头注释);判定不四舍五入
  const L1 = luminance(fgParsed.rgb);
  const L2 = luminance(bgParsed.rgb);
  const ratio = valid
    ? (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
    : 0;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="wc-stage">
        <div className="wc-preview" data-scale={scale}>
          {scale === "large" ? (
            <>
              <span className="wc-sample-large">大字 Large text 24px</span>
              <span className="wc-sample-large-bold">粗体大字 Bold 18.66px ≈ 14pt bold</span>
            </>
          ) : (
            <span className="wc-sample-normal">
              正文样字 Body text —— WCAG 2.1 对比度四道阈值实时判定。
              The four WCAG 2.1 contrast gates, judged live.
            </span>
          )}
          <span className="wc-nonText">
            <span className="wc-check" aria-hidden="true" />
            非文本样本 Non-text sample(3:1 / SC 1.4.11)
          </span>
        </div>
        <div className="wc-panel">
          <div className="wc-ratioRow">
            <span className="wc-ratio">{valid ? `${ratio.toFixed(2)}:1` : "—"}</span>
            {valid && (
              <span className="wc-lum">
                L(fg)={L1.toFixed(3)} L(bg)={L2.toFixed(3)}
              </span>
            )}
          </div>
          <div className="wc-badges">
            {valid &&
              GATES.map((g) => (
                <span key={g.key} className={`wc-badge ${ratio >= g.threshold ? "wc-pass" : "wc-fail"}`}>
                  {g.label} {ratio >= g.threshold ? "✓" : "✗"}
                </span>
              ))}
          </div>
          <div className="wc-scale" role="group" aria-label="字号档位 Text scale">
            <button type="button" aria-pressed={scale === "normal"} onClick={() => setScale("normal")}>
              正文 Normal
            </button>
            <button type="button" aria-pressed={scale === "large"} onClick={() => setScale("large")}>
              大字 Large
            </button>
          </div>
          <p className="wc-note">
            {valid ? (
              <>
                判定用未舍入原值,显示保留两位(4.499:1 显示 4.50 但为 ✗)。
                大字 = ≥18pt(≈24px)或 ≥14pt(≈18.66px)粗体,阈值减半。
                Judged unrounded, displayed to two decimals. Large = ≥18pt (≈24px) or ≥14pt bold, halved thresholds.
              </>
            ) : (
              <span className="wc-invalid">hex 无法解析 / unparseable hex — use #RRGGBB or #RGB</span>
            )}
          </p>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
