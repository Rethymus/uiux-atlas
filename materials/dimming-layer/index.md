# Dimming Layer / 压暗层

- 页面 / Page: /uiux-atlas/materials/dimming-layer/
- English page: /uiux-atlas/en/materials/dimming-layer/
- 本页 / This file: /uiux-atlas/materials/dimming-layer/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 压暗层 · Scrim · Dimming Layer · 遮罩压暗
- 简介 / Tagline: 压在下层内容上的半透明遮罩,为前景换回可读性:弹窗遮罩(::backdrop 纯色式)与文字压图(底部梯度式)两式,α 用官方/可核验档位分档。
- Tagline (EN): A translucent veil pressed over underlying content to buy back legibility for the foreground: the dialog-scrim (::backdrop, solid) and caption-over-photo (bottom gradient) forms, with α stepped through official/verifiable presets.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| mode | enum: solid · gradient | solid |
| strength | enum: 0.25 · 0.30 · 0.35 · 0.55 | 0.35 |
| color | color · hex | #000000 |

## 适用场景 / When to use

- 模态弹窗/对话框背后的纯色遮罩(::backdrop 形态)——把注意力让给前景并把下层压到可容忍的噪声级 / Solid scrims behind modal dialogs (::backdrop form) — handing attention to the foreground and pushing the layer below to tolerable noise
- 照片/视频上的图注与字幕条(梯度式)——只压文字落点,媒体主体保留 / Captions and subtitle bars over photos/videos (gradient form) — dim only where text sits, keep the media subject clear
- iOS 26 sheet 的模态语义:「玻璃轻微后退,配压暗层表达模态」(WWDC25 356,调研 09 §8.9) / iOS 26 sheet modality: 'the glass recedes slightly, paired with a dimming layer to express modality' (WWDC25 356, research 09 §8.9)
- clear 玻璃控件压在亮色媒体上:官方「下层内容偏亮时加 35% 深色压暗层」的推荐场景 / clear glass controls over bright media: the official 'add a 35% dark dimming layer when content beneath is bright' scenario

## 何时不用 / When not to use

- α 不足还要硬放文字——下层内容偏亮时 α 低于 30% 常常守不住 4.5:1,先加压暗再谈排版 / Placing text over an under-dimmed backdrop — below 30% α often fails 4.5:1 on bright content; dim first, then typeset
- 全屏重遮罩(≥55%)叠在需要保留上下文的界面上——下层几乎不可辨,模态之外的场合不要用 / Heavy full-screen scrims (≥55%) over interfaces that need context — the layer below becomes illegible; reserve for true modality
- 梯度式遮罩保护不到的文字位置——渐变只在底部顶点达到 α 峰值,顶部文字等于裸放 / Text outside a gradient scrim's protected zone — the ramp only reaches peak α at the bottom vertex; text elsewhere sits bare
- 掺品牌色的遮罩不复核对比度——色相偏离黑/白后,与前景的对比关系全部改变 / Brand-tinted scrims without a contrast re-check — once the hue leaves black/white, every foreground relationship changes

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop
- https://developer.apple.com/design/human-interface-guidelines/materials
- https://developer.apple.com/documentation/swiftui/glass
