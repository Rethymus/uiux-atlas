import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { entrySchemaZod } from "./lib/schema";

/**
 * 条目 schema:src/content/entries/{category}/{slug}/schema.json
 * id 形如 "styles/glassmorphism"
 */
const entries = defineCollection({
  loader: glob({
    pattern: "*/*/schema.json",
    base: "src/content/entries",
    generateId: ({ entry }) => entry.replace(/\/schema\.json$/, ""),
  }),
  schema: entrySchemaZod,
});

/**
 * 条目正文(双语):zh.mdx / en.mdx
 * id 形如 "styles/glassmorphism/zh"
 */
const entryBody = defineCollection({
  loader: glob({
    pattern: "*/*/{zh,en}.mdx",
    base: "src/content/entries",
  }),
});

export const collections = { entries, entryBody };
