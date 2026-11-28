# Command Palette / 命令面板

- 页面 / Page: /uiux-atlas/components/command-palette/
- English page: /uiux-atlas/en/components/command-palette/
- 本页 / This file: /uiux-atlas/components/command-palette/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: Ctrl+K · Cmd+K · ⌘K · Command Menu · Quick Switcher · 快速切换器 · 全局搜索 · 命令窗口
- 简介 / Tagline: 按 Ctrl+K / Cmd+K(或点页头搜索钮)唤起的全局命令浮层:子序列模糊搜索全部条目,↑↓ 选择、Enter 直达、Esc 关闭——APG combobox/listbox 语义 + focus trap + body 滚动锁定的完整零依赖实现。
- Tagline (EN): A global command overlay summoned with Ctrl+K / Cmd+K (or the header search button): subsequence fuzzy search across all entries, ↑↓ to select, Enter to jump, Esc to close — a complete zero-dependency implementation of APG combobox/listbox semantics with focus trap and body scroll lock.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| matchMode | enum: subsequence · prefix | subsequence |
| maxResults | number | 8 |
| hotkeyDisplay | enum: ctrl-k · cmd-k | ctrl-k |

## 适用场景 / When to use

- 中大型站点的全局跳转:条目/页面/动作多到导航栏放不下,一键键盘直达(本站 186+ 条目即此场景) / Global jumping on mid-to-large sites: more entries/pages/actions than a nav bar can hold — one keystroke takes you there (this site's 186+ entries are exactly this case)
- 键盘重度用户的效率路径:记住 Ctrl+K 一个快捷键,替代在多层导航里点选 / The efficiency path for keyboard-first users: remember one shortcut, Ctrl+K, instead of clicking through multi-level navigation
- 把「动作」与「页面」统一成一个可搜索列表(跳转、复制链接、切主题都能进面板) / Unifying actions and destinations into one searchable list (jump, copy link, toggle theme can all live in the palette)
- 新用户探索:面板即目录——空 query 列出条目,输入即收窄,兼作站点索引 / New-user exploration: the palette doubles as a table of contents — an empty query lists entries, typing narrows them down

## 何时不用 / When not to use

- 移动端作为唯一入口——触屏没有 Ctrl+K,浮动层还遮住整屏;必须保留可见导航,面板只是增强 / As the only entry point on touch devices — no Ctrl+K there and the overlay covers the screen; always keep visible navigation and treat the palette as enhancement
- 结果列表一次吐几十条——扫视成本随条目上升(Hick 定律),上限 8-12 并靠键入收窄 / Dumping dozens of results at once — scanning cost grows with each item (Hick's law); cap at 8-12 and narrow by typing
- 只靠 hover 或鼠标暴露结果——键盘(↑↓/Enter/Esc)必须是一等路径(APG 键盘界面实践) / Exposing results only via hover or mouse — keyboard (↑↓/Enter/Esc) must be the first-class path (APG keyboard interface practices)
- 无语义的 div 堆叠——缺 combobox/listbox 语义与 activedescendant,读屏用户拿到的是一堆哑文本 / Stacks of unsemantic divs — without combobox/listbox semantics and activedescendant, screen-reader users get inert text

## 来源 / Sources

- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/
- https://rethymus.github.io/uiux-atlas/components/command-palette/
