# Nav Menu / 导航菜单

- 页面 / Page: /uiux-atlas/components/nav-menu/
- English page: /uiux-atlas/en/components/nav-menu/
- 本页 / This file: /uiux-atlas/components/nav-menu/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 导航栏 · Navbar · Navigation Menu · Menubar · 顶部导航 · 侧边导航
- 简介 / Tagline: 将网站的信息架构分组归类并以导航的形式展示给用户,方便用户查找要获取的信息:顶部横向或侧栏纵向,二级导航聚合在下拉菜单中。
- Tagline (EN): Classifies a site's information architecture into groups and presents it as navigation so users can find the information they want: horizontal across the top or vertical in a sidebar, with second-level items aggregated into dropdown menus.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| mode | enum: horizontal · vertical | horizontal |
| theme | enum: light · dark | light |
| trigger | enum: hover · click | hover |

## 适用场景 / When to use

- 提供流量分发入口:首页/频道/类目的一级入口,把用户送往各内容区 / Traffic distribution entries: first-level entries for home/channels/categories that route users into each content area
- 网站各功能聚合:二级导航聚合在下拉菜单,功能入口集中、可发现 / Aggregating site functions: second-level items gathered into dropdown menus keep every entry point centralized and discoverable
- 后台/控制台的侧边导航(vertical),与内容区并排常驻 / Console/admin sidebar navigation (vertical), persistent beside the content area
- 与面包屑分工:导航负责跨区跳转,面包屑负责区内层级定位 / Dividing labor with breadcrumbs: the nav handles cross-area jumps, the breadcrumb handles in-area depth

## 何时不用 / When not to use

- 一级项过多——决策时间随选项数量上升(Hick 定律,调研 07§23),关键动作应放两端(序位效应,调研 07§29) / Too many first-level items — decision time grows with option count (Hick's law, research 07§23); put key actions at both ends (serial position effect, research 07§29)
- 导航层级超过三层——深层内容改用站内搜索/站点地图 / Navigation deeper than three levels — use site search or a sitemap for deep content
- 只用图标不用文字的一级项(语义不可猜) / Icon-only top-level items without a text label (their meaning cannot be guessed)
- 拿导航表达页面内层级——那是面包屑的职责 / Using the nav to express within-page hierarchy — that is the breadcrumb's job

## 来源 / Sources

- https://ant.design/components/menu-cn
- https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
- https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
- https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/
