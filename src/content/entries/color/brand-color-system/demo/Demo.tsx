import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import { oklchToSrgb, contrastRatio } from "@/lib/color";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 0–1 域 gamma sRGB 三元组(本文件局部类型;函数从 @/lib/color 取,类型不从其导入) */
type Rgb01 = [number, number, number];

/* ---------- 换算与判定(函数与站点共享入口 @/lib/color 同一套标准数学:
   Oklab 矩阵 + CSS Color 4 sRGB transfer + WCAG 2.1 亮度/对比度。
   本会话离线 roundtrip 验证:oklch(1 0 0)→白;oklch(0.628 0.2577 29.23)→#FF0000;
   #6750A4 白字 6.44:1、#D0BCFF/#381E72 7.71:1(与既有条目记载一致)。---------- */

const TONES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100]; // 13 档(material-color-utilities 通行实现;调研 06§5 只记载「13 档」计数,未逐值列出)

const hex = (rgb: Rgb01) =>
  "#" + rgb.map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("").toUpperCase();

/** tone 色的 sRGB:浏览器对越域 oklch 按现状裁剪(调研 06§2),这里裁剪后参与对比度计算,与渲染结果一致 */
const toneColor = (tone: number, c: number, h: number): Rgb01 => oklchToSrgb(tone / 100, c, h).rgb;

const hexToRgb01 = (h: string): Rgb01 => {
  const m = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(m.slice(i, i + 2), 16) / 255) as Rgb01;
};

const css = `
.bc-scene { position: absolute; inset: 0; display: flex; gap: 14px; padding: 16px; overflow: auto; }
.bc-main { flex: 1.4; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
.bc-brand {
  display: flex; align-items: center; gap: 12px; padding: 12px 14px;
  border-radius: 14px; border: 1px solid rgba(0, 0, 0, 0.1); font-size: 12px; background: #fff;
}
.bc-brandSwatch {
  width: 46px; height: 46px; border-radius: 12px; flex: none;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
  animation: bc-in 0.4s ease-out both;
}
.bc-brandMeta { display: flex; flex-direction: column; gap: 3px; font-variant-numeric: tabular-nums; }
.bc-brandMeta b { font-size: 13.5px; }
.bc-brandMeta span { color: #5b6472; font-size: 11.5px; }
.bc-rampLabel { font-size: 11.5px; color: #5b6472; }
.bc-ramp { display: grid; grid-template-columns: repeat(13, 1fr); gap: 3px; }
.bc-tone { position: relative; border-radius: 7px; aspect-ratio: 0.82; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 3px; font-size: 9px; font-weight: 600; font-variant-numeric: tabular-nums; animation: bc-in 0.4s ease-out both; }
.bc-tone[data-dark="true"] { color: rgba(255, 255, 255, 0.85); }
.bc-tone[data-dark="false"] { color: rgba(0, 0, 0, 0.72); }
.bc-tone[data-role]::after {
  content: attr(data-role);
  position: absolute; left: 50%; top: -16px; translate: -50% 0;
  white-space: nowrap; font-size: 9.5px; font-weight: 650; color: #0b1220;
  background: #ffffff; border: 1px solid rgba(0, 0, 0, 0.18); border-radius: 999px; padding: 1px 7px;
  z-index: 1;
}
.bc-note { font-size: 11.5px; color: #5b6472; line-height: 1.55; margin: 0; }
.bc-panel { flex: 1; min-width: 250px; display: flex; flex-direction: column; gap: 8px; font-size: 12px; }
.bc-row {
  display: flex; align-items: center; gap: 9px; padding: 8px 10px;
  border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 11px; background: #fff;
  animation: bc-in 0.4s ease-out both;
}
.bc-rowSwatch { width: 34px; height: 34px; border-radius: 9px; flex: none; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1); }
.bc-rowMain { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.bc-rowMain b { font-size: 12px; }
.bc-rowMain span { font-size: 10.5px; color: #5b6472; font-variant-numeric: tabular-nums; }
.bc-badges { display: flex; flex-direction: column; gap: 3px; align-items: flex-end; }
.bc-badge { font-size: 10px; font-weight: 650; border-radius: 999px; padding: 2px 8px; font-variant-numeric: tabular-nums; }
.bc-badge[data-ok="true"] { background: oklch(0.86 0.09 150); color: oklch(0.35 0.09 150); }
.bc-badge[data-ok="false"] { background: oklch(0.88 0.07 25); color: oklch(0.42 0.15 25); }
@keyframes bc-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (max-width: 560px) {
  .bc-scene { flex-direction: column; }
  .bc-tone[data-role]::after { font-size: 8px; padding: 1px 5px; top: -14px; }
}
@media (prefers-reduced-motion: reduce) {
  .bc-brandSwatch, .bc-tone, .bc-row { animation: none; }
}
`;

/** 一行验证:文字色 on 背景色,报 WCAG 比值 + 正文 AA / 大字与UI 两档判定(不四舍五入) */
function AuditRow(props: {
  title: string;
  sub: string;
  bgHex: string;
  fgHex: string;
  fgLabel: string;
  delay: number;
}) {
  // 复核对象是「实际显示的颜色」:越域裁剪后的 hex 直接参与计算
  const ratio = contrastRatio(hexToRgb01(props.fgHex), hexToRgb01(props.bgHex));
  const aa = ratio >= 4.5;
  const largeUi = ratio >= 3;
  return (
    <div className="bc-row" style={{ animationDelay: `${props.delay}ms` }}>
      <span className="bc-rowSwatch" style={{ backgroundColor: props.bgHex, color: props.fgHex }}>
        Aa
      </span>
      <span className="bc-rowMain">
        <b>{props.title}</b>
        <span>
          {props.sub} · {props.fgLabel} on {props.bgHex} = {ratio.toFixed(2)}:1
        </span>
      </span>
      <span className="bc-badges">
        <span className="bc-badge" data-ok={aa}>
          正文 AA 4.5 {aa ? "✓" : "✗"}
        </span>
        <span className="bc-badge" data-ok={largeUi}>
          大字/UI 3 {largeUi ? "✓" : "✗"}
        </span>
      </span>
    </div>
  );
}

/**
 * 品牌色系统演示:品牌色 → 13 档 tone 阶 → 语义角色 → WCAG 验证管线。
 * hue/lightness/chroma/theme 为 JS 型参数(订阅 store 后 JS 侧重算 tone 阶与对比度;
 * 色块用内联 oklch() 渲染,浏览器按现状裁剪越域色,复核取同一裁剪值)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const read = () => ({
    hue: store.get("hue") as number,
    lightness: store.get("lightness") as number,
    chroma: store.get("chroma") as number,
    theme: store.get("theme") as string,
  });
  const [p, setP] = useState(read);

  useEffect(
    () =>
      store.subscribe(() => {
        setP(read());
      }),
    [store],
  );

  const { hue, lightness, chroma, theme } = p;
  const brand = oklchToSrgb(lightness, chroma, hue);
  const brandHex = hex(brand.rgb);

  // accent:亮色语境 = 品牌 tone 本身;暗色语境 = 同色相 tone 80(M3:dark primary ≈ tone 80,调研 06§7)
  const accentTone = theme === "dark" ? 80 : Math.round(lightness * 100);
  const accentHex = hex(toneColor(accentTone, chroma, hue));
  // on-accent:亮侧白字;暗侧取同色相低 tone 深字(M3 基线 #D0BCFF/#381E72 同构,调研 06§7)
  const onAccentHex = theme === "dark" ? hex(toneColor(20, chroma, hue)) : "#FFFFFF";
  // container:同色相 tone 90;container 上的字取同色相 tone 30(两者为演示角色位)
  const containerHex = hex(toneColor(90, chroma, hue));
  const onContainerHex = hex(toneColor(30, chroma, hue));

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="bc-scene">
        <div className="bc-main">
          <div className="bc-brand">
            <span
              className="bc-brandSwatch"
              style={{ backgroundColor: brand.clipped ? brandHex : `oklch(${lightness} ${chroma} ${hue})` }}
            />
            <span className="bc-brandMeta">
              <b>
                品牌种子 Brand seed · oklch({lightness.toFixed(2)} {chroma.toFixed(2)} {hue}°)
              </b>
              <span>
                sRGB ≈ {brandHex}
                {brand.clipped ? " · 越 sRGB 域,按浏览器现状裁剪(调研 06§2)" : ""}
                {" · "}tone 读数 ≈ {Math.round(lightness * 100)}
              </span>
            </span>
          </div>
          <span className="bc-rampLabel">
            Tone 阶(13 档,固定 H/C 只变 tone;角标为语义角色位)Tone ramp (13 steps, fixed H/C)
          </span>
          <div className="bc-ramp" role="img" aria-label={`品牌色 ${hue}° 色相的 13 档 tone 阶`}>
            {TONES.map((t, i) => {
              const lin = toneColor(t, chroma, hue);
              const darkText = contrastRatio(lin, [0, 0, 0]) >= contrastRatio(lin, [1, 1, 1]);
              const role =
                theme === "dark" && t === 80
                  ? "accent·dark"
                  : theme === "light" && Math.abs(t - lightness * 100) < 5
                    ? "accent"
                    : t === 90
                      ? "container"
                      : undefined;
              return (
                <span
                  key={t}
                  className="bc-tone"
                  data-dark={!darkText}
                  data-role={role}
                  title={`tone ${t}`}
                  style={{
                    backgroundColor: `oklch(${t / 100} ${chroma} ${hue})`,
                    animationDelay: `${i * 18}ms`,
                  }}
                >
                  {t}
                </span>
              );
            })}
          </div>
          <p className="bc-note">
            tone 数值直代 oklch L(tone=CIE L*,近似处理);13 档计数为官方(调研 06§5),逐档取值为
            material-color-utilities 通行实现。角标 tone 80 = M3 暗色 accent 档位(调研 06§7)。
            Tone numbers stand in for oklch L (tone = CIE L*, an approximation); 13 is the official count,
            the per-step values follow the common material-color-utilities layout.
          </p>
        </div>
        <div className="bc-panel">
          <AuditRow
            title={theme === "dark" ? "accent = tone 80 + 深字 tone 20" : "accent = 品牌 tone + 白字"}
            sub={theme === "dark" ? "暗色语境(机制同 M3 基线)" : "亮色语境 solid 按钮"}
            bgHex={accentHex}
            fgHex={onAccentHex}
            fgLabel={theme === "dark" ? "tone 20" : "#FFFFFF"}
            delay={0}
          />
          <AuditRow
            title="container = tone 90 + 深字 tone 30"
            sub="柔和容器(演示角色位)"
            bgHex={containerHex}
            fgHex={onContainerHex}
            fgLabel="tone 30"
            delay={60}
          />
          <AuditRow
            title="品牌色本尊 + 白字"
            sub={`sRGB ${brandHex}${brand.clipped ? "(裁剪值)" : ""}`}
            bgHex={brandHex}
            fgHex="#FFFFFF"
            fgLabel="#FFFFFF"
            delay={120}
          />
          <p className="bc-note">
            判定用未舍入原值(WCAG,调研 06§17):白字只有 3.62:1 时过 3:1 大字/UI 档、不过正文 AA——
            这正是管线要逐组合复核的原因。Radix 以 APCA Lc60/90 定文本步(调研 06§8),本 demo 只跑 WCAG。
          </p>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
