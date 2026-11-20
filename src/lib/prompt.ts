import type { EntrySchema, Locale, SnapshotItem } from "./types";

/**
 * 把条目元数据 + 参数快照浓缩成可丢给 AI agent 一比一复刻的结构化 prompt。
 * 叙述语言跟随 locale;参数名/数值/CSS 属性保留英文原词。
 */
export function buildPrompt(
  schema: EntrySchema,
  snapshot: SnapshotItem[],
  locale: Locale,
  entryUrl?: string,
): string {
  const zh = locale === "zh";

  const goal = schema.promptTemplate.goal[locale];
  const acceptance = schema.promptTemplate.acceptance.map((a) => `- ${a[locale]}`);

  const snapshotJson = JSON.stringify(
    snapshot.map((s) => ({ name: s.name, value: s.value })),
    null,
    2,
  );

  const cssVarHints = schema.params
    .filter((p) => p.cssVar)
    .map((p) => `- ${p.name} → ${p.cssVar}`);

  const lines: string[] = [
    zh ? "## 目标" : "## Goal",
    "",
    goal,
    "",
    zh
      ? "请一比一复刻该设计效果,严格遵循以下参数快照,不要自行调整数值。"
      : "Replicate this design one-to-one. Strictly follow the parameter snapshot below; do not alter the values.",
    "",
    zh ? "## 参数快照(Parameter Snapshot)" : "## Parameter Snapshot",
    "",
    "```json",
    snapshotJson,
    "```",
    "",
    zh ? "## 验收要点" : "## Acceptance Criteria",
    "",
    ...acceptance,
  ];

  if (cssVarHints.length > 0) {
    lines.push(
      "",
      zh ? "## 参数 → CSS 变量映射" : "## Parameter → CSS Variable Mapping",
      "",
      ...cssVarHints,
    );
  }

  if (schema.fallback) {
    lines.push(
      "",
      zh ? "## 兼容性回退" : "## Fallback",
      "",
      schema.fallback[locale],
    );
  }

  if (entryUrl) {
    lines.push("", zh ? `## 出处\n\n${entryUrl}` : `## Source\n\n${entryUrl}`);
  }

  return lines.join("\n");
}
