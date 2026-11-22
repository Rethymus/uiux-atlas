import { Fragment, useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
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
import { oklchToSrgb, parseColorInput, rgb01ToHex, srgbToOklch } from "@/lib/color";

const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));
const clamp01 = (n: number): number => clamp(n, 0, 1);

/**
 * step 吸附(min 对齐)+ 范围截断(清单 slider-numberbox-linkage / number-input-silent-contract):
 * 三条改值路径的 step 契约统一——滑杆原生 snap、ScrubName 手动 snap(镜像本式)、
 * NumberBox 键入此前只 clamp 不 snap,现同样吸附,range 输入不再持有违反 step 的值。
 */
const snapToStep = (raw: number, min: number, max: number, step: number): number =>
  clamp(Number((min + Math.round((raw - min) / step) * step).toFixed(4)), min, max);

/**
 * 滑杆填充断点(spec §3「滑杆解剖」):--fill-percent = (值−min)/(max−min) × 100%,
 * 以内联 style 注入到 input[type=range],由 global.css 的 linear-gradient
 * 双色硬断点(accent → fill-2)消费。走 React 内联样式而非全局 input 事件监听:
 * 每次渲染与 store 值严格同步(Reset 等程序化改值也即时刷新,不会残留旧断点)。
 */
const fillPercent = (v: number, min: number, max: number): string =>
  `${((max > min ? (v - min) / (max - min) : 0) * 100).toFixed(2)}%`;

interface ParamPanelProps {
  entryId: string;
  schema: EntrySchema;
  locale: Locale;
}

/* ── 仪表台分组(spec §3:分组标题 几何/色彩/动效/阴影,--step--1 大写小标) ── */
type ParamKind = "geometry" | "color" | "motion" | "shadow";

const GROUP_TITLES: Record<ParamKind, { zh: string; en: string }> = {
  geometry: { zh: "几何", en: "Geometry" },
  color: { zh: "色彩", en: "Color" },
  motion: { zh: "动效", en: "Motion" },
  shadow: { zh: "阴影", en: "Shadow" },
};

/* 按参数类型确定性归组:dimension/number → 几何;color → 色彩;
   cubicBezier/enum → 动效;shadow → 阴影 */
const kindOf = (p: Param): ParamKind => {
  switch (p.type) {
    case "dimension":
    case "number":
      return "geometry";
    case "color":
      return "color";
    case "cubicBezier":
    case "enum":
      return "motion";
    case "shadow":
      return "shadow";
  }
};

/* dirty = 当前值偏离 schema 默认(JSON 序列化比较;值仅经 store set 流转,形状稳定) */
const isDirty = (p: Param, value: unknown): boolean =>
  JSON.stringify(value) !== JSON.stringify(p.default);

/**
 * 右栏参数面板(仪表台,spec §3):由 schema.params 自动生成控件。
 * 所有改动统一经 store.set 写入 → CSS 变量即时生效 / demo 订阅消费。
 * 仪表台化:分组标题 + 参数行[名称行 600 mono / 实时值 accent tabular-nums /
 * 迷你刻度条(纯 CSS 渐变)] + effect 说明;拖拽态(dirty/dragging)见样式层。
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

  const items = schema.params.map((p) => ({ p, kind: kindOf(p) }));
  const anyDirty = schema.params.some((p) => isDirty(p, store.get(p.name)));

  /* 分组折叠(ask 点名;spec §3 面板增补):同 kind 参数归并为一个组,原生
     <details> 基座(spec §3 Accordion 同法:零 JS 也有键盘支持,summary 44px 热区);
     全组默认 open——面板一步可达(spec §4.3)与首屏双要素(spec §5)不因折叠受损;
     展合瞬时(高频交互区不加装饰动画,spec §3「不做」),仅 chevron --dur-2 旋转。
     归并按 kind 全局去重(清单 group-no-collapse-dup):不能只与上一项比较——
     schema 交错排参时(如 glassmorphism blur几何 → fill/border色彩 → radius几何),
     相邻判定会让同一标题重复渲染;此处维护已见 kind 表,每组标题只出现一次,
     组序 = kind 首次出现序,组内行保持 schema 原序。 */
  const groups: { kind: ParamKind; items: typeof items }[] = [];
  const groupIndex = new Map<ParamKind, number>();
  for (const item of items) {
    const idx = groupIndex.get(item.kind);
    if (idx !== undefined) groups[idx].items.push(item);
    else {
      groupIndex.set(item.kind, groups.length);
      groups.push({ kind: item.kind, items: [item] });
    }
  }

  return (
    <section className="param-panel" aria-label={dict.entry.params}>
      <div className="param-panel-head">
        <span className="param-panel-title">{dict.entry.params}</span>
        <button
          type="button"
          className={anyDirty ? "param-reset is-dirty" : "param-reset"}
          onClick={() => store.reset()}
        >
          {dict.entry.resetAll}
        </button>
      </div>
      {groups.map((group) => (
        <details key={group.kind} className="param-group" open>
          <summary className="param-group-head">
            <h3 className="param-group-title">{GROUP_TITLES[group.kind][locale]}</h3>
            <span className="param-group-chevron" aria-hidden="true">
              ▾
            </span>
          </summary>
          {group.items.map(({ p }) => {
            const value = store.get(p.name);
            const dirty = isDirty(p, value);
            // 迷你刻度条:当前值在 min–max 间的位置(仅数值型参数,spec §3 仪表台细节)
            const meter =
              p.type === "dimension" || p.type === "number"
                ? clamp(
                    p.max > p.min ? ((value as number) - p.min) / (p.max - p.min) : 0,
                    0,
                    1,
                  )
                : null;
            return (
              <div className="param-row" key={p.name}>
                <div className="param-label-row">
                  {p.type === "dimension" || p.type === "number" ? (
                    <ScrubName param={p} store={store} />
                  ) : (
                    <span className="param-name">{p.name}</span>
                  )}
                  {/* 单参数复位(清单 no-per-param-reset):仅 dirty 时渲染,↺ 回该参数
                      default;hover 显示、focus-visible 常显、触屏(hover:none)恒显 */}
                  {dirty && (
                    <button
                      type="button"
                      className="param-reset-one"
                      aria-label={locale === "zh" ? `复位 ${p.name}` : `Reset ${p.name}`}
                      title={locale === "zh" ? `复位 ${p.name}` : `Reset ${p.name}`}
                      onClick={() => store.resetParam(p.name)}
                    >
                      ↺
                    </button>
                  )}
                  {/* aria-live=polite(清单 number-input-silent-contract):键入越界被
                      截断等实际提交值由读屏播报 */}
                  <span
                    className={dirty ? "param-value is-dirty" : "param-value"}
                    aria-live="polite"
                  >
                    {serializeParamValue(p, value)}
                  </span>
                </div>
                {meter !== null && (
                  <div
                    className="param-meter"
                    aria-hidden="true"
                    style={{ "--p": `${(meter * 100).toFixed(2)}%` } as CSSProperties}
                  />
                )}
                <ParamControl param={p} store={store} locale={locale} />
                <p className="param-effect">{p.effect[locale]}</p>
              </div>
            );
          })}
        </details>
      ))}
    </section>
  );
}

/* ---------- §6-7 参数值刮擦(scrub):拖参数名 = 改值(Figma inspector 手势) ---------- */

/**
 * 数值型参数(dimension/number)的参数名标签:横向拖动 = 刮擦改值,
 * Shift = 细步进(spec §6-7)。指针捕获 setPointerCapture(拖出标签仍跟踪);
 * 2px 死区防「点击误改」;值一律经 store.set 流转,与滑杆/数值输入框
 * 等价路径同入口(键盘等价 = NumberBox 方向键,已实现)。
 * 功能性手势而非装饰动效:RM 不降级(spec §6-7 如实标注);触屏可用
 * (touch-action none 只限 13px 小标签,global.css)。
 */
function ScrubName({ param, store }: { param: DimensionParam | NumberParam; store: ParamStore }) {
  const dragRef = useRef<{ id: number; startX: number; startVal: number; moved: boolean } | null>(
    null,
  );

  const endDrag = (el: HTMLSpanElement, pointerId: number) => {
    dragRef.current = null;
    if (el.hasPointerCapture(pointerId)) el.releasePointerCapture(pointerId);
    el.closest<HTMLElement>(".param-row")?.classList.remove("is-scrubbing");
  };

  return (
    <span
      className="param-name is-scrub"
      onPointerDown={(e) => {
        e.preventDefault(); // 防文本选中/焦点劫持
        e.currentTarget.setPointerCapture(e.pointerId);
        dragRef.current = {
          id: e.pointerId,
          startX: e.clientX,
          startVal: store.get(param.name) as number,
          moved: false,
        };
        e.currentTarget.closest<HTMLElement>(".param-row")?.classList.add("is-scrubbing");
      }}
      onPointerMove={(e) => {
        const d = dragRef.current;
        if (!d || d.id !== e.pointerId) return;
        const dx = e.clientX - d.startX;
        if (!d.moved && Math.abs(dx) < 2) return; // 死区:点击不误改值
        d.moved = true;
        const fine = e.shiftKey ? 0.1 : 1; // Shift = 细步进(spec §6-7)
        const range = param.max - param.min;
        const raw = d.startVal + (dx / 200) * range * fine; // 200px ≈ 刮完全程
        const snapped = param.min + Math.round((raw - param.min) / param.step) * param.step;
        store.set(param.name, clamp(Number(snapped.toFixed(4)), param.min, param.max));
      }}
      onPointerUp={(e) => endDrag(e.currentTarget, e.pointerId)}
      onPointerCancel={(e) => endDrag(e.currentTarget, e.pointerId)}
    >
      {param.name}
    </span>
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
    // 键入路径同样 step 吸附(清单 slider-numberbox-linkage:与滑杆原生 snap /
    // ScrubName 手动 snap 同一契约);滑杆自身 onChange 值已原生对齐,此处为幂等
    store.set(param.name, snapToStep(raw, param.min, param.max, param.step));
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
        style={
          {
            "--fill-percent": fillPercent(value, param.min, param.max), // spec §3 滑杆解剖:轨道填充断点
          } as CSSProperties
        }
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
 * 数值输入框(清单 number-input-silent-contract 定死的契约):
 * ① 提交值与显示文本立即一致——键入可解析值经 snapToStep(吸附+截断)提交后,
 *    若发生截断/吸附,马上 setText(提交值) 并短暂 data-flash 警示(不再静默等 blur);
 * ② 非法输入(空串、badInput、"1e999"→Infinity)不提交也不吞掉:data-invalid +
 *    aria-invalid 警示边,blur 回填实际提交值;
 * ③ 合法但文本形态不同的中间态("12.50")保留不打断,按「解析值 ≠ 提交值」
 *    判定 data-pending(accent 边 = 未确认);
 * ④ Enter = 确认(blur 归一化)。
 * store 值被外部改变(拖滑杆/复位)时仍重设文本(原契约保留)。
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
  const [invalid, setInvalid] = useState(false);
  const [flash, setFlash] = useState(false);
  const committedRef = useRef(value);
  const flashTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (value !== committedRef.current) {
      committedRef.current = value;
      setText(String(value));
    }
  }, [value]);

  useEffect(() => () => window.clearTimeout(flashTimer.current), []);

  /* 截断/吸附高亮:--warn 边短暂点亮(约 600ms,单发计时器防抖) */
  const pulseFlash = () => {
    setFlash(true);
    window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => setFlash(false), 600);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setText(raw);
    if (raw.trim() === "" || !Number.isFinite(Number(raw))) {
      setInvalid(true); // 非法:不提交,警示边 + aria-invalid(blur 回填)
      return;
    }
    const n = Number(raw);
    const committed = snapToStep(n, min, max, step);
    setInvalid(false);
    if (committed !== n) {
      pulseFlash(); // 越界/违反 step:截断为合法值 + 短暂高亮(非静默修正)
      setText(String(committed));
    }
    committedRef.current = committed;
    onCommit(committed);
  };

  const parsed = Number(text);
  const pending = text !== String(value) && !(Number.isFinite(parsed) && parsed === value);

  return (
    <input
      type="number"
      className="param-num"
      min={min}
      max={max}
      step={step}
      value={text}
      aria-label={label}
      aria-invalid={invalid || undefined}
      data-invalid={invalid || undefined}
      data-pending={pending || undefined}
      data-flash={flash || undefined}
      onBlur={() => {
        setText(String(value));
        setInvalid(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur(); // Enter = 确认(归一化文本)
      }}
      onChange={onChange}
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

/* ── 预设色板(清单 color-no-preset-swatches)── */

/**
 * 色板来源两级:schema 逐条目声明语义相关色板(ColorParam.presets,首选——如
 * glassmorphism fill 的霜面 α 阶、dimming-layer 的 scrim 阶);未声明时按该参数
 * 默认值程序化派生(站点推导,如实标注):默认值明度在常规域(0.05–0.95)→
 * L 阶(−0.15/默认/+0.10);半透明(α∈(0,1))→ α 阶(×0.5/默认/×2 封顶 1);
 * 两端极端且不透明(纯黑/纯白)派生无意义,如实返回空。派生只动默认值自身的
 * L 或 α,不引入新色相;输出与参数 format 同形(oklch 串 / hex 串)。
 */
function colorPresets(param: ColorParam): string[] {
  if (param.presets && param.presets.length > 0) return param.presets;
  const parsed = parseColorInput(param.default);
  if (!parsed.ok) return [];
  const { l, c, h: hRaw } = srgbToOklch(parsed.rgb01[0], parsed.rgb01[1], parsed.rgb01[2]);
  // 近无彩(C<0.02)时色相数值无意义(白 → h≈89.9° 一类噪声),归 0 保持预设串整洁
  const h = c < 0.02 ? 0 : hRaw;
  const a = parsed.alpha;
  const lLadder = l >= 0.05 && l <= 0.95;
  const aLadder = a > 0 && a < 1;
  if (!lLadder && !aLadder) return [];
  const steps = lLadder
    ? [clamp01(l - 0.15), l, clamp01(l + 0.1)]
    : [a * 0.5, a, Math.min(1, a * 2)];
  const serialize = (s: number): string =>
    param.format === "oklch"
      ? lLadder
        ? formatOklch({ l: s * 100, c, h, a })
        : formatOklch({ l: l * 100, c, h, a: s })
      : lLadder
        ? rgb01ToHex(oklchToSrgb(s, c, h).rgb, a)
        : rgb01ToHex(parsed.rgb01, s);
  return [...new Set(steps.map(serialize))];
}

/**
 * 一排预设 swatch(清单 color-no-preset-swatches):交互语义复用 .enum-seg 的
 * aria-pressed 选中语义,视觉本体是色块(.swatch-chip,透明色以 checkerboard
 * 井格衬底);点击即 set,aria-label/title = 预设色值串本身(读屏可读)。
 */
function SwatchRow({
  presets,
  value,
  onPick,
  name,
}: {
  presets: string[];
  value: string;
  onPick: (preset: string) => void;
  name: string;
}) {
  if (presets.length === 0) return null;
  return (
    <div className="swatch-row" role="group" aria-label={`${name} presets`}>
      {presets.map((preset) => (
        <button
          key={preset}
          type="button"
          className="swatch"
          aria-label={preset}
          title={preset}
          aria-pressed={preset === value}
          onClick={() => onPick(preset)}
        >
          <span className="swatch-chip" aria-hidden="true">
            <span className="swatch-fill" style={{ background: preset }} />
          </span>
        </button>
      ))}
    </div>
  );
}

/* 当前 oklch → 原生取色器的 #RRGGBB(不透明近似;α 由四轴滑杆独立承载) */
function oklchPickerHex(parts: OklchParts): string {
  return rgb01ToHex(oklchToSrgb(parts.l / 100, parts.c, parts.h).rgb);
}

function OklchControl({ param, store }: { param: ColorParam; store: ParamStore }) {
  const value = store.get(param.name) as string;
  const parts = parseOklch(value);
  if (!parts) return null; // 非法默认值:仅显示原始字符串,不做滑杆编辑

  const setPart = (key: keyof OklchParts, v: number) => {
    const cur = parseOklch(store.get(param.name) as string) ?? parts;
    store.set(param.name, formatOklch({ ...cur, [key]: v }));
  };

  /* 清单 oklch-no-preview-picker:原生取色器桥接——取色器 hex 经
     parseColorInput/srgbToOklch 反解回 L/C/H 写回 oklch;取色器无 α 通道,
     保留当前 α(不静默丢 alpha);预览色块即时反映四轴合成结果 */
  const pickFromSwatch = (hex6: string) => {
    const parsed = parseColorInput(hex6);
    if (!parsed.ok) return;
    const cur = parseOklch(store.get(param.name) as string) ?? parts;
    const { l, c, h } = srgbToOklch(parsed.rgb01[0], parsed.rgb01[1], parsed.rgb01[2]);
    store.set(
      param.name,
      formatOklch({ ...cur, l: clamp(l * 100, 0, 100), c: clamp(c, 0, 0.5), h }),
    );
  };

  const axes: { key: keyof OklchParts; label: string; min: number; max: number; step: number; digits: number }[] = [
    { key: "l", label: "L", min: 0, max: 100, step: 0.5, digits: 1 },
    { key: "c", label: "C", min: 0, max: 0.5, step: 0.005, digits: 3 },
    { key: "h", label: "H", min: 0, max: 360, step: 1, digits: 1 },
    { key: "a", label: "α", min: 0, max: 1, step: 0.01, digits: 2 },
  ];

  return (
    <div className="color-sliders-stack">
      <div className="color-preview-row">
        {/* 合成色预览(CSS 原生渲染 oklch();透明色以井格衬底) */}
        <span className="swatch-chip is-preview" aria-hidden="true">
          <span className="swatch-fill" style={{ background: value }} />
        </span>
        <input
          type="color"
          value={oklchPickerHex(parts)}
          aria-label={param.name}
          title={param.name}
          onChange={(e) => pickFromSwatch(e.target.value)}
        />
      </div>
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
              style={
                {
                  "--fill-percent": fillPercent(parts[ax.key], ax.min, ax.max), // oklch 四轴同样生效
                } as CSSProperties
              }
              onChange={(e) => setPart(ax.key, Number(e.target.value))}
            />
            <span className="color-axis-val">{parts[ax.key].toFixed(ax.digits)}</span>
          </Fragment>
        ))}
      </div>
      <SwatchRow
        presets={colorPresets(param)}
        value={value}
        onPick={(preset) => store.set(param.name, preset)}
        name={param.name}
      />
    </div>
  );
}

/* ---------- color / hex:原生取色器 + hex 文本输入 ---------- */

/**
 * 解析 #RGB/#RRGGBB/#RRGGBBAA → { rgb: #RRGGBB, alpha: 2 位 hex | null }。
 * (清单 oklch-no-preview-picker:normalizeHex 把 8 位 hex 静默裁成 RGB、
 * 取色器下一次 onChange 即丢 alpha 的缺陷在此修复——alpha 显式保留。)
 */
function splitHex(v: string): { rgb: string; alpha: string | null } | null {
  const s = v.trim().toLowerCase().replace(/^#/, "");
  const full = s.length === 3 || s.length === 4 ? s.split("").map((ch) => ch + ch).join("") : s;
  if (!/^[0-9a-f]{6}([0-9a-f]{2})?$/.test(full)) return null;
  return { rgb: `#${full.slice(0, 6)}`, alpha: full.length === 8 ? full.slice(6, 8) : null };
}

/**
 * hex 行(清单 oklch-no-preview-picker):原生取色器 + 文本输入(复用 .param-num
 * 契约,见 NumberBox 注)双通道——文本框接受 #RGB/#RRGGBB/#RRGGBBAA,合法即提交
 * (规范化 6/8 位小写),非法 data-invalid 警示、blur 回填,Enter 确认。
 */
function HexControl({ param, store }: { param: ColorParam; store: ParamStore }) {
  const value = store.get(param.name) as string;
  const [text, setText] = useState(value);
  const committedRef = useRef(value);

  useEffect(() => {
    if (value !== committedRef.current) {
      committedRef.current = value;
      setText(value);
    }
  }, [value]);

  const invalid = splitHex(text) === null;

  const commit = (raw: string) => {
    const parsed = splitHex(raw);
    if (!parsed) return; // 非法:警示边已标示(invalid),不提交
    const canonical = parsed.alpha ? `${parsed.rgb}${parsed.alpha}` : parsed.rgb;
    committedRef.current = canonical;
    setText(canonical);
    store.set(param.name, canonical);
  };

  return (
    <div className="color-sliders-stack">
      <div className="slider-row">
        <input
          type="color"
          value={splitHex(value)?.rgb ?? "#000000"}
          aria-label={param.name}
          onChange={(e) => {
            // 取色器只出不透明 RGB:原值含 α 时显式保留(不静默丢 alpha)
            const cur = splitHex(value);
            store.set(param.name, cur?.alpha ? `${e.target.value}${cur.alpha}` : e.target.value);
          }}
        />
        <input
          type="text"
          className="param-num param-hex"
          value={text}
          spellCheck={false}
          aria-label={`${param.name} hex`}
          aria-invalid={invalid || undefined}
          data-invalid={invalid || undefined}
          onBlur={() => {
            committedRef.current = value;
            setText(value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
          onChange={(e) => {
            setText(e.target.value);
            commit(e.target.value);
          }}
        />
      </div>
      <SwatchRow
        presets={colorPresets(param)}
        value={value}
        onPick={(preset) => store.set(param.name, preset)}
        name={param.name}
      />
    </div>
  );
}

/* ---------- cubicBezier:可拖拽 SVG 曲线编辑器 ---------- */

type BezierTuple = [number, number, number, number];

/* CSS 内置四系 + spec §2.6 站点缓动 token(M3 官方档:standard/decel/accel/spring);
   清单 bezier-presets-coverage:拖乱后一键回常用曲线。「default」预设 = param.default
   (条目自家 spring 类默认曲线,如 chart-animation [0.165,0.84,0.44,1]),在
   BezierControl 内与 param 组装。 */
const BEZIER_PRESETS: { label: string; value: BezierTuple }[] = [
  { label: "ease", value: [0.25, 0.1, 0.25, 1] },
  { label: "ease-in", value: [0.42, 0, 1, 1] },
  { label: "ease-out", value: [0, 0, 0.58, 1] },
  { label: "ease-in-out", value: [0.42, 0, 0.58, 1] },
  { label: "standard", value: [0.2, 0, 0, 1] },
  { label: "decel", value: [0.05, 0.7, 0.1, 1] },
  { label: "accel", value: [0.3, 0, 0.8, 0.15] },
  { label: "spring", value: [0.34, 1.3, 0.64, 1] },
];

function BezierControl({ param, store }: { param: BezierParam; store: ParamStore }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<0 | 1 | null>(null);
  const value = store.get(param.name) as BezierTuple;
  /* §6-17 幽灵预览:hover/聚焦预设按钮时叠一条虚线 ghost 曲线预览该预设,
     点击才提交;RM 直显/直隐(状态切换,无过渡动画)。 */
  const [ghost, setGhost] = useState<BezierTuple | null>(null);

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
  /* default 预设 = 该参数官方默认值(清单 bezier-presets-coverage),置首 */
  const presets: { label: string; value: BezierTuple }[] = [
    { label: "default", value: [...param.default] },
    ...BEZIER_PRESETS,
  ];

  return (
    <div className="bezier-box">
      <svg ref={svgRef} className="bezier-svg" viewBox="0 0 100 100" role="img" aria-label={param.name}>
        <line x1={0} y1={100} x2={px(x1)} y2={py(y1)} strokeWidth={1} style={{ stroke: "var(--border-strong)" }} />
        <line x1={100} y1={0} x2={px(x2)} y2={py(y2)} strokeWidth={1} style={{ stroke: "var(--border-strong)" }} />
        {/* §6-17:ghost 预览垫在当前实线下方,虚线弱化(text-faint 6.43:1 仅作非文本装饰,
            提交语义仍由 aria-pressed + onClick 承担) */}
        {ghost && (
          <path
            d={`M 0 100 C ${px(ghost[0])} ${py(ghost[1])}, ${px(ghost[2])} ${py(ghost[3])}, 100 0`}
            fill="none"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            style={{ stroke: "var(--text-faint)" }}
            aria-hidden="true"
          />
        )}
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
        {presets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            aria-pressed={value.every((n, i) => n === preset.value[i])}
            onPointerEnter={() => setGhost(preset.value)}
            onPointerLeave={() => setGhost(null)}
            onFocus={() => setGhost(preset.value)} /* 键盘等价:Tab 聚焦同权预览(§8) */
            onBlur={() => setGhost(null)}
            onClick={() => {
              setGhost(null);
              store.set(param.name, [...preset.value]);
            }}
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
      {layers.map((layer, i) => {
        const hex = splitHex(layer.color);
        return (
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
                  style={
                    {
                      "--fill-percent": fillPercent(layer[key], SHADOW_RANGES[key].min, SHADOW_RANGES[key].max), // shadow 层编辑器滑杆同样生效
                    } as CSSProperties
                  }
                  onChange={(e) => setNumeric(i, key, Number(e.target.value))}
                />
                <span className="color-axis-val">{layer[key]}</span>
              </Fragment>
            ))}
            <span className="color-axis-label">color</span>
            {hex ? (
              <input
                type="color"
                value={hex.rgb}
                aria-label={`${param.name} #${i + 1} color`}
                onChange={(e) =>
                  // 取色器只出不透明 RGB:层色含 α 时显式保留(不静默丢 alpha)
                  setColor(i, hex.alpha ? `${e.target.value}${hex.alpha}` : e.target.value)
                }
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
            {/* 逐层 color 预设色板(可选;schema.presets 声明时渲染,横跨整层三列) */}
            <SwatchRow
              presets={param.presets ?? []}
              value={layer.color}
              onPick={(preset) => setColor(i, preset)}
              name={`${param.name} #${i + 1} color`}
            />
          </div>
        );
      })}
    </div>
  );
}
