import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, KeyboardEvent as ReactKeyboardEvent } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface HandoffParams {
  stiffness: number;
  damping: number;
  handoff: string;
}

/** 按钮/键盘等效甩动的固定速度(px/s):演示用值,非官方数值(与 inertia-gesture 条目同口径) */
const FLICK_VELOCITY = 1500;
/** 速度采样平滑系数与停机阈值:演示用值;停机双阈值的思路对齐 Motion restSpeed/restDelta(调研 10§2.2/§6.3) */
const V_EMA = 0.25;
const REST_SPEED = 0.5;
const REST_DELTA = 0.5;
const MAX_SPRING_MS = 8000;

const clampAbs = (n: number, max: number): number => Math.min(max, Math.max(-max, n));

interface ZetaInfo {
  zeta: number;
  overshoot: number;
}

const computeZeta = (k: number, c: number): ZetaInfo => {
  const zeta = c / (2 * Math.sqrt(k)); // m=1,ζ = c/(2√(k·m))(调研 10§2.3/§4.3)
  const overshoot =
    zeta < 1 ? Math.exp((-Math.PI * zeta) / Math.sqrt(1 - zeta * zeta)) * 100 : 0;
  return { zeta: Math.round(zeta * 1000) / 1000, overshoot: Math.round(overshoot * 10) / 10 };
};

const css = `
.hc-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 12px; padding: 20px; overflow: hidden; }
.hc-lane {
  position: relative;
  flex: 1;
  min-height: 64px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--border) 30%, transparent);
  cursor: grab;
  user-select: none;
  touch-action: none;
}
.hc-lane:active { cursor: grabbing; }
.hc-lane:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.hc-marker {
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 50%;
  width: 0;
  border-left: 2px dashed var(--accent);
  opacity: 0.85;
  pointer-events: none;
}
.hc-marker::after {
  content: "目标 target";
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  white-space: nowrap;
  color: var(--accent);
}
.hc-puck {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 48px;
  height: 48px;
  margin: -24px 0 0 -24px;
  border-radius: 12px;
  background: linear-gradient(135deg, oklch(0.72 0.13 250), oklch(0.5 0.15 262));
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  pointer-events: none;
}
.hc-readout { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; font-size: 12px; color: var(--text-dim); }
.hc-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.hc-chip-warn { border-color: oklch(0.65 0.16 60); color: oklch(0.55 0.14 60); }
.hc-actions { display: flex; align-items: center; gap: 10px; }
.hc-btn {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 7px 18px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.hc-btn:hover { border-color: var(--accent); color: var(--accent); }
.hc-hint { margin: 0; font-size: 12px; color: var(--text-faint); line-height: 1.5; }
`;

/**
 * 曲线接力演示(调研 10§2.2 springSlot + §7.3 velocity 承诺的零依赖版):
 * - 跟手段:pointermove 直写 transform,1:1 跟手、零缓动(直接操纵,不属于可省略动效);
 * - 速度量测:指针采样 EMA 平滑(演示用系数),释放瞬间得到手势速度;
 * - 弹簧段:半隐式欧拉积分(v += a·dt; x += v·dt,a = (−k·x − c·v)/m,dt 钳制 ≤1/30s);
 *   handoff=on 时 v 初值 = 释放速度(速度随位置一起交接);off 时 v 清零(归零重启反例,10§7.3);
 * - 停机:|v| 与 |x| 双阈值 + 8s 兜底(文档阈值思路对齐 Motion restSpeed/restDelta,数值为演示值);
 * - reduced-motion:跟手保留,释放直出落点(x=0),不积分;
 * - 键盘:轨道可聚焦,Enter/Space 触发固定速度甩动(FLICK_VELOCITY=1500 px/s,演示值)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = (): HandoffParams => ({
    stiffness: store.get("stiffness") as number,
    damping: store.get("damping") as number,
    handoff: store.get("handoff") as string,
  });
  const [params, setParams] = useState<HandoffParams>(readParams);
  const [reduced, setReduced] = useState(false);
  const [zetaInfo, setZetaInfo] = useState<ZetaInfo>(() => computeZeta(params.stiffness, params.damping));
  const [releaseInfo, setReleaseInfo] = useState<{ v: number; inherited: boolean } | null>(null);

  const laneRef = useRef<HTMLDivElement>(null);
  const puckRef = useRef<HTMLDivElement>(null);
  const velLiveRef = useRef<HTMLSpanElement>(null);
  const xRef = useRef(0);
  const vRef = useRef(0);
  const rafRef = useRef(0);
  const dragRef = useRef<{ pointerId: number; startX: number; startVal: number; lastX: number; lastT: number } | null>(null);
  const limitRef = useRef(0);
  const paramsRef = useRef(params);
  paramsRef.current = params;
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const flickDirRef = useRef(1);

  useEffect(
    () =>
      store.subscribe(() => {
        const next = readParams();
        setParams(next);
        setZetaInfo(computeZeta(next.stiffness, next.damping));
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const measure = (): number => {
    const lane = laneRef.current;
    if (!lane) return 0;
    return Math.max(20, lane.clientWidth / 2 - 8 - 24);
  };

  const write = () => {
    const puck = puckRef.current;
    if (puck) puck.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
    if (velLiveRef.current) velLiveRef.current.textContent = `${Math.round(Math.abs(vRef.current))} px/s`;
  };

  /** 弹簧段:半隐式欧拉积分(调研 10§2.2),handoff=off 时速度清零(归零重启反例) */
  const startSpring = (releaseV: number) => {
    cancelAnimationFrame(rafRef.current);
    const inherit = paramsRef.current.handoff === "on";
    setReleaseInfo({ v: Math.round(Math.abs(releaseV)), inherited: inherit });
    if (reducedRef.current) {
      xRef.current = 0;
      vRef.current = 0;
      write();
      return;
    }
    vRef.current = inherit ? releaseV : 0;
    const k = paramsRef.current.stiffness;
    const c = paramsRef.current.damping;
    const start = performance.now();
    let last = start;
    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30); // 单步上限防跳帧爆炸(调研 10§2.2)
      last = now;
      const a = -k * xRef.current - c * vRef.current; // m=1:a = (−k·x − c·v)/m
      vRef.current += a * dt;
      xRef.current += vRef.current * dt;
      write();
      const rested = Math.abs(vRef.current) < REST_SPEED && Math.abs(xRef.current) < REST_DELTA;
      const timedOut = now - start > MAX_SPRING_MS;
      if (!rested && !timedOut) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        xRef.current = 0;
        vRef.current = 0;
        write();
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const release = () => {
    const v = clampAbs(vRef.current, 4000);
    startSpring(v);
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    cancelAnimationFrame(rafRef.current);
    setReleaseInfo(null);
    vRef.current = 0;
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startVal: xRef.current,
      lastX: e.clientX,
      lastT: performance.now(),
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    const limit = limitRef.current || measure();
    const nextX = clampAbs(d.startVal + (e.clientX - d.startX), limit);
    const now = performance.now();
    const dt = now - d.lastT;
    if (dt > 0) {
      const instV = ((nextX - d.lastX) / dt) * 1000;
      vRef.current = vRef.current * (1 - V_EMA) + instV * V_EMA; // EMA 平滑(演示用系数)
      d.lastX = nextX;
      d.lastT = now;
    }
    xRef.current = nextX;
    write();
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    dragRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    release();
  };

  const onPointerCancel = () => {
    if (dragRef.current) {
      dragRef.current = null;
      release();
    }
  };

  const flick = () => {
    const dir = flickDirRef.current;
    flickDirRef.current = -dir;
    setReleaseInfo(null);
    startSpring(FLICK_VELOCITY * dir);
  };

  const onLaneKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    flick();
  };

  const { zeta, overshoot } = zetaInfo;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="hc-stage">
        <div
          className="hc-lane"
          ref={laneRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onKeyDown={onLaneKeyDown}
          role="button"
          tabIndex={0}
          aria-label="接力轨道:按住拖拽跟手,松手交给弹簧;回车触发固定速度甩动 / handoff lane: drag to track, release to spring; Enter flicks"
        >
          <div className="hc-marker" />
          <div className="hc-puck" ref={puckRef} />
        </div>
        <div className="hc-readout">
          <span className="hc-chip">
            |v| <span ref={velLiveRef}>0 px/s</span>
          </span>
          <span className="hc-chip">
            ζ {zeta} · 预计过冲 {zeta >= 1 ? "0(过阻尼 / over-damped)" : `≈${overshoot}%`}
          </span>
          {releaseInfo && (
            <span className={`hc-chip${releaseInfo.inherited ? "" : " hc-chip-warn"}`}>
              {releaseInfo.inherited
                ? `释放 ${releaseInfo.v} px/s → 速度已交接 / velocity handed over`
                : `释放 ${releaseInfo.v} px/s → 归零重启(反例)/ restarted from rest`}
            </span>
          )}
          {reduced && <span className="hc-chip">reduced-motion: 释放直出落点 / release lands directly</span>}
        </div>
        <div className="hc-actions">
          <button type="button" className="hc-btn" onClick={flick}>
            甩一下 Flick
          </button>
        </div>
        <p className="hc-hint">
          慢慢拖再松手:方块几乎原地归位;快甩再松手:速度一起交棒,弹簧带着惯性冲过头再收住。切 handoff=off
          对照——同样的甩动,回程明显「没劲」,这就是 duration-based「从静止重启」的代价 / drag slowly and let go: the block
          settles in place; flick hard and release: the velocity hands over and the spring overshoots before settling. Switch
          handoff=off for the contrast — the same flick returns lifeless: the cost of restarting from rest.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
