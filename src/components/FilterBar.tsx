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

/* ── 过滤态持久化(清单 filter-state-not-persisted):
     两层:① URL query(?system=xxx&star=3,replaceState 不入历史栈,可分享/收藏);
     ② sessionStorage 按页面路径回退(MPA 整页返回/重开标签后仍保留)。
     SSR/水合前恒 all/all(与卡片直出结构一致),挂载后恢复,过滤仍由岛屿显隐。
     分享链接的参数快照走 #s= hash(lib/shareLink.ts),query 层互不冲突。 ── */
const FILTER_SESSION_PREFIX = "atlas-filter:";

type StarFilter = number | "all";

interface PersistedFilter {
  system: string;
  star: StarFilter;
}

const parseStarParam = (raw: string | null): StarFilter =>
  raw === "1" || raw === "2" || raw === "3" ? Number(raw) : "all";

/** URL query 优先,回退 sessionStorage(按 pathname);非法值交给调用方校验 */
function readPersistedFilter(): PersistedFilter {
  const fallback: PersistedFilter = { system: "all", star: "all" };
  if (typeof window === "undefined") return fallback;
  try {
    const q = new URLSearchParams(window.location.search);
    const qs = q.get("system");
    const qStar = q.get("star");
    if (qs !== null || qStar !== null) return { system: qs ?? "all", star: parseStarParam(qStar) };
    const saved = window.sessionStorage.getItem(`${FILTER_SESSION_PREFIX}${window.location.pathname}`);
    if (!saved) return fallback;
    const obj = JSON.parse(saved) as { system?: unknown; star?: unknown };
    return {
      system: typeof obj.system === "string" ? obj.system : "all",
      star: typeof obj.star === "number" && (obj.star === 1 || obj.star === 2 || obj.star === 3)
        ? obj.star
        : parseStarParam(obj.star == null ? null : String(obj.star)),
    };
  } catch {
    return fallback; // 存储不可用(隐私模式等):与现状一致,不持久化
  }
}

/**
 * 分类列表页过滤条(spec §4.2 / §6-10):来源体系 × 参数化星级两个维度,客户端过滤。
 * - 卡片由 .astro 直接渲染(带 data-slug / data-system / data-star),本岛屿只切换
 *   过滤态并显隐对应卡片;过滤后为空时显示 ui.ts 的提示文案(显隐骨架保留)。
 * - sticky 过滤栏:初始透明,停靠(哨兵滚出视口顶)后加 --glass-* 底 + --shadow-1,
 *   IntersectionObserver 哨兵实现;RM 下状态切换瞬时(CSS 全局降级)。
 * - 结果计数行 aria-live="polite";过滤切换时对剩余卡做 120ms 淡入(只 opacity)。
 * - 过滤态持久化:URL query(?system=&star=,replaceState 不入栈)+ sessionStorage
 *   按路径回退(清单 filter-state-not-persisted;挂载后恢复,水合前恒 all/all)。
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

  // VD-07:星级组与来源体系组统一零值策略——count=0 的星级不渲染
  // (此前只过滤体系组,「★ 演示为主 0」仍可点、一点即空态,同一行两套规则)
  const presentStars = useMemo(
    () => STAR_ORDER.filter((n) => entries.some((e) => e.star === n)),
    [entries],
  );

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

  // ── 过滤态恢复(挂载后一次):URL query 优先、sessionStorage 回退;
  //    值按本分类实际可选项校验(死过滤器/非法值回退 all),SSR 标记不受影响。
  //    VD-07:星级同样校验在场性——持久化的星级若本分类已无对应条目
  //    (chip 不渲染),回退 all,避免「无选中 chip 的过滤态」
  useEffect(() => {
    const saved = readPersistedFilter();
    const present = new Set<string>(entries.map((e) => e.system));
    const sys = saved.system === "all" || present.has(saved.system) ? saved.system : "all";
    const st =
      saved.star !== "all" && entries.some((e) => e.star === saved.star) ? saved.star : "all";
    if (sys !== "all") setSystem(sys);
    if (st !== "all") setStar(st);
  }, [entries]);

  // ── 过滤态双写:sessionStorage(按路径)+ URL query(replaceState 不入栈)。
  //    挂载当拍会以 all/all 写一次、随恢复态二次覆盖,结果正确
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(
        `${FILTER_SESSION_PREFIX}${window.location.pathname}`,
        JSON.stringify({ system, star }),
      );
    } catch {
      /* 存储不可用(file://、隐私模式):仅 URL 层生效 */
    }
    const q = new URLSearchParams(window.location.search);
    if (system === "all") q.delete("system");
    else q.set("system", system);
    if (star === "all") q.delete("star");
    else q.set("star", String(star));
    const qs = q.toString();
    const next = `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`;
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (next !== current) {
      try {
        window.history.replaceState(null, "", next);
      } catch {
        /* file:// 等:静默跳过 */
      }
    }
  }, [system, star]);

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
    // subgroup 分组页(components):组内卡全被过滤掉时连组标题一起隐藏
    // (其余分类无 [data-subgroup] 节点,天然 no-op)
    scope.querySelectorAll<HTMLElement>("[data-subgroup]").forEach((section) => {
      const hasVisible = Array.from(section.querySelectorAll<HTMLElement>(".entry-card")).some(
        (card) => card.style.display !== "none",
      );
      section.style.display = hasVisible ? "" : "none";
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
            {presentStars.map((n) => (
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
