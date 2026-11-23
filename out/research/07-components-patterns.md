# 07 · 组件级设计模式与 UX 交互法则

- 调研日期：2026-11-20
- 方法：全程联网抓取一手来源（W3C APG、NN/g、Laws of UX、MDN、WebAIM、MUI、Ant Design、IBM Carbon、shadcn/ui），关键结论尽量双源交叉印证；逐条附来源 URL。
- 说明：Shopify Polaris 的组件级文档（`polaris.shopify.com/components/*`）在本日全部重定向到通用参考页（"Polaris references"），`shopify.dev/docs/api/shopify-web-components` 返回 404，**本次未能获取 Polaris 组件规范一手内容**，详见第六节。

---

## 一、组件级设计模式与状态设计

### 1. 按钮：变体与强调层级（MUI）
三档变体对应三种强调：`text`（低强调，用于对话框/卡片内次要动作）、`contained`（高强调 + 填充 + 阴影，应用内主操作）、`outlined`（中强调）。`disabled` 是一等状态；v6.4.0 起 `loading` prop 让按钮进入加载态并禁用交互；IconButton 必须提供 `aria-label`；文件上传用 `component="label"` + 视觉隐藏 `<input type="file">`；disabled 时 `pointer-events: none` 导致无法显示 not-allowed 光标，是已知限制。
来源：https://mui.com/material-ui/react-button/

### 2. 按钮：每屏一个 Primary 与危险按钮（IBM Carbon）
每个页面只应有一个 primary 按钮（页头/模态/侧栏除外）；secondary 只能与 primary 成对出现、承担否定动作（如 Cancel/Back），不可单独使用、不可用于肯定动作；tertiary/ghost 为低强调；danger 用于破坏性操作；按钮用于触发动作、链接用于导航——不要拿按钮当导航元素。整页布局 primary 靠左、向导/对话框内靠右下。
来源：https://carbondesignsystem.com/components/button/usage/

### 3. 对话框（Modal Dialog）：APG 模式
模态打开时外部内容 inert、Tab/Shift+Tab 循环困在对话框内、Escape 关闭。初始焦点默认第一个可聚焦元素，但有例外：内容含列表/表格等结构时把 `tabindex="-1"` 放到开头静态元素上；不可逆操作（删数据、付款）焦点应放在破坏性最小的动作上。关闭后焦点返回触发元素（除非触发元素已不存在或工作流指向下一步）。容器 `role="dialog"` + `aria-modal="true"` + `aria-labelledby` 指向可见标题；强烈建议提供可见的关闭按钮。
来源：https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

### 4. 抽屉（Drawer）：同上下文承载子任务
Ant Design 定位：从屏幕边缘滑入的面板，承载一组信息或动作；因为不离开当前页即可交互，"在 Form 中创建/编辑一组信息"、"子任务对 Popover 太重但仍需留在主任务上下文"、"多处以同一 Form 复用"三类场景适用。`keyboard` prop（默认 true）支持 Esc 关闭；6.2.0 起提供 `focusable` 配置焦点陷阱；多级抽屉（push）处理分支任务。
来源：https://ant.design/components/drawer

### 5. 选择器（Combobox）：四种 autocomplete 行为（APG）
Combobox = 带关联弹出层的输入控件，弹出层可为 listbox/grid/tree/dialog。两种形态：select-only（不可输入）与 editable；四种自动补全：无补全 / 列表手动选中 / 列表自动选中 / 列表+内联补全。键盘：Tab 进入、Down/Up 进出弹出层、Escape 关闭（可选清空）、Enter 接受建议；弹出层及其后代从页面 Tab 序列中排除。与 listbox 的关键差别：combobox/menubar 可在导航选项后按 Esc 恢复原值（探索不丢选择），单选 listbox 导航即改值、Esc 无撤销。
来源：https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

### 6. 开关（Switch）：on/off 语义与「标签不随状态变」铁律（APG）
Switch 仅二态 on/off；checkbox 与 toggle button 可有第三态（半选/半按）。选型依据语义：开灯用 "Lights switch on" 比 "Lights checkbox checked" 更友好，流程清单场景则相反。**关键：开关的标签在状态变化时绝不能变**（否则焦点处朗读的名称与状态错位）。键盘 Space 切换（Enter 可选）；`aria-checked` 表达状态；成组时用 `fieldset/legend` 或 `role=group` + `aria-labelledby`。
来源：https://www.w3.org/WAI/ARIA/apg/patterns/switch/

### 7. 滑块（Slider）：键盘步进与取值文本（APG）
方向键 ±1 步、Home/End 到极值、PageUp/PageDown 可选大步长；焦点落在 thumb 上。必须暴露 `aria-valuenow/valuemin/valuemax`；数值不友好时（如星期几）用 `aria-valuetext`（"Monday"）；垂直方向用 `aria-orientation`。APG 警告：触摸辅助技术对滑块手势支持不完整，上线前必须用 AT 实测。
来源：https://www.w3.org/WAI/ARIA/apg/patterns/slider/

### 8. Toast / 全局轻提示（MUI Snackbar + AntD message）
MUI：Snackbar（即 toast）用于**非关键**过程通知，固定定位 + 高 z-index、脱离文档流；与 Alert（在流内）和 Dialog（阻断、关键信息）相区分；`autoHideDuration` 要留足处理时间；无障碍要求可用 Escape 关闭；内容容器为 `role="alert"`；不推荐堆叠多条（notistack 堆叠被标注为"Material 指南不鼓励"）。AntD：message 是顶部居中、自动消失（默认 3s）、不打断操作的轻量反馈，区分 success/warning/error/loading，`pauseOnHover` 默认 true，`maxCount` 限制条数。
来源：https://mui.com/material-ui/react-snackbar/ 、https://ant.design/components/message

### 9. Alert（不中断提醒）与自动消失的风险（APG）
`role="alert"` 显示简短重要消息，动态插入时多数屏幕阅读器自动播报；**不得夺取键盘焦点**（要打断用户就改用 alertdialog）。重要告诫：避免设计成自动消失——消失太快会违反 WCAG 2.2.3；频繁打断会妨碍视觉/认知障碍用户（WCAG 2.2.4）。这为 toast 的"自动消失仅限非关键信息"提供了规范依据。
来源：https://www.w3.org/WAI/ARIA/apg/patterns/alert/

### 10. 命令面板（Command Palette）
shadcn/ui 的 Command 基于开源 cmdk 构建：`CommandDialog`（面板以对话框形式打开）+ `CommandInput`（搜索框）+ `CommandList` + `CommandEmpty`（空态文案 "No results found."）+ `CommandGroup`（分组 + heading）+ `CommandItem` + `CommandShortcut`（展示 ⌘P 式快捷键）。典型用途是 "搜索 + 快速动作"，快捷键唤起。
来源：https://ui.shadcn.com/docs/components/command

### 11. 标签页（Tabs）：自动激活 vs 手动激活（APG）
结构 `tablist/tab/tabpanel`；水平用左右方向键循环、垂直用上下；Home/End 可选。**自动激活**（焦点跟随即切换）仅在面板内容已预载、切换无明显延迟时推荐——否则自动激活会显著拖慢焦点移动，应改为手动激活（Space/Enter）。`aria-selected`、`aria-controls`、面板 `aria-labelledby`、垂直时 `aria-orientation=vertical`；面板无可聚焦元素时 `tabindex=0` 进入 Tab 序列。
来源：https://www.w3.org/WAI/ARIA/apg/patterns/tabs/

### 12. 面包屑（Breadcrumb）（APG）
面包屑 = 按层级排列的父页面链接列表，帮助用户定位；放在主内容之前的水平位置。规范：整个面包屑放在 navigation landmark 内并用 `aria-label`/`aria-labelledby` 命名；当前页链接设 `aria-current="page"`（若当前页不是链接则可选）。
来源：https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/

### 13. 数据表格（Data Table）（IBM Carbon）
用表格组织与展示数据；列头升/降序排序、行展开渐进披露、单选（radio）与多选（checkbox）行、表头全选为三态（含 indeterminate）、批量操作栏、工具栏（搜索/筛选/表格设置）、分页条。五种行高（xs 24px–xl 64px），表头/工具栏/分页/批量操作栏高度须与行高一致；行 hover 态应始终启用辅助扫读；不要把表格当 spreadsheet 替代品、不要嵌套表格。
来源：https://carbondesignsystem.com/components/data-table/usage/

### 14. 上传（File Uploader）（IBM Carbon）
两种变体：按钮触发文件选择对话框；拖放 drop zone（拖入时边框变色加粗提示激活）。上传中文件有三个状态：**loading / success / uploaded**；错误态要给清晰修复指引（单行或多行），整体性错误可用行内通知。内容规范：heading 描述上传区用途，description 说明大小/格式限制；长文件名省略号 + hover tooltip 展示全名；键盘：Space/Enter 打开选择框、关闭后焦点回到触发元素、Tab 到删除图标再 Space/Enter 删除。不要在模态里上传多个文件（列表纵向堆叠放不下）。
来源：https://carbondesignsystem.com/components/file-uploader/usage/

### 15. 表单与校验（Ant Design Form）
`rules` 声明校验规则；`validateTrigger` 默认 `onChange`，5.9.0 起支持 `validateDebounce` 防抖；`validateStatus` 显式四态 success/warning/error/validating，`hasFeedback` 显示校验图标（建议只用于 Input）；`scrollToFirstError` 提交失败自动滚到首个错误字段（5.24.0 支持同时 focus）；`validateMessages` 统一错误文案模板（支持本地化）；`dependencies` 处理字段间依赖校验。
来源：https://ant.design/components/form

### 16. 表单错误提示 10 准则（时机与位置）（NN/g）
Rachel Krause, 2019：①尽量内联校验（字段填完立即在附近提示）；②复杂字段显示成功反馈（用户名可用、密码强度条）；③错误信息紧贴出错字段（降低工作记忆负担）；④用颜色区分错误（红）/警告/成功；⑤加图标或轻微动画辅助扫读并照顾色盲；⑥模态确认框少用（打断、加重记忆负担）；⑦**不要在输入完成前校验**（BestBuy 反例：未填就报错）；⑧校验摘要不能作为唯一错误指示；⑨**不要用 tooltip 报错**（图标不明显、用户不知道要 hover）；⑩同一错误重复 3 次以上说明是设计问题——"错误不是用户的错，是设计的缺陷"。
来源：https://www.nngroup.com/articles/errors-forms-design-guidelines/

### 17. 空状态（Empty States）（IBM Carbon + Ant Design）
Carbon 把空状态分三类并配对目标：**no data**（首次使用，说明这里将有什么 + 怎么添加）、**user action**（搜索无结果、流程完成确认）、**error management**（权限/系统/配置问题，需更多细节与修复选项）。解剖：可选图片、简短标题（尽量正向表述，如 "Start by adding data assets"）、正文说明下一步、可选主操作按钮、可选次级链接。最佳实践：空状态应**替换**原元素（表格空态不应保留表头/页脚，避免读屏先读完整表才读"无内容"）；文案左对齐成块；仪表盘多个空态并存时 CTA 用 tertiary 按钮避免多个主按钮。Ant Design Empty：无数据时的友好占位 + 引导创建（如 "Create Now"），可嵌入 Table/TreeSelect 等。
来源：https://carbondesignsystem.com/patterns/empty-states-pattern/ 、https://ant.design/components/empty

### 18. 响应时间三限（0.1 / 1 / 10 秒）（NN/g）
Jakob Nielsen（1993，2014 更新）：0.1s 内 = 感觉即时、直接操纵；1s 内 = 思维流不中断（0.2–1s 需让用户感知"在忙"）；10s = 注意力极限，超过必须给 percent-done 进度条 + 可中断途径。响应时间准则 46 年未变，与实现技术无关。
来源：https://www.nngroup.com/articles/response-times-3-important-limits/

### 19. 加载态与进度指示器选择（NN/g）
Katie Sherwin, 2014：任何动作发起都要**立即**给视觉反馈（哪怕按钮变按压态）；>1s 才用进度指示。两种类型：循环动画（spinner）只用于 2–10s 的操作（<1s 用反而让人焦虑，>10s 会让人放弃）；percent-done 进度条用于 ≥10s 的操作，降低不确定感。可附文字说明等待原因（"Loading comments…"）。内布拉斯加大学实验：有进度条组满意度更高、平均愿意等待 3 倍时间。
来源：https://www.nngroup.com/articles/progress-indicators/

### 20. shadcn/ui 的组件分发哲学
"不是组件库，而是你构建自己组件库的方式"。五原则：Open Code（代码拷入项目、可任意改）、Composition（统一可组合接口，跨组件 API 可预测）、Distribution（flat-file schema + CLI）、Beautiful Defaults（开箱即用的默认样式与统一设计）、AI-Ready（开放代码供 LLM 读取改进）。
来源：https://ui.shadcn.com/docs

---

## 二、UX 交互法则与心理学依据（Laws of UX / NN/g）

### 21. 尼尔森十大可用性启发式（总纲）
Jakob Nielsen（1994，2024 复审）：①系统状态可见性；②贴近真实世界；③用户控制与自由（紧急出口/撤销）；④一致性与标准；⑤错误预防（slips 靠约束与默认值防，mistakes 靠撤销与警告防）；⑥识别而非回忆；⑦灵活与效率（给专家快捷键）；⑧美学与极简（无关信息会与相关信息争夺可见性）；⑨帮助用户识别、诊断、恢复错误（平实语言、精确指出问题、给建设性方案）；⑩帮助与文档（可搜索、面向任务、上下文呈现）。
来源：https://www.nngroup.com/articles/ten-usability-heuristics/
对 UI 的直接指导：加载/校验/上传/提交等一切异步过程都要做状态反馈（①⑨）；错误信息就近、说人话、给修法（⑨⑨⑩）；提供撤销与取消（③）；快捷键服务高频用户（⑦）。

### 22. Fitts 定律
目标获取时间 = f(距离, 目标大小)。指导：触控目标要足够大；目标间留足间距；把目标放在容易获取的界面区域；任务注意区与相关按钮的距离尽量短。该定律直接催生了"移动端大按钮"惯例。
来源：https://lawsofux.com/fittss-law/
交叉印证：https://www.nngroup.com/articles/ten-usability-heuristics/（Nielsen 在一致性条目中引用 Jakob's Law，Laws of UX 同页 "Further Reading" 引 NN/g Fitts 文章）

### 23. Hick 定律
决策时间随选项数量与复杂度上升。指导：响应时间关键处减少选项；把复杂任务拆成小步；突出推荐选项以免淹没用户；对新用户做渐进式 onboarding（Slack 案例）；但别简化到失真（be careful not to simplify to the point of abstraction）。
来源：https://lawsofux.com/hicks-law/

### 24. Miller 定律（7±2）与工作记忆
普通人工作记忆只能保持 7±2 项。指导：**不要拿"神奇数字七"为不必要的设计限制辩护**（重要告诫，常被误用）；把内容切成更小的块帮助处理与记忆；个体容量因先前知识与情境而异。配套 Chunking 法则：分块让内容可扫读、层级分组帮助理解关系。
来源：https://lawsofux.com/millers-law/ 、https://lawsofux.com/chunking/

### 25. 峰终定律（Peak-End Rule）
人对体验的评价主要取决于峰值时刻与结尾感受，而非全程平均（Kahneman et al. 1993 冷水实验）。指导：重点设计用户旅程中强度最高与收尾时刻（提交成功页、任务完成）；在最有价值的时刻投放惊喜（Mailchimp 发送成功动画）；负面体验被记得更牢，要专门消除负面峰值（Uber 用时间感知降低取消率）。落到组件：表单提交成功态、删除确认、加载结束的收尾反馈都值得打磨。
来源：https://lawsofux.com/peak-end-rule/
相关 NN/g 文章：The Peak–End Rule: How Impressions Become Memories（Lexie Kane），见上页 Further Reading 列表。

### 26. Tesler 定律（复杂度守恒）
任何系统都有不可消除的复杂度，只能由系统或用户承担。指导：设计与开发阶段尽量把固有复杂度从用户身上挪走（工程师多花一周，好过百万用户各多花一分钟）；不要为"理想理性用户"设计；把指引放进使用上下文（如 tooltip 内嵌帮助）。
来源：https://lawsofux.com/teslers-law/

### 27. Doherty 阈值
人机交互节奏 <400ms 时生产力飙升。指导：400ms 内给系统反馈以维持注意力；用感知性能（预加载、骨架屏）缩短"感觉到的等待"；加载动画与进度条让等待可容忍；刻意的微延迟甚至能提升感知价值与信任感。与 NN/g 0.1/1/10s 三限互为补充（Doherty 定交互节奏，Nielsen 定分层阈值）。
来源：https://lawsofux.com/doherty-threshold/ 、https://www.nngroup.com/articles/response-times-3-important-limits/

### 28. Jakob 定律
用户大部分时间花在别的产品上，期望会迁移。指导：利用既有心智模型（表单控件、radio、按钮都源自实体对应物）；改版时让用户暂时保留熟悉版本以减少割裂（YouTube 2017 红esign 可回退案例）。NN/g 十大启发式第 4 条（一致性）即以 Jakob's Law 为心理学注脚。
来源：https://lawsofux.com/jakobs-law/

### 29. 序位效应（Serial Position Effect）
系列中首尾项记忆最好（primacy + recency）。指导：把最不重要的项放中间；导航/列表中的关键动作放最左与最右。
来源：https://lawsofux.com/serial-position-effect/

### 30. Von Restorff 效应（隔离效应）
相似物体中与众不同者最易被记住。指导：让重要信息与关键动作视觉上凸显（主按钮）；强调要有节制，避免多个元素互相争夺；**不要只靠颜色做对比**（照顾色觉障碍者）；用动效做强调时考虑运动敏感用户。
来源：https://lawsofux.com/von-restorff-effect/

### 31. 格式塔·邻近原则（Law of Proximity）
相邻元素被感知为一组。指导：用间距建立元素间关系（表单字段分组、列表条目间距、搜索结果簇）；邻近帮助用户更快理解与组织信息。格式塔分组原则共五类：Proximity、Similarity、Continuity、Closure、Connectedness。
来源：https://lawsofux.com/law-of-proximity/

### 32. 格式塔·共同区域原则（Law of Common Region）
共享明确边界的元素被感知为一组。指导：给元素组加边框或背景即可创建共同区域（卡片、分组容器、抽屉面板），能快速建立元素/区块间关系的清晰结构。
来源：https://lawsofux.com/law-of-common-region/

### 33. 格式塔·相似原则（Law of Similarity）
视觉相似（颜色/形状/大小/朝向/运动）的元素被感知为同组。指导：用颜色与形状标记同功能元素；确保链接与导航在视觉上与普通文本可区分。
来源：https://lawsofux.com/law-of-similarity/

---

## 三、无障碍交互（WAI-ARIA APG / MDN / WebAIM）

### 34. APG 模式库总览（30 个模式）
W3C ARIA Authoring Practices 提供 30 个组件模式：Accordion、Alert、Alert Dialog、Breadcrumb、Button、Carousel、Checkbox、Combobox、Dialog、Disclosure、Feed、Grid、Landmarks、Link、Listbox、Menu/Menubar、Menu Button、Meter、Radio Group、Slider（含 Multi-Thumb）、Spinbutton、Switch、Table、Tabs、Toolbar、Tooltip、Tree View、Treegrid、Window Splitter。每个模式给出键盘交互与 ARIA roles/states/properties 三段规范，是自定义组件实现的第一参照。
来源：https://www.w3.org/WAI/ARIA/apg/patterns/

### 35. 键盘界面开发实践（focus management 核心）（APG）
ARIA 组件浏览器不提供键盘支持，作者必须自己实现。核心规则：Tab/Shift+Tab 在组件间移动、方向键在复合组件（radio group/tablist/menu/listbox/grid）内部移动焦点（roving focus）；焦点指示必须可见（浏览器默认 outline 轻易不要覆盖；颜色/渐变在高对比模式下可能消失）；焦点必须持久存在——关闭对话框或删除列表项后要把焦点设回触发按钮或被删项的后一项，否则焦点掉到 body 造成"丢失"；焦点移动要可预测（按阅读顺序、成段覆盖、避免向后跳、页面加载时不要主动设初始焦点，除非页面只有一个几乎人人马上用的主功能）；**focus ≠ selection**（焦点 = document.activeElement，选中 = `aria-selected=true`，二者视觉必须可区分且不能混淆）；"选中随焦点"只在面板已预载、切换瞬时完成时才允许（tabs/listbox）。
来源：https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/

### 36. 键盘无障碍惯例与测试键位表（WebAIM）
所有内容必须可仅用键盘访问（运动障碍与盲用户依赖键盘）。禁忌：`outline:0/none` 移除焦点指示；`tabindex≥1` 改变导航顺序；把非交互元素设为可聚焦；`<a>` 无 href 不可键盘访问。长页面要有 skip link、正确标题层级、landmark 区域。键盘陷阱：模态困焦是合法的，但 Esc 通常应能释放，WCAG Level A 要求焦点可移入也必须可用键盘移出（2.1.2）。标准键位：按钮 Enter/Space；checkbox Space；radio 方向键组内移动；对话框 Esc 关闭、模态困焦、关闭后焦点回到打开者；滑块方向键 + Home/End；tabs Tab 进出 + 方向键选择；列表滚动 Space 翻页。要在外接键盘的移动设备上实测。
来源：https://webaim.org/techniques/keyboard/

### 37. prefers-reduced-motion（MDN）
检测用户设备上"减少非必要动效"设置（值：`no-preference` / `reduce`）。大幅缩放、平移等动画会触发前庭障碍用户的不适；命中 `reduce` 时应换用更克制的动画（MDN 示例：pulse 缩放动画降级为 dissolve 淡入淡出）。各 OS 设置入口（Windows/macOS/iOS/Android/GNOME/KDE）在页内列出。Baseline：2020 年 1 月起全浏览器可用。
来源：https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion/

### 38. prefers-contrast（MDN）
检测用户要求更高/更低对比（值：`no-preference` / `more` / `less` / `custom`，custom 与 forced-colors: active 的用户调色板对应）。示例：命中 `more` 时把虚线 outline 换成高对比实线。Baseline：2022 年 5 月起全浏览器可用。指导：焦点环、分隔线、禁用态文字都应响应此查询增强对比。
来源：https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast/

---

## 四、「组件/法则 → 命名 → 要点 → 来源」速查清单（41 条）

| # | 组件/法则 | 命名 | 要点（一句话） | 来源 URL |
|---|---|---|---|---|
| 1 | 按钮 | MUI Button 变体体系 | text/contained/outlined 三档强调 + disabled/loading 状态；IconButton 必带 aria-label | https://mui.com/material-ui/react-button/ |
| 2 | 按钮 | Carbon 按钮层级 | 每屏仅 1 个 primary；secondary 只与 primary 成对且承担否定动作；按钮不做导航 | https://carbondesignsystem.com/components/button/usage/ |
| 3 | 对话框 | APG Dialog (Modal) | 困焦循环 + Esc；不可逆对话框焦点放最不破坏的动作；关闭后焦点回触发元素；aria-modal 双重条件 | https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ |
| 4 | 抽屉 | AntD Drawer | 边缘滑入承载同上下文子任务（表单创建/编辑、重子任务、预览）；Esc 关闭、焦点陷阱可配 | https://ant.design/components/drawer |
| 5 | 选择器 | APG Combobox | 弹出层 + 四种 autocomplete；Esc 可探索不丢值；弹出层不进 Tab 序列 | https://www.w3.org/WAI/ARIA/apg/patterns/combobox/ |
| 6 | 开关 | APG Switch | 仅 on/off 二态；标签不得随状态改变；Space 切换 + aria-checked | https://www.w3.org/WAI/ARIA/apg/patterns/switch/ |
| 7 | 滑块 | APG Slider | 方向键步进/Home/End/PageUp；aria-valuenow/min/max + aria-valuetext；触摸 AT 需实测 | https://www.w3.org/WAI/ARIA/apg/patterns/slider/ |
| 8 | Toast | MUI Snackbar | 仅非关键通知；autoHideDuration 给足时间；必须支持 Esc 关闭；不鼓励堆叠 | https://mui.com/material-ui/react-snackbar/ |
| 9 | Toast | AntD message | 顶部居中、默认 3s 自动消失、不打断操作；success/error/warning/loading 四类；maxCount | https://ant.design/components/message |
| 10 | Alert | APG Alert | 不抢焦点的动态播报；避免自动消失（WCAG 2.2.3）、避免频繁打断（2.2.4） | https://www.w3.org/WAI/ARIA/apg/patterns/alert/ |
| 11 | 命令面板 | shadcn Command (cmdk) | Dialog+Input+List+Empty+Group+Shortcut 组合；"搜索+快速动作"、快捷键唤起 | https://ui.shadcn.com/docs/components/command |
| 12 | 标签页 | APG Tabs | 内容预载才推荐焦点自动激活，否则手动激活；方向键循环 + aria-selected/controls | https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ |
| 13 | 面包屑 | APG Breadcrumb | navigation landmark + aria-label；当前页 aria-current="page" | https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/ |
| 14 | 数据表格 | Carbon Data Table | 排序/展开/多选三态全选/批量操作/工具栏/分页；行高与配套栏高度一致；hover 恒开 | https://carbondesignsystem.com/components/data-table/usage/ |
| 15 | 上传 | Carbon File Uploader | 按钮/拖放两变体；loading/success/uploaded 三态；描述写明大小格式限制；键盘焦点回触发元素 | https://carbondesignsystem.com/components/file-uploader/usage/ |
| 16 | 表单 | AntD Form 校验机制 | rules + validateTrigger(onChange) + validateDebounce；validateStatus 四态；scrollToFirstError | https://ant.design/components/form |
| 17 | 表单校验 UX | NN/g 表单错误 10 准则 | 内联校验优先；错误紧贴字段；勿输入完成前校验；勿用 tooltip/摘要做唯一报错；重复 3 次=设计缺陷 | https://www.nngroup.com/articles/errors-forms-design-guidelines/ |
| 18 | 空状态 | Carbon Empty States | no data/user action/error management 三类；空态替换原元素（含表头）；正向标题+下一步 CTA | https://carbondesignsystem.com/patterns/empty-states-pattern/ |
| 19 | 空状态 | AntD Empty | 无数据友好占位 + 引导创建（Create Now）；可嵌入 Table 等容器 | https://ant.design/components/empty |
| 20 | 加载/响应时间 | Nielsen 三限 | 0.1s 即时感 / 1s 心流不破 / 10s 注意极限（>10s 需 percent-done + 可中断） | https://www.nngroup.com/articles/response-times-3-important-limits/ |
| 21 | 加载态 | NN/g 进度指示器 | >1s 才用指示器；spinner 只管 2–10s；≥10s 用 percent-done；立即反馈一切动作 | https://www.nngroup.com/articles/progress-indicators/ |
| 22 | 组件架构 | shadcn/ui 五原则 | Open Code/Composition/Distribution/Beautiful Defaults/AI-Ready；"不是库，是建库方式" | https://ui.shadcn.com/docs |
| 23 | 总纲 | Nielsen 十大启发式 | 状态可见→贴近现实→可撤销→一致→防错→识别优于回忆→快捷键→极简→错误可诊断→帮助文档 | https://www.nngroup.com/articles/ten-usability-heuristics/ |
| 24 | 法则 | Fitts 定律 | 目标越大越近越快命中；触控目标要大、间距要足、位置要顺手 | https://lawsofux.com/fittss-law/ |
| 25 | 法则 | Hick 定律 | 选项越多决策越慢；关键路径减选项、拆步骤、突出推荐项、渐进引导 | https://lawsofux.com/hicks-law/ |
| 26 | 法则 | Miller 定律 | 工作记忆 7±2；勿以七为限制借口，用分块降低记忆负担 | https://lawsofux.com/millers-law/ |
| 27 | 法则 | Chunking | 内容切块 + 层级分组 → 可扫读、可理解、可记忆 | https://lawsofux.com/chunking/ |
| 28 | 法则 | 峰终定律 | 设计峰值与结尾时刻（成功页/收尾反馈）；负面峰值记得最牢须专门消除 | https://lawsofux.com/peak-end-rule/ |
| 29 | 法则 | Tesler 定律 | 复杂度守恒：系统能扛就别推给用户；指引放进使用上下文 | https://lawsofux.com/teslers-law/ |
| 30 | 法则 | Doherty 阈值 | <400ms 反馈；感知性能与加载动画/进度条可改善等待体验 | https://lawsofux.com/doherty-threshold/ |
| 31 | 法则 | Jakob 定律 | 期望迁移：遵循既有心智模型；改版允许回退过渡 | https://lawsofux.com/jakobs-law/ |
| 32 | 法则 | 序位效应 | 首尾记忆最好：导航关键动作放两端、次要项放中间 | https://lawsofux.com/serial-position-effect/ |
| 33 | 法则 | Von Restorff | 关键动作视觉凸显但要有节制；勿仅靠颜色、慎用动效强调 | https://lawsofux.com/von-restorff-effect/ |
| 34 | 法则 | 格式塔·邻近 | 间距即分组：表单/列表用间距表达关系 | https://lawsofux.com/law-of-proximity/ |
| 35 | 法则 | 格式塔·共同区域 | 边框/背景即容器分组（卡片、分组框） | https://lawsofux.com/law-of-common-region/ |
| 36 | 法则 | 格式塔·相似 | 颜色/形状/大小标记同类；链接须与正文可区分 | https://lawsofux.com/law-of-similarity/ |
| 37 | 模式库 | W3C APG 总览 | 30 个组件模式的键盘交互 + ARIA 属性规范，自定义组件第一参照 | https://www.w3.org/WAI/ARIA/apg/patterns/ |
| 38 | 无障碍 | APG 键盘界面实践 | Tab 组件间/箭头组件内；焦点可见、持久、可预测；focus≠selection；选中随焦点仅限瞬时切换 | https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/ |
| 39 | 无障碍 | WebAIM 键盘惯例 | 禁 outline:none 与 tabindex≥1；skip link；Esc 释放键盘陷阱（WCAG 2.1.2）；标准键位表 | https://webaim.org/techniques/keyboard/ |
| 40 | 无障碍 | prefers-reduced-motion | 尊重"减少动效"设置，缩放/平移动画降级为淡变（前庭安全） | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion |
| 41 | 无障碍 | prefers-contrast | more/less/custom 三向对比偏好；焦点环与分隔线应响应增强 | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast |

---

## 五、交叉印证记录

1. **对话框关闭后焦点回触发元素**：APG Dialog（"When a dialog closes, focus returns to the element that invoked the dialog"）↔ WebAIM 键位表（"When a dialog closes, focus should usually return to the element that opened the dialog"）↔ Carbon File Uploader（文件选择框关闭后焦点保持注视点并回到触发元素）。三源一致。
2. **响应时间阈值**：Laws of UX Doherty 阈值（<400ms 交互节奏）↔ NN/g 三限（0.1/1/10s 分层）。两者不冲突：Doherty 定系统往返节奏，Nielsen 定反馈分层（何时无感反馈/何时 busy 指示/何时 percent-done）。
3. **toast 自动消失**：APG Alert 警告自动消失太快违反 WCAG 2.2.3 ↔ MUI "autoHideDuration 要留足处理时间" + AntD 默认 3s ↔ MUI 明确 Snackbar 仅限**非关键**通知。合成结论：自动消失的 toast 只承载非关键信息；关键/必须处理的信息走 dialog/alertdialog 或持久 banner。
4. **错误提示就近 + 平实语言 + 给方案**：NN/g 十大启发式第 9 条 ↔ NN/g 表单错误准则第 3 条（贴近字段、降低工作记忆负担）↔ Carbon 文件上传错误态要求"清晰修复指引"。一致。
5. **Tab 组件间 / 方向键组件内**：APG 键盘实践 ↔ WebAIM 键位表（radio/tabs/select/slider 均为箭头组内导航）。一致。

## 六、冲突与未证实项

- **MUI disabled 光标限制**：MUI 自述 ButtonBase 对 disabled 按钮设 `pointer-events:none`，浏览器因而无法显示 not-allowed 光标，MUI 提供两种 workaround 但均有副作用——这是库自己声明的已知限制，非"最佳实践分歧"。
- **Tabs 自动激活**：APG 明确"内容预载才推荐"，即自动激活并非默认正确；实现时须按内容加载方式二选一。
- **进度条存在与否**：NN/g 指出浏览器自带进度条常失效，自制 percent-done 才可靠；而 spinner 滥用（>10s 场景）被明确反对。
- **未证实/未找到**：
  1. Shopify Polaris 组件级规范：`polaris.shopify.com/components/button`、`/components/toast` 本次抓取均返回通用 "Polaris references" 页（旧 React 组件文档已迁移），`shopify.dev/docs/api/shopify-web-components` 返回 404。Polaris 一手组件指导**本次未能获取**，报告中未引用任何 Polaris 组件细节。
  2. NN/g 关于 toast 的专门文章：使用 fox_search（bing/ddg/baidu/searxng/wikipedia 引擎链，多数超时或返回无关结果）未能定位到 NN/g toast 专题 URL，toast 部分改以 MUI/AntD/APG Alert 一手文档为据。
  3. LukeW 内联验证研究原文：`lukew.com/ff/entry.asp?1394` 实际返回的是另一篇响应式设计文章；内联校验结论已由 NN/g errors-forms 文章覆盖，未再引用 LukeW。
  4. AntD notification（重提示）/ MUI Dialog 文档细节：未单独抓取（信息已由已抓取页面覆盖），如需重提示 toast 的深度规范可补查。
