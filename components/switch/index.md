# Switch / 开关

- 页面 / Page: /uiux-atlas/components/switch/
- English page: /uiux-atlas/en/components/switch/
- 本页 / This file: /uiux-atlas/components/switch/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 切换开关 · Toggle · Toggle Switch
- 简介 / Tagline: 二态即时开关:拨杆在轨道左右滑动表达 on/off,状态即改即生效,不需要「提交」按钮。
- Tagline (EN): An instant two-state toggle: the thumb slides across the track to express on/off — the change takes effect immediately, no submit button needed.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| size | enum: sm · md | md |
| loading | enum: off · on | off |
| disabled | enum: off · on | off |
| checked | enum: off · on | off |

## 适用场景 / When to use

- 设置项的即时生效开关:通知、免打扰、深色模式等,改变即刻生效无需保存 / Instant-effect settings: notifications, do-not-disturb, dark mode — change lands immediately, no save step
- 功能开关(feature flag)面板:一组开关用 fieldset/legend 或 role=group 命名(调研 07§6) / Feature-flag panels: a group of switches named via fieldset/legend or role=group (research 07 §6)
- 二态且互斥的配置:只用开/关表达,不需要「部分选中」语义 / Strictly binary config: only on/off, no 'partially selected' semantics needed

## 何时不用 / When not to use

- 需要「提交才生效」的表单字段——改用 checkbox,并配保存按钮;开关的「即改即生效」心智会被破坏 / Form fields that only take effect after submit — use a checkbox with a save button; switches promise instant effect
- 标签随状态变化的写法(如标签本身在「开/关」间切换)——APG 铁律:焦点处朗读的名称必须恒定(调研 07§6) / Labels that flip with the state (the label itself toggling on/off) — APG iron rule: the announced name at focus must stay constant (research 07 §6)
- 三态需求(全选/半选)——switch 只有二态,半选语义归 checkbox 的 indeterminate(调研 07§6) / Needing a third state (all/partial) — switch is strictly binary; partial belongs to checkbox's indeterminate (research 07 §6)
- 同一屏出现大量开关——滑杆式控件扫视成本高于复选列表,批量设置优先 checkbox 组 / Screens packed with switches — sliders cost more to scan than a checklist; prefer a checkbox group for bulk settings

## 来源 / Sources

- https://ant.design/components/switch-cn
- https://www.w3.org/WAI/ARIA/apg/patterns/switch/
