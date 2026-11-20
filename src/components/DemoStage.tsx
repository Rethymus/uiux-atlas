import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";

interface DemoStageProps {
  entryId: string;
  schema: EntrySchema;
  children?: ReactNode;
}

/**
 * 演示舞台(.demo-stage):容器本身即 CSS 变量注入点。
 * 挂载时把节点交给 store.setRoot,所有 cssVar 型参数立即落到该节点上;
 * 卸载时归还 null,避免残留对已卸载节点的引用。
 * Demo 组件把舞台内容作为 children 放进来,即可被参数面板实时驱动。
 */
export default function DemoStage({ entryId, schema, children }: DemoStageProps) {
  const store = getEntryStore(entryId, schema);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    store.setRoot(rootRef.current);
    return () => {
      store.setRoot(null);
    };
  }, [store]);

  return (
    <div ref={rootRef} className="demo-stage">
      {children}
    </div>
  );
}
