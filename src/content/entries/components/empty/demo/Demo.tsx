import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.em-scene { position: absolute; inset: 0; display: grid; place-items: center; padding: 24px; }
.em-panel {
  position: relative;
  width: min(520px, 100%);
  max-height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.em-tablehead, .em-row {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 12px;
  padding: 10px 20px;
  font-size: 12px;
}
.em-tablehead {
  color: rgba(0, 0, 0, 0.45);
  background: rgba(15, 23, 42, 0.04);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}
.em-row { color: rgba(0, 0, 0, 0.73); border-bottom: 1px solid rgba(15, 23, 42, 0.05); }
.em-row:last-child { border-bottom: 0; }
.em-tablefoot {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px 20px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}
.em-tablefoot i { font-style: normal; min-width: 20px; text-align: center; padding: 1px 4px; border-radius: 4px; background: rgba(15, 23, 42, 0.06); }
.em-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 40px 32px;
  text-align: center;
  animation: em-in 0.4s ease-out both;
}
.em-panel[data-keep-table="on"] .em-card { padding: 24px 28px; }
.em-art { display: block; }
.em-title { margin: 0; font-size: 16px; font-weight: 600; color: rgba(0, 0, 0, 0.88); }
.em-title small { font-weight: 400; font-size: 13px; color: rgba(0, 0, 0, 0.45); }
.em-desc { margin: 0; font-size: 13px; line-height: 1.6; color: rgba(0, 0, 0, 0.45); max-width: 300px; }
.em-btn {
  margin-top: 4px;
  border: 0;
  border-radius: 6px;
  padding: 7px 18px;
  font-size: 13px;
  cursor: pointer;
  color: #fff;
  background: #2760d8;
}
.em-btn:hover { background: #1e4fb8; }
.em-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.35);
  z-index: 2;
}
@media (max-width: 480px) {
  .em-toolbar { top: auto; bottom: 12px; left: 12px; right: auto; }
}
.em-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.em-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
@keyframes em-in {
  from { opacity: 0; translate: 0 8px; }
  to { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .em-card { animation: none; }
}
`;

/** 中性几何插画,示意 antd PRESENTED_IMAGE_DEFAULT 的 121×116 比例(非官方素材) */
function DefaultArt() {
  return (
    <svg className="em-art" viewBox="0 0 121 116" width="121" height="116" aria-hidden="true">
      <rect x="24" y="14" width="73" height="56" rx="6" fill="#eef1f6" />
      <circle cx="44" cy="36" r="9" fill="#d9dfe8" />
      <rect x="60" y="28" width="26" height="5" rx="2.5" fill="#d9dfe8" />
      <rect x="60" y="38" width="18" height="5" rx="2.5" fill="#e4e9f0" />
      <rect x="34" y="80" width="53" height="6" rx="3" fill="#e4e9f0" />
      <rect x="46" y="92" width="29" height="6" rx="3" fill="#eef1f6" />
    </svg>
  );
}

/** 简洁档插画,示意 antd PRESENTED_IMAGE_SIMPLE 的 55×35 比例(非官方素材) */
function SimpleArt() {
  return (
    <svg className="em-art" viewBox="0 0 55 35" width="55" height="35" aria-hidden="true">
      <rect x="6" y="4" width="43" height="21" rx="4" fill="#eef1f6" />
      <circle cx="17" cy="14" r="4" fill="#d9dfe8" />
      <rect x="25" y="10" width="16" height="3" rx="1.5" fill="#d9dfe8" />
      <rect x="19" y="29" width="17" height="3" rx="1.5" fill="#e4e9f0" />
    </svg>
  );
}

const SAMPLE_ROWS = [
  { name: "会员增长看板 Growth dashboard", owner: "张晓", updated: "11-18" },
  { name: "风控规则配置 Risk rules", owner: "李成", updated: "11-19" },
  { name: "客服工单归档 Tickets", owner: "王岚", updated: "11-20" },
];

/**
 * 空状态演示:表格无数据时的空态卡。
 * simple / footerAction 为 JS 型参数(enum,on/off)——订阅 store 后经 data-simple / 条件渲染消费;
 * 「示例数据」「保留表框(反例)」为 demo 本地状态,分别演示有数据形态与 Carbon 反模式。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [simple, setSimple] = useState(() => store.get("simple") as string);
  const [footerAction, setFooterAction] = useState(() => store.get("footerAction") as string);
  const [hasData, setHasData] = useState(false);
  const [keepTable, setKeepTable] = useState(false);

  useEffect(
    () =>
      store.subscribe(() => {
        setSimple(store.get("simple") as string);
        setFooterAction(store.get("footerAction") as string);
      }),
    [store],
  );

  const tableHead = (
    <div className="em-tablehead">
      <span>名称 Name</span>
      <span>负责人 Owner</span>
      <span>更新 Updated</span>
    </div>
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="em-scene">
        <div className="em-panel" data-keep-table={keepTable ? "on" : undefined}>
          {hasData ? (
            <div>
              {tableHead}
              {SAMPLE_ROWS.map((r) => (
                <div key={r.name} className="em-row">
                  <span>{r.name}</span>
                  <span>{r.owner}</span>
                  <span>{r.updated}</span>
                </div>
              ))}
            </div>
          ) : keepTable ? (
            <>
              {tableHead}
              <div className="em-card" role="status">
                {simple === "on" ? <SimpleArt /> : <DefaultArt />}
                <p className="em-title">
                  暂无数据 <small lang="en">No data</small>
                </p>
                <p className="em-desc">
                  建立第一条数据后,记录将展示在这里。{" "}
                  <span lang="en">Records will appear here once you add the first entry.</span>
                </p>
                {footerAction === "on" && (
                  <button type="button" className="em-btn">
                    新建数据 <span lang="en">Create Now</span>
                  </button>
                )}
              </div>
              <div className="em-tablefoot" aria-hidden="true">
                <i>1</i>
                <i>2</i>
                <i>3</i>
              </div>
            </>
          ) : (
            <div className="em-card" role="status">
              {simple === "on" ? <SimpleArt /> : <DefaultArt />}
              <p className="em-title">
                暂无数据 <small lang="en">No data</small>
              </p>
              <p className="em-desc">
                建立第一条数据后,记录将展示在这里。{" "}
                <span lang="en">Records will appear here once you add the first entry.</span>
              </p>
              {footerAction === "on" && (
                <button type="button" className="em-btn">
                  新建数据 <span lang="en">Create Now</span>
                </button>
              )}
            </div>
          )}
        </div>
        <div className="em-toolbar" role="group" aria-label="演示切换 Demo switches">
          <button type="button" aria-pressed={hasData} title="Sample data" onClick={() => setHasData((v) => !v)}>
            示例数据
          </button>
          <button
            type="button"
            aria-pressed={keepTable}
            title="Keep table frame (anti-pattern)"
            onClick={() => setKeepTable((v) => !v)}
          >
            保留表框(反例)
          </button>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
