/** 条目一级分类 */
export const CATEGORIES = [
  { id: "styles", zh: "风格流派", en: "Styles" },
  { id: "materials", zh: "材质与光影", en: "Materials" },
  { id: "motion", zh: "动效与微交互", en: "Motion" },
  { id: "color", zh: "色彩与主题", en: "Color" },
  { id: "type", zh: "排版", en: "Typography" },
  { id: "layout", zh: "布局与响应式", en: "Layout" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

/** 来源体系 */
export const SYSTEMS = [
  { id: "apple", zh: "Apple HIG", en: "Apple HIG" },
  { id: "m3", zh: "Material 3", en: "Material 3" },
  { id: "fluent", zh: "Fluent", en: "Fluent" },
  { id: "web-std", zh: "Web 标准", en: "Web Standard" },
  { id: "component-lib", zh: "组件库", en: "Component Lib" },
  { id: "community", zh: "社区流派", en: "Community" },
] as const;

export type SystemId = (typeof SYSTEMS)[number]["id"];

export type Locale = "zh" | "en";
export interface LocalizedText {
  zh: string;
  en: string;
}

/** 阴影单层 */
export interface ShadowLayer {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
}

interface ParamBase {
  /** 参数名(英文原词,如 blur / dampingFraction) */
  name: string;
  /** 这个参数对效果的影响说明 */
  effect: LocalizedText;
  /** CSS 变量型参数的变量名;缺省 = JS 型参数(demo 自行消费) */
  cssVar?: string;
}

export interface DimensionParam extends ParamBase {
  type: "dimension";
  unit: string;
  min: number;
  max: number;
  step: number;
  default: number;
}

export interface NumberParam extends ParamBase {
  type: "number";
  min: number;
  max: number;
  step: number;
  default: number;
  unit?: string;
}

export interface ColorParam extends ParamBase {
  type: "color";
  format: "oklch" | "hex";
  default: string;
}

export interface BezierParam extends ParamBase {
  type: "cubicBezier";
  default: [number, number, number, number];
}

export interface EnumOption {
  value: string;
  label: LocalizedText;
}

export interface EnumParam extends ParamBase {
  type: "enum";
  options: EnumOption[];
  default: string;
}

export interface ShadowParam extends ParamBase {
  type: "shadow";
  default: ShadowLayer[];
}

export type Param =
  | DimensionParam
  | NumberParam
  | ColorParam
  | BezierParam
  | EnumParam
  | ShadowParam;

export type ParamValue = number | string | [number, number, number, number] | ShadowLayer[];

/** 快照项:导出给 agent 的 DTCG 兼容形态 */
export interface SnapshotItem {
  name: string;
  value: string;
}

/** 条目 schema(schema.json 的形状) */
export interface EntrySchema {
  name: string;
  aliases: string[];
  category: CategoryId;
  system: SystemId;
  /** 参数化程度 1-3 */
  star: number;
  tagline: LocalizedText;
  origin: LocalizedText;
  params: Param[];
  browserSupport: { note: LocalizedText; baseline?: string };
  fallback: LocalizedText;
  scenarios: { use: LocalizedText[]; avoid: LocalizedText[] };
  a11y: LocalizedText;
  sources: string[];
  promptTemplate: { goal: LocalizedText; acceptance: LocalizedText[] };
}

/** 列表页用的精简元数据(可序列化) */
export interface EntryMeta {
  slug: string;
  name: string;
  system: SystemId;
  star: number;
  tagline: LocalizedText;
}
