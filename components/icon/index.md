# Icon / 图标

- 页面 / Page: /uiux-atlas/components/icon/
- English page: /uiux-atlas/en/components/icon/
- 本页 / This file: /uiux-atlas/components/icon/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 图标 · SVG Icon · Glyph
- 简介 / Tagline: 线性 SVG 图标件:stroke=currentColor 单色渲染,尺寸 12–48px、线宽 1–3 实时可调;图标随文字颜色走,语义靠可访问名补齐。
- Tagline (EN): Linear SVG icon: rendered monochrome with stroke=currentColor; size 12–48px and stroke width 1–3 are live-tunable; icons inherit text color and rely on accessible names for meaning.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| size | dimension · px | 14px |
| color | enum: current · accent · danger | current |
| strokeWidth | number | 2 |

## 适用场景 / When to use

- 按钮/菜单项前的语义化小图标(与文字等高,1em 对齐) / Semantic mini-icons before buttons/menu items (text-height, 1em aligned)
- 表单控件的后缀图标(搜索镜、清除叉、下拉箭头) / Suffix icons on form controls (magnifier, clear cross, dropdown caret)
- 空状态/引导页的插画级大图标(40–48px) / Illustration-scale icons on empty states and onboarding (40–48px)
- 状态指示:危险动作旁的红色警示图标(colorError) / Status cues: a red warning icon beside destructive actions (colorError)

## 何时不用 / When not to use

- 用图标承载唯一语义而无文字/可访问名——含义因人而异,读屏完全拿不到 / Letting an icon carry the only meaning without text or an accessible name — meaning varies by person and screen readers get nothing
- 同一界面混用描边与填充两套风格、或多套线宽——视觉噪音破坏一致性 / Mixing stroked and filled styles, or multiple stroke widths, in one UI — visual noise breaks consistency
- 小于 12px 的图标:线条粘连成墨点,缩略后不可辨 / Icons under 12px: strokes smear into ink blots and become unreadable
- 仅靠颜色区分图标状态(危险红 vs 主色)——色觉障碍用户需要形状兜底(Von Restorff 告诫,调研 07 §30) / Distinguishing icon states by color alone (danger red vs accent) — color-blind users need shape redundancy (Von Restorff caveat, research 07 §30)

## 来源 / Sources

- https://ant.design/components/icon-cn
- https://www.w3.org/WAI/ARIA/apg/patterns/button/
