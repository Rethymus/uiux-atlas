import { useEffect, useState, type ReactNode } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Overlay = "none" | "grid" | "keylines" | "safe";
type Audit = "pass" | "violations";
type Naming = "kebab" | "mixed";

const css = `
.isd-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
}
.isd-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  width: min(560px, 100%);
}
.isd-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.isd-tile {
  box-sizing: border-box;
  width: 84px;
  height: 84px;
  padding: 5px;
  border: 1px solid rgba(15, 23, 42, 0.14);
  border-radius: 12px;
  background: #fff;
  color: rgba(15, 23, 42, 0.8);
  transition: border-color 0.2s ease;
}
.isd-tile[data-defect="true"] {
  border: 2px solid rgba(220, 38, 38, 0.65);
}
.isd-name {
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  line-height: 1.2;
  color: rgba(15, 23, 42, 0.55);
}
.isd-name[data-bad="true"] { color: #dc2626; font-weight: 600; }
.isd-mini {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 6px 14px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 10px;
  background: #fff;
  color: rgba(15, 23, 42, 0.8);
}
.isd-mini span { font-size: 11px; color: rgba(15, 23, 42, 0.5); }
.isd-table { border-collapse: collapse; width: min(560px, 100%); font-size: 12px; }
.isd-table th, .isd-table td {
  border: 1px solid rgba(15, 23, 42, 0.12);
  padding: 6px 9px;
  text-align: left;
  vertical-align: top;
  line-height: 1.6;
}
.isd-table th { background: rgba(15, 23, 42, 0.04); font-weight: 600; }
.isd-ok { color: #15803d; }
.isd-bad { color: #c2410c; font-weight: 600; }
.isd-note {
  width: min(560px, 100%);
  margin: 0;
  font-size: 11px;
  line-height: 1.7;
  color: rgba(15, 23, 42, 0.55);
  background: #f8fafc;
  border: 1px dashed rgba(15, 23, 42, 0.18);
  border-radius: 10px;
  padding: 8px 12px;
}
.isd-note b { color: rgba(15, 23, 42, 0.75); }
@media (prefers-reduced-motion: reduce) {
  .isd-tile { transition: none; }
}
`;

interface MiniIcon {
  id: string;
  kebab: string;
  mixed?: string;
  paths: string[];
  circles?: { cx: number; cy: number; r: number }[];
  dots?: { cx: number; cy: number; r: number }[];
  /** violations 档注入的缺陷类别与违规元素(路径下标) */
  defect?: { kind: "grid" | "trim" | "stroke"; pathIndex?: number };
}

/** 合规集:全部整数坐标、内容在 live area 内、系统线宽统一 */
const ICONS_CLEAN: MiniIcon[] = [
  { id: "home", kebab: "home", paths: ["M4 11L12 4L20 11", "M6 10V20H18V10", "M10 20V16H14V20"] },
  { id: "search", kebab: "search", paths: ["M16 16L19 19"], circles: [{ cx: 11, cy: 11, r: 6 }] },
  { id: "plus", kebab: "plus", paths: ["M12 5V19", "M5 12H19"] },
  { id: "arrow-right", kebab: "arrow-right", paths: ["M4 12H19", "M13 6L19 12L13 18"] },
  { id: "bell", kebab: "bell", paths: ["M6 17V11A6 6 0 0 1 18 11V17Z", "M10 20H14"] },
  { id: "dot-circle", kebab: "dot-circle", paths: [], circles: [{ cx: 12, cy: 12, r: 8 }], dots: [{ cx: 12, cy: 12, r: 2 }] },
];

/** violations 档:注入三类真实缺陷(整数坐标 / 修剪区 / 线宽),命名违例由 naming 参数独立控制 */
const ICONS_BAD: MiniIcon[] = [
  {
    id: "home", kebab: "home",
    // 屋顶到 y=1:描边越出画布 → 违反「内容绝不可出修剪区」(07 §2)
    paths: ["M4 11L12 1L20 11", "M6 10V20H18V10", "M10 20V16H14V20"],
    defect: { kind: "trim", pathIndex: 0 },
  },
  {
    id: "search", kebab: "search",
    paths: ["M16 16L19.5 19.5"], // 端点非整数 → 违反「X/Y 坐标必须整数」(07 §2)
    circles: [{ cx: 11, cy: 11, r: 6 }],
    defect: { kind: "grid", pathIndex: 0 },
  },
  { id: "plus", kebab: "plus", paths: ["M12 5V19", "M5 12H19"] },
  {
    id: "arrow-right", kebab: "arrow-right",
    // 硬编码 1.5px → 违反系统线宽一致性(Heroicons 的 1.5 是独立体系,07 §1.3)
    paths: ["M4 12H19", "M13 6L19 12L13 18"],
    defect: { kind: "stroke" },
  },
  { id: "bell", kebab: "bell", paths: ["M6 17V11A6 6 0 0 1 18 11V17Z", "M10 20H14"] },
  { id: "dot-circle", kebab: "dot-circle", paths: [], circles: [{ cx: 12, cy: 12, r: 8 }], dots: [{ cx: 12, cy: 12, r: 2 }] },
];

/** Material 键程 shapes / 像素栅格 / 安全区叠加层(数值:07 §2/§3.2) */
function OverlayShapes({ kind }: { kind: Overlay }) {
  if (kind === "none") return null;
  const dash = "1.6 1.4";
  if (kind === "grid") {
    const lines: ReactNode[] = [];
    for (let i = 0; i <= 24; i += 2) {
      const major = i === 12;
      lines.push(
        <line key={`v${i}`} x1={i} y1={0} x2={i} y2={24} stroke={major ? "rgba(37,99,235,0.4)" : "rgba(37,99,235,0.16)"} strokeWidth={major ? 0.4 : 0.2} />,
        <line key={`h${i}`} x1={0} y1={i} x2={24} y2={i} stroke={major ? "rgba(37,99,235,0.4)" : "rgba(37,99,235,0.16)"} strokeWidth={major ? 0.4 : 0.2} />,
      );
    }
    return <g>{lines}</g>;
  }
  if (kind === "keylines") {
    return (
      <g fill="none" stroke="rgba(37,99,235,0.45)" strokeWidth={0.45} strokeDasharray={dash}>
        <rect x={3} y={3} width={18} height={18} rx={1} />
        <circle cx={12} cy={12} r={10} />
        <rect x={2} y={4} width={20} height={16} rx={1} />
        <rect x={4} y={2} width={16} height={20} rx={1} />
      </g>
    );
  }
  return (
    <g fill="none" strokeWidth={0.5} strokeDasharray={dash}>
      {/* live area 20×20(2dp padding,Material 07 §2) */}
      <rect x={2} y={2} width={20} height={20} stroke="rgba(22,163,74,0.55)" />
      {/* 1px 安全区边界(描边中心线距画布边 ≥1px,Lucide 07 §3.2) */}
      <rect x={1} y={1} width={22} height={22} stroke="rgba(217,119,6,0.55)" />
    </g>
  );
}

function IconTileSvg({ icon, overlay, strokeVar, size = 72 }: { icon: MiniIcon; overlay: Overlay; strokeVar: string; size?: number }) {
  const strokeDefect = icon.defect?.kind === "stroke";
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ strokeWidth: strokeDefect ? 1.5 : strokeVar }}
      aria-hidden="true"
    >
      <OverlayShapes kind={overlay} />
      {icon.circles?.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} />
      ))}
      {icon.paths.map((d, i) => (
        <path key={i} d={d} stroke={icon.defect?.pathIndex === i ? "#dc2626" : undefined} />
      ))}
      {icon.dots?.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="currentColor" stroke="none" />
      ))}
    </svg>
  );
}

/**
 * 图标系统设计演示:六枚迷你图标(24 网格、整数坐标、round 线帽)。
 * - stroke(CSS 变量)= 系统标准线宽,所有 tile 同步;
 * - overlay(JS)切换键程 shapes / 像素栅格 / 安全区叠加;
 * - audit(JS)注入三类真实缺陷并标红;
 * - naming(JS)切换 kebab-case / 混入违例名;
 * - 审计表逐条给出判定与调研出处。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [overlay, setOverlay] = useState(() => store.get("overlay") as Overlay);
  const [audit, setAudit] = useState(() => store.get("audit") as Audit);
  const [naming, setNaming] = useState(() => store.get("naming") as Naming);

  useEffect(
    () =>
      store.subscribe(() => {
        setOverlay(store.get("overlay") as Overlay);
        setAudit(store.get("audit") as Audit);
        setNaming(store.get("naming") as Naming);
      }),
    [store],
  );

  const stroke = store.get("stroke") as number;
  const bad = audit === "violations";
  const icons = bad ? ICONS_BAD : ICONS_CLEAN;
  const strokeVar = "var(--isd-stroke, 2px)";

  const MIXED_NAMES: Record<string, string> = { home: "Home", search: "search_icon", "arrow-right": "arrowRIGHT" };

  const rows = (() => {
    const namingBad = naming === "mixed";
    const gridBad = bad;
    const strokeBad = bad && stroke !== 1.5;
    const trimBad = bad;
    return [
      {
        check: "命名一致性",
        standard: "kebab-case、全小写、连字符分隔、无重复(社区通行惯例)",
        ok: !namingBad,
        detail: namingBad
          ? "3 个违例:Home(Pascal)、search_icon(snake)、arrowRIGHT(大小写混写)— 按名检索与 tree-shaking 都会漏"
          : "6/6 kebab-case,无重复",
      },
      {
        check: "像素栅格",
        standard: "X/Y 坐标必须整数,禁止小数(Material 官方规则,07 §2)",
        ok: !gridBad,
        detail: gridBad
          ? "search:手柄端点 (19.5, 19.5) 非整数 — 小数坐标在低分屏上落不到整像素,线条发虚"
          : "6/6 坐标全为整数",
      },
      {
        check: "线宽一致性",
        standard: `系统标准 = ${stroke}px(Lucide/Feather 源码 2px;Heroicons 1.5 是独立体系,07 §1)`,
        ok: !strokeBad,
        detail: strokeBad
          ? `arrow-right 硬编码 1.5px ≠ 系统标准 ${stroke}px — 例外体系不可混入;更粗细应走 wght 轴而非硬改`
          : stroke === 1.5
            ? "arrow-right 的 1.5px 恰与标准一致(巧合对齐,硬编码仍是坏味道)"
            : `6/6 = ${stroke}px`,
      },
      {
        check: "修剪区/安全区",
        standard: "live area 20×20(2dp padding),内容绝不可越出修剪区 = 完整 24dp(07 §2)",
        ok: !trimBad,
        detail: trimBad
          ? "home:屋顶画到 y=1,描边(radius cap)越出画布 — 修剪区红线"
          : "6/6 内容在修剪区内(live area 之外仅留作加重量)",
      },
    ];
  })();

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="isd-scene">
        <div className="isd-row">
          {icons.map((icon) => {
            const defectOn = bad && icon.defect != null;
            const name = naming === "mixed" && MIXED_NAMES[icon.kebab] ? MIXED_NAMES[icon.kebab] : icon.kebab;
            const nameBad = naming === "mixed" && MIXED_NAMES[icon.kebab] != null;
            return (
              <div className="isd-cell" key={icon.kebab}>
                <div className="isd-tile" data-defect={defectOn}>
                  <IconTileSvg icon={icon} overlay={overlay} strokeVar={strokeVar} />
                </div>
                <span className="isd-name" data-bad={nameBad}>{name}</span>
              </div>
            );
          })}
        </div>
        <div className="isd-mini">
          {icons.map((icon) => (
            <IconTileSvg key={`mini-${icon.kebab}`} icon={icon} overlay="none" strokeVar={strokeVar} size={24} />
          ))}
          <span>同图标 24px 原生档:线宽是 24 网格用户单位,显示放大到 72px 比例不变——改粗细换权重,不缩放</span>
        </div>
        <table className="isd-table">
          <thead>
            <tr>
              <th scope="col">审计项</th>
              <th scope="col">标准(出处)</th>
              <th scope="col">判定</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.check}>
                <td>{r.check}</td>
                <td>{r.standard}</td>
                <td className={r.ok ? "isd-ok" : "isd-bad"}>{r.ok ? "✓ 通过 — " : "✗ 违规 — "}{r.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="isd-note">
          <b>叠加层图例:</b>键程 shapes = 方 18×18 / 圆 Ø20 / 竖 16×20 / 横 20×16(Material 官方栅格);
          安全区档绿框 = live area 20×20(2dp padding),橙框 = 1px 安全区边界(Lucide:描边距边 ≥1px)。
          <b>验收巧思:</b>与 circle/square 并排整体模糊比灰度(视觉重量),镂空里塞得进一个 2px 圆(元素间距)——把「感觉不齐」变成可复核流程(Lucide 贡献规范)。
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
