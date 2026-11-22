import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.cjk-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.cjk-support { display: flex; flex-wrap: wrap; gap: 8px; }
.cjk-badge { font-size: 12px; padding: 3px 10px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  background: color-mix(in srgb, currentColor 8%, transparent); }
.cjk-badge strong { font-variant-numeric: tabular-nums; }
.cjk-article {
  max-width: 44em;
  text-align: var(--cjk-align);
  line-height: 2;
  padding: 14px 16px;
  border: 1px dashed color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px;
}
.cjk-article p {
  margin: 0 0 0.75em;
  text-indent: var(--cjk-indent);
  text-autospace: var(--cjk-autospace);
  text-spacing-trim: var(--cjk-punct-trim);
}
.cjk-article p:last-child { margin-block-end: 0; }
.cjk-article .cjk-lead { text-indent: 0; font-weight: 650; }
.cjk-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.7; }
`;

/**
 * 中文排版演示:四个参数(autospace/indent/align/punctTrim)均为 CSS 变量型,
 * 经 DemoStage 注入 .demo-stage;新属性支持态用 CSS.supports 实时探测,
 * 避免在不支持的浏览器里误读「标点挤压没有效果」。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [tick, setTick] = useState(0);

  useEffect(() => store.subscribe(() => setTick((n) => n + 1)), [store]);
  void tick; // 订阅触发重渲染(属性值由 CSS 变量直接消费)

  // 浏览器支持态只在挂载后探测一次(SSR 安全)
  const [supportsAutospace, setSupportsAutospace] = useState<boolean | null>(null);
  const [supportsTrim, setSupportsTrim] = useState<boolean | null>(null);
  useEffect(() => {
    setSupportsAutospace(typeof CSS !== "undefined" && CSS.supports("text-autospace", "normal"));
    setSupportsTrim(typeof CSS !== "undefined" && CSS.supports("text-spacing-trim", "normal"));
  }, []);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="cjk-wrap">
        <div className="cjk-support">
          <span className="cjk-badge">
            text-autospace{" "}
            <strong>{supportsAutospace === null ? "…" : supportsAutospace ? "✓ 本浏览器支持" : "✗ 未支持(声明被忽略)"}</strong>
          </span>
          <span className="cjk-badge">
            text-spacing-trim{" "}
            <strong>{supportsTrim === null ? "…" : supportsTrim ? "✓ 本浏览器支持(实验性)" : "✗ 未支持(Chrome/Edge 123+)"}</strong>
          </span>
        </div>
        <div className="cjk-article">
          <p className="cjk-lead">中文排版:缩进、对齐、中西间距与标点挤压</p>
          <p>
            汉字与标点的字框是正方形,各占一个字宽。W3C 的《中文排版需求》(clreq)把段首缩进两字、行尾对齐等规则整理成文,供排版引擎与设计系统参考。
          </p>
          <p>
            中西混排时,汉字与拉丁字母、数字之间原则上留出不多于四分之一个汉字宽的间距——text-autospace 在排版引擎层面自动完成这件事,2025-11 起进入新基线,复制、搜索与朗读都不受影响。
          </p>
          <p>
            标点挤压(clreq §6.3.2)压缩全角标点的内部留白:「引号」、(括号)、冒号:后的空隙因此收紧;CSS 侧由实验性的 text-spacing-trim 落地,目前仅 Chrome/Edge 123+ 支持。
          </p>
        </div>
        <p className="cjk-note">
          数值出处:缩进 2 字、中西间距 ≤¼ 字宽、两端对齐原则出自 W3C clreq(调研 05§21/22 已核对);text-autospace 2025-11 新基线(MDN);text-spacing-trim 实验性,BCD @main 2026-11-22:Chrome/Edge 123+,Firefox/Safari 未支持。
          Sources: the 2-em indent, ≤¼-width CJK-Latin spacing and justification come from W3C clreq (verified, research 05 §21/22); text-autospace is Baseline since 2025-11 (MDN); text-spacing-trim is experimental — BCD @main 2026-11-22: Chrome/Edge 123+, Firefox/Safari unsupported.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
