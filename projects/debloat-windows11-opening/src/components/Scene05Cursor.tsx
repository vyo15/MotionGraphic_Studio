import React from 'react';
import {Interactive} from 'remotion';
import {SCENE05} from '../config/scene05';
import {s05cursor,s05clamp} from '../animations/scene05';

/** Kursor v5: lintasan kontinu melengkung; transformasi user pada SVG terpisah. */
export const Scene05Cursor:React.FC<{seconds:number}>=({seconds:s})=>{
  const {x,y}=s05cursor(s,SCENE05.cursorKeyframes);
  const click=SCENE05.clickTimes.reduce((v,c)=>Math.max(v,s05clamp(1-Math.abs(s-c)/.18)),0);
  return <div style={{position:'absolute',left:x,top:y,zIndex:20,pointerEvents:'none',transform:`translate(${click*1.5}px, ${click*1.5}px)`}}>
    {click>.001?<div style={{position:'absolute',left:-15,top:-15,width:43,height:43,border:'3px solid #D8876D',opacity:click*.75,borderRadius:'50%',transform:`scale(${1.5-click*.45})`}}/>:null}
    <Interactive.Div name="S05 — Kursor mouse / atur X Y scale rotation" style={{width:42,height:56,translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <svg width="42" height="56" viewBox="0 0 42 56"><path d="M3 3v40l11-11 10 18 9-5-11-19 15-2Z" fill="#FDFDFE" stroke="#1D2636" strokeWidth="2.5" strokeLinejoin="round"/></svg>
    </Interactive.Div>
  </div>;
};
