import { useEffect, useRef } from "react";

interface BreakdownTabsProps {
  /**
   * 服务端渲染的 .prose 容器 id。
   * React ref 对象无法跨越 Astro 岛屿 props 序列化边界(Astro 只传可序列化值),
   * 因此容器以 id 定位、组件内部持有自身 root ref;SSR 时本组件输出空占位,
   * .prose 保持服务端原结构,无 JS 时内容全展开可见(渐进增强,spec §3 Tabs)。
   */
  sourceId: string;
  /** tablist 的可读名称(传 dict.entry.breakdown) */
  label: string;
}

interface Section {
  title: string;
  nodes: ChildNode[];
}

/**
 * MDX 四节 → Tabs 的客户端分组容器(spec §3 Tabs / §4.3-4):
 * 挂载后把 #entry-prose 内每个 h2 及其后兄弟节点包成 role="tabpanel",
 * h2 文案作 tab 标签;86 个 MDX 零改动,服务端 HTML 保持原 prose 结构。
 * - roving tabindex + Left/Right/Home/End(spec §8 键盘语义;
 *   Tab 键离开 tablist 后直达激活面板内首个可聚焦元素 = 默认 DOM 顺序);
 * - 激活指示块以 translateX/width 过渡(--dur-2/--ease-standard,spec §6-6),
 *   2px 分类 accent 下边条色取 var(--cat)(容器由 EntryDetail 挂 --cat);
 * - 面板切换 --dur-3/--ease-decel 淡入,旧面板直接卸载(HIG「可中断」);
 * - 不足两个 h2 节时不增强,保持原 prose。
 */
export default function BreakdownTabs({ sourceId, label }: BreakdownTabsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const source = document.getElementById(sourceId);
    if (!source || source.dataset.bdTabs === "on") return;

    /* ── 高度塌缩补偿(清单 scroll-restore-unmanaged):分组会把非首节面板
         hidden,文档高度在水合后塌缩;若浏览器恢复/前进导航落点高于塌缩后
         的可滚动范围,恢复位置会被钳到底部之外。分组前记录 scrollY,
         分组完成后一次校正到新文档的合法范围(仅在越界时触发,不干扰
         正常位置的恢复;锚点/前进导航的精确落点仍由浏览器 auto 承担) ── */
    const preY = window.scrollY;

    /* ── 按 h2 分组:h2 之前的散落内容归入 preamble(原位保留) ── */
    const sections: Section[] = [];
    const preamble: ChildNode[] = [];
    let current: Section | null = null;
    for (const node of Array.from(source.childNodes)) {
      const el = node.nodeType === Node.ELEMENT_NODE ? (node as Element) : null;
      if (el && el.tagName === "H2") {
        if (current) sections.push(current);
        current = { title: (el.textContent ?? "").trim(), nodes: [node] };
      } else if (current) {
        current.nodes.push(node);
      } else {
        preamble.push(node);
      }
    }
    if (current) sections.push(current);
    if (sections.length < 2) return; // 单节不成 Tabs:保持原 prose
    source.dataset.bdTabs = "on";

    const doc = source.ownerDocument;

    /* ── tab 栏(Segmented 解剖 + 2px 分类 accent 指示条,样式见 .bd-tabs) ── */
    const tablist = doc.createElement("div");
    tablist.className = "bd-tabs";
    tablist.setAttribute("role", "tablist");
    tablist.setAttribute("aria-label", label);
    const thumb = doc.createElement("span");
    thumb.className = "bd-thumb";
    thumb.setAttribute("aria-hidden", "true");
    tablist.appendChild(thumb);

    const tabs: HTMLButtonElement[] = [];
    const panels: HTMLElement[] = [];
    let active = 0;

    const placeThumb = (animate: boolean) => {
      const tab = tabs[active];
      if (!tab) return;
      if (!animate) thumb.style.transition = "none";
      thumb.style.width = `${tab.offsetWidth}px`;
      thumb.style.transform = `translateX(${tab.offsetLeft}px)`;
      if (!animate) {
        // 首帧落位不动画;下一帧恢复样式表过渡
        requestAnimationFrame(() => {
          thumb.style.transition = "";
        });
      }
    };

    const activate = (next: number, focusTab: boolean) => {
      active = next;
      tabs.forEach((tab, i) => {
        const on = i === next;
        tab.setAttribute("aria-selected", on ? "true" : "false");
        tab.tabIndex = on ? 0 : -1;
      });
      panels.forEach((panel, i) => {
        if (i === next) {
          panel.hidden = false;
          panel.classList.remove("bd-in");
          void panel.offsetWidth; // 重触发淡入动画
          panel.classList.add("bd-in");
        } else {
          panel.hidden = true; // 旧面板直接卸载(HIG「可中断」)
        }
      });
      placeThumb(true); // 指示条先行(spec §6-6)
      if (focusTab) tabs[next].focus();
    };

    /* ── 构建 tab + panel(appendChild 即把节点从 prose 移入面板) ── */
    const panelBox = doc.createElement("div");
    panelBox.className = "bd-panels";
    sections.forEach((section, i) => {
      const tab = doc.createElement("button");
      tab.type = "button";
      tab.className = "bd-tab";
      tab.id = `${sourceId}-tab-${i}`;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
      tab.setAttribute("aria-controls", `${sourceId}-panel-${i}`);
      tab.tabIndex = i === 0 ? 0 : -1; // roving tabindex
      tab.textContent = section.title;
      tab.addEventListener("click", () => activate(i, false));
      tablist.appendChild(tab);
      tabs.push(tab);

      const panel = doc.createElement("div");
      panel.className = "bd-panel";
      panel.id = `${sourceId}-panel-${i}`;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tab.id);
      panel.hidden = i !== 0;
      for (const node of section.nodes) panel.appendChild(node);
      panelBox.appendChild(panel);
      panels.push(panel);
    });

    /* ── 键盘:Left/Right 循环 + Home/End(spec §3 Tabs / §8) ── */
    tablist.addEventListener("keydown", (e: KeyboardEvent) => {
      const last = tabs.length - 1;
      let next: number;
      switch (e.key) {
        case "ArrowRight":
          next = active === last ? 0 : active + 1;
          break;
        case "ArrowLeft":
          next = active === 0 ? last : active - 1;
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = last;
          break;
        default:
          return;
      }
      e.preventDefault();
      activate(next, true);
    });

    /* 宽度变化(视口/字型加载)后重算指示块位置 */
    let ro: ResizeObserver | undefined;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => placeThumb(false));
      ro.observe(tablist);
    }

    /* ── 装配:序言 → tablist → 面板容器,写回 prose 容器内 ── */
    if (preamble.length > 0) {
      const pre = doc.createElement("div");
      pre.className = "bd-preamble";
      for (const node of preamble) pre.appendChild(node);
      source.appendChild(pre);
    }
    source.appendChild(tablist);
    source.appendChild(panelBox);

    panels[0].classList.add("bd-in");
    placeThumb(false);

    /* 分组完成:按塌缩后的文档高度一次校正恢复落点(见上方注释) */
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (preY > maxScroll) window.scrollTo(0, maxScroll);

    return () => {
      ro?.disconnect();
    };
  }, [sourceId, label]);

  // SSR/无 JS:空占位,.prose 原样纵排(内容全展开可见)
  return <div ref={rootRef} />;
}
