# Icon Semantics & Accessibility / 图标语义与无障碍

- 页面 / Page: /uiux-atlas/icons/icon-aria-accessible/
- English page: /uiux-atlas/en/icons/icon-aria-accessible/
- 本页 / This file: /uiux-atlas/icons/icon-aria-accessible/index.md
- 分类 / Category: icons 图标体系 / Icons
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 装饰性图标 · 图标可访问名 · aria-hidden · Accessible Icon · Decorative Icon
- 简介 / Tagline: 装饰图标一律 aria-hidden="true" 摘出无障碍树且永不落在可聚焦元素上;语义图标用可访问名写动作(「搜索」不是「放大镜」);四种 aria-hidden × 可访问名组合逐一对照读屏行为。
- Tagline (EN): Decorative icons are removed from the accessibility tree with aria-hidden="true" and never sit on focusable elements; semantic icons get an accessible name describing the action ('search', not 'magnifying lens'); all four aria-hidden × name combinations compared against screen-reader behavior.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| decorative | enum: on · off | on |
| label | enum: with · without | with |

## 适用场景 / When to use

- 图标 + 文字按钮:图标纯装饰 aria-hidden,文字就是可访问名(MDN 官方示例分工) / Icon + text button: icon purely decorative with aria-hidden, the text is the accessible name (MDN's canonical split)
- 纯图标按钮(工具栏):图标 aria-hidden + 按钮拿 aria-label 写动作「收藏/搜索/打印此页」 / Icon-only buttons (toolbars): icon aria-hidden + aria-label on the button stating the action (favorite / search / print this page)
- 信息型共享图标(如「新窗口」):替代文本承载图标语义本身(07 §4.1 例 3) / Shared informational icons (e.g. new window): the alt text carries the icon's meaning itself (07 §4.1 example 3)

## 何时不用 / When not to use

- aria-hidden 放在可聚焦元素或其祖先上——焦点落进隐藏子树是 ARIA 红线(MDN 原文,07 §4.1) / aria-hidden on a focusable element or its ancestor — focus landing inside a hidden subtree is an ARIA red line (MDN, 07 §4.1)
- 用形状描述当可访问名(「五角星」「放大镜」)——应写动作(「收藏」「搜索」,WAI 教程,07 §4.1) / Naming by shape ('star', 'magnifier') instead of by action ('favorite', 'search') — WAI tutorial, 07 §4.1
- 隐藏后没有等价信息暴露("identical or equivalent meaning and functionality" 是摘除前提,07 §4.1) / Hiding without equivalent information exposed — 'identical or equivalent meaning and functionality' is the precondition for removal (07 §4.1)

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden
- https://www.w3.org/WAI/tutorials/images/functional/
- https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/
