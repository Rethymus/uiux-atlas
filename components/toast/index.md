# Toast / 全局提示

- 页面 / Page: /uiux-atlas/components/toast/
- English page: /uiux-atlas/en/components/toast/
- 本页 / This file: /uiux-atlas/components/toast/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 轻提示 · Snackbar · Message · 全局轻提示
- 简介 / Tagline: 不打断操作的轻量反馈条:固定定位浮于页面之上、按时长自动消失、经 role=alert 播报,只承载非关键信息。
- Tagline (EN): Lightweight non-blocking feedback: fixed positioning over the page, auto-dismiss on a timer, announced via role=alert — for non-critical messages only.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| duration | number · ms | 3000ms |
| placement | enum: top-left · top-center · top-right · bottom-left · bottom-center · bottom-right | top-center |
| maxCount | number | 3 |
| stiffness | number | 100 |
| damping | number | 10 |

## 适用场景 / When to use

- 保存成功、复制成功等非关键过程反馈(不打断操作) / Non-critical process feedback like 'saved' or 'copied' (non-blocking)
- 带撤销动作的轻反馈(Gmail 式『已发送+撤销』) / Light feedback with an undo action (Gmail-style 'Sent + Undo')
- 批量操作结果汇总(『已归档 12 项』) / Batch result summaries ('12 items archived')

## 何时不用 / When not to use

- 关键/必须处理的信息——走 Dialog(alertdialog)或持久 banner(APG:自动消失太快违反 WCAG 2.2.3) / Critical, must-act messages — use Dialog (alertdialog) or a persistent banner (APG: too-fast auto-dismiss violates WCAG 2.2.3)
- 错误表单校验——错误要紧贴字段持久呈现(NN/g:勿用浮层报错) / Form validation errors — keep errors persistent next to the field (NN/g: no floating-layer-only errors)
- 长时间进度(>10s)——改用进度条 + 可中断途径(NN/g 三限) / Long progress (>10s) — use a progress bar with an interrupt path (NN/g response-time limits)
- 大量堆叠刷屏——MUI 明确不鼓励堆叠多条 Snackbar / Stacking floods — MUI explicitly discourages stacking multiple Snackbars

## 来源 / Sources

- https://ant.design/components/message
- https://mui.com/material-ui/react-snackbar/
- https://www.w3.org/WAI/ARIA/apg/patterns/alert/
- https://github.com/timolins/react-hot-toast/blob/main/src/components/toast-bar.tsx
- https://github.com/emilkowalski/sonner/blob/main/src/styles.css
- https://github.com/motiondivision/motion/blob/main/packages/motion-dom/src/animation/generators/spring.ts
