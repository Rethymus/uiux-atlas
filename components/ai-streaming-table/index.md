# AI Streaming Table / AI 流式表格

- 页面 / Page: /uiux-atlas/components/ai-streaming-table/
- English page: /uiux-atlas/en/components/ai-streaming-table/
- 本页 / This file: /uiux-atlas/components/ai-streaming-table/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 流式表格 · Streaming Table · GFM 表格流 · 渐进表格
- 简介 / Tagline: 表格随 token 流生长:块级 memo 的行级结果、fixed 骨架锁列宽、表内滚动不撑破会话锁底——宽表也能流,版面不跳。
- Tagline (EN): Tables that grow with the token stream: row-level results of block memoization, fixed skeletons locking column widths, in-table scrolling that never breaks the session lock — wide tables stream too, without layout jumps.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| tableLayout | enum: fixed-skeleton · auto | fixed-skeleton |
| skeletonRows | number | 3 |
| rowRevealMs | dimension · ms | 250ms |
| maxBodyHeight | dimension · px | 260px |
| autoLayoutOnComplete | enum: off · on | off |
| emptyCellPlaceholder | enum: shimmer · dash | shimmer |

## 适用场景 / When to use

- 回答中流式输出的对比表/数据表——LLM 长回答里最常见的结构化块(GFM 表格原生支持) / Comparison/data tables streamed inside answers — the most common structured block in long LLM answers (GFM tables natively supported)
- 行数不可预期的生成式报表——行随流 append,列宽靠 fixed 骨架锁住 / Generated reports with unpredictable row counts — rows append with the stream while fixed skeletons pin the widths
- 嵌入会话锁底视口的宽表——表内独立滚动,不与外层锁底抢滚动权 / Wide tables inside a sticky-bottom session viewport — in-table scrolling never competes with the outer lock

## 何时不用 / When not to use

- auto 布局直排流式表——每行到达都触发列宽重排,整表横跳(fixed 骨架是默认档的原因) / Streaming a table in auto layout — every arriving row re-fits widths and the whole table lurches (why fixed skeleton is the default)
- 让长表撑破会话锁底视口——行数超阈值必须切表内滚动,否则流式生长把回答推出视口 / Letting a long table break the session's sticky-bottom viewport — past the threshold the table must scroll internally, or streaming growth pushes the answer out of view
- 整表每行重渲(丢块级 memo)——Streamdown 以块为 memo 粒度,已完成行块不重渲染是免费收益,别丢 / Re-rendering the whole table per row (dropping block memo) — Streamdown memoizes per block; finished row blocks never re-render for free, don't throw that away
- 把骨架行高做得与真实行不一致——完成换载时零位移是底线,行高不一致就是跳版 / Making skeleton row heights differ from real ones — zero-shift completion is the floor; unequal heights are a layout jump

## 来源 / Sources

- https://streamdown.ai/docs/memoization
- https://raw.githubusercontent.com/vercel/streamdown/main/packages/streamdown/README.md
- https://streamdown.ai/docs/termination
- https://www.assistant-ui.com/.well-known/agent-skills/markdown/SKILL.md
