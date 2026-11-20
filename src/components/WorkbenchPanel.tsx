import ParamPanel from "@/components/ParamPanel";
import PromptExport from "@/components/PromptExport";
import type { EntrySchema, Locale } from "@/lib/types";

interface WorkbenchPanelProps {
  entryId: string;
  schema: EntrySchema;
  locale: Locale;
}

/** 条目页右栏:参数面板 + Prompt 导出(挂载为 client:visible 岛屿) */
export default function WorkbenchPanel({ entryId, schema, locale }: WorkbenchPanelProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ParamPanel entryId={entryId} schema={schema} locale={locale} />
      <PromptExport entryId={entryId} schema={schema} locale={locale} />
    </div>
  );
}
