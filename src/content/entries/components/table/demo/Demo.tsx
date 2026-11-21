import { useEffect, useMemo, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 8 条内存数据(演示数据源) */
interface Row {
  name: string;
  cat: string;
  status: "在售" | "补货中" | "下架";
  price: number;
}

const ROWS: Row[] = [
  { name: "云杉台灯", cat: "家居", status: "在售", price: 129 },
  { name: "线性便利贴", cat: "文具", status: "在售", price: 12 },
  { name: "陶瓷马克杯", cat: "餐厨", status: "补货中", price: 39 },
  { name: "降噪耳机", cat: "数码", status: "在售", price: 899 },
  { name: "亚麻抱枕", cat: "家居", status: "补货中", price: 69 },
  { name: "钢笔礼盒", cat: "文具", status: "在售", price: 199 },
  { name: "帆布托特包", cat: "出行", status: "下架", price: 89 },
  { name: "保温随行杯", cat: "餐厨", status: "在售", price: 59 },
];

const STATUS_COLOR: Record<Row["status"], string> = {
  在售: "#52c41a", // antd colorSuccess(seed 默认值)
  补货中: "#faad14", // antd colorWarning(seed 默认值)
  下架: "#ff4d4f", // antd colorError(seed 默认值)
};

const css = `
.tb-scene { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 20px 16px; }
.tb-table-wrap { width: min(560px, 100%); animation: tb-in 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) both; }
.tb-table { width: 100%; border-collapse: collapse; font-size: 13px; color: rgba(0,0,0,0.88); background: #fff; }
/* 三档密度:antd cellPadding large 16 / medium 12·8 / small 8(table/style/index.ts:457-462) */
.tb-table[data-size="lg"] th, .tb-table[data-size="lg"] td { padding: 16px; }
.tb-table[data-size="md"] th, .tb-table[data-size="md"] td { padding: 12px 8px; }
.tb-table[data-size="sm"] th, .tb-table[data-size="sm"] td { padding: 8px; }
/* bordered:外框 colorBorder #d9d9d9,列线 colorBorderSecondary #f0f0f0 */
.tb-table[data-bordered="on"] { border: 1px solid #d9d9d9; }
.tb-table[data-bordered="on"] th:not(:last-child),
.tb-table[data-bordered="on"] td:not(:last-child) { border-right: 1px solid #f0f0f0; }
.tb-table th { text-align: left; font-weight: 500; border-bottom: 1px solid #f0f0f0; white-space: nowrap; }
.tb-table td { border-bottom: 1px solid #f0f0f0; }
/* 斑马纹 2% + 行 hover 4%(antd 中性填充透明度档):hover 恒开(Carbon 调研 07§13) */
.tb-table[data-striped="on"] tbody tr:nth-child(even) { background: rgba(0, 0, 0, 0.02); }
.tb-table tbody tr { transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1); }
.tb-table tbody tr:hover { background: rgba(0, 0, 0, 0.04); }
.tb-num { text-align: right; font-variant-numeric: tabular-nums; }
.tb-sort {
  border: 0; background: none; padding: 0; font: inherit; cursor: pointer; color: inherit;
  display: inline-flex; align-items: center; gap: 4px;
}
.tb-sort:hover { color: #1677ff; } /* antd colorPrimary seed */
.tb-sort:focus-visible { outline: 2px solid #1677ff; outline-offset: 2px; border-radius: 2px; }
.tb-arrow { font-size: 10px; opacity: 0.55; letter-spacing: -1px; }
.tb-sort[aria-sort] .tb-arrow { opacity: 1; color: #1677ff; }
.tb-status { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
.tb-dot { width: 6px; height: 6px; border-radius: 50%; }
/* 空状态:整表替换(不保留表头,Carbon 调研 07§17) */
.tb-empty {
  width: min(560px, 100%);
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 40px 24px; text-align: center; color: rgba(0, 0, 0, 0.65);
  background: #fff; border: 1px dashed #d9d9d9; animation: tb-in 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
.tb-empty-art { width: 72px; height: 56px; border-radius: 8px; position: relative; background: #f5f5f5; overflow: hidden; }
.tb-empty-art::before { content: ""; position: absolute; inset: 12px 16px auto; height: 6px; border-radius: 3px; background: rgba(0,0,0,0.25); }
.tb-empty-art::after { content: ""; position: absolute; left: 16px; right: 28px; bottom: 12px; height: 6px; border-radius: 3px; background: rgba(0,0,0,0.12); }
.tb-empty strong { font-size: 14px; color: rgba(0, 0, 0, 0.88); }
.tb-empty p { margin: 0; font-size: 12px; }
.tb-empty button {
  margin-top: 8px; border: 0; border-radius: 6px; padding: 5px 16px; font-size: 13px;
  background: #1677ff; color: #fff; cursor: pointer;
}
.tb-empty button:hover { background: #4096ff; } /* antd blue-5 hover 档 */
.tb-note { margin-top: 10px; font-size: 11px; color: rgba(0, 0, 0, 0.45); text-align: right; }
@keyframes tb-in { from { opacity: 0; translate: 0 8px; } to { opacity: 1; translate: 0 0; } }
@media (prefers-reduced-motion: reduce) {
  .tb-table-wrap, .tb-empty { animation: none; }
  .tb-table tbody tr { transition: none; }
}
`;

/**
 * 表格演示:size / bordered / striped / rowCount 均为 JS 型参数(demo 订阅 store);
 * rowCount=0 时以空状态整表替换(呼应 empty 部件);价格列可点击排序(aria-sort)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [size, setSize] = useState(() => store.get("size") as string);
  const [bordered, setBordered] = useState(() => store.get("bordered") as string);
  const [striped, setStriped] = useState(() => store.get("striped") as string);
  const [rowCount, setRowCount] = useState(() => store.get("rowCount") as number);
  const [sortDir, setSortDir] = useState<"asc" | "desc" | null>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setSize(store.get("size") as string);
        setBordered(store.get("bordered") as string);
        setStriped(store.get("striped") as string);
        setRowCount(store.get("rowCount") as number);
      }),
    [store],
  );

  const rows = useMemo(() => {
    const shown = ROWS.slice(0, rowCount);
    if (sortDir === null) return shown;
    return [...shown].sort((a, b) => (sortDir === "asc" ? a.price - b.price : b.price - a.price));
  }, [rowCount, sortDir]);

  const ariaSort = sortDir === "asc" ? "ascending" : sortDir === "desc" ? "descending" : undefined;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="tb-scene">
        {rowCount === 0 ? (
          <div className="tb-empty" role="status">
            <div className="tb-empty-art" aria-hidden="true" />
            <strong>暂无数据 No data</strong>
            <p>空状态替换了整张表(不保留表头)—— 与 empty 部件同一准则。/ The empty state replaced the whole table (no header left behind).</p>
            <button type="button">创建记录 Create record</button>
          </div>
        ) : (
          <div className="tb-table-wrap">
            <table
              className="tb-table"
              data-size={size}
              data-bordered={bordered}
              data-striped={striped}
            >
              <caption className="tb-note" style={{ captionSide: "top", textAlign: "left", padding: "0 0 6px" }}>
                文具与家居库存(内存数据 8 条,当前渲染 {rows.length} 行)
              </caption>
              <thead>
                <tr>
                  <th scope="col">名称</th>
                  <th scope="col">分类</th>
                  <th scope="col">状态</th>
                  <th scope="col" aria-sort={ariaSort} className="tb-num">
                    <button
                      type="button"
                      className="tb-sort"
                      onClick={() => setSortDir(sortDir === "asc" ? "desc" : sortDir === "desc" ? null : "asc")}
                    >
                      单价(元) <span className="tb-arrow" aria-hidden="true">↑↓</span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.name}>
                    <td>{r.name}</td>
                    <td>{r.cat}</td>
                    <td>
                      <span className="tb-status">
                        <span className="tb-dot" style={{ background: STATUS_COLOR[r.status] }} aria-hidden="true" />
                        {r.status}
                      </span>
                    </td>
                    <td className="tb-num">{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="tb-note">
              行 hover 恒开 · 单价列可点击排序(asc → desc → 默认)/ Row hover always on · click the price header to sort
            </div>
          </div>
        )}
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
