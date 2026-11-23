// dist/ 全部 HTML 无障碍静态门禁(零依赖:仅 node 内建模块;只读产物,不写任何文件)。
// 用法:先 pnpm -C uiux-atlas run build,再 node scripts/check-a11y-static.mjs(或 pnpm run check:a11y)。
// 逐页打印违规明细,任一违规 exit 1。
//
// 四项断言(阈值出处 = 本轮实测基线,2026-11-23 对 399 页静态审计:
// imgTotal=2 / imgNoAlt=0;iconBtn=978 / iconBtnNoName=0;h1BadPages=0;langMissing=0):
// ① img alt 覆盖 100%:每个 <img> 必须有 alt 属性(装饰图 alt="" 计入覆盖;缺属性即违规);
// ② 图标钮可访问名:可见文本为空(剔除 aria-hidden/hidden 子树与 script/style)的 <button>
//    必须具名 —— aria-label / aria-labelledby / title 三者其一(aria-label 为本站惯例,
//    本轮 978 个图标钮全部以 aria-label 具名);
// ③ 每页恰一个 h1(0 个或多于 1 个均违规;WCAG 1.3.1 页面主标题唯一);
// ④ <html lang> 在位且非空(本站双语:zh-CN / en,本轮实测全集恰为这两值)。
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const dist = join(root, "dist");

if (!existsSync(dist)) {
  console.error(`dist missing: ${dist} — run "pnpm -C uiux-atlas run build" first`);
  process.exit(1);
}

// ── 迷你 HTML 解析器(零依赖;属性含引号转义容错,script/style/title 按原文跳过;
//    同一轮静态审计在本仓库 399 页产物上全量跑通,此处沿用同一实现口径)──
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
const RAW = new Set(["script", "style", "textarea", "title"]);

function parseAttrs(str) {
  const attrs = {};
  const re = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]*)))?/g;
  let m;
  while ((m = re.exec(str))) {
    const name = m[1].toLowerCase();
    const val = m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : m[4] !== undefined ? m[4] : "";
    if (!(name in attrs)) attrs[name] = val;
  }
  return attrs;
}

function parseHTML(src) {
  const root = { tag: "#root", attrs: {}, children: [] };
  const stack = [root];
  let i = 0;
  const n = src.length;
  while (i < n) {
    const top = stack[stack.length - 1];
    if (top.raw) {
      const close = src.indexOf("</" + top.tag, i);
      if (close === -1) {
        top.children.push({ text: src.slice(i) });
        i = n;
      } else {
        if (close > i) top.children.push({ text: src.slice(i, close) });
        const gt = src.indexOf(">", close);
        i = gt === -1 ? n : gt + 1;
        stack.pop();
      }
      continue;
    }
    if (src[i] === "<") {
      if (src.startsWith("<!--", i)) {
        const e = src.indexOf("-->", i);
        i = e === -1 ? n : e + 3;
        continue;
      }
      if (src.startsWith("<!", i)) {
        const e = src.indexOf(">", i);
        i = e === -1 ? n : e + 1;
        continue;
      }
      if (src[i + 1] === "/") {
        const e = src.indexOf(">", i);
        const tag = src.slice(i + 2, e === -1 ? n : e).trim().toLowerCase();
        for (let s = stack.length - 1; s > 0; s--)
          if (stack[s].tag === tag) {
            stack.length = s;
            break;
          }
        i = e === -1 ? n : e + 1;
        continue;
      }
      const m = /^<([a-zA-Z][a-zA-Z0-9:-]*)/.exec(src.slice(i, i + 80));
      if (!m) {
        top.children.push({ text: "<" });
        i++;
        continue;
      }
      const tag = m[1].toLowerCase();
      let j = i + m[0].length;
      let q = null;
      while (j < n) {
        const c = src[j];
        if (q) {
          if (c === q) q = null;
        } else if (c === '"' || c === "'") q = c;
        else if (c === ">") break;
        j++;
      }
      if (j >= n) break;
      const attrStr = src.slice(i + m[0].length, j);
      const selfClose = /\/\s*$/.test(attrStr);
      const node = { tag, attrs: parseAttrs(attrStr), children: [] };
      top.children.push(node);
      i = j + 1;
      if (VOID.has(tag) || selfClose) continue;
      if (RAW.has(tag)) node.raw = true;
      stack.push(node);
    } else {
      const nx = src.indexOf("<", i);
      const e = nx === -1 ? n : nx;
      if (e > i) top.children.push({ text: src.slice(i, e) });
      i = e;
    }
  }
  return root;
}

function queryAll(node, pred, out = []) {
  for (const c of node.children ?? []) {
    if (c.text !== undefined) continue;
    if (pred(c)) out.push(c);
    queryAll(c, pred, out);
  }
  return out;
}

// 可访问文本:剔除 script/style 与 aria-hidden="true"/hidden 子树(与审计同口径)
function textOf(node) {
  let out = "";
  for (const c of node.children ?? []) {
    if (c.text !== undefined) out += c.text;
    else if (c.tag === "script" || c.tag === "style") continue;
    else if (c.attrs["aria-hidden"] === "true" || "hidden" in c.attrs) continue;
    else out += textOf(c);
  }
  return out;
}

// ── 逐页审计 ──
function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const files = walk(dist).sort();
const violations = []; // { rel, check, detail }
const totals = { pages: 0, img: 0, imgNoAlt: 0, iconBtn: 0, iconBtnNoName: 0, h1Bad: 0, langMissing: 0 };

for (const f of files) {
  const rel = relative(dist, f).split("\\").join("/");
  const src = readFileSync(f, "utf8");
  const tree = parseHTML(src);
  totals.pages += 1;

  // ① img alt 覆盖 100%(alt="" 装饰图计入;缺 alt 属性即违规)
  for (const im of queryAll(tree, (n) => n.tag === "img")) {
    totals.img += 1;
    if (!("alt" in im.attrs)) {
      totals.imgNoAlt += 1;
      violations.push({ rel, check: "img-alt", detail: `<img> 缺 alt 属性 src="${im.attrs.src ?? ""}"` });
    }
  }

  // ② 图标钮可访问名(可见文本为空的 button 必须具名)
  for (const b of queryAll(tree, (n) => n.tag === "button")) {
    if (textOf(b).trim() !== "") continue;
    totals.iconBtn += 1;
    const named =
      (b.attrs["aria-label"] ?? "").trim() ||
      (b.attrs["aria-labelledby"] ?? "").trim() ||
      (b.attrs.title ?? "").trim();
    if (!named) {
      totals.iconBtnNoName += 1;
      violations.push({
        rel,
        check: "icon-button-name",
        detail: `图标 <button> 无可见文本且未具名(需 aria-label/aria-labelledby/title) class="${b.attrs.class ?? ""}"`,
      });
    }
  }

  // ③ 每页恰一个 h1
  const h1s = queryAll(tree, (n) => n.tag === "h1");
  if (h1s.length !== 1) {
    totals.h1Bad += 1;
    violations.push({ rel, check: "h1-exactly-one", detail: `h1 数量 = ${h1s.length}(应为 1)` });
  }

  // ④ html lang 在位且非空
  const htmlEl = queryAll(tree, (n) => n.tag === "html")[0];
  const lang = htmlEl ? (htmlEl.attrs.lang ?? "").trim() : "";
  if (!lang) {
    totals.langMissing += 1;
    violations.push({ rel, check: "html-lang", detail: "<html> 缺 lang 属性或为空" });
  }
}

// ── 汇总输出 ──
console.log(`check-a11y-static: 审计 ${totals.pages} 页(全部 dist HTML)`);
console.log(`  ① img alt 覆盖: ${totals.img - totals.imgNoAlt}/${totals.img} 张含 alt 属性(alt="" 计入)`);
console.log(`  ② 图标钮可访问名: ${totals.iconBtn - totals.iconBtnNoName}/${totals.iconBtn} 个具名`);
console.log(`  ③ 恰一 h1 页面: ${totals.pages - totals.h1Bad}/${totals.pages}`);
console.log(`  ④ html lang 在位: ${totals.pages - totals.langMissing}/${totals.pages}`);
if (violations.length > 0) {
  console.error(`\n=== ${violations.length} 项违规(逐页明细)===`);
  for (const v of violations) console.error(` - [${v.check}] ${v.rel} :: ${v.detail}`);
  process.exit(1);
}
console.log("check-a11y-static: PASS(0 违规)");
