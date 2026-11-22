import { useEffect, useState, type CSSProperties } from "react";
import { getEntryStore } from "@/lib/store";
import { contrastRatio, oklchToSrgb } from "@/lib/color";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 0–1 域 gamma sRGB 三元组(本文件局部类型;函数从 @/lib/color 取,类型不从其导入) */
type Rgb01 = [number, number, number];

const hexToRgb01 = (h: string): Rgb01 => {
  const m = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(m.slice(i, i + 2), 16) / 255) as Rgb01;
};
const rgb01ToHex = (rgb: Rgb01) =>
  "#" + rgb.map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("").toUpperCase();

/* ---------- 三件套常量(本会话离线标定,四态全过:文字 6.17–6.97:1、边框 3.20–3.76:1):
   底 bg = oklch(0.97 0.04 h) / 字 text = oklch(textLightness 0.13 h) / 边 border = oklch(0.6 0.17 h)
   换算锚点复验:oklch(1 0 0)=白;#6750A4 白字 6.44:1;#D0BCFF/#381E72 7.71:1 ---------- */

const BG_L = 0.97, BG_C = 0.04;
const TEXT_C = 0.13;
const BORDER_L = 0.6, BORDER_C = 0.17;

const oklchStr = (l: number, c: number, h: number) => `oklch(${l} ${c} ${h})`;

const css = `
.st-scene { position: absolute; inset: 0; display: flex; gap: 14px; padding: 16px; }
.st-main { flex: 1.25; min-width: 0; display: flex; flex-direction: column; gap: 9px; }
.st-alert {
  --st-bg: oklch(0.97 0.04 140);
  --st-border: oklch(0.6 0.17 140);
  --st-fg: oklch(0.45 0.13 140);
  background: var(--st-bg);
  border: 1px solid var(--st-border);
  border-radius: 11px;
  padding: 10px 13px;
  color: var(--st-fg);
  display: flex; align-items: flex-start; gap: 9px;
  animation: st-in 0.4s ease-out both;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}
.st-icon {
  width: 17px; height: 17px; flex: none; margin-top: 1px;
  border-radius: 50%; border: 2px solid currentColor; position: relative;
}
.st-icon::after {
  content: ""; position: absolute; inset: 3px; border-radius: 50%;
  background: currentColor; opacity: 0.35;
}
.st-body { min-width: 0; }
.st-body b { display: block; font-size: 12.5px; }
.st-body span { display: block; font-size: 11.5px; line-height: 1.5; opacity: 0.85; }
.st-hexes { font-size: 10px; font-variant-numeric: tabular-nums; opacity: 0.7; margin-top: 2px; display: block; }
.st-panel { flex: 1; min-width: 260px; display: flex; flex-direction: column; gap: 8px; font-size: 12px; }
.st-grid {
  background: #fff; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 11px;
  padding: 4px 0; overflow: hidden;
  animation: st-in 0.4s ease-out 100ms both;
}
.st-gridRow {
  display: grid; grid-template-columns: 74px 1fr 1fr; align-items: center; gap: 6px;
  padding: 7px 12px; font-variant-numeric: tabular-nums; font-size: 11.5px;
}
.st-gridRow + .st-gridRow { border-top: 1px solid rgba(0, 0, 0, 0.07); }
.st-gridRow b { font-size: 11.5px; }
.st-cell { display: flex; align-items: center; gap: 5px; }
.st-badge { font-size: 10px; font-weight: 650; border-radius: 999px; padding: 2px 7px; }
.st-badge[data-ok="true"] { background: oklch(0.86 0.09 150); color: oklch(0.35 0.09 150); }
.st-badge[data-ok="false"] { background: oklch(0.88 0.07 25); color: oklch(0.42 0.15 25); }
.st-sliders { display: flex; flex-direction: column; gap: 5px; background: #fff; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 11px; padding: 10px 12px; animation: st-in 0.4s ease-out 160ms both; }
.st-sliderRow { display: grid; grid-template-columns: 92px 1fr 44px; align-items: center; gap: 8px; font-size: 11.5px; }
.st-sliderRow input[type="range"] { width: 100%; accent-color: #334155; }
.st-sliderRow output { text-align: right; font-variant-numeric: tabular-nums; color: #5b6472; }
.st-note { font-size: 11px; color: #5b6472; line-height: 1.5; margin: 0; }
@keyframes st-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (max-width: 560px) {
  .st-scene { flex-direction: column; overflow: auto; }
  .st-panel { min-width: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .st-alert, .st-grid, .st-sliders { animation: none; }
  .st-alert { transition: none; }
}
`;

type StateKey = "success" | "info" | "warning" | "danger";

const STATE_ZH: Record<StateKey, string> = {
  success: "成功 Success",
  info: "信息 Info",
  warning: "警告 Warning",
  danger: "危险 Danger",
};
const STATE_MSG: Record<StateKey, string> = {
  success: "部署完成,全部检查通过。Deploy finished, all checks green.",
  info: "新版本已发布,详情见更新日志。A new version shipped, see the changelog.",
  warning: "配额将于 3 天后耗尽。Quota runs out in 3 days.",
  danger: "部署失败,已自动回滚。Deploy failed and was rolled back.",
};

/**
 * 状态色系统演示:四态各一套底/边/字三件套,右侧逐态跑两道闸(文字 4.5:1、边框 3:1)。
 * hueSuccess/hueInfo/hueWarning/hueDanger/textLightness 全部为 JS 型参数,订阅后 JS 侧重算三件套与对比度。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const read = () => ({
    hueSuccess: store.get("hueSuccess") as number,
    hueInfo: store.get("hueInfo") as number,
    hueWarning: store.get("hueWarning") as number,
    hueDanger: store.get("hueDanger") as number,
    textLightness: store.get("textLightness") as number,
  });
  const [p, setP] = useState(read);

  useEffect(
    () =>
      store.subscribe(() => {
        setP(read());
      }),
    [store],
  );

  const hues: Record<StateKey, number> = {
    success: p.hueSuccess,
    info: p.hueInfo,
    warning: p.hueWarning,
    danger: p.hueDanger,
  };

  const triple = (h: number) => {
    const bg = rgb01ToHex(oklchToSrgb(BG_L, BG_C, h).rgb);
    const fg = rgb01ToHex(oklchToSrgb(p.textLightness, TEXT_C, h).rgb);
    const border = rgb01ToHex(oklchToSrgb(BORDER_L, BORDER_C, h).rgb);
    return {
      bg, fg, border,
      bgCss: oklchStr(BG_L, BG_C, h),
      fgCss: oklchStr(p.textLightness, TEXT_C, h),
      borderCss: oklchStr(BORDER_L, BORDER_C, h),
      textRatio: contrastRatio(hexToRgb01(fg), hexToRgb01(bg)),
      borderRatio: contrastRatio(hexToRgb01(border), hexToRgb01(bg)),
    };
  };

  const rows = (Object.keys(hues) as StateKey[]).map((k) => ({ key: k, ...triple(hues[k]) }));

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="st-scene">
        <div className="st-main">
          {rows.map((r, i) => (
            <div
              key={r.key}
              className="st-alert"
              role="status"
              style={{
                "--st-bg": r.bgCss,
                "--st-border": r.borderCss,
                "--st-fg": r.fgCss,
                animationDelay: `${i * 70}ms`,
              } as CSSProperties}
            >
              <span className="st-icon" aria-hidden="true" />
              <span className="st-body">
                <b>{STATE_ZH[r.key]}</b>
                <span>{STATE_MSG[r.key]}</span>
                <span className="st-hexes">
                  底 {r.bg} · 边 {r.border} · 字 {r.fg}
                </span>
              </span>
            </div>
          ))}
        </div>
        <div className="st-panel">
          <div className="st-grid">
            {rows.map((r) => (
              <div key={r.key} className="st-gridRow">
                <b>{STATE_ZH[r.key].split(" ")[0]}</b>
                <span className="st-cell">
                  字/底 {r.textRatio.toFixed(2)}:1
                  <span className="st-badge" data-ok={r.textRatio >= 4.5}>
                    AA {r.textRatio >= 4.5 ? "✓" : "✗"}
                  </span>
                </span>
                <span className="st-cell">
                  边/底 {r.borderRatio.toFixed(2)}:1
                  <span className="st-badge" data-ok={r.borderRatio >= 3}>
                    3:1 {r.borderRatio >= 3 ? "✓" : "✗"}
                  </span>
                </span>
              </div>
            ))}
          </div>
          <div className="st-sliders">
            {(
              [
                { param: "hueSuccess", stateKey: "success" as StateKey, label: "success 色相" },
                { param: "hueInfo", stateKey: "info" as StateKey, label: "info 色相" },
                { param: "hueWarning", stateKey: "warning" as StateKey, label: "warning 色相" },
                { param: "hueDanger", stateKey: "danger" as StateKey, label: "danger 色相" },
              ]
            ).map(({ param, stateKey, label }) => (
              <label key={param} className="st-sliderRow">
                <span>{label}</span>
                <input
                  type="range"
                  min={0}
                  max={360}
                  step={1}
                  value={hues[stateKey]}
                  onChange={(e) => store.set(param, Number(e.target.value))}
                />
                <output>{hues[stateKey]}°</output>
              </label>
            ))}
            <label className="st-sliderRow">
              <span>文字明度 L</span>
              <input
                type="range"
                min={0.3}
                max={0.6}
                step={0.01}
                value={p.textLightness}
                onChange={(e) => store.set("textLightness", Number(e.target.value))}
              />
              <output>{p.textLightness.toFixed(2)}</output>
            </label>
          </div>
          <p className="st-note">
            三件套常量为本会话标定值(底 L=0.97/C=0.04、边 L=0.6/C=0.17、字 C=0.13),默认四态全过:
            文字 6.17–6.97:1、边框 3.20–3.76:1。判定不四舍五入(WCAG,调研 06§17);红绿语义另需色盲复核
            (调研 06§19)——注意图标与文字承担语义冗余。
          </p>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
