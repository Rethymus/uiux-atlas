import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.tag-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 8px 12px;
}
.tag-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 460px;
}
/* 标签基座:fontSizeSM 12 / borderRadiusSM 4 / colorBorder #d9d9d9;
   高度与内边距为 demo 取值(22px / 0 7px,antd 源码档位未逐一核对) */
.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 22px;
  padding: 0 7px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1;
  white-space: nowrap;
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.tag-scene[data-bordered="off"] .tag { border-color: transparent; }
.tag-closing { opacity: 0; transform: scale(0.85); }
/* 五色:Bg=阶1 / Border=阶3 / Text=阶9(@ant-design/colors 8.0.1 presets 官方阶值) */
.tag-red    { background: #fff1f0; border-color: #ffccc7; color: #820014; }
.tag-orange { background: #fff7e6; border-color: #ffd591; color: #873800; }
.tag-green  { background: #f6ffed; border-color: #b7eb8f; color: #135200; }
.tag-blue   { background: #e6f4ff; border-color: #91caff; color: #002c8c; }
/* 灰 = 无 color 默认形态:白底叠 2% 中性填充 / colorBorder / colorText 88% */
.tag-gray   { background: #fafafa; border-color: #d9d9d9; color: rgba(0, 0, 0, 0.88); }
/* 关闭按钮:必须带可访问名;颜色随标签文字(inherit) */
.tag-x {
  border: 0;
  background: none;
  padding: 0 0 0 2px;
  margin: 0 -1px 0 0;
  font-size: 13px;
  line-height: 1;
  color: inherit;
  opacity: 0.65;
  cursor: pointer;
  border-radius: 2px;
}
.tag-x:hover { opacity: 1; }
.tag-x:focus-visible { outline: 2px solid currentColor; outline-offset: 1px; opacity: 1; }
/* 五色对照(静态小样) */
.tag-legend { gap: 8px; opacity: 0.92; }
.tag-legend-label {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  margin-right: 2px;
}
/* 恢复入口:常驻渲染(禁用态),避免删除后焦点掉到 body */
.tag-reset {
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 4px;
  height: 24px;
  padding: 0 10px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
}
.tag-reset:hover:not(:disabled) { border-color: #1677ff; color: #1677ff; }
.tag-reset:disabled { color: rgba(0, 0, 0, 0.25); border-color: #d9d9d9; cursor: not-allowed; }
.tag-reset:focus-visible { outline: 2px solid #1677ff; outline-offset: 2px; }
.tag-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  overflow-wrap: anywhere;
}
@media (prefers-reduced-motion: reduce) {
  .tag { transition: none; }
}
`;

type TagItem = { id: string; zh: string; en: string };

const TAGS: TagItem[] = [
  { id: "todo", zh: "待办", en: "Todo" },
  { id: "doing", zh: "进行中", en: "Doing" },
  { id: "review", zh: "评审中", en: "Review" },
  { id: "done", zh: "已完成", en: "Done" },
];

const LEGEND: { color: string; zh: string; en: string }[] = [
  { color: "red", zh: "红", en: "Red" },
  { color: "orange", zh: "橙", en: "Orange" },
  { color: "green", zh: "绿", en: "Green" },
  { color: "blue", zh: "蓝", en: "Blue" },
  { color: "gray", zh: "灰", en: "Gray" },
];

/**
 * 标签演示:color / closable / bordered 三个 JS 型参数由 demo 订阅 store 消费。
 * 上排为参数驱动的可关闭标签组(删除后焦点移交后一项,APG 焦点实践);
 * 下排为五色静态对照。关闭动画只动 opacity/transform(0.18s,取 antd
 * motionDurationMid 0.2s 档附近),reduced-motion 时瞬时移除。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [color, setColor] = useState(() => store.get("color") as string);
  const [closable, setClosable] = useState(() => store.get("closable") as string);
  const [bordered, setBordered] = useState(() => store.get("bordered") as string);
  const [alive, setAlive] = useState<string[]>(() => TAGS.map((t) => t.id));
  const [closing, setClosing] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const pendingFocus = useRef<string | null>(null);
  const closeRefs = useRef(new Map<string, HTMLButtonElement | null>());
  const resetRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setColor(store.get("color") as string);
      setClosable(store.get("closable") as string);
      setBordered(store.get("bordered") as string);
    });
    return () => {
      unsubscribe();
      window.clearTimeout(closeTimer.current);
    };
  }, [store]);

  // 删除完成后焦点移交:剩余的后一个标签;空则回「恢复全部」(常驻,焦点不掉 body)
  useEffect(() => {
    if (!pendingFocus.current) return;
    const target = pendingFocus.current;
    pendingFocus.current = null;
    if (target === "__reset__") resetRef.current?.focus();
    else closeRefs.current.get(target)?.focus();
  }, [alive]);

  const closeTag = (id: string) => {
    if (closing) return;
    const idx = alive.indexOf(id);
    const remaining = alive.filter((x) => x !== id);
    const nextId = remaining[Math.min(idx, remaining.length - 1)];
    pendingFocus.current = nextId ?? "__reset__";
    setClosing(id);
    closeTimer.current = window.setTimeout(() => {
      setClosing(null);
      setAlive(remaining);
    }, 180);
  };

  const restore = () => setAlive(TAGS.map((t) => t.id));

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="tag-scene" data-bordered={bordered}>
        <div className="tag-row" role="list" aria-label="可关闭标签组 Closable tag group">
          {TAGS.map((t) =>
            alive.includes(t.id) ? (
              <span key={t.id} className={`tag tag-${color} ${closing === t.id ? "tag-closing" : ""}`} role="listitem">
                {t.zh} {t.en}
                {closable === "on" ? (
                  <button
                    type="button"
                    className="tag-x"
                    aria-label={`移除标签 ${t.zh} ${t.en} — Remove tag`}
                    ref={(el) => {
                      closeRefs.current.set(t.id, el);
                    }}
                    onClick={() => closeTag(t.id)}
                  >
                    ✕
                  </button>
                ) : null}
              </span>
            ) : null,
          )}
          <button
            type="button"
            className="tag-reset"
            disabled={alive.length === TAGS.length}
            ref={resetRef}
            onClick={restore}
          >
            恢复全部 Restore
          </button>
        </div>
        <div className="tag-row tag-legend">
          <span className="tag-legend-label">五色对照 Palette:</span>
          {LEGEND.map((l) => (
            <span key={l.color} className={`tag tag-${l.color}`}>
              {l.zh} {l.en}
            </span>
          ))}
        </div>
        <div className="tag-readout" aria-live="polite">
          color={color} · closable={closable} · bordered={bordered} · remaining={alive.length}/{TAGS.length}
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
