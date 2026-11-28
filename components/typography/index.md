# Typography / 文字排印

- 页面 / Page: /uiux-atlas/components/typography/
- English page: /uiux-atlas/en/components/typography/
- 本页 / This file: /uiux-atlas/components/typography/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 文字排印 · Text Styles · Type Scale
- 简介 / Tagline: 文字层级件:六档 level(h1–h4/body/caption,antd 自然指数字阶)× 三档 type(默认/次级/危险)+ 单行省略开关;同屏阶梯展示各级字号与行高。
- Tagline (EN): Text hierarchy: six level steps (h1–h4/body/caption on antd's natural-exponential scale) × three type colors (default/secondary/danger) plus a single-line ellipsis toggle; the demo shows every step's size and line-height on one screen.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| level | enum: h1 · h2 · h3 · h4 · body · caption | body |
| type | enum: default · secondary · danger | default |
| ellipsis | enum: off · on | off |

## 适用场景 / When to use

- 页面信息架构:页面标题(h1/h2)→ 区块标题(h3/h4)→ 正文 → 辅助说明 / Page information architecture: page title (h1/h2) → section title (h3/h4) → body → helper text
- 列表三层文字:名称(默认色)/摘要(次级)/时间戳(caption+次级) / Three-layer list rows: name (default) / summary (secondary) / timestamp (caption + secondary)
- 错误与警示文案(danger 色配文案,不只靠颜色) / Error and warning copy (danger color paired with wording, never color alone)
- 表格/卡片内长文本的单元格省略(ellipsis + title 提示全文) / Ellipsized cells inside tables/cards (ellipsis + title tooltip for the full text)

## 何时不用 / When not to use

- 一屏超过 3–5 种字号(antd 建议系统内字阶控制在 3–5 种,06 §1.3) / More than 3–5 font sizes on one screen (antd suggests keeping 3–5 steps in a system, 06 §1.3)
- 跳级使用(h1 直接接 h4)或用加粗/字号硬造层级而不用语义标题——文档大纲断裂 / Skipping levels (h1 straight to h4) or faking hierarchy with bold/size instead of semantic headings — breaks the document outline
- 次要信息全靠颜色变浅——低视觉/色觉障碍场景漏读;浅色小字还要过 4.5:1(WCAG SC 1.4.3) / Marking secondary info only by lighter color — low-vision/color-blind users miss it; pale small text must still clear 4.5:1 (WCAG SC 1.4.3)
- 整段长文用 h1 大字号——阅读负担与行宽失控;正文承担长阅读(主字号 14/行高 1.57) / Long-form passages set in h1 scale — reading load and line length explode; body copy does long reading (base 14/1.57)

## 来源 / Sources

- https://ant.design/components/typography-cn
- https://ant.design/docs/spec/font-cn
