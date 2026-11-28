# AI Thinking Indicator / AI 思考中指示器

- 页面 / Page: /uiux-atlas/components/ai-thinking-indicator/
- English page: /uiux-atlas/en/components/ai-thinking-indicator/
- 本页 / This file: /uiux-atlas/components/ai-thinking-indicator/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 思考中指示器 · Thinking Indicator · 三点脉冲 · Shimmer 思考标签 · 推理步骤卡
- 简介 / Tagline: AI 推理等待的形态选型:NN/g 响应时间三限定形态、shimmer 思考标签、三点脉冲与步骤卡的自动收起——等待被承认,而不是被装饰。
- Tagline (EN): Form selection for AI reasoning waits: NN/g's three response-time limits pick the form, shimmer thinking labels, dot pulses and step cards with auto-collapse — the wait is acknowledged, not decorated.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| pendingIndicator | enum: shimmer · dots · spinner | shimmer |
| shimmerDurationMs | dimension · ms | 2000ms |
| shimmerSpread | number | 2 |
| stepAutoCollapseMs | number | 1000 |
| autoOpenOnStream | enum: on · off | on |
| stopVisible | enum: on · off | on |

## 适用场景 / When to use

- status === 'submitted' 的空档——已发出请求、token 流还没开始(AI SDK 官方在此配 Spinner/加载点) / The status === 'submitted' gap — request sent, token stream not yet started (AI SDK officially pairs Spinner/dots here)
- 推理模型的 1–10s 思考段——shimmer 思考标签 + 可展开的步骤卡(vercel/chatbot reasoning.tsx 范式) / Reasoning models' 1–10s thinking span — shimmer label plus an expandable step card (the vercel/chatbot reasoning.tsx pattern)
- >10s 的长任务——步骤/计数进度 + 可见 Stop 按钮(NN/g 第三限的硬要求) / Long tasks beyond 10s — step/counter progress plus a visible Stop button (NN/g's hard third-limit requirement)

## 何时不用 / When not to use

- 2–10s 的操作上放伪进度条——NN/g display inertia:屏幕变化快到用户跟不上,非精确反馈(轮换文本/脉冲)才是对的 / Fake progress bars on 2–10s operations — NN/g's display inertia: the screen would change faster than users can track; imprecise feedback (rotating text/pulse) is the right call
- 流结束后立即收起步骤卡且无时长读数——reasoning.tsx 收起前等 AUTO_CLOSE_DELAY 1000ms 并留下「Thought for N seconds」 / Collapsing the step card instantly after the stream with no duration readout — reasoning.tsx waits AUTO_CLOSE_DELAY 1000ms and leaves "Thought for N seconds"
- 把「正在思考」只编码在动画上——读屏拿不到 shimmer/脉冲的语义,必须配 aria-busy 与状态行文字 / Encoding "thinking" in animation alone — screen readers get nothing from shimmer/pulse; pair it with aria-busy and a text status line
- 给 <1s 的快速响应也挂指示器——NN/g 0.1–1s 区间无需特殊反馈,加了反而制造颠簸 / Attaching indicators to sub-second responses — NN/g's 0.1–1s band needs no special feedback; adding one only creates jitter

## 来源 / Sources

- https://www.nngroup.com/articles/response-times-3-important-limits/
- https://github.com/vercel/chatbot/blob/main/components/ai-elements/shimmer.tsx
- https://github.com/vercel/chatbot/blob/main/components/ai-elements/reasoning.tsx
- https://elements.ai-sdk.dev/components/shimmer
- https://elements.ai-sdk.dev/components/chain-of-thought
- https://elements.ai-sdk.dev/components/task
- https://ai-sdk.dev/docs/ai-sdk-ui/chatbot
