# Upload / 上传三态

- 页面 / Page: /uiux-atlas/components/upload-states/
- English page: /uiux-atlas/en/components/upload-states/
- 本页 / This file: /uiux-atlas/components/upload-states/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 文件上传 · File Uploader · Dropzone
- 简介 / Tagline: 点击或拖拽把文件交给系统:上传中带百分比进度、成功打勾、失败给修复指引——每个文件在列表里走完自己的状态机。
- Tagline (EN): Hand files to the system by click or drag: uploading shows a percent bar, success ticks, failure gives repair guidance — each file walks its own state machine in the list.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| variant | enum: dropzone · button | dropzone |
| simulate | enum: success · fail | success |
| maxCount | number | 3 |

## 适用场景 / When to use

- 头像/封面等单文件上传:maxCount=1,新选即替换(antd maxCount=1 语义,补研 12§15) / Single-file uploads like avatars/covers: maxCount=1, a new pick replaces (antd maxCount=1 semantics, 12 §15)
- 附件/凭证批量上传:列表逐文件展示状态,失败可单独重试 / Batch attachment/proof uploads: per-file status rows, individual retry on failure
- 拖拽为主的资料导入:从桌面/邮件客户端整批拖入 / Drag-first data imports: whole batches dragged from desktop/mail clients
- 需要即时校验的导入:beforeUpload 式前置校验(格式/大小)不合格即拦截并给出修复指引(Carbon 错误态要求,调研 07§14) / Imports needing upfront validation: beforeUpload-style checks (format/size) that block and guide (Carbon error-state requirement, research 07 §14)

## 何时不用 / When not to use

- 模态框里上传多个文件——列表纵向堆叠放不下(Carbon 明确警告,调研 07§14) / Uploading multiple files inside a modal — the stacked list won't fit (explicit Carbon warning, research 07 §14)
- 上传无任何进度反馈的静默等待——任何动作发起都要立即给视觉反馈(NN/g,调研 07§19) / Silent waits with no progress feedback — every initiated action needs immediate visual feedback (NN/g, research 07 §19)
- 隐藏文件类型/大小限制——描述必须写明大小/格式限制(Carbon 内容规范,调研 07§14) / Hiding type/size limits — the description must state size/format limits (Carbon content spec, research 07 §14)
- 失败只显示红叉不给修复指引——错误态要给清晰修复指引(Carbon,调研 07§14) / A bare red cross on failure — error states demand clear repair guidance (Carbon, research 07 §14)

## 来源 / Sources

- https://carbondesignsystem.com/components/file-uploader/usage/
- https://ant.design/components/upload
- https://www.nngroup.com/articles/progress-indicators/
