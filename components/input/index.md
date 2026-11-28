# Input / 输入框

- 页面 / Page: /uiux-atlas/components/input/
- English page: /uiux-atlas/en/components/input/
- 本页 / This file: /uiux-atlas/components/input/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 文本框 · Text Field · TextField · Textbox
- 简介 / Tagline: 单行文本输入:label + 原生 textbox,状态色边框、可清空后缀与计数提示是表单里最高频的三件套。
- Tagline (EN): Single-line text entry: a label + native textbox — status border, clearable suffix and count hint are the three highest-frequency extras in forms.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| size | enum: sm · md · lg | md |
| status | enum: default · error · warning | default |
| clearable | enum: off · on | off |
| maxLength | number | 0 |

## 适用场景 / When to use

- 表单短文本字段:登录/注册、搜索、备注一行 / Short form fields: sign-in/sign-up, search, one-line notes
- 需要即时校验反馈的字段:status 边框 + 紧贴字段的错误文案(NN/g 表单错误准则:错误信息贴近出错字段,调研 07§16) / Fields needing instant validation feedback: status border + a message right beside the field (NN/g form-error guideline: put errors next to the failing field, research 07 §16)
- 带上限的昵称/标题类输入:count.max 计数超出标红提示 / Capped nickname/title inputs: count.max shows an over-limit red counter
- 可清空的搜索框:allowClear 后缀一键回占位 / Clearable search fields: allowClear suffix resets to placeholder in one click

## 何时不用 / When not to use

- 不要在用户输入完成前报错(NN/g 准则⑦:未填完就校验是反例,调研 07§16) / Do not validate before the user finishes typing (NN/g guideline ⑦: premature validation is the classic anti-pattern, research 07 §16)
- 不要用 tooltip 报错(准则⑨:图标不明显、用户不知道要 hover,调研 07§16) / Do not report errors via tooltip (guideline ⑨: the icon is easy to miss, users never learn to hover, research 07 §16)
- placeholder 不能替代 label——聚焦输入后 placeholder 消失,读屏与回看场景都丢失字段名 / placeholder must not replace a label — it disappears on focus, losing the field name for screen readers and for review
- 长段落用 TextArea 而非拉高单行 Input;密码字段用遮蔽输入而非明文 / Use TextArea for long passages instead of stretching a single line; use masked input for passwords, not plain text

## 来源 / Sources

- https://ant.design/components/input-cn
- https://www.w3.org/WAI/ARIA/apg/patterns/textbox/
- https://www.nngroup.com/articles/errors-forms-design-guidelines/
