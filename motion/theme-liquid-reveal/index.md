# Liquid Theme Reveal / 液体主题切换

- 页面 / Page: /uiux-atlas/motion/theme-liquid-reveal/
- English page: /uiux-atlas/en/motion/theme-liquid-reveal/
- 本页 / This file: /uiux-atlas/motion/theme-liquid-reveal/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: liquid theme switch · liquid reveal · theme pour · 液体切换 · 倾倒主题 · 液态主题过渡 · theme liquid transition
- 简介 / Tagline: 新主题像液体一样从按钮下方流出:视图过渡真揭示 + 动态 SVG clipPath,液柱/液滴/飞溅/波浪的联合轮廓由单一 rAF 逐帧重算 path d(液缘烘进 d,不用滤镜);旧快照垫底、逐像素对齐,配合 Web Audio 本地合成的四阶段音效(默认关)。
- Tagline (EN): The new theme pours out from under the button: a true view-transition reveal + dynamic SVG clipPath, where the joint outline of column, droplets, splash and waves is rebuilt per frame as one path d by a single rAF loop (the liquid edge lives in the d — no filters); the old snapshot underlays with pixel-perfect alignment, plus a four-stage Web Audio score (off by default).

## 参数 / Parameters

| name | type | default |
|---|---|---|
| duration | number · ms | 1600ms |
| sway | dimension · px | 10px |
| waveAmp | dimension · px | 8px |
| droplets | number · 个 | 4个 |

## 适用场景 / When to use

- 主题/外观切换的「品牌瞬间」:深浅两套完整主题像液体一样从触发按钮处铺开,与站点既有 data-theme 切换语义互补(调研 20§8 候扩) / The branded moment of a theme/appearance switch: two complete themes pour from the trigger button, complementing the site's existing data-theme switch semantics (research 20 §8 candidates)
- 需要「过程可读」的主题迁移:液体经过处逐块切换,用户能看见新主题如何铺满界面,而非整页同切 / Theme migrations where the process should be legible: regions switch as the liquid passes so users see how the new theme floods in, instead of an instant whole-page swap
- 从明确交互点发起的局部→全屏揭示:起点来自实际按钮位置,填充范围来自实际舞台/视口尺寸,手机到桌面同一套几何自适应 / Local-to-fullscreen reveals launched from an explicit interaction point: origin from the real button position, fill range from the real stage/viewport size — one adaptive geometry from phone to desktop
- 同族条目组合:与 theme-reveal-wipes(固定形状)/ theme-water-fill(液面档位)互补——需要「从按钮流出 + 联合轮廓」时用本条目 / Family pairing with theme-reveal-wipes (fixed shapes) / theme-water-fill (level tiers): pick this entry when the liquid must pour from the button as a joint outline

## 何时不用 / When not to use

- 高频切换入口(拖动滑杆连续改主题):整段 1.6s 动画 + 快照捕获成本不该挂在连续输入上;高频路径用直切(motion/theme-transition 同诫) / High-frequency theme inputs (a slider scrubbing themes): a 1.6s animation plus snapshot cost must not ride continuous input; use a direct switch on the fast path (same caveat as motion/theme-transition)
- 首屏自动播放:液体切换必须由用户手势发起(AudioContext 手势约束 + 快照捕获 57–94ms 的主线程成本不该花在用户没要求的动画上) / Auto-playing on first paint: the reveal must originate from a user gesture (AudioContext gesture constraint + a 57–94ms main-thread snapshot cost that shouldn't be spent unprompted)
- 在动画期间叠加整页遮罩或复用旧遮罩层:揭示层由过渡伪元素承载,再叠遮罩会双份变色;临时层必须随结束/中断/卸载移除 / Stacking a full-page mask during the run or reusing stale overlay layers: the reveal already rides the transition pseudo-elements; an extra mask doubles the color change — temp layers must be removed on end/interrupt/unmount
- 把静态快照说成「能自动重绘另一主题」:过渡快照是捕获瞬间的像素——Canvas/WebGL/视频在揭示层里是静态像,活重绘需双层渲染方案(docs/liquid-theme.md 如实标注) / Claiming the static snapshot 're-renders the other theme by itself': a transition snapshot is pixels captured at one instant — Canvas/WebGL/video are static inside the reveal layer; live re-painting needs a two-layer rendering scheme (stated honestly in docs/liquid-theme.md)

## 来源 / Sources

- https://developer.mozilla.org/docs/Web/API/View_Transitions_API
- https://developer.mozilla.org/docs/Web/API/Web_Audio_API
- https://en.wikipedia.org/wiki/Dispersion_(water_waves)
