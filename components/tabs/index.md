# Tabs / 标签页

- 页面 / Page: /uiux-atlas/components/tabs/
- English page: /uiux-atlas/en/components/tabs/
- 本页 / This file: /uiux-atlas/components/tabs/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 页签 · 选项卡 · Tab Bar · Tabbed Interface
- 简介 / Tagline: 在同一视图内平铺切换多份平级内容:一条标签轴 + 一块内容面板,点选或方向键切换,不打断所在页面的上下文。
- Tagline (EN): Switches between peer content sets inside one view: a tab axis plus one content panel, toggled by click or arrow keys, without leaving the current page context.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| position | enum: top · left | top |
| type | enum: line · card | line |
| animated | enum: on · off | on |

## 适用场景 / When to use

- 同视图内切换平级内容:概览/明细/设置等并列视图,不离开当前页面 / Peer views in one surface: overview/details/settings side by side without leaving the page
- 长表单/详情页按域分组,降低单屏信息密度 / Long forms and detail pages grouped by domain to cut single-screen density
- 面板内容已预载、切换瞬时完成时,可用方向键自动激活(APG 推荐,调研 07§11) / When panels are preloaded and switching is instant, arrow-key auto-activation is the APG-recommended mode (research 07§11)
- 内容需要独立 URL/SEO 或步骤有先后依赖时,不要用标签页——改用路由 + 面包屑或分步组件 / The inverse guard: content needing its own URL/SEO, or order-dependent steps, belongs to routes + breadcrumbs or a stepper instead

## 何时不用 / When not to use

- 标签数量过多——横向溢出后要靠「更多」折叠(antd more 图标,06-antdesign.md §4.20),超过 7 个优先重构信息架构 / Too many tabs — overflow forces a "more" fold (antd more icon, 06-antdesign.md §4.20); beyond 7, restructure the IA instead
- 把有先后顺序的流程装进标签页——用户可能跳步,改用分步/向导 / Sequential flows in tabs — users may skip steps; use a stepper/wizard
- 嵌套标签页(标签里再放标签)——层级混乱,认知成本陡增 / Nested tabs (tabs inside tabs) — confused hierarchy and steep cognitive cost
- 标签文案长短悬殊导致轴宽抖动——文案控制在 2–6 字/词 / Wildly varying tab labels jittering the axis — keep labels to 2–6 characters/words

## 来源 / Sources

- https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- https://ant.design/components/tabs-cn
