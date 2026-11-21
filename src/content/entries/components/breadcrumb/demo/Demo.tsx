import { Fragment, useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface Crumb {
  zh: string;
  en: string;
}

const FULL_PATH: Crumb[] = [
  { zh: "首页", en: "Home" },
  { zh: "资源", en: "Resources" },
  { zh: "组件", en: "Components" },
  { zh: "导航", en: "Navigation" },
  { zh: "面包屑", en: "Breadcrumb" },
];

const css = `
.bc-scene { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 20px; }
.bc-frame {
  width: min(640px, 100%);
  background: #fff;
  color: rgba(0, 0, 0, 0.88); /* antd 中性文字 88%(06-antdesign.md §2.3-⑤) */
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05);
  overflow: hidden;
  animation: bc-in 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
.bc-trail { padding: 14px 18px; border-bottom: 1px solid #f0f0f0; }
.bc-trail ol { display: flex; align-items: center; flex-wrap: wrap; gap: 6px 4px; margin: 0; padding: 0; list-style: none; }
.bc-crumb {
  border: 0; background: none; cursor: pointer; font-family: inherit;
  font-size: 14px; padding: 2px 8px; border-radius: 6px; text-decoration: none;
  color: rgba(0, 0, 0, 0.65); /* colorTextSecondary 65%(§2.3-⑤) */
  transition: color 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), background-color 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.bc-crumb:hover { color: #1677ff; background: rgba(0, 0, 0, 0.04); } /* 主色 + 4% 中性填充 */
.bc-crumb:focus-visible { outline: 2px solid #1677ff; outline-offset: 1px; }
.bc-current { font-size: 14px; font-weight: 500; color: rgba(0, 0, 0, 0.88); padding: 2px 8px; }
.bc-sep { color: rgba(0, 0, 0, 0.45); font-size: 13px; user-select: none; }
.bc-expander {
  border: 1px solid #d9d9d9; background: #fff; border-radius: 6px;
  font-family: inherit; font-size: 14px; letter-spacing: 2px;
  padding: 1px 10px; cursor: pointer; color: rgba(0, 0, 0, 0.65); line-height: 1.5;
}
.bc-expander:hover { color: #1677ff; border-color: #1677ff; }
.bc-expander:focus-visible { outline: 2px solid #1677ff; outline-offset: 1px; }
.bc-collapse {
  border: 0; background: #e6f4ff; color: #1677ff; border-radius: 999px;
  font-family: inherit; font-size: 12px; padding: 2px 10px; cursor: pointer;
}
.bc-collapse:focus-visible { outline: 2px solid #1677ff; outline-offset: 1px; }
.bc-body { padding: 16px 18px 14px; }
.bc-body h4 { margin: 0 0 10px; font-size: 15px; font-weight: 650; }
.bc-skel { height: 10px; border-radius: 5px; background: #f0f0f0; margin-bottom: 8px; }
.bc-skel:last-of-type { width: 58%; }
.bc-hint {
  margin-top: 12px; display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; color: rgba(0, 0, 0, 0.65);
  background: #e6f4ff; border-radius: 999px; padding: 3px 12px;
}
@keyframes bc-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .bc-frame { animation: none; }
  .bc-crumb { transition: none; }
}
`;

/**
 * 面包屑演示:5 层样例路径,separator/maxItems 为 JS 型参数(订阅 store)。
 * 超出 maxItems 时中层折叠为可聚焦「…」展开钮,展开后提供收起;
 * 点击任意上层节点即回退到该层;当前页 aria-current="page" 且不可点。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [separator, setSeparator] = useState(() => store.get("separator") as string);
  const [maxItems, setMaxItems] = useState(() => store.get("maxItems") as number);
  const [depth, setDepth] = useState(FULL_PATH.length);
  const [expanded, setExpanded] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setSeparator(store.get("separator") as string);
        setMaxItems(store.get("maxItems") as number);
      }),
    [store],
  );

  const path = FULL_PATH.slice(0, depth);
  const collapsed = !expanded && path.length > maxItems;
  const collapsedCount = path.length - 2; // 折叠掉的中层数量(首尾各保留一层)

  const goTo = (i: number) => {
    // 点击第 i 个上层节点 → 回退到该层(路径截断为前 i+1 项)
    setDepth(i + 1);
    setExpanded(false);
  };

  const renderItems = () => {
    if (collapsed) {
      return (
        <>
          <li>
            <button type="button" className="bc-crumb" title={path[0].en} onClick={() => goTo(0)}>
              {path[0].zh}
            </button>
          </li>
          <li className="bc-sep" aria-hidden="true">{separator}</li>
          <li>
            <button
              type="button"
              className="bc-expander"
              aria-expanded="false"
              aria-label={`展开被折叠的 ${collapsedCount} 个层级 Expand ${collapsedCount} collapsed levels`}
              title={`展开被折叠的 ${collapsedCount} 个层级`}
              onClick={() => setExpanded(true)}
            >
              …
            </button>
          </li>
          <li className="bc-sep" aria-hidden="true">{separator}</li>
          <li className="bc-current" aria-current="page" title={path[path.length - 1].en}>
            {path[path.length - 1].zh}
          </li>
        </>
      );
    }
    return (
      <>
        {path.map((c, i) => {
          const isLast = i === path.length - 1;
          const node = isLast ? (
            <span className="bc-current" aria-current="page" title={c.en}>
              {c.zh}
            </span>
          ) : (
            <button type="button" className="bc-crumb" title={c.en} onClick={() => goTo(i)}>
              {c.zh}
            </button>
          );
          const sep = (
            <li className="bc-sep" aria-hidden="true">
              {separator}
            </li>
          );
          return (
            <Fragment key={`${c.zh}-${i}`}>
              <li>{node}</li>
              {!isLast && sep}
            </Fragment>
          );
        })}
        {expanded && path.length > maxItems && (
          <li>
            <button
              type="button"
              className="bc-collapse"
              aria-expanded="true"
              aria-label="收起展开的层级 Collapse expanded levels"
              onClick={() => setExpanded(false)}
            >
              收起 ↑
            </button>
          </li>
        )}
      </>
    );
  };

  const current = path[path.length - 1];

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="bc-scene" ref={frameRef}>
        <div className="bc-frame">
          <nav className="bc-trail" aria-label="面包屑 Breadcrumb">
            <ol>{renderItems()}</ol>
          </nav>
          <div className="bc-body">
            <h4>
              {current.zh} · {current.en}
            </h4>
            <div className="bc-skel" />
            <div className="bc-skel" />
            <div className="bc-skel" />
            <span className="bc-hint">
              点击上层任意节点回退 · 调面板 maxItems 看折叠 Click any ancestor to backtrack · try maxItems
            </span>
          </div>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
