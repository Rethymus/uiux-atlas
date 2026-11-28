# Container Queries / 容器查询

- 页面 / Page: /uiux-atlas/layout/container-queries/
- English page: /uiux-atlas/en/layout/container-queries/
- 本页 / This file: /uiux-atlas/layout/container-queries/index.md
- 分类 / Category: layout 布局与响应式 / Layout
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 容器查询 · @container · 组件级响应式
- 简介 / Tagline: 组件按『自己容器的宽度』而非视口响应:@container 断点重排卡片,容器单位 cqw/cqi 让内部尺寸跟随宿主伸缩。
- Tagline (EN): Components respond to their container's width, not the viewport: @container breakpoints re-flow cards, and container units (cqw/cqi) let inner sizes track the host.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| width | number · px | 400px |
| breakpoint | number · px | 320px |

## 适用场景 / When to use

- 卡片组件同时出现在侧栏、主栏与弹窗——按宿主宽度各自成形,一份组件三种形态 / A card living in sidebars, main columns and dialogs — one component, three shapes by host width
- 设计系统组件:表单行、按钮组、媒体对象在窄容器内折叠为纵排 / Design-system components: form rows, button groups and media objects collapsing to stacked in narrow hosts
- 标题字号用 cqi 随容器伸缩(clamp 包一层下限),替代视口级流式字阶的局部版本 / Headlines sizing in cqi with a clamp floor — a container-local alternative to viewport fluid type
- 从『页面级断点』迁移到『组件级断点』的响应式架构(调研 05§11 演进链条第三段) / Migrating from page-level to component-level breakpoints (the third stage of research 05 §11's evolution chain)

## 何时不用 / When not to use

- 把整个页面当容器宿主——页面级响应仍归媒体查询,容器查询管组件 / Making the whole page a container — page-level response belongs to media queries; container queries manage components
- 常规组件用 container-type: size——它让容器脱离内容尺寸参与布局,易造成循环依赖;默认用 inline-size / container-type: size on ordinary components — it detaches the container from content sizing and risks circular dependencies; prefer inline-size
- 断点堆得和视口断点一样多——容器查询的意义是减少断点,按内容需要设一两个即可 / Stacking as many container breakpoints as viewport breakpoints — the point is fewer breakpoints; one or two content-driven ones suffice
- 查询条件里写自定义属性——容器查询条件必须是字面量,demo 因此用 JS 重生成规则 / Custom properties inside query conditions — conditions must be literals; the demo regenerates rules via JS for that reason

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/container-type
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries
