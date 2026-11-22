import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import type { AnimationPlaybackControls, Transition } from "motion/react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 弹簧速度注入档固定参数(调研 10§4.2):stiffness 500 / damping 24 → ζ≈0.537 */
const SPRING_STIFFNESS = 500;
const SPRING_DAMPING = 24;
const SPRING_ZETA = SPRING_DAMPING / (2 * Math.sqrt(SPRING_STIFFNESS)); // ≈0.5367
const SPRING_WD = Math.sqrt(SPRING_STIFFNESS) * Math.sqrt(1 - SPRING_ZETA * SPRING_ZETA); // ≈18.88 rad/s
const SPRING_LAMBDA = SPRING_ZETA * Math.sqrt(SPRING_STIFFNESS); // λ=ζω₀ ≈ 11.99 s⁻¹

/** 每拍间隔 0.1s(半周期);拍数 = 包络衰减到 5% 所需(ln20/λλ)向上取整 */
const BEAT_DT = 0.1;

interface ShakeParams {
  amp: number;
  lambda: number;
}

/**
 * 指数衰减 keyframes 采样:x(t)=A·e^(−λt)·sin(ω_d t) 的极值点采样。
 * ω_d 取每拍半周期 0.1s(β=π/Δt≈31.4rad/s,对应社区复刻 macOS 抖动的 4–6 拍/~0.5s 量级,
 * 该量级为社区经验,未证实);包络每拍 ×e^(−λ·Δt)。
 */
function buildShake(amp: number, lambda: number) {
  const beats = Math.max(2, Math.ceil(Math.log(20) / (lambda * BEAT_DT)));
  const totalMs = beats * BEAT_DT * 1000;
  const stops: string[] = ["0% { transform: translateX(0); }"];
  for (let k = 0; k < beats; k++) {
    const t = (k + 0.5) * BEAT_DT;
    const pct = ((k + 0.5) / beats) * 100;
    const x = amp * Math.exp(-lambda * t);
    const sign = k % 2 === 0 ? -1 : 1;
    stops.push(`${pct.toFixed(1)}% { transform: translateX(${(sign * x).toFixed(2)}px); }`);
  }
  stops.push("100% { transform: translateX(0); }");
  return { keyframes: `@keyframes sd-shake { ${stops.join(" ")} }`, beats, totalMs };
}

const css = `
.sd-stage { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 8px; padding: 6px 6px; }
.sd-form { display: flex; gap: 8px; align-items: center; justify-content: center; }
.sd-input {
  width: min(220px, 46%); padding: 8px 12px; font-size: 13px; color: var(--text);
  background: var(--surface); border: 1px solid var(--border); border-radius: 9px;
}
.sd-input:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.sd-submit {
  border: 0; border-radius: 9px; padding: 8px 18px; font-size: 13px; font-weight: 600;
  color: #fff; cursor: pointer;
  background: linear-gradient(180deg, oklch(0.58 0.16 255), oklch(0.5 0.16 255));
}
.sd-submit:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.sd-msg { min-height: 16px; text-align: center; font-size: 12px; color: var(--text-faint); }
.sd-msg[data-kind="error"] { color: oklch(0.62 0.2 25); }
.sd-msg[data-kind="ok"] { color: oklch(0.6 0.14 150); }
.sd-lane-label { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-dim); }
.sd-tag { padding: 1px 9px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); font-variant-numeric: tabular-nums; }
.sd-field {
  width: min(260px, 58%); height: 40px; border-radius: 9px; margin: 0 auto;
  border: 1.5px solid var(--border); background: var(--surface);
  display: flex; align-items: center; padding: 0 12px; font-size: 12px; color: var(--text-faint);
}
.sd-field[data-error="true"] { border-color: oklch(0.62 0.2 25); }
.sd-field[data-shake="true"] { animation: sd-shake var(--sd-total, 500ms) ease-in-out both; }
.sd-hint { max-width: 580px; font-size: 12px; color: var(--text-faint); line-height: 1.6; text-align: center; }
@media (prefers-reduced-motion: reduce) {
  .sd-field[data-shake="true"] { animation: none; }
}
`;

/**
 * 错误抖动·指数衰减演示:双实现对照,同一 A/λ 参数源。
 * - 上轨 CSS keyframes:由 A/λ 采样生成衰减 @keyframes(事件级重生成,非逐帧写变量);
 * - 下轨弹簧速度注入:Motion animate(x, 0, { type:"spring", stiffness:500, damping:24, velocity:−A·ω_d }),
 *   欠阻尼弹簧按 e^(−λt) 自行衰减;λ_spring=ζω₀≈12 由固定档位决定,与上轨 λ(A/λ 可调)并排对照。
 * amp / lambda 为 JS 型参数;reduced-motion 时两条轨都不动,只留错误文案与描边。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = (): ShakeParams => ({
    amp: store.get("amp") as number,
    lambda: store.get("lambda") as number,
  });
  const [params, setParams] = useState<ShakeParams>(readParams);
  const [shakeId, setShakeId] = useState(0);
  const [msg, setMsg] = useState<{ text: string; kind: "idle" | "error" | "ok" }>({
    text: "密码少于 4 位触发错误抖动 / a password under 4 chars triggers the shake",
    kind: "idle",
  });
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion() === true;

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  const { keyframes, beats, totalMs } = useMemo(
    () => buildShake(params.amp, params.lambda),
    [params.amp, params.lambda],
  );

  const xSpring = useMotionValue(0);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    return () => {
      controlsRef.current?.stop();
    };
  }, []);

  const transition = (): Transition => ({
    type: "spring",
    stiffness: SPRING_STIFFNESS,
    damping: SPRING_DAMPING,
    velocity: -params.amp * SPRING_WD,
  });
  const transitionRef = useRef(transition);
  transitionRef.current = transition;

  const shake = () => {
    const value = inputRef.current?.value ?? "";
    if (value.trim().length < 4) {
      setError(true);
      setMsg({ text: "密码太短 · 抖动提示错误 / too short · shake signals the error", kind: "error" });
      if (!reduced) {
        setShakeId((n) => n + 1);
        controlsRef.current?.stop();
        controlsRef.current = animate(xSpring, 0, transitionRef.current());
      }
    } else {
      setError(false);
      setMsg({ text: "通过 · 无抖动 / accepted · no shake", kind: "ok" });
    }
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="sd-stage">
        <div className="sd-form">
          <input
            ref={inputRef}
            className="sd-input"
            type="password"
            placeholder="密码 password"
            aria-label="密码 password(4 位以上通过)"
            onKeyDown={(e) => {
              if (e.key === "Enter") shake();
            }}
          />
          <button type="button" className="sd-submit" onClick={shake}>
            登录 Sign in
          </button>
        </div>
        <div className="sd-msg" data-kind={msg.kind} role="status">
          {msg.text}
        </div>

        <div className="sd-lane-label">
          <span>CSS keyframes(衰减版)</span>
          <span className="sd-tag">A {params.amp}px</span>
          <span className="sd-tag">λ {params.lambda}s⁻¹</span>
          <span className="sd-tag">{beats} 拍 / {totalMs.toFixed(0)}ms</span>
        </div>
        <div className="sd-field" data-error={error ? "true" : "false"} data-shake={shakeId > 0 ? "true" : "false"} key={`kf-${shakeId}-${beats}-${params.amp}`} aria-hidden="true">
          ●●●●●●●● 水平抖动 horizontal shake
        </div>

        <div className="sd-lane-label">
          <span>弹簧速度注入(Motion velocity)</span>
          <span className="sd-tag">stiffness 500 / damping 24</span>
          <span className="sd-tag">ζ {SPRING_ZETA.toFixed(3)}</span>
          <span className="sd-tag">λ≈{SPRING_LAMBDA.toFixed(1)}s⁻¹(固定)</span>
          <span className="sd-tag">v₀ −{(params.amp * SPRING_WD).toFixed(0)}</span>
        </div>
        <div className="sd-field" data-error={error ? "true" : "false"} aria-hidden="true">
          <motion.div style={{ x: xSpring, display: "inline-block" }}>
            ⌁ 速度注入 → 指数衰减 oscillation
          </motion.div>
        </div>

        <p className="sd-hint">
          上轨按 x(t)=A·e^(−λt)·sin(ω_d t) 采样成衰减 keyframes(animate.css 的 ±10px 等幅版是它的不衰减特例);
          下轨给欠阻尼弹簧注入初速度,让物理自己衰减——中断/连按天然连续。
          两条轨参数体系不同:上轨 A/λ 可调,下轨由 500/24 定档 /
          Top lane samples the decaying keyframes from x(t)=A·e^(−λt)·sin(ω_d t); bottom lane injects velocity into an underdamped spring and lets physics decay it.
        </p>
        <style>{`${keyframes}\n${css}`}</style>
      </div>
    </DemoStage>
  );
}
