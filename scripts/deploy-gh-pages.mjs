#!/usr/bin/env node
/**
 * 本地发布到 gh-pages 分支 —— 不依赖 GitHub Actions。
 *
 * 做什么:构建 → 把 dist/ 的内容作为一次全新提交推到 gh-pages 分支(远端默认 origin)。
 * GitHub Pages 设为「从 gh-pages 分支部署」后,推送即上线。
 *
 * 怎么做到不弄脏工作区:用临时 worktree 检出一个孤儿分支,只在那个目录里提交,
 * 当前分支、暂存区、未提交改动一概不碰;无论成败,结束时 worktree 与本地临时分支都会清掉。
 *
 * 用法:
 *   pnpm run deploy                 # 先构建再发布
 *   pnpm run deploy -- --skip-build # 发布现成的 dist/(不重新构建)
 *   pnpm run deploy -- --dry-run    # 只走流程不推送(用于确认要发布什么)
 *
 * 可用环境变量覆盖:GH_PAGES_BRANCH(默认 gh-pages)、GH_PAGES_REMOTE(默认 origin)。
 * 一次性设置(每个仓库只需做一次,见 README「部署」):
 *   gh api -X POST repos/<owner>/<repo>/pages -f "source[branch]=gh-pages" -f "source[path]=/"
 *
 * 零依赖:仅 node 内建模块 + git。本脚本自身不发起任何网络请求(推送由 git 完成)。
 */
import { existsSync, mkdirSync, writeFileSync, rmSync, readdirSync, copyFileSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(root, "dist");
const BRANCH = process.env.GH_PAGES_BRANCH || "gh-pages";
const BRANCH_REF = "refs/heads/gh-pages"; // 推送目标写死:本脚本只可能改写这一个远端分支
const REMOTE = process.env.GH_PAGES_REMOTE || "origin";
const DRY_RUN = process.argv.includes("--dry-run");
const SKIP_BUILD = process.argv.includes("--skip-build");
const ON_WINDOWS = process.platform === "win32";

/** 预期内的失败:消息直接给用户看,不打印调用栈 */
class DeployError extends Error {}
const fail = (msg) => {
  throw new DeployError(msg);
};

/** 在指定目录执行 git,返回 stdout;非零退出码抛 DeployError */
const git = (args, cwd = root) => {
  const r = spawnSync("git", args, { cwd, encoding: "utf8" });
  if (r.status !== 0) fail(`git ${args.join(" ")} 失败:\n${(r.stderr || r.stdout || "").trim()}`);
  return (r.stdout || "").trim();
};

const worktree = join(tmpdir(), `uiux-atlas-gh-pages-${process.pid}`);
/** 清理:成败都不影响流程 */
const cleanup = () => {
  spawnSync("git", ["worktree", "remove", "--force", worktree], { cwd: root, encoding: "utf8" });
  try {
    rmSync(worktree, { recursive: true, force: true });
  } catch {
    /* 目录不存在 */
  }
  // 孤儿分支只服务于这一次提交,推送后即删,避免残留
  spawnSync("git", ["branch", "-D", BRANCH], { cwd: root, encoding: "utf8" });
};

let publishedFiles = 0;
try {
  // ── 0) 前置检查 ──
  if (git(["branch", "--show-current"]) === BRANCH) fail(`当前就在 ${BRANCH} 分支上,请先切回源码分支`);
  if (!git(["remote"]).split("\n").includes(REMOTE)) fail(`找不到远程 ${REMOTE}(先 git remote add 或用 gh repo create)`);
  const dirty = git(["status", "--porcelain"]);
  if (dirty) {
    fail(
      `工作区有未提交改动,拒绝发布——发布的应当是已入库的源码。先把要上线的内容提交掉:\n${dirty.split("\n").slice(0, 8).join("\n")}`,
    );
  }

  /** 部署子路径与域名:直接读 astro.config.mjs 文本(零依赖,不 import astro) */
  const configText = readFileSync(join(root, "astro.config.mjs"), "utf8");
  const SITE = (configText.match(/\bsite:\s*["']([^"']+)["']/) ?? [])[1] ?? "";
  const RAW_BASE = (configText.match(/\bbase:\s*["']([^"']+)["']/) ?? [])[1] ?? "/";
  const BASE_SLASH = RAW_BASE.endsWith("/") ? RAW_BASE : `${RAW_BASE}/`;
  if (!SITE) fail("astro.config.mjs 的 site 未配置,无法确定发布地址");

  // ── 1) 构建 ──
  if (SKIP_BUILD) {
    console.log("跳过构建(--skip-build):发布现成的 dist/");
  } else {
    console.log("构建中(pnpm run build)…");
    const build = spawnSync(ON_WINDOWS ? "pnpm.cmd" : "pnpm", ["run", "build"], {
      cwd: root,
      stdio: "inherit",
      shell: ON_WINDOWS,
    });
    if (build.status !== 0) fail(`构建失败(exit ${build.status})`);
  }

  // ── 2) 校验产物:是完整站点,且与当前的部署子路径一致(防止发布改了 base 之前的旧产物) ──
  for (const must of ["index.html", "404.html", "llms.txt", "sitemap.xml"]) {
    if (!existsSync(join(DIST, must))) fail(`dist/${must} 不存在——产物不完整,拒绝发布`);
  }
  if (!readFileSync(join(DIST, "index.html"), "utf8").includes(`href="${BASE_SLASH}styles/"`)) {
    fail(
      `dist/index.html 里的站内链接不是以 ${BASE_SLASH} 开头——产物与 astro.config.mjs 的 base 不一致` +
        "(多半是改了 base 之后没重新构建;去掉 --skip-build 再跑)",
    );
  }

  // ── 3) 在临时 worktree 里做一次孤儿提交 ──
  cleanup();
  git(["worktree", "add", "--detach", worktree, "HEAD"]);
  git(["checkout", "--orphan", BRANCH], worktree);
  git(["rm", "-rf", "-q", "."], worktree); // 清空检出的源码:分支上只留站点产物

  const copyTree = (from, to) => {
    mkdirSync(to, { recursive: true });
    for (const e of readdirSync(from, { withFileTypes: true })) {
      const a = join(from, e.name);
      const b = join(to, e.name);
      if (e.isDirectory()) copyTree(a, b);
      else {
        copyFileSync(a, b);
        publishedFiles += 1;
      }
    }
  };
  copyTree(DIST, worktree);
  // GitHub Pages 默认经 Jekyll 构建,会丢弃下划线开头的目录(_astro/ 即全部 JS/CSS);.nojekyll 关掉它
  writeFileSync(join(worktree, ".nojekyll"), "");
  publishedFiles += 1;

  git(["add", "-A", "-f"], worktree); // -f:不受任何 ignore 规则影响,产物一个不漏
  const staged = git(["ls-files"], worktree).split("\n").filter(Boolean).length;
  if (staged !== publishedFiles) fail(`暂存文件数(${staged})与产物文件数(${publishedFiles})不一致`);

  const headSha = git(["rev-parse", "--short", "HEAD"]);
  const headSubject = git(["log", "-1", "--format=%s"]);
  const when = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  // 未配置 git 身份时用一个明确的占位身份,不让发布因 "Please tell me who you are" 失败
  const identity =
    spawnSync("git", ["config", "user.email"], { cwd: worktree, encoding: "utf8" }).stdout?.trim()
      ? []
      : ["-c", "user.name=uiux-atlas deploy", "-c", "user.email=deploy@uiux-atlas.invalid"];
  git(
    [...identity, "commit", "-q", "-m", `deploy: ${headSha} (${when})`, "-m", `源码提交 ${headSha}:${headSubject}`],
    worktree,
  );

  console.log(`\n准备发布:${publishedFiles} 个文件 ← 源码 ${headSha}(${headSubject})`);
  if (DRY_RUN) {
    console.log("--dry-run:未推送。");
  } else {
    console.log(`推送到 ${REMOTE} 的 ${BRANCH} 分支…`);
    git(["push", "--force", REMOTE, `HEAD:${BRANCH_REF}`], worktree);
    console.log("\n发布完成。");
  }
  console.log(`站点地址:${SITE.replace(/\/+$/, "")}${BASE_SLASH}`);
  console.log("注:GitHub Pages 从分支重新构建通常需要几十秒到几分钟,稍候再访问。");
} catch (e) {
  console.error(`\ndeploy-gh-pages: FAIL — ${e instanceof DeployError ? e.message : (e?.stack || e)}`);
  process.exitCode = 1;
} finally {
  cleanup();
}
