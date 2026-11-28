# Chromatic Edge / 玻璃色散边

- 页面 / Page: /uiux-atlas/materials/chromatic-edge/
- English page: /uiux-atlas/en/materials/chromatic-edge/
- 本页 / This file: /uiux-atlas/materials/chromatic-edge/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 玻璃色散边 · 色散边 · 色差边 · Chromatic Aberration Edge
- 简介 / Tagline: 边缘的 RGB 分离/色差:真实玻璃对不同波长折射率不同,边亮缘处红蓝光错位。Web 两条实现路线:SVG 滤镜位移(真位移,仅 Chromium)与双层复制 + 色彩偏移(假位移,全浏览器)。
- Tagline (EN): RGB separation / chromatic aberration at the edge: real glass refracts wavelengths differently, so red and blue misalign at bright rims. Two web routes: SVG filter displacement (true displacement, Chromium only) and twin-layer copy + color shift (faux displacement, all browsers).

## 参数 / Parameters

| name | type | default |
|---|---|---|
| dispersion | number · px | 2px |
| hueAngle | number · deg | 28deg |
| intensity | number · % | 35% |

## 适用场景 / When to use

- 高折射玻璃拟真:强透镜感面板的边缘点睛(hyalite demo 的 SDF 透镜 + per-channel 色散,核验) / High-refraction glass realism: the finishing touch on strongly lensed panels (hyalite demo's SDF lens + per-channel dispersion, verified)
- 科技感品牌强调:边缘 1–2px 的色差暗示「光学镜头」而非「贴图」 / Tech-brand accents: a 1–2px edge aberration hints at optics, not textures
- Chromium-only 的产品内嵌页(如 Electron 壳)可上路线 A;开放 web 一律路线 B / Chromium-only embedded surfaces (e.g. Electron shells) may take route A; the open web always gets route B

## 何时不用 / When not to use

- 正文与数据边缘:色差降低边缘锐度感知,密集文本上等于自带模糊 / Body copy and data edges: aberration lowers perceived edge sharpness — self-inflicted blur on dense text
- 低饱和底材:白/灰色相错开几乎不可见(saturate(3) 也救不了无色相的底) / Low-chroma substrates: white/gray hues barely separate — saturate(3) cannot rescue a hueless base
- 依赖 CSS.supports 特性检测启用路线 A:检测会撒谎(调研 17 §6.4)——必须用 UA 判断或直接接受降级 / Gating route A on CSS.supports: the check lies (research 17 §6.4) — use UA hints or accept the graceful downgrade

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDisplacementMap
- https://github.com/VII-Cae/hyalite--liquid-glass
- https://github.com/rdev/liquid-glass-react
- https://github.com/electrikmilk/liquid-css
- https://github.com/dpawlikowski/liquid-glass
