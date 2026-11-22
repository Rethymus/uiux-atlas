import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Naming = "labelledby" | "hidden-text" | "aria-label" | "svg-only" | "none";

const css = `
.icb-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
}
.icb-toolbar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 72px;
  padding: 6px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  background: #fff;
}
.icb-btn {
  position: relative;
  box-sizing: content-box;
  width: var(--icb-target, 48px);
  height: var(--icb-target, 48px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(15, 23, 42, 0.18);
  border-radius: 10px;
  background: #fff;
  color: rgba(15, 23, 42, 0.78);
  cursor: pointer;
  padding: 0;
}
.icb-btn:hover { background: rgba(15, 23, 42, 0.05); }
.icb-btn:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
.icb-btn svg { width: var(--icb-icon, 24px); height: var(--icb-icon, 24px); pointer-events: none; }
/* 伪元素扩热区:视觉不变,::before 以负 inset 越过可视边界 */
.icb-btn[data-expand="pseudo"] {
  width: calc(var(--icb-icon, 24px) + 16px);
  height: calc(var(--icb-icon, 24px) + 16px);
}
.icb-btn[data-expand="pseudo"]::before {
  content: "";
  position: absolute;
  inset: calc((var(--icb-target, 48px) - 100%) / -2);
  border-radius: inherit;
}
/* 命中区审计框:与按钮同心的虚线方块 = 实际可点区 */
.icb-hit {
  position: absolute;
  width: var(--icb-target, 48px);
  height: var(--icb-target, 48px);
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  border: 1.5px dashed rgba(37, 99, 235, 0.65);
  border-radius: 10px;
  pointer-events: none;
}
.icb-hit[data-ok="false"] { border-color: rgba(220, 38, 38, 0.75); }
.icb-ref {
  position: relative;
  width: min(520px, 100%);
  height: 26px;
  pointer-events: none;
}
.icb-ref span {
  position: absolute;
  left: 50%;
  top: 0;
  height: 26px;
  border-inline: 1px solid rgba(15, 23, 42, 0.22);
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  color: rgba(15, 23, 42, 0.45);
  padding-inline: 4px;
}
.icb-ref .icb-ref-24 { width: 24px; translate: -50% 0; }
.icb-ref .icb-ref-48 { width: 48px; translate: -50% 0; border-inline-color: rgba(37, 99, 235, 0.4); color: rgba(37, 99, 235, 0.7); }
.icb-panel {
  width: min(520px, 100%);
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  background: #f8fafc;
  padding: 10px 14px;
}
.icb-panel h4 { margin: 0 0 6px; font-size: 12px; font-weight: 650; color: rgba(15, 23, 42, 0.7); }
.icb-name {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  line-height: 1.7;
  color: rgba(15, 23, 42, 0.78);
  background: #fff;
  border: 1px dashed rgba(15, 23, 42, 0.2);
  border-radius: 8px;
  padding: 7px 10px;
  margin: 0 0 8px;
  min-height: 34px;
}
.icb-verdict { margin: 0; font-size: 12px; line-height: 1.65; }
.icb-verdict b { font-weight: 600; }
.icb-ok { color: #15803d; }
.icb-warn { color: #a16207; }
.icb-bad { color: #c2410c; }
.icb-log {
  margin: 8px 0 0;
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  line-height: 1.7;
  color: rgba(15, 23, 42, 0.55);
  min-height: 18px;
}
.icb-note { font-size: 11px; line-height: 1.7; color: rgba(15, 23, 42, 0.45); max-width: 520px; text-align: center; margin: 0; }
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .icb-btn, .icb-hit { transition: none; }
}
`;

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l3 3" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/**
 * 按 Sara Soueidan《Accessible Icon Buttons》三方案 + 失败形态推演的名称审计:
 * 播报为规则推演,不逐字复刻任一读屏器(12 §12;svg-only 失败结论来自 Scott O'Hara 跨浏览器/AT 矩阵)。
 */
function auditName(naming: Naming, pressed: boolean) {
  switch (naming) {
    case "labelledby":
      return {
        announce: "「搜索,切换按钮,已按下」(名来自 hidden 文本,ARIA 允许引用 hidden 元素)",
        verdict: "推荐方案② — 名在 DOM 里:可被整页翻译、可复制,读屏一致性好",
        tone: "ok" as const,
      };
    case "hidden-text":
      return {
        announce: "「搜索,切换按钮,已按下」(名来自视觉隐藏的真实文本)",
        verdict: "推荐方案① — 真实文本是最稳的原生机制,无 ARIA 也能兜底",
        tone: "ok" as const,
      };
    case "aria-label":
      return {
        announce: "「搜索,切换按钮,已按下」(名来自按钮 aria-label)",
        verdict: "方案③ 可用但有四缺点 — 不进 DOM、整页翻译工具无法处理、部分语音控制识别困难、不可复制",
        tone: "warn" as const,
      };
    case "svg-only":
      return {
        announce: "「切换按钮」或偶发「搜索」(依读屏器/浏览器组合而异)",
        verdict: "失败 — 名只放 SVG 上:Scott O'Hara 跨浏览器/读屏矩阵存在大量失败组合",
        tone: "bad" as const,
      };
    default:
      return {
        announce: "「切换按钮」(无任何名称信息)",
        verdict: "失败 — 纯图标按钮无可访问名,读屏只播「按钮」,信息全失",
        tone: "bad" as const,
      };
  }
}

/**
 * 图标按钮演示:naming(JS)切换三种命名实现 + 两种失败形态,直接改写真实按钮的 aria 结构;
 * hitTarget / iconSize(CSS 变量)驱动热区与图标尺寸,虚线审计框呈现实际可点区(低于 24 变红);
 * expand(JS)切换 padding 撑盒 / 伪元素扩热区两种策略;交互日志记录 APG Button 的 Enter/Space 行为。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [naming, setNaming] = useState(() => store.get("naming") as Naming);
  const [expand, setExpand] = useState(() => store.get("expand") as string);
  const [searched, setSearched] = useState(false);
  const [log, setLog] = useState("等待交互…(试试 Tab 聚焦后按 Enter / Space)");
  const logTimer = useRef<number | null>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setNaming(store.get("naming") as Naming);
        setExpand(store.get("expand") as string);
      }),
    [store],
  );

  useEffect(() => {
    return () => {
      if (logTimer.current !== null) window.clearTimeout(logTimer.current);
    };
  }, []);

  const pushLog = (msg: string) => {
    setLog(msg);
    if (logTimer.current !== null) window.clearTimeout(logTimer.current);
    logTimer.current = window.setTimeout(() => setLog("等待交互…(试试 Tab 聚焦后按 Enter / Space)"), 4000);
  };

  const sim = auditName(naming, searched);
  const hitPx = store.get("hitTarget") as number;
  const hitOk = hitPx >= 24;

  const nameProps = (() => {
    switch (naming) {
      case "labelledby":
        return { "aria-labelledby": "icb-search-name", "aria-label": undefined };
      case "hidden-text":
        return { "aria-label": undefined };
      case "aria-label":
        return { "aria-label": "搜索", "aria-labelledby": undefined };
      case "svg-only":
        return { "aria-label": undefined, "aria-labelledby": undefined };
      default:
        return { "aria-label": undefined, "aria-labelledby": undefined };
    }
  })();

  const searchButton = (
    <button
      type="button"
      className="icb-btn"
      data-expand={expand}
      aria-pressed={searched}
      {...nameProps}
      onClick={() => {
        setSearched((v) => !v);
        pushLog("click → 搜索切换");
      }}
      onKeyDown={(e) => {
        // 原生 <button> 自带 APG Button 键盘行为;此处仅为可视化记录
        if (e.key === "Enter") pushLog("Enter → 激活(APG Button)");
        if (e.key === " ") pushLog("Space → 激活(APG Button)");
      }}
    >
      <SearchIcon />
      {naming === "labelledby" && (
        <span id="icb-search-name" hidden>搜索</span>
      )}
      {naming === "hidden-text" && (
        <span className="visually-hidden">搜索</span>
      )}
      <span className="icb-hit" data-ok={hitOk} />
    </button>
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="icb-scene">
        <div className="icb-toolbar" role="group" aria-label="图标按钮演示工具栏">
          {searchButton}
          <button type="button" className="icb-btn" data-expand={expand} aria-label="关闭" onClick={() => pushLog("click → 关闭(aria-label 命名)")}>
            <CloseIcon />
            <span className="icb-hit" data-ok={hitOk} />
          </button>
        </div>
        <div className="icb-ref" aria-hidden="true">
          <span className="icb-ref-24">24</span>
          <span className="icb-ref-48">48</span>
        </div>
        <div className="icb-panel">
          <h4>可访问名审计({naming === "labelledby" ? "hidden + aria-labelledby" : naming === "hidden-text" ? "视觉隐藏文本" : naming === "aria-label" ? "aria-label" : naming === "svg-only" ? "名只在 SVG 上" : "无名"})</h4>
          <p className="icb-name" aria-live="polite">
            读屏播报模拟:{sim.announce}
          </p>
          <p className={`icb-verdict icb-${sim.tone}`}>
            <b>判定:</b>
            {sim.verdict}
          </p>
          <p className="icb-log">{log}</p>
        </div>
        <p className="icb-note">
          虚线审计框 = 实际命中区(≥24px 蓝 / &lt;24px 红;参照 WCAG 2.5.8,生产参照 M3 48dp)。
          原生 &lt;button&gt; 自带 APG Button 模式的 Enter/Space 激活——键盘与鼠标行为完全一致;伪元素档的命中区越过可视边界,注意与相邻按钮重叠。
          播报为规则推演,实际读屏器输出有差异。
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
