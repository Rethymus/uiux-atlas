import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface CsNode {
  value: string;
  children?: CsNode[];
}

const DATA: CsNode[] = [
  {
    value: "北京市",
    children: [{ value: "东城区" }, { value: "西城区" }, { value: "朝阳区" }, { value: "海淀区" }],
  },
  {
    value: "上海市",
    children: [{ value: "黄浦区" }, { value: "徐汇区" }, { value: "静安区" }, { value: "浦东新区" }],
  },
  {
    value: "广东省",
    children: [
      { value: "广州市", children: [{ value: "天河区" }, { value: "越秀区" }, { value: "海珠区" }] },
      { value: "深圳市", children: [{ value: "南山区" }, { value: "福田区" }, { value: "罗湖区" }] },
      { value: "珠海市", children: [{ value: "香洲区" }, { value: "斗门区" }] },
    ],
  },
];

const css = `
.cs-stage { width: min(560px, calc(100% - 48px)); }
.cs-wrap { position: relative; }
.cs-trigger {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: #fff;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.cs-trigger:hover { border-color: #1677ff; }
.cs-trigger:focus-visible { outline: 2px solid #1677ff; outline-offset: -2px; }
.cs-trigger[aria-expanded="true"] { border-color: #1677ff; box-shadow: 0 0 0 2px color-mix(in srgb, #1677ff 25%, transparent); }
.cs-placeholder { color: rgba(0, 0, 0, 0.25); }
.cs-arrow { margin-left: auto; font-size: 10px; color: rgba(0, 0, 0, 0.45); }
.cs-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
.cs-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 1px 4px 1px 8px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.65);
  font-size: 12px;
}
.cs-tag-x {
  border: 0;
  padding: 0 3px;
  font-size: 12px;
  line-height: 1;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.45);
  background: transparent;
  cursor: pointer;
}
.cs-tag-x:hover { color: rgba(0, 0, 0, 0.88); }
.cs-popup {
  display: flex;
  margin-top: 4px;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  z-index: 10;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05);
  animation: cs-pop 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) both;
}
@keyframes cs-pop {
  from { opacity: 0; translate: 0 -4px; }
  to { opacity: 1; translate: 0 0; }
}
.cs-col {
  margin: 0;
  padding: 4px;
  box-sizing: border-box;
  list-style: none;
  min-width: 132px;
  max-height: 256px;
  overflow: auto;
  border-left: 1px solid #f0f0f0;
  animation: cs-col-in 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) both;
}
.cs-col:first-child { border-left: 0; }
@keyframes cs-col-in {
  from { opacity: 0; translate: -4px 0; }
  to { opacity: 1; translate: 0 0; }
}
.cs-opt {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  cursor: pointer;
  white-space: nowrap;
}
.cs-opt:hover, .cs-opt.is-active { background: rgba(0, 0, 0, 0.04); }
.cs-opt[aria-selected="true"] { color: #1677ff; font-weight: 500; }
.cs-box {
  width: 14px;
  height: 14px;
  flex: none;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  display: inline-grid;
  place-items: center;
  font-size: 10px;
  line-height: 1;
  color: transparent;
}
.cs-box[data-checked="true"] {
  background: #1677ff;
  border-color: #1677ff;
  color: #fff;
}
.cs-caret { margin-left: auto; font-size: 10px; color: rgba(0, 0, 0, 0.45); }
.cs-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
@media (max-width: 480px) {
  .cs-popup { max-width: calc(100% - 24px); }
}
@media (prefers-reduced-motion: reduce) {
  .cs-trigger { transition: none; }
  .cs-popup, .cs-col { animation: none; }
}
`;

const hasKids = (n: CsNode) => Array.isArray(n.children) && n.children.length > 0;

/**
 * 级联选择演示:省/市/区三级自绘多列菜单。
 * expandTrigger / changeOnSelect / multiple 为 JS 型参数——订阅 store 后驱动交互:
 * click|hover 展开下一级、changeOnSelect=on 点任意一级即完成选择、multiple 以勾选 + 标签回显。
 * 键盘:↓/↑ 当前列移动高亮、→/Enter 下钻(叶子/任意级即确认)、← 收回上一列、Esc 关闭并恢复原值、Space 多选勾选。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [expandTrigger, setExpandTrigger] = useState(() => store.get("expandTrigger") as string);
  const [changeOnSelect, setChangeOnSelect] = useState(() => store.get("changeOnSelect") as string);
  const [multiple, setMultiple] = useState(() => store.get("multiple") as string);

  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useState<CsNode[][]>([DATA]);
  const [active, setActive] = useState<number[]>([]);
  const [single, setSingle] = useState<string[] | null>(null);
  const [multi, setMulti] = useState<string[][]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const stateAtOpen = useRef<{ single: string[] | null; multi: string[][] }>({ single: null, multi: [] });

  useEffect(
    () =>
      store.subscribe(() => {
        setExpandTrigger(store.get("expandTrigger") as string);
        setChangeOnSelect(store.get("changeOnSelect") as string);
        setMultiple(store.get("multiple") as string);
      }),
    [store],
  );

  useEffect(() => {
    if (!open) return;
    const onDocPointerDown = (e: ReactPointerEvent<Document> | PointerEvent) => {
      const el = wrapRef.current;
      if (el && !el.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [open]);

  const multiOn = multiple === "on";
  const anyLevel = changeOnSelect === "on";

  const openPopup = () => {
    stateAtOpen.current = { single, multi };
    if (single) {
      const cols: CsNode[][] = [DATA];
      const act: number[] = [];
      let level = DATA;
      for (let d = 0; d < single.length; d++) {
        const i = level.findIndex((n) => n.value === single[d]);
        if (i < 0) break;
        act.push(i);
        level = level[i].children ?? [];
        if (d < single.length - 1) cols.push(level);
      }
      setColumns(cols);
      setActive(act);
    } else {
      setColumns([DATA]);
      setActive([]);
    }
    setOpen(true);
  };

  const close = (restore = false) => {
    if (restore) {
      setSingle(stateAtOpen.current.single);
      setMulti(stateAtOpen.current.multi);
    }
    setOpen(false);
  };

  /** 该节点是否可被勾选/确认:叶节点,或 changeOnSelect=on 的任意级 */
  const committable = (n: CsNode) => anyLevel || !hasKids(n);

  const toggleMulti = (path: string[]) => {
    setMulti((prev) => {
      const key = path.join("/");
      return prev.some((p) => p.join("/") === key)
        ? prev.filter((p) => p.join("/") !== key)
        : [...prev, path];
    });
  };

  /** 第 c 列高亮项对应的完整路径 */
  const buildPath = (c: number, i: number): string[] => {
    const out: string[] = [];
    let level = DATA;
    for (let d = 0; d <= c; d++) {
      const idx = d === c ? i : active[d];
      const node = level[idx];
      if (!node) break;
      out.push(node.value);
      level = node.children ?? [];
    }
    return out;
  };

  /** 展开下一列 */
  const drill = (c: number, i: number) => {
    const node = columns[c][i];
    if (!hasKids(node)) return;
    setActive((prev) => [...prev.slice(0, c), i]);
    setColumns((prev) => [...prev.slice(0, c + 1), node.children ?? []]);
  };

  /** 在第 c 列点击第 i 项 */
  const pick = (c: number, i: number) => {
    const node = columns[c][i];
    const nodePath = buildPath(c, i);
    if (multiOn) {
      if (committable(node)) toggleMulti(nodePath);
      else drill(c, i);
      return;
    }
    if (!hasKids(node) || anyLevel) {
      setSingle(nodePath);
      close();
      triggerRef.current?.focus();
      return;
    }
    drill(c, i);
  };

  const hoverPick = (c: number, i: number) => {
    if (expandTrigger !== "hover") return;
    if (hasKids(columns[c][i])) drill(c, i);
  };

  const activeId = (c: number, i: number) => `cs-opt-${c}-${i}`;
  const lastCol = columns.length - 1;
  const lastActive = active[lastCol];

  const onTriggerKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        openPopup();
        return;
      }
      setActive((prev) => {
        const cur = prev[lastCol] ?? -1;
        const next =
          e.key === "ArrowDown"
            ? cur < 0
              ? 0
              : Math.min(cur + 1, columns[lastCol].length - 1)
            : Math.max(cur - 1, 0);
        return [...prev.slice(0, lastCol), next];
      });
    } else if (e.key === "ArrowRight") {
      if (!open || lastActive == null) return;
      e.preventDefault();
      drill(lastCol, lastActive);
    } else if (e.key === "ArrowLeft") {
      if (!open || columns.length <= 1) return;
      e.preventDefault();
      setColumns((prev) => prev.slice(0, -1));
      setActive((prev) => prev.slice(0, -1));
    } else if (e.key === "Enter") {
      if (!open || lastActive == null) return;
      e.preventDefault();
      pick(lastCol, lastActive);
    } else if (e.key === " ") {
      if (!open || !multiOn || lastActive == null) return;
      e.preventDefault();
      const node = columns[lastCol][lastActive];
      if (committable(node)) toggleMulti(buildPath(lastCol, lastActive));
    } else if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        close(true);
      }
    } else if (e.key === "Tab") {
      close();
    }
  };

  const singleLabel = single ? single.join(" / ") : null;
  const showPlaceholder = singleLabel == null && (!multiOn || multi.length === 0);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="cs-stage">
        <div className="cs-wrap" ref={wrapRef}>
          <button
            type="button"
            ref={triggerRef}
            className="cs-trigger"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? "cs-popup" : undefined}
            aria-activedescendant={
              open && typeof lastActive === "number" ? activeId(lastCol, lastActive) : undefined
            }
            aria-label="地区 Region"
            onClick={() => (open ? close() : openPopup())}
            onKeyDown={onTriggerKeyDown}
          >
            <span className={showPlaceholder ? "cs-placeholder" : undefined}>
              {singleLabel ??
                (multiOn && multi.length > 0
                  ? `已选 ${multi.length} 项 Selected`
                  : "省 / 市 / 区 请选择 Pick a region")}
            </span>
            <span className="cs-arrow" aria-hidden="true">▾</span>
          </button>
          {multiOn && multi.length > 0 && (
            <div className="cs-tags">
              {multi.map((p) => (
                <span key={p.join("/")} className="cs-tag">
                  {p.join(" / ")}
                  <button
                    type="button"
                    className="cs-tag-x"
                    aria-label={`移除 ${p.join(" / ")}`}
                    onClick={() => toggleMulti(p)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          {open && (
            <div className="cs-popup" id="cs-popup" role="listbox" aria-label="级联列 Cascading columns">
              {columns.map((col, c) => (
                <ul key={c} className="cs-col" role="group" aria-label={`第 ${c + 1} 级 Level ${c + 1}`}>
                  {col.map((n, i) => {
                    const nodePath = buildPath(c, i);
                    const checked = multi.some((p) => p.join("/") === nodePath.join("/"));
                    const onPath = single != null && single[c] === n.value;
                    return (
                      <li
                        key={n.value}
                        id={activeId(c, i)}
                        role="option"
                        aria-selected={multiOn ? checked : onPath}
                        aria-label={nodePath.join(" / ")}
                        className={`cs-opt${active[c] === i ? " is-active" : ""}`}
                        onClick={() => pick(c, i)}
                        onMouseEnter={() => hoverPick(c, i)}
                      >
                        {multiOn && (
                          <span
                            className="cs-box"
                            data-checked={checked}
                            aria-hidden="true"
                            onClickCapture={(e) => {
                              e.stopPropagation();
                              if (committable(n)) toggleMulti(nodePath);
                            }}
                          >
                            ✓
                          </span>
                        )}
                        <span>{n.value}</span>
                        {hasKids(n) && <span className="cs-caret" aria-hidden="true">▸</span>}
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{css}</style>
      <p className="cs-hint">
        键盘 Keyboard:↓/↑ 移动 · →/Enter 下钻 · ← 回退 · Esc 关闭并恢复 · 点击外部关闭
      </p>
    </DemoStage>
  );
}
