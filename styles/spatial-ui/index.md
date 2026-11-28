# Spatial UI / 空间 UI Spatial

- 页面 / Page: /uiux-atlas/styles/spatial-ui/
- English page: /uiux-atlas/en/styles/spatial-ui/
- 本页 / This file: /uiux-atlas/styles/spatial-ui/index.md
- 分类 / Category: styles 风格流派 / Styles
- 来源体系 / System: Apple HIG / Apple HIG
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 空间 UI Spatial · Spatial UI · visionOS Style
- 简介 / Tagline: visionOS 设计语言的 Web 转译(平台范式借鉴):玻璃窗口浮于环境之上、深度即层级(少量大阴影)、注视即悬停(大热区+明确焦点环)、「最小沉浸级别」的动效纪律。
- Tagline (EN): visionOS's design language translated to the Web (a platform-paradigm borrowing): glass windows floating over an environment, depth-as-hierarchy (few large shadows), gaze-as-hover (big targets + clear focus rings), and the 'minimum immersion' motion discipline.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| blur | dimension · px | 20px |
| saturation | number · × | 1.4× |
| fill | color · oklch | oklch(1 0 0 / 0.55) |
| radius | dimension · px | 24px |
| shadow | shadow · layers | [{"x":0,"y":12,"blur":40,"spread":0,"color":"rgba(0, 0, 0, 0.18)"}] |
| immersion | enum: shared · full | shared |

## 适用场景 / When to use

- 面向 visionOS 浏览器的 Web 内容——Safari 26.2 起 WebXR 支持 WebGPU(WebKit 官方),玻璃窗口语言直接对应系统窗口 / Web content aimed at visionOS browsers — Safari 26.2 brings WebGPU-backed WebXR (official WebKit), and the glass-window language maps directly onto system windows
- 需要「窗口浮层」隐喻的产品页:媒体播放器、悬浮控制条、次级面板 / Product pages needing the 'floating window' metaphor: media players, floating controls, secondary panels
- 强环境感场景:照片查看器、地图、演示页——玻璃下透出的环境本身就是内容 / Environment-heavy scenes: photo viewers, maps, presentation pages — the environment showing through the glass is itself the content
- 强调「深度层级」的产品导航:用阴影与缩放表达主次,替代密集描边 / Product navigation that leans on depth hierarchy: express primary/secondary with shadows and scale instead of dense outlines

## 何时不用 / When not to use

- 纯色/无环境背景——玻璃在平色底上失效,只剩一层淡色矩形(与 glassmorphism 同规则) / Flat, environment-free backdrops — glass collapses on flat color into a pale rectangle (same rule as glassmorphism)
- 信息密集的数据面板——玻璃稀释对比度,密集文字需要实底 / Dense data panels — glass dilutes contrast; dense text needs a solid surface
- 全屏「沉浸」滥用:HIG 原则「找到每个关键时刻所需的最小沉浸级别——不要假设每个时刻都需要完全沉浸」 / Full-screen 'immersion' abuse: HIG's principle — 'find the minimum level of immersion needed for each moment; don't assume every moment needs full immersion'
- 两侧极远位置与全屏视差:HIG 舒适性原则「内容置于视野内」「避免压倒性、突兀、过快或缺乏静止参照系的运动」 / Far-edge placements and full-screen parallax: HIG ergonomics — 'keep content in the field of view' and 'avoid overwhelming, abrupt, overly fast motion without a static reference frame'

## 来源 / Sources

- https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos
- https://webkit.org/blog/17640/webkit-features-for-safari-26-2/
