# Safe Area Insets / 安全区 Safe Area

- 页面 / Page: /uiux-atlas/layout/safe-area/
- English page: /uiux-atlas/en/layout/safe-area/
- 本页 / This file: /uiux-atlas/layout/safe-area/index.md
- 分类 / Category: layout 布局与响应式 / Layout
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: safe-area-inset · env() · viewport-fit · 异形屏适配
- 简介 / Tagline: 异形屏适配:viewport-fit=cover 铺满全屏后,用 env(safe-area-inset-top/right/bottom/left) 四向留边,让内容避开刘海与 Home 指示条。
- Tagline (EN): Notched-screen adaptation: after viewport-fit=cover fills the screen, env(safe-area-inset-top/right/bottom/left) reserves the four edges so content clears the notch and Home indicator.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| insetTop | number | 44 |
| insetBottom | number | 34 |
| viewportFit | enum: auto · cover | cover |
| applyEnv | enum: on · off | on |

## 适用场景 / When to use

- 全屏沉浸式页面:视频播放器、地图、游戏——cover 铺满 + env() 四向留边 / Full-screen immersive pages: video players, maps, games — cover plus env() padding on all four edges
- PWA/移动 Web 的底部操作栏:calc(16px + env(safe-area-inset-bottom)) 防 Home 指示条压住按钮 / PWA/mobile-web bottom action bars: calc(16px + env(safe-area-inset-bottom)) keeps the Home indicator off the buttons
- 桌面 PWA 标题栏适配:env(titlebar-area-*) 让内容避开自绘标题栏控件(MDN env() 页收录) / Desktop PWA title bars: env(titlebar-area-*) keeps content clear of custom title-bar controls (collected on MDN's env() page)
- 横屏安全区:left/right inset 在旋转后交接主责——左右留边与上下留边一套代码全照应 / Landscape safety: left/right insets take over after rotation — one code path covers all four edges

## 何时不用 / When not to use

- viewport-fit=cover 却不写 env() 留边——内容顶进刘海与 Home 指示条(demo 的 off 档即此事故) / viewport-fit=cover without env() padding — content butts into the notch and Home indicator (the demo's off mode is exactly this accident)
- 只处理 top/bottom 忘掉 left/right——横屏时左右才是主危险区 / Handling only top/bottom and forgetting left/right — in landscape those are the primary danger zones
- 把非全屏页面也设 cover——普通页面 auto 的自动内缩已够,cover 反而引入留边负担 / Setting cover on non-immersive pages — auto's automatic insets already suffice, cover only adds padding chores
- 用固定魔法数字硬编码刘海高度——机型 inset 各不相同,必须读 env() / Hard-coding notch heights as magic numbers — insets differ per device; read env() instead

## 来源 / Sources

- https://webkit.org/blog/7929/designing-websites-for-iphone-x/
- https://developer.mozilla.org/en-US/docs/Web/CSS/env
