import React from 'react';
import {AbsoluteFill,Interactive,useCurrentFrame} from 'remotion';
import {SCENE03_CUES,SCENE04_CUES,TEXT_VO_STYLE} from '../config/sceneTextVO';
import type {Easy2BootScene03Props,LayerOverride} from '../config/props';
const clamp=(t:number)=>Math.max(0,Math.min(1,t));
const smooth=(t:number)=>{const v=clamp(t);return v*v*(3-2*v)};

/** Exactly one text cue is active at a time; authored literals are Studio-direct-editable.
 * If a different value is supplied in composition Props, fall back to the original
 * Props-editable SVG path rather than silently ignore user changes.
 */
export const SceneTextVO:React.FC<{scene:3|4;props:Easy2BootScene03Props}>=({scene,props})=>{
 const frame=useCurrentFrame();
 const cues=scene===3?SCENE03_CUES:SCENE04_CUES;
 const values=scene===3?props.scene03SubtitleLines:props.scene04SubtitleLines;
 const cue=cues.find(c=>frame>=c.from&&frame<c.to);
 if(!cue)return null;
 const key=`S0${scene}:vo-${cue.index}` as keyof typeof props.layerOverrides;
 const user:LayerOverride=props.layerOverrides?.[key]??{};
 if(user.visible===false||(user.startFrame!==undefined&&frame<user.startFrame)||(user.endFrame!==undefined&&frame>=user.endFrame))return null;
 const style=TEXT_VO_STYLE;
 const a=Math.min(smooth((frame-cue.from)/style.enterFrames),smooth((cue.to-frame)/style.exitFrames));
 const label=user.text??values[cue.index]??'';
 const cx=style.x+(user.x??0),cy=style.y+(user.y??0);
 const sourceDefaults=scene===3 ?
  ['Pertama, backup data flashdisk.','Buka Easy2Boot.','Pilih USB yang benar,','lalu buat USB multiboot.'] :
  ['Salin file ISO installer','ke folder masing-masing.','Sesuai sistem operasinya.'];
 const direct=label===sourceDefaults[cue.index] && user.fontSize===undefined && user.fontWeight===undefined && user.fontFamily===undefined && user.fill===undefined && props.fontFamily==='Inter, Arial, sans-serif';
 // These are intentionally direct literal children, not `{value}` rendered by a helper.
 const native=scene===3 ? <>
  {cue.index===0?<Interactive.Text
   name="S03 — VO backup data"
   x={0}
   y={0}
   textAnchor="middle"
   dominantBaseline="middle"
   fontFamily="Inter, Arial, sans-serif"
   fontSize={43}
   fontWeight={760}
   fill="#202628"
   stroke="#F7F7F5"
   strokeWidth={5}
   paintOrder="stroke"
   style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}
  ></Interactive.Text>:null}
  {cue.index===1?<Interactive.Text
   name="S03 — VO buka Easy2Boot"
   x={0}
   y={0}
   textAnchor="middle"
   dominantBaseline="middle"
   fontFamily="Inter, Arial, sans-serif"
   fontSize={43}
   fontWeight={760}
   fill="#202628"
   stroke="#F7F7F5"
   strokeWidth={5}
   paintOrder="stroke"
   style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}
  ></Interactive.Text>:null}
  {cue.index===2?<Interactive.Text
   name="S03 — VO pilih USB"
   x={0}
   y={0}
   textAnchor="middle"
   dominantBaseline="middle"
   fontFamily="Inter, Arial, sans-serif"
   fontSize={43}
   fontWeight={760}
   fill="#202628"
   stroke="#F7F7F5"
   strokeWidth={5}
   paintOrder="stroke"
   style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}
  ></Interactive.Text>:null}
  {cue.index===3?<Interactive.Text name="S03 — VO buat USB" x={0} y={0} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontSize={43} fontWeight={760} fill="#202628" stroke="#F7F7F5" strokeWidth={5} paintOrder="stroke" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>lalu buat USB multiboot.</Interactive.Text>:null}
 </> : <>
  {cue.index===0?<Interactive.Text name="S04 — VO salin ISO" x={0} y={0} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontSize={43} fontWeight={760} fill="#202628" stroke="#F7F7F5" strokeWidth={5} paintOrder="stroke" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>Salin file ISO installer</Interactive.Text>:null}
  {cue.index===1?<Interactive.Text name="S04 — VO folder masing-masing" x={0} y={0} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontSize={43} fontWeight={760} fill="#202628" stroke="#F7F7F5" strokeWidth={5} paintOrder="stroke" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>ke folder masing-masing.</Interactive.Text>:null}
  {cue.index===2?<Interactive.Text name="S04 — VO sesuai sistem" x={0} y={0} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontSize={43} fontWeight={760} fill="#202628" stroke="#F7F7F5" strokeWidth={5} paintOrder="stroke" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>Sesuai sistem operasinya.</Interactive.Text>:null}
 </>;
 return <AbsoluteFill>
  <svg viewBox="0 0 1080 1920" width={1080} height={1920} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
   <g transform={`translate(${cx} ${cy}) rotate(${user.rotation??0}) scale(${user.scale??1})`} opacity={a*(user.opacity??1)}>
    {direct?native:
     <Interactive.G name={`S0${scene} — VO via Props ${cue.index+1}`} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>
      <text x={0} y={0} textAnchor="middle" dominantBaseline="middle" fill={user.fill??style.fill}
        stroke={style.stroke} strokeWidth={style.strokeWidth} paintOrder="stroke" fontSize={user.fontSize??style.fontSize}
        fontWeight={user.fontWeight??style.fontWeight} fontFamily={user.fontFamily??props.fontFamily??style.fontFamily}>{label}</text>
     </Interactive.G>}
   </g>
  </svg>
 </AbsoluteFill>;
};
