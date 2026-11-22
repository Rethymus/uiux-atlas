import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const PULSE_MEANING: Record<string, { zh: string; en: string }> = {
  "1": { zh: "Selection 语义:取值变化的单短脉冲(HIG)", en: "Selection: one short pulse on value changes (HIG)" },
  "2": { zh: "Notification success 语义:两段脉冲(HIG)", en: "Notification success: two pulses (HIG)" },
  "4": { zh: "Notification error 语义:四段脉冲(HIG)", en: "Notification error: four pulses (HIG)" },
};

const css = `
.hb-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 12px; padding: 14px; }
.hb-stage {
  position: relative; flex: 1; min-height: 0;
  border: 1px solid var(--border); border-radius: 12px;
  background: color-mix(in srgb, var(--accent) 5%, var(--surface));
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;
}
.hb-play {
  border: 0; border-radius: 12px; padding: 10px 26px;
  font-size: 14px; font-weight: 600; cursor: pointer;
  background: color-mix(in srgb, var(--accent) 78%, black); color: #fff;
}
.hb-play:active { transform: translateY(1px); }
.hb-cancel {
  border: 1px solid var(--border); border-radius: 999px; padding: 5px 14px;
  font-size: 12px; cursor: pointer; background: var(--surface); color: inherit;
}
.hb-track { display: flex; align-items: center; gap: 3px; height: 34px; }
.hb-seg { height: 100%; border-radius: 4px; }
.hb-seg-on { background: color-mix(in srgb, var(--accent) 75%, transparent); }
.hb-seg-off { background: color-mix(in srgb, var(--border) 70%, transparent); }
.hb-dot { width: 12px; height: 12px; border-radius: 999px; background: color-mix(in srgb, var(--accent) 70%, transparent); }
.hb-scene[data-firing="true"] .hb-dot { animation: hb-beat var(--hb-total, 400ms) linear both; }
@keyframes hb-beat {
  0% { transform: scale(1); opacity: 0.5; }
  4% { transform: scale(1.9); opacity: 1; }
  9% { transform: scale(1); opacity: 0.55; }
  100% { transform: scale(1); opacity: 0.5; }
}
.hb-readout { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; color: var(--text-dim); }
.hb-chip {
  padding: 2px 10px; border-radius: 999px; border: 1px solid var(--border);
  background: var(--surface); font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-variant-numeric: tabular-nums;
}
.hb-chip-ok { border-color: color-mix(in srgb, var(--accent) 55%, var(--border)); color: var(--accent); }
.hb-chip-warn { color: oklch(0.65 0.15 70); }
.hb-chip-note { max-width: 100%; white-space: normal; line-height: 1.5; font-family: inherit; }
`;

/**
 * 触觉反馈演示(如实降级):
 * - pulses/on/off 三个 JS 型参数构造 pattern = [on, off, …, on](末段不带暂停);
 * - 播放按钮的 click 处理器内调用 navigator.vibrate(pattern)(sticky user activation);
 * - 能力检测:navigator.vibrate 缺失(iOS Safari 等)→ 仅视觉脉冲 + 明确标注;
 *   视觉脉冲(时间轴条 + 圆点节拍)任何环境都播,信息不依赖「振了」这一事件。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({
    pulses: store.get("pulses") as string,
    on: store.get("on") as number,
    off: store.get("off") as number,
  });
  const [params, setParams] = useState(readParams);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [firing, setFiring] = useState(false);
  const [nonce, setNonce] = useState(0);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  useEffect(() => {
    setSupported(typeof navigator !== "undefined" && typeof navigator.vibrate === "function");
  }, []);

  const count = Number(params.pulses);
  const pattern: number[] = [];
  for (let i = 0; i < count; i++) {
    pattern.push(params.on);
    if (i < count - 1) pattern.push(params.off);
  }
  const total = pattern.reduce((a, b) => a + b, 0);
  const meaning = PULSE_MEANING[params.pulses] ?? PULSE_MEANING["2"];

  const play = () => {
    setFiring(false);
    setNonce((n) => n + 1);
    // 下一帧再点亮,保证 reduced key 重触发;振动必须在用户手势处理器内同步调用
    if (supported) navigator.vibrate(pattern);
    requestAnimationFrame(() => setFiring(true));
    window.setTimeout(() => setFiring(false), total);
  };
  const cancel = () => {
    if (supported) navigator.vibrate(0); // 0 / 空数组取消(MDN)
    setFiring(false);
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      {/* nonce 作为 key 触发节拍动画重放 */}
      <div className="hb-scene" key={nonce} data-firing={firing} style={{ ["--hb-total" as string]: `${total}ms` }}>
        <div className="hb-stage">
          <div className="hb-track" aria-hidden="true">
            {pattern.map((ms, i) => (
              <div
                key={i}
                className={`hb-seg ${i % 2 === 0 ? "hb-seg-on" : "hb-seg-off"}`}
                style={{ width: `${Math.max(10, Math.round((ms / total) * 190))}px` }}
                title={`${i % 2 === 0 ? "vibrate" : "pause"} ${ms}ms`}
              />
            ))}
          </div>
          <div className="hb-track" aria-hidden="true">
            {Array.from({ length: count }, (_, i) => (
              <span key={i} className="hb-dot" style={{ animationDelay: `${i * (params.on + params.off)}ms` }} />
            ))}
          </div>
          <button type="button" className="hb-play" onClick={play}>
            播放振动 Play haptic
          </button>
          <button type="button" className="hb-cancel" onClick={cancel}>
            取消 vibrate(0)
          </button>
        </div>
        <div className="hb-readout">
          <span className="hb-chip">pattern = [{pattern.join(", ")}]</span>
          <span className="hb-chip">total {total}ms</span>
          <span className="hb-chip hb-chip-ok">{meaning.zh} / {meaning.en}</span>
          {supported === true && (
            <span className="hb-chip hb-chip-warn">navigator.vibrate 可用;桌面/静音/勿扰下可能无感(MDN)/ API present, but desktops/muted modes may stay silent</span>
          )}
          {supported === false && (
            <span className="hb-chip hb-chip-warn">本环境无 navigator.vibrate(iOS Safari 等)——仅视觉脉冲示意 / no navigator.vibrate here (iOS Safari etc.) — visual pulse only</span>
          )}
          <span className="hb-chip hb-chip-note">on/off 毫秒值为演示值(官方未给);需 sticky user activation(按钮即手势)/ on/off ms are demo values (none official); sticky user activation required (the button is the gesture)</span>
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
