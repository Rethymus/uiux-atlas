# Generative UI / 生成式 UI

- 页面 / Page: /uiux-atlas/components/ai-generative-ui/
- English page: /uiux-atlas/en/components/ai-generative-ui/
- 本页 / This file: /uiux-atlas/components/ai-generative-ui/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 生成式 UI · Generative UI · 工具调用卡片 · Schema 驱动渲染
- 简介 / Tagline: 模型输出结构化数据 → 宿主组件映射:工具卡七态徽章、schema 驱动树、流中渐进渲染——模型只能请求 UI,渲染权永远在白名单手里。
- Tagline (EN): Model output → host component mapping: seven-state tool badges, schema-driven trees, progressive mid-stream rendering — the model can only request UI; rendering power always stays with the allowlist.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| genuiMode | enum: tool-map · json-spec | tool-map |
| pendingBadge | enum: Pending · Running | Pending |
| collapsePolicy | enum: auto · open | auto |
| allowlist | enum: on · off | on |
| streamProps | enum: on · off | on |
| resultRender | enum: component-map · raw-json | component-map |

## 适用场景 / When to use

- LLM 工具调用的中间态与结果卡:天气/股票/检索类结构化输出(AI SDK 官方范式) / Intermediate states and result cards for LLM tool calls: weather/stock/search structured outputs (AI SDK official paradigm)
- 模型自组界面的宿主渲染器:JSON spec 树 + 组件白名单(assistant-ui GenerativeUISpec) / Host renderers for model-composed UIs: JSON spec trees + component allowlist (assistant-ui GenerativeUISpec)
- human-in-the-loop 审批流:approval-requested / approval-responded 两态(Chat SDK 词表) / Human-in-the-loop approval flows: approval-requested / approval-responded states (Chat SDK vocabulary)

## 何时不用 / When not to use

- 把模型输出的 JSON 直接 eval/innerHTML 进页面——注入直通车;渲染权必须在白名单内(AI 生成内容按不可信输入处理) / eval/innerHTML-ing model JSON into the page — an injection highway; rendering must stay inside the allowlist (treat AI output as untrusted input)
- 白名单形同虚设:组件名照单全收后直接渲染——assistant-ui 官方语义是未注册名抛错而非渲染 / A nominal allowlist that renders any name handed to it — assistant-ui's official semantics throw on unregistered names instead of rendering
- 中间态只靠颜色区分——Pending/Running/Completed 必须有文字徽章(色觉障碍不可读) / Distinguishing intermediate states by color alone — Pending/Running/Completed need textual badges (unreadable for color-blind users)
- 工具卡永远展开不收起——流式会话里每个工具卡都占一块,完成 1s 后应收起(Chat SDK AUTO_CLOSE_DELAY 策略) / Tool cards that never collapse — each one eats layout in a streamed session; collapse 1s after completion (Chat SDK AUTO_CLOSE_DELAY strategy)

## 来源 / Sources

- https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces
- https://github.com/vercel/chatbot/blob/main/components/ai-elements/tool.tsx
- https://www.assistant-ui.com/docs/api-reference/generative-ui/spec.md
- https://www.assistant-ui.com/docs/api-reference/generative-ui/components.md
- https://docs.copilotkit.ai/coagents/generative-ui
