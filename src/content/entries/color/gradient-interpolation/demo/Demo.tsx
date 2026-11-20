import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const SPACES = ["srgb", "oklab", "oklch", "display-p3"] as const;
type Space = (typeof SPACES)[number];

/** 柱坐标空间(CSS Color 4 §13.1 语法表)——只有柱坐标空间可携带 hue 策略关键词 */
const POLAR: ReadonlySet<string> = new Set(["hsl", "hwb", "lch", "oklch"]);

const css = `
.gi-stage {
  --gi-from: #FF0000;
  --gi-to: #0000FF;
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
  overflow: hidden;
}
.gi-main {
  height: 84px;
  border-radius: 14px;
  /* 兜底:无 in 的普通渐变(不支持 in 语法的浏览器消费这条) */
  background: linear-gradient(90deg, var(--gi-from), var(--gi-to));
}
.gi-caption {
  font-size: 12px;
  color: #5b6472;
  font-family: ui-monospace, "JetBrains Mono", Consolas, monospace;
  overflow-wrap: anywhere;
}
.gi-rows {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.gi-row {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.gi-strip {
  flex: 1;
  height: 26px;
  border-radius: 8px;
  /* 每行的兜底同样是普通渐变 */
  background: linear-gradient(90deg, var(--gi-from), var(--gi-to));
}
.gi-row[data-active="true"] .gi-strip {
  outline: 2px solid oklch(0.62 0.15 255);
  outline-offset: 2px;
}
.gi-mid {
  width: 30px;
  height: 26px;
  border-radius: 7px;
  border: 1px solid rgba(0, 0, 0, 0.14);
  /* 中点色块:由 CSS 直接消费 --gi-from/--gi-to 与 color-mix */
  background: color-mix(in srgb, var(--gi-from), var(--gi-to));
}
.gi-label {
  width: 128px;
  flex: none;
  font-size: 12px;
  color: #5b6472;
}
.gi-label strong { display: block; color: #232a35; font-size: 12.5px; }
.gi-hueNote { font-size: 11px; color: #8a93a3; }
`;

/**
 * 渐变插值空间演示:space / hueStrategy 为 JS 型参数(拼串驱动),
 * from / to 为 CSS 变量型参数(兜底渐变与 color-mix 中点直接消费变量)。
 * hue 策略仅施加给柱坐标空间(本条目选项中即 oklch);其余空间省略 hue 关键词。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [, setTick] = useState(0);

  useEffect(
    () =>
      store.subscribe(() => {
        setTick((n) => n + 1);
      }),
    [store],
  );

  const space = store.get("space") as Space;
  const hue = store.get("hueStrategy") as string;
  const from = store.get("from") as string;
  const to = store.get("to") as string;

  const polar = POLAR.has(space);
  // in 子句:柱坐标空间携带 hue 策略;直角空间写 hue 关键词整条无效,故省略。
  // 位次按 MDN 惯用示例:角度在前,角度与 in 子句经 || 组合可互换(MDN 正式语法)。
  const inClause = polar ? `in ${space} ${hue} hue` : `in ${space}`;
  const gradient = `linear-gradient(90deg ${inClause}, ${from}, ${to})`;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="gi-stage">
        <div className="gi-main" style={{ background: gradient }} />
        <div className="gi-caption">{gradient}</div>
        <div className="gi-rows">
          {SPACES.map((s) => {
            const sPolar = POLAR.has(s);
            const sIn = sPolar ? `in ${s} ${hue} hue` : `in ${s}`;
            return (
              <div key={s} className="gi-row" data-active={s === space}>
                <span className="gi-label">
                  <strong>{s}</strong>
                  {sPolar ? <span className="gi-hueNote">hue {hue}</span> : <span className="gi-hueNote">hue 不适用 / n/a</span>}
                </span>
                <div
                  className="gi-strip"
                  style={{ background: `linear-gradient(90deg ${sIn}, ${from}, ${to})` }}
                />
                <span
                  className="gi-mid"
                  title={`color-mix(${sIn}, ${from}, ${to})`}
                  style={{ background: `color-mix(${sIn}, ${from}, ${to})` }}
                />
              </div>
            );
          })}
        </div>
        <div className="gi-caption">
          右侧小格 = 各空间 50% 中点 color-mix({`in …`}, from, to)。Right cells = 50% midpoints per space.
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
