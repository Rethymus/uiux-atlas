import { useState } from "react";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.demo-stage {
  --nb-shadow: 4px;
  --nb-border: 3px;
  --nb-radius: 0px;
  --nb-accent: #ff90e8;
}
.nb-scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fffdf5;
  animation: nb-in 0.3s ease-out both;
}
/* 判据配方:box-shadow: 4px 4px 0 #000(偏移可调,零模糊零扩散) */
.nb-card {
  width: min(340px, calc(100% - 32px));
  padding: 24px;
  border: var(--nb-border) solid #000;
  border-radius: var(--nb-radius);
  box-shadow: var(--nb-shadow) var(--nb-shadow) 0 #000;
  background: #fffdf5;
  color: #111111;
}
.nb-badge {
  display: inline-block;
  padding: 3px 10px;
  border: var(--nb-border) solid #000;
  border-radius: var(--nb-radius);
  background: var(--nb-accent);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #111111;
}
.nb-card h3 { margin: 14px 0 6px; font-size: 24px; font-weight: 800; line-height: 1.15; letter-spacing: -0.01em; }
.nb-hint { margin: 0 0 18px; font-size: 12px; color: #444444; }
.nb-row { display: flex; gap: 12px; }
.nb-btn {
  flex: 1;
  padding: 12px 0;
  border: var(--nb-border) solid #000;
  border-radius: var(--nb-radius);
  background: var(--nb-accent);
  color: #111111;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--nb-shadow) var(--nb-shadow) 0 #000;
}
/* 按压:位移到阴影原点并吞掉阴影(非阴影动画) */
.nb-btn:active { translate: var(--nb-shadow) var(--nb-shadow); box-shadow: none; }
.nb-btn-ghost { background: #ffffff; color: #111111; }
.nb-btn:focus-visible { outline: 3px solid #000; outline-offset: 3px; }
.nb-checks { margin-top: 18px; display: grid; gap: 8px; }
.nb-check {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border: var(--nb-border) solid #000;
  border-radius: var(--nb-radius);
  background: #ffffff;
  font-size: 13px;
  cursor: pointer;
  user-select: none;
}
.nb-check input { appearance: none; width: 16px; height: 16px; margin: 0; border: var(--nb-border) solid #000; border-radius: calc(var(--nb-radius) / 2); background: #ffffff; cursor: pointer; }
.nb-check input:checked { background: var(--nb-accent); }
.nb-check input:focus-visible { outline: 3px solid #000; outline-offset: 3px; }
@keyframes nb-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .nb-scene { animation: none; }
  .nb-btn, .nb-check input { transition: none; }
}
`;

/**
 * 新粗野主义演示:黑描边 + 零模糊硬偏移阴影 + 糖果强调色。
 * shadowOffset / borderWidth / radius / accent 均为 CSS 变量型参数(经 DemoStage 注入 .demo-stage),
 * 本条目无 JS 型参数,无需订阅 store;
 * 按压反馈 = translate 到阴影原点 + 阴影归零,硬切换无过渡。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const [picked, setPicked] = useState<Record<string, boolean>>({ fast: true });

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="nb-scene">
        <div className="nb-card">
          <span className="nb-badge">New · v4</span>
          <h3>Loud, flat, honest.</h3>
          <p className="nb-hint">
            按住按钮:块面被按进纸里 / Hold a button: the block sinks into the paper.
          </p>
          <div className="nb-row">
            <button type="button" className="nb-btn">主操作 Action</button>
            <button type="button" className="nb-btn nb-btn-ghost">次要 Ghost</button>
          </div>
          <div className="nb-checks">
            <label className="nb-check">
              <input
                type="checkbox"
                checked={!!picked.fast}
                onChange={(e) => setPicked((p) => ({ ...p, fast: e.target.checked }))}
              />
              黑描边 + 硬阴影 Thick outline + hard shadow
            </label>
            <label className="nb-check">
              <input
                type="checkbox"
                checked={!!picked.candy}
                onChange={(e) => setPicked((p) => ({ ...p, candy: e.target.checked }))}
              />
              单一糖果强调色 One candy accent
            </label>
          </div>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
