# Skeuomorphism / 拟物化

- 页面 / Page: /uiux-atlas/styles/skeuomorphism/
- English page: /uiux-atlas/en/styles/skeuomorphism/
- 本页 / This file: /uiux-atlas/styles/skeuomorphism/index.md
- 分类 / Category: styles 风格流派 / Styles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 拟物 · 拟物设计 · Skeuomorph UI
- 简介 / Tagline: 模拟真实材质与机械控制器的 UI 传统:材质贴图(皮革/拉丝金属/纸纹/木纹)、顶缘受光的凹凸光照模型、可按压/可旋转的机械控制隐喻——2026 年以「新材质家族」四分支回潮。
- Tagline (EN): The UI tradition of mimicking real materials and mechanical controls: material textures (leather/brushed metal/paper/wood), a top-lit bevel lighting model, pressable and rotatable mechanical metaphors — reviving in 2026 as a four-branch 'new materials family'.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| texture | enum: leather · metal · paper · wood | leather |
| lightAngle | dimension · deg | 135deg |
| emboss | number | 1 |
| stitch | enum: off · on | on |

## 适用场景 / When to use

- 音乐/收音机/复古主题的播放器与调音界面——旋钮、拨杆、拉丝金属的机械隐喻与内容语境同构 / Music/radio/retro players and tuners — knobs, toggles and brushed metal mirror the content's own mechanics
- 儿童与教育产品——「像真东西一样可抓握」的心理暗示降低学习成本(与 2026 发光生态拟物分支的场景重合) / Children's and education products — the 'grabbable like a real thing' cue lowers learning cost (overlapping with the 2026 glowing-organic branch)
- 仪式感/纪念性场景(证书、票据、会员卡)——纸纹与皮革的材质语义传递「值得保存」 / Ceremonial/commemorative surfaces (certificates, tickets, membership cards) — paper and leather textures say 'worth keeping'

## 何时不用 / When not to use

- 高密度生产力界面——材质噪点与凹凸阴影吃掉信息对比度,表格/代码编辑器不成立 / Dense productivity surfaces — texture noise and bevel shadows eat information contrast; tables/code editors can't carry it
- 系统级 UI 全铺开——iOS 7 放弃拟物的历史原因(装饰干扰内容)至今成立,拟物只适合局部主题化 / Whole-system UI — the historical reason iOS 7 dropped skeuomorphism (decoration fighting content) still holds; keep it to local theming
- 可访问性关键路径——凹凸阴影会稀释控件边界对比,务必核对 3:1 非文本对比(SC 1.4.11),必要时补描边 / Accessibility-critical paths — bevel shadows dilute control boundaries; verify 3:1 non-text contrast (SC 1.4.11) and add strokes where needed

## 来源 / Sources

- https://trends.daisyui.com/ui-design-trends-2025/
- https://trends.daisyui.com/ui-design-trends-2026/
- https://developer.apple.com/videos/play/wwdc2025/219/
