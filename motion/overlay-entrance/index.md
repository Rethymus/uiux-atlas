# Overlay Entrance / 浮层入场

- 页面 / Page: /uiux-atlas/motion/overlay-entrance/
- English page: /uiux-atlas/en/motion/overlay-entrance/
- 本页 / This file: /uiux-atlas/motion/overlay-entrance/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 弹层入场 · zoom-in-95 · popover animation · dialog entrance
- 简介 / Tagline: 浮层从触发钮弹入的事实标准:初态 scale 0.95 + opacity 0(+ 方向性位移 8px),200ms 到位,transform-origin 交给锚点方向;关闭永远比打开快。
- Tagline (EN): The de-facto overlay entrance: initial scale 0.95 + opacity 0 (+ an 8px directional shift), settling in 200ms with transform-origin from the anchor side; closing is always quicker than opening.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| initialScale | number | 0.95 |
| shiftY | dimension · px | 8px |
| inDuration | dimension · ms | 200ms |
| outDuration | dimension · ms | 150ms |
| curve | enum: standard · overshoot · arco | standard |

## 适用场景 / When to use

- tooltip/popover/menu:zoom-95 + fade 200ms + 锚点侧 8px 位移 + 锚点方向 origin——radix 事实标准全套(调研 10§3.1/巧思 5) / tooltip/popover/menu: zoom-95 + fade 200ms + an 8px anchor-side shift + anchor-direction origin — the full radix fact standard (research 10 §3.1, craft #5)
- 模态对话框:同款入场,配 overlay 遮罩 fade;关闭走更快的退场(150~300ms) / Modal dialogs: the same entrance with a fading scrim; close on a quicker exit (150–300ms)
- 需要『弹』的轻浮层(菜单气泡、toast 同族):入场换过冲 bezier(.21,1.02,.73,1) 或真弹簧(bounce 0.2) / Light overlays that should 'pop' (menu bubbles, toast kin): swap the entrance to the overshoot bezier(.21,1.02,.73,1) or a true spring (bounce 0.2)
- sheet/抽屉:入 500ms、出 300ms 的官方不对称档(进慢出快,调研 10§3.1) / Sheets/drawers: the official 500ms-in / 300ms-out asymmetry (slow in, quick out, research 10 §3.1)

## 何时不用 / When not to use

- transform-origin 恒为屏幕中心——缩放会『从屏幕中心长大』,与触发钮脱钩;origin 必须交给锚点方向(调研 10 巧思 5) / Leaving transform-origin at screen center — the overlay 'grows from the middle of the screen', decoupled from its trigger; the origin must come from the anchor side (research 10 craft #5)
- 入场比退场还慢——关闭永远比打开果断,用户在等的是『离开』(shadcn Sheet 500/300 与 M3 enter>exit 双源一致) / A slower entrance than exit — closing must be decisive; what users wait for is 'gone' (shadcn Sheet 500/300 and M3 enter>exit agree)
- 大位移入场(>16px)或 initialScale ≤0.85——位移过冲视觉噪声,模态场景尤其闪 / Large entrance travel (>16px) or initialScale ≤0.85 — travel noise dominates, modals flicker especially
- 只做入场不做退场编排——AnimatePresence/animationend 未处理时关闭会闪跳或残留 DOM / Entrance without exit orchestration — without AnimatePresence/animationend handling, closing flashes or leaves stale DOM

## 来源 / Sources

- https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/dialog.tsx
- https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/popover.tsx
- https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/sheet.tsx
- https://github.com/timolins/react-hot-toast/blob/main/src/components/toast-bar.tsx
- https://github.com/arco-design/arco-design/blob/main/components/style/theme/default.less
- https://motion.dev/docs/react-animation
