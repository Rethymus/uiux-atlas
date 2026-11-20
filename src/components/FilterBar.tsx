import { useEffect, useMemo, useRef, useState } from "react";
import { SYSTEMS } from "@/lib/types";
import type { EntryMeta, Locale } from "@/lib/types";
import { t } from "@/i18n/ui";

interface FilterBarProps {
  /** 已序列化的条目元数据(与 .astro 里渲染的卡片一一对应) */
  entries: EntryMeta[];
  locale: Locale;
}

const STAR_ORDER = [3, 2, 1] as const;

/**
 * 分类列表页过滤条:来源体系 × 参数化星级两个维度,客户端过滤。
 * 卡片本身由 .astro 直接渲染(带 data-slug / data-system / data-star),
 * 本岛屿只负责切换过滤态并显隐对应卡片;过滤后为空时显示 ui.ts 的提示文案。
 */
export default function FilterBar({ entries, locale }: FilterBarProps) {
  const dict = t(locale);
  const [system, setSystem] = useState<string>("all");
  const [star, setStar] = useState<number | "all">("all");
  const [mounted, setMounted] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  // 只列出当前分类里实际存在的来源体系,避免死过滤器
  const systems = useMemo(() => {
    const present = new Set(entries.map((e) => e.system));
    return SYSTEMS.filter((s) => present.has(s.id));
  }, [entries]);

  const filtered = entries.filter(
    (e) => (system === "all" || e.system === system) && (star === "all" || e.star === star),
  );

  useEffect(() => {
    setMounted(true);
    const scope = barRef.current?.closest<HTMLElement>("[data-filter-scope]");
    if (!scope) return;
    const shown = new Set(filtered.map((e) => e.slug));
    scope.querySelectorAll<HTMLElement>(".entry-card").forEach((card) => {
      const slug = card.getAttribute("data-slug");
      card.style.display = slug !== null && shown.has(slug) ? "" : "none";
    });
  });

  const starLabel = (n: 3 | 2 | 1) =>
    dict.list[n === 3 ? "star3" : n === 2 ? "star2" : "star1"];

  return (
    <>
      <div ref={barRef} className="filter-bar">
        <div className="filter-group">
          <span className="filter-label">{dict.list.filterSystem}</span>
          <div className="seg" role="group" aria-label={dict.list.filterSystem}>
            <button type="button" aria-pressed={system === "all"} onClick={() => setSystem("all")}>
              {dict.list.all}
            </button>
            {systems.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={system === s.id}
                onClick={() => setSystem(s.id)}
              >
                {locale === "en" ? s.en : s.zh}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <span className="filter-label">{dict.list.filterStar}</span>
          <div className="seg" role="group" aria-label={dict.list.filterStar}>
            <button type="button" aria-pressed={star === "all"} onClick={() => setStar("all")}>
              {dict.list.all}
            </button>
            {STAR_ORDER.map((n) => (
              <button key={n} type="button" aria-pressed={star === n} onClick={() => setStar(n)}>
                {starLabel(n)}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* 水合前不渲染,避免与尚未被过滤的卡片矛盾 */}
      {mounted && filtered.length === 0 && <p className="list-empty">{dict.list.empty}</p>}
    </>
  );
}
