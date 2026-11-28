# position: sticky / 粘性布局 Sticky

- 页面 / Page: /uiux-atlas/layout/position-sticky/
- English page: /uiux-atlas/en/layout/position-sticky/
- 本页 / This file: /uiux-atlas/layout/position-sticky/index.md
- 分类 / Category: layout 布局与响应式 / Layout
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: position-sticky · 粘滞定位 · 吸顶 · 粘滞区域
- 简介 / Tagline: 元素随容器滚动,触达最近滚动祖先的偏移阈值后停留——position: sticky; top: 20px; 不脱离文档流,一行声明实现吸顶表头与粘滞侧栏。
- Tagline (EN): The element scrolls with its container, then sticks once it reaches the offset threshold of the nearest scrolling ancestor — position: sticky; top: 20px; never leaves document flow, and one line buys sticky table headers and sidebars.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| top | dimension · px | 20px |
| trap | enum: off · on | off |

## 适用场景 / When to use

- 长列表/长表单的分组标题吸顶——滚到哪组,哪组的标题停在阈值处 / Group headers on long lists/forms — the current group's header parks at the threshold while you scroll
- 数据表格的表头吸顶,长表滚动时列名始终可见 / Sticky table headers keeping column names visible in long tables
- 文档站的左侧目录与全局导航吸顶(MDN Cookbook 的 Split navigation 同族用法,调研 05§7) / Doc-site sidebars and global navs (kin to MDN Cookbook's Split navigation, research 05 §7)
- 内容不足时页脚贴底的 Sticky footer 配方(Grid/Flexbox 实现,MDN Cookbook,调研 05§7) / Sticky footers pinning to the bottom on short pages (Grid/Flexbox recipe, MDN Cookbook, research 05 §7)

## 何时不用 / When not to use

- 祖先链上有 overflow: hidden/auto/scroll 的布局——sticky 被劫持失效,先修结构再用(demo 陷阱档即此形态) / Layouts with any overflow: hidden/auto/scroll ancestor — sticky gets hijacked; fix the structure first (the demo's trap mode shows exactly this)
- 粘滞元素低于其父容器末尾——父容器滚完 sticky 就跟走了,粘滞范围以父容器为界 / Sticky elements near their parent's end — once the parent scrolls past, the element goes with it; the parent bounds the sticky range
- 大面积吸顶层遮挡内容又不提供收起方式——遮挡是布局决策,不是默认正确 / Large sticky layers covering content with no way to dismiss — overlaying is a layout decision, not a default
- 同一视口堆叠多个 sticky 层却算不清 z-index 与阈值——阈值设计先画图再写码 / Stacking many sticky layers without a worked-out z-index/threshold plan — design the thresholds on paper before coding

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/position
- https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook
