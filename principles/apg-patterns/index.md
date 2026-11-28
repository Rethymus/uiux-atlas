# WAI-ARIA APG Patterns / WAI-APG 模式总览

- 页面 / Page: /uiux-atlas/principles/apg-patterns/
- English page: /uiux-atlas/en/principles/apg-patterns/
- 本页 / This file: /uiux-atlas/principles/apg-patterns/index.md
- 分类 / Category: principles 交互法则 / Principles
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: ARIA Authoring Practices · APG 模式库
- 简介 / Tagline: W3C ARIA Authoring Practices 提供 30 个组件模式;每个模式给出键盘交互与 ARIA roles/states/properties 三段规范,是自定义组件实现的第一参照。
- Tagline (EN): The W3C ARIA Authoring Practices provides 30 component patterns; each ships keyboard interaction plus ARIA roles/states/properties in three sections — the first reference for building custom components.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| group | enum: all · forms · navigation · containers · composite | all |
| keyhint | enum: on · off | on |

## 适用场景 / When to use

- 自定义复合组件(radio group、tabs、tree)动手前的第一份规范 / The first spec to read before building composite widgets (radio group, tabs, tree)
- 组件库文档缺失键盘段时,以 APG 为权威补充 / The authoritative supplement when a component library's docs lack a keyboard section
- 评审自定义控件:对照模式页逐条核 roles/states/properties / Reviewing custom widgets: check roles/states/properties against the pattern page item by item

## 何时不用 / When not to use

- 拿 ARIA 属性当「自动补键盘行为」的魔法——ARIA 只声明语义,行为要作者实现(07§35) / Treating ARIA attributes as magic that auto-provides keyboard behavior — ARIA declares semantics; authors implement behavior (07 §35)
- 混用多个模式(A dialog 混 menu 行为)而不回查规范 / Mixing patterns (a dialog with menu behavior) without re-checking the spec

## 来源 / Sources

- https://www.w3.org/WAI/ARIA/apg/patterns/
