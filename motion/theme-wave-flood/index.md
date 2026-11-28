# Theme Wave Flood / 波浪涌入

- 页面 / Page: /uiux-atlas/motion/theme-wave-flood/
- English page: /uiux-atlas/en/motion/theme-wave-flood/
- 本页 / This file: /uiux-atlas/motion/theme-wave-flood/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: wave surge · liquid theme flood · 波浪液面切换 · 液面上涨
- 简介 / Tagline: 新主题以双正弦叠加的起伏波浪液面整体涌入、覆盖旧主题:rAF 逐帧重写液面 path,波数 k=2π/λ 决定波峰密度,覆盖完成瞬间翻转 data-theme,500ms 整屏档完成。
- Tagline (EN): The new theme floods in as one undulating liquid surface built from two superposed sine waves: rAF rewrites the surface path per frame, wavenumber k=2π/λ sets crest density, the theme attribute flips the instant coverage completes, and the 500ms full-screen tier bounds the whole run.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| amplitude | dimension · px | 8px |
| wavelength | dimension · px | 240px |
| duration | number · ms | 500ms |
| direction | enum: up · down · left · right | up |

## 适用场景 / When to use

- 深浅主题切换的整屏液态揭示(主题按钮、设置页的主题卡)——默认 up 方向即「注水」心智 / Full-screen liquid reveal on dark/light switches (theme button, theme cards in settings) — the default up direction matches the 'filling' mental model
- 品牌性、低频的主题时刻:首次引导、节日主题、档位化主题的隆重切换 / Branded, infrequent theme moments: onboarding, seasonal themes, ceremonial switching between theme tiers
- 内容可滚动的长页面换肤:揭示边缘固定于视口、内容在液面下正常滚动(spike S8 实证的理想行为) / Re-skinning scrollable long pages: the reveal edge stays viewport-fixed while content scrolls normally beneath (ideal behavior proven in spike S8)
- 与 motion/theme-turbulence-edge 组合:平滑波缘烘进 path,湍流毛边走独立滤镜层 / Combined with motion/theme-turbulence-edge: bake the smooth wave into the path, put the turbulent fringe on a separate filter layer

## 何时不用 / When not to use

- 高频切换入口连播整屏波浪——HIG「高频交互避免加动效」,500ms 每按必播会拖慢连按(调研 20§5) / Playing a full-screen wave on every press of a high-frequency toggle — HIG's 'avoid motion on frequent interactions'; a 500ms run per press slows rapid toggling (research 20 §5)
- prefers-reduced-motion 用户仍看波浪——WCAG 2.3.3 要求交互触发的运动动画可禁用(C39),reduce 档必须直切或 crossfade / Showing the wave to prefers-reduced-motion users — WCAG 2.3.3 requires interaction-triggered motion to be disableable (C39); the reduce tier must hard-cut or cross-fade
- 在 ::view-transition-* 伪元素上挂 SVG 滤镜求液缘——spike S5 反证滤镜被忽略;液缘要么烘进 path,要么走独立层 / Hanging an SVG filter on ::view-transition-* pseudo-elements for a fringe — spike S5 disproved it (filters are ignored); bake the fringe into the path or use a separate layer
- 把关键信息只交给波浪动画传达——HIG「动效不能是重要信息的唯一通道」,主题状态必须有颜色/文字承载 / Letting the wave be the sole carrier of key information — HIG: motion must never be the only channel; the theme state needs color/text of its own

## 来源 / Sources

- https://developer.chrome.com/docs/web-platform/view-transitions/same-document
- https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration
- https://en.wikipedia.org/wiki/Dispersion_(water_waves)
- https://developer.apple.com/design/human-interface-guidelines/motion
- https://developer.mozilla.org/en-US/docs/Web/CSS/::view-transition-old
