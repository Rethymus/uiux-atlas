# Collapse / 折叠面板

- 页面 / Page: /uiux-atlas/components/collapse-panel/
- English page: /uiux-atlas/en/components/collapse-panel/
- 本页 / This file: /uiux-atlas/components/collapse-panel/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 手风琴 · Accordion · Disclosure
- 简介 / Tagline: 把成组内容收纳进「标题行 + 可展开内容区」:点标题切换显隐,多开是常规、同一时刻只开一块的手风琴是特例。
- Tagline (EN): Group content into 'header row + expandable body' units: toggling hides or shows the body; multiple-open is the norm and the accordion (one open at a time) is the special case.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| accordion | enum: off · on | off |
| expandIconPlacement | enum: start · end | start |
| collapsible | enum: header · icon · disabled | header |

## 适用场景 / When to use

- 表单可选区块:发票开具、优惠码、高级选项——默认收起不干扰主流程 / Optional form sections: invoicing, promo codes, advanced options — collapsed by default, out of the main flow
- FAQ/帮助中心问答列表:一问一面板,常配手风琴单开 / FAQ/help-center question lists: one question per panel, often accordion single-open
- 长页面的设置分组:通知偏好、隐私、账户安全逐组收纳 / Long settings pages: notifications, privacy, account security grouped per panel
- 移动端概览页:摘要在上、详情折叠,节省纵向空间 / Mobile overview pages: summary up top, details folded, saving vertical space

## 何时不用 / When not to use

- 用户必须看到的内容别折叠——必读信息藏进展开区等于没写 / Never fold must-see content — hiding required reading inside a collapsed panel equals not writing it
- 面板内超过一屏的长内容:滚动套滚动体验差,应拆分或改抽屉/独立页 / Bodies longer than a screen: scroll-within-scroll reads badly — split or move to a drawer/page
- 深层嵌套折叠(折叠里再折叠)——层级成本超过收纳收益 / Nested collapsibles inside collapsibles — hierarchy cost outweighs tidiness gains
- 同开面板可能超过 6 个时省略 role=region 地标,避免 landmark 泛滥(APG 建议,补研 12§15) / When >6 panels can be open at once, omit role=region landmarks to avoid landmark flooding (APG advice, 12 §15)

## 来源 / Sources

- https://ant.design/components/collapse
- https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
