# Rate / 评分

- 页面 / Page: /uiux-atlas/components/rate-score/
- English page: /uiux-atlas/en/components/rate-score/
- 本页 / This file: /uiux-atlas/components/rate-score/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 星级评分 · Star Rating · Rating
- 简介 / Tagline: 用一排星星对事物打分:悬停预览、点击落值,支持半星与再次点击清空;键盘按 radiogroup 漫游选择。
- Tagline (EN): Score something with a row of stars: hover to preview, click to commit, with half stars and click-again-to-clear; keyboard navigates it as a radiogroup.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| count | number | 5 |
| allowHalf | enum: off · on | off |
| allowClear | enum: on · off | on |
| activeColor | color · hex | #faad14 |

## 适用场景 / When to use

- 订单完成后的服务/商品评价:五星制 + 文案标签(很差→超赞)降低理解成本 / Post-order service/product reviews: five stars + text labels (terrible → amazing) to cut interpretation cost
- 内容消费前的质量预期:应用商店、点评平台的商家/影游评分 / Pre-consumption quality expectation: app-store and review-platform ratings for shops, films, games
- 轻量 NPS 式打分:一屏一问,星星即答案 / Lightweight NPS-style scoring: one question per screen, stars as the answer
- 需要精细刻度的评价:半星档区分「还行」与「还不错」 / Fine-grained assessment: half-star steps separate 'ok' from 'pretty good'

## 何时不用 / When not to use

- >10 星的刻度——决策时间随选项上升(Hick 定律,调研 07§23),五星或十分制足够 / Scales beyond 10 stars — decision time climbs with options (Hick's law, research 07 §23); five or ten points suffice
- 没有文字标签的裸星星——星级含义(1 星是差还是最低?)因文化而异,须配文案 / Bare stars with no text labels — what one star means varies by culture; always pair copy
- 离散二选一(推荐/不推荐)——thumbs up/down 或 radio 更直接 / Binary choice (recommend / not) — thumbs up/down or radios are more direct
- 把评分当进度条用——进度语义请用 Progress,不要混用星形隐喻 / Using stars as a progress bar — progress semantics belong to Progress, not the star metaphor

## 来源 / Sources

- https://ant.design/components/rate
- https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-rating/
