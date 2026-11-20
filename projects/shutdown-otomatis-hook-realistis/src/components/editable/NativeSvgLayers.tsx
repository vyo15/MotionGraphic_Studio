import React,{useMemo} from 'react';
import {Interactive} from 'remotion';
/**
 * Preserve the approved stickman source SVG geometry exactly. Each top-level
 * data-layer group becomes a separate Interactive.G (selectable in Remotion Studio).
 * Never rasterize the character and never use GIF/sprite frames.
 */
export function splitSvgLayers(markup:string):{defs:string;layers:Array<{name:string,html:string}>}{
 const defs=markup.match(/<defs\b[^>]*>[\s\S]*?<\/defs>/)?.[0]??'';
 const layers:Array<{name:string,html:string}>=[];
 const top=/<g\s+data-layer="([^"]+)"[^>]*>/g;
 let m:RegExpExecArray|null;
 while((m=top.exec(markup))!==null){
  const start=m.index;
  const token=/<\/?g\b[^>]*>/g;token.lastIndex=start;
  let depth=0,end=-1,part:RegExpExecArray|null;
  while((part=token.exec(markup))!==null){
   depth+=part[0].startsWith('</')?-1:1;
   if(depth===0){end=token.lastIndex;break;}
  }
  if(end<0)throw new Error(`Unclosed layer ${m[1]}`);
  layers.push({name:m[1],html:markup.slice(start,end)});
  top.lastIndex=end;
 }
 return {defs,layers};
}
export const NativeSvgLayers:React.FC<{markup:string;sceneId:'S01'|'S02'}>=({markup,sceneId})=>{
 const parsed=useMemo(()=>splitSvgLayers(markup),[markup]);
 return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 960" width="100%" height="100%" style={{position:'absolute',inset:0,overflow:'visible'}}>
  <g dangerouslySetInnerHTML={{__html:parsed.defs}}/>
  {parsed.layers.map((l,i)=><Interactive.G key={`${sceneId}-${i}`} name={`${sceneId} · ${l.name.replace(/^S0[12] · /,'')}`} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}} dangerouslySetInnerHTML={{__html:l.html}}/>)}
 </svg>;
};
