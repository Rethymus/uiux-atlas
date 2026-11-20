import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface StaggerParams {
  stagger: number;
  items: number;
}

const LABELS = [
  { zh: "账户", en: "Account", icon: "👤" },
  { zh: "消息", en: "Inbox", icon: "✉️" },
  { zh: "日历", en: "Calendar", icon: "📅" },
  { zh: "相册", en: "Photos", icon: "🖼️" },
  { zh: "文件", en: "Files", icon: "📁" },
  { zh: "标签", en: "Tags", icon: "🏷️" },
  { zh: "设置", en: "Settings", icon: "⚙️" },
  { zh: "帮助", en: "Help", icon: "❓" },
];

const css = `
.st-stage { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 12px; padding: 20px; }
.st-list {
  width: min(340px, 100%);
  margin: 0 auto;
  padding: 10px;
  list-style: none;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface);
  display: grid;
  gap: 8px;
}
.st-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--border) 22%, transparent);
}
.st-idx {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, oklch(0.62 0.16 250), oklch(0.5 0.18 300));
  flex: none;
}
.st-label { font-size: 13px; }
.st-readout { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 8px 12px; font-size: 12px; color: var(--text-dim); }
.st-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.st-actions { display: flex; justify-content: center; }
.st-btn {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 7px 18px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.st-btn:hover { border-color: var(--accent); color: var(--accent); }
.st-hint { text-align: center; font-size: 12px; color: var(--text-faint); line-height: 1.5; }
`;

/**
 * 错峰入场演示:容器变体 staggerChildren 编排(JS 型参数 stagger / items,订阅 store)。
 * stagger 默认 40ms 为社区常见值,未证实——调研只记载 Motion 文档页含
 * 「delay and stagger」编排能力(调研 04§1.3),staggerChildren 单位为秒。
 * prefers-reduced-motion:去掉 16px 位移,改纯 opacity 交错淡入(淡入淡出降级)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = (): StaggerParams => ({
    stagger: store.get("stagger") as number,
    items: Number(store.get("items") as string),
  });

  const [params, setParams] = useState<StaggerParams>(readParams);
  const [runId, setRunId] = useState(0);
  const reduced = useReducedMotion() === true;

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  // 容器变体:只负责把错峰间隔下发给子项(staggerChildren 单位是秒)
  const listVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: params.stagger / 1000 } },
  };
  // 子项变体:reduce 时去掉位移,保留交错淡入的节奏
  const itemVariants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
      };

  const spread = params.stagger * Math.max(0, params.items - 1);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="st-stage">
        <motion.ul
          className="st-list"
          variants={listVariants}
          initial="hidden"
          animate="show"
          // 参数或重播变化 → 重挂载,整段编排从头重放
          key={`${runId}-${params.items}-${params.stagger}-${reduced ? "r" : "m"}`}
        >
          {LABELS.slice(0, params.items).map((it, i) => (
            <motion.li className="st-item" variants={itemVariants} key={it.en}>
              <span className="st-idx" aria-hidden="true">
                {i + 1}
              </span>
              <span className="st-label">
                {it.icon} {it.zh} {it.en}
              </span>
            </motion.li>
          ))}
        </motion.ul>
        <div className="st-readout">
          <span className="st-chip">
            stagger {params.stagger} ms × {params.items - 1} = 总铺开 spread {spread} ms
          </span>
          {reduced && (
            <span className="st-chip">reduced-motion: 纯淡入 no displacement</span>
          )}
        </div>
        <div className="st-actions">
          <button type="button" className="st-btn" onClick={() => setRunId((n) => n + 1)}>
            重播 Replay
          </button>
        </div>
        <p className="st-hint">
          第 i 项在 i × stagger 后启动;拖动 stagger 滑杆立即重播 /
          item i starts at i × stagger; dragging the slider replays instantly。
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
