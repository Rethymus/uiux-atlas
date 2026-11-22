import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Tone = "plain" | "success" | "error" | "loading";

const EVENTS: { tone: Tone; time: string; title: string; desc: string }[] = [
  { tone: "plain", time: "09:00", title: "触发构建 Trigger build", desc: "main@8f2c1d 推送触发 CI" },
  { tone: "success", time: "09:02", title: "单元测试通过 Tests passed", desc: "214 个用例全部通过" },
  { tone: "plain", time: "09:07", title: "镜像构建完成 Image built", desc: "registry/app:8f2c1d 已推送" },
  { tone: "error", time: "09:11", title: "安全扫描告警 Scan alerts", desc: "发现 2 个高危依赖,已阻断发布" },
  { tone: "loading", time: "09:12", title: "部署进行中 Deploying…", desc: "灰度 10% 实例已就绪" },
];

const css = `
.tl-scene { width: min(520px, calc(100% - 48px)); }
.tl-list {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
}
.tl-list::before {
  content: "";
  position: absolute;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: #f0f0f0;                    /* colorBorderSecondary */
}
.tl-scene[data-mode="start"] .tl-list::before { left: 11px; }
.tl-scene[data-mode="end"] .tl-list::before { right: 11px; }
.tl-scene[data-mode="alternate"] .tl-list::before { left: 50%; translate: -50% 0; }
.tl-scene[data-reverse="on"] .tl-list { display: flex; flex-direction: column-reverse; }
.tl-item {
  position: relative;
  display: grid;
  align-items: start;
  gap: 12px;
  padding-block: 10px;
  animation: tl-in 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) both; /* motionDurationSlow + EaseOut */
}
.tl-item:nth-child(1) { animation-delay: 0ms; }
.tl-item:nth-child(2) { animation-delay: 60ms; }
.tl-item:nth-child(3) { animation-delay: 120ms; }
.tl-item:nth-child(4) { animation-delay: 180ms; }
.tl-item:nth-child(5) { animation-delay: 240ms; }
@keyframes tl-in {
  from { opacity: 0; translate: 0 8px; }
  to { opacity: 1; translate: 0 0; }
}
.tl-scene[data-mode="start"] .tl-item { grid-template-columns: 24px 1fr; }
.tl-scene[data-mode="end"] .tl-item { grid-template-columns: 1fr 24px; }
.tl-scene[data-mode="end"] .tl-body { grid-column: 1; }
.tl-scene[data-mode="end"] .tl-dot { grid-column: 2; }
.tl-scene[data-mode="alternate"] .tl-item { grid-template-columns: 1fr 24px 1fr; }
.tl-scene[data-mode="alternate"] .tl-dot { grid-column: 2; }
.tl-scene[data-mode="alternate"] .tl-body { grid-column: 3; }
.tl-scene[data-mode="alternate"] .tl-item:nth-child(odd) .tl-body {
  grid-column: 1;
  text-align: right;
}
.tl-dot {
  grid-row: 1;
  justify-self: center;
  width: 12px;
  height: 12px;
  margin-top: 4px;
  border-radius: 50%;
  background: var(--tl-accent, #1677ff);
}
.tl-item[data-tone="success"] .tl-dot { background: #52c41a; }
.tl-item[data-tone="error"] .tl-dot { background: #ff4d4f; }
.tl-item[data-tone="loading"] .tl-dot {
  background: transparent;
  border: 2px solid var(--tl-accent, #1677ff);
  border-top-color: transparent;
  animation: tl-spin 1s linear infinite;
}
@keyframes tl-spin {
  to { rotate: 360deg; }
}
.tl-mark {
  position: absolute;
  top: 4px;
  width: 12px;
  text-align: center;
  font-size: 10px;
  line-height: 12px;
  color: #fff;
}
.tl-scene[data-mode="start"] .tl-mark { left: 6px; }
.tl-scene[data-mode="end"] .tl-mark { right: 6px; }
.tl-scene[data-mode="alternate"] .tl-mark { left: 50%; translate: -50% 0; }
.tl-item[data-tone="success"] .tl-mark { color: #52c41a; }
.tl-item[data-tone="error"] .tl-mark { color: #ff4d4f; }
.tl-item[data-tone="success"] .tl-mark,
.tl-item[data-tone="error"] .tl-mark {
  top: 5px;
  font-weight: 700;
}
.tl-time {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);            /* TextTertiary */
  font-variant-numeric: tabular-nums;
}
.tl-title { margin-top: 2px; font-size: 14px; font-weight: 500; color: rgba(0, 0, 0, 0.88); }
.tl-desc { margin-top: 2px; font-size: 12px; color: rgba(0, 0, 0, 0.65); }
@media (max-width: 360px) {
  .tl-scene[data-mode="alternate"] .tl-item { grid-template-columns: 24px 1fr; }
  .tl-scene[data-mode="alternate"] .tl-dot,
  .tl-scene[data-mode="alternate"] .tl-mark { grid-column: 1; left: 6px; right: auto; translate: 0 0; }
  .tl-scene[data-mode="alternate"] .tl-body,
  .tl-scene[data-mode="alternate"] .tl-item:nth-child(odd) .tl-body {
    grid-column: 2;
    text-align: left;
  }
  .tl-scene[data-mode="alternate"] .tl-list::before { left: 11px; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .tl-item { animation: none; }
  .tl-item[data-tone="loading"] .tl-dot { animation: none; }
}
`;

/**
 * 时间线演示:CI 流水线事件流(触发→测试→镜像→扫描告警→部署中)。
 * accent 为 CSS 变量型参数(经 --tl-accent 注入,染普通节点与加载点);
 * mode / reverse 为 JS 型参数——订阅 store 后切 data-mode / data-reverse,
 * 由 demo 内 CSS 消费(start 左置 / alternate 中轴交替 / end 右置;倒序 column-reverse)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [mode, setMode] = useState(() => store.get("mode") as string);
  const [reverse, setReverse] = useState(() => store.get("reverse") as string);

  useEffect(
    () =>
      store.subscribe(() => {
        setMode(store.get("mode") as string);
        setReverse(store.get("reverse") as string);
      }),
    [store],
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="tl-scene" data-mode={mode} data-reverse={reverse}>
        <ol className="tl-list" aria-label="部署流水线时间线 Deploy pipeline timeline">
          {EVENTS.map((e) => (
            <li key={e.title} className="tl-item" data-tone={e.tone}>
              <span
                className="tl-dot"
                aria-hidden="true"
              />
              {e.tone === "success" && (
                <span className="tl-mark" aria-hidden="true">✓</span>
              )}
              {e.tone === "error" && (
                <span className="tl-mark" aria-hidden="true">✕</span>
              )}
              <div className="tl-body">
                <div className="tl-time">{e.time}</div>
                <div className="tl-title">{e.title}</div>
                <div className="tl-desc">{e.desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
