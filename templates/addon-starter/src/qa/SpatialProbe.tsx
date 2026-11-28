import React,{useEffect,useState} from 'react';
import {cancelRender,continueRender,delayRender,getRemotionEnvironment,useCurrentFrame,useVideoConfig} from 'remotion';
import {captureSpatialFrame} from './capture-spatial-frame.mjs';
/** Opt-in render-only probe. Never updates visual state, and emits no DOM. */
const ActiveProbe:React.FC<{offset:number;isolate?:string[]}> = ({offset,isolate})=>{
 const frame=useCurrentFrame()+offset,{width,height}=useVideoConfig();
 const [handle]=useState(()=>delayRender('Spatial QA capture'));
 useEffect(()=>{
  let cancelled=false,released=false;const restore:(()=>void)[]=[];
  const release=()=>{if(!released){released=true;continueRender(handle);}};
  const go=async()=>{
   const roots=document.querySelectorAll('[data-qa-root="composition"]');const root=roots[0];if(roots.length!==1||!root)throw Error('Spatial composition root missing');
   // LocalFonts registers FontFace objects asynchronously. fonts.ready alone is not enough
   // before registration. Wait for every declared MG family/weight actually used.
   const needed=new Map<string,{family:string;weight:string}>();
   for(const el of root.querySelectorAll('[data-qa-track], [data-qa-track] *')){const c=getComputedStyle(el),family=c.fontFamily.split(',')[0].trim().replace(/^['"]|['"]$/g,'');if(family.startsWith('MG '))needed.set(family+':'+c.fontWeight,{family,weight:c.fontWeight});}
   const start=performance.now();
   for(;;){if(cancelled)return;const registered=Array.from(document.fonts);if([...needed.values()].every(f=>registered.some(x=>x.family.replace(/^['"]|['"]$/g,'')===f.family&&(()=>{const [min,max=min]=x.weight.split(/\s+/).map(Number);return Number(f.weight)>=min&&Number(f.weight)<=max;})()&&x.status==='loaded')))break;if(performance.now()-start>12000)throw Error('Local font faces missing/not loaded: '+[...needed.keys()].join(', '));await new Promise(r=>setTimeout(r,50));}
   await document.fonts.ready;await new Promise<void>(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r())));
   if(cancelled)return;
   const row=captureSpatialFrame(root,frame,width,height);
   if(isolate?.length){
    if(isolate.length>2||new Set(isolate).size!==isolate.length)throw Error('Invalid QA isolation request');
    for(const id of isolate){const matches=Array.from(root.querySelectorAll('[data-qa-track]')).filter(el=>el.getAttribute('data-qa-track')===id);if(matches.length!==1)throw Error('Isolation layer missing '+id);const el=matches[0] as HTMLElement|SVGElement;const value=el.style.getPropertyValue('opacity'),priority=el.style.getPropertyPriority('opacity');restore.push(()=>{if(value)el.style.setProperty('opacity',value,priority);else el.style.removeProperty('opacity');});el.style.setProperty('opacity','0','important');}
    await new Promise<void>(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r())));if(cancelled)return;
   }
   console.log('MG_SPATIAL_FRAME:'+JSON.stringify({...row,isolationIds:isolate??[]}));release();
  };
  go().catch(e=>{if(!cancelled)cancelRender(e instanceof Error?e:new Error(String(e)));});
  return()=>{cancelled=true;for(const undo of restore.reverse())undo();release();};
 },[frame,width,height,handle,isolate]);
 return null;
};
export const SpatialProbe:React.FC<{enabled?:boolean;offset?:number;isolate?:string[]}>=({enabled,offset=0,isolate})=>{const frame=useCurrentFrame();return enabled&&getRemotionEnvironment().isRendering?<ActiveProbe key={frame} offset={offset} isolate={isolate}/>:null;};
