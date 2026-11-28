# Easing Math / 缓动函数数学

- 页面 / Page: /uiux-atlas/motion/easing-math/
- English page: /uiux-atlas/en/motion/easing-math/
- 本页 / This file: /uiux-atlas/motion/easing-math/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: cubic bezier solver · Newton iteration · linear() sampling · parametric curve
- 简介 / Tagline: 缓动曲线的求解数学:cubic-bezier 是参数化三次曲线(浏览器用牛顿迭代由 x 反解 t),linear() 把曲线采样成折线数据(先钳制、再两点一线)——demo 画出曲线、迭代次数与采样误差。
- Tagline (EN): The math behind easing curves: cubic-bezier is a parametric cubic (browsers Newton-solve t from x), while linear() samples the curve into polyline data (clamp first, then two-point lines) — the demo plots the curve, iteration counts and sampling error.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| curve | cubicBezier | cubic-bezier(0, 0, 0.58, 1) |
| segments | number | 6 |
| mode | enum: bezier · linear | bezier |

## 适用场景 / When to use

- 缓动曲线采样编译:把任意 bezier/弹簧采样成 linear() 关键帧数组(linear-easing 的上游数学) / Easing sampling compilers: turn any bezier/spring into a linear() keyframe array (the math upstream of linear-easing)
- 自研动效引擎的进度求值:给定真实流逝时间,牛顿迭代反解曲线参数 / Progress evaluation in in-house engines: Newton-solve the curve parameter from real elapsed time
- 设计工具的曲线编辑器:拖控制点实时重绘 + 求解预览 / Curve editors in design tools: drag control points with live re-plotting and solve preview
- 教学与评审:展示『ease-out 到底快在哪』——曲线斜率随时可见 / Teaching and review: show exactly where ease-out is fast — curve slope visible at all times

## 何时不用 / When not to use

- x 控制点越界 [0,1]——规范直接判非法(CSS 校验拒绝该声明) / x control points outside [0,1] — the spec rules them invalid outright (CSS rejects the declaration)
- 用时间均匀采样参数 t 编译 linear()——应采样 (x(t),y(t)) 二元组,否则时间轴错位 / Compiling linear() by sampling parameter t uniformly in time — sample the (x(t),y(t)) pair, or the time axis skews
- 低段数(2–3)硬拟合带过冲的曲线——回弹形状直接丢失;过冲至少 6 段起 / Force-fitting overshooting curves with 2–3 segments — the bounce shape is simply lost; overshoot needs ≥6 segments
- 把 y 越界(过冲)曲线用于滚动/拖拽位置映射——位置类插值越界会超出容器或越过目标 / Using y-overshooting curves for scroll/drag position mapping — position interpolation overshoots the container or target

## 来源 / Sources

- https://www.w3.org/TR/css-easing-2/#cubic-bezier-easing-functions
- https://www.w3.org/TR/css-easing-2/#linear-easing-function-output
- https://developer.mozilla.org/en-US/docs/Web/CSS/easing_function/linear
