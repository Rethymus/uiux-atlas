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
.sf-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  width: 100%;
  padding: 12px;
}
.sf-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(64px, 1fr));
  gap: 6px 4px;
  width: min(460px, 100%);
}
.sf-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 2px 8px;
  border-radius: 10px;
  min-width: 0;
}
.sf-tile:hover { background: rgba(0, 0, 0, 0.04); }
.sf-tile-label { font-size: 12px; color: rgba(0, 0, 0, 0.45); white-space: nowrap; }
/* strokeWidth 为 CSS 变量型参数(--sf-stroke);stroke-width 是继承属性,设在 svg 根即可 */
.sf-ic {
  width: 44px;
  height: 44px;
  fill: none;
  stroke: currentColor;
  stroke-width: var(--sf-stroke, 2);
  stroke-linecap: round;
  stroke-linejoin: round;
  color: rgba(0, 0, 0, 0.88);
  overflow: visible;
  flex: none;
}
/* fill 开关(JS 型参数)只填闭合路径;镂空子形状带内联 fill:none,优先级高于样式表 */
.sf-scene[data-fill="on"] .sf-art path { fill: currentColor; }
/* capJoin 切换(JS 型参数) */
.sf-scene[data-cap="square"] .sf-ic { stroke-linecap: square; stroke-linejoin: miter; }
.sf-note {
  max-width: 460px;
  font-size: 12px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
}
.sf-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
`;

/**
 * 自绘 24×24 描边图形 8 枚(非任何官方图标库拷贝):sun / moon / camera / bolt / flag / chat / pin / bookmark。
 * camera 镜头与 pin 圆点为「镂空」子形状——path 上内联 fill:none,fill=on 时仍保持中空,
 * 演示「写死属性封死继承」的对照。
 */
const SHAPES: { name: string; label: string; art: ReactNode }[] = [
  {
    name: "sun",
    label: "太阳 Sun",
    art: (
      <>
        <circle cx="12" cy="12" r="4.25" />
        <path d="M12 2.75v2.75" />
        <path d="M12 18.5v2.75" />
        <path d="M2.75 12h2.75" />
        <path d="M18.5 12h2.75" />
        <path d="M5.5 5.5l1.95 1.95" />
        <path d="M16.55 16.55l1.95 1.95" />
        <path d="M16.55 7.45l1.95-1.95" />
        <path d="M5.5 18.5l1.95-1.95" />
      </>
    ),
  },
  {
    name: "moon",
    label: "月亮 Moon",
    art: <path d="M20 14.3A8.3 8.3 0 1 1 9.7 4a7.5 7.5 0 0 0 10.3 10.3z" />,
  },
  {
    name: "camera",
    label: "相机 Camera",
    art: (
      <>
        <path d="M8.6 6.5 9.8 4.9a1 1 0 0 1 .8-.4h2.8a1 1 0 0 1 .8.4l1.2 1.6H19a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 5 6.5z" />
        <circle className="sf-void" cx="12" cy="12.25" r="3.3" style={{ fill: "none" }} />
      </>
    ),
  },
  {
    name: "bolt",
    label: "闪电 Bolt",
    art: <path d="M13.5 2.75 6 13.5h4.9L10.5 21.25 18 10.5h-4.9z" />,
  },
  {
    name: "flag",
    label: "旗帜 Flag",
    art: (
      <>
        <path d="M5.5 3.25v17.5" />
        <path d="M5.5 4.25h12.25l-2.6 4 2.6 4H5.5z" />
      </>
    ),
  },
  {
    name: "chat",
    label: "对话 Chat",
    art: (
      <path d="M4.25 6.5A2.25 2.25 0 0 1 6.5 4.25h11a2.25 2.25 0 0 1 2.25 2.25v7a2.25 2.25 0 0 1-2.25 2.25H9.9L5.6 19.2a.45.45 0 0 1-.73-.35z" />
    ),
  },
  {
    name: "pin",
    label: "定位 Pin",
    art: (
      <>
        <path d="M12 21.4C11.6 21 5.5 15.2 5.5 10.7a6.5 6.5 0 0 1 13 0c0 4.5-6.1 10.3-6.5 10.7z" />
        <circle className="sf-void" cx="12" cy="10.7" r="2.4" style={{ fill: "none" }} />
      </>
    ),
  },
  {
    name: "bookmark",
    label: "书签 Bookmark",
    art: (
      <path d="M6.75 4.5a1 1 0 0 1 1-1h8.5a1 1 0 0 1 1 1v16.1l-5.25-3.4-5.25 3.4z" />
    ),
  },
];

/**
 * 描边与填充图标演示:strokeWidth 为 CSS 变量型参数(--sf-stroke,DemoStage 注入即全网格生效);
 * fill / capJoin 为 JS 型参数——订阅 store 后切 data-fill / data-cap。
 * 8 枚自绘闭合图形;镂空子形状内联 fill:none,演示属性写死对继承的封死行为。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [fill, setFill] = useState(() => store.get("fill") as string);
  const [capJoin, setCapJoin] = useState(() => store.get("capJoin") as string);
  const [strokeWidth, setStrokeWidth] = useState(() => store.get("strokeWidth") as number);

  useEffect(
    () =>
      store.subscribe(() => {
        setFill(store.get("fill") as string);
        setCapJoin(store.get("capJoin") as string);
        setStrokeWidth(store.get("strokeWidth") as number);
      }),
    [store],
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="sf-scene" data-fill={fill} data-cap={capJoin}>
        <div className="sf-grid">
          {SHAPES.map((s) => (
            <div key={s.name} className="sf-tile">
              <svg className="sf-ic sf-art" viewBox="0 0 24 24" aria-hidden="true">
                {s.art}
              </svg>
              <span className="sf-tile-label">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="sf-readout" aria-live="polite">
          strokeWidth={strokeWidth} · fill={fill} · capJoin={capJoin}
        </div>
        <p className="sf-note">
          太阳射线、旗杆是开放路径——填充开也无形可填,只留描边;相机镜头与定位圆点是写死
          fill="none" 的镂空形状,永远保持中空。Open paths keep only their stroke; knockouts stay hollow.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
