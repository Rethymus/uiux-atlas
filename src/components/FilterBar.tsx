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
 * 分类列表页过滤条(spec §4.2 / §6-10):来源体系 × 参数化星级两个维度,客户端过滤。
 * - 卡片由 .astro 直接渲染(带 data-slug / data-system / data-star),本岛屿只切换
 *   过滤态并显隐对应卡片;过滤后为空时显示 ui.ts 的提示文案(显隐骨架保留)。
 * - sticky 过滤栏:初始透明,停靠(哨兵滚出视口顶)后加 --glass-* 底 + --shadow-1,
 *   IntersectionObserver 哨兵实现;RM 下状态切换瞬时(CSS 全局降级)。
 * - 结果计数行 aria-live="polite";过滤切换时对剩余卡做 120ms 淡入(只 opacity)。
 * - 选项用 chip 体系(spec §3 Chip:可点 Chip hover --fill-1,选中 accent-dim 底);
 *   <640 两行分组、Chip 横向滑动(CSS 承担)。
 */
export default function FilterBar({ entries, locale }: FilterBarProps) {
  const dict = t(locale);
  const [system, setSystem] = useState<string>("all");
  const [star, setStar] = useState<number | "all">("all");
  const [docked, setDocked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  // 只列出当前分类里实际存在的来源体系,避免死过滤器
  const systems = useMemo(() => {
    const present = new Set(entries.map((e) => e.system));
    return SYSTEMS.filter((s) => present.has(s.id));
  }, [entries]);

  // 过滤 chip 收录计数(spec §6-15 httpster 工艺:策展密度本身成为信息)
  const systemCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of entries) m.set(e.system, (m.get(e.system) ?? 0) + 1);
    return m;
  }, [entries]);
  const starCounts = useMemo(() => {
    const m = new Map<number, number>();
    for (const e of entries) m.set(e.star, (m.get(e.star) ?? 0) + 1);
    return m;
  }, [entries]);

  const filtered = entries.filter(
    (e) => (system === "all" || e.system === system) && (star === "all" || e.star === star),
  );

  // 只在挂载后启用空态文案(水合前不渲染,避免与尚未被过滤的卡片矛盾)
  useEffect(() => {
    setMounted(true);
  }, []);

  // 显隐卡片(骨架逻辑保留)+ 过滤切换时剩余卡 120ms 淡入;只依赖过滤态
  useEffect(() => {
    const scope = barRef.current?.closest<HTMLElement>("[data-filter-scope]");
    if (!scope) return;
    const shown = new Set(filtered.map((e) => e.slug));
    const visible: HTMLElement[] = [];
    scope.querySelectorAll<HTMLElement>(".entry-card").forEach((card) => {
      const slug = card.getAttribute("data-slug");
      const show = slug !== null && shown.has(slug);
      card.style.display = show ? "" : "none";
      card.classList.remove("card-in");
      if (show) visible.push(card);
    });
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    void scope.offsetWidth; // 强制回流,让移除后的动画可重新触发
    for (const card of visible) card.classList.add("card-in");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [system, star]);

  // 哨兵:滚出视口顶 = 过滤栏已停靠 → 玻璃化(spec §6-10)
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => setDocked(entries[0].boundingClientRect.top < 1),
      { threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  const starLabel = (n: 3 | 2 | 1) =>
    dict.list[n === 3 ? "star3" : n === 2 ? "star2" : "star1"];

  const countText = `${filtered.length} / ${entries.length} ${dict.home.entriesCount}`;

  return (
    <>
      <div ref={sentinelRef} className="filter-sentinel" aria-hidden="true" />
      <div ref={barRef} className={`filter-bar${docked ? " is-glass" : ""}`}>
        <div className="filter-group">
          <span className="filter-label" id="filter-system-label">
            {dict.list.filterSystem}
          </span>
          <div className="filter-chips" role="group" aria-labelledby="filter-system-label">
            <button
              type="button"
              className="fchip"
              aria-pressed={system === "all"}
              onClick={() => setSystem("all")}
            >
              {dict.list.all}
              <span className="fchip-count">{entries.length}</span>
            </button>
            {systems.map((s) => (
              <button
                key={s.id}
                type="button"
                className="fchip"
                aria-pressed={system === s.id}
                onClick={() => setSystem(s.id)}
              >
                {locale === "en" ? s.en : s.zh}
                <span className="fchip-count">{systemCounts.get(s.id) ?? 0}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <span className="filter-label" id="filter-star-label">
            {dict.list.filterStar}
          </span>
          <div className="filter-chips" role="group" aria-labelledby="filter-star-label">
            <button
              type="button"
              className="fchip"
              aria-pressed={star === "all"}
              onClick={() => setStar("all")}
            >
              {dict.list.all}
              <span className="fchip-count">{entries.length}</span>
            </button>
            {STAR_ORDER.map((n) => (
              <button
                key={n}
                type="button"
                className="fchip"
                aria-pressed={star === n}
                onClick={() => setStar(n)}
              >
                {starLabel(n)}
                <span className="fchip-count">{starCounts.get(n) ?? 0}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="filter-count" aria-live="polite">
          {countText}
        </p>
      </div>
      {/* 水合前不渲染,避免与尚未被过滤的卡片矛盾 */}
      {mounted && filtered.length === 0 && <p className="list-empty">{dict.list.empty}</p>}
    </>
  );
}
