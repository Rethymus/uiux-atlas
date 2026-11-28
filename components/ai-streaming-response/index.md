# AI Streaming Response / AI 流式响应

- 页面 / Page: /uiux-atlas/components/ai-streaming-response/
- English page: /uiux-atlas/en/components/ai-streaming-response/
- 本页 / This file: /uiux-atlas/components/ai-streaming-response/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: AI 流式响应 · Streaming Markdown · 流式渲染 · 打字机流
- 简介 / Tagline: AI 回答的渐进渲染:未闭合 markdown 自愈、末尾光标、锁底滚动与用户上滚打断、两级节流——token 流到哪,版面稳到哪。
- Tagline (EN): Progressive rendering of AI answers: self-healing unclosed markdown, a trailing caret, sticky-bottom scrolling with user-interrupt, and two-level throttling — the layout stays stable wherever the token stream is.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| caretType | enum: block · circle · none | block |
| animStyle | enum: fadeIn · blurIn · slideUp · off | fadeIn |
| animDurationMs | dimension · ms | 150ms |
| smoothDelayMs | number | 10 |
| unclosedRepair | enum: on · off | on |
| lockBottom | enum: on · off | on |

## 适用场景 / When to use

- LLM 会话的 assistant 消息体——流式 markdown 的标准容器(Streamdown 官方定位) / Assistant message bodies in LLM chat — the standard container for streaming markdown (Streamdown's official positioning)
- 推理面板的次级锁底:面板内自动滚底与外层会话锁底解耦(vercel/chatbot reasoning.tsx) / Secondary sticky-bottom in reasoning panels: panel-internal auto-scroll decoupled from the outer conversation (vercel/chatbot reasoning.tsx)
- 任何逐 token 到达的富文本:报告生成、代码补全流、长摘要 / Any rich text arriving token by token: report generation, code-completion streams, long summaries

## 何时不用 / When not to use

- 对历史消息显示光标/入场动画——官方明确只对最后一条 assistant 消息显示光标 / Showing the caret/entrance animation on historical messages — the caret is officially for the last assistant message only
- 高频逐字符重渲整棵 markdown 树——已完成块应 memo(Streamdown 块级记忆化) / Re-rendering the whole markdown tree per character — finished blocks must be memoized (Streamdown block-level memoization)
- 锁底用防抖判断用户滚动——use-stick-to-bottom 明确反对『可能漏事件的防抖』 / Debouncing user-scroll detection for sticky-bottom — use-stick-to-bottom explicitly rejects 'debouncing that could miss events'
- 后台标签页仍按 10ms 定时吐字——smoothStream 在文档隐藏时跳过延迟,避免定时器节流拖停 / Pacing tokens at 10ms timers in background tabs — smoothStream skips the delay when the document is hidden

## 来源 / Sources

- https://streamdown.ai/docs
- https://streamdown.ai/docs/termination
- https://streamdown.ai/docs/carets
- https://streamdown.ai/docs/animation
- https://streamdown.ai/docs/memoization
- https://ai-sdk.dev/docs/reference/ai-sdk-core/smooth-stream
- https://ai-sdk.dev/docs/ai-sdk-ui/chatbot
- https://raw.githubusercontent.com/samdenty/use-stick-to-bottom/main/README.md
- https://github.com/vercel/chatbot/blob/main/components/ai-elements/message.tsx
