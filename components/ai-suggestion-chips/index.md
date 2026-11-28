# AI Suggestion Chips / AI 建议操作 Chips

- 页面 / Page: /uiux-atlas/components/ai-suggestion-chips/
- English page: /uiux-atlas/en/components/ai-suggestion-chips/
- 本页 / This file: /uiux-atlas/components/ai-suggestion-chips/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 建议追问 · 建议操作 · Suggestion Chips · 后续问题建议 · Prompt 建议
- 简介 / Tagline: 回答结束后的下一步引导:点击即发送的官方用法、轮次边界才更新的换牌纪律、防重复点击的后态——建议是路标,不是干扰。
- Tagline (EN): Guidance for what comes next after an answer: click-to-send as the official usage, turn-boundary-only refresh discipline, post-click states against double firing — suggestions are signposts, not noise.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| maxChips | number | 3 |
| chipMaxLength | number | 24 |
| updatePolicy | enum: ready-gated · live-stream | ready-gated |
| onClickBehavior | enum: send-immediate · fill-composer | send-immediate |
| postClickState | enum: mark-sent · disable · hide | mark-sent |
| scrollDirection | enum: horizontal · wrap | horizontal |

## 适用场景 / When to use

- 回答流结束(status === 'ready')后的追问引导——AI Elements Suggestion 的官方定位:starter prompts 与 contextual actions / Follow-up guidance after the answer stream ends (status === 'ready') — AI Elements Suggestion's official positioning: starter prompts and contextual actions
- 空会话的冷启动示例问题(官方基础用法 3 条) / Cold-start example prompts on an empty session (3 chips in the official basic usage)
- 工具调用结果后的后续操作入口(如「导出这张表」「换个图表类型」) / Post-tool-call action entries (like "export this table" or "change the chart type")

## 何时不用 / When not to use

- 流式期间逐 token 刷新建议牌——应等 status === 'ready'(AI SDK 状态机),抖动抢注意力还点不准 / Refreshing suggestion chips token by token mid-stream — wait for status === 'ready' (AI SDK state machine); jitter steals attention and invites mis-clicks
- 一排 8+ 条建议塞满整行——数量上限官方未规定,但建议是路标不是路牌墙(实践 3–4 条) / Filling the row with 8+ chips — no official cap exists, but suggestions are signposts, not a billboard wall (practice: 3–4)
- 点击后 chips 原样保留可再点——没有后态等于邀请重复发送(官方默认点击即发,连点即连发) / Leaving chips clickable as-is after a click — no post-click state invites double-sends (official click fires immediately, so double clicks double-send)
- 把关键操作(如「删除全部」)做成建议 chip——建议会被整组换牌/移除,关键操作不能寄生在易变层 / Putting critical actions (like "delete all") into suggestion chips — chips get swapped/removed as a group; critical actions must not live in a volatile layer

## 来源 / Sources

- https://github.com/vercel/chatbot/blob/main/components/ai-elements/suggestion.tsx
- https://elements.ai-sdk.dev/components/suggestion
- https://www.assistant-ui.com/docs/api-reference/adapters/suggestions.md
- https://ai-sdk.dev/docs/ai-sdk-ui/chatbot
