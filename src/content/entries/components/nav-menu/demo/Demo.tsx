import { Fragment, useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface SubEntry {
  zh: string;
  en: string;
}
interface NavItem {
  key: string;
  zh: string;
  en: string;
  children?: SubEntry[];
}

const NAV_ITEMS: NavItem[] = [
  { key: "home", zh: "首页", en: "Home" },
  {
    key: "product",
    zh: "产品",
    en: "Products",
    children: [
      { zh: "产品矩阵", en: "Product suite" },
      { zh: "解决方案", en: "Solutions" },
      { zh: "定价", en: "Pricing" },
    ],
  },
  {
    key: "docs",
    zh: "文档",
    en: "Docs",
    children: [
      { zh: "快速开始", en: "Quick start" },
      { zh: "组件文档", en: "Components" },
      { zh: "API 参考", en: "API reference" },
    ],
  },
  { key: "community", zh: "社区", en: "Community" },
];

const USER_ITEMS: { zh: string; en: string; dividerAfter?: boolean }[] = [
  { zh: "个人中心", en: "Profile" },
  { zh: "我的草稿", en: "My drafts" },
  { zh: "消息通知", en: "Notifications", dividerAfter: true },
  { zh: "退出登录", en: "Sign out" },
];

/** antd Menu subMenuCloseDelay 官方默认 0.1s(06-antdesign.md §4.19) */
const CLOSE_DELAY_MS = 100;

const css = `
.nv-scene { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 20px; }
.nv-frame {
  position: relative;
  width: min(700px, 100%);
  background: #fff;
  color: rgba(0, 0, 0, 0.88); /* antd 中性文字 88%(06-antdesign.md §2.3-⑤) */
  border: 1px solid #f0f0f0;  /* colorBorderSecondary */
  border-radius: 10px;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05); /* boxShadow token */
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: "logo list avatar" "main main main";
  grid-template-rows: 52px auto;
  overflow: visible;
  animation: nv-in 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
.nv-scene[data-theme="dark"] .nv-frame {
  background: #1d1d1d; /* antd dark 算法 colorBgElevated(§2.4) */
  border-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.88);
}
.nv-scene[data-mode="vertical"] .nv-frame {
  grid-template-areas: "logo . avatar" "list main main";
  grid-template-rows: 52px minmax(200px, auto);
}
.nv-logo { grid-area: logo; display: flex; align-items: center; gap: 8px; padding: 0 16px; font-weight: 650; font-size: 14px; }
.nv-logo-dot { width: 18px; height: 18px; border-radius: 6px; background: #1677ff; } /* colorPrimary + borderRadius seed */
.nv-list { grid-area: list; list-style: none; margin: 0; padding: 0 8px; display: flex; align-items: center; gap: 4px; min-width: 0; }
.nv-scene[data-mode="vertical"] .nv-list {
  flex-direction: column; align-items: stretch; gap: 2px;
  padding: 12px 8px; border-right: 1px solid #f0f0f0;
}
.nv-scene[data-theme="dark"] .nv-scene-list-border,
.nv-scene[data-theme="dark"][data-mode="vertical"] .nv-list { border-right-color: rgba(255, 255, 255, 0.1); }
.nv-item { position: relative; }
.nv-link {
  display: flex; align-items: center; gap: 5px; width: 100%;
  height: 36px; padding: 0 14px; border: 0; border-radius: 6px;
  font-size: 14px; font-family: inherit; color: inherit; text-decoration: none;
  cursor: pointer; background: transparent; white-space: nowrap;
}
.nv-link:hover { background: rgba(0, 0, 0, 0.04); } /* 4% 中性填充(§2.3-⑤) */
.nv-scene[data-theme="dark"] .nv-link:hover { background: rgba(255, 255, 255, 0.08); }
.nv-link[data-active="true"] { color: #1677ff; background: #e6f4ff; } /* blue-1(§1.2) */
.nv-scene[data-theme="dark"] .nv-link[data-active="true"] { color: #fff; background: #1677ff; }
.nv-caret {
  width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent;
  border-top: 5px solid currentColor; opacity: 0.55;
  transition: transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.nv-link[aria-expanded="true"] .nv-caret { transform: rotate(180deg); }
.nv-right { grid-area: avatar; position: relative; display: flex; align-items: center; padding: 0 16px; }
.nv-avatar {
  width: 28px; height: 28px; border-radius: 999px; border: 0; cursor: pointer;
  background: #1677ff; color: #fff; font-size: 13px; font-family: inherit;
  display: flex; align-items: center; justify-content: center; padding: 0;
}
.nv-avatar:focus-visible, .nv-link:focus-visible, .nv-menu-item:focus-visible { outline: 2px solid #1677ff; outline-offset: 1px; }
.nv-menu {
  position: absolute; top: calc(100% + 6px); left: 0; min-width: 168px;
  margin: 0; padding: 4px; list-style: none;
  background: #fff; border: 1px solid #f0f0f0; border-radius: 8px; /* borderRadiusLG */
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05);
  z-index: 1000; /* zIndexPopupBase(§2.2) */
  visibility: hidden; opacity: 0; transform: translateY(-4px);
  transition: opacity 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), visibility 0s linear 0.2s;
}
.nv-menu[data-open] {
  visibility: visible; opacity: 1; transform: none;
  transition: opacity 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.nv-scene[data-mode="vertical"] .nv-item .nv-menu:not(.nv-menu-user) { top: -4px; left: calc(100% + 6px); transform: translateX(-4px); }
.nv-scene[data-mode="vertical"] .nv-item .nv-menu:not(.nv-menu-user)[data-open] { transform: none; }
.nv-menu-user { left: auto; right: 0; top: calc(100% + 10px); }
.nv-menu-item {
  display: block; width: 100%; text-align: left; padding: 7px 12px;
  font-size: 14px; font-family: inherit; color: inherit;
  background: transparent; border: 0; border-radius: 6px; cursor: pointer;
}
.nv-menu-item:hover { background: rgba(0, 0, 0, 0.04); }
.nv-scene[data-theme="dark"] .nv-menu { background: #262626; border-color: rgba(255, 255, 255, 0.12); }
.nv-scene[data-theme="dark"] .nv-menu-item:hover { background: rgba(255, 255, 255, 0.08); }
.nv-divider { height: 1px; margin: 4px 8px; background: #f0f0f0; }
.nv-scene[data-theme="dark"] .nv-divider { background: rgba(255, 255, 255, 0.12); }
.nv-body { grid-area: main; padding: 16px 20px 14px; }
.nv-body h4 { margin: 0 0 10px; font-size: 15px; font-weight: 650; }
.nv-skel { height: 10px; border-radius: 5px; background: #f0f0f0; margin-bottom: 8px; }
.nv-scene[data-theme="dark"] .nv-skel { background: rgba(255, 255, 255, 0.08); }
.nv-skel:last-of-type { width: 62%; }
.nv-status {
  margin-top: 12px; display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; color: rgba(0, 0, 0, 0.65);
  background: #e6f4ff; border-radius: 999px; padding: 3px 12px;
}
.nv-scene[data-theme="dark"] .nv-status { color: rgba(255, 255, 255, 0.75); background: rgba(255, 255, 255, 0.08); }
.nv-status strong { color: #1677ff; font-weight: 600; }
@keyframes nv-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .nv-frame { animation: none; }
  .nv-menu, .nv-caret { transition: none; }
}
@media (max-width: 520px) {
  .nv-logo { padding: 0 10px; }
  .nv-logo-text { display: none; }
  .nv-link { padding: 0 10px; }
  .nv-right { padding: 0 10px; }
}
`;

/**
 * 导航菜单演示:完整复现「顶部导航条 + 二级聚合下拉 + 头像 hover 用户菜单」。
 * mode / theme / trigger 均为 JS 型参数——订阅 store 后分别切换 data-mode / data-theme
 * 与展开行为;theme 默认 light、trigger 默认 hover 取 antd Menu 官方默认,
 * mode 默认 horizontal 为条目规格取值(antd 官方默认 vertical,见 schema effect 说明)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [mode, setMode] = useState(() => store.get("mode") as string);
  const [theme, setTheme] = useState(() => store.get("theme") as string);
  const [trigger, setTrigger] = useState(() => store.get("trigger") as string);
  const [open, setOpen] = useState<string | null>(null);
  const [action, setAction] = useState("");
  const closeTimer = useRef<number | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setMode(store.get("mode") as string);
        setTheme(store.get("theme") as string);
        setTrigger(store.get("trigger") as string);
      }),
    [store],
  );

  const clearTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openMenu = (key: string) => {
    clearTimer();
    setOpen(key);
  };
  const scheduleClose = (key: string) => {
    clearTimer();
    closeTimer.current = window.setTimeout(() => {
      setOpen((cur) => (cur === key ? null : cur));
    }, CLOSE_DELAY_MS);
  };
  const closeAll = (refocus = false) => {
    clearTimer();
    setOpen((cur) => {
      if (refocus && cur) triggerRefs.current[cur]?.focus();
      return null;
    });
  };

  // trigger 参数切换时收起,避免悬停残留
  useEffect(() => {
    clearTimer();
    setOpen(null);
  }, [trigger]);

  // 点击舞台内框架之外关闭
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (frameRef.current && !frameRef.current.contains(e.target as Node)) closeAll();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const pick = (label: string) => {
    setAction(label);
    closeAll();
  };
  const onTriggerKey = (key: string) => (trigger === "click" ? (open === key ? closeAll() : openMenu(key)) : openMenu(key));
  // hover 触发的挂载属性;click 触发时不响应鼠标悬停
  const hoverProps = (key: string) =>
    trigger === "hover"
      ? { onMouseEnter: () => openMenu(key), onMouseLeave: () => scheduleClose(key) }
      : {};
  // 弹层内方向键漫游(APG menu:Up/Down 在条目间移动,Home/End 到首尾)
  const menuKeyDown = (e: React.KeyboardEvent, keys: string[]) => {
    const cur = keys.indexOf(document.activeElement?.getAttribute("data-mi-key") ?? "");
    let next = -1;
    if (e.key === "ArrowDown") next = (cur + 1) % keys.length;
    else if (e.key === "ArrowUp") next = (cur - 1 + keys.length) % keys.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = keys.length - 1;
    if (next >= 0) {
      e.preventDefault();
      (frameRef.current?.querySelector<HTMLButtonElement>(`[data-mi-key="${keys[next]}"]`) ?? null)?.focus();
    }
  };

  const renderSubmenu = (item: NavItem) =>
    item.children && (
      <ul
        role="menu"
        id={`nv-menu-${item.key}`}
        aria-label={item.zh}
        className="nv-menu"
        data-open={open === item.key ? "" : undefined}
        {...hoverProps(item.key)}
        onKeyDown={(e) => menuKeyDown(e, item.children!.map((c) => `${item.key}:${c.zh}`))}
      >
        {item.children.map((s) => (
          <li key={s.zh} role="none">
            <button
              type="button"
              role="menuitem"
              tabIndex={-1}
              className="nv-menu-item"
              data-mi-key={`${item.key}:${s.zh}`}
              title={s.en}
              onClick={() => pick(s.zh)}
            >
              {s.zh}
            </button>
          </li>
        ))}
      </ul>
    );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="nv-scene" data-mode={mode} ref={frameRef}>
        <div
          className="nv-frame"
          data-theme={theme}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeAll(true);
          }}
        >
          <div className="nv-logo">
            <span className="nv-logo-dot" aria-hidden="true" />
            <span className="nv-logo-text">站点</span>
          </div>
          <ul
            className="nv-list"
            role="menubar"
            aria-label="站点导航"
            aria-orientation={mode === "vertical" ? "vertical" : undefined}
          >
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <li key={item.key} className="nv-item" {...hoverProps(item.key)}>
                  <button
                    type="button"
                    ref={(el) => {
                      triggerRefs.current[item.key] = el;
                    }}
                    className="nv-link"
                    role="menuitem"
                    aria-haspopup="menu"
                    aria-expanded={open === item.key}
                    aria-controls={`nv-menu-${item.key}`}
                    onClick={() => onTriggerKey(item.key)}
                  >
                    {item.zh}
                    <span className="nv-caret" aria-hidden="true" />
                  </button>
                  {renderSubmenu(item)}
                </li>
              ) : (
                <li key={item.key} className="nv-item">
                  <a
                    className="nv-link"
                    role="menuitem"
                    data-active={item.key === "home" ? "true" : undefined}
                    href="#"
                    title={item.en}
                    onClick={(e) => {
                      e.preventDefault();
                      pick(item.zh);
                    }}
                  >
                    {item.zh}
                  </a>
                </li>
              ),
            )}
          </ul>
          <div className="nv-right" {...hoverProps("user")}>
            <button
              type="button"
              ref={(el) => {
                triggerRefs.current["user"] = el;
              }}
              className="nv-avatar"
              aria-haspopup="menu"
              aria-expanded={open === "user"}
              aria-controls="nv-menu-user"
              aria-label="个人中心"
              title="个人中心 Personal center"
              onClick={() => onTriggerKey("user")}
            >
              <span aria-hidden="true">友</span>
            </button>
            <ul
              role="menu"
              id="nv-menu-user"
              aria-label="个人中心"
              className="nv-menu nv-menu-user"
              data-open={open === "user" ? "" : undefined}
              {...hoverProps("user")}
              onKeyDown={(e) =>
                menuKeyDown(
                  e,
                  USER_ITEMS.filter((u) => !u.dividerAfter).map((u) => `user:${u.zh}`),
                )
              }
            >
              {USER_ITEMS.map((u) => (
                <Fragment key={u.zh}>
                  <li role="none">
                    <button
                      type="button"
                      role="menuitem"
                      tabIndex={-1}
                      className="nv-menu-item"
                      data-mi-key={`user:${u.zh}`}
                      title={u.en}
                      onClick={() => pick(u.zh)}
                    >
                      {u.zh}
                    </button>
                  </li>
                  {u.dividerAfter && <li role="separator" aria-orientation="horizontal" className="nv-divider" />}
                </Fragment>
              ))}
            </ul>
          </div>
          <div className="nv-body">
            <h4>页面标题 Page title</h4>
            <div className="nv-skel" />
            <div className="nv-skel" />
            <div className="nv-skel" />
            <span className="nv-status">
              {action ? (
                <>
                  最近操作 Last action:<strong>{action}</strong>
                </>
              ) : (
                <>悬停「产品 / 文档」或右侧头像查看二级聚合 Hover “Products / Docs” or the avatar</>
              )}
            </span>
          </div>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
