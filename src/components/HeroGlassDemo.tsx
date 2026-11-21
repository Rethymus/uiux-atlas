import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { getEntryStore } from "@/lib/store";
import type { DimensionParam, EntrySchema } from "@/lib/types";
// dogfood(spec §6-3):直接复用 styles/glassmorphism 条目的 Demo 模块与 store,
// 首页 hero 内嵌一颗真实可调的玻璃微卡 + 一个 blur 滑杆,demo 自身代码零改动。
import GlassDemo from "@/content/entries/styles/glassmorphism/demo/Demo";

interface HeroGlassDemoProps {
  entryId: string;
  schema: EntrySchema;
  /** 右下角「进入条目 →」(spec §4.1-1) */
  openHref: string;
  openLabel: string;
}

/**
 * 首页 hero 的 live 迷你演示岛:
 * - GlassDemo(条目 Demo 组件)经 DemoStage 注入 CSS 变量,真实运行;
 * - blur 滑杆写同一 store → 演示实时响应;RM 下滑杆仍可用(spec §6-3:功能不降级)。
 */
export default function HeroGlassDemo({ entryId, schema, openHref, openLabel }: HeroGlassDemoProps) {
  const store = getEntryStore(entryId, schema);
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setTick((n) => n + 1));
    return () => {
      unsubscribe();
    };
  }, [store]);

  const param = store.param("blur") as DimensionParam;
  const blur = store.get("blur") as number;
  /* 滑杆填充断点(spec §3 滑杆解剖):--fill-percent 内联注入,
     与 ParamPanel 同法(React 渲染与 store 值严格同步)。 */
  const fillPercent = `${((param.max > param.min ? (blur - param.min) / (param.max - param.min) : 0) * 100).toFixed(2)}%`;

  return (
    <>
      <GlassDemo entryId={entryId} schema={schema} />
      <div className="hero-glass-ctrl">
        <label className="hero-glass-label" htmlFor="hero-blur">
          blur
        </label>
        <input
          id="hero-blur"
          type="range"
          min={param.min}
          max={param.max}
          step={param.step}
          value={blur}
          aria-label={param.name}
          style={{ "--fill-percent": fillPercent } as CSSProperties}
          onChange={(e) => store.set("blur", Number(e.target.value))}
        />
        <span className="hero-glass-val">
          {blur}
          {param.unit}
        </span>
        <a className="hero-open" href={openHref}>
          {openLabel}
        </a>
      </div>
    </>
  );
}
