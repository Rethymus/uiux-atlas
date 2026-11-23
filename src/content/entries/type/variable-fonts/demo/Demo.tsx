import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

/* standard 全轴 Inter(wght + opsz;默认 index.css 仅 wght 轴)按需加载
   (perf-font-inter-duplicate):本 demo 的 opsz 滑杆功能依赖全轴文件,不能删;
   但旧写法 `import "@fontsource-variable/inter/standard.css"` 会让 Astro 把这套
   @font-face 内联进全站 372 个条目页(2.1KB/页),并把 332KB 的 standard 集
   woff2 变成实际下载源(同 family/weight/range 下后声明覆盖 wght 集)。
   改为 Vite ?url 资产引用:构建期产出独立 CSS 文件,仅本 demo 模块被
   动态加载时才注入 <link>,其他页面不再携带、也不再命中这套字体。 */
import standardCssUrl from "@fontsource-variable/inter/standard.css?url";

/* 模块级单例:同一页面重复挂载不重复注入;不随卸载移除(fontsource CSS
   无状态,卸载后字形继续由已加载字体渲染,避免闪烁) */
let standardCssInjected = false;
function ensureStandardCss() {
  if (standardCssInjected) return;
  standardCssInjected = true;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = standardCssUrl;
  document.head.appendChild(link);
}

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 字重参照梯(静态,便于对比当前轴值的相对位置) */
const WEIGHT_LADDER = [100, 300, 400, 700, 900] as const;

const css = `
.vf-wrap { width: 100%; display: flex; flex-direction: column; gap: 14px; }
.vf-stage {
  padding: 18px 20px;
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 12px;
  background: color-mix(in srgb, currentColor 6%, transparent);
  font-family: "Inter Variable", system-ui, sans-serif;
}
.vf-sample {
  margin: 0;
  font-size: 44px;
  line-height: 1.1;
  letter-spacing: -0.01em;
  font-optical-sizing: none;
  font-variation-settings: "wght" var(--vf-wght), "opsz" var(--vf-opsz);
}
.vf-para {
  margin: 8px 0 0;
  font-size: 15px;
  line-height: 1.6;
  font-optical-sizing: none;
  font-variation-settings: "wght" var(--vf-wght), "opsz" var(--vf-opsz);
}
.vf-meta {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 10px;
  font: 11px/1.4 ui-monospace, Menlo, Consolas, monospace;
  opacity: 0.72;
}
.vf-ladder { display: flex; gap: 12px; flex-wrap: wrap; align-items: baseline; }
.vf-ladder-item { display: flex; flex-direction: column; gap: 2px; }
.vf-ladder-item span:first-child {
  font-family: "Inter Variable", system-ui, sans-serif;
  font-size: 26px;
  line-height: 1.15;
  font-optical-sizing: none;
}
.vf-ladder-item span:last-child {
  font: 10px/1.3 ui-monospace, Menlo, Consolas, monospace;
  opacity: 0.65;
}
.vf-code {
  margin: 0;
  padding: 10px 14px;
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 7%, transparent);
  font: 12px/1.7 ui-monospace, Menlo, Consolas, monospace;
  white-space: pre-wrap;
}
.vf-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
`;

/**
 * 可变字体演示:wght/opsz 为 CSS 型参数(DemoStage 注入 --vf-wght/--vf-opsz),
 * 样张文字的 font-variation-settings 直接消费变量,拖动面板滑杆即时重排字形;
 * 字重参照梯为静态对照组。全程无动画,无需 reduced-motion 降级。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [axes, setAxes] = useState<{ wght: number; opsz: number }>(() => ({
    wght: store.get("wght") as number,
    opsz: store.get("opsz") as number,
  }));

  // 挂载即补注入 standard 全轴 CSS(opsz 轴生效前提;见文件头说明)
  useEffect(() => {
    ensureStandardCss();
  }, []);

  useEffect(
    () =>
      store.subscribe(() => {
        setAxes({ wght: store.get("wght") as number, opsz: store.get("opsz") as number });
      }),
    [store],
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="vf-wrap">
        <div className="vf-stage">
          <p className="vf-sample">Inter 变轴 Variable 123</p>
          <p className="vf-para">
            字重与光学字号都是连续轴:拖动面板滑杆,字形即时重绘。Weight and optical size are
            continuous axes — drag the panel sliders and the glyphs re-render instantly.
          </p>
          <div className="vf-meta">
            <span>wght = {axes.wght}</span>
            <span>opsz = {axes.opsz}</span>
            <span>opsz=14 → x-height 1118/2048 UPM(text 档)</span>
            <span>opsz=32 → 1056/2048(display 档)</span>
          </div>
        </div>
        <div className="vf-ladder" aria-label="字重参照梯 Weight reference ladder">
          {WEIGHT_LADDER.map((w) => (
            <div className="vf-ladder-item" key={w}>
              <span style={{ fontVariationSettings: `"wght" ${w}, "opsz" 14` }}>Ag 12</span>
              <span>wght {w}</span>
            </div>
          ))}
        </div>
        <pre className="vf-code" aria-label="生成的 CSS generated CSS">
          {`.vf-sample {\n  font-optical-sizing: none;\n  font-variation-settings: "wght" ${axes.wght}, "opsz" ${axes.opsz};\n}`}
        </pre>
        <p className="vf-hint">
          参照梯固定 opsz 14,便于对照当前 wght 的相对位置;opsz 调高时观察字形对比度与紧凑度变化(Inter display 档)。
          The ladder is pinned at opsz 14 for comparison; raise opsz and watch the display optical size tighten and gain contrast.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
