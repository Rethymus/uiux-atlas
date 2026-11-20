import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import type { EntrySchema } from "@/lib/types";

type DemoComponent = ComponentType<{ entryId: string; schema: EntrySchema }>;

/** entryId → demo 模块懒加载表(Vite 按此表把各 Demo.tsx 切成异步 chunk) */
const demoModules = import.meta.glob<{ default: DemoComponent }>(
  "/src/content/entries/*/*/demo/Demo.tsx",
);

interface DemoHostProps {
  entryId: string;
  schema: EntrySchema;
}

/**
 * Demo 挂载器:Astro 的 client: 指令要求组件来自静态 import(编译期生成
 * 岛屿元数据 component-url / component-export),直接用在运行时解析的变量
 * 组件上会报 NoMatchingImport。因此由这个静态岛屿 client:load 承载挂载,
 * 再按 entryId 从 import.meta.glob 表里动态 import 对应 Demo.tsx,
 * 并透传 entryId / schema(schema 为纯 JSON,可直传)。
 */
export default function DemoHost({ entryId, schema }: DemoHostProps) {
  const [Comp, setComp] = useState<DemoComponent | null>(null);

  useEffect(() => {
    let alive = true;
    setComp(null);
    const loader = demoModules[`/src/content/entries/${entryId}/demo/Demo.tsx`];
    if (loader) {
      loader().then((mod) => {
        if (alive) setComp(() => mod.default);
      });
    }
    return () => {
      alive = false;
    };
  }, [entryId]);

  if (!Comp) return null;
  return <Comp entryId={entryId} schema={schema} />;
}
