# AI Answer States / AI 回答安全态

- 页面 / Page: /uiux-atlas/components/ai-answer-states/
- English page: /uiux-atlas/en/components/ai-answer-states/
- 本页 / This file: /uiux-atlas/components/ai-answer-states/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 回答安全态 · Answer States · 拒答卡片 · 引用来源 · Refusal & Citations
- 简介 / Tagline: 回答的三种非常态:拒答卡(展示不解析)、通用错误文案 + 重试、结构化引用来源(来源卡/角标/脚注)——出错时信息不泄漏,引用时段落可追溯。
- Tagline (EN): Three non-normal answer states: the refusal card (display, don't parse), generic error text + retry, and structured citations (source cards/badges/footnotes) — nothing leaks on failure, every citation traces to a passage.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| citationMode | enum: sources-card · inline-hover · footnote | sources-card |
| carouselEnabled | enum: off · on | off |
| refusalRetry | enum: regenerate · fallback · none | regenerate |
| midStreamRefusalPolicy | enum: discard-partial · keep-partial | discard-partial |
| linkSafetyModal | enum: on · off | on |
| disclaimerPosition | enum: message-footer · sources-below · none | message-footer |

## 适用场景 / When to use

- 分类器拒答(安全边界)——正常 200 响应 + refusal stop_reason 的卡片化呈现(Anthropic 官方形态) / Classifier refusals (the safety boundary) — carding a normal-200 response with a refusal stop_reason (Anthropic's official form)
- 带引用来源的回答——citations 数组 / url_citation annotations 的结构化渲染(官方双家规范) / Answers with cited sources — structured rendering of citations arrays / url_citation annotations (the official two-vendor spec)
- 生成失败/超时——通用错误文案 + 重试按钮(防服务端信息泄漏的官方最佳实践) / Generation failures/timeouts — generic error text + retry (the official anti-leak best practice)

## 何时不用 / When not to use

- 解析拒答的 explanation 文案做分支逻辑——官方明确「展示而非解析」,文案不稳定 / Parsing the refusal explanation for branching logic — the docs are explicit: display it, don't parse it; the text is unstable
- 流中拒答后继续保留已流出的部分输出——官方明确应丢弃,部分输出可能正是被拒内容 / Keeping streamed partial output after a mid-stream refusal — the docs say discard it; the partial may be exactly what was refused
- 把服务端异常文本直接透出给用户——通用文案 + 重试是官方口径,泄漏堆栈等于给攻击者发地图 / Surfacing raw server exception text to users — generic text + retry is the official line; leaking stack traces hands attackers a map
- 用 markdown 内联语法做引用——官方警示无好的语法、模型不自发输出;结构化 citations 数组驱动才是官方推荐 / Doing citations with inline markdown syntax — officially warned against: no good syntax, models don't emit it; structured citations-array rendering is the official recommendation

## 来源 / Sources

- https://docs.claude.com/en/docs/build-with-claude/refusals-and-fallback
- https://developers.openai.com/api/reference/resources/chat
- https://docs.claude.com/en/docs/build-with-claude/citations
- https://ai-sdk.dev/docs/ai-sdk-ui/chatbot
- https://elements.ai-sdk.dev/components/sources
- https://elements.ai-sdk.dev/components/inline-citation
- https://streamdown.ai/docs/security
- https://streamdown.ai/
