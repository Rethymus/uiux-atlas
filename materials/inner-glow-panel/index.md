# Inner-Glow Panel / 内发光面板

- 页面 / Page: /uiux-atlas/materials/inner-glow-panel/
- English page: /uiux-atlas/en/materials/inner-glow-panel/
- 本页 / This file: /uiux-atlas/materials/inner-glow-panel/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 内发光面板 · 内泛光 · Inner Glow · Inset Glow
- 简介 / Tagline: inset 光感面板:不发外光,光被「关在」面板内部——整体内泛光 + 上沿受光 + 下沿环境暗,是发光层的「静音版」。常用于深色仪表盘容器、代码块、选中态。
- Tagline (EN): An inset-lit panel: no outward light — the glow is sealed inside, as an overall inner wash + a lit top edge + an ambient dark bottom. The muted version of the glow family; typical on dark dashboard containers, code blocks and selected states.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| intensity | number · % | 22% |
| spread | dimension · px | 24px |
| glowColor | color · hex | #78B4FF |
| direction | enum: omni · top | omni |

## 适用场景 / When to use

- 深色仪表盘的容器/分区:面板被「内部」照亮,不向外污染布局(调研 17 §7.1) / Dark dashboard containers/sections: panels lit from within, without polluting the layout outward (research 17 §7.1)
- 代码块、终端窗格:冷蓝内光是「活着的表面」的最低调表达 / Code blocks, terminal panes: a cool-blue inner wash is the quietest way to say the surface is alive
- 选中态/激活分区:内光把注意力收在元素内部,比外发光更安静 / Selected states / active sections: inner light keeps attention inside the element, quieter than outer glow

## 何时不用 / When not to use

- 需要「元素在场景中发光」的叙事——那是 soft-glow-glass/breathing-glow 的职责 / Narratives where the element must glow into the scene — that is soft-glow-glass/breathing-glow territory
- 浅色底材:内光在亮面板上几乎不可见,只剩脏边 / Pale substrates: inner glow is nearly invisible on light panels, leaving a dirty rim
- alpha 超过 ~25%:内光开始糊住面板自身内容,「静音版」失守 / Alpha past ~25%: the wash starts smearing the panel's own content — the muted promise breaks

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
