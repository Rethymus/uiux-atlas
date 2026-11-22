import { useEffect, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const PANELS = [
  {
    key: "basic",
    label: "基本信息 Basic info",
    body: "张小明 · 138****6688 · zhang@example.com\n注册于 2024-03 · 实名已认证",
  },
  {
    key: "address",
    label: "收货地址 Shipping address",
    body: "广东省 深圳市 南山区 科技园南区 8 栋 1201\n(默认地址,下单页可直接带出)",
  },
  {
    key: "invoice",
    label: "发票开具 Invoice",
    body: "电子普通发票 · 抬头:某某科技有限公司 · 税号 91440300XXXXXXXXXX\n(可选区块,默认收起不干扰主流程)",
  },
];

const css = `
.cp-stage { width: min(460px, calc(100% - 48px)); }
.cp-group { margin: 0; padding: 0; border-block: 1px solid #f0f0f0; border-radius: 6px; list-style: none; }
.cp-item + .cp-item { border-top: 1px solid #f0f0f0; }   /* colorBorderSecondary */
.cp-head { margin: 0; font-size: 14px; }
.cp-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 16px;
  border: 0;
  background: transparent;
  color: rgba(0, 0, 0, 0.88);
  font: inherit;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
}
.cp-btn:focus-visible { outline: 2px solid #1677ff; outline-offset: -2px; }
.cp-stage[data-placement="end"] .cp-btn { flex-direction: row-reverse; justify-content: flex-start; }
.cp-stage[data-placement="end"] .cp-btn .cp-label { flex: 1; }
.cp-arrow {
  flex: none;
  width: 12px;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.45);
  transition: rotate 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.cp-btn[aria-expanded="true"] .cp-arrow { rotate: 90deg; }
.cp-stage[data-collapsible="icon"] .cp-btn { cursor: default; }
.cp-stage[data-collapsible="icon"] .cp-arrow { cursor: pointer; }
.cp-stage[data-collapsible="icon"] .cp-btn .cp-label:hover { color: rgba(0, 0, 0, 0.65); }
.cp-stage[data-collapsible="disabled"] .cp-btn {
  cursor: not-allowed;
  color: rgba(0, 0, 0, 0.25);
}
.cp-body-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.2s cubic-bezier(0.645, 0.045, 0.355, 1); /* motionDurationMid + EaseInOut */
}
.cp-item.is-open .cp-body-wrap { grid-template-rows: 1fr; }
.cp-body-inner { overflow: hidden; }
.cp-body {
  margin: 0;
  padding: 0 16px 12px;
  font-size: 13px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.65);
  white-space: pre-line;
}
.cp-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
@media (prefers-reduced-motion: reduce) {
  .cp-arrow, .cp-body-wrap { transition: none; }
}
`;

/**
 * 折叠面板演示:订单结账页三个可选区块(基本信息/收货地址/发票开具)。
 * accordion / expandIconPlacement / collapsible 为 JS 型参数——订阅 store 后:
 * on=手风琴单开(开新收旧)| off=多开;start|end 换箭头位置;header|icon|disabled 换指针点击目标。
 * 键盘:Tab 在标题间移动,Enter/Space 切换(与 collapsible 档位无关,键盘路径不让步)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [accordion, setAccordion] = useState(() => store.get("accordion") as string);
  const [placement, setPlacement] = useState(() => store.get("expandIconPlacement") as string);
  const [collapsible, setCollapsible] = useState(() => store.get("collapsible") as string);
  const [openKeys, setOpenKeys] = useState<string[]>(["basic"]);

  useEffect(
    () =>
      store.subscribe(() => {
        setAccordion(store.get("accordion") as string);
        setPlacement(store.get("expandIconPlacement") as string);
        setCollapsible(store.get("collapsible") as string);
      }),
    [store],
  );

  const disabled = collapsible === "disabled";

  const toggle = (key: string) => {
    if (disabled) return;
    setOpenKeys((prev) => {
      const isOpen = prev.includes(key);
      if (isOpen) return prev.filter((k) => k !== key);
      return accordion === "on" ? [key] : [...prev, key];
    });
  };

  const onHeadClick = (e: ReactMouseEvent, key: string) => {
    if (collapsible !== "icon") {
      toggle(key);
      return;
    }
    // icon 档:仅点击箭头区切换;点击标题文字不动作
    const target = e.target as HTMLElement;
    if (target.closest(".cp-arrow")) toggle(key);
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>, key: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(key);
    }
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="cp-stage" data-placement={placement} data-collapsible={collapsible}>
        <ul className="cp-group">
          {PANELS.map((p) => {
            const isOpen = openKeys.includes(p.key);
            const regionId = `cp-region-${p.key}`;
            const btnId = `cp-btn-${p.key}`;
            return (
              <li key={p.key} className={`cp-item${isOpen ? " is-open" : ""}`}>
                <h3 className="cp-head">
                  <button
                    type="button"
                    id={btnId}
                    className="cp-btn"
                    aria-expanded={isOpen}
                    aria-controls={regionId}
                    aria-disabled={disabled || undefined}
                    onClick={(e) => onHeadClick(e, p.key)}
                    onKeyDown={(e) => onKeyDown(e, p.key)}
                  >
                    <span className="cp-arrow" aria-hidden="true">▶</span>
                    <span className="cp-label">{p.label}</span>
                  </button>
                </h3>
                <div
                  id={regionId}
                  className="cp-body-wrap"
                  role="region"
                  aria-labelledby={btnId}
                >
                  <div className="cp-body-inner">
                    <p className="cp-body">{p.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <style>{css}</style>
      <p className="cp-hint">键盘 Keyboard:Tab 移动 · Enter/Space 切换 · 面板 role=region 回指标题</p>
    </DemoStage>
  );
}
