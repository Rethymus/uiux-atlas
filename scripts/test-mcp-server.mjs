// uiux-atlas MCP server 冒烟测试:spawn mcp/server.mjs,走 initialize → tools/list → tools/call JSON-RPC 序列。
// 门禁:全部断言通过 exit 0;任一断言失败打印明细并 exit 1。
// 用法: node uiux-atlas/scripts/test-mcp-server.mjs  (或 pnpm -C uiux-atlas run test:mcp)
import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const serverPath = join(root, "mcp", "server.mjs");

const REQUEST_TIMEOUT_MS = 15_000;
const OVERALL_TIMEOUT_MS = 30_000;

const child = spawn(process.execPath, [serverPath], { stdio: ["pipe", "pipe", "pipe"] });
const failures = [];

const rl = createInterface({ input: child.stdout, terminal: false });
const waiters = new Map(); // id → { resolve, timer }

rl.on("line", (line) => {
  if (line.trim() === "") return;
  let msg;
  try {
    msg = JSON.parse(line);
  } catch (e) {
    failures.push(`server stdout 输出了非 JSON 行(spec:stdout 只允许合法 MCP 消息): ${JSON.stringify(line.slice(0, 200))} — ${e.message}`);
    return;
  }
  const waiter = waiters.get(msg.id);
  if (waiter) {
    clearTimeout(waiter.timer);
    waiters.delete(msg.id);
    waiter.resolve(msg);
  }
  // 通知/无 waiter 的消息忽略
});

child.stderr.on("data", (d) => process.stderr.write(`[server:stderr] ${d}`));
child.on("exit", (code) => {
  if (!finished && code !== 0 && code !== null) {
    failures.push(`server 进程异常退出(code=${code})`);
  }
});

function send(message) {
  child.stdin.write(`${JSON.stringify(message)}\n`);
}

function request(id, method, params) {
  return new Promise((resolveRequest) => {
    const timer = setTimeout(() => {
      waiters.delete(id);
      resolveRequest({ __timeout: true, method });
    }, REQUEST_TIMEOUT_MS);
    waiters.set(id, { resolve: resolveRequest, timer });
    send({ jsonrpc: "2.0", id, method, params });
  });
}

const assert = (name, ok, detail = "") => {
  if (ok) console.log(`  ok: ${name}`);
  else failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
};

const overallTimer = setTimeout(() => {
  failures.push(`overall timeout: 序列在 ${OVERALL_TIMEOUT_MS}ms 内未完成(疑似 server 挂起)`);
  finish();
}, OVERALL_TIMEOUT_MS);

let finished = false;

function finish() {
  if (finished) return;
  finished = true;
  clearTimeout(overallTimer);
  for (const { timer } of waiters.values()) clearTimeout(timer);
  try {
    child.stdin.end();
    child.kill();
  } catch {
    /* 进程可能已退出 */
  }
  console.log("");
  if (failures.length > 0) {
    console.error(`=== test-mcp-server: FAIL — ${failures.length} assertion(s) failed ===`);
    for (const f of failures) console.error(` - ${f}`);
    process.exit(1);
  }
  console.log("test-mcp-server: PASS (4/4 assertions)");
  process.exit(0);
}

async function main() {
  console.log(`spawning: ${process.execPath} ${serverPath}`);

  // ── 1) initialize:响应含 capabilities(且按 spec 回显请求的 protocolVersion)──
  const init = await request(1, "initialize", {
    protocolVersion: "2025-03-26",
    capabilities: {},
    clientInfo: { name: "uiux-atlas-mcp-smoke", version: "0.0.0" },
  });
  if (init.__timeout) {
    failures.push(`断言 1 initialize:15s 内未收到响应`);
    return finish();
  }
  console.log(`  info: negotiated protocolVersion = ${init.result?.protocolVersion}`);
  assert(
    "断言 1 initialize 响应含 capabilities(对象)",
    typeof init.result?.capabilities === "object" && init.result?.capabilities !== null,
    `got ${JSON.stringify(init.result?.capabilities)}`,
  );
  assert(
    "断言 1b initialize protocolVersion 回显 2025-03-26(spec 版本协商)",
    init.result?.protocolVersion === "2025-03-26",
    `got ${JSON.stringify(init.result?.protocolVersion)}`,
  );
  assert(
    "断言 1c initialize 响应含 serverInfo.name",
    typeof init.result?.serverInfo?.name === "string" && init.result.serverInfo.name.length > 0,
    `got ${JSON.stringify(init.result?.serverInfo)}`,
  );

  // 初始化完成通知(spec:client MUST 发送;server 不回响应)
  send({ jsonrpc: "2.0", method: "notifications/initialized" });

  // ── 2) tools/list:含四工具 ──
  const tools = await request(2, "tools/list", {});
  if (tools.__timeout) {
    failures.push("断言 2 tools/list:15s 内未收到响应");
    return finish();
  }
  const names = (tools.result?.tools ?? []).map((t) => t.name);
  for (const expected of ["search_entries", "get_entry", "build_prompt", "list_categories"]) {
    assert(
      `断言 2 tools/list 含 ${expected}`,
      names.includes(expected),
      `tools = ${JSON.stringify(names)}`,
    );
  }

  // ── 3) tools/call get_entry(glassmorphism):文本含「毛玻璃」──
  const entry = await request(3, "tools/call", { name: "get_entry", arguments: { id: "glassmorphism" } });
  if (entry.__timeout) {
    failures.push("断言 3 get_entry:15s 内未收到响应");
    return finish();
  }
  const entryText = (entry.result?.content ?? []).map((c) => c?.text ?? "").join("\n");
  assert(
    "断言 3 get_entry(glassmorphism) 未报错(isError 非 true)",
    entry.result?.isError !== true,
    `result = ${JSON.stringify(entry.result)?.slice(0, 300)}`,
  );
  assert(
    '断言 3 get_entry(glassmorphism) 文本含「毛玻璃」',
    entryText.includes("毛玻璃"),
    `text 前 300 字: ${JSON.stringify(entryText.slice(0, 300))}`,
  );

  // ── 4) tools/call build_prompt(styles/glassmorphism, 覆盖 blur=30):含 blur 30px ──
  const prompt = await request(4, "tools/call", {
    name: "build_prompt",
    arguments: { id: "styles/glassmorphism", params: { blur: 30 } },
  });
  if (prompt.__timeout) {
    failures.push("断言 4 build_prompt:15s 内未收到响应");
    return finish();
  }
  const promptText = (prompt.result?.content ?? []).map((c) => c?.text ?? "").join("\n");
  assert(
    "断言 4 build_prompt 未报错(isError 非 true)",
    prompt.result?.isError !== true,
    `result = ${JSON.stringify(prompt.result)?.slice(0, 300)}`,
  );
  assert(
    "断言 4 build_prompt(参数覆盖 blur=30) 文本含 blur 30px",
    promptText.includes("blur 30px"),
    `text 前 400 字: ${JSON.stringify(promptText.slice(0, 400))}`,
  );

  finish();
}

main().catch((e) => {
  failures.push(`test harness 自身异常: ${e?.stack ?? e}`);
  finish();
});
