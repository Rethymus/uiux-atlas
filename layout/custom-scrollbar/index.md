# Custom Scrollbar / 自定义滚动条

- 页面 / Page: /uiux-atlas/layout/custom-scrollbar/
- English page: /uiux-atlas/en/layout/custom-scrollbar/
- 本页 / This file: /uiux-atlas/layout/custom-scrollbar/index.md
- 分类 / Category: layout 布局与响应式 / Layout
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: scrollbar-color · scrollbar-width · ::-webkit-scrollbar · scrollbar-gutter
- 简介 / Tagline: 两套实现、一个互操作真相:标准属性 scrollbar-color/width 是 Firefox 路线(Chrome 121+/Safari 26.2 补齐),::-webkit-scrollbar 伪元素是 WebKit 老路——且 scrollbar-width ≠ auto 时 webkit 全家被忽略;scrollbar-gutter 负责给滚动条留槽防跳动。
- Tagline (EN): Two implementations, one interoperability truth: the standard scrollbar-color/width properties are the Firefox route (Chrome 121+, Safari 26.2 caught up), the ::-webkit-scrollbar pseudo-elements are the WebKit legacy — and once scrollbar-width ≠ auto, the whole webkit family is ignored; scrollbar-gutter reserves the slot so layouts stop jumping.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| engine | enum: standard · webkit | standard |
| width | enum: auto · thin · none | thin |
| thumb | color · hex | #6a5cff |
| track | color · hex | #00000000 |
| gutter | enum: auto · stable | auto |

## 适用场景 / When to use

- 全站滚动条品牌化:scrollbar-color 接品牌变量挂 :root,暗色模式自动反色(调研 11§9 片段与 11§10-8 巧思) / Site-wide scrollbar branding: scrollbar-color on :root fed by the brand variable, auto-flipping in dark mode (research 11 §9 fragment and §10-8 idea)
- 密集数据区/代码块的细滚动条:thin 省空间不抢注意力(调研 10§8.3「目的是省空间不是审美」) / Thin scrollbars in dense data and code blocks: thin saves space without stealing attention (research 10 §8.3: 'the purpose is saving space')
- 聊天流/命令行面板:webkit 伪元素做圆角胶囊滑块,Blink/WebKit 环境的像素级控制 / Chat streams and terminal panels: webkit pseudos for capsule thumbs and pixel-level control in Blink/WebKit
- 列表容器 scrollbar-gutter: stable 预留槽位,内容增减时布局不再左右横跳(MDN 用例,本次核对) / List containers with scrollbar-gutter: stable reserving the slot so layouts stop jittering as content grows (MDN use case, verified this session)

## 何时不用 / When not to use

- scrollbar-width: none 当装饰手段——MDN 警告影响键盘滚动可及性(WCAG 2.1.1,调研 10§8.3) / scrollbar-width: none as decoration — MDN warns it harms keyboard scrolling (WCAG 2.1.1, research 10 §8.3)
- 给整个视口强定制滚动条——root 上的值应用到 viewport,用户对系统滚动条的心智被打破(调研 10§8.3 root 行为) / Heavy customization of the viewport scrollbar — a root value applies to the viewport and breaks users' system mental model (research 10 §8.3 root behavior)
- 以为 webkit 伪元素全平台可用——Firefox 不实现,且 Safari 26.2 起官方建议弃用(调研 11§9) / Assuming webkit pseudos work everywhere — Firefox doesn't implement them and WebKit has advised dropping them since Safari 26.2 (research 11 §9)
- 高对比装饰色滑块——滑块/轨道对内容与彼此都要守住对比度,装饰性配色先过 WCAG 1.4.11 非文本对比 / High-decoration thumb colors — thumb and track must hold contrast against content and each other; decorative palettes still pass WCAG 1.4.11 non-text contrast

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width
- https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter
- https://github.com/mdn/browser-compat-data/blob/main/css/properties/scrollbar-color.json
