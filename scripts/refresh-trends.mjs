#!/usr/bin/env node
/**
 * refresh-trends.mjs —— 「趋势追踪」数据季度刷新脚手架(零依赖、只读、不联网)。
 *
 * 职责边界(与 README「已知局限」同口径):本脚本只打印操作手册与过期提醒,
 * 不做任何网络抓取 —— 数据重抓必须由人工重跑 out/research/03 的联网检索流程。
 *
 * 读取(全部只读):
 *  - src/data/trends.ts 的结构注释:接口字段注释 + TRENDS_LAST_REVIEWED 复核日期;
 *  - 上游工作区 ../out/research/03-visual-style-trends.md(与 uiux-atlas/ 平级,不入库):
 *    全文章节清单 + §2.3「年度趋势报告清单」内的来源 URL(要重抓的来源)。
 *
 * 输出:「季度刷新操作手册」—— 哪些来源要重抓 / 数据文件哪个字段要更新 / 口径标注模板。
 *
 * 退出码:
 *  - lastReviewed 距今 >90 天(数据过期)或缺失/不可解析 → exit 1 提醒重跑调研;
 *  - 其余情形(含 03 调研不在位,仅降级提示)→ 打印手册后 exit 0。
 *
 * 用法:node scripts/refresh-trends.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TRENDS_PATH = join(ROOT, "src", "data", "trends.ts");
// 03 号调研在上游工作区(与 uiux-atlas/ 平级),不入库 —— 缺失时降级为提示,不影响退出码
const STUDY_PATH = resolve(ROOT, "..", "out", "research", "03-visual-style-trends.md");

/** 过期阈值(天):README「已知局限」/ 路线图同口径 */
const STALE_AFTER_DAYS = 90;

/* ── 解析 trends.ts:结构注释 + lastReviewed ─────────────────────────────── */

/** 提取 lastReviewed 日期:优先 TRENDS_LAST_REVIEWED 常量,兼容 lastReviewed 键/注释写法 */
function parseLastReviewed(source) {
  const patterns = [
    /TRENDS_LAST_REVIEWED\s*=\s*["'](\d{4}-\d{2}-\d{2})["']/,
    /lastReviewed["']?\s*[:=]\s*["']?(\d{4}-\d{2}-\d{2})/,
  ];
  for (const re of patterns) {
    const m = source.match(re);
    if (m) return m[1];
  }
  return null;
}

/** 解析 export interface Trend { ... } 的字段与逐字段 jsdoc 注释(结构注释即字段说明) */
function parseTrendInterface(source) {
  const m = source.match(/export interface Trend \{([\s\S]*?)\n\}/);
  if (!m) return [];
  const fields = [];
  let pendingComment = null;
  for (const line of m[1].split("\n")) {
    const comment = line.match(/\/\*\*\s*(.*?)\s*\*\/\s*$/);
    if (comment) {
      pendingComment = pendingComment ? `${pendingComment} ${comment[1]}` : comment[1];
      continue;
    }
    const field = line.match(/^\s{2}(\w+)(\?)?:/);
    if (field) {
      fields.push({ name: field[1], comment: pendingComment ?? "" });
      pendingComment = null;
    } else if (line.trim() !== "") {
      pendingComment = null;
    }
  }
  return fields;
}

/* ── 解析 03 号调研:章节清单 + §2.3 来源 URL ────────────────────────────── */

/** 全文标题(≤#### 级),保持原文顺序 */
function parseSections(markdown) {
  const sections = [];
  for (const m of markdown.matchAll(/^#{1,4}\s+(.+?)\s*$/gm)) sections.push(m[1]);
  return sections;
}

/** 截取「### 2.3」小节到下一个「## 」大节之间,抽出去重要重抓的 http(s) 来源(去重保序) */
function parseStudySources(markdown) {
  const start = markdown.search(/^### 2\.3\b/m);
  if (start === -1) return [];
  const rest = markdown.slice(start);
  const end = rest.search(/^##\s/m);
  const block = end === -1 ? rest : rest.slice(0, end);
  const seen = new Set();
  const urls = [];
  for (const m of block.matchAll(/https?:\/\/[^\s)」;|、】\]]+/g)) {
    const url = m[0].replace(/[.,;:]+$/, "");
    if (!seen.has(url)) {
      seen.add(url);
      urls.push(url);
    }
  }
  return urls;
}

/* ── 输出 ────────────────────────────────────────────────────────────────── */

function daysSince(iso) {
  const [yy, mm, dd] = iso.split("-").map(Number);
  const now = new Date();
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((todayUtc - Date.UTC(yy, mm - 1, dd)) / 86_400_000);
}

const hr = "─".repeat(72);

function main() {
  if (!existsSync(TRENDS_PATH)) {
    process.stderr.write(`[refresh-trends] 找不到数据文件:${TRENDS_PATH}\n`);
    process.exit(1);
  }
  const trendsSource = readFileSync(TRENDS_PATH, "utf8");

  const lastReviewed = parseLastReviewed(trendsSource);
  if (!lastReviewed) {
    process.stderr.write(
      `[refresh-trends] ${TRENDS_PATH} 内未找到 lastReviewed 日期(期望 TRENDS_LAST_REVIEWED = "yyyy-mm-dd")—— 无法判断快照新鲜度,按纪律 exit 1。\n`,
    );
    process.exit(1);
  }
  const days = daysSince(lastReviewed);
  const stale = days > STALE_AFTER_DAYS;

  const hasStudy = existsSync(STUDY_PATH);
  let sections = [];
  let sources = [];
  if (hasStudy) {
    const markdown = readFileSync(STUDY_PATH, "utf8");
    sections = parseSections(markdown);
    sources = parseStudySources(markdown);
  }

  const fields = parseTrendInterface(trendsSource);

  console.log(hr);
  console.log("uiux-atlas 趋势数据 · 季度刷新操作手册(脚手架只管流程,不抓数据)");
  console.log(hr);
  console.log(`数据文件      src/data/trends.ts`);
  console.log(`lastReviewed  ${lastReviewed}(距今 ${days} 天;过期阈值 ${STALE_AFTER_DAYS} 天)`);
  console.log(`依据调研      ../out/research/03-visual-style-trends.md ${hasStudy ? "" : "(不在位:本仓库不入库 out/ 调研产物,请先在上游工作区备好,本手册相应两节降级)"}`);
  console.log("");

  console.log("── 一、要重抓的来源(人工重跑 03 号调研的联网检索流程;份额类以 superdesign.dev 各风格页为准)──");
  if (sources.length === 0) {
    console.log("  (03 号调研不在位,无法列出 §2.3 来源清单 —— 跳过)");
  } else {
    sources.forEach((url, i) => console.log(`  ${String(i + 1).padStart(2)}. ${url}`));
  }
  console.log("");

  console.log("── 二、03 号调研章节清单(刷新时逐节对照;数值/判断以刷新后的最新章节为准)──");
  if (sections.length === 0) {
    console.log("  (03 号调研不在位,无法列出章节清单 —— 跳过)");
  } else {
    sections.forEach((s, i) => console.log(`  ${String(i + 1).padStart(2)}. ${s}`));
  }
  console.log("");

  console.log("── 三、src/data/trends.ts 要更新的字段(来自该文件的结构注释)──");
  console.log("   TRENDS_LAST_REVIEWED → 刷新后必改:数据复核日期(ISO yyyy-mm-dd),本脚本以此判断过期");
  if (fields.length === 0) {
    console.log("   (未能解析 export interface Trend —— 请人工对照该文件头注释)");
  } else {
    const width = Math.max(...fields.map((f) => f.name.length));
    for (const f of fields) {
      const tail = f.comment ? ` —— ${f.comment}` : "";
      console.log(`   ${f.name.padEnd(width)} → 按 03 最新小节刷新${tail}`);
    }
  }
  console.log("   TRENDS / TREND_COUNT  → 条目增删随 03 判定(新增条目同样补 note/source;TREND_COUNT 自动跟随数组长度)");
  console.log("");

  console.log("── 四、口径标注模板(写入 note 字段;份额类强制标注,依据 03 §四-3 数据口径提示)──");
  console.log('   份额类(强制):「份额口径:superdesign.dev 单一 AI 设计工具的请求份额(<N> 次生成统计,区间 <起>–<止>),非全市场采用率。」');
  console.log('   年度报告共识类:「口径:<报告名>(<年份>)年度趋势共识,非份额统计。」');
  console.log('   权威评测/官方规范类:「口径:权威评测与官方规范动向(<机构,如 NN/g / Apple>),非份额统计;与相邻条目口径不同、并列呈现。」');
  console.log("   · 未经官方页核实/单源转述的判断,照 03 原文如实标注「未证实」或「(摘要)」,不升格为结论;");
  console.log("   · source 字段必须写明 03 号调研的具体小节(如 §2.2「兴起」第 n 条)+ 一手来源 URL。");
  console.log("");
  console.log(hr);
  if (stale) {
    console.error(
      `[refresh-trends] [过期] lastReviewed ${lastReviewed} 距今 ${days} 天 > ${STALE_AFTER_DAYS} 天 —— ` +
        "趋势快照已过期:请重跑 out/research/03 的联网检索流程并刷新 src/data/trends.ts(本脚本按纪律 exit 1)。",
    );
    process.exit(1);
  }
  console.log(`[refresh-trends] [ok] lastReviewed ${lastReviewed} 距今 ${days} 天 ≤ ${STALE_AFTER_DAYS} 天 —— 新鲜度门禁通过,exit 0。`);
}

main();
