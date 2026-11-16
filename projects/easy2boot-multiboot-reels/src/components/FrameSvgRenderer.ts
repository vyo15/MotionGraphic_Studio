import type {LayerOverrides, LayerOverride} from '../config/props';
import {LAYER_GEOMETRY} from '../config/layerGeometry';
import {injectSvgTypography} from '../config/typography';

export type FrameTrack = ReadonlyArray<Readonly<Record<string, Readonly<Record<string,string>>>>>;
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const smooth=(n:number)=>n*n*(3-2*n);
const finite=(n:unknown,fallback:number)=>typeof n==='number'&&Number.isFinite(n)?n:fallback;
const interpolate=(a:number,b:number,t:number)=>a+(b-a)*t;
const esc=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const readAttr=(tag:string,name:string)=>tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
const setAttr=(tag:string,name:string,value:string)=>{
 const r=new RegExp(`\\s${name}="[^"]*"`);
 return r.test(tag)?tag.replace(r,` ${name}="${esc(value)}"`):tag.replace(/\/?>(?=$)/,x=>` ${name}="${esc(value)}"${x}`);
};

const effective=(p:LayerOverride,frame:number):LayerOverride=>{
 const k=p.keyframes?.slice().sort((a,b)=>a.frame-b.frame);
 if(!k?.length)return p;
 let left=k[0],right=k[k.length-1],t=0;
 if(frame<=k[0].frame){left=right=k[0];}
 else if(frame>=k[k.length-1].frame){left=right=k[k.length-1];}
 else for(let i=0;i<k.length-1;i++)if(frame>=k[i].frame&&frame<=k[i+1].frame){left=k[i];right=k[i+1];t=(frame-left.frame)/Math.max(1,right.frame-left.frame);break;}
 if(p.easing!=='linear')t=smooth(t);
 const out={...p};
 for(const field of ['x','y','scale','rotation','opacity'] as const){
  const fallback=field==='scale'||field==='opacity'?1:0;
  const a=finite(left[field],finite(p[field],fallback));
  const b=finite(right[field],finite(p[field],fallback));
  out[field]=interpolate(a,b,t);
 }
 return out;
};

/** Editable SVG renderer: frame state + independent editable layer state; no DOM side effects. */
export const frameSvg=(source:string,scene:string,frame:number,tracks:FrameTrack,overrides:LayerOverrides={},font='Inter, Arial, sans-serif',assetBase='/videos/easy2boot-multiboot-reels/images/'):string=>{
 const state=tracks[Math.max(0,Math.min(tracks.length-1,Math.floor(frame)))]??{};
 // This fallback lets Node-based static rendering still load the original SVG.
 if(typeof DOMParser==='undefined'){
  return injectSvgTypography(source.replace(/<[A-Za-z][^>]*\bid="([^"]+)"[^>]*>/g,(tag,id:string)=>{
   let next=tag;for(const [attr,value] of Object.entries(state[id]??{}))if(attr!=='#text')next=setAttr(next,attr,value);
   return next;
  }),font);
 }
 const document=new DOMParser().parseFromString(source,'image/svg+xml');
 const root=document.documentElement;
 if(root.tagName.toLowerCase()==='parsererror')return source;
 const named=Array.from(root.querySelectorAll('[id]')) as SVGElement[];
 const byId=new Map(named.map(n=>[n.id,n]));
 // First reconstruct the existing approved animation, which is always frame-driven.
 for(const [id,attr] of Object.entries(state)){
  const el=byId.get(id);if(!el)continue;
  for(const [key,val] of Object.entries(attr)){
   if(key==='#text')el.textContent=String(val);
   else el.setAttribute(key,String(val));
  }
 }
 const keyPrefix=scene+':';
 const reorder:Element[]=[];
 for(const [key,original] of Object.entries(overrides)){
  if(!key.startsWith(keyPrefix)||!original)continue;
  const id=key.substring(keyPrefix.length);
  const el=byId.get(id);if(!el)continue;
  const p=effective(original,frame);
  const box=LAYER_GEOMETRY[scene]?.[id];
  const cx=box?.cx??540,cy=box?.cy??960;
  const x=finite(p.x,0),y=finite(p.y,0),r=finite(p.rotation,0);
  let sx=finite(p.scale,1),sy=finite(p.scale,1);
  if(p.width!==undefined&&box?.w)sx*=p.width/box.w;
  if(p.height!==undefined&&box?.h)sy*=p.height/box.h;
  let factor=1;let yOffset=0;let presetScale=1;
  if(p.animation){
   const start=(p.animationStartFrame??0)+(p.delayFrames??0);
   const raw=clamp((frame-start)/Math.max(1,p.durationFrames??15));
   const t=p.easing==='linear'?raw:smooth(raw);
   factor=t;
   if(p.animation==='slide-up')yOffset=42*(1-t);
   if(p.animation==='pop')presetScale=.84+.16*t;
  }
  const old=el.getAttribute('transform')??'';
  if(x||y||r||sx!==1||sy!==1||yOffset||presetScale!==1){
   el.setAttribute('transform',`translate(${x} ${y+yOffset}) translate(${cx} ${cy}) rotate(${r}) scale(${sx*presetScale} ${sy*presetScale}) translate(${-cx} ${-cy}) ${old}`.trim());
  }
  const visible=(p.visible!==false)&&(p.startFrame===undefined||frame>=p.startFrame)&&(p.endFrame===undefined||frame<p.endFrame);
  const animatedOpacity=finite(Number(el.getAttribute('opacity')??1),1);
  el.setAttribute('opacity',String(clamp(animatedOpacity*(visible?(p.opacity??1):0)*factor)));
  if(p.fill)el.setAttribute('fill',p.fill);
  if(p.stroke)el.setAttribute('stroke',p.stroke);
  if(p.strokeWidth!==undefined)el.setAttribute('stroke-width',String(p.strokeWidth));
  if(p.fontSize!==undefined)el.setAttribute('font-size',String(p.fontSize));
  if(p.fontWeight!==undefined)el.setAttribute('font-weight',String(p.fontWeight));
  if(p.letterSpacing!==undefined)el.setAttribute('letter-spacing',String(p.letterSpacing));
  if(p.fontFamily){const oldStyle=el.getAttribute('style')??'';el.setAttribute('style',`${oldStyle};font-family:${p.fontFamily.replace(/[;{}<>]/g,'')} !important`);}
  // On deliberate text edits, replace its original tspan fragments, not on ordinary render.
  if(typeof p.text==='string'&&el.tagName.toLowerCase()==='text')el.textContent=p.text;
  if(typeof p.asset==='string'&&p.asset&&box&&box.w>0&&box.h>0){
   const href=assetBase+encodeURIComponent(p.asset);
   while(el.firstChild)el.removeChild(el.firstChild);
   const img=document.createElementNS('http://www.w3.org/2000/svg','image');
   img.setAttribute('x',String(cx-box.w/2));img.setAttribute('y',String(cy-box.h/2));
   img.setAttribute('width',String(box.w));img.setAttribute('height',String(box.h));
   img.setAttribute('href',href);img.setAttribute('preserveAspectRatio','xMidYMid meet');
   el.appendChild(img);
  }
  if(p.zIndex!==undefined&&el.parentElement)reorder.push(el);
 }
 // Reorder only siblings of explicitly changed layers; original order stays intact otherwise.
 for(const el of reorder){
  const parent=el.parentElement;if(!parent)continue;
  const siblings=Array.from(parent.children);
  const target=overrides[`${scene}:${el.id}` as keyof LayerOverrides]?.zIndex??0;
  const pos=Math.max(0,Math.min(siblings.length-1,Math.trunc(target)));
  const without=siblings.filter(x=>x!==el);
  const before=without[pos]??null;
  parent.insertBefore(el,before);
 }
 const result=new XMLSerializer().serializeToString(root);
 return injectSvgTypography(result,font);
};
