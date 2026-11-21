import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.btn-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  width: 100%;
  padding: 8px 12px;
}
.btn-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
.btn-col-label {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  letter-spacing: 0.02em;
}
/* 按钮基座:主色/圆角/字号/时长全部对齐 antd seed token */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  line-height: 1;
  height: 32px;
  padding: 0 12px;
  cursor: pointer;
  transition:
    background-color 0.1s,
    border-color 0.1s,
    color 0.1s,
    transform 0.1s;
}
.btn:focus-visible { outline: 2px solid #1677ff; outline-offset: 2px; }
/* 五档高度:16/24/32/40 = genControlHeight(×0.5/×0.75/×1/×1.25),48 为 demo 外推(未证实) */
.btn[data-size="xs"] { height: 16px; padding: 0 8px;  font-size: 12px; border-radius: 2px; }
.btn[data-size="sm"] { height: 24px; padding: 0 8px;  font-size: 12px; border-radius: 4px; }
.btn[data-size="md"] { height: 32px; padding: 0 12px; font-size: 14px; border-radius: 6px; }
.btn[data-size="lg"] { height: 40px; padding: 0 12px; font-size: 16px; border-radius: 8px; }
.btn[data-size="xl"] { height: 48px; padding: 0 16px; font-size: 16px; border-radius: 8px; }
/* 四变体 */
.btn[data-variant="primary"] { background: #1677ff; color: #fff; }
.btn[data-variant="primary"]:hover:not(:disabled) { background: #4096ff; }
.btn[data-variant="primary"]:active:not(:disabled) { background: #0958d9; transform: translateY(1px); }
.btn[data-variant="secondary"] { background: #fff; border-color: #d9d9d9; color: rgba(0, 0, 0, 0.88); }
.btn[data-variant="secondary"]:hover:not(:disabled) { border-color: #1677ff; color: #1677ff; }
.btn[data-variant="secondary"]:active:not(:disabled) { border-color: #0958d9; color: #0958d9; transform: translateY(1px); }
.btn[data-variant="text"] { background: transparent; color: rgba(0, 0, 0, 0.88); }
.btn[data-variant="text"]:hover:not(:disabled) { background: rgba(0, 0, 0, 0.06); }
.btn[data-variant="text"]:active:not(:disabled) { background: rgba(0, 0, 0, 0.15); transform: translateY(1px); }
.btn[data-variant="dashed"] { background: #fff; border-style: dashed; border-color: #d9d9d9; color: rgba(0, 0, 0, 0.88); }
.btn[data-variant="dashed"]:hover:not(:disabled) { border-color: #1677ff; color: #1677ff; }
.btn[data-variant="dashed"]:active:not(:disabled) { border-color: #0958d9; color: #0958d9; transform: translateY(1px); }
/* 禁用态:文字 25% / 填充 4% / 边框 #d9d9d9(antd 中性 token) */
.btn:disabled { cursor: not-allowed; color: rgba(0, 0, 0, 0.25); background: rgba(0, 0, 0, 0.04); border-color: #d9d9d9; }
.btn[data-variant="text"]:disabled { background: transparent; border-color: transparent; }
.btn[data-variant="primary"]:disabled { color: rgba(0, 0, 0, 0.25); }
/* 加载 spinner */
.btn-spin { width: 1em; height: 1em; animation: btn-rot 0.8s linear infinite; }
.btn-spin circle { stroke: currentColor; }
@keyframes btn-rot { to { transform: rotate(360deg); } }
/* 状态读数 */
.btn-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  max-width: 100%;
  overflow-wrap: anywhere;
}
@media (prefers-reduced-motion: reduce) {
  .btn { transition: none; }
  .btn:active:not(:disabled) { transform: none; }
  .btn-spin { animation: none; }
}
`;

function Spinner() {
  return (
    <svg className="btn-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="9"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="42"
        strokeDashoffset="12"
      />
    </svg>
  );
}

/**
 * 按钮演示:上排为四个变体的「活按钮」(全部可点、按压反馈),
 * 下排为参数按钮——variant/size/loading/disabled 四个 JS 型参数由 demo
 * 订阅 store 后落到 data-variant/data-size 属性与行为上;点击后短暂进入
 * loading 1.6s,演示转圈与交互阻断。APG Button:原生 button,Space/Enter 激活。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [variant, setVariant] = useState(() => store.get("variant") as string);
  const [size, setSize] = useState(() => store.get("size") as string);
  const [loadingParam, setLoadingParam] = useState(() => store.get("loading") as string);
  const [disabledParam, setDisabledParam] = useState(() => store.get("disabled") as string);
  const [busy, setBusy] = useState(false);
  const [clicks, setClicks] = useState(0);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setVariant(store.get("variant") as string);
      setSize(store.get("size") as string);
      setLoadingParam(store.get("loading") as string);
      setDisabledParam(store.get("disabled") as string);
    });
    return () => {
      unsubscribe();
      window.clearTimeout(timerRef.current);
    };
  }, [store]);

  const loading = loadingParam === "on" || busy;
  const disabled = disabledParam === "on" || loading;

  const fire = () => {
    if (disabled) return;
    setClicks((c) => c + 1);
    setBusy(true);
    timerRef.current = window.setTimeout(() => setBusy(false), 1600);
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="btn-scene">
        <div className="btn-row" role="group" aria-label="四个变体的活按钮 Variant showcase">
          <button type="button" className="btn" data-variant="primary" onClick={() => setClicks((c) => c + 1)}>
            主操作
          </button>
          <button type="button" className="btn" data-variant="secondary" onClick={() => setClicks((c) => c + 1)}>
            次操作
          </button>
          <button type="button" className="btn" data-variant="text" onClick={() => setClicks((c) => c + 1)}>
            文字按钮
          </button>
          <button type="button" className="btn" data-variant="dashed" onClick={() => setClicks((c) => c + 1)}>
            虚线按钮
          </button>
        </div>
        <div className="btn-col-label">参数按钮(点击试按压与 loading)Specimen — click for press + loading</div>
        <div className="btn-row">
          <button
            type="button"
            className="btn"
            data-variant={variant}
            data-size={size}
            disabled={disabled}
            aria-busy={loading ? "true" : undefined}
            onClick={fire}
          >
            {loading ? <Spinner /> : null}
            {loading ? "加载中 Loading" : "提交订单 Submit"}
          </button>
          <button
            type="button"
            className="btn"
            data-variant="secondary"
            disabled={disabledParam === "on"}
            onClick={() => setClicks((c) => c + 1)}
          >
            取消 Cancel
          </button>
        </div>
        <div className="btn-readout" aria-live="polite">
          variant={variant} · size={size} · loading={loadingParam === "on" || busy ? "on" : "off"} ·
          disabled={disabledParam} · clicks={clicks}
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
