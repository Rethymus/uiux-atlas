# Scroll Snap / 滚动吸附

- 页面 / Page: /uiux-atlas/motion/scroll-snap/
- English page: /uiux-atlas/en/motion/scroll-snap/
- 本页 / This file: /uiux-atlas/motion/scroll-snap/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 滚动吸附 · scroll snap · CSS Scroll Snap · 吸附滚动
- 简介 / Tagline: 用「吸附位置」接管滚动停靠:容器 scroll-snap-type 定轴与强度,子项 scroll-snap-align 定对齐点,scroll-padding/scroll-margin 调整 snapport 与 snap area,把轮播/分页交还给原生滚动。
- Tagline (EN): Let snap positions take over scrolling: the container's scroll-snap-type picks axis and strictness, items' scroll-snap-align picks the alignment, scroll-padding/scroll-margin shape the snapport and snap areas — carousels and pagination handed back to native scrolling.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| strictness | enum: mandatory · proximity | mandatory |
| align | enum: start · center · end | start |
| stop | enum: always · normal | always |
| padding | dimension · px | 16px |

## 适用场景 / When to use

- 横向卡片轮播/图库——「每次只翻一张」配 scroll-snap-stop: always(补研 12§4) / Horizontal card carousels/galleries — "one card per swipe" with scroll-snap-stop: always (12 §4)
- 整页竖向分页叙事(full-page 分节),内容量已知时用 mandatory / Full-page vertical section storytelling, with mandatory when the visible content amount is known
- 吸顶导航下的锚点定位——scroll-padding 给 sticky 头部留位(补研 12§4) / Anchor positioning under sticky headers — scroll-padding reserves the header's space (12 §4)

## 何时不用 / When not to use

- 内容超高/超宽的滚动区配 mandatory——MDN:用户可能永远看不到某段内容,一般交互用 proximity(调研 10§8.2) / mandatory on scrollers with overflowing content — MDN: some content may become unreachable; proximity for general use (research 10 §8.2)
- 需要物理惯性长滑行的信息流——吸附会把每次滑动拽回停靠点,打断浏览节奏 / Feeds that want long inertial glides — snapping yanks every swipe back to a stop and breaks browsing rhythm
- 把吸附当唯一的空间线索——吸附点不带语义,分页进度仍需视觉指示或读屏文本 / Treating snapping as the only spatial cue — snap points carry no semantics; keep visual progress or SR text for pagination

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap/Basic_concepts
