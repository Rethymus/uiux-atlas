import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.ri-scene { position: absolute; inset: 0; display: flex; gap: 14px; padding: 14px; overflow: auto; }
.ri-left { flex: 1.4; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
.ri-right { flex: 1; min-width: 220px; display: flex; flex-direction: column; gap: 10px; }
.ri-frame-outer { flex: 1; min-height: 0; display: flex; justify-content: center; overflow: hidden; }
.ri-frame {
  transform-origin: top center;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 5%, transparent);
  overflow: hidden;
}
.ri-chrome {
  height: 22px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 8px;
  border-bottom: 1px solid color-mix(in srgb, currentColor 18%, transparent);
  font-size: 10px;
  opacity: 0.7;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.ri-chrome i { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
.ri-viewport { padding: 8px; }
.ri-slot { display: flex; flex-direction: column; gap: 6px; }
.ri-slot img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 6px;
}
.ri-skeleton { height: 10px; border-radius: 5px; background: color-mix(in srgb, currentColor 12%, transparent); }
.ri-readout {
  font-size: 12px;
  line-height: 1.7;
  font-variant-numeric: tabular-nums;
  background: color-mix(in srgb, currentColor 6%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
  border-radius: 8px;
  padding: 8px 10px;
  overflow-wrap: anywhere;
}
.ri-readout strong { font-weight: 650; color: oklch(0.62 0.15 250); }
.ri-readout .ri-hit { color: oklch(0.62 0.15 160); }
.ri-sub { font-size: 11px; opacity: 0.6; margin: 0; }
.ri-code {
  font-family: ui-monospace, "Cascadia Code", Consolas, monospace;
  font-size: 11px;
  line-height: 1.6;
  background: color-mix(in srgb, currentColor 7%, transparent);
  border-radius: 8px;
  padding: 8px 10px;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}
@media (max-width: 640px) {
  .ri-scene { flex-direction: column; }
  .ri-right { min-width: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .ri-scene * { transition: none !important; animation: none !important; }
}
`;

const CANDIDATES = [
  { w: 640, label: "640w(演示补充档,未证实)", bg: "#0f766e" },
  { w: 1200, label: "1200w", bg: "#4338ca" },
  { w: 2400, label: "2400w", bg: "#b45309" },
];

/** 分辨率候选图:16:9(1200×675 与 2400×1350 出自调研 12§1 片段的 width/height 配对),烤入候选标签 */
function candidateUri(c: { w: number; bg: string }): string {
  const h = Math.round((c.w * 675) / 1200);
  const fs = Math.max(28, Math.round(c.w / 12));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${c.w}" height="${h}" viewBox="0 0 1200 675">
  <rect width="1200" height="675" fill="${c.bg}"/>
  <circle cx="1010" cy="130" r="90" fill="rgba(255,255,255,0.35)"/>
  <path d="M0 470 L260 330 L520 460 L780 300 L1200 480 L1200 675 L0 675 Z" fill="rgba(255,255,255,0.22)"/>
  <text x="46" y="150" font-family="monospace" font-size="${fs * 2.2}" fill="#ffffff" font-weight="bold">${c.w}w</text>
  <text x="46" y="240" font-family="monospace" font-size="${fs}" fill="rgba(255,255,255,0.85)">browser picked this candidate</text>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** 艺术指导两幅构图:宽幅(桌面 ≥900px)与方幅(窄视口回退),阈值 900px 出自调研 12§1 片段 */
function cropUri(kind: "wide" | "square"): string {
  const svg =
    kind === "wide"
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <rect width="1200" height="675" fill="#155e75"/>
  <circle cx="1050" cy="150" r="100" fill="#ffd76e"/>
  <path d="M0 480 L300 340 L600 470 L900 330 L1200 470 L1200 675 L0 675 Z" fill="#0c4a6e"/>
  <text x="46" y="130" font-family="monospace" font-size="56" fill="#ffffff" font-weight="bold">宽幅裁切 16:9</text>
  <text x="46" y="200" font-family="monospace" font-size="30" fill="rgba(255,255,255,0.85)">source media="(min-width: 900px)"</text>
</svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
  <rect width="640" height="640" fill="#7c2d12"/>
  <circle cx="470" cy="180" r="120" fill="#ffd76e"/>
  <path d="M0 420 L220 300 L430 430 L640 320 L640 640 L0 640 Z" fill="#431407"/>
  <text x="40" y="120" font-family="monospace" font-size="48" fill="#ffffff" font-weight="bold">方幅裁切 1:1</text>
  <text x="40" y="180" font-family="monospace" font-size="26" fill="rgba(255,255,255,0.85)">窄视口:跳过 source,回退 img</text>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * 响应式图片演示:模拟视口(设备框等比缩放)+ 槽宽占比 → 重写 img 的 sizes,
 * 浏览器按「槽宽 × DPR = 理想宽度」从 srcset 实时重选候选(currentSrc 读真实命中);
 * 右侧 <picture> 艺术指导面板按真实浏览器视口命中 source;fetchpriority 写入属性并展示。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [viewport, setViewport] = useState(() => Number(store.get("viewport") as string));
  const [vwShare, setVwShare] = useState(() => store.get("vwShare") as number);
  const [fp, setFp] = useState(() => store.get("fetchpriority") as string);
  const [dpr, setDpr] = useState(1);
  const [hit, setHit] = useState("…");
  const [artHit, setArtHit] = useState("…");
  const [stageW, setStageW] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const artImgRef = useRef<HTMLImageElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setViewport(Number(store.get("viewport") as string));
        setVwShare(store.get("vwShare") as number);
        setFp(store.get("fetchpriority") as string);
      }),
    [store],
  );

  const slot = Math.round((viewport * vwShare) / 100);
  const ideal = Math.round(slot * dpr);

  // 真实 DPR;切换参数后下一帧读 currentSrc(真实命中候选),不预测
  useEffect(() => {
    setDpr(window.devicePixelRatio || 1);
    const id = window.setTimeout(() => {
      const src = imgRef.current?.currentSrc || imgRef.current?.src || "";
      const m = src.match(/(\d+)w/);
      setHit(m ? `${m[1]}w` : src ? "(兜底 src)" : "…");
    }, 60);
    return () => window.clearTimeout(id);
  }, [viewport, vwShare]);

  // 艺术指导面板:media 条件针对真实浏览器视口求值,监听 resize 如实报告命中(按 currentSrc 与两幅 URI 精确比对)
  const WIDE_URI = cropUri("wide");
  const SQUARE_URI = cropUri("square");
  useEffect(() => {
    const read = () => {
      const src = artImgRef.current?.currentSrc || "";
      setArtHit(src === WIDE_URI ? "宽幅 source(min-width: 900px 命中)" : "方幅 img(窄视口回退)");
    };
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, [WIDE_URI]);

  // fetchpriority 属性写入(React 属性名不统一,直接 setAttribute 最稳)
  useEffect(() => {
    imgRef.current?.setAttribute("fetchpriority", fp);
  }, [fp]);

  // 设备框等比缩放:模拟视口按舞台可用宽度缩到可见(只影响显示,不影响 sizes 的 px 语义)
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setStageW(e.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const scale = Math.min(1, (stageW - 28) / viewport);

  const slotAttrs = { srcSet: CANDIDATES.map((c) => `${candidateUri(c)} ${c.w}w`).join(", "), sizes: `${slot}px` };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ri-scene" ref={sceneRef}>
        <div className="ri-left">
          <div className="ri-frame-outer">
            <div className="ri-frame" style={{ width: viewport, transform: `scale(${scale})` }}>
              <div className="ri-chrome" aria-hidden="true">
                <i style={{ background: "#f87171" }} />
                <i style={{ background: "#fbbf24" }} />
                <i style={{ background: "#34d399" }} />
                <span>模拟视口 {viewport}px · 缩放 {(scale * 100).toFixed(0)}%</span>
              </div>
              <div className="ri-viewport">
                <div className="ri-slot">
                  {/* 兜底 src = 1200w 候选(调研 12§1:全部不匹配时回退 img src) */}
                  <img
                    ref={imgRef}
                    src={candidateUri(CANDIDATES[1])}
                    alt="演示样图:浏览器从 srcset 命中的候选,图上烤有候选宽度标签"
                    width={1200}
                    height={675}
                    {...slotAttrs}
                  />
                  <div className="ri-skeleton" aria-hidden="true" />
                  <div className="ri-skeleton" aria-hidden="true" style={{ width: "70%" }} />
                </div>
              </div>
            </div>
          </div>
          <pre className="ri-code" aria-label="当前 img 的 srcset 与 sizes 声明">{`<img\n  srcset="…640w, …1200w, …2400w"\n  sizes="${slot}px"   /* = ${viewport}px × ${vwShare}% */\n  fetchpriority="${fp}" width="1200" height="675" />`}</pre>
        </div>
        <div className="ri-right">
          <div className="ri-readout">
            <div>模拟视口 <strong>{viewport}px</strong> × 槽宽占比 <strong>{vwShare}%</strong> = 槽宽 <strong>{slot}px</strong></div>
            <div>槽宽 <strong>{slot}px</strong> × DPR <strong>{dpr}</strong> = 理想宽度 <strong>{ideal}px</strong></div>
            <div>浏览器实际命中 <span className="ri-hit"><strong>{hit}</strong></span>(currentSrc 实读)</div>
            <div>fetchpriority = <strong>{fp}</strong>(属性已写入)</div>
          </div>
          <figure style={{ margin: 0 }}>
            <picture>
              {/* 艺术指导:media 条件按真实浏览器视口求值(模拟视口改不了它),900px 阈值出自调研 12§1 片段 */}
              <source media="(min-width: 900px)" srcSet={WIDE_URI} width={1200} height={675} />
              <img ref={artImgRef} src={SQUARE_URI} alt="艺术指导演示:桌面宽幅构图,窄视口方幅构图" width={640} height={640} style={{ width: "100%", height: "auto", display: "block", borderRadius: 6 }} />
            </picture>
            <figcaption className="ri-sub" style={{ marginTop: 6 }}>
              {'<picture>'} 艺术指导:当前命中 {artHit}(拖动真实浏览器窗口宽度可切换)
            </figcaption>
          </figure>
          <p className="ri-sub">
            候选集 640w/1200w/2400w:1200w 与 2400w 逐字出自调研 12§1 片段,640w 为演示补充档(未证实);
            兜底 src = 1200w 候选。切换视口或槽宽占比,左侧图上标签会实时变化。
          </p>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
