# WCAG Quick Checklist / WCAG 快速清单

- 页面 / Page: /uiux-atlas/principles/wcag-checklist/
- English page: /uiux-atlas/en/principles/wcag-checklist/
- 本页 / This file: /uiux-atlas/principles/wcag-checklist/index.md
- 分类 / Category: principles 交互法则 / Principles
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: WCAG 2 清单 · 无障碍检查清单 · POUR
- 简介 / Tagline: 按 POUR 四原则(可感知/可操作/可理解/健壮)组织的 WCAG 2.2 速查清单:交付前按一致性等级(A/AA/AAA)逐条核对。
- Tagline (EN): A WCAG 2.2 quick checklist organized by the four POUR principles (Perceivable/Operable/Understandable/Robust): audit item by item at your conformance level (A/AA/AAA) before shipping.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| level | enum: A · AA · AAA | AA |

## 适用场景 / When to use

- 交付前走查:按所选等级逐条核对并记录证据 / Pre-ship walkthrough: audit per item at your level and record evidence
- 新组件评审:对照 SC 2.1.1/2.1.2/4.1.2 先问键盘与语义 / New-widget review: ask keyboard and semantics first against SC 2.1.1/2.1.2/4.1.2
- 写验收标准:把「4.5:1 / 焦点可见 / Esc 释放」写进 DoD / Writing acceptance criteria: put '4.5:1 / visible focus / Esc release' into the DoD

## 何时不用 / When not to use

- 把「AAA」当成必须全达标的目标——WCAG 官方明确 AAA 不是全站要求 / Treating AAA as a must-meet-everywhere goal — WCAG officially states AAA is not required site-wide
- 只在上线前跑一次自动化就宣布合规(自动化查不全) / One automated scan before launch declared as compliance (automation can't catch everything)

## 来源 / Sources

- https://www.w3.org/WAI/WCAG22/quickref/
- https://webaim.org/standards/wcag/checklist
