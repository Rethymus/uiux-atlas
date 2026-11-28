# Breathing Glow / 呼吸光晕

- 页面 / Page: /uiux-atlas/materials/breathing-glow/
- English page: /uiux-atlas/en/materials/breathing-glow/
- 本页 / This file: /uiux-atlas/materials/breathing-glow/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 1/3
- 别名 / Aliases: 呼吸光晕 · 呼吸灯 · Breathing Glow · Pulsing Halo
- 简介 / Tagline: 环境呼吸辉光动画:柔和光斑以 2–6s 周期在 alpha/blur 上往复,用于在线状态、通知点、品牌氛围。铁律:只动 box-shadow 的 alpha/blur,不动 scale/translate。
- Tagline (EN): An ambient breathing-glow animation: a soft halo oscillates its alpha/blur on a 2–6s cycle, for online status, notification dots and brand mood. Iron rule: animate only box-shadow's alpha/blur — never scale/translate.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| period | number · s | 3.2s |
| amplitude | number · % | 55% |
| glowColor | color · hex | #6EE7B7 |

## 适用场景 / When to use

- 在线状态点、录音/直播状态指示:光斑往复=「活着」(通用模式;调研 17 §8.6,逐站点核验未做如实标注) / Online status dots, recording/live indicators: an oscillating halo = 'alive' (common pattern; research 17 §8.6, per-site verification not performed — stated honestly)
- 通知点/未读徽章的低刺激注意引导:比抖动/弹跳安静一个量级 / Notification dots / unread badges as low-stimulus attention guidance: an order of magnitude calmer than shaking/bouncing
- 深色场景的品牌氛围光斑:慢周期(4–6s)+ 低幅度 / Brand mood halos in dark scenes: slow period (4–6s) + low amplitude

## 何时不用 / When not to use

- 用 scale/translate 实现「呼吸」——MDN 点名的前庭触发源,直接违反本材质铁律(调研 17 §8.2) / Implementing the breath via scale/translate — MDN's named vestibular triggers, a direct violation of this material's iron rule (research 17 §8.2)
- 幅度超 .6 的强闪烁:光敏不适风险,且已不是「呼吸」而是「闪烁」 / Strong flicker above .6 amplitude: photosensitivity risk, and it is no longer breathing — it is flickering
- 正文阅读区的常驻呼吸:任何常驻动画都在偷走阅读注意力 / Resident breathing over body-reading areas: any resident animation steals reading attention

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
