import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.demo-stage {
  --cb-border: 2px;
  --cb-link: #0000EE;
}
.cb-page {
  position: absolute;
  inset: 0;
  overflow: auto;
  padding: 28px 24px 40px;
  background: #ffffff;
  color: #000000;
  font-family: "Times New Roman", Times, Georgia, serif;
  font-size: 16px;
  line-height: 1.5;
}
.cb-scene[data-typeface="mono"] .cb-page { font-family: ui-monospace, "Cascadia Mono", "JetBrains Mono", Menlo, Consolas, monospace; }
.cb-page * { border-radius: 0; box-shadow: none; transition: none; }
.cb-page h1 {
  margin: 0 0 8px;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}
.cb-tag { margin: 0 0 20px; font-size: 14px; }
.cb-hr { border: 0; border-top: var(--cb-border) solid #000; margin: 0 0 20px; }
.cb-page a { color: var(--cb-link); text-decoration: underline; }
.cb-box { border: var(--cb-border) solid #000; padding: 14px 16px; margin: 0 0 20px; max-width: 62ch; }
.cb-box h2 { margin: 0 0 10px; font-size: 20px; letter-spacing: -0.02em; text-transform: uppercase; }
.cb-box ul { margin: 0; padding-left: 22px; }
.cb-box li { margin: 2px 0; }
.cb-table { border-collapse: collapse; margin: 0 0 20px; font-size: 15px; }
.cb-table th, .cb-table td { border: var(--cb-border) solid #000; padding: 6px 12px; text-align: left; }
.cb-btn {
  display: inline-block;
  border: var(--cb-border) solid #000;
  background: #ffffff;
  color: #000000;
  font: inherit;
  padding: 6px 16px;
  cursor: pointer;
}
/* 硬反色:零过渡,黑↔白 */
.cb-scene[data-hover-invert="on"] .cb-btn:hover { background: #000000; color: #ffffff; }
.cb-scene[data-hover-invert="off"] .cb-btn:hover { text-decoration: underline; }
.cb-btn:focus-visible { outline: 2px solid #000; outline-offset: 2px; }
.cb-links { margin: 0 0 20px; padding-left: 22px; }
.cb-links li { margin: 2px 0; }
/* 工具条(风格内自洽:直角黑边,无圆角) */
.cb-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
}
.cb-toolbar .cb-btn { padding: 4px 12px; font-size: 12px; }
.cb-footnote { font-size: 13px; color: #333333; }
`;

/**
 * 经典粗野主义演示:一页「裸 HTML 被有意装裱」的功能站。
 * borderWidth / linkColor 为 CSS 变量型参数(经 DemoStage 注入 .demo-stage);
 * typeface / hoverInvert 为 JS 型参数——订阅 store 后切换 data-attribute。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [typeface, setTypeface] = useState(() => store.get("typeface") as string);
  const [hoverInvert, setHoverInvert] = useState(() => store.get("hoverInvert") as string);

  useEffect(
    () =>
      store.subscribe(() => {
        setTypeface(store.get("typeface") as string);
        setHoverInvert(store.get("hoverInvert") as string);
      }),
    [store],
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="cb-scene" data-typeface={typeface} data-hover-invert={hoverInvert}>
        <main className="cb-page">
          <h1>The Brutalist Web</h1>
          <p className="cb-tag">
            Honest materials: content first, links look like links, performance is design.
          </p>
          <hr className="cb-hr" />
          <div className="cb-box">
            <h2>Manifesto</h2>
            <ul>
              <li>默认、未加修饰的 HTML——浏览器默认渲染即是设计。</li>
              <li>链接像链接:默认蓝 <code>#0000EE</code>,下划线永不剥除。</li>
              <li>性能即设计:无字体下载,无装饰图片。</li>
            </ul>
          </div>
          <table className="cb-table">
            <thead>
              <tr>
                <th scope="col">Index</th>
                <th scope="col">Item</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01</td>
                <td><a href="#raw">Raw HTML</a></td>
                <td>Structure over styling</td>
              </tr>
              <tr>
                <td>02</td>
                <td><a href="#mono">System fonts</a></td>
                <td>Zero bytes of type</td>
              </tr>
            </tbody>
          </table>
          <button type="button" className="cb-btn">Submit Query</button>
          <p className="cb-footnote" style={{ marginTop: 20 }}>
            Delete the stylesheet and this page still works. That is the point.
          </p>
          <div className="cb-toolbar" role="group" aria-label="参数对照切换 Switches">
            <button
              type="button"
              className="cb-btn"
              aria-pressed={typeface === "mono"}
              onClick={() => store.set("typeface", typeface === "mono" ? "system" : "mono")}
            >
              {typeface === "mono" ? "Mono ✓" : "Mono"}
            </button>
            <button
              type="button"
              className="cb-btn"
              aria-pressed={hoverInvert === "on"}
              onClick={() => store.set("hoverInvert", hoverInvert === "on" ? "off" : "on")}
            >
              {hoverInvert === "on" ? "Invert ✓" : "Invert"}
            </button>
          </div>
        </main>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
