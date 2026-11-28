# Shake · Exponential Decay / 错误抖动·指数衰减

- 页面 / Page: /uiux-atlas/motion/shake-decay/
- English page: /uiux-atlas/en/motion/shake-decay/
- 本页 / This file: /uiux-atlas/motion/shake-decay/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: shake · 错误抖动 · velocity injection · damped oscillation
- 简介 / Tagline: 错误反馈抖动优先做成 x(t)=A·e^(−λt)·sin(ωt) 的指数衰减正弦:CSS 衰减 keyframes 与『给初速度、让弹簧自己衰减』两种实现对照,连按与中断物理连续。
- Tagline (EN): Error shakes are best built as the decaying sinusoid x(t)=A·e^(−λt)·sin(ωt): two implementations side by side — CSS decay keyframes vs injecting initial velocity and letting the spring decay itself — continuous under rapid re-triggers.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| amp | number | 10 |
| lambda | number · s⁻¹ | 6s⁻¹ |

## 适用场景 / When to use

- 表单校验失败(登录框、验证码):水平 3~5 拍、总时长 0.3~0.5s + 描边变红 + 文案 / Form validation failures (login, OTP): 3–5 horizontal beats, 0.3–0.5s total, plus a red border + message
- 连按/重复提交场景优先速度注入:从当前值速度续接,连按不重置跳变(调研 10 巧思 4) / Rapid resubmission contexts prefer velocity injection: continues from the current value's velocity — no reset-jump on rapid presses (research 10 craft #4)
- 零依赖场景用衰减 keyframes:按 A/λ 采样一次生成,静态可复用,事件级重生成样式表 / Zero-dependency contexts use decay keyframes: sampled once from A/λ, reusable, regenerated at event level
- 错误提示与触觉/读屏联动:视觉抖动 + 红描边 + role=status 文案三通道并行 / Pair the shake with haptics/screen-reader channels: visual shake + red border + role=status text in parallel

## 何时不用 / When not to use

- animate.css 等幅抖动当『物理失败』用——等幅每拍 ±10px 是通知语法,不像物理衰减(调研 10§4.1) / Using animate.css' constant-amplitude shake as a 'physical failure' cue — equal ±10px beats read as a notice, not physics (research 10 §4.1)
- 总时长超过 0.6s 或拍数超过 6——从『提示』滑向『惩罚』;低于 0.2s 又读不出失败 / Totals past 0.6s or more than 6 beats — 'hint' slides into 'punishment'; under 0.2s stops reading as failure
- 把抖动作为错误唯一信号——prefers-reduced-motion 与读屏用户将完全丢失错误信息 / Making the shake the sole error signal — reduced-motion and screen-reader users lose the error entirely
- 抄 macOS 抖动参数并标注为 Apple 官方——Apple 未公开参数,数值是社区复刻经验(调研 10§4.4) / Citing macOS shake numbers as Apple-official — Apple published none; the numbers are folk replications (research 10 §4.4)

## 来源 / Sources

- https://github.com/animate-css/animate.css/blob/main/source/attention_seekers/shakeX.css
- https://motion.dev/docs/react-transitions
- https://en.wikipedia.org/wiki/Damping_ratio
- https://github.com/motiondivision/motion/blob/main/packages/motion-dom/src/animation/generators/spring.ts
