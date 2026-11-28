# Avatar / 头像

- 页面 / Page: /uiux-atlas/components/avatar/
- English page: /uiux-atlas/en/components/avatar/
- 本页 / This file: /uiux-atlas/components/avatar/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 用户头像 · 头像组 · Avatar Group
- 简介 / Tagline: 以小尺寸图像或字符代表人:圆/方两形,组内以负 margin 重叠、溢出折叠为 +N——尺寸与重叠宽度都是 token 化的,不是随手写死的。
- Tagline (EN): A small image or glyph standing in for a person: circle or square, overlapping in a group via negative margins with the overflow folded into +N — size and overlap are tokenized, not eyeballed.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| size | dimension · px | 32px |
| shape | enum: circle · square | circle |
| groupCount | number | 4 |

## 适用场景 / When to use

- 会话/评论/成员列表中标识「谁在说话」——尺寸小(24-32px),靠相邻文字补充身份 / Identifying 'who is speaking' in threads/comments/member lists — small (24–32px), identity carried by adjacent text
- 协作者组:文档/项目页顶部重叠排列 + 溢出 +N(antd Group max 语义) / Collaborator stacks: overlapping avatars with a +N overflow on doc/project pages (antd Group max semantics)
- 个人设置、账户切换等需要「人」的心理暗示的位置 / Places that need the psychological cue of a person: profile settings, account switchers

## 何时不用 / When not to use

- 把头像当装饰图标用——它会暗示一个真实的人;装饰位请用 icon / Using avatars as decorative icons — they imply a real person; use icons for decoration
- 小尺寸(<24px)硬塞字符或图片——字符不可读、图片不可辨 / Cramming glyphs or photos below 24px — glyphs stop being readable and photos stop being recognizable
- 重叠组里塞大量头像却不折叠——超过 4-5 个必须折叠 +N,否则辨识度为零 / Piling many avatars into an overlap without folding — past 4–5 they must fold into +N or identity is lost

## 来源 / Sources

- https://ant.design/components/avatar-cn
- https://github.com/ant-design/ant-design/blob/6.7.1/components/avatar/style/index.ts
