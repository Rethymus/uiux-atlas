# Damping Ratio Craft / 阻尼感设计

- 页面 / Page: /uiux-atlas/motion/damping-craft/
- English page: /uiux-atlas/en/motion/damping-craft/
- 本页 / This file: /uiux-atlas/motion/damping-craft/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 阻尼比 · damping ratio · ζ 手感 · critical damping
- 简介 / Tagline: ζ(阻尼比)是手感的第一变量:0.3~0.7 是『弹』区、0.5~0.8 是多数 UI 的目标区、ζ=1 临界最快无过冲、>1 过阻尼粘滞——同一目标位下四种手感,由一个比值决定。
- Tagline (EN): The damping ratio ζ is the first variable of feel: 0.3–0.7 is the 'bouncy' band, 0.5–0.8 the target for most UI, ζ=1 critical is the fastest no-overshoot settle, and >1 is overdamped crawl — four hand-feels at one target, set by a single ratio.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| zeta | number | 0.5 |
| stiffness | number | 200 |

## 适用场景 / When to use

- 为控件选『手感档』:先定 ζ 区间(弹 0.3~0.7 / 稳 0.7~1 / 粘滞 >1),再用 ω₀ 调节奏 / Picking a feel tier for a control: fix the ζ band first (bouncy 0.3–0.7 / steady 0.7–1 / sticky >1), then tempo with ω₀
- 校准弹簧预设:Motion bounce 与 ζ 的换算(bounce 0.2→ζ0.8、0.3→ζ0.7)用本条目读数核对 / Calibrating spring presets: verify Motion bounce ↔ ζ conversions (0.2→ζ0.8, 0.3→ζ0.7) against this entry's readouts
- 大元素调 mass 前的基准实验:先在同 mass=1 下锁 ζ,再单独评估 mass 的『大物沉』效应(Motion mass:'auto' 同理,调研 10§6.3) / A baseline experiment before tuning mass: lock ζ at mass=1 first, then evaluate mass' 'heavier sinks slower' separately (same logic as Motion's mass:'auto', research 10 §6.3)
- 评审/教学:同一目标位下四档 ζ 并排跑,过冲与包络时间读数让『手感』变成可讨论的数值 / Reviews/teaching: four ζ tiers racing to one target, with overshoot and envelope readouts turning 'feel' into discussable numbers

## 何时不用 / When not to use

- ζ<0.3 的弹跳球手感放进表单/列表等高频交互——过冲 >37% 是玩具感,不是活力(调研 10§6.2) / ζ<0.3 ball-bounce feel in forms/lists or other high-frequency interactions — >37% overshoot reads toyish, not lively (research 10 §6.2)
- 把 stiffness/damping 当独立手感旋钮乱调而从不计算 ζ——`500/50` 这类组合是过阻尼假弹簧(ζ≈1.118)(调研 10§2.3/巧思 3) / Treating stiffness/damping as independent feel knobs without ever computing ζ — combos like `500/50` are overdamped fake springs (ζ≈1.118) (research 10 §2.3, craft #3)
- 进度条/连续量用欠阻尼弹簧——连续量不该有过冲(参考 motion-spring 条目告诫) / Underdamped springs on progress bars/continuous values — continuous quantities take no overshoot (see the motion-spring entry caveat)
- ζ>1.2 的重度过阻尼放在需要『到位感』的反馈上——粘滞感会被读成卡顿/失灵 / Heavy overdamping past ζ>1.2 on feedback that needs arrival certainty — the sticky crawl reads as lag or breakage

## 来源 / Sources

- https://en.wikipedia.org/wiki/Damping_ratio
- https://github.com/motiondivision/motion/blob/main/packages/motion-dom/src/animation/generators/spring.ts
- https://motion.dev/docs/react-transitions
- https://developer.apple.com/documentation/uikit/uispringtimingparameters
- https://developer.apple.com/documentation/swiftui/animation/spring(response:dampingfraction:blendduration:).md
