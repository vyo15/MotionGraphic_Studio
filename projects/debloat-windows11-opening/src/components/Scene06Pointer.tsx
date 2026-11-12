import React from 'react';
import {Interactive} from 'remotion';
import {SCENE06} from '../config/scene06';
import {cursorAt, reveal} from '../animations/scene06';
const EDIT={translate:'0px 0px',scale:1,rotate:'0deg'} as const;

/** Hotspot of the SVG is upper-left 0,0. No click on Restart. */
export const Scene06Pointer:React.FC<{seconds:number}>=({seconds:s})=>{
  const pos=cursorAt(s,SCENE06.cursor.keyframes);
  const click=SCENE06.cursor.clickTimes.reduce((v,c)=>Math.max(v,1-Math.abs(s-c)/.17),0);
  const fading=1-reveal(s,8.38,.38);
  return <div style={{position:'absolute',left:pos.x,top:pos.y,zIndex:40,transform:`scale(${1-.12*click})`,opacity:fading,pointerEvents:'none'}}>
    <Interactive.Div
      name="S06 — Cursor / ganti track di config/scene06.ts"
      style={{
        width: 35,
        height: 49,
        translate: '16.8px 121.8px',
        scale: 1,
        rotate: '0deg'
      }}
      from={192}
      durationInFrames={325}
      trimBefore={192}
    >
      <svg width="35" height="49" viewBox="0 0 35 49"><path d="M2 1V38l9-11 6 17 8-4-6-16 14-2z" fill="#FFFFFF" stroke="#192536" strokeWidth="2.5" strokeLinejoin="round"/></svg>
    </Interactive.Div>
    {click>.1?<Interactive.Div name="S06 — Efek klik" style={{position:'absolute',left:-13,top:-13,width:44,height:44,border:'3px solid #DF805F',borderRadius:44,opacity:click*.72,translate:'0px 0px',scale:1,rotate:'0deg'}}/>:null}
  </div>;
};
