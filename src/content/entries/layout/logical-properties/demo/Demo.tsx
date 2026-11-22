import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.lp-scene {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  overflow: auto;
}
.lp-cards {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
  align-content: start;
}
.lp-card {
  position: relative;
  border: 1px solid color-mix(in srgb, currentColor 24%, transparent);
  background: color-mix(in srgb, currentColor 5%, transparent);
  animation: lp-in 0.4s ease-out both;
}
/* 物理卡:同数值的物理方向声明——dir 翻转后纹丝不动 */
.lp-card--physical {
  padding-top: var(--lp-pad-block, 16px);
  padding-bottom: var(--lp-pad-block, 16px);
  padding-left: var(--lp-pad-inline, 24px);
  padding-right: var(--lp-pad-inline, 24px);
  border-top-left-radius: var(--lp-radius, 12px);
}
/* 逻辑卡:一套声明,dir/writing-mode 变了自动翻 */
.lp-card--logical {
  padding-block: var(--lp-pad-block, 16px);
  padding-inline: var(--lp-pad-inline, 24px);
  border-start-start-radius: var(--lp-radius, 12px);
}
.lp-card h4 { margin: 0 0 6px; font-size: 14px; }
.lp-card .lp-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  line-height: 1.5;
}
.lp-avatar {
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, oklch(0.62 0.16 250), oklch(0.66 0.15 300));
}
.lp-action {
  margin-inline-start: auto;   /* 推到「行末侧」而非右侧(调研 12§2 片段) */
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 7px;
  padding: 3px 10px;
  font-size: 11px;
  cursor: pointer;
  background: color-mix(in srgb, currentColor 8%, transparent);
  color: inherit;
  white-space: nowrap;
}
.lp-tag {
  display: inline-block;
  margin-block-start: 8px;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, oklch(0.62 0.15 250) 18%, transparent);
}
.lp-tag--start { background: color-mix(in srgb, oklch(0.62 0.15 160) 20%, transparent); }
.lp-readout {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  opacity: 0.85;
}
.lp-readout strong { font-weight: 650; color: oklch(0.62 0.15 250); }
.lp-hint { font-size: 11px; opacity: 0.55; margin: 0; }
@keyframes lp-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .lp-card { animation: none; }
}
`;

/**
 * 逻辑属性演示:同一数值的「物理卡 vs 逻辑卡」并排,容器 dir 属性切换后
 * 逻辑卡(padding-inline / border-start-start-radius / margin-inline-start: auto)整体翻转,
 * 物理卡(padding-left / border-top-left-radius)原地不动。
 * 读数为 getComputedStyle 实测值,不伪造。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [dir, setDir] = useState(() => store.get("dir") as string);
  const [padInline, setPadInline] = useState(() => store.get("padInline") as number);
  const [measured, setMeasured] = useState<{ physLeft: string; physInlineStart: string; logicalInlineStart: string }>({
    physLeft: "…",
    physInlineStart: "…",
    logicalInlineStart: "…",
  });
  const physicalRef = useRef<HTMLDivElement>(null);
  const logicalRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setDir(store.get("dir") as string);
        setPadInline(store.get("padInline") as number);
      }),
    [store],
  );

  // 实测计算值:物理 padding-left 恒定;逻辑 padding-inline-start 随 dir 翻转
  useEffect(() => {
    const csP = physicalRef.current ? getComputedStyle(physicalRef.current) : null;
    const csL = logicalRef.current ? getComputedStyle(logicalRef.current) : null;
    setMeasured({
      physLeft: csP?.getPropertyValue("padding-left") ?? "…",
      physInlineStart: csP?.getPropertyValue("padding-inline-start") ?? "…",
      logicalInlineStart: csL?.getPropertyValue("padding-inline-start") ?? "…",
    });
  }, [dir, padInline]);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="lp-scene" dir={dir}>
        <div className="lp-cards">
          <div className="lp-card lp-card--physical" ref={physicalRef}>
            <h4>物理属性卡 Physical</h4>
            <div className="lp-row">
              <span className="lp-avatar" aria-hidden="true">陈</span>
              <span>padding-left / border-top-left-radius</span>
              <button type="button" className="lp-action">操作</button>
            </div>
            <span className="lp-tag">dir 翻转后:不跟随</span>
          </div>
          <div className="lp-card lp-card--logical" ref={logicalRef}>
            <h4>逻辑属性卡 Logical</h4>
            <div className="lp-row">
              <span className="lp-avatar" aria-hidden="true">林</span>
              <span>padding-inline / border-start-start-radius</span>
              <button type="button" className="lp-action">操作</button>
            </div>
            <span className="lp-tag lp-tag--start">dir 翻转后:行首侧整体镜像</span>
          </div>
        </div>
        <p className="lp-readout">
          <span>dir = <strong>{dir}</strong></span>
          <span>物理卡 padding-left = <strong>{measured.physLeft}</strong></span>
          <span>逻辑卡 padding-inline-start = <strong>{measured.logicalInlineStart}</strong>(getComputedStyle 实测)</span>
        </p>
        <p className="lp-hint">
          两卡数值完全相同(默认 24px/16px/12px,出自调研 12§2 片段);RTL 档下逻辑卡的行首内边距与起角翻到另一侧,
          「操作」按钮也被 margin-inline-start: auto 推到对侧——物理卡全部原地不动。
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
