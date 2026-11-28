# Split View / 分栏视图

- 页面 / Page: /uiux-atlas/layout/split-view/
- English page: /uiux-atlas/en/layout/split-view/
- 本页 / This file: /uiux-atlas/layout/split-view/index.md
- 分类 / Category: layout 布局与响应式 / Layout
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 分栏面板 · 可拖分栏 · Resizable Panels · Split Pane
- 简介 / Tagline: 一条可拖的分隔条把界面分成可调双栏:拖拽与方向键共用同一数值,栏内组件用容器查询随栏宽自适应——IDE、邮件客户端与文档站的骨架。
- Tagline (EN): A draggable divider splits the UI into two resizable panes: drag and arrow keys drive one shared value, while container queries re-flow pane content — the backbone of IDEs, mail clients and docs sites.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| startSize | dimension · % | 40% |
| minSize | dimension · % | 20% |

## 适用场景 / When to use

- IDE/编辑器的资源树与编辑区、邮件客户端的列表与阅读 pane / IDE file trees beside editors, mail clients' list beside the reading pane
- 文档站/后台的侧栏导航,用户可按自己的屏幕宽度收窄 / Docs sites and admin sidebars users can narrow to taste
- 对比场景:图集编辑器原图与调色结果并排、日志查看器 / Comparison surfaces: image editors side-by-side, log viewers
- 栏内组件密度自适应——配合容器查询让卡片随栏宽自行重排(本条目 demo 的联动) / Density adaptation inside panes — container queries re-flow cards as the pane narrows (this demo's linkage)

## 何时不用 / When not to use

- 手机竖屏主界面——拇指拖拽分隔条误触率高,直接堆叠 / Phone-portrait primary UIs — thumb-dragging a divider is error-prone; just stack
- 内容必须完整可见的场景(报表、表单)——分栏挤压会截断关键信息 / Content that must be fully visible (reports, forms) — squeezing panes truncates key info
- 把 MDN Cookbook「Split navigation」(导航分组视觉分隔)当成可拖分栏——两者不是同一概念(调研 05§8) / Mistaking MDN Cookbook's 'Split navigation' (visually divided nav) for resizable panes — different concepts (research 05 §8)
- 分隔条只做鼠标目标——无键盘等价操作违反 WCAG 2.1.1(调研 05§8 的 separator 模式正是为此) / Dividers as mouse-only targets — no keyboard equivalent violates WCAG 2.1.1 (the separator pattern in research 05 §8 exists for exactly this)

## 来源 / Sources

- https://github.com/bvaughn/react-resizable-panels
- https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook
