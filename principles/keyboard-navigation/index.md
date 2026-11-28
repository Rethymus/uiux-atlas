# Keyboard Navigation / 键盘导航全景

- 页面 / Page: /uiux-atlas/principles/keyboard-navigation/
- English page: /uiux-atlas/en/principles/keyboard-navigation/
- 本页 / This file: /uiux-atlas/principles/keyboard-navigation/index.md
- 分类 / Category: principles 交互法则 / Principles
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 键盘无障碍 · 焦点管理 · focus management
- 简介 / Tagline: Tab/Shift+Tab 在组件间移动,方向键在复合组件内移动(roving focus);焦点指示可见、焦点永不丢失、模态困焦必须可 Esc 释放并归还焦点。
- Tagline (EN): Tab/Shift+Tab moves between components, arrow keys move inside composites (roving focus); focus indicators stay visible, focus is never lost, and modal traps must release via Esc and return focus.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| scene | enum: toolbar · tabs · dialog | toolbar |
| ring | enum: native · strong | native |
| ringWidth | dimension · px | 3px |

## 适用场景 / When to use

- 自定义复合组件(radio group/tablist/menu/listbox/grid)的 roving focus 实现 / Implementing roving focus in custom composites (radio group/tablist/menu/listbox/grid)
- 模态对话框:困焦 + Esc + 焦点归还三件套 / Modal dialogs: trap + Esc + focus return, the trio
- 删除列表项/关闭面板后的焦点安置(设回触发者或后一项) / Focus placement after deleting items or closing panels (back to trigger or next item)

## 何时不用 / When not to use

- `outline: none` 不给替代焦点指示——WebAIM 明确禁忌 / `outline: none` with no replacement indicator — an explicit WebAIM anti-pattern
- 页面加载主动抢初始焦点(除非页面只有一个几乎人人马上用的主功能) / Grabbing initial focus on page load (unless the page has one main function nearly everyone uses immediately)
- 「选中随焦点」用在未预载面板上(切换有延迟时必须分离二者) / 'Selection follows focus' on non-preloaded panels (with loading lag, the two must decouple)

## 来源 / Sources

- https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
- https://webaim.org/techniques/keyboard/
