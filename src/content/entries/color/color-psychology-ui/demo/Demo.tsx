import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/* ---------- WCAG 对比度计算(公式出处 WCAG 2.1,调研 06§17;
   oklch→sRGB 转换常数为 CSS Color 4 官方矩阵,已离线 roundtrip 验证) ---------- */

const cbrt = Math.cbrt;

function oklchToSrgb8(L: number, C: number, H: number): [number, number, number] {
  const h = (H * Math.PI) / 180;
  const lab = [L, C * Math.cos(h), C * Math.sin(h)];
  const l_ = lab[0] + 0.3963377774 * lab[1] + 0.2158037573 * lab[2];
  const m_ = lab[0] - 0.1055613458 * lab[1] - 0.0638541728 * lab[2];
  const s_ = lab[0] - 0.0894841775 * lab[1] - 1.291485548 * lab[2];
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  const enc = lin.map((v) => {
    const a = Math.max(0, Math.min(1, v));
    return a <= 0.0031308 ? 12.92 * a : 1.055 * cbrt(a) - 0.055;
  });
  return [Math.round(enc[0] * 255), Math.round(enc[1] * 255), Math.round(enc[2] * 255)];
}

function wcagContrast(fg8: [number, number, number], bg8: [number, number, number]): number {
  const lum = ([r, g, b]: [number, number, number]) => {
    const f = (c: number) => {
      const cc = c / 255;
      return cc <= 0.04045 ? cc / 12.92 : ((cc + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const l1 = lum(fg8), l2 = lum(bg8);
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

/* ---------- 暖冷带判定(色相映射口径:红≈20/黄≈90/绿≈140/蓝≈220/紫≈320,Evil Martians) ---------- */

function bandOf(hue: number): "warm" | "cool" {
  return hue <= 90 ? "warm" : "cool"; // 暖:红≈20°→黄≈90°;冷:绿≈140°/蓝≈220°/紫≈320°(Evil Martians 映射)
}

/* ---------- demo ---------- */

const css = `
.psy-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 16px; }
.psy-mood {
  flex: 1; min-height: 0; border-radius: 14px; padding: 16px 20px;
  display: flex; flex-direction: column; justify-content: center; gap: 8px;
  border: 1px solid rgb(0 0 0 / 0.12); box-shadow: 0 2px 10px rgb(0 0 0 / 0.14);
  transition: background-color 0.25s ease, color 0.25s ease;
}
.psy-mood h3 { margin: 0; font-size: 17px; font-weight: 700; }
.psy-mood p { margin: 0; font-size: 12.5px; line-height: 1.6; opacity: 0.85; }
.psy-cta {
  width: fit-content; border: 0; border-radius: 999px; padding: 7px 16px;
  font-size: 12.5px; font-weight: 600; cursor: pointer;
  background: rgb(12 14 18 / 0.86); color: inherit;
}
.psy-panel {
  flex: 0 0 auto; display: flex; flex-direction: column; gap: 6px;
  font-size: 12px; line-height: 1.55;
}
.psy-row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.psy-chip { padding: 2px 9px; border-radius: 999px; border: 1px solid rgb(128 138 160 / 0.35); background: rgb(255 255 255 / 0.55); font-variant-numeric: tabular-nums; }
.psy-pass { color: oklch(0.52 0.14 150); font-weight: 600; }
.psy-fail { color: oklch(0.55 0.2 25); font-weight: 600; }
.psy-edit {
  font-size: 11px; padding: 7px 10px; border-radius: 8px;
  border: 1px dashed rgb(128 138 160 / 0.55); opacity: 0.85;
}
.psy-edit strong { font-weight: 650; }
@media (max-width: 480px) {
  .psy-scene { padding: 10px; }
  .psy-mood { padding: 12px 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .psy-mood { transition: none; }
}
`;

const BAND_COPY: Record<"warm" | "cool", { zh: string; en: string }> = {
  warm: {
    zh: "暖色带(红≈20°/黄≈90°)——编辑性说法:常关联紧迫、食欲、行动号召(未证实;可证实的只有「强调色承担 CTA 焦点」的职责分工,见 60-30-10)。",
    en: "Warm band (red≈20°/yellow≈90°) — editorial lore: associated with urgency, appetite, calls to action (unverified; the only verifiable claim is the accent owning 'CTA focus' in 60-30-10).",
  },
  cool: {
    zh: "冷色带(绿≈140°/蓝≈220°/紫≈320°)——编辑性说法:常关联信任、专业、冷静(未证实;金融科技偏爱蓝是业界观察,非实证结论)。",
    en: "Cool band (green≈140°/blue≈220°/purple≈320°) — editorial lore: associated with trust, professionalism, calm (unverified; fintech's blue preference is an industry observation, not an evidence-backed conclusion).",
  },
};

/**
 * 色彩心理演示:明度/色度/色相三滑杆(CSS 变量型)+ 文字色(JS 型)。
 * 卡面颜色由 --psy-light/--psy-chroma/--psy-hue 驱动;
 * 对比度按 WCAG 2.1 公式实时计算(黑/白两枚);
 * 暖冷带按色相自动判定,注释文案全部标注「编辑性,未证实」。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({
    textColor: store.get("textColor") as string,
  });
  const [textColor, setTextColor] = useState(readParams().textColor);

  useEffect(
    () =>
      store.subscribe(() => {
        setTextColor(readParams().textColor);
      }),
    [store],
  );

  const L = store.get("lightness") as number;
  const C = store.get("chroma") as number;
  const H = store.get("hue") as number;
  const faceCss = `oklch(${L} ${C} ${H})`;
  const face8 = oklchToSrgb8(L, C, H);
  const blackRatio = wcagContrast([0, 0, 0], face8);
  const whiteRatio = wcagContrast([255, 255, 255], face8);
  const liveRatio = textColor === "white" ? whiteRatio : blackRatio;
  const band = bandOf(H);

  const verdict = (r: number) => {
    const aa = r >= 4.5;
    const aaa = r >= 7;
    return (
      <span className={aa ? "psy-pass" : "psy-fail"}>
        {r.toFixed(2)}:1 · {aaa ? "AAA" : aa ? "AA" : "不达标 fail"}
      </span>
    );
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="psy-scene">
        <div
          className="psy-mood"
          style={{ backgroundColor: faceCss, color: textColor === "white" ? "#fff" : "#000" }}
        >
          <h3>情绪探针 Mood probe</h3>
          <p>
            对比度是硬约束,情绪是软叙事。Contrast is the hard constraint; mood is the soft narrative.
          </p>
          <button type="button" className="psy-cta">行动号召 CTA</button>
        </div>
        <div className="psy-panel">
          <div className="psy-row">
            <span className="psy-chip">L {L.toFixed(2)} · C {C.toFixed(2)} · H {H}°</span>
            <span className="psy-chip">{band === "warm" ? "暖 warm" : "冷 cool"}</span>
            <span className="psy-chip">黑字 black {verdict(blackRatio)}</span>
            <span className="psy-chip">白字 white {verdict(whiteRatio)}</span>
            <span className="psy-chip">当前 live {verdict(liveRatio)}</span>
          </div>
          <div className="psy-edit">
            <strong>编辑性总结,未证实 / Editorial, unverified:</strong>
            {BAND_COPY[band].zh} — {BAND_COPY[band].en}
          </div>
          <div className="psy-row">
            <span className="psy-chip psy-pass">
              可证实 L≥0.87 配黑字对比度都好(Evil Martians)— 当前 L {L.toFixed(2)}{" "}
              {L >= 0.87 ? "✓ 规则成立" : "✗ 已离开规则区"}
            </span>
          </div>
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
