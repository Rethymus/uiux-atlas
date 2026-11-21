import { useEffect, useState } from "react";
import type { ParamStore } from "@/lib/store";
import { getEntryStore } from "@/lib/store";
import { contrastRatio, parseColorInput } from "@/lib/color";
import type { EntrySchema } from "@/lib/types";

interface ContrastCheckerProps {
  entryId: string;
  schema: EntrySchema;
}

/** 四道阈值(WCAG 2.1):AA 正文 4.5 / AAA 正文 7 / 大字 3 / 非文本 3 */
const GATES = [
  { key: "aa", label: "AA 正文 body", threshold: 4.5 },
  { key: "aaa", label: "AAA 正文 body", threshold: 7 },
  { key: "large", label: "大字 large", threshold: 3 },
  { key: "nontext", label: "非文本 non-text", threshold: 3 },
] as const;

/**
 * 条目参数 → 校验器两色的实时预填。
 * - color/oklch-workflow:色 A = oklch(L% C H)(store 订阅,随面板滑杆变);
 *   色 B 恒 #000000(该条目工作流即「L≥0.8 配黑字」);
 * - color/wcag-contrast:色 A/B = foreground/background(schema 两个 color 参数)。
 */
function liveColors(entryId: string, store: ParamStore): [string, string] | null {
  switch (entryId) {
    case "color/oklch-workflow": {
      const l = store.get("L") as number;
      const c = store.get("C") as number;
      const h = store.get("H") as number;
      return [`oklch(${l}% ${c} ${h})`, "#000000"];
    }
    case "color/wcag-contrast":
      return [store.get("foreground") as string, store.get("background") as string];
    default:
      return null;
  }
}

/**
 * 内嵌对比度校验器(附加面板,渲染于 color 分类两条目的 DemoStage 内):
 * 两色输入(各自接受 oklch(L C H[/A]) 或 #RGB/#RRGGBB[/AA]),实时输出
 * WCAG 比值与 AA/AAA/大字/非文本四项通过态;判定用未舍入原值(与
 * wcag-contrast 条目同一纪律)。字段在用户手改前跟随条目参数实时值。
 *
 * 交互形态 = 舞台右下角可收起面板(渐进披露,spec §1-3):收起只留一枚
 * 小钮,展开为悬浮面板;展示层无任何 transition/animation —— RM 由构造
 * 保证「无动效」,状态全部瞬时切换。
 */
export default function ContrastChecker({ entryId, schema }: ContrastCheckerProps) {
  const store = getEntryStore(entryId, schema);
  const [open, setOpen] = useState(false);
  const [edited, setEdited] = useState<[boolean, boolean]>([false, false]);
  const [draft, setDraft] = useState<[string, string]>(() => liveColors(entryId, store) ?? ["", ""]);
  const [, setTick] = useState(0);

  useEffect(() => store.subscribe(() => setTick((n) => n + 1)), [store]);

  // 未手改的字段跟随条目参数(store 值);手改后锁定为用户输入
  const live = liveColors(entryId, store);
  const a = !edited[0] && live ? live[0] : draft[0];
  const b = !edited[1] && live ? live[1] : draft[1];

  const pa = parseColorInput(a);
  const pb = parseColorInput(b);
  const valid = pa.ok && pb.ok;
  // 判定用未舍入原值,显示保留两位(与 wcag-contrast 条目同规)
  const ratio = valid ? contrastRatio(pa.rgb01, pb.rgb01) : null;
  const hasAlpha = pa.ok && pa.alpha < 1 ? pa : pb.ok && pb.alpha < 1 ? pb : null;

  const setField = (i: 0 | 1, v: string) => {
    setDraft((d) => (i === 0 ? [v, d[1]] : [d[0], v]));
    setEdited((e) => (i === 0 ? [true, e[1]] : [e[0], true]));
  };

  return (
    <div className="cc-root">
      <button
        type="button"
        className="cc-toggle"
        aria-expanded={open}
        aria-controls="cc-panel"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "× 收起 / Close" : "对比度校验 / Contrast checker"}
      </button>
      {open && (
        <div className="cc-panel" id="cc-panel" role="group" aria-label="对比度校验 Contrast checker">
          <div className="cc-field">
            <label className="cc-field-label" htmlFor="cc-input-a">
              色 A / Color A
            </label>
            <input
              id="cc-input-a"
              className="cc-input"
              value={a}
              onChange={(e) => setField(0, e.target.value)}
              placeholder="oklch(80% 0.12 220) 或 / or #1C1B1F"
              spellCheck={false}
            />
            <span className="cc-swatch" style={{ background: pa.ok ? a.trim() : "transparent" }} aria-hidden="true" />
          </div>
          <div className="cc-field">
            <label className="cc-field-label" htmlFor="cc-input-b">
              色 B / Color B
            </label>
            <input
              id="cc-input-b"
              className="cc-input"
              value={b}
              onChange={(e) => setField(1, e.target.value)}
              placeholder="oklch(0.8 0.12 220) 或 / or #FFFBFE"
              spellCheck={false}
            />
            <span className="cc-swatch" style={{ background: pb.ok ? b.trim() : "transparent" }} aria-hidden="true" />
          </div>
          <div className="cc-result">
            <span className="cc-ratio">{valid ? `${ratio!.toFixed(2)}:1` : "—"}</span>
            <span className="cc-gates">
              {valid
                ? GATES.map((g) => (
                    <span
                      key={g.key}
                      className={ratio! >= g.threshold ? "cc-gate is-pass" : "cc-gate is-fail"}
                    >
                      {g.label} {g.threshold}:1 {ratio! >= g.threshold ? "✓" : "✗"}
                    </span>
                  ))
                : <span className="cc-invalid">无法解析 / unparseable — 用 oklch(L C H[/A]) 或 #hex</span>}
            </span>
          </div>
          <p className="cc-note">
            判定用未舍入原值(4.499:1 显示 4.50 但为 ✗);比值按不透明 sRGB 计算。
            Judged unrounded; ratio computed on opaque sRGB.
            {hasAlpha && (
              <>
                {" "}
                <span className="cc-alpha-warn">
                  检出 α&lt;1:未与底色合成,按该色不透明值判定 / alpha&lt;1 detected: judged on the opaque color, not composited.
                </span>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
