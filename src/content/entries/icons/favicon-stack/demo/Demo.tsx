import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Scheme = "light" | "dark";
type Maskable = "show" | "hide";

const css = `
.fav-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
}
/* —— 模拟浏览器标签条:随 scheme 一起翻暗,还原真实观感 —— */
.fav-chrome {
  width: min(520px, 100%);
  border-radius: 12px 12px 0 0;
  padding: 8px 10px 0;
  background: #d7dde5;
  transition: background 0.25s ease;
}
.fav-chrome[data-dark="true"] { background: #2a2d33; }
.fav-tabs { display: flex; gap: 6px; }
.fav-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 150px;
  padding: 5px 10px;
  border-radius: 8px 8px 0 0;
  font-size: 11px;
  background: #f4f6f9;
  color: rgba(15, 23, 42, 0.72);
  white-space: nowrap;
  overflow: hidden;
}
.fav-tab[data-active="true"] { background: #ffffff; color: rgba(15, 23, 42, 0.9); }
.fav-chrome[data-dark="true"] .fav-tab { background: #3a3e46; color: rgba(255, 255, 255, 0.6); }
.fav-chrome[data-dark="true"] .fav-tab[data-active="true"] { background: #4a4f59; color: #fff; }
.fav-tab svg, .fav-tab .fav-ico {
  flex: none;
  width: 16px;
  height: 16px;
  display: block;
}
.fav-chrome-body {
  height: 46px;
  border-radius: 0;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding-inline: 14px;
  font-size: 12px;
  color: rgba(15, 23, 42, 0.6);
}
.fav-chrome[data-dark="true"] .fav-chrome-body { background: #1d2026; color: rgba(255, 255, 255, 0.55); }
/* —— 三档图标面板 —— */
.fav-panels {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
  width: min(520px, 100%);
}
.fav-card {
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  background: #fff;
  padding: 10px 12px 12px;
  width: 148px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.fav-card h4 { margin: 0; font-size: 11px; font-weight: 650; color: rgba(15, 23, 42, 0.7); text-align: center; }
.fav-card p { margin: 0; font-size: 10.5px; line-height: 1.55; color: rgba(15, 23, 42, 0.5); text-align: center; }
/* apple-touch:180 画布,显示 96px(×0.533);内边距随 --fav-padding 同比缩放 */
.fav-touch {
  position: relative;
  width: 96px;
  height: 96px;
  border-radius: 18px;
  background: var(--fav-accent, #0f0f0f);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.fav-touch-pad {
  position: absolute;
  inset: calc(var(--fav-padding, 20px) * 96 / 180);
  border: 1px dashed rgba(255, 255, 255, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
}
.fav-touch svg { width: 44%; height: 44%; }
/* maskable:512 画布,显示 96px;安全圆 409/512 ≈ 0.8 */
.fav-mask-wrap { position: relative; width: 96px; height: 96px; }
.fav-mask {
  width: 100%;
  height: 100%;
  border-radius: 14px;
  background: color-mix(in srgb, var(--fav-accent, #0f0f0f) 14%, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
}
.fav-mask svg { width: 62%; height: 62%; }
.fav-safe {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: calc(96px * 409 / 512);
  height: calc(96px * 409 / 512);
  border: 1.5px dashed rgba(37, 99, 235, 0.7);
  border-radius: 50%;
  pointer-events: none;
}
.fav-safe[data-off="true"] { display: none; }
.fav-circle {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--fav-accent, #0f0f0f) 14%, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.fav-circle svg { width: 62%; height: 62%; }
.fav-warn {
  width: min(520px, 100%);
  margin: 0;
  font-size: 11px;
  line-height: 1.65;
  color: #c2410c;
  min-height: 0;
}
.fav-warn[data-empty="true"] { visibility: hidden; }
/* —— <head> 接线清单 —— */
.fav-code {
  width: min(520px, 100%);
  margin: 0;
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  line-height: 1.7;
  background: rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 10px;
  padding: 10px 12px;
  white-space: pre-wrap;
  color: rgba(15, 23, 42, 0.8);
}
.fav-notes { margin: 0; padding-inline: 18px; font-size: 11px; line-height: 1.7; color: rgba(15, 23, 42, 0.6); width: min(520px, 100%); }
@media (prefers-reduced-motion: reduce) {
  .fav-chrome { transition: none; }
}
`;

/** 品牌 glyph(闪电形);fill 由 scheme 决定:浅 #0f0f0f(accent)↔ 深 #f0f0f0(12 §12 片段定值) */
function Glyph({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M36 8 L14 36 L30 36 L26 56 L50 26 L33 26 Z" fill={fill} />
    </svg>
  );
}

const HEAD_CODE = `<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">

<!-- icon.svg:内嵌 <style>,系统深色模式自动反色 -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <style>@media (prefers-color-scheme: dark){
    .g{fill:#f0f0f0}
  }</style>
  <path class="g" fill="#0f0f0f" d="…"/>
</svg>`;

/**
 * Favicon 体系演示:
 * - scheme(JS)模拟系统 prefers-color-scheme:icon.svg 字形 #0f0f0f ↔ #f0f0f0(官方片段定值),
 *   模拟浏览器 chrome 同步翻暗;staging 标签恒为反色(Evil Martians 彩蛋);
 * - padding(CSS 变量)在 apple-touch 面板上可视化 20px 内边距建议;
 * - maskable(JS)叠加 409×409 安全圆(512 画布)并给出圆形裁切预览。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [scheme, setScheme] = useState(() => store.get("scheme") as Scheme);
  const [maskable, setMaskable] = useState(() => store.get("maskable") as Maskable);

  useEffect(
    () =>
      store.subscribe(() => {
        setScheme(store.get("scheme") as Scheme);
        setMaskable(store.get("maskable") as Maskable);
      }),
    [store],
  );

  const dark = scheme === "dark";
  const glyphFill = dark ? "#f0f0f0" : (store.get("accent") as string);
  const padding = store.get("padding") as number;
  const padWarn = padding < 12;
  const safeOn = maskable === "show";

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="fav-scene">
        <div className="fav-chrome" data-dark={dark}>
          <div className="fav-tabs">
            <div className="fav-tab" data-active="true">
              <Glyph fill={glyphFill} />
              本站 icon.svg(16px)
            </div>
            <div className="fav-tab">
              <span className="fav-ico" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#64748b", borderRadius: 3 }}>
                <Glyph fill="#ffffff" />
              </span>
              RSS 回落 favicon.ico
            </div>
            <div className="fav-tab">
              {/* staging 反色:浅色模式给暗 tile + 亮 glyph,与生产恒相反 */}
              <span className="fav-ico" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: dark ? "#0f0f0f" : "#f4f4f5", borderRadius: 3 }}>
                <Glyph fill={dark ? "#f0f0f0" : "#0f0f0f"} />
              </span>
              staging(反色)
            </div>
          </div>
          <div className="fav-chrome-body">favicon 随系统深色模式自动换色 — 演示以 scheme 开关模拟 OS 偏好</div>
        </div>
        <div className="fav-panels">
          <div className="fav-card">
            <h4>apple-touch-icon · 180×180</h4>
            <div className="fav-touch">
              <Glyph fill={dark ? "#f0f0f0" : "#ffffff"} />
              <div className="fav-touch-pad" />
            </div>
            <p>内边距 {padding}px(建议 20px)+ 品牌背景色;虚线框内是遮罩安全范围</p>
          </div>
          <div className="fav-card">
            <h4>icon-mask.png · 512×512</h4>
            <div className="fav-mask-wrap">
              <div className="fav-mask">
                <Glyph fill={dark ? "#f0f0f0" : glyphFill} />
              </div>
              <div className="fav-safe" data-off={!safeOn} />
            </div>
            <p>安全区 409×409 中央圆(比值 ≈0.8);glyph 必须整体落在圆内</p>
          </div>
          <div className="fav-card">
            <h4>启动器圆形裁切预览</h4>
            <div className="fav-circle">
              <Glyph fill={dark ? "#f0f0f0" : glyphFill} />
            </div>
            <p>{safeOn ? "已标 purpose:\"maskable\":按安全区设计,裁切不破相" : "未标 maskable:各启动器遮罩盲裁,四角内容随时被切"}</p>
          </div>
        </div>
        <p className="fav-warn" data-empty={!padWarn && safeOn}>
          {padWarn ? `内边距 ${padding}px < 12px:系统遮罩一旦更激进的圆角就会裁进 glyph(Evil Martians 建议 ≈20px)` : ""}
          {!padWarn && !safeOn ? "未显示安全区 = 「没标 purpose:\"maskable\"」的裸图状态" : ""}
        </p>
        <pre className="fav-code">{HEAD_CODE}</pre>
        <ul className="fav-notes">
          <li>favicon.ico 固定 32×32、放根目录:RSS 阅读器只认 /favicon.ico 路径;sizes="32x32" 顺带修 Chrome 忽略 SVG 的 bug;</li>
          <li>manifest.webmanifest 仅 PWA 需要;icon-192.png 给常规场景,512×512 那张声明 purpose:"maskable";</li>
          <li>rel="shortcut icon" 从来不是有效写法,现代浏览器只认 rel="icon"。</li>
        </ul>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
