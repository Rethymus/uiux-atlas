import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.sp-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px;
}
/* 宿主 chip:唯一 color 声明,所有实例经 currentColor 换装 */
.sp-chip {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 22px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: #ffffff;
  color: rgba(15, 23, 42, 0.9);
  transition: background 0.2s ease, color 0.2s ease;
}
.sp-scene[data-ink="inverse"] .sp-chip {
  background: rgba(15, 23, 42, 0.92);
  border-color: transparent;
  color: #ffffff;
}
.sp-scene[data-ink="duotone"] .sp-chip { background: #f8fafc; }
.sp-slot { display: inline-flex; }
.sp-inline {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
}
.sp-inline svg { flex: none; }
.sp-locked {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: inherit;
  opacity: 0.85;
}
.sp-note {
  max-width: 480px;
  font-size: 12px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
}
.sp-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
}
@media (prefers-reduced-motion: reduce) {
  .sp-chip { transition: none; }
}
`;

/** 裸路径 symbol(无任何 fill/stroke 属性——染色全靠继承) */
const MONO: Record<string, ReactNode> = {
  bell: (
    <>
      <path d="M18.2 9.2a6.2 6.2 0 0 0-12.4 0c0 5.6-2.3 7-2.3 7h17c0 0-2.3-1.4-2.3-7z" />
      <path d="M10.4 19.8a1.9 1.9 0 0 0 3.2 0" />
    </>
  ),
  heart: (
    <path d="M12 19.6C8.5 17 4.6 13.7 4.6 10.2c0-2.6 1.9-4.7 4.3-4.7 1.3 0 2.5.6 3.1 1.6.6-1 1.8-1.6 3.1-1.6 2.4 0 4.3 2.1 4.3 4.7 0 3.5-3.9 6.8-7.4 9.4z" />
  ),
  star: (
    <polygon points="12,3.6 14.5,8.8 20.3,9.5 16.1,13.5 17.2,19.3 12,16.5 6.8,19.3 7.9,13.5 3.7,9.5 9.5,8.8" />
  ),
  bolt: <path d="M13.5 2.75 6 13.5h4.9L10.5 21.25 18 10.5h-4.9z" />,
};

/** Duotone 双层 symbol:背景层 fill=currentColor opacity 0.2(Phosphor 官方实测配方)+ 前景描边层 */
const DUO: Record<string, ReactNode> = {
  bell: (
    <>
      <path
        d="M18.2 9.2a6.2 6.2 0 0 0-12.4 0c0 5.6-2.3 7-2.3 7h17c0 0-2.3-1.4-2.3-7z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M18.2 9.2a6.2 6.2 0 0 0-12.4 0c0 5.6-2.3 7-2.3 7h17c0 0-2.3-1.4-2.3-7zM10.4 19.8a1.9 1.9 0 0 0 3.2 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  heart: (
    <>
      <path
        d="M12 19.6C8.5 17 4.6 13.7 4.6 10.2c0-2.6 1.9-4.7 4.3-4.7 1.3 0 2.5.6 3.1 1.6.6-1 1.8-1.6 3.1-1.6 2.4 0 4.3 2.1 4.3 4.7 0 3.5-3.9 6.8-7.4 9.4z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M12 19.6C8.5 17 4.6 13.7 4.6 10.2c0-2.6 1.9-4.7 4.3-4.7 1.3 0 2.5.6 3.1 1.6.6-1 1.8-1.6 3.1-1.6 2.4 0 4.3 2.1 4.3 4.7 0 3.5-3.9 6.8-7.4 9.4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  star: (
    <>
      <polygon
        points="12,3.6 14.5,8.8 20.3,9.5 16.1,13.5 17.2,19.3 12,16.5 6.8,19.3 7.9,13.5 3.7,9.5 9.5,8.8"
        fill="currentColor"
        opacity="0.2"
      />
      <polygon
        points="12,3.6 14.5,8.8 20.3,9.5 16.1,13.5 17.2,19.3 12,16.5 6.8,19.3 7.9,13.5 3.7,9.5 9.5,8.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  bolt: (
    <>
      <path d="M13.5 2.75 6 13.5h4.9L10.5 21.25 18 10.5h-4.9z" fill="currentColor" opacity="0.2" />
      <path
        d="M13.5 2.75 6 13.5h4.9L10.5 21.25 18 10.5h-4.9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

/** 唯一的 defs/隐藏 svg:4 个裸 symbol + 4 个 duotone symbol + 1 个写死 fill 的反例 */
function SpriteDefs() {
  return (
    <svg width={0} height={0} style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        {Object.entries(MONO).map(([id, art]) => (
          <symbol key={id} id={`sp-${id}`} viewBox="0 0 24 24">
            {art}
          </symbol>
        ))}
        {Object.entries(DUO).map(([id, art]) => (
          <symbol key={id} id={`spd-${id}`} viewBox="0 0 24 24">
            {art}
          </symbol>
        ))}
        <symbol id="sp-locked" viewBox="0 0 24 24">
          <polygon points="12,3.6 14.5,8.8 20.3,9.5 16.1,13.5 17.2,19.3 12,16.5 6.8,19.3 7.9,13.5 3.7,9.5 9.5,8.8" fill="gray" stroke="none" />
        </symbol>
      </defs>
    </svg>
  );
}

/**
 * 雪碧图演示:symbol / ink 均为 JS 型参数。
 * 宿主 chip 只设一处 color → 16/24/32 与行内实例全部经 currentColor 换色(CSS Color 4 §6.4);
 * duotone 靠「换 symbol 引用」而非 CSS 选择器(克隆树不吃文档样式,MDN);
 * sp-locked 的 path 写死 fill="gray" 演示「已定义属性被引用值忽略」的反例。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [symbol, setSymbol] = useState(() => store.get("symbol") as string);
  const [ink, setInk] = useState(() => store.get("ink") as string);

  useEffect(
    () =>
      store.subscribe(() => {
        setSymbol(store.get("symbol") as string);
        setInk(store.get("ink") as string);
      }),
    [store],
  );

  const duo = ink === "duotone";
  const href = duo ? `#spd-${symbol}` : `#sp-${symbol}`;
  const inkZh = { current: "currentColor", inverse: "深底反白", duotone: "Duotone 双层" }[ink] ?? ink;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <SpriteDefs />
      <div className="sp-scene" data-ink={ink}>
        <div className="sp-chip">
          {[16, 24, 32].map((s) => (
            <span key={s} className="sp-slot">
              <svg
                width={s}
                height={s}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <use href={href} />
              </svg>
            </span>
          ))}
          <span className="sp-inline">
            行内 16px
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <use href={href} />
            </svg>
            与文字同色
          </span>
          <span className="sp-locked">
            <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden="true">
              <use href="#sp-locked" />
            </svg>
            写死 fill
          </span>
        </div>
        <div className="sp-readout" aria-live="polite">
          symbol={symbol} · ink={inkZh} · instances=16/24/32/inline(+locked)
        </div>
        <p className="sp-note">
          宿主 chip 只有一处 color 声明:四个 <code>&lt;use&gt;</code> 实例全部经 currentColor
          同步换色;「写死 fill」的 path 始终 gray——引用时已定义属性被忽略(MDN use 规则)。
          Duotone 靠换 symbol 引用(背景层 opacity 0.2 是 Phosphor 官方实测配方),而非对克隆树写 CSS。
          One color declaration re-inks every use instance via currentColor; a hardcoded fill
          ignores the host color (MDN use shadowing); duotone swaps the symbol reference instead of styling the clone tree.
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
