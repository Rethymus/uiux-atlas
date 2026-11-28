# Icon Button / 图标按钮

- 页面 / Page: /uiux-atlas/icons/icon-button/
- English page: /uiux-atlas/en/icons/icon-button/
- 本页 / This file: /uiux-atlas/icons/icon-button/index.md
- 分类 / Category: icons 图标体系 / Icons
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: icon-only button · 纯图标按钮 · 图标工具栏按钮 · Accessible Icon Button
- 简介 / Tagline: 纯图标按钮 = 真实 <button>(自带 APG Button 的 Enter/Space 键盘)+ 装饰图标(aria-hidden + focusable="false")+ 写动作的可访问名;名称实现三方案(视觉隐藏文本 / hidden + aria-labelledby / aria-label)逐一对照,命中热区可量化审计(WCAG 2.5.8 ≥24×24,M3 触控 48dp)。
- Tagline (EN): An icon-only button = a real <button> (native APG Button Enter/Space) + a decorative icon (aria-hidden + focusable="false") + an action-stating accessible name; the three naming implementations (visually hidden text / hidden + aria-labelledby / aria-label) compared one by one, with hit targets audited in numbers (WCAG 2.5.8 ≥24×24, M3 touch 48dp).

## 参数 / Parameters

| name | type | default |
|---|---|---|
| naming | enum: labelledby · hidden-text · aria-label · svg-only · none | labelledby |
| hitTarget | dimension · px | 48px |
| iconSize | dimension · px | 24px |
| expand | enum: padding · pseudo | padding |

## 适用场景 / When to use

- 工具栏/顶栏的纯图标操作(收藏、搜索、关闭):真实 <button> + 装饰图标 + 按钮自身拿动作名 / Icon-only actions in toolbars/top bars (favorite, search, close): a real <button> + decorative icon + the action name on the button itself
- 移动端底部导航与悬浮操作钮:热区按 48dp 级(M3 target 48dp)拉开,图标可小(07 §2/research 04 §2.1) / Mobile bottom navs and FABs: 48dp-class hit targets (M3 target 48dp) with icons allowed smaller (07 §2 / research 04 §2.1)
- 图标 + 文字按钮:图标 aria-hidden,可见文字即名——aria-label 若存在必须与文字一致(Label in Name,12 §12) / Icon + text buttons: icon aria-hidden, visible text is the name — any aria-label must match that text (Label in Name, 12 §12)
- 紧凑桌面工具栏(空间受限):伪元素扩热区保持视觉紧凑的同时守住 24×24 底线(社区常见做法) / Compact desktop toolbars (tight space): pseudo-element hit expansion keeps visuals tight while holding the 24×24 floor (common community practice)

## 何时不用 / When not to use

- 把可访问名只放在 SVG(<title> 或 aria-label on svg)上——跨浏览器/读屏组合存在失败案例(Scott O'Hara,12 §12) / Putting the accessible name only on the SVG (<title> or svg aria-label) — failing combinations exist across the browser/AT matrix (Scott O'Hara, 12 §12)
- 热区低于 24×24 CSS px(WCAG 2.5.8 法定底线)或热区互相紧贴抢命中(04 §2.1 间距要求) / Hit targets under 24×24 CSS px (the WCAG 2.5.8 legal floor) or adjacent targets competing for hits (04 §2.1 spacing)
- 用 <span role="button"> 仿按钮而丢掉 Enter/Space——原生 <button> 自带 APG Button 键盘行为,仿写必须补 keydown / Mimicking a button with <span role="button"> and dropping Enter/Space — a native <button> ships the APG Button keyboard behavior; mimicry must add keydown handling
- aria-label 与可见文字不一致(或整页翻译后不一致)——Label in Name 红线(12 §12) / aria-label diverging from visible text (or diverging after full-page translation) — the Label in Name red line (12 §12)

## 来源 / Sources

- https://www.sarasoueidan.com/blog/accessible-icon-buttons/
- https://www.w3.org/WAI/ARIA/apg/patterns/button/
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden
