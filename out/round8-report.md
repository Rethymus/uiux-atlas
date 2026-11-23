# Round 8 报告:Apple 材质层落地(spec v2.6)+ 微交互域 8 条 + 风格域 8 条

> 撰写时点:2026-11-22。撰稿人会话内实读:`uiux-atlas/docs/design-spec.md`(v2.6 §2.8 材质层章节,314–354 行等)、`out/design-study/09-apple-materials.md` 与 `10-microinteractions-code.md` 开头、`git -C uiux-atlas diff --stat HEAD`。门禁计数全部为本会话实跑输出,非引用旧档。

## 〇、变更概况(实跑 `git -C uiux-atlas diff --stat HEAD`)

15 个文件,+908 / −188 行,HEAD 仍在 `29e83ce`(V3 工作区变更**尚未提交**,`git status --porcelain` 实测 31 项)。构成:spec v2.6(+116)、`global.css`(+384)、styles 域 8 个新条目、motion 域 8 个新条目、两条既有条目升级(toast / liquid-glass)、verify 脚本期望清单 81 → 97、README 同步。

## 一、Apple 材质层落点

**审计差距(升级前)**:v2.1 时代「参考 Apple」仅有三条玻璃 token(localnav 实抓的 blur 20px / saturate 180% / 88% 单态底色,spec:160),无中性阶梯、无参数化分档;焦点环 offset 2px 为非官方值(spec:352)。落差 = 官方三态配方(09 §1.4b)未参数化、材质不可验证。

**参数表(spec §2.8:320–324,三档 × 深浅)**:

| 档 | blur | saturate | tint 深 / 浅 | 内高光 深 / 浅 | hairline | 阴影 |
|---|---|---|---|---|---|---|
| thin | 12px | 180% | `rgba(22,22,23,.55)` / `rgba(250,250,252,.6)` | 白 .08 / .3 | separator α | none |
| regular | 20px | 180% | `.8` / `.8` | .11 / .35 | separator α | `--shadow-1` |
| thick | 28px | 180% | `.88` / `.92` | .14 / .4 | separator α | `--shadow-2` |

溯源纪律:20px/180% = apple.com localnav 生产 CSS 实抓(09 §1.4a);tint 基色/α = 官方 scrim 三态(09 §1.4b 逐字);hairline = separator α 色(09 §1.4e/§2.4)。**官方未公布、如实标注 ⚠️**:iOS 四档各自模糊半径(thin/thick 取 ±8px 站点推导)、内高光强度(取 web 复刻档内三点)、按压 scale 0.96(spec:328–330, 350)。配套:Apple 中性阶梯 `--ios-*` token(spec:162)、`.material` 工具类、`@supports` 门控回退 `--mat-fallback`、backdrop-filter 不参与动画的性能红线(spec:334)。

**五面语义接入清单(spec:338–346)**:① 站点 header(sticky 带 1)= mat-regular 全套;② 过滤栏吸顶态(`.is-glass`)= regular blur × thick tint(Apple 三态公式第 2 态)+ `--shadow-2`;③ 参数面板 = mat-thick 全套(密集 mono 数值取最厚档,09 §1.2);④ 演示面板 = mat-regular;⑤ Prompt 导出框 = mat-regular。其余区域(hero/bento/卡片网格/MDX 正文)**禁用 backdrop-filter**(spec:348)。另有按压对(spec:350)与焦点环统一(2px accent + offset 1px / 容器 3px,spec:352)。

## 二、微交互域 8 条与风格域 8 条

**motion 域 11 → 19,新增 8 条**(name/nameZh 实测自各 `schema.json`;参数依据 10-microinteractions-code.md §0 速查表):

1. `press-feedback` 按压反馈对(AntD 0.2s 色彩五属性 / Arco `:active{transition:none}` 瞬时按压)
2. `slot-spring` 卡槽弹簧·竹简槽分段滑块(layoutId 跨槽 + bounce 0.2/duration 0.6,过冲≈1.5%)
3. `overlay-entrance` 浮层入场(fade + zoom 0.95→1,shadcn 200ms)
4. `shake-decay` 错误抖动·指数衰减(x(t)=A·e^(−λt)·sin(ω_d t) 本地实算)
5. `toast-spring` Toast 弹簧入场(react-hot-toast 入 0.35s / 出 0.4s 缓出)
6. `damping-craft` 阻尼感设计(ζ 第一变量;Motion 源码默认 100/10/1)
7. `smooth-craft` 丝滑工艺(只动 transform/opacity;will-change 用后即撤)
8. `scroll-overflow` 滚动溢出行为(`overscroll-behavior: contain` / snap proximity)

**styles 域 7 → 15,新增 8 条**(风格史):`flat-design` 扁平化 / `skeuomorphism` 拟物化 / `memphis-design` 孟菲斯 / `swiss-international` 瑞士国际主义 / `editorial-magazine` 杂志编辑风 / `frutiger-aero` Frutiger Aero / `y2k-retro-futurism` Y2K 复古未来主义 / `holographic-chrome` 全息铬光。两域均已并入 `verify-entries.mjs` 缺失强制校验(脚本 diff 见 `scripts/verify-entries.mjs:36-55`)。

## 三、两条既有条目升级(实测 git diff)

1. **components/toast**:参数 3 → 5(新增 `stiffness`/`damping` 面板可调弹簧入场;默认 100/10 = Motion spring.ts 源码,文档默认 1 与源码不一致、以源码为准;半隐式欧拉 + 速度接力,调参中途不归零重启);补 react-hot-toast/sonner 退场对照与两条弹簧敏感度行(zh.mdx diff 实读)。
2. **materials/liquid-glass**:新增 `refraction`(feDisplacementMap 随指针,lensing 近似;折射随宽度比例增强 = 219 [422–445s] 定性落地)与 `morph`(胶囊↔面板,320ms 曲线取 apple.com 生产 CSS)+ 触碰辉光;新增「真实产品案例」节(iOS 26 tab bar / apple.com localnav / visionOS);RM 下保留指针驱动、取消 morph 过渡(演示数值均为近似,官方未公布,mdx 内如实标注)。

## 四、门禁实测(本会话实跑,计数以实跑为准)

| 门禁 | 命令 | 结果 |
|---|---|---|
| 对比度 | `node scripts/check-theme-contrast.mjs` | 12/12 达标、0 解析错误,exit 0(深 16.45…8.71,浅 14.29…4.81) |
| 条目完整性 | `node scripts/verify-entries.mjs` | `{"expected":97,"found":97,"problems":0}` PASS |
| 构建 | `pnpm run build` | 218 页,17.03s,无报错 |
| 产物核验 | `node scripts/verify-dist.mjs` | `{"checked":218,"missing":0,"contentFails":0}` PASS |
| 类型检查 | `pnpm exec astro check` | 148 files:0 errors / 0 warnings / 1 hint(已知 `execCommand` 提示) |
| MCP 冒烟 | `node scripts/test-mcp-server.mjs` | PASS(4/4 断言) |
| Prompt 实弹 | `node scripts/verify-prompt-test.mjs` | 7/7 命中 PASS |
| Registry | `node scripts/verify-registry.mjs` | `{"expected":24,"items":24,"problems":0}` |

## 五、无法机器验证项(如实列出)

1. **材质真实感**:「像不像 Apple 玻璃」的观感与 lensing 手感无法脚本化;且关键量级官方未公布(iOS 四档 blur 半径、内高光强度、scale 0.96,spec:328–330/350 标 ⚠️),只能推导近似。
2. **丝滑/跟手感主观感受**:60fps 顺滑度、弹簧「弹不弹得舒服」需真人在真实浏览器体验;无自动化代理。
3. **真实浏览器滚动路径**:design-spec 附录(spec:661)留档——headless 会话 IntersectionObserver 回调不派发,过滤栏 `is-glass` 停靠态本次由手动置类验证,真实滚动哨兵触发路径未经自动验证;桌面 ≥900 视口 sticky 面板遮挡 Prompt 框为既有几何问题(spec:662)。

## 六、后续建议(≤3)

1. **尽快提交 V3 工作区**(31 项未提交变更,无提交号即无回滚锚点);提交后把 README 路线图「尚未提交」占位替换为真实提交号。
2. **真实浏览器人工验收一轮材质层**(深浅两主题逐面截图 + 触控按压手感),把第五节的三个不可机器验证项关闭或留档。
3. **回填 spec 开头「43 条 × 86 MDX」MVP 遗留口径**(spec:4 仍在,README 已声明不作为权威)并安排 sticky 面板遮挡 Prompt 框的布局修复;两件都是历轮已知债,趁 v2.6 刚升版处理成本最低。
