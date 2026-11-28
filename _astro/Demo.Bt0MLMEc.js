import{j as i}from"./jsx-runtime.D_zvdyIk.js";import{r as p}from"./index.DLkBFFtG.js";import{g as h}from"./color.DuEPkvq5.js";import{D as f}from"./DemoStage.vW1CgYCd.js";const u=["srgb","oklab","oklch","display-p3"],x=new Set(["hsl","hwb","lch","oklch"]),b=`
.gi-stage {
  --gi-from: #FF0000;
  --gi-to: #0000FF;
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
  overflow: hidden;
}
.gi-main {
  height: 84px;
  border-radius: 14px;
  /* 兜底:无 in 的普通渐变(不支持 in 语法的浏览器消费这条) */
  background: linear-gradient(90deg, var(--gi-from), var(--gi-to));
}
.gi-caption {
  font-size: 12px;
  color: #5b6472;
  font-family: ui-monospace, "JetBrains Mono", Consolas, monospace;
  overflow-wrap: anywhere;
}
.gi-rows {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.gi-row {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.gi-strip {
  flex: 1;
  height: 26px;
  border-radius: 8px;
  /* 每行的兜底同样是普通渐变 */
  background: linear-gradient(90deg, var(--gi-from), var(--gi-to));
}
.gi-row[data-active="true"] .gi-strip {
  outline: 2px solid oklch(0.62 0.15 255);
  outline-offset: 2px;
}
.gi-mid {
  width: 30px;
  height: 26px;
  border-radius: 7px;
  border: 1px solid rgba(0, 0, 0, 0.14);
  /* 中点色块:由 CSS 直接消费 --gi-from/--gi-to 与 color-mix */
  background: color-mix(in srgb, var(--gi-from), var(--gi-to));
}
.gi-label {
  width: 128px;
  flex: none;
  font-size: 12px;
  color: #5b6472;
}
.gi-label strong { display: block; color: #232a35; font-size: 12.5px; }
.gi-hueNote { font-size: 11px; color: #8a93a3; }
`;function y({entryId:l,schema:c}){const o=h(l,c),[,m]=p.useState(0);p.useEffect(()=>o.subscribe(()=>{m(e=>e+1)}),[o]);const s=o.get("space"),t=o.get("hueStrategy"),a=o.get("from"),r=o.get("to"),g=`linear-gradient(90deg ${x.has(s)?`in ${s} ${t} hue`:`in ${s}`}, ${a}, ${r})`;return i.jsxs(f,{entryId:l,schema:c,children:[i.jsxs("div",{className:"gi-stage",children:[i.jsx("div",{className:"gi-main",style:{background:g}}),i.jsx("div",{className:"gi-caption",children:g}),i.jsx("div",{className:"gi-rows",children:u.map(e=>{const d=x.has(e),n=d?`in ${e} ${t} hue`:`in ${e}`;return i.jsxs("div",{className:"gi-row","data-active":e===s,children:[i.jsxs("span",{className:"gi-label",children:[i.jsx("strong",{children:e}),d?i.jsxs("span",{className:"gi-hueNote",children:["hue ",t]}):i.jsx("span",{className:"gi-hueNote",children:"hue 不适用 / n/a"})]}),i.jsx("div",{className:"gi-strip",style:{background:`linear-gradient(90deg ${n}, ${a}, ${r})`}}),i.jsx("span",{className:"gi-mid",title:`color-mix(${n}, ${a}, ${r})`,style:{background:`color-mix(${n}, ${a}, ${r})`}})]},e)})}),i.jsxs("div",{className:"gi-caption",children:["右侧小格 = 各空间 50% 中点 color-mix(","in …",", from, to)。Right cells = 50% midpoints per space."]})]}),i.jsx("style",{children:b})]})}export{y as default};
