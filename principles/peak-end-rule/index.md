# Peak-End Rule / 峰终定律

- 页面 / Page: /uiux-atlas/principles/peak-end-rule/
- English page: /uiux-atlas/en/principles/peak-end-rule/
- 本页 / This file: /uiux-atlas/principles/peak-end-rule/index.md
- 分类 / Category: principles 交互法则 / Principles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 峰终法则 · Peak-End
- 简介 / Tagline: 人对一段体验的记忆主要由「峰值时刻」与「结尾感受」决定,而非全程平均。重点设计强度最高与收尾的时刻;负面峰值要专门消除。
- Tagline (EN): People judge an experience by its peak moment and its ending, not the average. Design the highest-intensity and closing moments; eliminate negative peaks deliberately.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| peak | number · 级 | 8级 |
| ending | number · 级 | 2级 |
| preset | enum: custom · smooth · finale · cliff | cliff |

## 适用场景 / When to use

- 表单提交成功页、任务完成态——值得单独打磨的「终」 / Form success pages and completion states — the 'end' deserves its own craft
- 在最有价值的时刻投放惊喜(Mailchimp 发送成功动画,07§25) / Surprise at the most valuable moment (Mailchimp's send-success animation, 07 §25)
- 消除负面峰值:等待、报错、排队处专门做时间感知设计(Uber 案例,07§25) / Kill negative peaks: waiting, errors, queues deserve time-perception design (the Uber case, 07 §25)

## 何时不用 / When not to use

- 把资源平均撒在全程,峰值与收尾反而潦草 / Spreading resources evenly while the peak and the ending stay sloppy
- 在收尾插入打断(强制问卷、广告)制造负面终值 / Interrupting the ending (forced surveys, ads) and manufacturing a negative end

## 来源 / Sources

- https://lawsofux.com/peak-end-rule/
