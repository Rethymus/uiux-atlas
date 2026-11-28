# Watermark / 水印

- 页面 / Page: /uiux-atlas/components/watermark/
- English page: /uiux-atlas/en/components/watermark/
- 本页 / This file: /uiux-atlas/components/watermark/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 水印 · Watermark · 平铺水印 · 防泄露水印
- 简介 / Tagline: 叠在内容之上的半透明平铺文字层:低透明度、轻微负角度、按 gap 重复铺满,用于防泄露威慑与归属溯源,而不妨碍阅读。
- Tagline (EN): A translucent tiled text layer over content: low opacity, a slight negative angle, repeated at a gap — a deterrent and provenance trail that never obstructs reading.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| content | enum: atlas · internal · user | atlas |
| rotate | number · deg | -22deg |
| opacity | number | 0.15 |
| gap | dimension · px | 100px |

## 适用场景 / When to use

- 企业内部系统/管理后台的内容区防泄露——常见『访客姓名 + 工号 + 时间』标识档 / Leak deterrence on internal systems/admin consoles — the typical 'visitor name + ID + time' identity tier
- 在线文档/知识库的只读分享视图,标注归属与访问者,截图外传可溯源 / Read-only sharing views of docs/wikis — mark ownership and the visitor so leaked screenshots are traceable
- 图库/素材站的付费预览图防盗用(logo 平铺,密度通常高于文档场景) / Paid preview images on stock-asset sites (tiled logo, usually denser than document scenarios)
- 证书/凭据/报告类页面的归属标识(产品名档) / Ownership marks on certificates/credentials/reports (the product-name tier)

## 何时不用 / When not to use

- 正文密集阅读区叠加高透明度水印——正文对比度被稀释,可读性崩坏 / Dense reading areas under a heavy watermark — body contrast is diluted and readability collapses
- 用水印替代权限控制——水印是威慑与溯源手段,不是访问控制 / Using a watermark in place of access control — watermarks deter and trace, they do not authorize
- 水印层拦截交互——必须 pointer-events:none,不得遮挡点击、选择与焦点 / Letting the watermark layer intercept input — it must be pointer-events:none and never block clicks, selection or focus
- 大面积 canvas 高频重绘——每次参数变化都重绘编码,代价集中在主线程 / Frequent canvas redraws over large areas — every change re-rasterizes and re-encodes on the main thread

## 来源 / Sources

- https://ant.design/components/watermark-cn
- https://github.com/Tencent/tdesign-common/blob/develop/style/web/theme/_light.less
