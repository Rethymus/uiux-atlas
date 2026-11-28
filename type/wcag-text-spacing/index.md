# WCAG Text Spacing / WCAG 文字间距

- 页面 / Page: /uiux-atlas/type/wcag-text-spacing/
- English page: /uiux-atlas/en/type/wcag-text-spacing/
- 本页 / This file: /uiux-atlas/type/wcag-text-spacing/index.md
- 分类 / Category: type 排版 / Typography
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: text spacing · 文字间距 · SC 1.4.12 · 行高字距
- 简介 / Tagline: WCAG 成功准则 1.4.12:用户覆写行高 1.5 倍、段距 2 倍、字距 0.12 倍、词距 0.16 倍字号时,内容不得失效——排版不要锁死这四个比率。
- Tagline (EN): WCAG SC 1.4.12: when users override line height to 1.5×, paragraph spacing 2×, letter spacing 0.12× and word spacing 0.16× of the font size, content must not break — don't hard-lock these four ratios.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| lineHeight | number | 1.5 |
| paragraphGap | dimension · em | 1em |
| letterSpacing | dimension · em | 0em |
| wordSpacing | dimension · em | 0em |

## 适用场景 / When to use

- 正文排版基线:行高 1.5、段距适度的默认值,让覆写空间天然存在 / Body-copy baseline: line-height 1.5 with moderate paragraph gaps leaves override headroom by default
- 组件库的排版令牌:四个比率全部走变量,可被用户样式覆写 / Design-system type tokens: all four ratios as variables, overridable by user styles
- 文本密集界面(文档、阅读器、表单说明文字)的无障碍验收 / Accessibility acceptance for text-dense UIs (docs, readers, form helper text)
- CI 中的间距锁定检查:grep 掉 !important 的行高与定高文本容器 / CI checks against spacing locks: grepping out !important line-heights and fixed-height text containers

## 何时不用 / When not to use

- 行高/字距写死 !important 或内联样式,用户代理无法覆写 / Hard-locking line-height/letter-spacing with !important or inline styles user agents can't override
- 单行定高容器(height: 1.5em + overflow: hidden)——覆写行高后文字被裁掉 / Single-line fixed-height boxes (height: 1.5em + overflow: hidden) — overridden line-height clips the text
- 把文本放进固定高度弹层/卡片,行高一涨就溢出裁剪 / Text in fixed-height popovers/cards that clip once line-height grows
- 只在默认形态下验收排版,不测「四比率全开」形态 / Accepting typography only at defaults, never testing the all-four-overrides form

## 来源 / Sources

- https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html
