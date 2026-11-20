import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/**
 * 模拟加载时长:1.8s,落在 NN/g「≥1s 必须给进度指示」区间(演示用值,非官方数值)。
 */
const FAKE_LOAD_MS = 1800;

const css = `
.sk-stage { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 20px; }
.sk-card {
  width: min(360px, 100%);
  padding: 20px 22px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface);
}
.sk-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  font-size: 12px;
  color: var(--text-dim);
}
.sk-reload {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px 14px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.sk-reload:hover { border-color: var(--accent); color: var(--accent); }

.sk-block {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: color-mix(in srgb, var(--text-dim) 22%, transparent);
}
.sk-block::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 45%;
  background: linear-gradient(90deg, transparent, hsla(0, 0%, 100%, 0.4), transparent);
  animation: sk-sweep var(--skeleton-duration, 1200ms) ease-in-out infinite;
}
@keyframes sk-sweep {
  from { transform: translateX(-100%); }
  to { transform: translateX(400%); }
}

/* M3:微妙脉动的视觉走向为「左上 → 右下」(调研 04§2.2) */
.sk-scene[data-dir="diagonal"] .sk-block::after {
  top: -50%;
  bottom: -50%;
  left: -50%;
  width: 200%;
  background: linear-gradient(120deg, transparent 42%, hsla(0, 0%, 100%, 0.38) 50%, transparent 58%);
  animation-name: sk-sweep-diag;
}
@keyframes sk-sweep-diag {
  from { transform: translate(-25%, -25%); }
  to { transform: translate(25%, 25%); }
}

.sk-head { display: flex; align-items: center; gap: 12px; }
.sk-avatar { width: 44px; height: 44px; border-radius: 50%; flex: none; }
.sk-headlines { flex: 1; display: grid; gap: 8px; }
.sk-line { height: 12px; }
.sk-rows { display: grid; gap: 12px; margin-top: 16px; }
.sk-row { display: flex; align-items: center; gap: 12px; }
.sk-icon { width: 26px; height: 26px; border-radius: 7px; flex: none; }

/* 内容态:尺寸与占位块对齐;淡入 200ms + M3 Standard easing(short4 档,调研 04§1.4/§2.6) */
.sk-content { animation: sk-reveal 200ms cubic-bezier(0.2, 0, 0, 1) both; }
@keyframes sk-reveal {
  from { opacity: 0; }
  to { opacity: 1; }
}
.sk-user { display: flex; align-items: center; gap: 12px; }
.sk-user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  flex: none;
  display: grid;
  place-items: center;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, oklch(0.62 0.16 250), oklch(0.5 0.18 300));
}
.sk-user-name { font-size: 15px; font-weight: 650; }
.sk-user-sub { font-size: 12px; color: var(--text-faint); margin-top: 3px; }
.sk-data { display: grid; gap: 12px; margin-top: 16px; }
.sk-item { display: flex; align-items: center; gap: 12px; font-size: 13px; }
.sk-dot { width: 26px; height: 26px; border-radius: 7px; flex: none; display: grid; place-items: center; font-size: 13px; background: color-mix(in srgb, var(--accent) 18%, transparent); }
.sk-item-label { flex: 1; }
.sk-item-val { font-variant-numeric: tabular-nums; color: var(--text-dim); }

.sk-note { margin: 14px 0 0; font-size: 12px; line-height: 1.6; color: var(--text-faint); }

@media (prefers-reduced-motion: reduce) {
  .sk-block::after { animation: none; }
  .sk-content { animation: none; }
}
`;

/**
 * 骨架 → 内容演示:pulse 为 CSS 型参数(DemoStage 注入 --skeleton-duration),
 * direction 为 JS 型参数(订阅 store 切 data-dir)。
 * M3 skeleton loaders:微妙脉动 + 完成后快速淡入(调研 04§2.2);
 * 淡入用 M3 short4 档 200ms + Standard easing(调研 04§1.4/§2.6);
 * reduced-motion:脉动停用、内容直出,加载状态由 aria-busy + 文字兜底。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [direction, setDirection] = useState(() => store.get("direction") as string);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setDirection(store.get("direction") as string);
      }),
    [store],
  );

  useEffect(() => {
    if (!loading) return;
    timerRef.current = window.setTimeout(() => setLoading(false), FAKE_LOAD_MS);
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [loading]);

  const reload = () => setLoading(true);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="sk-stage">
        <div className="sk-scene" data-dir={direction} aria-busy={loading}>
          <div className="sk-card">
            <div className="sk-status">
              <span role="status">{loading ? "加载中 Loading…" : "已就绪 Ready"}</span>
              <button type="button" className="sk-reload" onClick={reload}>
                重新加载 Reload
              </button>
            </div>
            {loading ? (
              <div aria-hidden="true">
                <div className="sk-head">
                  <div className="sk-avatar sk-block" />
                  <div className="sk-headlines">
                    <div className="sk-line sk-block" style={{ width: "62%" }} />
                    <div className="sk-line sk-block" style={{ width: "38%" }} />
                  </div>
                </div>
                <div className="sk-rows">
                  <div className="sk-row">
                    <div className="sk-icon sk-block" />
                    <div className="sk-line sk-block" style={{ width: "48%" }} />
                  </div>
                  <div className="sk-row">
                    <div className="sk-icon sk-block" />
                    <div className="sk-line sk-block" style={{ width: "64%" }} />
                  </div>
                  <div className="sk-row">
                    <div className="sk-icon sk-block" />
                    <div className="sk-line sk-block" style={{ width: "40%" }} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="sk-content">
                <div className="sk-user">
                  <div className="sk-user-avatar" aria-hidden="true">
                    A
                  </div>
                  <div>
                    <div className="sk-user-name">Ada Lovelace</div>
                    <div className="sk-user-sub">分析引擎 Analytical Engine · 1843</div>
                  </div>
                </div>
                <div className="sk-data">
                  <div className="sk-item">
                    <span className="sk-dot" aria-hidden="true">
                      ✎
                    </span>
                    <span className="sk-item-label">笔记 Notes</span>
                    <span className="sk-item-val">36</span>
                  </div>
                  <div className="sk-item">
                    <span className="sk-dot" aria-hidden="true">
                      ⚙
                    </span>
                    <span className="sk-item-label">程序 Programs</span>
                    <span className="sk-item-val">12</span>
                  </div>
                  <div className="sk-item">
                    <span className="sk-dot" aria-hidden="true">
                      ✉
                    </span>
                    <span className="sk-item-label">书信 Letters</span>
                    <span className="sk-item-val">84</span>
                  </div>
                </div>
              </div>
            )}
            <p className="sk-note">
              模拟加载 1.8s → 按 NN/g 阈值属于「≥1s 必须给进度指示」区间 / simulated 1.8s load →
              past NN/g's 1s threshold, an indicator is mandatory。
            </p>
          </div>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
