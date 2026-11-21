import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.icon-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 8px 12px;
}
.icon-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(60px, 1fr));
  gap: 10px 8px;
  width: min(440px, 100%);
}
.icon-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 4px 8px;
  border-radius: 8px;
  min-width: 0;
}
.icon-tile:hover { background: rgba(0, 0, 0, 0.04); }
/* 尺寸与线宽经 CSS 变量注入(--icon-size/--icon-stroke-width);
   stroke-width 是 SVG 继承属性,设在 <svg> 上即可传导到全部子形状 */
.ic {
  width: var(--icon-size, 14px);
  height: var(--icon-size, 14px);
  stroke-width: var(--icon-stroke-width, 2);
  color: rgba(0, 0, 0, 0.88);
  flex: none;
  overflow: visible;
}
.icon-scene[data-icon-color="accent"] .ic { color: #1677ff; }
.icon-scene[data-icon-color="danger"] .ic { color: #ff4d4f; }
.icon-tile-label {
  font-size: 12px;
  line-height: 1.6667;
  color: rgba(0, 0, 0, 0.45);
  white-space: nowrap;
}
/* 行内用法:antd 图标注入 width/height=1em,与文字天然等高对齐 */
.icon-inline {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
}
.icon-inline .ic { width: 1em; height: 1em; }
.icon-inline small { color: rgba(0, 0, 0, 0.45); font-size: 12px; }
.icon-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  overflow-wrap: anywhere;
}
`;

/** 自绘 24×24 描边图标集(非任何官方图标库拷贝),stroke 走 currentColor */
const ICONS: { name: string; label: string; art: ReactNode }[] = [
  {
    name: "home",
    label: "首页 Home",
    art: (
      <>
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5 10v10h14V10" />
        <path d="M10 20v-5h4v5" />
      </>
    ),
  },
  {
    name: "search",
    label: "搜索 Search",
    art: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m16.5 16.5 4.5 4.5" />
      </>
    ),
  },
  {
    name: "heart",
    label: "收藏 Heart",
    art: (
      <path d="M12 20C8 17 4 13.6 4 9.8 4 7.2 6 5 8.6 5c1.4 0 2.7.6 3.4 1.7C12.7 5.6 14 5 15.4 5 18 5 20 7.2 20 9.8c0 3.8-4 7.2-8 10.2z" />
    ),
  },
  {
    name: "star",
    label: "星标 Star",
    art: (
      <polygon points="12,3.5 14.6,8.9 20.5,9.6 16.2,13.7 17.3,19.5 12,16.6 6.7,19.5 7.8,13.7 3.5,9.6 9.4,8.9" />
    ),
  },
  {
    name: "bell",
    label: "通知 Bell",
    art: (
      <>
        <path d="M18 9a6 6 0 1 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 15 18 9z" />
        <path d="M10.3 20a2 2 0 0 0 3.4 0" />
      </>
    ),
  },
  {
    name: "trash",
    label: "删除 Trash",
    art: (
      <>
        <path d="M4 7h16" />
        <path d="M9 7V5h6v2" />
        <path d="m6.5 7 1 13h9l1-13" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
      </>
    ),
  },
  {
    name: "download",
    label: "下载 Download",
    art: (
      <>
        <path d="M21 15v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" />
        <path d="m7 10 5 5 5-5" />
        <path d="M12 15V3" />
      </>
    ),
  },
  {
    name: "user",
    label: "用户 User",
    art: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 20.5c0-3.8 3.4-6 7.5-6s7.5 2.2 7.5 6" />
      </>
    ),
  },
  {
    name: "plus",
    label: "新建 Plus",
    art: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
  },
  {
    name: "arrow-right",
    label: "前进 Arrow",
    art: (
      <>
        <path d="M4 12h15" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
  },
];

function IconSvg({ art }: { art: ReactNode }) {
  return (
    <svg
      className="ic"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {art}
    </svg>
  );
}

/**
 * 图标演示:size / strokeWidth 为 CSS 变量型参数(--icon-size / --icon-stroke-width,
 * DemoStage 注入即全网格生效);color 为 JS 型参数——订阅 store 后切 data-icon-color。
 * 图标集 10 个自绘 24×24 描边图形;行内行展示 antd width/height=1em 的对齐行为。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [color, setColor] = useState(() => store.get("color") as string);
  const [size, setSize] = useState(() => store.get("size") as number);
  const [strokeWidth, setStrokeWidth] = useState(() => store.get("strokeWidth") as number);

  useEffect(
    () =>
      store.subscribe(() => {
        setColor(store.get("color") as string);
        setSize(store.get("size") as number);
        setStrokeWidth(store.get("strokeWidth") as number);
      }),
    [store],
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="icon-scene" data-icon-color={color}>
        <div className="icon-grid">
          {ICONS.map((icon) => (
            <div key={icon.name} className="icon-tile">
              <IconSvg art={icon.art} />
              <span className="icon-tile-label">{icon.label}</span>
            </div>
          ))}
        </div>
        <div className="icon-inline">
          <IconSvg art={ICONS[0].art} />
          行内用法:1em 与文字等高
          <small>inline 1em</small>
        </div>
        <div className="icon-readout" aria-live="polite">
          size={size}px · strokeWidth={strokeWidth} · color={color}
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
