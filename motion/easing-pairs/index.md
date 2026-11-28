# Easing-Duration Pairs / 缓动-时长配对

- 页面 / Page: /uiux-atlas/motion/easing-pairs/
- English page: /uiux-atlas/en/motion/easing-pairs/
- 本页 / This file: /uiux-atlas/motion/easing-pairs/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Material 3 / Material 3
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 官方配对表 · easing and duration pairing · M3 emphasized/standard
- 简介 / Tagline: M3 官方六组缓动-时长配对:Emphasized 500ms(屏内起止)/ Emph-decel 400ms(进入)/ Emph-accel 200ms(永久退出)/ Standard 300ms(屏内起止)/ Std-decel 250ms(进入)/ Std-accel 200ms(退出),按过场类型直接查表选型。
- Tagline (EN): M3's six official easing-duration pairs: Emphasized 500ms (both ends on-screen) / Emph-decel 400ms (enter) / Emph-accel 200ms (permanent exit) / Standard 300ms (both ends on-screen) / Std-decel 250ms (enter) / Std-accel 200ms (exit) — a lookup table keyed by transition type.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| pair | enum: emphasized-500 · emph-decel-400 · emph-accel-200 · standard-300 · std-decel-250 · std-accel-200 | emphasized-500 |
| travel | dimension · px | 120px |

## 适用场景 / When to use

- 进入屏幕的元素:Decelerate 族(峰值速度起、缓停)——Std-decel 250ms 小件 / Emph-decel 400ms 大件 / Elements entering the screen: the Decelerate family (peak speed early, gentle stop) — Std-decel 250ms for small items / Emph-decel 400ms for large
- 永久退出屏幕的元素:Accelerate 族(静止起、峰值速度止)200ms——官方语义「暗示不可找回」 / Elements permanently leaving the screen: the Accelerate family (rest to peak speed) at 200ms — officially "signals it cannot be recalled"
- 屏内起止的转场:大面积 Emphasized 500ms、小面积 Standard 300ms / Transitions with both ends on-screen: Emphasized 500ms for large areas, Standard 300ms for small
- 临时退出(drawer/sheet 停在屏缘,暗示可召回):官方指定 Emphasized / Temporary exits (drawer/sheet parked at the screen edge, recallable): officially Emphasized

## 何时不用 / When not to use

- 永久退出误用 Decelerate——缓停的收尾暗示「还会回来」,与「已删除」矛盾 / Decelerate on permanent exits — the gentle stop implies "it will come back", contradicting deletion
- 进入误用 Accelerate——从静止加速进入让新内容显得被甩进来,且收尾生硬 / Accelerate on entrances — accelerating in from rest makes new content look flung in with a harsh landing
- 把 Emphasized 硬凑成单段贝塞尔还声称「官方曲线」——官方明确标注 CSS 无等价,只能 Standard 兜底或多段逼近 / Faking Emphasized with a single cubic-bezier while claiming it is "the official curve" — officially N/A in CSS; only Standard fallback or multi-segment approximation
- 高频控件叠加 500ms 大曲线——HIG:高频交互避免加动效(调研 04§1.6) / Stacking a 500ms curve on high-frequency controls — HIG: avoid motion on frequent interactions (research 04 §1.6)

## 来源 / Sources

- https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration
- https://m3.material.io/styles/motion/easing-and-duration/tokens-specs
