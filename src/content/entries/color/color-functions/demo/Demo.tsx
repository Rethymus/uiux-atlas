import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Space = "oklab" | "srgb" | "oklch" | "srgb-linear";

const css = `
.cf-scene { position: absolute; inset: 0; overflow: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; font-size: 12px; }
.cf-sec {
  border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 12px; background: #fff;
  padding: 11px 13px; display: flex; flex-direction: column; gap: 8px;
  animation: cf-in 0.4s ease-out both;
}
.cf-sec b.cf-title { font-size: 12.5px; }
.cf-sec p { margin: 0; font-size: 11px; color: #5b6472; line-height: 1.5; }
.cf-strip { display: flex; flex-wrap: wrap; gap: 8px; }
.cf-chip {
  min-width: 96px; flex: 1; border-radius: 10px; padding: 9px 10px;
  display: flex; flex-direction: column; gap: 2px; font-size: 10.5px; line-height: 1.35;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}
.cf-chip small { opacity: 0.75; font-variant-numeric: tabular-nums; }
/* ── 派生条:每条先写静态兜底,再在 @supports 内覆写(补研 12§8 回退纪律)── */
.cf-base    { background: #0088F2; color: #ffffff; }
.cf-hover   { background: #0072CC; color: #ffffff; }
.cf-active  { background: #005FA8; color: #ffffff; }
.cf-soft    { background: #e5f2ff; color: #0b3a63; }
.cf-border  { background: #ffffff; color: #0088F2; border: 2px solid rgba(0, 136, 242, 0.4); }
.cf-onbrand { background: #deeeff; color: #0b3a63; }
@supports (color: color-mix(in oklab, red, blue)) {
  .cf-base   { background: var(--cf-brand); }
  .cf-hover  { background: color-mix(in oklab, var(--cf-brand), black calc(var(--cf-hover-mix))); }
  .cf-active { background: color-mix(in oklab, var(--cf-brand), black calc(var(--cf-hover-mix) * 2)); }
  .cf-soft   { background: color-mix(in oklab, var(--cf-brand) calc(var(--cf-soft-bg)), transparent); color: #0b3a63; }
  .cf-border { border: 2px solid color-mix(in oklab, var(--cf-brand) calc(var(--cf-border-mix)), transparent); }
  .cf-onbrand{ background: color-mix(in oklab, var(--cf-brand), white 85%); color: #0b3a63; }
}
/* ── 空间实验室:data-space 四档显式规则(var 直接进插值空间位置的兼容性不作假设)── */
.cf-labRow { display: flex; flex-wrap: wrap; gap: 8px; }
.cf-swatch { flex: 1; min-width: 108px; border-radius: 10px; padding: 24px 10px 8px; text-align: center; font-size: 10.5px; color: #1c1b1f; box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08); position: relative; }
.cf-swatch small { display: block; font-size: 9.5px; opacity: 0.75; }
.cf-mixCur  { background: #93a6b5; }
.cf-mixSrgb { background: color-mix(in srgb, #0088F2, oklch(0.72 0.19 140) 50%); }
.cf-mixLong { background: #8a4bd0; }
@supports (color: color-mix(in oklab, red, blue)) {
  .cf-mixCur  { background: color-mix(in oklab, var(--cf-brand), oklch(0.72 0.19 140) 50%); }
  .cf-scene[data-space="srgb"]        .cf-mixCur { background: color-mix(in srgb, var(--cf-brand), oklch(0.72 0.19 140) 50%); }
  .cf-scene[data-space="oklch"]       .cf-mixCur { background: color-mix(in oklch, var(--cf-brand), oklch(0.72 0.19 140) 50%); }
  .cf-scene[data-space="srgb-linear"] .cf-mixCur { background: color-mix(in srgb-linear, var(--cf-brand), oklch(0.72 0.19 140) 50%); }
  .cf-mixLong { background: color-mix(in oklch longer hue, var(--cf-brand), oklch(0.72 0.19 140) 50%); }
}
/* ── 百分比归一化(补研 12§11 三规则)── */
.cf-normRow { display: flex; flex-wrap: wrap; gap: 8px; }
.cf-norm {
  flex: 1; min-width: 96px; border-radius: 10px; padding: 20px 10px 8px; text-align: center;
  font-size: 10.5px; color: #1c1b1f; box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
  background:
    repeating-conic-gradient(rgba(0, 0, 0, 0.08) 0% 25%, transparent 0% 50%) 0 0 / 14px 14px,
    #ffffff;
}
.cf-normA { background: #ffffff; }
.cf-normB { background: #ffffff; }
.cf-normC { background: #ffffff; }
@supports (color: color-mix(in oklab, red, blue)) {
  .cf-normA { background: color-mix(in oklab, var(--cf-brand), white); }
  .cf-normB { background: color-mix(in oklab, var(--cf-brand) 25%, white); }
  .cf-normC { background:
    repeating-conic-gradient(rgba(0, 0, 0, 0.08) 0% 25%, transparent 0% 50%) 0 0 / 14px 14px,
    color-mix(in oklab, var(--cf-brand) 30%, white 30%); }
}
/* ── 相对颜色行:整体 @supports 探测(MDN 原文探针,补研 12§8)── */
.cf-relWrap { display: none; }
.cf-relBtn {
  border: 0; border-radius: 999px; padding: 8px 18px; font-size: 12.5px; font-weight: 600; cursor: pointer;
  background: #0088F2; color: #fff;
}
.cf-relBtn:hover { background: #0072CC; }
.cf-alpha {
  border-radius: 10px; padding: 14px 12px; font-size: 11px; color: #0b3a63;
  background: repeating-conic-gradient(rgba(0, 0, 0, 0.08) 0% 25%, transparent 0% 50%) 0 0 / 14px 14px, #ffffff;
}
@supports (color: rgb(from red r g calc(b + 30%))) {
  .cf-relWrap { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
  .cf-relBtn { background: var(--cf-brand); }
  .cf-relBtn:hover { background: rgb(from var(--cf-brand) calc(r * 0.85) calc(g * 0.85) calc(b * 0.85)); }
  .cf-alpha { background: repeating-conic-gradient(rgba(0, 0, 0, 0.08) 0% 25%, transparent 0% 50%) 0 0 / 14px 14px, rgb(from var(--cf-brand) r g b / calc(alpha - 0.25)); }
}
.cf-relOff {
  display: flex; padding: 9px 12px; border-radius: 10px; background: #fff4e5; color: #7a4b00; font-size: 11px;
}
@supports (color: rgb(from red r g calc(b + 30%))) {
  .cf-relOff { display: none; }
}
.cf-chips { display: flex; gap: 2px; padding: 3px; border-radius: 999px; background: #e6e9ee; align-self: flex-start; }
.cf-chips button {
  border: 0; border-radius: 999px; padding: 4px 12px; font-size: 11.5px; cursor: pointer;
  color: #374151; background: transparent;
}
.cf-chips button[aria-pressed="true"] { background: #fff; font-weight: 650; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.14); }
.cf-note { font-size: 11px; color: #5b6472; line-height: 1.5; margin: 0; }
@keyframes cf-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .cf-sec { animation: none; }
  .cf-relBtn { transition: none; }
}
`;

/**
 * 颜色函数族演示:brand/hoverMix/softBg/borderMix 为 CSS 变量型参数(DemoStage 注入,
 * CSS 直接消费);space 为 JS 型参数(订阅后写 data-space,CSS 四档显式规则)。
 * 派生色对比度结论见条目 a11y 字段(本会话实测:on-brand 对品牌底 3.06:1,不过正文 AA)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [space, setSpace] = useState(() => store.get("space") as Space);

  useEffect(
    () =>
      store.subscribe(() => {
        setSpace(store.get("space") as Space);
      }),
    [store],
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="cf-scene" data-space={space}>
        <div className="cf-sec" style={{ animationDelay: "0ms" }}>
          <b className="cf-title">派生条:一个 --brand 变量 → 全套交互态 Derived strip: one --brand → all states</b>
          <div className="cf-strip">
            <span className="cf-chip cf-base">base<small>var(--cf-brand)</small></span>
            <span className="cf-chip cf-hover">hover<small>mix black {`calc(var(--cf-hover-mix))`}</small></span>
            <span className="cf-chip cf-active">active<small>black ×2(24%)</small></span>
            <span className="cf-chip cf-soft">soft bg<small>mix transparent</small></span>
            <span className="cf-chip cf-border">border<small>40% 掺 transparent</small></span>
            <span className="cf-chip cf-onbrand">on-brand<small>white 85%</small></span>
          </div>
          <p>
            配方取自补研 12§11 片段;on-brand 文字对品牌底本会话实测 3.06:1——过 UI/大字档、不过正文 AA,
            派生色必须复核(阈值见 WCAG,调研 06§17)。
          </p>
        </div>

        <div className="cf-sec" style={{ animationDelay: "60ms" }}>
          <b className="cf-title">空间实验室 Space lab:同一条 mix(brand 50%, 绿 oklch(0.72 0.19 140))</b>
          <div className="cf-chips" role="group" aria-label="插值空间 Interpolation space">
            {(["oklab", "srgb", "oklch", "srgb-linear"] as Space[]).map((s) => (
              <button key={s} type="button" aria-pressed={space === s} onClick={() => store.set("space", s)}>
                {s}
              </button>
            ))}
          </div>
          <div className="cf-labRow">
            <span className="cf-swatch cf-mixCur">
              in {space}
              <small>当前空间 current space</small>
            </span>
            <span className="cf-swatch cf-mixSrgb">
              in srgb(固定)
              <small>对照:默认空间易发灰 defaults gray</small>
            </span>
            <span className="cf-swatch cf-mixLong">
              in oklch longer hue
              <small>色相插值策略 hue strategy(调研 06§4)</small>
            </span>
          </div>
          <p>
            选型指引(MDN,补研 12§11):模拟色光 → xyz/srgb-linear;感知均匀 → oklab/lab;避免变灰 → oklch/lch;
            匹配 sRGB 设备 → srgb。不写 in 默认 sRGB 插值。
          </p>
        </div>

        <div className="cf-sec" style={{ animationDelay: "120ms" }}>
          <b className="cf-title">百分比归一化 Percentage normalization(补研 12§11)</b>
          <div className="cf-normRow">
            <span className="cf-norm cf-normA">双省 → 各 50%<small>mix(brand, white)</small></span>
            <span className="cf-norm cf-normB">单省 → 补足 100%<small>mix(brand 25%, white) = 25/75</small></span>
            <span className="cf-norm cf-normC">和 &lt;100% → alpha 乘数<small>mix(brand 30%, white 30%) = 60% 不透明</small></span>
          </div>
          <p>
            第三格垫了棋盘格透出半透明;p1+p2&lt;100% 等效向 transparent 混入,两者 0% 则整条无效。
            与 transparent 混合只能降不透明度,提升/运算 alpha 用相对颜色。
          </p>
        </div>

        <div className="cf-sec" style={{ animationDelay: "180ms" }}>
          <b className="cf-title">相对颜色 Relative color:rgb(from …) 通道运算</b>
          <div className="cf-relWrap">
            <button type="button" className="cf-relBtn">
              hover 我:hover = rgb(from brand calc(r*.85) …)
            </button>
            <span className="cf-alpha">
              alpha 运算:rgb(from var(--cf-brand) r g b / calc(alpha - 0.25))——棋盘格透出降 alpha 结果
            </span>
          </div>
          <div className="cf-relOff">当前浏览器不支持相对颜色语法,已隐藏演示行(@supports 探测,MDN 原文探针)。</div>
          <p>
            rgb 通道在 calc 内解析为 0–255 数字:calc(g + 25) 合法、calc(g + 25%) 无效(补研 12§11);
            Safari 16.4 旧语法要求通道带百分比,用 @supports 分支(补研 12§8)。Evil Martians 的 oklch
            calc(l + 0.1) hover 工作流同思路(调研 06§2)。
          </p>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
