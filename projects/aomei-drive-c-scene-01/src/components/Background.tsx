import React from 'react';
import {AbsoluteFill,Interactive} from 'remotion';
import {DESIGN} from '../config/design';
export const Background:React.FC<{showGrid:boolean}>=({showGrid})=><AbsoluteFill style={{background:DESIGN.bg}}>
  <Interactive.Div name="S01 — Latar off-white" style={{position:'absolute',inset:0,background:'#F7F7F5',translate:'0px 0px',scale:1,rotate:'0deg'}} />
  {showGrid?<div style={{position:'absolute',left:0,top:0,width:'100%',height:1430,
   backgroundImage:'linear-gradient(to right, rgba(161,153,141,.043) 1px, transparent 1px),linear-gradient(to bottom,rgba(161,153,141,.043) 1px,transparent 1px)',
   backgroundSize:'92px 92px',maskImage:'linear-gradient(to bottom, transparent 0%, black 13%, black 75%, transparent 100%)',pointerEvents:'none'}}/>:null}
</AbsoluteFill>;
