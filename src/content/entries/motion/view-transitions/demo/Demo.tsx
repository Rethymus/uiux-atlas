import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useReducedMotion } from "motion/react";
import { getEntryStore, serializeParamValue } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 最小 startViewTransition 结构:经 unknown 断言,避免依赖特定 TS lib.dom 版本 */
interface VTDocumentLike {
  startViewTransition?: (updateCallback?: () => void | Promise<void>) => { finished: Promise<unknown> };
}

const CARDS = [
  { id: "coral", zh: "珊瑚 Coral", color: "oklch(0.72 0.16 30)" },
  { id: "amber", zh: "琥珀 Amber", color: "oklch(0.78 0.14 80)" },
  { id: "jade", zh: "翡翠 Jade", color: "oklch(0.7 0.14 160)" },
  { id: "lapis", zh: "青金 Lapis", color: "oklch(0.6 0.14 260)" },
];

const css = `
.vt-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 4px 2px; }
.vt-grid { flex: 1; min-height: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.vt-card {
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 12px; border: 0; border-radius: 12px; cursor: pointer;
  color: oklch(0.22 0.03 260); font-size: 13px; font-weight: 600; text-align: left;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
}
.vt-card:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.vt-hero {
  flex: 1; min-height: 0; display: flex; flex-direction: column; justify-content: flex-end;
  padding: 16px; border-radius: 14px;
  color: oklch(0.22 0.03 260);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.22);
}
.vt-hero h3 { margin: 0 0 4px; font-size: 16px; }
.vt-hero p { margin: 0 0 12px; font-size: 12px; line-height: 1.6; opacity: 0.75; }
.vt-back {
  align-self: flex-start; border: 0; border-radius: 999px; padding: 6px 16px;
  font-size: 12px; cursor: pointer;
  background: rgba(20, 24, 34, 0.72); color: #fff;
}
.vt-back:focus-visible { outline: 2px solid var(--bg); outline-offset: 2px; }
.vt-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 12px; color: var(--text-dim); }
.vt-chip { padding: 2px 9px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); font-variant-numeric: tabular-nums; }
.vt-chip-warn { color: oklch(0.65 0.15 70); }
/* 快照动画全部可覆写:duration/easing 参数经此生效(伪元素树挂在 html 下,变量由 demo 镜像到 :root) */
::view-transition-group(*),
::view-transition-old(*),
::view-transition-new(*) {
  animation-duration: var(--vt-duration, 300ms);
  animation-timing-function: var(--vt-easing, cubic-bezier(0.4, 0, 0.2, 1));
}
/* morph 模式共享名:同一时刻至多一个元素持有(官方唯一性警告) */
.vt-name { view-transition-name: vt-card; }
`;

/**
 * 视图过渡演示:列表 ⇄ 详情的同文档过渡。
 * - duration/easing:CSS 型参数(--vt-duration/--vt-easing);::view-transition 伪元素树挂在
 *   <html> 下、不继承 .demo-stage 的变量,故 demo 把两个变量镜像到 document.documentElement,
 *   卸载时移除;
 * - mode:JS 型参数。morph=旧侧给被点卡片赋名、新侧 hero 带同名(官方:两侧不必是同一 DOM
 *   节点,过渡期间动态赋名即视为同一元素),::view-transition-group 自动补间位置/宽高;
 *   fade=全程不赋名,退化为 root 交叉淡化;
 * - 名字唯一性:发射前清空全部旧名 → 至多一个持有者;过渡结束摘名;同一时刻仅一个视图过渡
 *   (新过渡把旧过渡跳到结尾,官方行为);
 * - 无 startViewTransition 或 prefers-reduced-motion 时直切(apply 同步执行,功能不损失)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({
    mode: store.get("mode") as string,
    duration: store.get("duration") as number,
    easing: store.get("easing") as [number, number, number, number],
  });
  const [params, setParams] = useState(readParams);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const reduced = useReducedMotion() === true;

  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  // duration/easing 镜像到 :root(伪元素树从 html 继承变量);卸载时清理避免残留全页
  useEffect(() => {
    const apply = () => {
      const root = document.documentElement;
      root.style.setProperty("--vt-duration", serializeParamValue(store.param("duration"), store.get("duration")));
      root.style.setProperty("--vt-easing", serializeParamValue(store.param("easing"), store.get("easing")));
    };
    apply();
    const unsub = store.subscribe(apply);
    return () => {
      unsub();
      document.documentElement.style.removeProperty("--vt-duration");
      document.documentElement.style.removeProperty("--vt-easing");
    };
  }, [store]);

  useEffect(() => {
    setSupported(typeof (document as unknown as VTDocumentLike).startViewTransition === "function");
  }, []);

  // mode 切到 fade 时清掉所有遗留名(fade 全程不赋名)
  useEffect(() => {
    if (params.mode !== "morph") {
      Object.values(cardRefs.current).forEach((el) => el?.classList.remove("vt-name"));
    }
  }, [params.mode]);

  const canTransition = supported === true && !reduced;
  const doc = () => document as unknown as VTDocumentLike;

  const open = (id: string) => {
    // 唯一性纪律:先清空所有旧名,再给被点卡片赋名(旧快照侧)
    Object.values(cardRefs.current).forEach((el) => el?.classList.remove("vt-name"));
    cardRefs.current[id]?.classList.add("vt-name");
    const apply = () => flushSync(() => setDetailId(id));
    if (!canTransition) {
      apply(); // 直切:不过渡、功能不损失
      cardRefs.current[id]?.classList.remove("vt-name");
      return;
    }
    const vt = doc().startViewTransition!(apply);
    void vt.finished
      .catch(() => undefined)
      .finally(() => cardRefs.current[id]?.classList.remove("vt-name"));
  };

  const close = (id: string) => {
    // hero 旧快照已带名(React class);新快照侧把同名赋给对应卡片
    const apply = () => {
      flushSync(() => setDetailId(null));
      if (params.mode === "morph") cardRefs.current[id]?.classList.add("vt-name");
    };
    if (!canTransition) {
      apply();
      cardRefs.current[id]?.classList.remove("vt-name");
      return;
    }
    const vt = doc().startViewTransition!(apply);
    void vt.finished
      .catch(() => undefined)
      .finally(() => cardRefs.current[id]?.classList.remove("vt-name"));
  };

  const detail = detailId ? CARDS.find((c) => c.id === detailId) : null;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="vt-scene">
        {detail ? (
          <div
            ref={heroRef}
            className={"vt-hero" + (params.mode === "morph" ? " vt-name" : "")}
            style={{ background: detail.color }}
          >
            <h3>{detail.zh} · 详情 Detail</h3>
            <p>
              morph 模式下,这张主图与列表里被点的卡片携带同一 view-transition-name——
              两者不是同一 DOM 节点,group 伪元素自动补间位置与宽高 /
              The hero and the clicked card share one view-transition-name; the group pseudo-element tweens position and size.
            </p>
            <button type="button" className="vt-back" onClick={() => close(detail.id)}>
              返回列表 Back to list
            </button>
          </div>
        ) : (
          <div className="vt-grid" role="group" aria-label="卡片列表 card list">
            {CARDS.map((c) => (
              <button
                key={c.id}
                type="button"
                className="vt-card"
                style={{ background: c.color }}
                ref={(el) => {
                  cardRefs.current[c.id] = el;
                }}
                onClick={() => open(c.id)}
              >
                {c.zh}
              </button>
            ))}
          </div>
        )}
        <div className="vt-meta">
          <span className="vt-chip">mode: {params.mode}</span>
          <span className="vt-chip">duration: {params.duration}ms</span>
          <span className="vt-chip">
            easing: cubic-bezier({params.easing.join(", ")})
          </span>
          {supported === false && (
            <span className="vt-chip vt-chip-warn">无 startViewTransition,直切 / unsupported, hard cut</span>
          )}
          {reduced && <span className="vt-chip">reduced-motion: 直切 / hard cut</span>}
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
