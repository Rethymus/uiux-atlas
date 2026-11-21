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
.ls-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 12px;
}
.ls-main {
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 14px 22px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 16px;
  background: #f8fafc;
}
.ls-preview { display: inline-flex; color: rgba(15, 23, 42, 0.88); }
.ls-meta { display: flex; flex-direction: column; gap: 4px; min-width: 210px; }
.ls-setname { font-size: 15px; font-weight: 650; color: rgba(0, 0, 0, 0.85); }
.ls-spec {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.55);
}
.ls-note { font-size: 12px; line-height: 1.6; color: rgba(0, 0, 0, 0.5); }
.ls-license {
  align-self: flex-start;
  font-size: 11px;
  padding: 1px 9px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: #1d4ed8;
}
.ls-strip { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.ls-mini {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 8px 10px 6px;
  border: 1px solid rgba(15, 23, 42, 0.14);
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  color: rgba(15, 23, 42, 0.8);
}
.ls-mini:hover { border-color: rgba(37, 99, 235, 0.5); }
.ls-mini:focus-visible { outline: 2px solid #2563eb; outline-offset: 1px; }
.ls-mini[aria-pressed="true"] {
  border-color: #2563eb;
  background: rgba(37, 99, 235, 0.06);
}
.ls-mini em {
  font-style: normal;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.55);
}
.ls-mini i {
  font-style: normal;
  font-size: 10px;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.06);
  color: rgba(0, 0, 0, 0.5);
}
.ls-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
}
`;

/** 四枚图形 × 五种画法(自绘示意,非官方库拷贝):lineA=Lucide/Feather 系,lineB=Heroicons 系,lineC=Material 系,solidA=Phosphor 系,solidB=经典 Material 系 */
const ARTS: Record<string, Record<string, ReactNode>> = {
  bell: {
    lineA: (
      <>
        <path d="M18.2 9.2a6.2 6.2 0 0 0-12.4 0c0 5.6-2.3 7-2.3 7h17c0 0-2.3-1.4-2.3-7z" />
        <path d="M10.4 19.8a1.9 1.9 0 0 0 3.2 0" />
      </>
    ),
    lineB: (
      <>
        <path d="M18.6 9.6a6.6 6.6 0 0 0-13.2 0c0 5.4-2.1 6.8-2.1 6.8h17.4c0 0-2.1-1.4-2.1-6.8z" />
        <path d="M10.5 19.7a1.8 1.8 0 0 0 3 0" />
      </>
    ),
    lineC: (
      <>
        <path d="M17.3 9.3a5.3 5.3 0 0 0-10.6 0c0 4.8-2.4 6.7-2.4 6.7h15.4c0 0-2.4-1.9-2.4-6.7z" />
        <path d="M10.3 19.6h3.4" />
      </>
    ),
    solidA: (
      <>
        <path d="M18.2 9.2a6.2 6.2 0 0 0-12.4 0c0 5.6-2.3 7-2.3 7h17c0 0-2.3-1.4-2.3-7z" />
        <circle cx="12" cy="19.4" r="1.5" />
      </>
    ),
    solidB: (
      <>
        <path d="M17 9.4a5 5 0 0 0-10 0c0 4.6-2.4 6.6-2.4 6.6h14.8c0 0-2.4-2-2.4-6.6z" />
        <ellipse cx="12" cy="19.4" rx="2.9" ry="1.5" />
      </>
    ),
  },
  home: {
    lineA: (
      <>
        <path d="M3.8 11.4 12 4.2l8.2 7.2" />
        <path d="M5.4 10.1v9.3h13.2v-9.3" />
        <path d="M10 19.4v-4.8h4v4.8" />
      </>
    ),
    lineB: (
      <>
        <path d="M4.4 11 12 4.6 19.6 11" />
        <path d="M5.6 9.9v9.5h12.8V9.9" />
        <path d="M9.4 19.4v-4.4h5.2v4.4" />
      </>
    ),
    lineC: <path d="M5.2 19.4v-7.6L12 5.4l6.8 6.4v7.6h-4.6v-4.6h-4.4v4.6z" />,
    solidA: <path d="M12 3.3 3.3 10.9h2.2v8.5h5.2v-5h2.6v5h5.2v-8.5h2.2z" />,
    solidB: <path d="M4.6 10.8 12 4l7.4 6.8V20h-5.5v-5h-3.8v5H4.6z" />,
  },
  heart: {
    lineA: (
      <path d="M12 19.6C8.5 17 4.6 13.7 4.6 10.2c0-2.6 1.9-4.7 4.3-4.7 1.3 0 2.5.6 3.1 1.6.6-1 1.8-1.6 3.1-1.6 2.4 0 4.3 2.1 4.3 4.7 0 3.5-3.9 6.8-7.4 9.4z" />
    ),
    lineB: (
      <path d="M12 19.2C8.9 16.6 5.4 13.5 5.4 10.3c0-2.4 1.7-4.3 3.9-4.3 1.2 0 2.2.5 2.7 1.4.5-.9 1.5-1.4 2.7-1.4 2.2 0 3.9 1.9 3.9 4.3 0 3.2-3.5 6.3-6.6 8.9z" />
    ),
    lineC: (
      <path d="M12 19.5l-6.2-5.8C4.6 12.5 4 11.3 4 10c0-2.3 1.7-4 3.9-4 1.6 0 3.2 1 4.1 2.4C12.9 7 14.5 6 16.1 6 18.3 6 20 7.7 20 10c0 1.3-.6 2.5-1.8 3.7z" />
    ),
    solidA: (
      <path d="M12 19.6C8.5 17 4.6 13.7 4.6 10.2c0-2.6 1.9-4.7 4.3-4.7 1.3 0 2.5.6 3.1 1.6.6-1 1.8-1.6 3.1-1.6 2.4 0 4.3 2.1 4.3 4.7 0 3.5-3.9 6.8-7.4 9.4z" />
    ),
    solidB: (
      <path d="M12 19.5l-6.2-5.8C4.6 12.5 4 11.3 4 10c0-2.3 1.7-4 3.9-4 1.6 0 3.2 1 4.1 2.4C12.9 7 14.5 6 16.1 6 18.3 6 20 7.7 20 10c0 1.3-.6 2.5-1.8 3.7z" />
    ),
  },
  star: {
    lineA: <polygon points="12,3.6 14.5,8.8 20.3,9.5 16.1,13.5 17.2,19.3 12,16.5 6.8,19.3 7.9,13.5 3.7,9.5 9.5,8.8" />,
    lineB: <polygon points="12,4.2 14.3,8.9 19.5,9.5 15.7,13.1 16.7,18.3 12,15.7 7.3,18.3 8.3,13.1 4.5,9.5 9.7,8.9" />,
    lineC: <polygon points="12,4 14.6,8.9 20,9.7 16,13.6 17,19 12,16.4 7,19 8,13.6 4,9.7 9.4,8.9" />,
    solidA: <polygon points="12,3.6 14.5,8.8 20.3,9.5 16.1,13.5 17.2,19.3 12,16.5 6.8,19.3 7.9,13.5 3.7,9.5 9.5,8.8" />,
    solidB: <polygon points="12,4 14.6,8.9 20,9.7 16,13.6 17,19 12,16.4 7,19 8,13.6 4,9.7 9.4,8.9" />,
  },
};

/** 六套风格配置(网格/线宽/交付/许可均出自 07 §0/§1 官方核验值) */
const SETS = [
  { id: "lucide", zh: "Lucide", art: "lineA", mode: "line", sw: 2, license: "ISC", spec: "24×24 · 2px · round(源码定值)", note: "Feather 社区续作;全家桶 9 框架包;规范文档最完整" },
  { id: "feather", zh: "Feather", art: "lineA", mode: "line", sw: 2, license: "MIT", spec: "24×24 · 2px · round", note: "极简主义原点;官方雪碧图 feather-sprite.svg 开箱即用;久未发版" },
  { id: "heroicons", zh: "Heroicons", art: "lineB", mode: "line", sw: 1.5, license: "MIT", spec: "24/20/16 · outline 实测 1.5px", note: "Tailwind 官方出品;三档独立重绘;不接受新图标 PR" },
  { id: "phosphor", zh: "Phosphor", art: "solidA", mode: "solid", sw: 0, license: "MIT", spec: "256×256(实测)· fill 路径", note: "六权重含 Fill/Duotone(底 0.2);权重像素值未证实" },
  { id: "material-symbols", zh: "Material Symbols", art: "lineC", mode: "line", sw: 2, license: "Apache-2.0", spec: "24 基准 · wght 100–700 变轴", note: "变量字体四轴(opsz/wght/GRAD/FILL);opsz 默认 24" },
  { id: "material-icons", zh: "Material Icons 经典", art: "solidB", mode: "solid", sw: 0, license: "Apache-2.0", spec: "24 · 五样式填充", note: "五样式 2022 年起停止更新;新项目需评估迁移" },
] as const;

function GlyphSvg({ setId, glyph, size }: { setId: string; glyph: string; size: number }) {
  const cfg = SETS.find((s) => s.id === setId) ?? SETS[0];
  const art = ARTS[glyph]?.[cfg.art];
  if (!art) return null;
  return cfg.mode === "line" ? (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={cfg.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {art}
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      {art}
    </svg>
  );
}

/**
 * 开源图标集对照:set / glyph 为 JS 型参数;六枚迷你卡可点击(经 store.set 同步参数面板)。
 * 图形为自绘示意(非官方库文件拷贝);许可与网格/线宽数值均出自 07 §0/§1 官方核验。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [setId, setSetId] = useState(() => store.get("set") as string);
  const [glyph, setGlyph] = useState(() => store.get("glyph") as string);

  useEffect(
    () =>
      store.subscribe(() => {
        setSetId(store.get("set") as string);
        setGlyph(store.get("glyph") as string);
      }),
    [store],
  );

  const cfg = SETS.find((s) => s.id === setId) ?? SETS[0];

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ls-scene">
        <div className="ls-main">
          <span className="ls-preview">
            <GlyphSvg setId={setId} glyph={glyph} size={88} />
          </span>
          <div className="ls-meta">
            <span className="ls-setname">{cfg.zh}</span>
            <span className="ls-spec">{cfg.spec}</span>
            <span className="ls-license">{cfg.license}</span>
            <span className="ls-note">{cfg.note}</span>
          </div>
        </div>
        <div className="ls-strip">
          {SETS.map((s) => (
            <button
              key={s.id}
              type="button"
              className="ls-mini"
              aria-pressed={s.id === setId}
              onClick={() => store.set("set", s.id)}
              title={s.zh}
            >
              <GlyphSvg setId={s.id} glyph={glyph} size={34} />
              <em>{s.zh}</em>
              <i>{s.license}</i>
            </button>
          ))}
        </div>
        <div className="ls-readout" aria-live="polite">
          set={setId} · glyph={glyph} · license={cfg.license}
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
