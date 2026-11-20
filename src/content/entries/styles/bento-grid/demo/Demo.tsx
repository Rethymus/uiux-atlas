import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.demo-stage {
  --bento-cols: 4;
  --bento-row: 180px;
  --bento-gap: 16px;
  --bento-radius: 24px;
}
.bg-scene {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 24px;
  background: #ececf0;
  container-type: inline-size;
  container-name: bg-stage;
}
.bg-grid {
  display: grid;
  grid-template-columns: repeat(var(--bento-cols), minmax(0, 1fr));
  grid-auto-rows: var(--bento-row);
  gap: var(--bento-gap);
  grid-auto-flow: dense;
  max-width: 980px;
  margin: 0 auto;
}
/* 断点(调研:768px→2 列、480px→1 列并重置 span);demo 用容器查询随演示台宽度生效 */
@container bg-stage (max-width: 768px) {
  .bg-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .bg-cell { grid-column: span 2 !important; grid-row: span 1 !important; }
}
@container bg-stage (max-width: 480px) {
  .bg-grid { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .bg-cell { grid-column: auto !important; grid-row: auto !important; }
}
/* 单元格:大小编码优先级,每格一个事实;颜色只是内容,bento 是布局不是配色 */
.bg-cell {
  border-radius: var(--bento-radius);
  background: #f5f5f7;
  color: #1d1d1f;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  animation: bg-in 0.45s ease-out both;
}
.bg-cell-dark { background: #161617; color: #f5f5f7; }
.bg-cell-blue { background: #eaf1fd; }
.bg-num { font-size: 26px; font-weight: 700; letter-spacing: -0.01em; line-height: 1.1; }
.bg-label { font-size: 11px; letter-spacing: 0.04em; color: #6e6e73; margin-top: 4px; }
.bg-cell-dark .bg-label { color: #a1a1a6; }
.bg-hero-num { font-size: 34px; }
.bg-hint {
  max-width: 980px;
  margin: 14px auto 0;
  font-size: 11px;
  color: #6e6e73;
}
.bg-a { animation-delay: 0.04s; }
.bg-b { animation-delay: 0.08s; }
.bg-c { animation-delay: 0.12s; }
.bg-d { animation-delay: 0.16s; }
.bg-e { animation-delay: 0.2s; }
.bg-f { animation-delay: 0.24s; }
@keyframes bg-in {
  from { opacity: 0; translate: 0 8px; }
  to { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .bg-cell { animation: none; }
}
`;

/**
 * 便当盒布局演示:真 CSS Grid + span 层级 + dense 回填 + 容器查询断点。
 * cols / rowHeight / gap / radius 均为 CSS 变量型参数(经 DemoStage 注入 .demo-stage),
 * 本条目无 JS 型参数,无需订阅 store;
 * DOM 顺序 = 阅读顺序,逐格交错入场,reduced-motion 直出终态。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="bg-scene">
        <div className="bg-grid">
          <div className="bg-cell bg-cell-dark" style={{ gridColumn: "span 2", gridRow: "span 2" }}>
            <span className="bg-num bg-hero-num">3×</span>
            <span className="bg-label">最重要的事实:全新芯片跑分 / The headline fact: new silicon, 3× faster</span>
          </div>
          <div className="bg-cell bg-cell-blue bg-a" style={{ gridColumn: "span 2" }}>
            <span className="bg-num">24h</span>
            <span className="bg-label">全天续航 All-day battery</span>
          </div>
          <div className="bg-cell bg-b">
            <span className="bg-num">8K</span>
            <span className="bg-label">视频录制 Video recording</span>
          </div>
          <div className="bg-cell bg-c">
            <span className="bg-num">7</span>
            <span className="bg-label">Wi-Fi 代数 Wi-Fi generation</span>
          </div>
          <div className="bg-cell bg-d" style={{ gridRow: "span 2" }}>
            <span className="bg-num">-40%</span>
            <span className="bg-label">机身碳足迹,纵向格承载纵向事实 / Carbon footprint — a tall cell for a vertical story</span>
          </div>
          <div className="bg-cell bg-e">
            <span className="bg-num">100%</span>
            <span className="bg-label">回收铝 Recycled aluminum</span>
          </div>
          <div className="bg-cell bg-f">
            <span className="bg-num">P16</span>
            <span className="bg-label">隐私协处理器 Privacy processor</span>
          </div>
        </div>
        <p className="bg-hint">
          缩窄窗口看断点降列(768px→2 列、480px→1 列) / Narrow the window for the breakpoints (768px→2 columns, 480px→1).
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
