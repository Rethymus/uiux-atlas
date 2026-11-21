import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 8 人内存名单(演示数据源) */
const MEMBERS = [
  { name: "林晚", hue: 265 },
  { name: "陈默", hue: 210 },
  { name: "王砚", hue: 165 },
  { name: "赵珂", hue: 90 },
  { name: "周叙", hue: 40 },
  { name: "苏叶", hue: 330 },
  { name: "郑宁", hue: 15 },
  { name: "何澈", hue: 300 },
];

const css = `
.av-scene { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; }
/* 头像组:重叠 -8px(antd groupOverlapping = -marginXS,style/index.ts:220) */
.av-group { display: inline-flex; padding: 4px; animation: av-in 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) both; }
.av-item, .av-more {
  width: var(--av-size, 32px);
  height: var(--av-size, 32px);
  border-radius: 50%;
  border: 2px solid #fff; /* antd groupBorderColor = colorBorderBg */
  display: inline-flex; align-items: center; justify-content: center;
  font-size: calc(var(--av-size, 32px) * 0.4375); /* 字号 14 / 尺寸 32(antd textFontSize) */
  font-weight: 500;
  color: rgba(0, 0, 0, 0.88);
  flex: none;
}
.av-item + .av-item, .av-item + .av-more { margin-inline-start: -8px; }
.av-scene[data-shape="square"] .av-item, .av-scene[data-shape="square"] .av-more { border-radius: 6px; } /* antd seed borderRadius */
.av-more {
  background: #f5f5f5; /* antd colorBgLayout */
  color: rgba(0, 0, 0, 0.65);
  font-size: calc(var(--av-size, 32px) * 0.34);
  font-variant-numeric: tabular-nums;
}
.av-note { font-size: 11px; color: rgba(0, 0, 0, 0.45); text-align: center; }
.av-single { display: flex; gap: 14px; align-items: center; margin-top: 4px; }
.av-single .av-label { font-size: 12px; color: rgba(0, 0, 0, 0.65); }
@keyframes av-in { from { opacity: 0; translate: 0 8px; } to { opacity: 1; translate: 0 0; } }
@media (prefers-reduced-motion: reduce) { .av-group { animation: none; } }
`;

/**
 * 头像演示:size 为 CSS 变量型(--av-size 经 DemoStage 注入);
 * shape / groupCount 为 JS 型参数(demo 订阅 store)。组内重叠 -8px,溢出折叠 +N。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [shape, setShape] = useState(() => store.get("shape") as string);
  const [groupCount, setGroupCount] = useState(() => store.get("groupCount") as number);

  useEffect(
    () =>
      store.subscribe(() => {
        setShape(store.get("shape") as string);
        setGroupCount(store.get("groupCount") as number);
      }),
    [store],
  );

  const shown = MEMBERS.slice(0, groupCount);
  const overflow = MEMBERS.length - groupCount;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="av-scene" data-shape={shape}>
        <div
          className="av-group"
          role="group"
          aria-label={`项目成员共 ${MEMBERS.length} 人,当前展示 ${shown.length} 位:${shown.map((m) => m.name).join("、")}${overflow > 0 ? `,另有 ${overflow} 人折叠` : ""}`}
        >
          {shown.map((m) => (
            <span
              key={m.name}
              className="av-item"
              title={m.name}
              style={{
                background: `oklch(0.85 0.09 ${m.hue})`,
              }}
            >
              {m.name[0]}
            </span>
          ))}
          {overflow > 0 && (
            <span className="av-more" title={`还有 ${overflow} 位成员`}>
              +{overflow}
            </span>
          )}
        </div>
        <div className="av-single">
          <span className="av-item" style={{ background: `oklch(0.85 0.09 ${MEMBERS[0].hue})` }} aria-hidden="true">
            {MEMBERS[0].name[0]}
          </span>
          <span className="av-label">
            独立头像同尺寸:{MEMBERS[0].name} / Standalone avatar, same size
          </span>
        </div>
        <div className="av-note">
          组内重叠固定 -8px · 溢出折叠 +{overflow} / overlap −8px · overflow +N — 共 {MEMBERS.length} 人
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
