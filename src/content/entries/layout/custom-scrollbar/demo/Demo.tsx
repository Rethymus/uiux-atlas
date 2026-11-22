import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.cs-scene {
  position: absolute;
  inset: 0;
  display: flex;
  gap: 14px;
  padding: 16px;
}
.cs-scroll {
  flex: 1;
  min-width: 0;
  overflow: auto;
  scrollbar-gutter: var(--sb-gutter, auto);
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 4%, transparent);
  padding: 6px 0;
  animation: cs-in 0.4s ease-out both;
}
.cs-scroll:focus-visible { outline: 2px solid oklch(0.62 0.15 250); outline-offset: 2px; }
/* standard 档:标准属性(css-scrollbars)。scrollbar-width ≠ auto 时 webkit 伪元素被浏览器忽略(互操作事实) */
.cs-scene[data-engine="standard"] .cs-scroll {
  scrollbar-width: var(--sb-width, thin);
  scrollbar-color: var(--sb-thumb, #6a5cff) var(--sb-track, transparent);
}
/* webkit 档:不写标准属性(computed 保持 auto),激活 ::-webkit-scrollbar 家族 */
.cs-scene[data-engine="webkit"] .cs-scroll::-webkit-scrollbar { width: 12px; height: 12px; }
.cs-scene[data-engine="webkit"] .cs-scroll::-webkit-scrollbar-thumb {
  background: var(--sb-thumb, #6a5cff);
  border-radius: 6px;
  border: 2px solid transparent;
  background-clip: content-box;
}
.cs-scene[data-engine="webkit"] .cs-scroll::-webkit-scrollbar-track { background: var(--sb-track, transparent); }
.cs-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 7px 14px;
  font-size: 13px;
  line-height: 1.5;
}
.cs-row b { font-variant-numeric: tabular-nums; opacity: 0.45; font-weight: 500; min-width: 2.2em; }
.cs-row span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cs-side { flex: none; width: 240px; display: flex; flex-direction: column; gap: 10px; }
.cs-readout {
  font-size: 12px;
  line-height: 1.7;
  font-variant-numeric: tabular-nums;
  background: color-mix(in srgb, currentColor 6%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
  border-radius: 8px;
  padding: 8px 10px;
}
.cs-readout strong { font-weight: 650; color: oklch(0.62 0.15 250); }
.cs-warning {
  font-size: 12px;
  line-height: 1.6;
  border: 1px solid oklch(0.7 0.15 60 / 0.5);
  background: color-mix(in srgb, oklch(0.7 0.15 60) 14%, transparent);
  border-radius: 8px;
  padding: 8px 10px;
}
.cs-hint { font-size: 11px; opacity: 0.55; margin: 0; line-height: 1.6; }
@keyframes cs-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
@media (max-width: 640px) {
  .cs-scene { flex-direction: column; }
  .cs-side { width: auto; }
}
@media (prefers-reduced-motion: reduce) {
  .cs-scroll { animation: none; }
}
`;

const ROWS = Array.from({ length: 36 }, (_, i) => {
  const n = i + 1;
  const verbs = ["对齐基线核对", "滚动锚定生效", "容器查询断点触发", "间距 token 校验", "字阶步进落位", "吸顶阈值检测"];
  return { n, text: `${verbs[i % verbs.length]} · 条目 ${String(n).padStart(2, "0")} 的长内容行,拖动滚动条观察滑块与轨道配色` };
});

/**
 * 自定义滚动条演示:standard 档写 scrollbar-width/color(互操作事实让 webkit 伪元素自动失效),
 * webkit 档不写标准属性以激活 ::-webkit-scrollbar 家族;none 档亮出 MDN 可及性警告;
 * scrollbar-gutter 预留槽位;支持现状经 CSS.supports 实测如实报告。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [engine, setEngine] = useState(() => store.get("engine") as string);
  const [width, setWidth] = useState(() => store.get("width") as string);
  const [thumb, setThumb] = useState(() => store.get("thumb") as string);
  const [track, setTrack] = useState(() => store.get("track") as string);
  const [gutter, setGutter] = useState(() => store.get("gutter") as string);
  const [supports, setSupports] = useState({ width: false, color: false, gutter: false });

  useEffect(
    () =>
      store.subscribe(() => {
        setEngine(store.get("engine") as string);
        setWidth(store.get("width") as string);
        setThumb(store.get("thumb") as string);
        setTrack(store.get("track") as string);
        setGutter(store.get("gutter") as string);
      }),
    [store],
  );

  // 运行时支持检测:standard 档是否真的有效果,由本引擎自己回答
  useEffect(() => {
    setSupports({
      width: typeof CSS !== "undefined" && Boolean(CSS.supports?.("scrollbar-width", "thin")),
      color: typeof CSS !== "undefined" && Boolean(CSS.supports?.("scrollbar-color", "red blue")),
      gutter: typeof CSS !== "undefined" && Boolean(CSS.supports?.("scrollbar-gutter", "stable")),
    });
  }, []);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="cs-scene" data-engine={engine}>
        <div
          className="cs-scroll"
          role="region"
          aria-label="滚动演示列表 Scroll demo list"
          tabIndex={0}
        >
          {ROWS.map((r) => (
            <div className="cs-row" key={r.n}>
              <b>{String(r.n).padStart(2, "0")}</b>
              <span>{r.text}</span>
            </div>
          ))}
        </div>
        <div className="cs-side">
          {engine === "standard" ? (
            <>
              <div className="cs-readout">
                <div>engine = <strong>standard</strong>(scrollbar-width + scrollbar-color)</div>
                <div>scrollbar-width = <strong>{width}</strong></div>
                <div>scrollbar-color = <strong>{thumb}</strong> / <strong>{track}</strong>(滑块 / 轨道)</div>
                <div>scrollbar-gutter = <strong>{gutter}</strong></div>
                <div>本引擎支持检测:width <strong>{supports.width ? "✓" : "✗"}</strong> / color <strong>{supports.color ? "✓" : "✗"}</strong> / gutter <strong>{supports.gutter ? "✓" : "✗"}</strong></div>
              </div>
              {width === "none" && (
                <div className="cs-warning" role="alert">
                  MDN 警告:none 影响可及性/WCAG 2.1.1 键盘滚动——滚动条是「这里能滚」的操作暗示,慎用。
                </div>
              )}
              {!supports.color && (
                <div className="cs-warning" role="alert">
                  本引擎不支持标准配色属性(如 Safari &lt; 26.2,BCD),standard 档外观不会变化——切 webkit 档或升级引擎。
                </div>
              )}
            </>
          ) : (
            <div className="cs-readout">
              <div>engine = <strong>webkit</strong>(::-webkit-scrollbar 伪元素)</div>
              <div>滑块 <strong>{thumb}</strong> · 宽度固定 12px(演示基准值,未证实)</div>
              <div>互操作:本档不写 scrollbar-width,computed 保持 auto 才能激活伪元素</div>
              <div>Firefox 不实现 webkit 伪元素——本档在 Firefox 无效果;scrollbar-gutter 仍生效(<strong>{gutter}</strong>)</div>
            </div>
          )}
          <p className="cs-hint">
            两档声明同时写在样式表里,靠「scrollbar-width ≠ auto 时 webkit 全家被忽略」的互操作事实自然分流(调研 10§8.3);
            gutter=stable 时右侧即使内容不溢出也留槽。滚动区已设 tabindex=0,键盘方向键可滚动。
          </p>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
