import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { CATEGORIES, type Locale } from "@/lib/types";
import { entryUrl } from "@/lib/urls";

/* ────────────────────────────────────────────────────────────
   全站命令面板(Ctrl+K / Cmd+K / 页头搜索钮唤起)——本条目吃自己的
   狗粮:它同时是站点第 31 个部件条目 components/command-palette 的
   组件本体(条目 demo 经 PalettePanel 复用同一实现,见该 demo/Demo.tsx)。

   spec 锚点(design-spec v2.6):
   - 材质层 §2.8:面板 = mat-regular 档(.material 工具类:20px blur +
     saturate 180% + 叠色 tint + 内高光 + separator α hairline + --shadow-1);
     页面遮罩 = --bg 的 color-mix(与 v2.1 --glass-bg 同一 color-mix 派生处方,
     深浅主题随 --bg 换值);backdrop-filter 静态材质、不参与过渡(§2.8 红线)。
   - 动效 §2.6:浮层入场 = --dur-overlay-in × --ease-decel(预锁 token 首次启用);
     RM 降级见 global.css 命令面板段(spec §8)。
   - 层级 §2.7:--z-modal;焦点环 §8:全局 :focus-visible token,组件不覆盖不移除。
   - 语义:APG「Combobox with Listbox Popup」——input[role=combobox +
     aria-expanded + aria-controls + aria-autocomplete=list +
     aria-activedescendant] + ul[role=listbox] > li[role=option + aria-selected];
     外层 role=dialog + aria-modal 承载 focus trap 与 Esc(spec §8 焦点管理;
     APG 允许 combobox 出现在 dialog 内)。零第三方库。
   ──────────────────────────────────────────────────────────── */

/** 构建时注入的条目索引项(JSON 序列化自 src/lib/paletteData.ts) */
export interface PaletteItem {
  /** 条目 id,形如 "components/button" */
  slug: string;
  name: string;
  nameZh?: string;
  aliases: string[];
  category: string;
  /** 参数化程度 1-3 */
  star: number;
}

export type MatchMode = "subsequence" | "prefix";

/** 词首判定:命中位前是分隔符(或串首)时加权 */
const WORD_START = /[\s\-_+./·]/;

/**
 * 子序列模糊匹配:query 逐字符按序命中 target 即命中(大小写不敏感,
 * 空格视为分隔、跳过)。连击(连续命中)与词首命中加权;残余更短的目标
 * 微加权——纯函数,零依赖。
 */
function scoreSubsequence(query: string, target: string): number | null {
  const t = Array.from(target.toLowerCase());
  const q = Array.from(query.toLowerCase()).filter((c) => c !== " ");
  if (q.length === 0) return 0;
  let ti = 0;
  let score = 0;
  let streak = 0;
  for (let qi = 0; qi < q.length; qi++) {
    const idx = t.indexOf(q[qi], ti);
    if (idx === -1) return null;
    score += 1;
    if (idx === ti && qi > 0) {
      streak += 1;
      score += streak;
    } else {
      streak = 0;
    }
    if (idx === 0 || WORD_START.test(t[idx - 1])) score += 3;
    ti = idx + 1;
  }
  score += Math.max(0, 10 - (t.length - ti)) * 0.1;
  return score;
}

/** 前缀匹配(matchMode=prefix 档):startsWith 即命中,越短越前 */
function scorePrefix(query: string, target: string): number | null {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return 0;
  if (!target.toLowerCase().startsWith(q)) return null;
  return 12 - target.length * 0.1;
}

/** 可检索字段:本语种展示名优先,另一语种名与 aliases 全部参与 */
function fieldsOf(item: PaletteItem, locale: Locale): string[] {
  const zh = item.nameZh ?? "";
  const base = locale === "zh" ? [zh || item.name, item.name] : [item.name, zh];
  return [...base, ...item.aliases].filter(Boolean);
}

/** 模糊搜索:逐条目取各字段最高分;空 query 按注册序直出前 limit 条 */
export function matchItems(
  items: PaletteItem[],
  query: string,
  mode: MatchMode,
  locale: Locale,
  limit: number,
): PaletteItem[] {
  const q = query.trim();
  if (!q) return items.slice(0, limit);
  const scored: Array<{ item: PaletteItem; score: number }> = [];
  for (const item of items) {
    let best: number | null = null;
    for (const field of fieldsOf(item, locale)) {
      const s = mode === "prefix" ? scorePrefix(q, field) : scoreSubsequence(q, field);
      if (s !== null && (best === null || s > best)) best = s;
    }
    if (best !== null) scored.push({ item, score: best });
  }
  scored.sort(
    (a, b) =>
      b.score - a.score ||
      b.item.star - a.item.star ||
      a.item.slug.localeCompare(b.item.slug),
  );
  return scored.slice(0, limit).map((s) => s.item);
}

const categoryLabel = (category: string, locale: Locale): string => {
  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat) return category;
  return locale === "en" ? cat.en : cat.zh;
};

const primaryName = (item: PaletteItem, locale: Locale): string =>
  locale === "zh" ? (item.nameZh ?? item.name) : item.name;

const secondaryName = (item: PaletteItem, locale: Locale): string => {
  const other = locale === "zh" ? item.name : (item.nameZh ?? "");
  if (other && other !== primaryName(item, locale)) return other;
  return item.aliases[0] ?? "";
};

interface PalettePanelProps {
  /** DOM id 前缀(a11y id 派生;同一页多实例不冲突) */
  idPrefix: string;
  items: PaletteItem[];
  locale: Locale;
  /** 默认子序列(本站口径);prefix = 前缀档(条目 demo 参数) */
  matchMode?: MatchMode;
  /** 结果上限(条目 demo 参数 5-20;全站默认 12) */
  maxResults?: number;
  /** 头部 kbd 徽标文字(空串不渲染) */
  hotkeyLabel?: string;
  /** modal = 全站浮层(role=dialog,Esc 交 wrapper);inline = 条目 demo 内嵌静态面板 */
  variant?: "modal" | "inline";
  onSelect?: (item: PaletteItem) => void;
  /** Esc / 关闭回调(inline 变体无浮层语义,可不传) */
  onClose?: () => void;
  /** modal 变体由 wrapper 传入以便开面板即聚焦 */
  inputRef?: React.Ref<HTMLInputElement>;
}

/**
 * 面板本体:顶部 combobox 搜索 + listbox 结果 + 键盘提示脚注。
 * 全站浮层(default export)与条目 demo(command-palette/Demo.tsx)共用。
 */
export function PalettePanel({
  idPrefix,
  items,
  locale,
  matchMode = "subsequence",
  maxResults = 12,
  hotkeyLabel = "",
  variant = "inline",
  onSelect,
  onClose,
  inputRef,
}: PalettePanelProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const isModal = variant === "modal";

  const results = useMemo(
    () => matchItems(items, query, matchMode, locale, maxResults),
    [items, query, matchMode, locale, maxResults],
  );

  // query / 匹配档 / 上限变化:选中项回第一行;结果变短:夹回界内
  useEffect(() => {
    setActive(0);
  }, [query, matchMode, maxResults, items]);
  useEffect(() => {
    if (active >= results.length) setActive(results.length > 0 ? results.length - 1 : 0);
  }, [active, results.length]);

  // 选中项跟随滚出可视区时滚回(block:nearest 不打扰其余行)
  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  const pick = useCallback(
    (item: PaletteItem | undefined) => {
      if (item) onSelect?.(item);
    },
    [onSelect],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length > 0 ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) =>
        results.length > 0 ? (i - 1 + results.length) % results.length : 0,
      );
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(Math.max(0, results.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      pick(results[active]);
    } else if (e.key === "Escape") {
      e.stopPropagation();
      onClose?.();
    }
  };

  const hints = {
    choose: locale === "zh" ? "选择" : "navigate",
    open: locale === "zh" ? "打开" : "open",
    close: locale === "zh" ? "关闭" : "close",
    empty: locale === "zh" ? "没有匹配的条目" : "No matching entries",
    inputLabel: locale === "zh" ? "搜索条目 / Search entries" : "Search entries / 搜索条目",
    listLabel: locale === "zh" ? "条目结果 / Entry results" : "Entry results / 条目结果",
    dialogLabel: locale === "zh" ? "命令面板 / Command palette" : "Command palette / 命令面板",
    placeholder: locale === "zh" ? "搜索条目…" : "Search entries…",
  };

  return (
    // 面板容器:键盘事件都在聚焦的 combobox 上发生,容器统一拦截漫游键。
    // focus-visible 焦点环走全局 token(spec §8,不覆盖不移除)。
    <div
      className="cmdk-panel material"
      data-variant={variant}
      role={isModal ? "dialog" : undefined}
      aria-modal={isModal ? "true" : undefined}
      aria-label={isModal ? hints.dialogLabel : undefined}
      onKeyDown={onKeyDown}
    >
      <div className="cmdk-head">
        <svg
          className="cmdk-head-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M20.5 20.5 15.3 15.3" />
        </svg>
        <input
          ref={inputRef}
          id={`${idPrefix}-input`}
          className="cmdk-input"
          role="combobox"
          type="text"
          autoComplete="off"
          aria-expanded="true"
          aria-haspopup="listbox"
          aria-controls={`${idPrefix}-listbox`}
          aria-autocomplete="list"
          aria-activedescendant={results[active] ? `${idPrefix}-opt-${active}` : undefined}
          aria-label={hints.inputLabel}
          placeholder={hints.placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {hotkeyLabel ? (
          <kbd className="cmdk-kbd" aria-hidden="true">
            {hotkeyLabel}
          </kbd>
        ) : null}
      </div>
      <ul
        ref={listRef}
        id={`${idPrefix}-listbox`}
        className="cmdk-list"
        role="listbox"
        aria-label={hints.listLabel}
      >
        {results.map((item, i) => (
          <li
            key={item.slug}
            id={`${idPrefix}-opt-${i}`}
            role="option"
            className="cmdk-opt"
            aria-selected={i === active}
            onMouseMove={() => setActive(i)}
            // 按下不抢焦点:焦点保持在 combobox(APG activedescendant 模式前提)
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => pick(item)}
          >
            <span className="cmdk-opt-name">{primaryName(item, locale)}</span>
            <span className="cmdk-opt-sub">{secondaryName(item, locale)}</span>
            <span className="cmdk-opt-cat">
              <span
                className="cmdk-opt-dot"
                aria-hidden="true"
                style={{ "--cat": `var(--cat-${item.category}, var(--accent))` } as React.CSSProperties}
              />
              {categoryLabel(item.category, locale)}
            </span>
            <span className="cmdk-opt-stars" aria-hidden="true">
              {"★".repeat(item.star)}
            </span>
          </li>
        ))}
      </ul>
      {results.length === 0 && <div className="cmdk-empty">{hints.empty}</div>}
      <div className="cmdk-foot">
        <span className="cmdk-hints" aria-hidden="true">
          <kbd className="cmdk-kbd">↑</kbd>
          <kbd className="cmdk-kbd">↓</kbd>
          {hints.choose}
          <kbd className="cmdk-kbd">↵</kbd>
          {hints.open}
          <kbd className="cmdk-kbd">Esc</kbd>
          {hints.close}
        </span>
        <span className="cmdk-count">
          {results.length} / {items.length}
        </span>
      </div>
    </div>
  );
}

/**
 * 全站浮层岛(client:load,挂在 Base.astro):
 * - 全局 Ctrl+K / Cmd+K 开合;点击 [data-palette-open](页头搜索钮)唤起;
 * - 开面板锁 body 滚动(补偿滚动条宽度防跳动),关面板把焦点还给唤起者;
 * - Tab 在面板内被拦下(唯一 tab 停靠点是 combobox)——focus trap;
 * - Enter 跳转对应条目页(本站为 MPA,直接 location.assign)。
 * 数据 = 构建时注入的 items(全部条目);零第三方库。
 */
export default function CommandPalette({
  items,
  locale,
}: {
  items: PaletteItem[];
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const [hotkeyLabel, setHotkeyLabel] = useState("");
  const openRef = useRef(false);
  const invokerRef = useRef<Element | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const uid = useId();

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // 平台探测:Mac 显 ⌘K、其余 Ctrl K;同步页头搜索钮的 kbd 徽标
  // (SSR 不预判平台,挂载后填充,避免水合不一致;UA 探测,navigator.platform 已废弃)
  useEffect(() => {
    const isMac = /mac/i.test(navigator.userAgent);
    const label = isMac ? "⌘K" : "Ctrl K";
    setHotkeyLabel(label);
    for (const el of document.querySelectorAll<HTMLElement>("[data-palette-kbd]")) {
      el.textContent = label;
      el.dataset.ready = "";
    }
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    const el = invokerRef.current;
    invokerRef.current = null;
    // 焦点还给唤起者(页头搜索钮或打开前的焦点元素;元素可能已被移除)
    if (el instanceof HTMLElement && el.isConnected) el.focus();
  }, []);

  // 全局 Ctrl+K / Cmd+K 开合(preventDefault 压掉浏览器自带快捷语义)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "k" || e.altKey || e.shiftKey) return;
      if (!(e.metaKey || e.ctrlKey)) return;
      e.preventDefault();
      if (openRef.current) {
        close();
      } else {
        invokerRef.current = document.activeElement;
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  // 页头搜索钮等 [data-palette-open] 元素:委托点击唤起(SSR 按钮无需绑 JS)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as Element | null)?.closest?.("[data-palette-open]");
      if (!btn) return;
      e.preventDefault();
      invokerRef.current = btn;
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // 开面板:锁 body 滚动(补偿滚动条宽度),关面板恢复原值
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    inputRef.current?.focus();
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [open]);

  if (!open) return null;

  const select = (item: PaletteItem) => {
    window.location.assign(entryUrl(locale, item.slug));
  };

  // Tab:唯一 tab 停靠点是 combobox,按下留在面板内(focus trap);Shift+Tab 同理
  const trapTab = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") e.preventDefault();
  };

  return (
    <div
      className="cmdk-overlay"
      role="presentation"
      onKeyDown={trapTab}
      onMouseDown={(e) => {
        // 只在遮罩自身按下时关闭(面板内选字拖拽不误关)
        if (e.target === e.currentTarget) close();
      }}
    >
      <PalettePanel
        idPrefix={`cmdk-${uid}`}
        items={items}
        locale={locale}
        variant="modal"
        hotkeyLabel={hotkeyLabel}
        onSelect={select}
        onClose={close}
        inputRef={inputRef}
      />
    </div>
  );
}
