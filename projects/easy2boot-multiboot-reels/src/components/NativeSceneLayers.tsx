import React,{useMemo} from 'react';
import {Interactive} from 'remotion';

/**
 * One shared, full-size SVG coordinate space (1080 x 1920) per scene.
 * Unlike the previous implementation, individual groups are NOT rendered into
 * cropped, independently viewBox-ed SVG elements. Those crops hid moving artwork.
 *
 * Every Interactive.G is an independent selectable timeline layer in Master 1.8.1.
 * The original animated markup remains frame-driven, preserving the approved
 * preview without a custom external editor.
 */
type Piece={key:string;scope:string;kind:'part'|'whole';indices?:number[];target?:string};
type SceneFragments={globals:string;layers:Record<string,string>};
const rawLayers=(markup:string,pieces:Piece[]):SceneFragments=>{
 if(typeof DOMParser==='undefined')return {globals:'',layers:{}};
 const parsed=new DOMParser().parseFromString(markup,'image/svg+xml');
 const root=parsed.documentElement;
 if(root.tagName.toLowerCase()==='parsererror')return {globals:'',layers:{}};
 const tops=Array.from(root.children).filter(x=>!['defs','style'].includes(x.tagName.toLowerCase()));
 const named=new Map(Array.from(root.querySelectorAll('[id]')).map(x=>[x.id,x]));
 const globalNodes=Array.from(root.children).filter(x=>['defs','style'].includes(x.tagName.toLowerCase()));
 const serializer=new XMLSerializer();
 const globals=globalNodes.map(x=>serializer.serializeToString(x)).join('');
 const layers:Record<string,string>={};
 for(const part of pieces){
  let selected:Element|null=null;
  if(part.kind==='whole')selected=named.get(part.target??'')?.cloneNode(true) as Element|null;
  else if(part.scope==='@root'){
   const container=parsed.createElementNS('http://www.w3.org/2000/svg','g');
   (part.indices??[]).forEach(idx=>{if(tops[idx])container.appendChild(tops[idx].cloneNode(true))});
   selected=container;
  }else{
   const origin=named.get(part.scope);
   if(origin){
    const container=origin.cloneNode(false) as Element;
    const children=Array.from(origin.children);
    (part.indices??[]).forEach(idx=>{if(children[idx])container.appendChild(children[idx].cloneNode(true))});
    selected=container;
   }
  }
  if(!selected){layers[part.key]='';continue;}
  // Preserve ALL ancestral frame-based transforms, opacity, clip and filter.
  if(part.scope!=='@root'){
   const from=part.kind==='whole'?named.get(part.target??''):named.get(part.scope);
   let anc=from?.parentElement;
   while(anc&&anc!==root){
    const outer=anc.cloneNode(false) as Element;
    outer.appendChild(selected);selected=outer;anc=anc.parentElement;
   }
  }
  layers[part.key]=serializer.serializeToString(selected);
 }
 return {globals,layers};
};
const S01_PARTS:Piece[]=[{"key":"S01-layer-01","kind":"part","scope":"@root","indices":[0,1,2,3]},{"key":"S01-layer-02","kind":"whole","scope":"micro","target":"micro"},{"key":"S01-layer-03","kind":"whole","scope":"footer","target":"footer"},{"key":"S01-layer-04","kind":"whole","scope":"A","target":"aheadline"},{"key":"S01-layer-05","kind":"whole","scope":"A","target":"adev"},{"key":"S01-layer-06","kind":"whole","scope":"A","target":"afile"},{"key":"S01-layer-07","kind":"whole","scope":"B","target":"bheadline"},{"key":"S01-layer-08","kind":"whole","scope":"B","target":"bneeded"},{"key":"S01-layer-09","kind":"whole","scope":"B","target":"bflash"},{"key":"S01-layer-10","kind":"whole","scope":"B","target":"bwrong"},{"key":"S01-layer-11","kind":"whole","scope":"B","target":"bsub"},{"key":"S01-layer-12","kind":"whole","scope":"C","target":"cheadline"},{"key":"S01-layer-13","kind":"whole","scope":"C","target":"cpanel"},{"key":"S01-layer-14","kind":"whole","scope":"C","target":"ccursor"},{"key":"S01-layer-15","kind":"whole","scope":"C","target":"cclick"},{"key":"S01-layer-16","kind":"whole","scope":"D","target":"dheadline"},{"key":"S01-layer-17","kind":"whole","scope":"D","target":"dpanel"},{"key":"S01-layer-18","kind":"whole","scope":"D","target":"dstop"}];
export const NativeS01Layers:React.FC<{markup:string}> = ({markup})=>{
 const {globals,layers}=useMemo(()=>rawLayers(markup,S01_PARTS),[markup]);
 return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width={1080} height={1920}
   style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',overflow:'visible'}}>
   <g dangerouslySetInnerHTML={{__html:globals}}/>
   <Interactive.G name="S01 — Latar editorial dan grid" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-01']??''}}/>
   <Interactive.G name="S01 — Header editorial" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-02']??''}}/>
   <Interactive.G name="S01 — Footer editorial" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-03']??''}}/>
   <Interactive.G name="S01 — A — aheadline" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-04']??''}}/>
   <Interactive.G name="S01 — A — adev" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-05']??''}}/>
   <Interactive.G name="S01 — A — afile" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-06']??''}}/>
   <Interactive.G name="S01 — B — bheadline" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-07']??''}}/>
   <Interactive.G name="S01 — B — bneeded" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-08']??''}}/>
   <Interactive.G name="S01 — B — bflash" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-09']??''}}/>
   <Interactive.G name="S01 — B — bwrong" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-10']??''}}/>
   <Interactive.G name="S01 — B — bsub" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-11']??''}}/>
   <Interactive.G name="S01 — C — cheadline" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-12']??''}}/>
   <Interactive.G name="S01 — C — cpanel" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-13']??''}}/>
   <Interactive.G name="S01 — C — ccursor" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-14']??''}}/>
   <Interactive.G name="S01 — C — cclick" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-15']??''}}/>
   <Interactive.G name="S01 — D — dheadline" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-16']??''}}/>
   <Interactive.G name="S01 — D — dpanel" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-17']??''}}/>
   <Interactive.G name="S01 — D — dstop" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S01-layer-18']??''}}/>
 </svg>;
};
const S02_PARTS:Piece[]=[{"key":"S02-layer-01","kind":"part","scope":"@root","indices":[0,1,2,3]},{"key":"S02-layer-02","kind":"whole","scope":"micro","target":"micro"},{"key":"S02-layer-03","kind":"whole","scope":"footer","target":"footer"},{"key":"S02-layer-04","kind":"whole","scope":"A","target":"ahead"},{"key":"S02-layer-05","kind":"whole","scope":"A","target":"progress"},{"key":"S02-layer-06","kind":"whole","scope":"A","target":"noRedo"},{"key":"S02-layer-07","kind":"whole","scope":"A","target":"stopRing"},{"key":"S02-layer-08","kind":"whole","scope":"B","target":"btitle"},{"key":"S02-layer-09","kind":"whole","scope":"B","target":"bbadge"},{"key":"S02-layer-10","kind":"whole","scope":"B","target":"busb"},{"key":"S02-layer-11","kind":"whole","scope":"B","target":"bside"},{"key":"S02-layer-12","kind":"whole","scope":"C","target":"ctitle"},{"key":"S02-layer-13","kind":"whole","scope":"C","target":"cusb"},{"key":"S02-layer-14","kind":"whole","scope":"C","target":"isoWin10"},{"key":"S02-layer-15","kind":"whole","scope":"C","target":"isoWin11"},{"key":"S02-layer-16","kind":"whole","scope":"C","target":"isoLinux"},{"key":"S02-layer-17","kind":"whole","scope":"C","target":"pcounter"},{"key":"S02-layer-18","kind":"whole","scope":"D","target":"dtitle"},{"key":"S02-layer-19","kind":"whole","scope":"D","target":"dpanel"},{"key":"S02-layer-20","kind":"whole","scope":"D","target":"dtag"}];
export const NativeS02Layers:React.FC<{markup:string}> = ({markup})=>{
 const {globals,layers}=useMemo(()=>rawLayers(markup,S02_PARTS),[markup]);
 return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width={1080} height={1920}
   style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',overflow:'visible'}}>
   <g dangerouslySetInnerHTML={{__html:globals}}/>
   <Interactive.G name="S02 — Latar editorial dan grid" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-01']??''}}/>
   <Interactive.G name="S02 — Header editorial" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-02']??''}}/>
   <Interactive.G name="S02 — Footer editorial" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-03']??''}}/>
   <Interactive.G name="S02 — A — ahead" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-04']??''}}/>
   <Interactive.G name="S02 — A — progress" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-05']??''}}/>
   <Interactive.G name="S02 — A — noRedo" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-06']??''}}/>
   <Interactive.G name="S02 — A — stopRing" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-07']??''}}/>
   <Interactive.G name="S02 — B — btitle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-08']??''}}/>
   <Interactive.G name="S02 — B — bbadge" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-09']??''}}/>
   <Interactive.G name="S02 — B — busb" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-10']??''}}/>
   <Interactive.G name="S02 — B — bside" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-11']??''}}/>
   <Interactive.G name="S02 — C — ctitle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-12']??''}}/>
   <Interactive.G name="S02 — C — cusb" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-13']??''}}/>
   <Interactive.G name="S02 — C — isoWin10" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-14']??''}}/>
   <Interactive.G name="S02 — C — isoWin11" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-15']??''}}/>
   <Interactive.G name="S02 — C — isoLinux" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-16']??''}}/>
   <Interactive.G name="S02 — C — pcounter" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-17']??''}}/>
   <Interactive.G name="S02 — D — dtitle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-18']??''}}/>
   <Interactive.G name="S02 — D — dpanel" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-19']??''}}/>
   <Interactive.G name="S02 — D — dtag" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S02-layer-20']??''}}/>
 </svg>;
};
const S03_PARTS:Piece[]=[{"key":"S03-layer-01","kind":"part","scope":"@root","indices":[0,1,2,3]},{"key":"S03-layer-02","kind":"whole","scope":"micro","target":"micro"},{"key":"S03-layer-03","kind":"whole","scope":"footer","target":"footer"},{"key":"S03-layer-04","kind":"whole","scope":"carry","target":"carry"},{"key":"S03-layer-05","kind":"whole","scope":"A","target":"aTitle"},{"key":"S03-layer-06","kind":"whole","scope":"A","target":"aUsb"},{"key":"S03-layer-07","kind":"part","scope":"A","indices":[2]},{"key":"S03-layer-08","kind":"whole","scope":"A","target":"aFolder"},{"key":"S03-layer-09","kind":"whole","scope":"A","target":"file1"},{"key":"S03-layer-10","kind":"whole","scope":"A","target":"file2"},{"key":"S03-layer-11","kind":"whole","scope":"A","target":"aDone"},{"key":"S03-layer-12","kind":"whole","scope":"B","target":"bTitle"},{"key":"S03-layer-13","kind":"whole","scope":"B","target":"bExplorer"},{"key":"S03-layer-14","kind":"whole","scope":"B","target":"bPointer"},{"key":"S03-layer-15","kind":"whole","scope":"B","target":"bClick"},{"key":"S03-layer-16","kind":"whole","scope":"C","target":"cTitle"},{"key":"S03-layer-17","kind":"whole","scope":"C","target":"cWindow"},{"key":"S03-layer-18","kind":"whole","scope":"C","target":"cDrop"},{"key":"S03-layer-19","kind":"whole","scope":"C","target":"cFocus"},{"key":"S03-layer-20","kind":"whole","scope":"C","target":"cPointer"},{"key":"S03-layer-21","kind":"whole","scope":"C","target":"cClick"},{"key":"S03-layer-22","kind":"whole","scope":"D","target":"dTitle"},{"key":"S03-layer-23","kind":"whole","scope":"D","target":"dPanel"},{"key":"S03-layer-24","kind":"whole","scope":"D","target":"dPointer"},{"key":"S03-layer-25","kind":"whole","scope":"D","target":"dClick"},{"key":"S03-layer-26","kind":"whole","scope":"E","target":"eTitle"},{"key":"S03-layer-27","kind":"whole","scope":"E","target":"eProgress"},{"key":"S03-layer-28","kind":"whole","scope":"E","target":"eFolder"}];
export const NativeS03Layers:React.FC<{markup:string}> = ({markup})=>{
 const {globals,layers}=useMemo(()=>rawLayers(markup,S03_PARTS),[markup]);
 return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width={1080} height={1920}
   style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',overflow:'visible'}}>
   <g dangerouslySetInnerHTML={{__html:globals}}/>
   <Interactive.G name="S03 — Latar editorial dan grid" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-01']??''}}/>
   <Interactive.G name="S03 — Header editorial" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-02']??''}}/>
   <Interactive.G name="S03 — Footer editorial" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-03']??''}}/>
   <Interactive.G name="S03 — Penghubung dari scene sebelumnya" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-04']??''}}/>
   <Interactive.G name="S03 — A — aTitle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-05']??''}}/>
   <Interactive.G name="S03 — A — aUsb" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-06']??''}}/>
   <Interactive.G name="S03 — A — panel dan elemen dasar" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-07']??''}}/>
   <Interactive.G name="S03 — A — aFolder" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-08']??''}}/>
   <Interactive.G name="S03 — A — file1" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-09']??''}}/>
   <Interactive.G name="S03 — A — file2" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-10']??''}}/>
   <Interactive.G name="S03 — A — aDone" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-11']??''}}/>
   <Interactive.G name="S03 — B — bTitle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-12']??''}}/>
   <Interactive.G name="S03 — B — bExplorer" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-13']??''}}/>
   <Interactive.G name="S03 — B — bPointer" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-14']??''}}/>
   <Interactive.G name="S03 — B — bClick" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-15']??''}}/>
   <Interactive.G name="S03 — C — cTitle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-16']??''}}/>
   <Interactive.G name="S03 — C — cWindow" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-17']??''}}/>
   <Interactive.G name="S03 — C — cDrop" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-18']??''}}/>
   <Interactive.G name="S03 — C — cFocus" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-19']??''}}/>
   <Interactive.G name="S03 — C — cPointer" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-20']??''}}/>
   <Interactive.G name="S03 — C — cClick" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-21']??''}}/>
   <Interactive.G name="S03 — D — dTitle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-22']??''}}/>
   <Interactive.G name="S03 — D — dPanel" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-23']??''}}/>
   <Interactive.G name="S03 — D — dPointer" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-24']??''}}/>
   <Interactive.G name="S03 — D — dClick" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-25']??''}}/>
   <Interactive.G name="S03 — E — eTitle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-26']??''}}/>
   <Interactive.G name="S03 — E — eProgress" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-27']??''}}/>
   <Interactive.G name="S03 — E — eFolder" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S03-layer-28']??''}}/>
 </svg>;
};
const S04_PARTS:Piece[]=[{"key":"S04-layer-01","kind":"part","scope":"@root","indices":[0,1,2,3]},{"key":"S04-layer-02","kind":"whole","scope":"masthead","target":"masthead"},{"key":"S04-layer-03","kind":"whole","scope":"footer","target":"footer"},{"key":"S04-layer-04","kind":"whole","scope":"carry","target":"carry"},{"key":"S04-layer-05","kind":"whole","scope":"intro","target":"introTitle"},{"key":"S04-layer-06","kind":"whole","scope":"intro","target":"introExplorer"},{"key":"S04-layer-07","kind":"whole","scope":"intro","target":"introPointer"},{"key":"S04-layer-08","kind":"whole","scope":"win10","target":"win10Title"},{"key":"S04-layer-09","kind":"whole","scope":"win10","target":"win10Win"},{"key":"S04-layer-10","kind":"whole","scope":"win10","target":"win10Flying"},{"key":"S04-layer-11","kind":"whole","scope":"win10","target":"win10Cursor"},{"key":"S04-layer-12","kind":"whole","scope":"win11","target":"win11Title"},{"key":"S04-layer-13","kind":"whole","scope":"win11","target":"win11Win"},{"key":"S04-layer-14","kind":"whole","scope":"win11","target":"win11Flying"},{"key":"S04-layer-15","kind":"whole","scope":"win11","target":"win11Cursor"},{"key":"S04-layer-16","kind":"whole","scope":"linux","target":"linuxTitle"},{"key":"S04-layer-17","kind":"whole","scope":"linux","target":"linuxWin"},{"key":"S04-layer-18","kind":"whole","scope":"linux","target":"linuxFlying"},{"key":"S04-layer-19","kind":"whole","scope":"linux","target":"linuxCursor"},{"key":"S04-layer-20","kind":"whole","scope":"final","target":"finalTitle"},{"key":"S04-layer-21","kind":"whole","scope":"final","target":"finalWindow"},{"key":"S04-layer-22","kind":"whole","scope":"final","target":"extraFile"},{"key":"S04-layer-23","kind":"whole","scope":"final","target":"finalChip"}];
export const NativeS04Layers:React.FC<{markup:string}> = ({markup})=>{
 const {globals,layers}=useMemo(()=>rawLayers(markup,S04_PARTS),[markup]);
 return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width={1080} height={1920}
   style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',overflow:'visible'}}>
   <g dangerouslySetInnerHTML={{__html:globals}}/>
   <Interactive.G name="S04 — Latar editorial dan grid" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-01']??''}}/>
   <Interactive.G name="S04 — Header editorial" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-02']??''}}/>
   <Interactive.G name="S04 — Footer editorial" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-03']??''}}/>
   <Interactive.G name="S04 — Penghubung dari scene sebelumnya" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-04']??''}}/>
   <Interactive.G name="S04 — intro — introTitle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-05']??''}}/>
   <Interactive.G name="S04 — intro — introExplorer" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-06']??''}}/>
   <Interactive.G name="S04 — intro — introPointer" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-07']??''}}/>
   <Interactive.G name="S04 — win10 — win10Title" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-08']??''}}/>
   <Interactive.G name="S04 — win10 — win10Win" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-09']??''}}/>
   <Interactive.G name="S04 — win10 — win10Flying" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-10']??''}}/>
   <Interactive.G name="S04 — win10 — win10Cursor" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-11']??''}}/>
   <Interactive.G name="S04 — win11 — win11Title" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-12']??''}}/>
   <Interactive.G name="S04 — win11 — win11Win" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-13']??''}}/>
   <Interactive.G name="S04 — win11 — win11Flying" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-14']??''}}/>
   <Interactive.G name="S04 — win11 — win11Cursor" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-15']??''}}/>
   <Interactive.G name="S04 — linux — linuxTitle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-16']??''}}/>
   <Interactive.G name="S04 — linux — linuxWin" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-17']??''}}/>
   <Interactive.G name="S04 — linux — linuxFlying" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-18']??''}}/>
   <Interactive.G name="S04 — linux — linuxCursor" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-19']??''}}/>
   <Interactive.G name="S04 — final — finalTitle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-20']??''}}/>
   <Interactive.G name="S04 — final — finalWindow" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-21']??''}}/>
   <Interactive.G name="S04 — final — extraFile" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-22']??''}}/>
   <Interactive.G name="S04 — final — finalChip" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S04-layer-23']??''}}/>
 </svg>;
};
const S05_PARTS:Piece[]=[{"key":"S05-layer-01","kind":"part","scope":"@root","indices":[0,1,2,3]},{"key":"S05-layer-02","kind":"whole","scope":"head5","target":"head5"},{"key":"S05-layer-03","kind":"whole","scope":"footer","target":"footer"},{"key":"S05-layer-04","kind":"whole","scope":"carry","target":"carry"},{"key":"S05-layer-05","kind":"whole","scope":"stageA","target":"titleA"},{"key":"S05-layer-06","kind":"whole","scope":"stageA","target":"pcA"},{"key":"S05-layer-07","kind":"whole","scope":"stageA","target":"pcScreenA"},{"key":"S05-layer-08","kind":"whole","scope":"stageA","target":"usbFlying"},{"key":"S05-layer-09","kind":"whole","scope":"stageA","target":"linkPulse"},{"key":"S05-layer-10","kind":"whole","scope":"stageB","target":"titleB"},{"key":"S05-layer-11","kind":"part","scope":"stageB","indices":[1,2,3,4,5]},{"key":"S05-layer-12","kind":"whole","scope":"stageB","target":"bootRows"},{"key":"S05-layer-13","kind":"part","scope":"stageB","indices":[7]},{"key":"S05-layer-14","kind":"whole","scope":"stageC","target":"titleC"},{"key":"S05-layer-15","kind":"part","scope":"stageC","indices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},{"key":"S05-layer-16","kind":"whole","scope":"stageC","target":"highlightFolder"},{"key":"S05-layer-17","kind":"part","scope":"stageC","indices":[23]},{"key":"S05-layer-18","kind":"whole","scope":"stageD","target":"titleD"},{"key":"S05-layer-19","kind":"part","scope":"stageD","indices":[1,2,3,4,5,6,7]},{"key":"S05-layer-20","kind":"whole","scope":"stageD","target":"isoWin11"},{"key":"S05-layer-21","kind":"whole","scope":"stageD","target":"bootAction"},{"key":"S05-layer-22","kind":"whole","scope":"stageD","target":"loading"},{"key":"S05-layer-23","kind":"whole","scope":"stageE","target":"titleE"},{"key":"S05-layer-24","kind":"part","scope":"stageE","indices":[1,2,3]},{"key":"S05-layer-25","kind":"whole","scope":"stageE","target":"winLogo"},{"key":"S05-layer-26","kind":"part","scope":"stageE","indices":[5,6,7,8,9,10,11,12,13]},{"key":"S05-layer-27","kind":"whole","scope":"stageE","target":"doneBadge"},{"key":"S05-layer-28","kind":"whole","scope":"cursor","target":"cursor"}];
export const NativeS05Layers:React.FC<{markup:string}> = ({markup})=>{
 const {globals,layers}=useMemo(()=>rawLayers(markup,S05_PARTS),[markup]);
 return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width={1080} height={1920}
   style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',overflow:'visible'}}>
   <g dangerouslySetInnerHTML={{__html:globals}}/>
   <Interactive.G name="S05 — Latar editorial dan grid" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-01']??''}}/>
   <Interactive.G name="S05 — Header editorial" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-02']??''}}/>
   <Interactive.G name="S05 — Footer editorial" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-03']??''}}/>
   <Interactive.G name="S05 — Penghubung dari scene sebelumnya" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-04']??''}}/>
   <Interactive.G name="S05 — stageA — titleA" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-05']??''}}/>
   <Interactive.G name="S05 — stageA — pcA" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-06']??''}}/>
   <Interactive.G name="S05 — stageA — pcScreenA" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-07']??''}}/>
   <Interactive.G name="S05 — stageA — usbFlying" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-08']??''}}/>
   <Interactive.G name="S05 — stageA — linkPulse" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-09']??''}}/>
   <Interactive.G name="S05 — stageB — titleB" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-10']??''}}/>
   <Interactive.G name="S05 — stageB — panel dan elemen dasar" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-11']??''}}/>
   <Interactive.G name="S05 — stageB — bootRows" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-12']??''}}/>
   <Interactive.G name="S05 — stageB — panel dan elemen dasar" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-13']??''}}/>
   <Interactive.G name="S05 — stageC — titleC" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-14']??''}}/>
   <Interactive.G name="S05 — stageC — panel dan elemen dasar" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-15']??''}}/>
   <Interactive.G name="S05 — stageC — highlightFolder" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-16']??''}}/>
   <Interactive.G name="S05 — stageC — panel dan elemen dasar" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-17']??''}}/>
   <Interactive.G name="S05 — stageD — titleD" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-18']??''}}/>
   <Interactive.G name="S05 — stageD — panel dan elemen dasar" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-19']??''}}/>
   <Interactive.G name="S05 — stageD — isoWin11" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-20']??''}}/>
   <Interactive.G name="S05 — stageD — bootAction" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-21']??''}}/>
   <Interactive.G name="S05 — stageD — loading" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-22']??''}}/>
   <Interactive.G name="S05 — stageE — titleE" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-23']??''}}/>
   <Interactive.G name="S05 — stageE — panel dan elemen dasar" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-24']??''}}/>
   <Interactive.G name="S05 — stageE — winLogo" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-25']??''}}/>
   <Interactive.G name="S05 — stageE — panel dan elemen dasar" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-26']??''}}/>
   <Interactive.G name="S05 — stageE — doneBadge" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-27']??''}}/>
   <Interactive.G name="S05 — Komposisi cursor" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S05-layer-28']??''}}/>
 </svg>;
};
const S06_PARTS:Piece[]=[{"key":"S06-layer-01","kind":"part","scope":"@root","indices":[0,1,2,3]},{"key":"S06-layer-02","kind":"whole","scope":"chrome","target":"chrome"},{"key":"S06-layer-03","kind":"whole","scope":"carry","target":"carry"},{"key":"S06-layer-04","kind":"whole","scope":"problem","target":"problemTitle"},{"key":"S06-layer-05","kind":"whole","scope":"problem","target":"oldUsb"},{"key":"S06-layer-06","kind":"whole","scope":"problem","target":"needCard"},{"key":"S06-layer-07","kind":"whole","scope":"problem","target":"repeatPanel"},{"key":"S06-layer-08","kind":"whole","scope":"multi","target":"multiTitle"},{"key":"S06-layer-09","kind":"whole","scope":"multi","target":"multiUsb"},{"key":"S06-layer-10","kind":"whole","scope":"multi","target":"isoA"},{"key":"S06-layer-11","kind":"whole","scope":"multi","target":"isoB"},{"key":"S06-layer-12","kind":"whole","scope":"multi","target":"isoC"},{"key":"S06-layer-13","kind":"whole","scope":"comment","target":"comment"},{"key":"S06-layer-14","kind":"part","scope":"cover","indices":[0]},{"key":"S06-layer-15","kind":"whole","scope":"cover","target":"coverTitle"},{"key":"S06-layer-16","kind":"whole","scope":"cover","target":"coverUsb"},{"key":"S06-layer-17","kind":"whole","scope":"cover","target":"coverIso"},{"key":"S06-layer-18","kind":"whole","scope":"cover","target":"coverCaption"}];
export const NativeS06Layers:React.FC<{markup:string}> = ({markup})=>{
 const {globals,layers}=useMemo(()=>rawLayers(markup,S06_PARTS),[markup]);
 return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width={1080} height={1920}
   style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',overflow:'visible'}}>
   <g dangerouslySetInnerHTML={{__html:globals}}/>
   <Interactive.G name="S06 — Latar editorial dan grid" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-01']??''}}/>
   <Interactive.G name="S06 — Header dan footer" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-02']??''}}/>
   <Interactive.G name="S06 — Penghubung dari scene sebelumnya" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-03']??''}}/>
   <Interactive.G name="S06 — problem — problemTitle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-04']??''}}/>
   <Interactive.G name="S06 — problem — oldUsb" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-05']??''}}/>
   <Interactive.G name="S06 — problem — needCard" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-06']??''}}/>
   <Interactive.G name="S06 — problem — repeatPanel" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-07']??''}}/>
   <Interactive.G name="S06 — multi — multiTitle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-08']??''}}/>
   <Interactive.G name="S06 — multi — multiUsb" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-09']??''}}/>
   <Interactive.G name="S06 — multi — isoA" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-10']??''}}/>
   <Interactive.G name="S06 — multi — isoB" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-11']??''}}/>
   <Interactive.G name="S06 — multi — isoC" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-12']??''}}/>
   <Interactive.G name="S06 — Komposisi comment" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-13']??''}}/>
   <Interactive.G name="S06 — cover — panel dan elemen dasar" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-14']??''}}/>
   <Interactive.G name="S06 — cover — coverTitle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-15']??''}}/>
   <Interactive.G name="S06 — cover — coverUsb" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-16']??''}}/>
   <Interactive.G name="S06 — cover — coverIso" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-17']??''}}/>
   <Interactive.G name="S06 — cover — coverCaption" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:layers['S06-layer-18']??''}}/>
 </svg>;
};
