import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type AlertKind = "success" | "info" | "warning" | "error";

const CONTENT: Record<AlertKind, { title: string; body: string }> = {
  success: { title: "已保存 Saved", body: "更改已写入服务器 Changes written to the server." },
  info: { title: "提示 Note", body: "警告提示驻留文档流,不自动消失。Alerts stay in the flow and never auto-dismiss." },
  warning: { title: "注意 Attention", body: "存储空间将于 7 天后耗尽 Storage runs out in 7 days." },
  error: { title: "失败 Failed", body: "同步失败,请检查网络后重试 Sync failed; check the network." },
};

/** 语义图标:SVG currentColor 着色(颜色+图标双通道编码) */
function KindIcon({ kind }: { kind: AlertKind }) {
  const common = {
    width: 15,
    height: 15,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  let shape: ReactNode;
  if (kind === "success") {
    shape = (
      <>
        <circle cx="8" cy="8" r="6.5" />
        <path d="M5 8.2l2 2 4-4.4" />
      </>
    );
  } else if (kind === "info") {
    shape = (
      <>
        <circle cx="8" cy="8" r="6.5" />
        <path d="M8 7.4v3.6" />
        <path d="M8 5v.05" strokeWidth={2} />
      </>
    );
  } else if (kind === "warning") {
    shape = (
      <>
        <path d="M8 1.8L15 14H1z" />
        <path d="M8 6v3.2" />
        <path d="M8 11.4v.05" strokeWidth={2} />
      </>
    );
  } else {
    shape = (
      <>
        <circle cx="8" cy="8" r="6.5" />
        <path d="M5.6 5.6l4.8 4.8M10.4 5.6l-4.8 4.8" />
      </>
    );
  }
  return <svg {...common}>{shape}</svg>;
}

const css = `
.alc-page { position: absolute; inset: 0; }
.alc-top {
  position: absolute; top: 0; left: 0; right: 0; z-index: 5;
  display: flex; justify-content: center;
}
.alc-top .alc-alert { width: 100%; }
.alc-top .alc-reshow { margin: 8px 16px; }
.alc-content {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; gap: 10px; justify-content: center;
  padding: 24px 28px;
}
.alc-page[data-banner="on"] .alc-content {
  justify-content: flex-start;
  padding-top: 76px; /* 通栏让位 */
}
.alc-alert {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 10px 14px; border-radius: 8px; border: 1px solid;
  background: color-mix(in srgb, var(--alc-c) 10%, #fff);
  border-color: color-mix(in srgb, var(--alc-c) 40%, #fff);
  font-size: 13px; line-height: 1.6; color: rgba(0, 0, 0, 0.88);
  animation: alc-in 0.15s ease-out both;
}
.alc-alert.is-banner { border-radius: 0; border-top: 0; border-left: 0; border-right: 0; padding: 9px 16px; }
.alc-alert[data-type="success"] { --alc-c: #52c41a; }
.alc-alert[data-type="info"] { --alc-c: #1677ff; }
.alc-alert[data-type="warning"] { --alc-c: #faad14; }
.alc-alert[data-type="error"] { --alc-c: #ff4d4f; }
.alc-icon { color: var(--alc-c); flex: none; margin-top: 2px; display: inline-flex; }
.alc-text { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.alc-text strong { font-weight: 600; }
.alc-text span { color: rgba(0, 0, 0, 0.65); }
.alc-x {
  border: 0; background: transparent; cursor: pointer;
  font-size: 16px; line-height: 1; color: rgba(0, 0, 0, 0.45); padding: 2px 4px;
}
.alc-x:hover { color: rgba(0, 0, 0, 0.88); }
.alc-reshow {
  align-self: flex-start;
  border: 1px dashed #d9d9d9; border-radius: 6px; padding: 5px 12px;
  font-size: 12px; cursor: pointer; background: transparent; color: rgba(0, 0, 0, 0.65);
}
.alc-reshow:hover { color: #1677ff; border-color: #1677ff; }
.alc-h { margin: 0; font-size: 15px; font-weight: 600; color: rgba(0, 0, 0, 0.88); }
.alc-p { margin: 0; font-size: 13px; line-height: 1.7; color: rgba(0, 0, 0, 0.65); max-width: 420px; }
@keyframes alc-in { from { opacity: 0; translate: 0 -4px; } to { opacity: 1; translate: 0 0; } }
@media (prefers-reduced-motion: reduce) {
  .alc-alert { animation: none; }
}
`;

/**
 * 警告提示演示:四个参数(type/closable/showIcon/banner)均为 JS 型,
 * 订阅 store 后分别驱动 data-type、关闭按钮、图标与通栏布局。
 * 警告驻留文档流 + role=alert + 不自动消失(APG Alert);
 * closable=on 时经真实按钮移除,关闭后提供「重新显示」以保持可玩性。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [kind, setKind] = useState(() => store.get("type") as AlertKind);
  const [closable, setClosable] = useState(() => store.get("closable") === "on");
  const [showIcon, setShowIcon] = useState(() => store.get("showIcon") === "on");
  const [banner, setBanner] = useState(() => store.get("banner") === "on");
  const [dismissed, setDismissed] = useState(false);

  useEffect(
    () =>
      store.subscribe(() => {
        setKind(store.get("type") as AlertKind);
        setClosable(store.get("closable") === "on");
        setShowIcon(store.get("showIcon") === "on");
        setBanner(store.get("banner") === "on");
      }),
    [store],
  );

  const alertNode = dismissed ? (
    <button type="button" className="alc-reshow" onClick={() => setDismissed(false)}>
      重新显示 Show again
    </button>
  ) : (
    <div
      className={banner ? "alc-alert is-banner" : "alc-alert"}
      role="alert"
      data-type={kind}
    >
      {showIcon && (
        <span className="alc-icon">
          <KindIcon kind={kind} />
        </span>
      )}
      <div className="alc-text">
        <strong>{CONTENT[kind].title}</strong>
        <span>{CONTENT[kind].body}</span>
      </div>
      {closable && (
        <button type="button" className="alc-x" aria-label="关闭 Close" onClick={() => setDismissed(true)}>
          ×
        </button>
      )}
    </div>
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="alc-page" data-banner={banner ? "on" : "off"}>
        <div className="alc-top">{banner && alertNode}</div>
        <div className="alc-content">
          {!banner && alertNode}
          <h3 className="alc-h">页面内容 Page content</h3>
          <p className="alc-p">
            警告提示是文档流内的驻留警示块:role=alert 播报、不夺焦点、默认不消失。
            An alert is a persistent in-flow block: role=alert announced, focus untouched, never auto-dismissed.
            {banner ? " banner 模式为通栏无圆角(antd 下 type/showIcon 默认翻转为 warning/true)。" : ""}
          </p>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
