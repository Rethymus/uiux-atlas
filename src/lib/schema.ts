import { z } from "astro:schema";
import { CATEGORIES, SUBGROUPS, SYSTEMS, type EntrySchema, type Param } from "./types";

export const categoryIdSchema = z.enum(CATEGORIES.map((c) => c.id) as [string, ...string[]]);
export const systemIdSchema = z.enum(SYSTEMS.map((s) => s.id) as [string, ...string[]]);
export const subgroupIdSchema = z.enum(SUBGROUPS.map((s) => s.id) as [string, ...string[]]);

const localizedText = z.object({ zh: z.string(), en: z.string() });

const paramBase = {
  name: z.string().min(1),
  effect: localizedText,
  cssVar: z.string().regex(/^--[\w-]+$/).optional(),
};

const numberRange = { min: z.number(), max: z.number(), step: z.number().positive(), default: z.number() };

export const paramSchema = z.discriminatedUnion("type", [
  z.object({ ...paramBase, type: z.literal("dimension"), unit: z.string().min(1), ...numberRange }),
  z.object({ ...paramBase, type: z.literal("number"), ...numberRange, unit: z.string().optional() }),
  z.object({
    ...paramBase,
    type: z.literal("color"),
    format: z.enum(["oklch", "hex"]),
    default: z.string().min(1),
    /** 预设色板(清单 color-no-preset-swatches;zod 默认剥除未知键,须显式收编) */
    presets: z.array(z.string().min(1)).optional(),
  }),
  z.object({
    ...paramBase,
    type: z.literal("cubicBezier"),
    default: z.tuple([z.number(), z.number(), z.number(), z.number()]),
  }),
  z.object({
    ...paramBase,
    type: z.literal("enum"),
    options: z.array(z.object({ value: z.string(), label: localizedText })).min(2),
    default: z.string(),
  }),
  z.object({
    ...paramBase,
    type: z.literal("shadow"),
    default: z.array(
      z.object({
        x: z.number(),
        y: z.number(),
        blur: z.number().min(0),
        spread: z.number().default(0),
        color: z.string().min(1),
      }),
    ),
    /** 逐层 color 预设色板(可选;zod 默认剥除未知键,须显式收编) */
    presets: z.array(z.string().min(1)).optional(),
  }),
]);

export const entrySchemaZod = z.object({
  name: z.string().min(1),
  nameZh: z.string().min(1).optional(),
  aliases: z.array(z.string()).default([]),
  category: categoryIdSchema,
  /** 子分组(仅 category="components" 条目使用;值域六子分组 id) */
  subgroup: subgroupIdSchema.optional(),
  system: systemIdSchema,
  star: z.number().int().min(1).max(3),
  tagline: localizedText,
  origin: localizedText,
  params: z.array(paramSchema).min(1),
  browserSupport: z.object({ note: localizedText, baseline: z.string().optional() }),
  fallback: localizedText,
  scenarios: z.object({ use: z.array(localizedText), avoid: z.array(localizedText) }),
  a11y: localizedText,
  sources: z.array(z.string().url()).min(1),
  promptTemplate: z.object({ goal: localizedText, acceptance: z.array(localizedText).min(1) }),
});

export type EntrySchemaZod = typeof entrySchemaZod;
export type { EntrySchema, Param };
