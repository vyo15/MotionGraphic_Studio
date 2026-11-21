import React,{useMemo} from 'react';
import {Interactive} from 'remotion';
/** Generated stable SVG atom layers from original approved SVG tree.
 * Each Interactive.G owns ONE SVG primitive (text, path, rect, etc.)
 * rather than a containing card/whole-scene HTML string.
 * frameSvg() performs the original deterministic motion; only rendering structure changes.
 */
type Piece={id:string;path:number[]};
type Parsed={globals:React.ReactNode;elements:Record<string,React.ReactNode>};
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
const pieces=(markup:string,selectors:Piece[]):Parsed=>{
 if(typeof DOMParser==='undefined')return {globals:null,elements:{}};
 const doc=new DOMParser().parseFromString(markup,'image/svg+xml');
 const svg=doc.documentElement;const kids=Array.from(svg.children);
 const global=kids.filter(c=>['defs','style'].includes(c.localName));
 const globals=global.map((c,i)=>renderDom(c,`definition-${i}`));
 const elements:Record<string,React.ReactNode>={};
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
 }
 return {globals,elements};
};
const S03_PARTS:Piece[]=[{"id":"element_001","path":[1]},{"id":"element_002","path":[2]},{"id":"element_003","path":[3]},{"id":"element_004","path":[4]},{"id":"element_005","path":[5,0]},{"id":"element_006","path":[5,1]},{"id":"element_007","path":[5,2]},{"id":"element_008","path":[6,0]},{"id":"timebar","path":[6,1]},{"id":"element_009","path":[6,2]},{"id":"element_010","path":[6,3]},{"id":"element_011","path":[7,0,0]},{"id":"element_012","path":[7,0,1]},{"id":"element_013","path":[7,1,0]},{"id":"element_014","path":[7,1,1]},{"id":"element_015","path":[7,1,2]},{"id":"element_016","path":[7,1,3]},{"id":"element_017","path":[7,1,4]},{"id":"element_018","path":[7,1,5]},{"id":"element_019","path":[7,1,6]},{"id":"element_020","path":[7,1,7,0]},{"id":"element_021","path":[7,1,7,1]},{"id":"element_022","path":[7,1,7,2]},{"id":"element_023","path":[7,1,7,3]},{"id":"element_024","path":[7,1,7,4]},{"id":"element_025","path":[7,1,7,5]},{"id":"element_026","path":[7,1,8,0]},{"id":"element_027","path":[7,1,8,1]},{"id":"element_028","path":[7,1,8,2]},{"id":"element_029","path":[7,1,8,3]},{"id":"element_030","path":[7,1,8,4]},{"id":"element_031","path":[7,1,8,5]},{"id":"element_032","path":[7,1,9,0]},{"id":"element_033","path":[7,1,9,1]},{"id":"element_034","path":[7,1,9,2]},{"id":"element_035","path":[7,1,9,3]},{"id":"element_036","path":[7,1,9,4]},{"id":"element_037","path":[7,1,9,5]},{"id":"element_038","path":[7,2,0]},{"id":"element_039","path":[7,2,1]},{"id":"element_040","path":[8,0,0]},{"id":"element_041","path":[8,0,1]},{"id":"element_042","path":[8,1,0]},{"id":"element_043","path":[8,1,1]},{"id":"element_044","path":[8,1,2]},{"id":"element_045","path":[8,1,3]},{"id":"element_046","path":[8,1,4]},{"id":"element_047","path":[8,1,5]},{"id":"element_048","path":[8,1,6]},{"id":"copyPath","path":[8,2]},{"id":"element_049","path":[8,3,0]},{"id":"element_050","path":[8,3,1]},{"id":"element_051","path":[8,3,2]},{"id":"element_052","path":[8,3,3]},{"id":"element_053","path":[8,4,0]},{"id":"element_054","path":[8,4,1]},{"id":"element_055","path":[8,4,2]},{"id":"element_056","path":[8,5,0]},{"id":"element_057","path":[8,5,1]},{"id":"element_058","path":[8,5,2]},{"id":"element_059","path":[8,6,0]},{"id":"element_060","path":[8,6,1]},{"id":"element_061","path":[8,6,2]},{"id":"element_062","path":[8,6,3]},{"id":"element_063","path":[9,0,0]},{"id":"element_064","path":[9,0,1]},{"id":"element_065","path":[9,1,0]},{"id":"element_066","path":[9,1,1]},{"id":"element_067","path":[9,1,2]},{"id":"element_068","path":[9,1,3]},{"id":"element_069","path":[9,1,4]},{"id":"element_070","path":[9,1,5]},{"id":"element_071","path":[9,1,6]},{"id":"element_072","path":[9,1,7]},{"id":"exeSelect","path":[9,1,8]},{"id":"element_073","path":[9,1,9]},{"id":"element_074","path":[9,1,10]},{"id":"element_075","path":[9,1,11]},{"id":"element_076","path":[9,1,12]},{"id":"element_077","path":[9,1,13]},{"id":"element_078","path":[9,1,14]},{"id":"element_079","path":[9,1,15]},{"id":"element_080","path":[9,1,16]},{"id":"element_081","path":[9,1,17]},{"id":"element_082","path":[9,2,0]},{"id":"element_083","path":[9,3,0]},{"id":"element_084","path":[9,3,1]},{"id":"element_085","path":[10,0,0]},{"id":"element_086","path":[10,0,1]},{"id":"element_087","path":[10,1,0]},{"id":"element_088","path":[10,1,1]},{"id":"element_089","path":[10,1,2]},{"id":"element_090","path":[10,1,3]},{"id":"element_091","path":[10,1,4]},{"id":"element_092","path":[10,1,5]},{"id":"element_093","path":[10,1,6]},{"id":"cDrive","path":[10,1,7]},{"id":"element_094","path":[10,1,8]},{"id":"element_095","path":[10,1,9]},{"id":"element_096","path":[10,1,10]},{"id":"element_097","path":[10,1,11]},{"id":"element_098","path":[10,1,12]},{"id":"element_099","path":[10,1,13]},{"id":"element_100","path":[10,1,14]},{"id":"element_101","path":[10,1,15]},{"id":"element_102","path":[10,1,16]},{"id":"element_103","path":[10,1,17]},{"id":"element_104","path":[10,1,18]},{"id":"element_105","path":[10,1,19]},{"id":"element_106","path":[10,1,20]},{"id":"element_107","path":[10,1,21]},{"id":"element_108","path":[10,1,22]},{"id":"element_109","path":[10,2,0]},{"id":"element_110","path":[10,2,1]},{"id":"element_111","path":[10,2,2]},{"id":"element_112","path":[10,2,3]},{"id":"element_113","path":[10,3,0]},{"id":"element_114","path":[10,4,0]},{"id":"element_115","path":[10,5,0]},{"id":"element_116","path":[11,0,0]},{"id":"element_117","path":[11,0,1]},{"id":"element_118","path":[11,1,0]},{"id":"element_119","path":[11,1,1]},{"id":"element_120","path":[11,1,2]},{"id":"element_121","path":[11,1,3]},{"id":"element_122","path":[11,1,4]},{"id":"dButton","path":[11,1,5]},{"id":"element_123","path":[11,1,6]},{"id":"element_124","path":[11,1,7]},{"id":"element_125","path":[11,1,8,0]},{"id":"element_126","path":[11,1,8,1]},{"id":"element_127","path":[11,1,8,2]},{"id":"element_128","path":[11,1,8,3]},{"id":"element_129","path":[11,1,9]},{"id":"element_130","path":[11,2,0]},{"id":"element_131","path":[11,3,0]},{"id":"element_132","path":[11,3,1]},{"id":"element_133","path":[12,0,0]},{"id":"element_134","path":[12,0,1]},{"id":"element_135","path":[12,1,0]},{"id":"element_136","path":[12,1,1]},{"id":"element_137","path":[12,1,2]},{"id":"element_138","path":[12,1,3]},{"id":"element_139","path":[12,1,4]},{"id":"element_140","path":[12,1,5]},{"id":"eBar","path":[12,1,6,0]},{"id":"element_142","path":[12,1,7]},{"id":"element_143","path":[12,1,8]},{"id":"element_144","path":[12,2,0]},{"id":"element_145","path":[12,2,1]},{"id":"element_146","path":[12,2,2]}];
export const NativeS03Layers:React.FC<{markup:string}> = ({markup})=>{
 const result=useMemo(()=>pieces(markup,S03_PARTS),[markup]);
 return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width={1080} height={1920}
    style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',overflow:'visible'}}>
   {result.globals}
   <Interactive.G name="S03 — RECT element_001" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_001"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_002" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_002"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_003" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_003"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_004" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_004"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_005" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_005"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_006 — EASY2BOOT" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_006"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_007 — 03 / PERSIAPAN" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_007"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_008" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_008"]}</Interactive.G>
   <Interactive.G name="S03 — RECT timebar" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["timebar"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_009 — EASY2BOOT — SATU USB, BANYAK PILIH" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_009"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_010 — 03/06" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_010"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_011 — BEBERAPA" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_011"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_012 — INSTALLER." style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_012"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_013" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_013"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_014" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_014"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_015" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_015"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_016" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_016"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_017" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_017"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_018" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_018"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_019 — ISI FLASHDISK" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_019"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_020" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_020"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_021" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_021"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_022" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_022"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_023 — Windows 10" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_023"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_024" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_024"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_025" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_025"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_026" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_026"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_027" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_027"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_028" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_028"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_029 — Windows 11" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_029"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_030" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_030"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_031" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_031"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_032" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_032"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_033" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_033"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_034" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_034"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_035 — Linux" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_035"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_036" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_036"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_037" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_037"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_038" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_038"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_039 — DALAM SATU FLASHDISK" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_039"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_040 — PERTAMA," style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_040"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_041 — BACKUP DATA." style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_041"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_042" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_042"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_043" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_043"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_044" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_044"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_045" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_045"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_046" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_046"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_047 — USB DRIVE" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_047"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_048 — E:" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_048"]}</Interactive.G>
   <Interactive.G name="S03 — PATH copyPath" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["copyPath"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_049" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_049"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_050" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_050"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_051" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_051"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_052 — BACKUP" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_052"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_053" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_053"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_054" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_054"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_055" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_055"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_056" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_056"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_057" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_057"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_058" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_058"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_059" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_059"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_060" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_060"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_061" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_061"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_062 — DATA SUDAH AMAN" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_062"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_063 — BUKA" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_063"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_064 — EASY2BOOT." style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_064"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_065" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_065"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_066" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_066"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_067" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_067"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_068 — 📁" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_068"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_069 — Easy2Boot_v2.xx" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_069"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_070" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_070"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_071 — Name" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_071"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_072 — Type" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_072"]}</Interactive.G>
   <Interactive.G name="S03 — RECT exeSelect" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["exeSelect"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_073" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_073"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_074" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_074"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_075" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_075"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_076 — Make_E2B.exe" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_076"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_077 — Application" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_077"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_078 — EXE" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_078"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_079" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_079"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_080" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_080"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_081 — BUKA APLIKASI" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_081"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_082" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_082"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_083" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_083"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_084" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_084"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_085 — PASTIKAN" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_085"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_086 — PILIH USB." style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_086"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_087" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_087"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_088" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_088"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_089" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_089"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_090" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_090"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_091 — Make_E2B.exe" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_091"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_092 — − □ ×" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_092"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_093 — USB DRIVE" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_093"]}</Interactive.G>
   <Interactive.G name="S03 — RECT cDrive" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["cDrive"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_094 — E: USB Flash Drive — 32 GB" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_094"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_095" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_095"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_096" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_096"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_097 — Refresh" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_097"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_098" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_098"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_099" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_099"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_100" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_100"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_101 — Make E2B Drive" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_101"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_102" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_102"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_103" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_103"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_104" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_104"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_105 — Warning:" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_105"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_106 — USB drive will" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_106"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_107 — be erased!" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_107"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_108 — Simulasi UI • Pilih kapasitas & na" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_108"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_109" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_109"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_110" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_110"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_111 — E: USB Flash Drive — 32 GB" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_111"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_112" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_112"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_113" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_113"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_114" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_114"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_115" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_115"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_116 — LALU," style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_116"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_117 — BUAT USB." style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_117"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_118" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_118"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_119" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_119"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_120 — E: USB Flash Drive — 32 GB" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_120"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_121" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_121"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_122" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_122"]}</Interactive.G>
   <Interactive.G name="S03 — RECT dButton" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["dButton"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_123" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_123"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_124 — Make E2B Drive" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_124"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_125" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_125"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_126" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_126"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_127" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_127"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_128 — USB drive will be erased!" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_128"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_129 — SIMULASI TINDAKAN — BACKUP SEBELUM" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_129"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_130" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_130"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_131" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_131"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_132" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_132"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_133 — SELESAI." style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_133"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_134 — USB SIAP." style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_134"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_135" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_135"]}</Interactive.G>
   <Interactive.G name="S03 — CIRCLE element_136" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_136"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_137" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_137"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_138 — USB multiboot selesai" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_138"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_139 — Drive E: • Easy2Boot" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_139"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_140" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_140"]}</Interactive.G>
   <Interactive.G name="S03 — RECT eBar" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["eBar"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_142 — Siap untuk ditambahkan file ISO" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_142"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_143 — 100%" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_143"]}</Interactive.G>
   <Interactive.G name="S03 — RECT element_144" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_144"]}</Interactive.G>
   <Interactive.G name="S03 — PATH element_145" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_145"]}</Interactive.G>
   <Interactive.G name="S03 — TEXT element_146 — _ISO" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_146"]}</Interactive.G>
 </svg>;
};
const S06_PARTS:Piece[]=[{"id":"element_001","path":[1]},{"id":"element_002","path":[2]},{"id":"element_003","path":[3]},{"id":"element_004","path":[4]},{"id":"element_005","path":[5,0]},{"id":"element_006","path":[5,1]},{"id":"element_007","path":[5,2]},{"id":"element_008","path":[5,3]},{"id":"timebar","path":[5,4]},{"id":"element_009","path":[5,5]},{"id":"element_010","path":[5,6]},{"id":"element_011","path":[6,0]},{"id":"element_012","path":[6,1]},{"id":"element_013","path":[6,2]},{"id":"element_014","path":[6,3]},{"id":"element_015","path":[6,4]},{"id":"element_017","path":[6,5,0]},{"id":"element_018","path":[6,6]},{"id":"element_019","path":[6,7]},{"id":"element_020","path":[6,8]},{"id":"element_021","path":[7,0,0]},{"id":"element_022","path":[7,0,1]},{"id":"element_023","path":[7,1,0]},{"id":"element_024","path":[7,1,1]},{"id":"element_025","path":[7,1,2]},{"id":"element_026","path":[7,1,3]},{"id":"element_027","path":[7,1,4]},{"id":"element_028","path":[7,1,5,0]},{"id":"element_029","path":[7,1,5,1]},{"id":"element_030","path":[7,2,0]},{"id":"element_031","path":[7,2,1]},{"id":"element_032","path":[7,2,2]},{"id":"element_033","path":[7,2,3]},{"id":"element_034","path":[7,2,4]},{"id":"element_035","path":[7,3,0]},{"id":"element_036","path":[7,3,1]},{"id":"element_037","path":[7,3,2]},{"id":"element_038","path":[7,3,3]},{"id":"element_039","path":[7,3,4]},{"id":"repeatFill","path":[7,3,5]},{"id":"element_040","path":[8,0,0]},{"id":"element_041","path":[8,0,1]},{"id":"element_042","path":[8,0,2]},{"id":"element_043","path":[8,1,0]},{"id":"element_044","path":[8,1,1]},{"id":"element_045","path":[8,1,2]},{"id":"element_046","path":[8,1,3]},{"id":"element_047","path":[8,1,4]},{"id":"element_048","path":[8,1,5]},{"id":"element_049","path":[8,1,6]},{"id":"element_050","path":[8,1,7]},{"id":"element_051","path":[8,2,0]},{"id":"element_052","path":[8,2,1]},{"id":"element_053","path":[8,2,2]},{"id":"element_054","path":[8,2,3]},{"id":"element_055","path":[8,2,4]},{"id":"element_056","path":[8,3,0]},{"id":"element_057","path":[8,3,1]},{"id":"element_058","path":[8,3,2]},{"id":"element_059","path":[8,3,3]},{"id":"element_060","path":[8,3,4]},{"id":"element_061","path":[8,4,0]},{"id":"element_062","path":[8,4,1]},{"id":"element_063","path":[8,4,2]},{"id":"element_064","path":[8,4,3]},{"id":"element_065","path":[9,0,0]},{"id":"element_066","path":[9,0,1]},{"id":"element_067","path":[9,0,2]},{"id":"element_068","path":[10,0]},{"id":"element_069","path":[10,1,0]},{"id":"element_070","path":[10,1,1]},{"id":"element_071","path":[10,2,0]},{"id":"element_072","path":[10,2,1]},{"id":"element_073","path":[10,2,2]},{"id":"element_074","path":[10,2,3]},{"id":"element_075","path":[10,2,4]},{"id":"element_076","path":[10,2,5]},{"id":"element_077","path":[10,2,6]},{"id":"element_078","path":[10,2,7]},{"id":"element_079","path":[10,3,0]},{"id":"element_080","path":[10,3,1]},{"id":"element_081","path":[10,3,2]},{"id":"element_082","path":[10,3,3]},{"id":"element_083","path":[10,3,4]},{"id":"element_084","path":[10,3,5]},{"id":"element_085","path":[10,3,6]},{"id":"element_086","path":[10,3,7]},{"id":"element_087","path":[10,4,0]},{"id":"element_088","path":[10,4,1]}];
export const NativeS06Layers:React.FC<{markup:string}> = ({markup})=>{
 const result=useMemo(()=>pieces(markup,S06_PARTS),[markup]);
 return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width={1080} height={1920}
    style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',overflow:'visible'}}>
   {result.globals}
   <Interactive.G name="S06 — RECT element_001" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_001"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_002" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_002"]}</Interactive.G>
   <Interactive.G name="S06 — CIRCLE element_003" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_003"]}</Interactive.G>
   <Interactive.G name="S06 — CIRCLE element_004" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_004"]}</Interactive.G>
   <Interactive.G name="S06 — PATH element_008" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_008"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_011 — ISO BERHASIL DIJALANKAN." style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_011"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_012 — INSTALLER TERBUKA." style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_012"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_013" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_013"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_014" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_014"]}</Interactive.G>
   <Interactive.G name="S06 — PATH element_015" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_015"]}</Interactive.G>
   <Interactive.G name="S06 — PATH element_017" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_017"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_018 — Windows Setup" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_018"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_019" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_019"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_020 — Next" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_020"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_021 — KALAU KAMU, BIASANYA..." style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_021"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_022 — BOOTABLE ULANG?" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_022"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_023" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_023"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_024" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_024"]}</Interactive.G>
   <Interactive.G name="S06 — PATH element_025" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_025"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_026 — USB BOOTABLE" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_026"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_027 — Windows 10" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_027"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_028" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_028"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_029 — TERPASANG" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_029"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_030" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_030"]}</Interactive.G>
   <Interactive.G name="S06 — CIRCLE element_031" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_031"]}</Interactive.G>
   <Interactive.G name="S06 — PATH element_032" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_032"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_033 — MAU GANTI INSTALLER" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_033"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_034 — Windows 11" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_034"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_035" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_035"]}</Interactive.G>
   <Interactive.G name="S06 — CIRCLE element_036" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_036"]}</Interactive.G>
   <Interactive.G name="S06 — PATH element_037" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_037"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_038 — BUAT USB LAGI" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_038"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_039" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_039"]}</Interactive.G>
   <Interactive.G name="S06 — RECT repeatFill" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["repeatFill"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_040 — ATAU..." style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_040"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_041 — PAKAI" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_041"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_042 — MULTIBOOT?" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_042"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_043" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_043"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_044" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_044"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_045" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_045"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_046" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_046"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_047" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_047"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_048" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_048"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_049 — EASY2BOOT" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_049"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_050 — MULTIBOOT USB" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_050"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_051" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_051"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_052" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_052"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_053 — 10" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_053"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_054 — Windows" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_054"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_055 — 10" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_055"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_056" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_056"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_057" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_057"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_058 — 11" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_058"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_059 — Windows" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_059"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_060 — 11" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_060"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_061" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_061"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_062" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_062"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_063 — ISO" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_063"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_064 — Linux" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_064"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_065" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_065"]}</Interactive.G>
   <Interactive.G name="S06 — PATH element_066" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_066"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_067 — TULIS DI KOMENTAR" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_067"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_068 — EASY2BOOT" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_068"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_069 — 1 FLASHDISK" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_069"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_070 — BANYAK INSTALLER" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_070"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_071" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_071"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_072" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_072"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_073" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_073"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_074" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_074"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_075" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_075"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_076" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_076"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_077 — EASY2BOOT" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_077"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_078 — MULTIBOOT USB" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_078"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_079" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_079"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_080 — WINDOWS" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_080"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_081 — 10" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_081"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_082" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_082"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_083 — WINDOWS" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_083"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_084 — 11" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_084"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_085" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_085"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_086 — LINUX" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_086"]}</Interactive.G>
   <Interactive.G name="S06 — RECT element_087" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_087"]}</Interactive.G>
   <Interactive.G name="S06 — TEXT element_088 — USB MULTIBOOT" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{result.elements["element_088"]}</Interactive.G>
 </svg>;
};
/** S01 / S02 already use native declarative Interactive nodes in their own scenes. */
export const NativeS01Layers:React.FC<{markup:string}>=()=>null;
export const NativeS02Layers:React.FC<{markup:string}>=()=>null;
export const NativeS05Layers:React.FC<{markup:string}>=()=>null;
