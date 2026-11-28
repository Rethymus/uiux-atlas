# Web Haptics (Vibration API) / 触觉反馈 Vibration

- 页面 / Page: /uiux-atlas/motion/haptics-web/
- English page: /uiux-atlas/en/motion/haptics-web/
- 本页 / This file: /uiux-atlas/motion/haptics-web/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 振动反馈 · navigator.vibrate · haptics · Vibration API
- 简介 / Tagline: navigator.vibrate(pattern) 是 Web 唯一的触觉通道:毫秒数或「振动/暂停交替」数组,0/空数组取消;需 sticky user activation,非 Baseline(iOS Safari 无效);段数语义可对齐 HIG 三类预设(Selection 单脉冲 / Success 两段 / Error 四段),但 ms 数值官方未给。
- Tagline (EN): navigator.vibrate(pattern) is the web's only haptic channel: a millisecond count or a vibrate/pause alternation array, canceled by 0 or an empty array; it needs sticky user activation and is not Baseline (iOS Safari: no-op). Pulse-count semantics can mirror HIG's three preset families (Selection single pulse / Success two pulses / Error four pulses), but the ms values are officially unspecified.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| pulses | enum: 1 · 2 · 4 | 2 |
| on | number · ms | 100ms |
| off | number · ms | 60ms |

## 适用场景 / When to use

- 任务结果的物理确认:成功两段脉冲、失败四段——与视觉 toast 同步触发(HIG Notification 语义) / Physical confirmation of task results: two pulses for success, four for failure — fired in sync with the visual toast (HIG notification semantics)
- 取值变化的短促确认:picker/slider/分段控件单脉冲(HIG Selection 语义) / Short confirmation on value changes: a single pulse for pickers/sliders/segmented controls (HIG selection semantics)
- 物理隐喻:视图卡入位、重物相撞——Impact 五档(light/medium/heavy/rigid/soft) / Physical metaphors: a view snapping into place, heavy objects colliding — impact in five grades (light/medium/heavy/rigid/soft)

## 何时不用 / When not to use

- 偶发之外的滥用——HIG 原文「勿滥用,偶发才刚刚好」;每次点击都振等于没有触觉 / Anything beyond occasional use — HIG's own words: sparingly, or it stops registering; vibrating on every tap erases haptics altogether
- 把触觉当关键信息的唯一渠道——HIG:必须可关闭、与视觉/听觉强度匹配 / Making haptics the sole carrier of key information — HIG: must be disableable and matched to visual/audio intensity
- 指望 iOS Safari 用户收到振动——API 在该平台无效(MDN),别把功能押在它上面 / Expecting iOS Safari users to feel anything — the API is a no-op there (MDN); never bet functionality on it
- 相机/陀螺仪/麦克风工作时段叠加振动——HIG 提示振动可能干扰这些传感器 / Stacking vibration while camera/gyroscope/microphone are active — HIG notes vibration can interfere with those sensors

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate
- https://developer.apple.com/design/human-interface-guidelines/playing-haptics.md
