import type { EntrySchema, Param, ParamValue, ShadowLayer, SnapshotItem } from "./types";

type Listener = () => void;

/**
 * 条目参数 store:同一页面的面板与演示岛屿共享同一实例(模块级注册表)。
 * CSS 变量型参数 → setProperty 即时生效;JS 型参数 → demo 订阅消费。
 */
export class ParamStore {
  readonly entryId: string;
  private schema: EntrySchema;
  private values = new Map<string, ParamValue>();
  private listeners = new Set<Listener>();
  private root: HTMLElement | null = null;

  constructor(entryId: string, schema: EntrySchema) {
    this.entryId = entryId;
    this.schema = schema;
    for (const p of schema.params) {
      this.values.set(p.name, structuredClone(p.default) as ParamValue);
    }
  }

  param(name: string): Param {
    const p = this.schema.params.find((x) => x.name === name);
    if (!p) throw new Error(`Unknown param "${name}" in entry "${this.entryId}"`);
    return p;
  }

  get(name: string): ParamValue {
    const v = this.values.get(name);
    if (v === undefined) throw new Error(`Unknown param "${name}" in entry "${this.entryId}"`);
    return v;
  }

  set(name: string, value: ParamValue): void {
    // 先验证该参数存在,再写入
    this.param(name);
    this.values.set(name, value);
    this.applyParam(name);
    this.emit();
  }

  /** 恢复全部官方默认值 */
  reset(): void {
    for (const p of this.schema.params) {
      this.values.set(p.name, structuredClone(p.default) as ParamValue);
    }
    this.applyAll();
    this.emit();
  }

  /** 由 DemoStage 挂载时调用:CSS 变量的宿主元素 */
  setRoot(el: HTMLElement | null): void {
    this.root = el;
    this.applyAll();
  }

  /** 当前值的只读快照 */
  snapshot(): Record<string, ParamValue> {
    return Object.fromEntries(this.values);
  }

  /** 导出给 agent 的 DTCG 兼容快照(值已序列化为可直接使用的 CSS/数值字符串) */
  exportSnapshot(): SnapshotItem[] {
    return this.schema.params.map((p) => ({
      name: p.name,
      value: serializeParamValue(p, this.get(p.name)),
    }));
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit(): void {
    for (const fn of this.listeners) fn();
  }

  private applyAll(): void {
    for (const p of this.schema.params) this.applyParam(p.name);
  }

  private applyParam(name: string): void {
    const p = this.param(name);
    if (!p.cssVar || !this.root) return;
    this.root.style.setProperty(p.cssVar, serializeParamValue(p, this.get(name)));
  }
}

/** 把参数值序列化为 CSS 可直接消费的字符串 */
export function serializeParamValue(p: Param, v: ParamValue): string {
  switch (p.type) {
    case "dimension":
      return `${v}${p.unit}`;
    case "number":
      return p.unit ? `${v}${p.unit}` : String(v);
    case "color":
    case "enum":
      return String(v);
    case "cubicBezier": {
      const [x1, y1, x2, y2] = v as [number, number, number, number];
      return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
    }
    case "shadow":
      return (v as ShadowLayer[])
        .map((l) => `${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${l.color}`)
        .join(", ");
  }
}

/** 同页面板/演示共享实例的注册表 */
const storeRegistry = new Map<string, ParamStore>();

export function getEntryStore(entryId: string, schema: EntrySchema): ParamStore {
  let store = storeRegistry.get(entryId);
  if (!store) {
    store = new ParamStore(entryId, schema);
    storeRegistry.set(entryId, store);
  }
  return store;
}
