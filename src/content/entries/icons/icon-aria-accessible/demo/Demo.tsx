import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.aa-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px;
}
.aa-live { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; justify-content: center; }
.aa-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1px solid rgba(15, 23, 42, 0.2);
  background: #fff;
  border-radius: 9px;
  padding: 8px 14px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
}
.aa-btn:hover { background: rgba(15, 23, 42, 0.05); }
.aa-btn:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
.aa-btn svg { color: rgba(0, 0, 0, 0.65); flex: none; }
.aa-panel {
  width: min(480px, 100%);
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  background: #f8fafc;
  padding: 12px 14px;
}
.aa-panel h4 { margin: 0 0 6px; font-size: 13px; font-weight: 600; color: rgba(0, 0, 0, 0.7); }
.aa-utter {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.75);
  background: #fff;
  border: 1px dashed rgba(15, 23, 42, 0.2);
  border-radius: 8px;
  padding: 8px 10px;
  margin: 0 0 8px;
  min-height: 38px;
}
.aa-verdict { font-size: 12px; margin: 0; }
.aa-verdict b { font-weight: 600; }
.aa-ok { color: #15803d; }
.aa-bad { color: #c2410c; }
.aa-warn { color: #a16207; }
.aa-table { border-collapse: collapse; width: min(480px, 100%); font-size: 12px; }
.aa-table th, .aa-table td {
  border: 1px solid rgba(15, 23, 42, 0.12);
  padding: 6px 8px;
  text-align: left;
  vertical-align: top;
}
.aa-table th { background: rgba(15, 23, 42, 0.04); font-weight: 600; }
.aa-table tr[data-active="true"] { background: rgba(37, 99, 235, 0.08); }
.aa-note { font-size: 12px; line-height: 1.7; color: rgba(0, 0, 0, 0.45); max-width: 480px; text-align: center; }
`;

function StarIcon({ hidden }: { hidden: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={hidden || undefined}
    >
      <path d="M12 3.6l2.6 5.4 5.9.7-4.3 4.1 1.1 5.8-5.3-2.8-5.3 2.8 1.1-5.8L3.5 9.7l5.9-.7z" />
    </svg>
  );
}

function BellIcon({ hidden }: { hidden: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={hidden || undefined}
    >
      <path d="M18.2 9.2a6.2 6.2 0 0 0-12.4 0c0 5.6-2.3 7-2.3 7h17c0 0-2.3-1.4-2.3-7z" />
      <path d="M10.4 19.8a1.9 1.9 0 0 0 3.2 0" />
    </svg>
  );
}

/**
 * 按 W3C/MDN 规则推演的读屏播报(不逐字复刻任何读屏器;内联 SVG 播报因实现而异):
 * - 装饰 + 有名:「收藏,按钮」——MDN 官方分工(图标装饰化 + 按钮拿名)
 * - 装饰 + 无名:「按钮」——图标摘除后按钮无名,失败
 * - 保留 + 有名:名照播,无 title 的内联 SVG 多数读屏器不播报(行为有差异),存在冗余风险
 * - 保留 + 无名:「按钮」——无名且无等价信息,失败;对应 <img> 缺 alt 会读文件名/URL
 */
function simulate(decorative: boolean, label: boolean) {
  if (decorative && label)
    return {
      utter: "「收藏,按钮」",
      verdict: "推荐 — 图标摘树,按钮播报可访问名(MDN 官方分工)",
      tone: "ok" as const,
    };
  if (decorative && !label)
    return {
      utter: "「按钮」",
      verdict: "失败 — 图标摘除后按钮无可访问名,信息全失",
      tone: "bad" as const,
    };
  if (!decorative && label)
    return {
      utter: "「收藏,按钮」(图形可能被额外播报或完全跳过,因读屏器实现而异)",
      verdict: "可用但冗余 — 未摘除的图形贡献不确定,优先装饰化",
      tone: "warn" as const,
    };
  return {
    utter: "「按钮」(缺 alt 的 <img> 场景读屏还会朗读文件名/URL)",
    verdict: "失败 — 无可访问名且图形无等价文本",
    tone: "bad" as const,
  };
}

const ROWS = [
  { decorative: true, label: true },
  { decorative: true, label: false },
  { decorative: false, label: true },
  { decorative: false, label: false },
];

/**
 * 图标语义与无障碍演示:decorative / label 均为 JS 型参数,实时驱动两个真实按钮的
 * aria-hidden 与 aria-label;读屏模拟面板与四格对照表按同一规则函数输出。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [decorative, setDecorative] = useState(() => store.get("decorative") as string);
  const [label, setLabel] = useState(() => store.get("label") as string);
  const [liked, setLiked] = useState(false);

  useEffect(
    () =>
      store.subscribe(() => {
        setDecorative(store.get("decorative") as string);
        setLabel(store.get("label") as string);
      }),
    [store],
  );

  const hidden = decorative === "on";
  const named = label === "with";
  const sim = simulate(hidden, named);
  const name = named ? "收藏" : "(空)";

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="aa-scene">
        <div className="aa-live">
          <button
            type="button"
            className="aa-btn"
            aria-label={named ? "收藏" : undefined}
            aria-pressed={liked}
            onClick={() => setLiked((v) => !v)}
          >
            <StarIcon hidden={hidden} />
          </button>
          <button type="button" className="aa-btn">
            <BellIcon hidden={hidden} />
            通知
          </button>
        </div>
        <div className="aa-panel">
          <h4>读屏播报模拟(按 W3C/MDN 规则推演)</h4>
          <p className="aa-utter" aria-live="polite">
            icon-only 按钮:{sim.utter}
            <br />
            可访问名计算结果:{name}
          </p>
          <p className={`aa-verdict aa-${sim.tone}`}>
            <b>{hidden ? "aria-hidden" : "无 aria-hidden"} × {named ? "有名" : "无名"}:</b>
            {sim.verdict}
          </p>
        </div>
        <table className="aa-table">
          <thead>
            <tr>
              <th scope="col">组合</th>
              <th scope="col">播报</th>
              <th scope="col">判定</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => {
              const s = simulate(r.decorative, r.label);
              const active = r.decorative === hidden && (r.label === named);
              return (
                <tr key={`${r.decorative}-${r.label}`} data-active={active}>
                  <td>{r.decorative ? "aria-hidden" : "无 aria-hidden"} × {r.label ? "有名" : "无名"}</td>
                  <td>{s.utter}</td>
                  <td className={`aa-${s.tone}`}>{s.verdict.split(" — ")[0]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="aa-note">
          图标+文字按钮(通知):图标始终可装饰化,可见文字「通知」就是可访问名——这是 MDN 官方示例的分工。
          模拟基于规则推演,实际读屏器对无 title 内联 SVG 的播报存在实现差异。
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
