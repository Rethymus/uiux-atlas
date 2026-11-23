// 构建后集成:为 LCP 文本字体(Inter Variable wght 集 latin 子集 woff2)注入
// <link rel="preload as="font"> 到全部 HTML(perf-css-render-blocking)。
//
// 背景:全站唯一渲染阻塞样式表 dist/_astro/index.*.css 内含全部 @font-face,
// 字体请求最早也要等 CSS 下载+解析完才开始;latin 子集(48,256B)承载双语站
// 全部西文与数字,是文本 LCP 的真实字体。preload 让它在 head 解析期即以高
// 优先级与 CSS 并行拉取。as="font" 必须带 crossorigin(字体请求恒为 CORS 模式,
// 同源也一样),否则 preload 会被二次下载。
//
// 只预载 latin、不预载 latin-ext 的理由(与审计清单措辞的差异,如实标注):
// latin-ext-wght woff2 = 85,068B,且 fontsource latin 子集已覆盖 U+0000-00FF
// (é × ñ 等都在 latin 内);实测 399 页中仅 2 页含 Latin-Ext-A 字符(ł)。
// 全站预载 latin-ext 会对 397 个永远不会命中 unicode-range 的页面强制 +85KB
// 首访下载,净收益为负,故不做。
//
// 零依赖:仅 node 内建模块;每次 astro build 在产物上重新执行(哈希名每次
// 构建扫描所得),幂等(已注入则跳过)。
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const LATIN_PRELOAD_RE = /^inter-latin-wght-normal\..+\.woff2$/;
const ANCHOR = '<meta name="viewport" content="width=device-width, initial-scale=1" />';
const MARK = 'data-font-preload="inter-latin"';

export function fontPreload() {
  return {
    name: "font-preload",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        let latinUrl = "";
        try {
          for (const f of readdirSync(join(out, "_astro"))) {
            if (LATIN_PRELOAD_RE.test(f)) {
              latinUrl = `/_astro/${f}`;
              break;
            }
          }
        } catch {
          logger.warn("font-preload: no _astro assets dir, skip");
          return;
        }
        if (!latinUrl) {
          logger.warn("font-preload: inter latin woff2 not found in _astro, skip");
          return;
        }
        const inject = `<link ${MARK} rel="preload" href="${latinUrl}" as="font" type="font/woff2" crossorigin />`;
        let pages = 0;
        let injected = 0;
        const walk = (d) => {
          for (const e of readdirSync(d, { withFileTypes: true })) {
            const p = join(d, e.name);
            if (e.isDirectory()) {
              walk(p);
            } else if (e.name.endsWith(".html")) {
              pages += 1;
              let html = readFileSync(p, "utf8");
              if (html.includes(MARK)) return; // 幂等:重复执行不重复注入
              if (html.includes(ANCHOR)) {
                html = html.replace(ANCHOR, `${ANCHOR}${inject}`);
              } else {
                html = html.replace("</head>", `${inject}</head>`);
              }
              writeFileSync(p, html);
              injected += 1;
            }
          }
        };
        walk(out);
        logger.info(`font-preload: injected ${inject.length}B preload (${latinUrl}) into ${injected}/${pages} HTML`);
      },
    },
  };
}
