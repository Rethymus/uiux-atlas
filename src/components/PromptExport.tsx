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
 * 「Open in v0」= 导航外链 <a class="btn-ghost">:把当前复刻 Prompt encodeURIComponent
 * 进 https://v0.dev/chat?q=<encoded prompt> 新窗口打开并自动预填。
 * 方案核验(2026-11-21,curl 实测):GET https://v0.dev/chat?q=hello%20world
 * → 307 https://v0.app/chat?q=hello%20world → 307 https://v0.app/?q=hello+world,
 * 终页 RSC payload 含 \"query\":\"hello world\" 与 {\"prompt\":\"hello world\",\"attachments\":[]},
 * 即 q 参数一路保留并被服务端预填为新聊天 prompt;老官方 FAQ 页
 * v0.dev/faq/v0-url-parameters 已下线(现仅剩客户端渲染空壳,HTTP 200 但内容不可达,
 * 渲染实测跳 Vercel 登录),现行 v0.app/docs 与 vercel.com/docs/v0 全量(llms.txt)
 * 均无 URL 参数文档,故本按钮按「行为验证仍有效」处理,属官方未背书方案,
 * 失效时应回退为复制 Prompt + 打开 v0.dev 首页。
 * 外链规则 target="_blank" rel="noopener noreferrer"(spec §4.4,与 §3 继续深入卡同源)。
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
  /** v0 新聊天预填入口:q= 完整 prompt,2026-11-21 实测有效(见文件头注释) */
  const v0Url = `https://v0.dev/chat?q=${encodeURIComponent(prompt)}`;

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
        {/* 次级:一键送到 v0(导航动作走 <a> 而非 button;↗ 箭头 aria-hidden,
            与文案双编码不承载唯一语义,spec §3 继续深入卡同规;a11y 名与 tooltip
            为双语一句,见 i18n entry.openV0Hint) */}
        <a
          className="btn-ghost"
          href={v0Url}
          target="_blank"
          rel="noopener noreferrer"
          title={dict.entry.openV0Hint}
          aria-label={dict.entry.openV0Hint}
        >
          {dict.entry.openV0}
          <span className="acc-src-ico" aria-hidden="true">
            ↗
          </span>
        </a>
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
