# Line-height Rhythm / 行高韵律公式

- 页面 / Page: /uiux-atlas/type/rhythm-formula/
- English page: /uiux-atlas/en/type/rhythm-formula/
- 本页 / This file: /uiux-atlas/type/rhythm-formula/index.md
- 分类 / Category: type 排版 / Typography
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: baseline rhythm · line-height snapping · vertical rhythm · CLREQ line spacing
- 简介 / Tagline: 行高 × 字号 = 基线倍数:先按密度算 lh = fs×m,再吸附到基线半格 lh = round(fs×m/unit)×unit——乘法管张力、加法管秩序,中西文各有硬约束。
- Tagline (EN): Line-height × font-size = baseline multiples: compute density first (lh = fs×m), then snap to the grid half-step (lh = round(fs×m/unit)×unit) — multiplication sets tension, addition sets order, with hard constraints for CJK.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| fontSize | dimension · px | 16px |
| multiplier | number | 1.5 |
| unit | enum: 4 · 8 | 4 |

## 适用场景 / When to use

- 设计系统行高 token:字号阶 × 倍率带,全部吸附到 4px 半格 / Design-system leading tokens: size scale × multiplier band, all snapped to the 4px half-step
- 中西文混排正文:守 CLREQ 下限(≥1.5×)再谈密度 / Mixed CJK/Latin body text: hold the CLREQ floor (≥1.5×) before tuning density
- 卡片/列表行高定档:行高为节奏单元,内边距取其整数倍 / Card/list line tiers: leading as the rhythm unit, paddings as integer multiples
- 长文排版:行高、段距、标题上下距同用一个节奏单元(vertical-rhythm 条目的数学内核) / Long-form layout: leading, paragraph gaps and heading margins share one rhythm unit (the math inside vertical-rhythm)

## 何时不用 / When not to use

- 行高用无单位数以外的写法跨字号复用(px 行高不能继承缩放) / Reusing px line-heights across sizes — a px leading does not scale when inherited
- 标题用正文倍率(1.5+)——大字行高比率应更小(1.2–1.4),否则标题块虚胖 / Giving headings body multipliers (1.5+) — large type wants smaller ratios (1.2–1.4) or the heading block bloats
- 吸附单位 ≥ 行高本身——8px 单位配 11px 字号会把小字推到爆 / Snapping unit ≥ the leading itself — an 8px unit on 11px type explodes small text
- 行高低于 1.5 还开注音/拼音——CLREQ 注音场景要求 ≥1.5 倍基字,低于下限标音互相碰撞 / Ruby/pinyin under 1.5 leading — CLREQ's ruby context requires ≥1.5× the base size; lower and the annotations collide

## 来源 / Sources

- https://www.w3.org/TR/clreq/#handling-interlinear-punctuation
- https://www.w3.org/TR/clreq/#choice-of-size-and-ratio-for-bopomofo-symbols
- https://developer.apple.com/design/human-interface-guidelines/typography
