import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import { buildPrompt } from "@/lib/prompt";
import { buildShareLink } from "@/lib/shareLink";
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
 * 「分享参数链接」把当前参数快照序列化为 #s=name=value&… 追加到当前地址,
 * 复制完整链接;打开该链接时由 DemoStage 挂载解析恢复(src/lib/shareLink.ts)。
 * 参数快照随 store 实时更新,复制到的永远是当前调节结果。
 *
 * 复制态 morph(spec §3 Button / §6-18):成功后按钮文案切换「已复制 ✓」+
 * scale 1→1.04→1 微脉冲(一次即止,RM 只剩文案切换),并经 role="status"
 * 向读屏播报;按钮默认文案「复制复刻 Prompt」/「Copy replication prompt」
 * 为产物校验标记,逐字保留(verify-dist.mjs 依赖)。
 * 「查看 Prompt」展开时代码区经 20px 渐变过渡层从面板渐显长出(§6-13,02 §7.2)。
 */
export default function PromptExport({ entryId, schema, locale }: PromptExportProps) {
  const dict = t(locale);
  const store = getEntryStore(entryId, schema);
  const [, setTick] = useState(0);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);
  const linkTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setTick((n) => n + 1));
    return () => {
      unsubscribe();
      if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
      if (linkTimerRef.current !== undefined) window.clearTimeout(linkTimerRef.current);
    };
  }, [store]);

  const prompt = buildPrompt(schema, store.exportSnapshot(), locale);

  /** 剪贴板统一入口(主按钮/分享链接共用);非安全上下文走 execCommand 兜底 */
  const writeClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // 非安全上下文等场景的兜底
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        ta.remove();
        return ok;
      } catch {
        return false;
      }
    }
  };

  const flash = (set: (v: boolean) => void, ref: { current: number | undefined }) => {
    set(true);
    if (ref.current !== undefined) window.clearTimeout(ref.current);
    ref.current = window.setTimeout(() => set(false), 2000);
  };

  const copy = async () => {
    if (await writeClipboard(prompt)) flash(setCopied, timerRef);
  };

  const share = async () => {
    if (await writeClipboard(buildShareLink(schema, (name) => store.get(name)))) {
      flash(setLinkCopied, linkTimerRef);
    }
  };

  return (
    <div className="prompt-box">
      <div className="prompt-actions">
        {/* data-magnet:§6-2 磁吸复制钮(物理由 Base.astro 光标感知单例承担,
            仅 (hover:hover) and (pointer:fine) 桌面环境;触屏/RM 自动失效) */}
        <button
          type="button"
          className={copied ? "btn-primary is-copied" : "btn-primary"}
          onClick={copy}
          data-magnet
        >
          {copied ? dict.entry.copied : dict.entry.copyPrompt}
        </button>
        {/* 次级:分享参数链接(#s= 快照);btn-ghost 常规按钮,无磁吸 */}
        <button type="button" className="btn-ghost" onClick={share}>
          {linkCopied ? dict.entry.copied : dict.entry.shareLink}
        </button>
        <button type="button" className="btn-ghost" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {dict.entry.viewPrompt}
        </button>
        {/* 读屏回执:文案切换的视觉反馈对读屏不可靠,role="status" 兜底播报 */}
        {copied && (
          <span className="copy-ok sr-only" role="status">
            {dict.entry.copied}
          </span>
        )}
        {linkCopied && (
          <span className="copy-ok sr-only" role="status">
            {dict.entry.copied}
          </span>
        )}
      </div>
      {open && (
        <div className="prompt-reveal">
          <div className="prompt-fade" aria-hidden="true" />
          <pre className="prompt-pre">{prompt}</pre>
        </div>
      )}
    </div>
  );
}
