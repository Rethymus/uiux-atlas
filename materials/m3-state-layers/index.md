# State Layers (M3) / M3 状态层

- 页面 / Page: /uiux-atlas/materials/m3-state-layers/
- English page: /uiux-atlas/en/materials/m3-state-layers/
- 本页 / This file: /uiux-atlas/materials/m3-state-layers/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: Material 3 / Material 3
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 状态层 · M3 state layer · state-layer token
- 简介 / Tagline: Material 3 状态层:在控件上叠一层「内容色」的低不透明度覆盖,用固定百分比区分 hover/focus/press/drag,而不是临时发明颜色。
- Tagline (EN): Material 3 state layers: a low-opacity overlay of the content color on top of a control, with fixed percentages distinguishing hover/focus/press/drag instead of ad-hoc colors.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| hover | number · % | 8% |
| focus | number · % | 10% |
| press | number · % | 10% |
| drag | number · % | 16% |

## 适用场景 / When to use

- 填充型按钮、卡片、列表项的 hover/press 反馈——与 M3 组件同构的任何控件 / Filled buttons, cards and list items — any control that mirrors M3 component anatomy
- 可拖拽的手柄与重排条目:drag +16% 是四态中最深的官方档位 / Draggable handles and reorderable rows: drag +16% is the officially deepest of the four states
- 需要统一「手感」的设计系统:四个百分比全系统共用,新控件不再逐个发明 hover 色 / Design systems needing a uniform feel: four shared percentages mean new controls never invent their own hover colors
- 深浅主题通吃:状态层取内容色而非固定色值,主题切换后自动适配 / Theming across light/dark: the layer takes the content color rather than a fixed value, so it adapts after theme swap

## 何时不用 / When not to use

- 对内容色本身已接近背景色的控件(如 on-surface ≈ surface)——8% 的叠加几乎不可见,应改用边框/位移等其他线索 / Controls whose content color is already near the surface — an 8% overlay is nearly invisible; use borders/offsets instead
- 叠加在渐变/照片上的控件——低不透明度覆盖会被底图吞掉,M3 状态层默认假设纯色 surface / Controls sitting on gradients or photos — a low-opacity overlay gets swallowed; M3 state layers assume a flat surface
- 把四个百分比再自行放大(如 press 用 30%)——偏离官方 token 后各控件手感不再一致 / Inflating the percentages yourself (e.g. press at 30%) — drifting off the official tokens breaks cross-control consistency
- 高频微控件(checkbox、slider)——M3 对此类控件以形状/位置反馈为主,不要一律糊状态层 / High-frequency micro controls (checkboxes, sliders) — M3 relies on shape/position feedback there; don't blanket-apply state layers

## 来源 / Sources

- https://m3.material.io/foundations/interaction/states/state-layers
