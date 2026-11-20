import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface M3Token {
  /** Web 端官方 cubic-bezier 换算(m3.material.io/styles/motion/overview/specs,调研 02§B2) */
  curve: [number, number, number, number];
  /** 官方换算时长 ms(同上) */
  ms: number;
  /** Compose MotionScheme damping/androidx 官方源码数值(调研 02§B3) */
  damping: number;
  /** Compose MotionScheme stiffness(androidx 官方源码数值,调研 02§B3) */
  stiffness: number;
  /** 官方表未单列该曲线、沿用同行值时置 true,读数条如实注明 */
  approx?: boolean;
}

/**
 * 12 枚 spring composite token 官方数值表。
 * 曲线/时长 = m3.material.io/styles/motion/overview/specs 的 Web 换算(调研 02§B2);
 * damping/stiffness = androidx 官方源码 ExpressiveMotionTokens.kt / StandardMotionTokens.kt(调研 02§B3)。
 * 注:Standard spatial 在官方表为同一曲线行(fast/default 列出、slow 750ms 同行),slow 未单列曲线,
 *     故 standard|slow|spatial 沿用 (0.27, 1.06, 0.18, 1.00) 配 750ms 并标记 approx。
 */
const TOKENS: Record<string, M3Token> = {
  "expressive|fast|spatial": { curve: [0.42, 1.67, 0.21, 0.9], ms: 350, damping: 0.6, stiffness: 800 },
  "expressive|default|spatial": { curve: [0.38, 1.21, 0.22, 1.0], ms: 500, damping: 0.8, stiffness: 380 },
  "expressive|slow|spatial": { curve: [0.39, 1.29, 0.35, 0.98], ms: 650, damping: 0.8, stiffness: 200 },
  "expressive|fast|effects": { curve: [0.31, 0.94, 0.34, 1.0], ms: 150, damping: 1.0, stiffness: 3800 },
  "expressive|default|effects": { curve: [0.34, 0.8, 0.34, 1.0], ms: 200, damping: 1.0, stiffness: 1600 },
  "expressive|slow|effects": { curve: [0.34, 0.88, 0.34, 1.0], ms: 300, damping: 1.0, stiffness: 800 },
  "standard|fast|spatial": { curve: [0.27, 1.06, 0.18, 1.0], ms: 350, damping: 0.9, stiffness: 1400 },
  "standard|default|spatial": { curve: [0.27, 1.06, 0.18, 1.0], ms: 500, damping: 0.9, stiffness: 700 },
  "standard|slow|spatial": { curve: [0.27, 1.06, 0.18, 1.0], ms: 750, damping: 0.9, stiffness: 300, approx: true },
  "standard|fast|effects": { curve: [0.31, 0.94, 0.34, 1.0], ms: 150, damping: 1.0, stiffness: 3800 },
  "standard|default|effects": { curve: [0.34, 0.8, 0.34, 1.0], ms: 200, damping: 1.0, stiffness: 1600 },
  "standard|slow|effects": { curve: [0.34, 0.88, 0.34, 1.0], ms: 300, damping: 1.0, stiffness: 800 },
};

const css = `
.m3-scene { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.m3-row { display: flex; gap: 16px; align-items: stretch; }
.m3-main { flex: 1; min-width: 0; display: flex; flex-direction: column; justify-content: center; gap: 8px; }
.m3-track {
  position: relative; height: 54px; border-radius: 13px;
  background: color-mix(in srgb, var(--border) 30%, transparent);
  cursor: pointer;
}
.m3-track:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.m3-chip {
  position: absolute; top: 50%; left: 8px; width: 64px; height: 34px; margin-top: -17px;
  border-radius: 999px;
  background: linear-gradient(100deg, oklch(0.72 0.16 260), oklch(0.62 0.19 300));
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  color: #fff; font-size: 11px; line-height: 34px; text-align: center;
  will-change: transform;
}
.m3-preview { flex: 0 0 auto; border: 1px solid var(--border); border-radius: 10px; background: var(--surface); overflow: hidden; align-self: center; }
.m3-preview svg { display: block; }
.m3-dot-x { animation: m3-dot-x var(--m3-dur, 500ms) linear infinite alternate; }
.m3-dot-y { animation: m3-dot-y var(--m3-dur, 500ms) var(--m3-curve, cubic-bezier(0.38, 1.21, 0.22, 1)) infinite alternate; }
@keyframes m3-dot-x { from { transform: translateX(0px); } to { transform: translateX(100px); } }
@keyframes m3-dot-y { from { transform: translateY(0px); } to { transform: translateY(-100px); } }
.m3-readout { display: flex; flex-wrap: wrap; gap: 6px; font-size: 12px; color: var(--text-dim); }
.m3-chipread { padding: 2px 10px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-variant-numeric: tabular-nums; }
.m3-warn { color: oklch(0.65 0.15 70); }
.m3-footer { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 12px; color: var(--text-faint); }
.m3-replay { border: 1px solid var(--border); border-radius: 999px; padding: 4px 14px; font-size: 12px; cursor: pointer; background: var(--surface); color: inherit; }
.m3-scene[data-reduced="true"] .m3-dot-x { animation: none; transform: translateX(100px); }
.m3-scene[data-reduced="true"] .m3-dot-y { animation: none; transform: translateY(-100px); }
`;

const fmtCurve = (c: [number, number, number, number]): string =>
  `cubic-bezier(${c[0]}, ${c[1]}, ${c[2]}, ${c[3]})`;

/**
 * M3 spring composite tokens 演示:芯片动画消费当前 token 的官方 Web 换算
 * (cubic-bezier 曲线 + 时长,WAAPI 驱动、切换即重跑);SVG 示踪点经 CSS 变量
 * (--m3-curve/--m3-dur)复现同一曲线;读数条并列 Compose MotionScheme 的
 * damping/stiffness(官方 androidx 数值)。reduced-motion 直出终态。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readCombo = () => ({
    scheme: store.get("scheme") as string,
    speed: store.get("speed") as string,
    type: store.get("type") as string,
  });
  const [combo, setCombo] = useState(readCombo);
  const reduced = useReducedMotion() === true;

  const trackRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);
  const distRef = useRef(200);
  const [dist, setDist] = useState(200);

  const key = `${combo.scheme}|${combo.speed}|${combo.type}`;
  const token = TOKENS[key];

  useEffect(
    () =>
      store.subscribe(() => {
        setCombo(readCombo());
      }),
    [store],
  );

  // 轨道宽度 → 芯片位移距离(只动 transform)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDist(Math.max(40, track.clientWidth - 8 - 64));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);
  distRef.current = dist;

  // 芯片:当前 token 曲线 + 时长的循环往复;参数改动即取消旧动画重跑(切换即换动画)
  useEffect(() => {
    const chip = chipRef.current;
    if (!chip) return;
    animRef.current?.cancel();
    if (reduced || typeof chip.animate !== "function") {
      chip.style.transform = `translateX(${distRef.current}px)`; // 直出终态
      return;
    }
    chip.style.transform = "";
    const anim = chip.animate(
      [{ transform: "translateX(0px)" }, { transform: `translateX(${distRef.current}px)` }],
      { duration: token.ms, easing: fmtCurve(token.curve), iterations: Infinity, direction: "alternate" },
    );
    animRef.current = anim;
    return () => anim.cancel();
  }, [key, reduced, dist, token]);

  // 示踪点用的 CSS 变量(随 combo 更新)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.setProperty("--m3-curve", fmtCurve(token.curve));
    track.style.setProperty("--m3-dur", `${token.ms}ms`);
  }, [token]);

  const pathD = useMemo(() => {
    const [x1, y1, x2, y2] = token.curve;
    return `M 0 100 C ${x1 * 100} ${(1 - y1) * 100}, ${x2 * 100} ${(1 - y2) * 100}, 100 0`;
  }, [token]);

  const replay = () => {
    // 触发重跑:重新执行芯片 effect 依赖之外的「手动重跑」
    const chip = chipRef.current;
    if (!chip || reduced || typeof chip.animate !== "function") return;
    animRef.current?.cancel();
    chip.style.transform = "";
    const anim = chip.animate(
      [{ transform: "translateX(0px)" }, { transform: `translateX(${distRef.current}px)` }],
      { duration: token.ms, easing: fmtCurve(token.curve), iterations: Infinity, direction: "alternate" },
    );
    animRef.current = anim;
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="m3-scene" data-reduced={reduced}>
        <div className="m3-row">
          <div className="m3-main">
            <div className="m3-track" ref={trackRef} role="button" tabIndex={0}
              aria-label="重播当前 token 动画 replay the current token animation"
              onClick={replay}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  replay();
                }
              }}
            >
              <div className="m3-chip" ref={chipRef}>{token.ms}ms</div>
            </div>
            <div className="m3-readout">
              <span className="m3-chipread">{combo.scheme} · {combo.speed} · {combo.type}</span>
              <span className="m3-chipread">{fmtCurve(token.curve)}</span>
              <span className="m3-chipread">Compose damping {token.damping} / stiffness {token.stiffness}</span>
              {token.approx && (
                <span className="m3-chipread m3-warn">slow spatial 曲线官方表未单列,沿用同行值 / slow-spatial curve not listed separately</span>
              )}
            </div>
          </div>
          <div className="m3-preview">
            <svg width={80} height={152} viewBox="0 -70 100 190" role="img" aria-label="当前 token 缓动曲线 current token curve">
              <rect x={0} y={-70} width={100} height={70} fill="oklch(0.62 0.16 25 / 0.12)" />
              <line x1={0} y1={100} x2={100} y2={0} stroke="var(--border-strong)" strokeWidth={1} strokeDasharray="3 3" />
              <line x1={0} y1={0} x2={100} y2={0} stroke="var(--border)" strokeWidth={1} />
              <line x1={0} y1={100} x2={100} y2={100} stroke="var(--border)" strokeWidth={1} />
              <path d={pathD} fill="none" stroke="var(--accent)" strokeWidth={2.5} />
              <g className="m3-dot-x" key={key}>
                <circle className="m3-dot-y" cx={0} cy={100} r={4.5} fill="oklch(0.62 0.2 40)" stroke="var(--bg)" strokeWidth={1.5} />
              </g>
            </svg>
          </div>
        </div>
        <div className="m3-footer">
          <button type="button" className="m3-replay" onClick={replay}>
            重播 Replay
          </button>
          <span>切换 scheme/speed/type 即以新 token 重跑 / switching any enum re-runs with the new token。</span>
          {reduced && <span className="m3-chipread">reduced-motion: 直出终态 / final state only</span>}
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
