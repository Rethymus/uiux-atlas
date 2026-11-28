# Glass Text / 折射文字

- 页面 / Page: /uiux-atlas/materials/glass-text/
- English page: /uiux-atlas/en/materials/glass-text/
- 本页 / This file: /uiux-atlas/materials/glass-text/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 折射文字 · 玻璃文字 · 文字透镜 · 文字色散 · Glass Text Effect
- 简介 / Tagline: 文字级的透镜变形与边缘色散:SVG feDisplacementMap 位移滤镜天然适用于文本,把玻璃色散边从容器缩到字形上——字形边缘出现轻微扭曲与红蓝错位,像隔着一块小透镜看字。
- Tagline (EN): Lens distortion and edge dispersion at the glyph level: the SVG feDisplacementMap filter applies naturally to text, shrinking the container-level chromatic edge down onto letterforms — slight warping and red/blue misalignment at glyph edges, as if reading through a small lens.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| dispersion | number · px | 2px |
| lensScale | number | 4 |
| hueAngle | number · deg | 28deg |

## 适用场景 / When to use

- 品牌标语 / hero 大字号标题:字形面积大,色散读得出来且不伤小字辨识 / Brand taglines / large hero headlines: big glyph area makes dispersion legible without hurting small-text recognition
- 玻璃主题站点与 liquid-glass 面板的配套字形点睛(容器级透镜的文字对应物) / Glass-themed sites: the typographic companion to liquid-glass panels (the text-level counterpart of container lensing)
- 科技 / 光学主题的海报、封面与 404 页的整句标语 / Tech / optics themed posters, covers, and full-sentence taglines on 404 pages

## 何时不用 / When not to use

- 正文与小号文字:位移直接吃掉笔画,可读性崩坏(笔画越细越不可位移) / Body copy and small text: displacement eats strokes outright — the thinner the stroke, the less it tolerates offset
- 用 CSS.supports 检测启用路线 A:检测会撒谎(调研 17 §6.4【S】),必须接受静默降级 / Gating route A on CSS.supports: the check lies (research 17 §6.4 [S]) — accept the silent downgrade instead
- 笔画密集的表意文字长句(汉字/假名长文):逐字位移叠加后整行发虚 / Long strokes-dense CJK passages: per-glyph displacement stacks up and blurs the whole line

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDisplacementMap
- https://github.com/VII-Cae/hyalite--liquid-glass
- https://github.com/rdev/liquid-glass-react
