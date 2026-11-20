import { Fragment, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, KeyboardEvent as ReactKeyboardEvent } from "react";
import { getEntryStore, serializeParamValue } from "@/lib/store";
import type { ParamStore } from "@/lib/store";
import type {
  BezierParam,
  ColorParam,
  DimensionParam,
  EntrySchema,
  EnumParam,
  Locale,
  NumberParam,
  Param,
  ShadowLayer,
  ShadowParam,
} from "@/lib/types";
import { t } from "@/i18n/ui";

const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

interface ParamPanelProps {
  entryId: string;
  schema: EntrySchema;
  locale: Locale;
}

/**
 * 右栏参数面板:由 schema.params 自动生成控件。
 * 所有改动统一经 store.set 写入 → CSS 变量即时生效 / demo 订阅消费。
 */
export default function ParamPanel({ entryId, schema, locale }: ParamPanelProps) {
  const dict = t(locale);
  const store = getEntryStore(entryId, schema);
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setTick((n) => n + 1));
    return () => {
      unsubscribe();
    };
  }, [store]);

  return (
    <section className="param-panel" aria-label={dict.entry.params}>
      <div className="param-panel-head">
        <span className="param-panel-title">{dict.entry.params}</span>
        <button type="button" className="param-reset" onClick={() => store.reset()}>
          {dict.entry.resetAll}
        </button>
      </div>
      {schema.params.map((p) => (
        <div className="param-row" key={p.name}>
          <div className="param-label-row">
            <span className="param-name">{p.name}</span>
            <span className="param-value">{serializeParamValue(p, store.get(p.name))}</span>
          </div>
          <ParamControl param={p} store={store} locale={locale} />
          <p className="param-effect">{p.effect[locale]}</p>
        </div>
      ))}
    </section>
  );
}

/* ---------- 控件分发 ---------- */

function ParamControl({ param, store, locale }: { param: Param; store: ParamStore; locale: Locale }) {
  switch (param.type) {
    case "dimension":
    case "number":
      return <RangeControl param={param} store={store} />;
    case "color":
      return param.format === "oklch" ? (
        <OklchControl param={param} store={store} />
      ) : (
        <HexControl param={param} store={store} />
      );
    case "cubicBezier":
      return <BezierControl param={param} store={store} />;
    case "enum":
      return <EnumControl param={param} store={store} locale={locale} />;
    case "shadow":
      return <ShadowControl param={param} store={store} />;
  }
}

/* ---------- dimension / number:滑杆 + 数值输入 + 单位 ---------- */

function RangeControl({ param, store }: { param: DimensionParam | NumberParam; store: ParamStore }) {
  const value = store.get(param.name) as number;
  const commit = (raw: number) => {
    if (!Number.isFinite(raw)) return;
    store.set(param.name, clamp(raw, param.min, param.max));
  };

  return (
    <div className="slider-row">
      <input
        type="range"
        min={param.min}
        max={param.max}
        step={param.step}
        value={value}
        aria-label={param.name}
        onChange={(e) => commit(Number(e.target.value))}
      />
      <NumberBox
        value={value}
        min={param.min}
        max={param.max}
        step={param.step}
        label={param.name}
        onCommit={commit}
      />
      <span className="param-unit">{param.unit ?? ""}</span>
    </div>
  );
}

/**
 * 数值输入框:输入过程中保留用户的中间态("0."、"1e" 等),
 * store 值被外部改变(拖滑杆 / 复位)时才重设文本。
 */
function NumberBox({
  value,
  min,
  max,
  step,
  label,
  onCommit,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  label: string;
  onCommit: (raw: number) => void;
}) {
  const [text, setText] = useState(String(value));
  const committedRef = useRef(value);

  useEffect(() => {
    if (value !== committedRef.current) {
      committedRef.current = value;
      setText(String(value));
    }
  }, [value]);

  return (
    <input
      type="number"
      className="param-num"
      min={min}
      max={max}
      step={step}
      value={text}
      aria-label={label}
      onBlur={() => setText(String(value))}
      onChange={(e) => {
        const raw = e.target.value;
        setText(raw);
        const n = Number(raw);
        if (raw.trim() === "" || !Number.isFinite(n)) return;
        const clamped = clamp(n, min, max);
        committedRef.current = clamped;
        onCommit(clamped);
      }}
    />
  );
}

/* ---------- color / oklch:四滑杆 ---------- */

interface OklchParts {
  /** 0–100 */
  l: number;
  /** 0–0.5 */
  c: number;
  /** 0–360 */
  h: number;
  /** 0–1 */
  a: number;
}

const OKLCH_RE = /^oklch\(\s*(-?[\d.]+)(%?)\s+(-?[\d.]+)\s+(-?[\d.]+)(?:\s*\/\s*(-?[\d.]+)(%?))?\s*\)$/i;

/** 解析 oklch(L C H / A) 字符串;支持 L/alpha 的 % 形式与 L 的小数(0–1)形式 */
function parseOklch(v: string): OklchParts | null {
  const m = OKLCH_RE.exec(v.trim());
  if (!m) return null;
  const lRaw = Number(m[1]);
  const cRaw = Number(m[3]);
  const hRaw = Number(m[4]);
  const aRaw = m[5] !== undefined ? Number(m[5]) : 1;
  if (![lRaw, cRaw, hRaw, aRaw].every(Number.isFinite)) return null;
  let h = hRaw % 360;
  if (h < 0) h += 360;
  return {
    l: clamp(m[2] === "%" ? lRaw : lRaw * 100, 0, 100),
    c: clamp(cRaw, 0, 0.5),
    h,
    a: clamp(m[6] === "%" ? aRaw / 100 : aRaw, 0, 1),
  };
}

function formatOklch(p: OklchParts): string {
  const r = (n: number, d: number) => Number(n.toFixed(d));
  return `oklch(${r(p.l, 1)}% ${r(p.c, 4)} ${r(p.h, 1)} / ${r(p.a, 3)})`;
}

function OklchControl({ param, store }: { param: ColorParam; store: ParamStore }) {
  const parts = parseOklch(store.get(param.name) as string);
  if (!parts) return null; // 非法默认值:仅显示原始字符串,不做滑杆编辑

  const setPart = (key: keyof OklchParts, v: number) => {
    const cur = parseOklch(store.get(param.name) as string) ?? parts;
    store.set(param.name, formatOklch({ ...cur, [key]: v }));
  };

  const axes: { key: keyof OklchParts; label: string; min: number; max: number; step: number; digits: number }[] = [
    { key: "l", label: "L", min: 0, max: 100, step: 0.5, digits: 1 },
    { key: "c", label: "C", min: 0, max: 0.5, step: 0.005, digits: 3 },
    { key: "h", label: "H", min: 0, max: 360, step: 1, digits: 1 },
    { key: "a", label: "α", min: 0, max: 1, step: 0.01, digits: 2 },
  ];

  return (
    <div className="color-sliders">
      {axes.map((ax) => (
        <Fragment key={ax.key}>
          <span className="color-axis-label">{ax.label}</span>
          <input
            type="range"
            min={ax.min}
            max={ax.max}
            step={ax.step}
            value={parts[ax.key]}
            aria-label={`${param.name} ${ax.key}`}
            onChange={(e) => setPart(ax.key, Number(e.target.value))}
          />
          <span className="color-axis-val">{parts[ax.key].toFixed(ax.digits)}</span>
        </Fragment>
      ))}
    </div>
  );
}

/* ---------- color / hex:原生取色器 ---------- */

function normalizeHex(v: string): string {
  const s = v.trim().toLowerCase();
  if (/^#[0-9a-f]{6}$/.test(s)) return s;
  if (/^#[0-9a-f]{3}$/.test(s)) return `#${s[1]}${s[1]}${s[2]}${s[2]}${s[3]}${s[3]}`;
  if (/^#[0-9a-f]{8}$/.test(s)) return `#${s.slice(1, 7)}`; // 8 位含 alpha,取色器只取 rgb
  return "#000000";
}

function HexControl({ param, store }: { param: ColorParam; store: ParamStore }) {
  const value = store.get(param.name) as string;
  return (
    <div className="slider-row">
      <input
        type="color"
        value={normalizeHex(value)}
        aria-label={param.name}
        onChange={(e) => store.set(param.name, e.target.value)}
      />
      <span className="param-value">{value}</span>
    </div>
  );
}

/* ---------- cubicBezier:可拖拽 SVG 曲线编辑器 ---------- */

type BezierTuple = [number, number, number, number];

const BEZIER_PRESETS: { label: string; value: BezierTuple }[] = [
  { label: "ease", value: [0.25, 0.1, 0.25, 1] },
  { label: "ease-in", value: [0.42, 0, 1, 1] },
  { label: "ease-out", value: [0, 0, 0.58, 1] },
  { label: "ease-in-out", value: [0.42, 0, 0.58, 1] },
];

function BezierControl({ param, store }: { param: BezierParam; store: ParamStore }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<0 | 1 | null>(null);
  const value = store.get(param.name) as BezierTuple;

  const setPoint = (idx: 0 | 1, x: number, y: number) => {
    const cur = store.get(param.name) as BezierTuple;
    const next: BezierTuple = [...cur];
    next[idx * 2] = clamp(x, 0, 1);
    next[idx * 2 + 1] = clamp(y, -0.5, 1.5);
    store.set(param.name, next);
  };

  const pointFromEvent = (e: ReactPointerEvent<SVGCircleElement>): { x: number; y: number } | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    return {
      x: (e.clientX - rect.left) / rect.width,
      y: 1 - (e.clientY - rect.top) / rect.height, // viewBox y 轴向上
    };
  };

  const handleKeyDown = (idx: 0 | 1) => (e: ReactKeyboardEvent<SVGCircleElement>) => {
    const cur = store.get(param.name) as BezierTuple;
    const step = e.shiftKey ? 0.05 : 0.01;
    let x = cur[idx * 2];
    let y = cur[idx * 2 + 1];
    switch (e.key) {
      case "ArrowLeft":
        x -= step;
        break;
      case "ArrowRight":
        x += step;
        break;
      case "ArrowUp":
        y += step;
        break;
      case "ArrowDown":
        y -= step;
        break;
      default:
        return;
    }
    e.preventDefault();
    setPoint(idx, x, y);
  };

  const handleProps = (idx: 0 | 1) => ({
    className: "bezier-handle",
    tabIndex: 0,
    "aria-label": `${param.name} handle ${idx + 1}`,
    onPointerDown: (e: ReactPointerEvent<SVGCircleElement>) => {
      dragRef.current = idx;
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    onPointerMove: (e: ReactPointerEvent<SVGCircleElement>) => {
      if (dragRef.current !== idx) return;
      const p = pointFromEvent(e);
      if (p) setPoint(idx, p.x, p.y);
    },
    onPointerUp: (e: ReactPointerEvent<SVGCircleElement>) => {
      dragRef.current = null;
      if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    },
    onPointerCancel: () => {
      dragRef.current = null;
    },
    onLostPointerCapture: () => {
      dragRef.current = null;
    },
    onKeyDown: handleKeyDown(idx),
  });

  const [x1, y1, x2, y2] = value;
  const px = (n: number) => n * 100;
  const py = (n: number) => (1 - n) * 100;

  return (
    <div className="bezier-box">
      <svg ref={svgRef} className="bezier-svg" viewBox="0 0 100 100" role="img" aria-label={param.name}>
        <line x1={0} y1={100} x2={px(x1)} y2={py(y1)} strokeWidth={1} style={{ stroke: "var(--border-strong)" }} />
        <line x1={100} y1={0} x2={px(x2)} y2={py(y2)} strokeWidth={1} style={{ stroke: "var(--border-strong)" }} />
        <path
          d={`M 0 100 C ${px(x1)} ${py(y1)}, ${px(x2)} ${py(y2)}, 100 0`}
          fill="none"
          strokeWidth={2}
          style={{ stroke: "var(--accent)" }}
        />
        <circle cx={px(x1)} cy={py(y1)} r={5} fill="var(--accent)" stroke="var(--bg)" strokeWidth={1.5} {...handleProps(0)} />
        <circle cx={px(x2)} cy={py(y2)} r={5} fill="var(--accent)" stroke="var(--bg)" strokeWidth={1.5} {...handleProps(1)} />
      </svg>
      <div className="bezier-presets enum-seg" role="group" aria-label={`${param.name} presets`}>
        {BEZIER_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            aria-pressed={value.every((n, i) => n === preset.value[i])}
            onClick={() => store.set(param.name, [...preset.value])}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- enum:分段按钮 ---------- */

function EnumControl({ param, store, locale }: { param: EnumParam; store: ParamStore; locale: Locale }) {
  const value = store.get(param.name) as string;
  return (
    <div className="enum-seg" role="group" aria-label={param.name}>
      {param.options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => store.set(param.name, o.value)}
        >
          {o.label[locale]}
        </button>
      ))}
    </div>
  );
}

/* ---------- shadow:逐层编辑 ---------- */

const SHADOW_RANGES = {
  x: { min: -60, max: 60, step: 1 },
  y: { min: -60, max: 60, step: 1 },
  blur: { min: 0, max: 120, step: 1 },
  spread: { min: -60, max: 60, step: 1 },
} as const;

type ShadowNumKey = keyof Pick<ShadowLayer, "x" | "y" | "blur" | "spread">;

function ShadowControl({ param, store }: { param: ShadowParam; store: ParamStore }) {
  const layers = store.get(param.name) as ShadowLayer[];

  const setNumeric = (i: number, key: ShadowNumKey, v: number) => {
    const cur = store.get(param.name) as ShadowLayer[];
    const next = cur.map((l, idx) => {
      if (idx !== i) return l;
      const updated: ShadowLayer = { ...l };
      if (key === "x") updated.x = v;
      else if (key === "y") updated.y = v;
      else if (key === "blur") updated.blur = v;
      else updated.spread = v;
      return updated;
    });
    store.set(param.name, next);
  };

  const setColor = (i: number, color: string) => {
    const cur = store.get(param.name) as ShadowLayer[];
    store.set(param.name, cur.map((l, idx) => (idx === i ? { ...l, color } : l)));
  };

  const removeLayer = (i: number) => {
    const cur = store.get(param.name) as ShadowLayer[];
    if (cur.length <= 1) return; // 至少保留一层
    store.set(param.name, cur.filter((_, idx) => idx !== i));
  };

  return (
    <div className="shadow-layers">
      {layers.map((layer, i) => (
        <div className="shadow-layer" key={i}>
          {(["x", "y", "blur", "spread"] as const).map((key) => (
            <Fragment key={key}>
              <span className="color-axis-label">{key}</span>
              <input
                type="range"
                min={SHADOW_RANGES[key].min}
                max={SHADOW_RANGES[key].max}
                step={SHADOW_RANGES[key].step}
                value={layer[key]}
                aria-label={`${param.name} #${i + 1} ${key}`}
                onChange={(e) => setNumeric(i, key, Number(e.target.value))}
              />
              <span className="color-axis-val">{layer[key]}</span>
            </Fragment>
          ))}
          <span className="color-axis-label">color</span>
          {/^#[0-9a-fA-F]{3,8}$/.test(layer.color) ? (
            <input
              type="color"
              value={normalizeHex(layer.color)}
              aria-label={`${param.name} #${i + 1} color`}
              onChange={(e) => setColor(i, e.target.value)}
            />
          ) : (
            <input
              type="text"
              className="param-num"
              style={{ width: 140, textAlign: "left" }}
              value={layer.color}
              aria-label={`${param.name} #${i + 1} color`}
              onChange={(e) => setColor(i, e.target.value)}
            />
          )}
          <button
            type="button"
            className="shadow-remove"
            aria-label={`remove layer ${i + 1}`}
            disabled={layers.length <= 1}
            onClick={() => removeLayer(i)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
