import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import { buildPrompt } from "@/lib/prompt";
import type { EntrySchema, Locale } from "@/lib/types";
import { t } from "@/i18n/ui";

interface PromptExportProps {
  entryId: string;
  schema: EntrySchema;
  locale: Locale;
}

/**
 * Prompt 导出块:store.exportSnapshot() + buildPrompt 生成结构化复刻 prompt。
 * 「复制复刻 Prompt」写剪贴板;「查看 Prompt」折叠展开全文。
 * 参数快照随 store 实时更新,复制到的永远是当前调节结果。
 */
export default function PromptExport({ entryId, schema, locale }: PromptExportProps) {
  const dict = t(locale);
  const store = getEntryStore(entryId, schema);
  const [, setTick] = useState(0);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setTick((n) => n + 1));
    return () => {
      unsubscribe();
      if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
    };
  }, [store]);

  const prompt = buildPrompt(schema, store.exportSnapshot(), locale);

  const flashCopied = () => {
    setCopied(true);
    if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(prompt);
      ok = true;
    } catch {
      // 非安全上下文等场景的兜底
      try {
        const ta = document.createElement("textarea");
        ta.value = prompt;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        ta.remove();
      } catch {
        ok = false;
      }
    }
    if (ok) flashCopied();
  };

  return (
    <div className="prompt-box">
      <div className="prompt-actions">
        <button type="button" className="btn-primary" onClick={copy}>
          {dict.entry.copyPrompt}
        </button>
        <button type="button" className="btn-ghost" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {dict.entry.viewPrompt}
        </button>
        {copied && <span className="copy-ok" role="status">{dict.entry.copied}</span>}
      </div>
      {open && <pre className="prompt-pre">{prompt}</pre>}
    </div>
  );
}
