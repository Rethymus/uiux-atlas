# Small Caps & OpenType Features / 小型大写与开放特性

- 页面 / Page: /uiux-atlas/type/small-caps-features/
- English page: /uiux-atlas/en/type/small-caps-features/
- 本页 / This file: /uiux-atlas/type/small-caps-features/index.md
- 分类 / Category: type 排版 / Typography
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 小型大写 · smcp · font-feature-settings · OpenType features
- 简介 / Tagline: font-variant-* 高层属性直连 OpenType 特性(smcp/c2sc/liga/zero…),font-feature-settings 是低层兜底:官方明确「能用高层就用高层,不要用它启用小型大写」。
- Tagline (EN): The font-variant-* high-level properties address OpenType features (smcp/c2sc/liga/zero…); font-feature-settings is the low-level fallback — the official guidance: prefer the high level, 'do not use it to enable small caps'.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| caps | enum: normal · small-caps · all-small-caps | all-small-caps |
| ligatures | enum: common-ligatures · no-common-ligatures | common-ligatures |
| zero | enum: normal · slashed-zero | normal |

## 适用场景 / When to use

- 眉标/章节小标:all-small-caps + 0.08em 字距(本站大写小标纪律同款字距,src/styles/global.css:852-856) / Eyebrows and section labels: all-small-caps with 0.08em tracking (the same tracking as this site's uppercase-label discipline, src/styles/global.css:852-856)
- 法律/学术文本中的缩略语:small-caps 保留原大小写语义 / Abbreviations in legal/academic text: small-caps preserves the original casing semantics
- 代码块与 URL:关连字(no-common-ligatures)保 fi/fl 逐字符清晰 / Code blocks and URLs: ligatures off (no-common-ligatures) keeps fi/fl character-exact
- 风数百变的高级用法:风格集 ss01–ss20/花体 swsh 只能用低层 font-feature-settings 表达(12§10) / Advanced stylistic sets: ss01–ss20/swashes are expressible only through low-level font-feature-settings (12 §10)

## 何时不用 / When not to use

- 用 font-feature-settings 启用小型大写——MDN 官方明确禁止此用法,高层 font-variant-caps 才有合成回退与语义(12§10) / Enabling small caps via font-feature-settings — MDN explicitly rules this out; only font-variant-caps carries synthesis fallback and semantics (12 §10)
- 大段正文 all-small-caps——MDN 记载对阅读障碍(如 dyslexia)用户可能难读(本批次补核) / Long passages in all-small-caps — MDN records that it can be hard to read for users with cognitive concerns such as dyslexia (re-verified this batch)
- 中文正文套小型大写——smcp 只作用于拉丁字母;中文字形不受影响,混排时视觉重量需单独核对 / Applying small caps to CJK body text — smcp only affects Latin letters; CJK glyphs are untouched and their visual weight needs separate checking in mixed text

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings
- https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-caps
