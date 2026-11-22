import React,{useMemo} from 'react';
import {Interactive} from 'remotion';
import type {LayerOverrides} from '../config/props';
/** Generated stable SVG atom layers from original approved SVG tree.
 * Each Interactive.G owns ONE SVG primitive (text, path, rect, etc.)
 * rather than a containing card/whole-scene HTML string.
 * frameSvg() performs the original deterministic motion; only rendering structure changes.
 */
/** Computed color/font changes in Props should not be lost when the default text is direct. */
const hasTextPresentationOverride=(overrides:LayerOverrides|undefined,scene:'S03'|'S06',id:string):boolean=>{
 const u=overrides?.[`${scene}:${id}`];
 return !!u && ['fontSize','fontWeight','fontFamily','letterSpacing','fill','stroke','strokeWidth','asset'].some((key)=>
  u[key as keyof typeof u]!==undefined);
};
type Piece={id:string;path:number[]};
type Parsed={globals:React.ReactNode;elements:Record<string,React.ReactNode>;shells:Record<string,(editable:React.ReactNode)=>React.ReactNode>;texts:Record<string,string>};
const NS='http://www.w3.org/2000/svg';
const attrNames:Record<string,string>={
 'class':'className','clip-path':'clipPath','clip-rule':'clipRule','fill-rule':'fillRule',
 'stroke-width':'strokeWidth','stroke-linecap':'strokeLinecap','stroke-linejoin':'strokeLinejoin',
 'stroke-dasharray':'strokeDasharray','stroke-dashoffset':'strokeDashoffset',
 'font-size':'fontSize','font-weight':'fontWeight','font-family':'fontFamily',
 'text-anchor':'textAnchor','dominant-baseline':'dominantBaseline','alignment-baseline':'alignmentBaseline',
 'letter-spacing':'letterSpacing','paint-order':'paintOrder','color-interpolation-filters':'colorInterpolationFilters',
 'flood-color':'floodColor','flood-opacity':'floodOpacity','stop-color':'stopColor',
 'stop-opacity':'stopOpacity','stroke-opacity':'strokeOpacity','fill-opacity':'fillOpacity',
 'vector-effect':'vectorEffect','xlink:href':'xlinkHref',
};
const parseStyle=(css:string)=>Object.fromEntries(css.split(';').filter(Boolean).map(bit=>{
 const at=bit.indexOf(':');const name=bit.substring(0,at).replace(/-([a-z])/g,(_,c:string)=>c.toUpperCase());return [name,bit.substring(at+1).trim()];
}).filter(p=>p[0]));
const renderDom=(node:Node,key:string):React.ReactNode=>{
 if(node.nodeType===3)return node.nodeValue;
 if(node.nodeType!==1)return null;
 const el=node as Element;const tag=el.localName;
 const attrs:Record<string,unknown>={key};
 for(const a of Array.from(el.attributes)){
  if(a.name==='xmlns'||a.name.startsWith('xmlns:'))continue;
  const p=attrNames[a.name]??a.name;
  attrs[p]=p==='style'?parseStyle(a.value):a.value;
 }
 const children=Array.from(el.childNodes).map((child,i)=>renderDom(child,`${key}-${i}`));
 return React.createElement(tag,attrs,...children);
};

/**
 * Dynamic motion (ancestors' transforms/opacity) lives OUTSIDE the native editable text.
 * Children are authored as literal Interactive.Text below, so Remotion Studio can
 * edit their contents/translate without parsing an SVG text string.
 * The animated wrapper is recomputed per source frame; the direct text is not.
 */
const renderShell=(node:Element,editable:React.ReactNode,key:string):React.ReactNode=>{
 const attrs:Record<string,unknown>={key};
 for(const a of Array.from(node.attributes)){
  if(a.name==='xmlns'||a.name.startsWith('xmlns:')||a.name==='data-native-text-slot')continue;
  const k=attrNames[a.name]??a.name;
  attrs[k]=k==='style'?parseStyle(a.value):a.value;
 }
 if(node.hasAttribute('data-native-text-slot'))return React.createElement('g',attrs,editable);
 return React.createElement(node.localName,attrs,...Array.from(node.children).map((c,i)=>renderShell(c,editable,`${key}-${i}`)));
};
const pieces=(markup:string,selectors:Piece[]):Parsed=>{
 if(typeof DOMParser==='undefined')return {globals:null,elements:{},shells:{},texts:{}};
 const doc=new DOMParser().parseFromString(markup,'image/svg+xml');
 const svg=doc.documentElement;const kids=Array.from(svg.children);
 const global=kids.filter(c=>['defs','style'].includes(c.localName));
 const globals=global.map((c,i)=>renderDom(c,`definition-${i}`));
 const elements:Record<string,React.ReactNode>={};
 const shells:Record<string,(editable:React.ReactNode)=>React.ReactNode>={};const texts:Record<string,string>={};
 for(const item of selectors){
  // Always resolve by stable source ID first. Scene03 editorial cleanup removes
  // header/footer groups, so ordinal child positions cannot be trusted.
  let node:Element|undefined=Array.from(svg.querySelectorAll('[id]')).find(n=>n.id===item.id);
  if(!node && item.id.startsWith('auto-')){
   node=svg;for(const idx of item.path)node=node?Array.from(node.children)[idx]:undefined;
  }
  if(!node){elements[item.id]=null;continue;}
  let parent=node.parentElement;
  let clone=node.cloneNode(true) as Element;
  while(parent&&parent!==svg){
   const wrapped=parent.cloneNode(false) as Element;wrapped.appendChild(clone);clone=wrapped;
   parent=parent.parentElement;
  }
  elements[item.id]=renderDom(clone,`atom-${item.id}`);
  // Only a <text> atom with no <tspan> can become a direct-editable text.
  // The source SVG's text node has its own animation attributes; retain them
  // on an outer <g> so the Interactive.Text receives only user transforms.
  if(node.localName==='text' && node.children.length===0){
   texts[item.id]=node.textContent??'';
   const holder=doc.createElementNS(NS,'g');
   holder.setAttribute('data-native-text-slot','true');
   for(const attr of ['transform','opacity','clip-path','filter','visibility','display']){
    const val=node.getAttribute(attr);if(val!==null)holder.setAttribute(attr,val);
   }
   let parent=node.parentElement;
   let shell:Element=holder;
   while(parent && parent!==svg){
    const wrap=parent.cloneNode(false) as Element;wrap.appendChild(shell);shell=wrap;
    parent=parent.parentElement;
   }
   shells[item.id]=(editable)=>renderShell(shell,editable,`shell-${item.id}`);
  }
 }
 return {globals,elements,shells,texts};
};
const S03_PARTS:Piece[]=[{"id":"element_001","path":[1]},{"id":"element_002","path":[2]},{"id":"element_003","path":[3]},{"id":"element_004","path":[4]},{"id":"element_005","path":[5,0]},{"id":"element_006","path":[5,1]},{"id":"element_007","path":[5,2]},{"id":"element_008","path":[6,0]},{"id":"timebar","path":[6,1]},{"id":"element_009","path":[6,2]},{"id":"element_010","path":[6,3]},{"id":"element_011","path":[7,0,0]},{"id":"element_012","path":[7,0,1]},{"id":"element_013","path":[7,1,0]},{"id":"element_014","path":[7,1,1]},{"id":"element_015","path":[7,1,2]},{"id":"element_016","path":[7,1,3]},{"id":"element_017","path":[7,1,4]},{"id":"element_018","path":[7,1,5]},{"id":"element_019","path":[7,1,6]},{"id":"element_020","path":[7,1,7,0]},{"id":"element_021","path":[7,1,7,1]},{"id":"element_022","path":[7,1,7,2]},{"id":"element_023","path":[7,1,7,3]},{"id":"element_024","path":[7,1,7,4]},{"id":"element_025","path":[7,1,7,5]},{"id":"element_026","path":[7,1,8,0]},{"id":"element_027","path":[7,1,8,1]},{"id":"element_028","path":[7,1,8,2]},{"id":"element_029","path":[7,1,8,3]},{"id":"element_030","path":[7,1,8,4]},{"id":"element_031","path":[7,1,8,5]},{"id":"element_032","path":[7,1,9,0]},{"id":"element_033","path":[7,1,9,1]},{"id":"element_034","path":[7,1,9,2]},{"id":"element_035","path":[7,1,9,3]},{"id":"element_036","path":[7,1,9,4]},{"id":"element_037","path":[7,1,9,5]},{"id":"element_038","path":[7,2,0]},{"id":"element_039","path":[7,2,1]},{"id":"element_040","path":[8,0,0]},{"id":"element_041","path":[8,0,1]},{"id":"element_042","path":[8,1,0]},{"id":"element_043","path":[8,1,1]},{"id":"element_044","path":[8,1,2]},{"id":"element_045","path":[8,1,3]},{"id":"element_046","path":[8,1,4]},{"id":"element_047","path":[8,1,5]},{"id":"element_048","path":[8,1,6]},{"id":"copyPath","path":[8,2]},{"id":"element_049","path":[8,3,0]},{"id":"element_050","path":[8,3,1]},{"id":"element_051","path":[8,3,2]},{"id":"element_052","path":[8,3,3]},{"id":"element_053","path":[8,4,0]},{"id":"element_054","path":[8,4,1]},{"id":"element_055","path":[8,4,2]},{"id":"element_056","path":[8,5,0]},{"id":"element_057","path":[8,5,1]},{"id":"element_058","path":[8,5,2]},{"id":"element_059","path":[8,6,0]},{"id":"element_060","path":[8,6,1]},{"id":"element_061","path":[8,6,2]},{"id":"element_062","path":[8,6,3]},{"id":"element_063","path":[9,0,0]},{"id":"element_064","path":[9,0,1]},{"id":"element_065","path":[9,1,0]},{"id":"element_066","path":[9,1,1]},{"id":"element_067","path":[9,1,2]},{"id":"element_068","path":[9,1,3]},{"id":"element_069","path":[9,1,4]},{"id":"element_070","path":[9,1,5]},{"id":"element_071","path":[9,1,6]},{"id":"element_072","path":[9,1,7]},{"id":"exeSelect","path":[9,1,8]},{"id":"element_073","path":[9,1,9]},{"id":"element_074","path":[9,1,10]},{"id":"element_075","path":[9,1,11]},{"id":"element_076","path":[9,1,12]},{"id":"element_077","path":[9,1,13]},{"id":"element_078","path":[9,1,14]},{"id":"element_079","path":[9,1,15]},{"id":"element_080","path":[9,1,16]},{"id":"element_081","path":[9,1,17]},{"id":"element_082","path":[9,2,0]},{"id":"element_083","path":[9,3,0]},{"id":"element_084","path":[9,3,1]},{"id":"element_085","path":[10,0,0]},{"id":"element_086","path":[10,0,1]},{"id":"element_087","path":[10,1,0]},{"id":"element_088","path":[10,1,1]},{"id":"element_089","path":[10,1,2]},{"id":"element_090","path":[10,1,3]},{"id":"element_091","path":[10,1,4]},{"id":"element_092","path":[10,1,5]},{"id":"element_093","path":[10,1,6]},{"id":"cDrive","path":[10,1,7]},{"id":"element_094","path":[10,1,8]},{"id":"element_095","path":[10,1,9]},{"id":"element_096","path":[10,1,10]},{"id":"element_097","path":[10,1,11]},{"id":"element_098","path":[10,1,12]},{"id":"element_099","path":[10,1,13]},{"id":"element_100","path":[10,1,14]},{"id":"element_101","path":[10,1,15]},{"id":"element_102","path":[10,1,16]},{"id":"element_103","path":[10,1,17]},{"id":"element_104","path":[10,1,18]},{"id":"element_105","path":[10,1,19]},{"id":"element_106","path":[10,1,20]},{"id":"element_107","path":[10,1,21]},{"id":"element_108","path":[10,1,22]},{"id":"element_109","path":[10,2,0]},{"id":"element_110","path":[10,2,1]},{"id":"element_111","path":[10,2,2]},{"id":"element_112","path":[10,2,3]},{"id":"element_113","path":[10,3,0]},{"id":"element_114","path":[10,4,0]},{"id":"element_115","path":[10,5,0]},{"id":"element_116","path":[11,0,0]},{"id":"element_117","path":[11,0,1]},{"id":"element_118","path":[11,1,0]},{"id":"element_119","path":[11,1,1]},{"id":"element_120","path":[11,1,2]},{"id":"element_121","path":[11,1,3]},{"id":"element_122","path":[11,1,4]},{"id":"dButton","path":[11,1,5]},{"id":"element_123","path":[11,1,6]},{"id":"element_124","path":[11,1,7]},{"id":"element_125","path":[11,1,8,0]},{"id":"element_126","path":[11,1,8,1]},{"id":"element_127","path":[11,1,8,2]},{"id":"element_128","path":[11,1,8,3]},{"id":"element_129","path":[11,1,9]},{"id":"element_130","path":[11,2,0]},{"id":"element_131","path":[11,3,0]},{"id":"element_132","path":[11,3,1]},{"id":"element_133","path":[12,0,0]},{"id":"element_134","path":[12,0,1]},{"id":"element_135","path":[12,1,0]},{"id":"element_136","path":[12,1,1]},{"id":"element_137","path":[12,1,2]},{"id":"element_138","path":[12,1,3]},{"id":"element_139","path":[12,1,4]},{"id":"element_140","path":[12,1,5]},{"id":"eBar","path":[12,1,6,0]},{"id":"element_142","path":[12,1,7]},{"id":"element_143","path":[12,1,8]},{"id":"element_144","path":[12,2,0]},{"id":"element_145","path":[12,2,1]},{"id":"element_146","path":[12,2,2]}];
export const NativeS03Layers:React.FC<{markup:string;overrides?:LayerOverrides}> = ({markup,overrides})=>{
 const result=useMemo(()=>pieces(markup,S03_PARTS),[markup]);
 return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width={1080} height={1920}
    style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',overflow:'visible'}}>
   {result.globals}
   <Interactive.G name="S03 — RECT element_001" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_001"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_002" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_002"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_003" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_003"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_004" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_004"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_005" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_005"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_006') || result.texts["element_006"] !== "EASY2BOOT" ? <Interactive.G name="S03 — Props fallback element_006" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_006"]}</Interactive.G> : result.shells["element_006"]?.(
    <Interactive.Text name="S03 — EASY2BOOT" x={120} y={288} fontSize={27} fontWeight={760} fill="#636B6D" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>EASY2BOOT</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_007') || result.texts["element_007"] !== "03 / PERSIAPAN" ? <Interactive.G name="S03 — Props fallback element_007" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_007"]}</Interactive.G> : result.shells["element_007"]?.(
    <Interactive.Text name="S03 — 03 / PERSIAPAN" x={987} y={288} fontSize={25} fontWeight={760} textAnchor="end" fill="#A1A8A7" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>03 / PERSIAPAN</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — PATH element_008" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_008"]}</Interactive.G>
   <Interactive.G name="S03 — RECT timebar" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["timebar"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_009') || result.texts["element_009"] !== "EASY2BOOT — SATU USB, BANYAK PILIHAN" ? <Interactive.G name="S03 — Props fallback element_009" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_009"]}</Interactive.G> : result.shells["element_009"]?.(
    <Interactive.Text name="S03 — EASY2BOOT — SATU USB, BANYAK PILIHAN" x={90} y={1617} fontSize={23} fontWeight={720} letterSpacing={1.4} fill="#929898" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>EASY2BOOT — SATU USB, BANYAK PILIHAN</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_010') || result.texts["element_010"] !== "03/06" ? <Interactive.G name="S03 — Props fallback element_010" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_010"]}</Interactive.G> : result.shells["element_010"]?.(
    <Interactive.Text name="S03 — 03/06" x={990} y={1617} fontSize={23} fontWeight={700} textAnchor="end" fill="#AAB0AF" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>03/06</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_011') || result.texts["element_011"] !== "BEBERAPA" ? <Interactive.G name="S03 — Props fallback element_011" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_011"]}</Interactive.G> : result.shells["element_011"]?.(
    <Interactive.Text name="S03 — BEBERAPA" x={91} y={422} fontSize={60} fill="#7E8787" className="med" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>BEBERAPA</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — TEXT element_012 — INSTALLER." style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_012"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_013" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_013"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_014" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_014"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_015" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_015"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_016" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_016"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_017" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_017"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_018" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_018"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_019') || result.texts["element_019"] !== "ISI FLASHDISK" ? <Interactive.G name="S03 — Props fallback element_019" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_019"]}</Interactive.G> : result.shells["element_019"]?.(
    <Interactive.Text name="S03 — ISI FLASHDISK" x={282} y={738} fontSize={32} fontWeight={820} fill="#526067" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>ISI FLASHDISK</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — RECT element_020" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_020"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_021" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_021"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_022" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_022"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_023') || result.texts["element_023"] !== "Windows 10" ? <Interactive.G name="S03 — Props fallback element_023" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_023"]}</Interactive.G> : result.shells["element_023"]?.(
    <Interactive.Text name="S03 — Windows 10" x={266} y={891} fontSize={44} fontWeight={820} fill="#2B393F" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Windows 10</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — CIRCLE element_024" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_024"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_025" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_025"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_026" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_026"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_027" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_027"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_028" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_028"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_029') || result.texts["element_029"] !== "Windows 11" ? <Interactive.G name="S03 — Props fallback element_029" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_029"]}</Interactive.G> : result.shells["element_029"]?.(
    <Interactive.Text name="S03 — Windows 11" x={266} y={1049} fontSize={44} fontWeight={820} fill="#2B393F" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Windows 11</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — CIRCLE element_030" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_030"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_031" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_031"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_032" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_032"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_033" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_033"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_034" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_034"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_035') || result.texts["element_035"] !== "Linux" ? <Interactive.G name="S03 — Props fallback element_035" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_035"]}</Interactive.G> : result.shells["element_035"]?.(
    <Interactive.Text name="S03 — Linux" x={266} y={1207} fontSize={44} fontWeight={820} fill="#2B393F" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Linux</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — CIRCLE element_036" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_036"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_037" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_037"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_038" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_038"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_039') || result.texts["element_039"] !== "DALAM SATU FLASHDISK" ? <Interactive.G name="S03 — Props fallback element_039" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_039"]}</Interactive.G> : result.shells["element_039"]?.(
    <Interactive.Text name="S03 — DALAM SATU FLASHDISK" x={544} y={1422} fontSize={41} fontWeight={830} textAnchor="middle" fill="white" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>DALAM SATU FLASHDISK</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_040') || result.texts["element_040"] !== "PERTAMA," ? <Interactive.G name="S03 — Props fallback element_040" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_040"]}</Interactive.G> : result.shells["element_040"]?.(
    <Interactive.Text name="S03 — PERTAMA," x={90} y={432} fontSize={68} fill="#7E8787" className="med" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>PERTAMA,</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — TEXT element_041 — BACKUP DATA." style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_041"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_042" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_042"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_043" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_043"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_044" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_044"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_045" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_045"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_046" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_046"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_047') || result.texts["element_047"] !== "USB DRIVE" ? <Interactive.G name="S03 — Props fallback element_047" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_047"]}</Interactive.G> : result.shells["element_047"]?.(
    <Interactive.Text name="S03 — USB DRIVE" x={331} y={1025} fontSize={22} fontWeight={800} fill="#B6C6CC" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>USB DRIVE</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_048') || result.texts["element_048"] !== "E:" ? <Interactive.G name="S03 — Props fallback element_048" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_048"]}</Interactive.G> : result.shells["element_048"]?.(
    <Interactive.Text name="S03 — E:" x={326} y={1112} fontSize={62} fontWeight={850} fill="white" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>E:</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — PATH copyPath" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["copyPath"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_049" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_049"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_050" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_050"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_051" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_051"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_052') || result.texts["element_052"] !== "BACKUP" ? <Interactive.G name="S03 — Props fallback element_052" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_052"]}</Interactive.G> : result.shells["element_052"]?.(
    <Interactive.Text name="S03 — BACKUP" x={799} y={1080} fontSize={25} fontWeight={730} textAnchor="middle" fill="#636B6D" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>BACKUP</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — RECT element_053" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_053"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_054" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_054"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_055" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_055"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_056" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_056"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_057" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_057"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_058" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_058"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_059" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_059"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_060" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_060"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_061" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_061"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_062') || result.texts["element_062"] !== "DATA SUDAH AMAN" ? <Interactive.G name="S03 — Props fallback element_062" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_062"]}</Interactive.G> : result.shells["element_062"]?.(
    <Interactive.Text name="S03 — DATA SUDAH AMAN" x={366} y={1301} fontSize={39} fontWeight={830} fill="white" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>DATA SUDAH AMAN</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_063') || result.texts["element_063"] !== "BUKA" ? <Interactive.G name="S03 — Props fallback element_063" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_063"]}</Interactive.G> : result.shells["element_063"]?.(
    <Interactive.Text name="S03 — BUKA" x={92} y={437} fontSize={67} fill="#7E8787" className="med" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>BUKA</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_064') || result.texts["element_064"] !== "EASY2BOOT." ? <Interactive.G name="S03 — Props fallback element_064" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_064"]}</Interactive.G> : result.shells["element_064"]?.(
    <Interactive.Text name="S03 — EASY2BOOT." x={87} y={558} fontSize={108} fill="#DF805F" className="heavy" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>EASY2BOOT.</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — RECT element_065" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_065"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_066" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_066"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_067" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_067"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_068') || result.texts["element_068"] !== "📁" ? <Interactive.G name="S03 — Props fallback element_068" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_068"]}</Interactive.G> : result.shells["element_068"]?.(
    <Interactive.Text name="S03 — 📁" x={164} y={773} fontSize={36} fontWeight={760} fill="#34444B" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>📁</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_069') || result.texts["element_069"] !== "Easy2Boot_v2.xx" ? <Interactive.G name="S03 — Props fallback element_069" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_069"]}</Interactive.G> : result.shells["element_069"]?.(
    <Interactive.Text name="S03 — Easy2Boot_v2.xx" x={215} y={776} fontSize={31} fontWeight={790} fill="#4A565B" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Easy2Boot_v2.xx</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — RECT element_070" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_070"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_071') || result.texts["element_071"] !== "Name" ? <Interactive.G name="S03 — Props fallback element_071" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_071"]}</Interactive.G> : result.shells["element_071"]?.(
    <Interactive.Text name="S03 — Name" x={172} y={901} fontSize={31} fontWeight={650} fill="#6D797B" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Name</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_072') || result.texts["element_072"] !== "Type" ? <Interactive.G name="S03 — Props fallback element_072" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_072"]}</Interactive.G> : result.shells["element_072"]?.(
    <Interactive.Text name="S03 — Type" x={825} y={901} fontSize={29} fontWeight={650} textAnchor="end" fill="#99A0A1" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Type</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — RECT exeSelect" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["exeSelect"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_073" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_073"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_074" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_074"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_075" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_075"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_076') || result.texts["element_076"] !== "Make_E2B.exe" ? <Interactive.G name="S03 — Props fallback element_076" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_076"]}</Interactive.G> : result.shells["element_076"]?.(
    <Interactive.Text name="S03 — Make_E2B.exe" x={300} y={1017} fontSize={49} fontWeight={830} fill="#26353E" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Make_E2B.exe</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_077') || result.texts["element_077"] !== "Application" ? <Interactive.G name="S03 — Props fallback element_077" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_077"]}</Interactive.G> : result.shells["element_077"]?.(
    <Interactive.Text name="S03 — Application" x={300} y={1062} fontSize={28} fontWeight={640} fill="#8A979B" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Application</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_078') || result.texts["element_078"] !== "EXE" ? <Interactive.G name="S03 — Props fallback element_078" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_078"]}</Interactive.G> : result.shells["element_078"]?.(
    <Interactive.Text name="S03 — EXE" x={894} y={1027} fontSize={28} textAnchor="end" fill="#9FA5A6" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>EXE</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — PATH element_079" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_079"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_080" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_080"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_081') || result.texts["element_081"] !== "BUKA APLIKASI" ? <Interactive.G name="S03 — Props fallback element_081" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_081"]}</Interactive.G> : result.shells["element_081"]?.(
    <Interactive.Text name="S03 — BUKA APLIKASI" x={374} y={1237} fontSize={31} fontWeight={800} textAnchor="middle" fill="white" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>BUKA APLIKASI</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — PATH element_082" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_082"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_083" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_083"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_084" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_084"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_085') || result.texts["element_085"] !== "PASTIKAN" ? <Interactive.G name="S03 — Props fallback element_085" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_085"]}</Interactive.G> : result.shells["element_085"]?.(
    <Interactive.Text name="S03 — PASTIKAN" x={89} y={429} fontSize={70} fill="#7E8787" className="med" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>PASTIKAN</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — TEXT element_086 — PILIH USB." style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_086"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_087" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_087"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_088" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_088"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_089" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_089"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_090" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_090"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_091') || result.texts["element_091"] !== "Make_E2B.exe" ? <Interactive.G name="S03 — Props fallback element_091" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_091"]}</Interactive.G> : result.shells["element_091"]?.(
    <Interactive.Text name="S03 — Make_E2B.exe" x={174} y={742} fontSize={29} fontWeight={790} fill="#3B484F" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Make_E2B.exe</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_092') || result.texts["element_092"] !== "−   □   ×" ? <Interactive.G name="S03 — Props fallback element_092" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_092"]}</Interactive.G> : result.shells["element_092"]?.(
    <Interactive.Text name="S03 — −   □   ×" x={930} y={737} fontSize={30} textAnchor="end" fill="#A1A9AD" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>−   □   ×</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_093') || result.texts["element_093"] !== "USB DRIVE" ? <Interactive.G name="S03 — Props fallback element_093" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_093"]}</Interactive.G> : result.shells["element_093"]?.(
    <Interactive.Text name="S03 — USB DRIVE" x={139} y={817} fontSize={28} fontWeight={780} fill="#717D7F" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>USB DRIVE</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — RECT cDrive" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["cDrive"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_094') || result.texts["element_094"] !== "E: USB Flash Drive  —  32 GB" ? <Interactive.G name="S03 — Props fallback element_094" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_094"]}</Interactive.G> : result.shells["element_094"]?.(
    <Interactive.Text name="S03 — E: USB Flash Drive  —  32 GB" x={164} y={904} fontSize={39} fontWeight={820} fill="#273741" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>E: USB Flash Drive  —  32 GB</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — PATH element_095" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_095"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_096" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_096"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_097') || result.texts["element_097"] !== "Refresh" ? <Interactive.G name="S03 — Props fallback element_097" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_097"]}</Interactive.G> : result.shells["element_097"]?.(
    <Interactive.Text name="S03 — Refresh" x={889} y={904} fontSize={25} fontWeight={790} textAnchor="middle" fill="#58686D" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Refresh</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — RECT element_098" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_098"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_099" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_099"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_100" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_100"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_101') || result.texts["element_101"] !== "Make E2B Drive" ? <Interactive.G name="S03 — Props fallback element_101" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_101"]}</Interactive.G> : result.shells["element_101"]?.(
    <Interactive.Text name="S03 — Make E2B Drive" x={298} y={1109} fontSize={33} fontWeight={830} fill="white" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Make E2B Drive</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — PATH element_102" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_102"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_103" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_103"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_104" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_104"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_105') || result.texts["element_105"] !== "Warning:" ? <Interactive.G name="S03 — Props fallback element_105" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_105"]}</Interactive.G> : result.shells["element_105"]?.(
    <Interactive.Text name="S03 — Warning:" x={650} y={1085} fontSize={24} fontWeight={830} fill="#8B6462" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Warning:</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_106') || result.texts["element_106"] !== "USB drive will" ? <Interactive.G name="S03 — Props fallback element_106" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_106"]}</Interactive.G> : result.shells["element_106"]?.(
    <Interactive.Text name="S03 — USB drive will" x={651} y={1125} fontSize={24} fontWeight={700} fill="#956D67" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>USB drive will</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_107') || result.texts["element_107"] !== "be erased!" ? <Interactive.G name="S03 — Props fallback element_107" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_107"]}</Interactive.G> : result.shells["element_107"]?.(
    <Interactive.Text name="S03 — be erased!" x={651} y={1165} fontSize={24} fontWeight={700} fill="#956D67" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>be erased!</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_108') || result.texts["element_108"] !== "Simulasi UI • Pilih kapasitas & nama USB yang benar" ? <Interactive.G name="S03 — Props fallback element_108" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_108"]}</Interactive.G> : result.shells["element_108"]?.(
    <Interactive.Text name="S03 — Simulasi UI • Pilih kapasitas & nama USB yang benar" x={140} y={1299} fontSize={25} fontWeight={660} fill="#9AA6A7" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Simulasi UI • Pilih kapasitas & nama USB yang benar</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — RECT element_109" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_109"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_110" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_110"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_111') || result.texts["element_111"] !== "E: USB Flash Drive — 32 GB" ? <Interactive.G name="S03 — Props fallback element_111" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_111"]}</Interactive.G> : result.shells["element_111"]?.(
    <Interactive.Text name="S03 — E: USB Flash Drive — 32 GB" x={169} y={1019} fontSize={36} fontWeight={800} fill="#46555B" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>E: USB Flash Drive — 32 GB</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — PATH element_112" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_112"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_113" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_113"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_114" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_114"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_115" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_115"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_116') || result.texts["element_116"] !== "LALU," ? <Interactive.G name="S03 — Props fallback element_116" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_116"]}</Interactive.G> : result.shells["element_116"]?.(
    <Interactive.Text name="S03 — LALU," x={90} y={435} fontSize={69} fill="#7E8787" className="med" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>LALU,</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — TEXT element_117 — BUAT USB." style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_117"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_118" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_118"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_119" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_119"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_120') || result.texts["element_120"] !== "E: USB Flash Drive — 32 GB" ? <Interactive.G name="S03 — Props fallback element_120" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_120"]}</Interactive.G> : result.shells["element_120"]?.(
    <Interactive.Text name="S03 — E: USB Flash Drive — 32 GB" x={199} y={873} fontSize={34} fontWeight={750} fill="#58686B" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>E: USB Flash Drive — 32 GB</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — CIRCLE element_121" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_121"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_122" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_122"]}</Interactive.G>
   <Interactive.G name="S03 — RECT dButton" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["dButton"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_123" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_123"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_124') || result.texts["element_124"] !== "Make E2B Drive" ? <Interactive.G name="S03 — Props fallback element_124" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_124"]}</Interactive.G> : result.shells["element_124"]?.(
    <Interactive.Text name="S03 — Make E2B Drive" x={346} y={1057} fontSize={49} fontWeight={840} fill="white" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Make E2B Drive</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — PATH element_125" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_125"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_126" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_126"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_127" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_127"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_128') || result.texts["element_128"] !== "USB drive will be erased!" ? <Interactive.G name="S03 — Props fallback element_128" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_128"]}</Interactive.G> : result.shells["element_128"]?.(
    <Interactive.Text name="S03 — USB drive will be erased!" x={315} y={1180} fontSize={30} fontWeight={760} fill="#9C665A" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>USB drive will be erased!</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_129') || result.texts["element_129"] !== "SIMULASI TINDAKAN — BACKUP SEBELUM MELANJUTKAN" ? <Interactive.G name="S03 — Props fallback element_129" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_129"]}</Interactive.G> : result.shells["element_129"]?.(
    <Interactive.Text name="S03 — SIMULASI TINDAKAN — BACKUP SEBELUM MELANJUTKAN" x={191} y={1265} fontSize={22} fontWeight={710} fill="#A5ACAB" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>SIMULASI TINDAKAN — BACKUP SEBELUM MELANJUTKAN</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — PATH element_130" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_130"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_131" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_131"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_132" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_132"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_133') || result.texts["element_133"] !== "SELESAI." ? <Interactive.G name="S03 — Props fallback element_133" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_133"]}</Interactive.G> : result.shells["element_133"]?.(
    <Interactive.Text name="S03 — SELESAI." x={92} y={429} fontSize={68} fill="#7E8787" className="med" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>SELESAI.</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — TEXT element_134 — USB SIAP." style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_134"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_135" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_135"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_136" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_136"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_137" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_137"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_138') || result.texts["element_138"] !== "USB multiboot selesai" ? <Interactive.G name="S03 — Props fallback element_138" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_138"]}</Interactive.G> : result.shells["element_138"]?.(
    <Interactive.Text name="S03 — USB multiboot selesai" x={306} y={893} fontSize={40} fontWeight={850} fill="#2B3E43" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>USB multiboot selesai</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_139') || result.texts["element_139"] !== "Drive E: • Easy2Boot" ? <Interactive.G name="S03 — Props fallback element_139" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_139"]}</Interactive.G> : result.shells["element_139"]?.(
    <Interactive.Text name="S03 — Drive E: • Easy2Boot" x={224} y={1019} fontSize={29} fontWeight={700} fill="#849396" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Drive E: • Easy2Boot</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — RECT element_140" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_140"]}</Interactive.G>
   <Interactive.G name="S03 — RECT eBar" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["eBar"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_142') || result.texts["element_142"] !== "Siap untuk ditambahkan file ISO" ? <Interactive.G name="S03 — Props fallback element_142" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_142"]}</Interactive.G> : result.shells["element_142"]?.(
    <Interactive.Text name="S03 — Siap untuk ditambahkan file ISO" x={224} y={1191} fontSize={29} fontWeight={720} fill="#7C8B8E" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Siap untuk ditambahkan file ISO</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S03','element_143') || result.texts["element_143"] !== "100%" ? <Interactive.G name="S03 — Props fallback element_143" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_143"]}</Interactive.G> : result.shells["element_143"]?.(
    <Interactive.Text name="S03 — 100%" x={868} y={1191} fontSize={56} fontWeight={850} textAnchor="end" fill="#31A878" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>100%</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S03 — RECT element_144" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_144"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_145" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_145"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S03','element_146') || result.texts["element_146"] !== "_ISO" ? <Interactive.G name="S03 — Props fallback element_146" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_146"]}</Interactive.G> : result.shells["element_146"]?.(
    <Interactive.Text name="S03 — _ISO" x={751} y={1363} fontSize={47} fontWeight={850} fill="white" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>_ISO</Interactive.Text>
   ) ?? null}
 </svg>;
};
const S06_PARTS:Piece[]=[{"id":"element_001","path":[1]},{"id":"element_002","path":[2]},{"id":"element_003","path":[3]},{"id":"element_004","path":[4]},{"id":"element_005","path":[5,0]},{"id":"element_006","path":[5,1]},{"id":"element_007","path":[5,2]},{"id":"element_008","path":[5,3]},{"id":"timebar","path":[5,4]},{"id":"element_009","path":[5,5]},{"id":"element_010","path":[5,6]},{"id":"element_011","path":[6,0]},{"id":"element_012","path":[6,1]},{"id":"element_013","path":[6,2]},{"id":"element_014","path":[6,3]},{"id":"element_015","path":[6,4]},{"id":"element_017","path":[6,5,0]},{"id":"element_018","path":[6,6]},{"id":"element_019","path":[6,7]},{"id":"element_020","path":[6,8]},{"id":"element_021","path":[7,0,0]},{"id":"element_022","path":[7,0,1]},{"id":"element_023","path":[7,1,0]},{"id":"element_024","path":[7,1,1]},{"id":"element_025","path":[7,1,2]},{"id":"element_026","path":[7,1,3]},{"id":"element_027","path":[7,1,4]},{"id":"element_028","path":[7,1,5,0]},{"id":"element_029","path":[7,1,5,1]},{"id":"element_030","path":[7,2,0]},{"id":"element_031","path":[7,2,1]},{"id":"element_032","path":[7,2,2]},{"id":"element_033","path":[7,2,3]},{"id":"element_034","path":[7,2,4]},{"id":"element_035","path":[7,3,0]},{"id":"element_036","path":[7,3,1]},{"id":"element_037","path":[7,3,2]},{"id":"element_038","path":[7,3,3]},{"id":"element_039","path":[7,3,4]},{"id":"repeatFill","path":[7,3,5]},{"id":"element_040","path":[8,0,0]},{"id":"element_041","path":[8,0,1]},{"id":"element_042","path":[8,0,2]},{"id":"element_043","path":[8,1,0]},{"id":"element_044","path":[8,1,1]},{"id":"element_045","path":[8,1,2]},{"id":"element_046","path":[8,1,3]},{"id":"element_047","path":[8,1,4]},{"id":"element_048","path":[8,1,5]},{"id":"element_049","path":[8,1,6]},{"id":"element_050","path":[8,1,7]},{"id":"element_051","path":[8,2,0]},{"id":"element_052","path":[8,2,1]},{"id":"element_053","path":[8,2,2]},{"id":"element_054","path":[8,2,3]},{"id":"element_055","path":[8,2,4]},{"id":"element_056","path":[8,3,0]},{"id":"element_057","path":[8,3,1]},{"id":"element_058","path":[8,3,2]},{"id":"element_059","path":[8,3,3]},{"id":"element_060","path":[8,3,4]},{"id":"element_061","path":[8,4,0]},{"id":"element_062","path":[8,4,1]},{"id":"element_063","path":[8,4,2]},{"id":"element_064","path":[8,4,3]},{"id":"element_065","path":[9,0,0]},{"id":"element_066","path":[9,0,1]},{"id":"element_067","path":[9,0,2]},{"id":"element_068","path":[10,0]},{"id":"element_069","path":[10,1,0]},{"id":"element_070","path":[10,1,1]},{"id":"element_071","path":[10,2,0]},{"id":"element_072","path":[10,2,1]},{"id":"element_073","path":[10,2,2]},{"id":"element_074","path":[10,2,3]},{"id":"element_075","path":[10,2,4]},{"id":"element_076","path":[10,2,5]},{"id":"element_077","path":[10,2,6]},{"id":"element_078","path":[10,2,7]},{"id":"element_079","path":[10,3,0]},{"id":"element_080","path":[10,3,1]},{"id":"element_081","path":[10,3,2]},{"id":"element_082","path":[10,3,3]},{"id":"element_083","path":[10,3,4]},{"id":"element_084","path":[10,3,5]},{"id":"element_085","path":[10,3,6]},{"id":"element_086","path":[10,3,7]},{"id":"element_087","path":[10,4,0]},{"id":"element_088","path":[10,4,1]}];
export const NativeS06Layers:React.FC<{markup:string;overrides?:LayerOverrides}> = ({markup,overrides})=>{
 const result=useMemo(()=>pieces(markup,S06_PARTS),[markup]);
 return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width={1080} height={1920}
    style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',overflow:'visible'}}>
   {result.globals}
   <Interactive.G name="S06 — RECT element_001" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_001"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_002" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_002"]}</Interactive.G>
   <Interactive.G name="S06 — CIRCLE element_003" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_003"]}</Interactive.G>
   <Interactive.G name="S06 — CIRCLE element_004" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_004"]}</Interactive.G>
   <Interactive.G name="S06 — PATH element_008" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_008"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_011') || result.texts["element_011"] !== "ISO BERHASIL DIJALANKAN." ? <Interactive.G name="S06 — Props fallback element_011" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_011"]}</Interactive.G> : result.shells["element_011"]?.(
    <Interactive.Text name="S06 — ISO BERHASIL DIJALANKAN." x={92} y={426} fontSize={62} fontWeight={800} fill="#7A8789" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>ISO BERHASIL DIJALANKAN.</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S06 — TEXT element_012 — INSTALLER TERBUKA." style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_012"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_013" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_013"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_014" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_014"]}</Interactive.G>
   <Interactive.G name="S06 — PATH element_015" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_015"]}</Interactive.G>
   <Interactive.G name="S06 — PATH element_017" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_017"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_018') || result.texts["element_018"] !== "Windows Setup" ? <Interactive.G name="S06 — Props fallback element_018" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_018"]}</Interactive.G> : result.shells["element_018"]?.(
    <Interactive.Text name="S06 — Windows Setup" x={540} y={1101} fontSize={42} fontWeight={770} textAnchor="middle" fill="#234D75" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Windows Setup</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S06 — RECT element_019" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_019"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_020') || result.texts["element_020"] !== "Next" ? <Interactive.G name="S06 — Props fallback element_020" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_020"]}</Interactive.G> : result.shells["element_020"]?.(
    <Interactive.Text name="S06 — Next" x={800} y={1314} fontSize={26} fontWeight={760} textAnchor="middle" fill="white" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Next</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S06','element_021') || result.texts["element_021"] !== "KALAU KAMU, BIASANYA..." ? <Interactive.G name="S06 — Props fallback element_021" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_021"]}</Interactive.G> : result.shells["element_021"]?.(
    <Interactive.Text name="S06 — KALAU KAMU, BIASANYA..." x={91} y={425} fontSize={59} fontWeight={780} fill="#738185" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>KALAU KAMU, BIASANYA...</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S06 — TEXT element_022 — BOOTABLE ULANG?" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_022"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_023" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_023"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_024" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_024"]}</Interactive.G>
   <Interactive.G name="S06 — PATH element_025" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_025"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_026') || result.texts["element_026"] !== "USB BOOTABLE" ? <Interactive.G name="S06 — Props fallback element_026" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_026"]}</Interactive.G> : result.shells["element_026"]?.(
    <Interactive.Text name="S06 — USB BOOTABLE" x={275} y={817} fontSize={30} fontWeight={680} fill="#7A8789" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>USB BOOTABLE</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S06','element_027') || result.texts["element_027"] !== "Windows 10" ? <Interactive.G name="S06 — Props fallback element_027" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_027"]}</Interactive.G> : result.shells["element_027"]?.(
    <Interactive.Text name="S06 — Windows 10" x={275} y={872} fontSize={44} fontWeight={850} fill="#263A44" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Windows 10</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S06 — RECT element_028" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_028"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_029') || result.texts["element_029"] !== "TERPASANG" ? <Interactive.G name="S06 — Props fallback element_029" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_029"]}</Interactive.G> : result.shells["element_029"]?.(
    <Interactive.Text name="S06 — TERPASANG" x={852} y={843} fontSize={24} fontWeight={800} textAnchor="middle" fill="#52656A" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>TERPASANG</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S06 — RECT element_030" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_030"]}</Interactive.G>
   <Interactive.G name="S06 — CIRCLE element_031" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_031"]}</Interactive.G>
   <Interactive.G name="S06 — PATH element_032" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_032"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_033') || result.texts["element_033"] !== "MAU GANTI INSTALLER" ? <Interactive.G name="S06 — Props fallback element_033" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_033"]}</Interactive.G> : result.shells["element_033"]?.(
    <Interactive.Text name="S06 — MAU GANTI INSTALLER" x={259} y={1040} fontSize={29} fontWeight={680} fill="#9C7664" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>MAU GANTI INSTALLER</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S06','element_034') || result.texts["element_034"] !== "Windows 11" ? <Interactive.G name="S06 — Props fallback element_034" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_034"]}</Interactive.G> : result.shells["element_034"]?.(
    <Interactive.Text name="S06 — Windows 11" x={259} y={1091} fontSize={45} fontWeight={850} fill="#263A44" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Windows 11</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S06 — RECT element_035" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_035"]}</Interactive.G>
   <Interactive.G name="S06 — CIRCLE element_036" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_036"]}</Interactive.G>
   <Interactive.G name="S06 — PATH element_037" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_037"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_038') || result.texts["element_038"] !== "BUAT USB LAGI" ? <Interactive.G name="S06 — Props fallback element_038" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_038"]}</Interactive.G> : result.shells["element_038"]?.(
    <Interactive.Text name="S06 — BUAT USB LAGI" x={271} y={1288} fontSize={31} fontWeight={800} fill="white" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>BUAT USB LAGI</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S06 — RECT element_039" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_039"]}</Interactive.G>
   <Interactive.G name="S06 — RECT repeatFill" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["repeatFill"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_040') || result.texts["element_040"] !== "ATAU..." ? <Interactive.G name="S06 — Props fallback element_040" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_040"]}</Interactive.G> : result.shells["element_040"]?.(
    <Interactive.Text name="S06 — ATAU..." x={91} y={425} fontSize={59} fontWeight={780} fill="#738185" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>ATAU...</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S06','element_041') || result.texts["element_041"] !== "PAKAI" ? <Interactive.G name="S06 — Props fallback element_041" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_041"]}</Interactive.G> : result.shells["element_041"]?.(
    <Interactive.Text name="S06 — PAKAI" x={88} y={525} fontSize={104} fontWeight={860} fill="#202628" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>PAKAI</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S06','element_042') || result.texts["element_042"] !== "MULTIBOOT?" ? <Interactive.G name="S06 — Props fallback element_042" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_042"]}</Interactive.G> : result.shells["element_042"]?.(
    <Interactive.Text name="S06 — MULTIBOOT?" x={88} y={645} fontSize={104} fontWeight={860} fill="#DF805F" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>MULTIBOOT?</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S06 — RECT element_043" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_043"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_044" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_044"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_045" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_045"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_046" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_046"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_047" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_047"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_048" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_048"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_049') || result.texts["element_049"] !== "EASY2BOOT" ? <Interactive.G name="S06 — Props fallback element_049" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_049"]}</Interactive.G> : result.shells["element_049"]?.(
    <Interactive.Text name="S06 — EASY2BOOT" x={346} y={931} fontSize={45} fontWeight={860} fill="white" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>EASY2BOOT</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S06','element_050') || result.texts["element_050"] !== "MULTIBOOT USB" ? <Interactive.G name="S06 — Props fallback element_050" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_050"]}</Interactive.G> : result.shells["element_050"]?.(
    <Interactive.Text name="S06 — MULTIBOOT USB" x={368} y={974} fontSize={29} fontWeight={660} fill="#C2CFD2" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>MULTIBOOT USB</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S06 — RECT element_051" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_051"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_052" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_052"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_053') || result.texts["element_053"] !== "10" ? <Interactive.G name="S06 — Props fallback element_053" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_053"]}</Interactive.G> : result.shells["element_053"]?.(
    <Interactive.Text name="S06 — 10" x={156} y={1207} fontSize={24} fontWeight={900} textAnchor="middle" fill="#407B9C" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>10</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S06','element_054') || result.texts["element_054"] !== "Windows" ? <Interactive.G name="S06 — Props fallback element_054" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_054"]}</Interactive.G> : result.shells["element_054"]?.(
    <Interactive.Text name="S06 — Windows" x={207} y={1192} fontSize={32} fontWeight={840} fill="#283A44" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Windows</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S06','element_055') || result.texts["element_055"] !== "10" ? <Interactive.G name="S06 — Props fallback element_055" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_055"]}</Interactive.G> : result.shells["element_055"]?.(
    <Interactive.Text name="S06 — 10" x={207} y={1232} fontSize={28} fontWeight={840} fill="#DF805F" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>10</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S06 — RECT element_056" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_056"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_057" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_057"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_058') || result.texts["element_058"] !== "11" ? <Interactive.G name="S06 — Props fallback element_058" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_058"]}</Interactive.G> : result.shells["element_058"]?.(
    <Interactive.Text name="S06 — 11" x={464} y={1207} fontSize={24} fontWeight={900} textAnchor="middle" fill="#407B9C" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>11</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S06','element_059') || result.texts["element_059"] !== "Windows" ? <Interactive.G name="S06 — Props fallback element_059" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_059"]}</Interactive.G> : result.shells["element_059"]?.(
    <Interactive.Text name="S06 — Windows" x={513} y={1192} fontSize={32} fontWeight={840} fill="#283A44" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Windows</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S06','element_060') || result.texts["element_060"] !== "11" ? <Interactive.G name="S06 — Props fallback element_060" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_060"]}</Interactive.G> : result.shells["element_060"]?.(
    <Interactive.Text name="S06 — 11" x={513} y={1232} fontSize={28} fontWeight={840} fill="#DF805F" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>11</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S06 — RECT element_061" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_061"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_062" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_062"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_063') || result.texts["element_063"] !== "ISO" ? <Interactive.G name="S06 — Props fallback element_063" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_063"]}</Interactive.G> : result.shells["element_063"]?.(
    <Interactive.Text name="S06 — ISO" x={770} y={1207} fontSize={24} fontWeight={900} textAnchor="middle" fill="#407B9C" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>ISO</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S06','element_064') || result.texts["element_064"] !== "Linux" ? <Interactive.G name="S06 — Props fallback element_064" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_064"]}</Interactive.G> : result.shells["element_064"]?.(
    <Interactive.Text name="S06 — Linux" x={821} y={1212} fontSize={33} fontWeight={850} fill="#283A44" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Linux</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S06 — RECT element_065" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_065"]}</Interactive.G>
   <Interactive.G name="S06 — PATH element_066" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_066"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_067') || result.texts["element_067"] !== "TULIS DI KOMENTAR" ? <Interactive.G name="S06 — Props fallback element_067" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_067"]}</Interactive.G> : result.shells["element_067"]?.(
    <Interactive.Text name="S06 — TULIS DI KOMENTAR" x={361} y={1423} fontSize={42} fontWeight={830} fill="white" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>TULIS DI KOMENTAR</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S06','element_068') || result.texts["element_068"] !== "EASY2BOOT" ? <Interactive.G name="S06 — Props fallback element_068" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_068"]}</Interactive.G> : result.shells["element_068"]?.(
    <Interactive.Text name="S06 — EASY2BOOT" x={540} y={382} fontSize={41} fontWeight={820} letterSpacing={4} textAnchor="middle" fill="#DF805F" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>EASY2BOOT</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S06','element_069') || result.texts["element_069"] !== "1 FLASHDISK" ? <Interactive.G name="S06 — Props fallback element_069" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_069"]}</Interactive.G> : result.shells["element_069"]?.(
    <Interactive.Text name="S06 — 1 FLASHDISK" x={540} y={507} fontSize={116} fontWeight={890} textAnchor="middle" fill="#202628" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>1 FLASHDISK</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S06','element_070') || result.texts["element_070"] !== "BANYAK INSTALLER" ? <Interactive.G name="S06 — Props fallback element_070" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_070"]}</Interactive.G> : result.shells["element_070"]?.(
    <Interactive.Text name="S06 — BANYAK INSTALLER" x={540} y={635} fontSize={88} fontWeight={890} textAnchor="middle" fill="#DF805F" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>BANYAK INSTALLER</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S06 — RECT element_071" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_071"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_072" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_072"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_073" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_073"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_074" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_074"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_075" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_075"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_076" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_076"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_077') || result.texts["element_077"] !== "EASY2BOOT" ? <Interactive.G name="S06 — Props fallback element_077" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_077"]}</Interactive.G> : result.shells["element_077"]?.(
    <Interactive.Text name="S06 — EASY2BOOT" x={309} y={916} fontSize={46} fontWeight={870} fill="white" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>EASY2BOOT</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S06','element_078') || result.texts["element_078"] !== "MULTIBOOT USB" ? <Interactive.G name="S06 — Props fallback element_078" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_078"]}</Interactive.G> : result.shells["element_078"]?.(
    <Interactive.Text name="S06 — MULTIBOOT USB" x={321} y={966} fontSize={29} fontWeight={680} fill="#C6D0D2" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>MULTIBOOT USB</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S06 — RECT element_079" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_079"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_080') || result.texts["element_080"] !== "WINDOWS" ? <Interactive.G name="S06 — Props fallback element_080" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_080"]}</Interactive.G> : result.shells["element_080"]?.(
    <Interactive.Text name="S06 — WINDOWS" x={244} y={1202} fontSize={29} fontWeight={860} textAnchor="middle" fill="#2B4149" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>WINDOWS</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S06','element_081') || result.texts["element_081"] !== "10" ? <Interactive.G name="S06 — Props fallback element_081" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_081"]}</Interactive.G> : result.shells["element_081"]?.(
    <Interactive.Text name="S06 — 10" x={244} y={1242} fontSize={29} fontWeight={870} textAnchor="middle" fill="#DF805F" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>10</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S06 — RECT element_082" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_082"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_083') || result.texts["element_083"] !== "WINDOWS" ? <Interactive.G name="S06 — Props fallback element_083" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_083"]}</Interactive.G> : result.shells["element_083"]?.(
    <Interactive.Text name="S06 — WINDOWS" x={540} y={1202} fontSize={29} fontWeight={860} textAnchor="middle" fill="#2B4149" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>WINDOWS</Interactive.Text>
   ) ?? null}
   {hasTextPresentationOverride(overrides,'S06','element_084') || result.texts["element_084"] !== "11" ? <Interactive.G name="S06 — Props fallback element_084" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_084"]}</Interactive.G> : result.shells["element_084"]?.(
    <Interactive.Text name="S06 — 11" x={540} y={1242} fontSize={29} fontWeight={870} textAnchor="middle" fill="#DF805F" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>11</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S06 — RECT element_085" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_085"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_086') || result.texts["element_086"] !== "LINUX" ? <Interactive.G name="S06 — Props fallback element_086" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_086"]}</Interactive.G> : result.shells["element_086"]?.(
    <Interactive.Text name="S06 — LINUX" x={836} y={1223} fontSize={36} fontWeight={860} textAnchor="middle" fill="#2B4149" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>LINUX</Interactive.Text>
   ) ?? null}
   <Interactive.G name="S06 — RECT element_087" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_087"]}</Interactive.G>
   {hasTextPresentationOverride(overrides,'S06','element_088') || result.texts["element_088"] !== "USB MULTIBOOT" ? <Interactive.G name="S06 — Props fallback element_088" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_088"]}</Interactive.G> : result.shells["element_088"]?.(
    <Interactive.Text name="S06 — USB MULTIBOOT" x={540} y={1410} fontSize={28} fontWeight={810} textAnchor="middle" fill="white" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>USB MULTIBOOT</Interactive.Text>
   ) ?? null}
 </svg>;
};
/** S01 / S02 already use native declarative Interactive nodes in their own scenes. */
export const NativeS01Layers:React.FC<{markup:string}>=()=>null;
export const NativeS02Layers:React.FC<{markup:string}>=()=>null;
export const NativeS05Layers:React.FC<{markup:string}>=()=>null;
