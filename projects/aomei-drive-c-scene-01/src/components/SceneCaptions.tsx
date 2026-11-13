import React from 'react';
import {Interactive} from 'remotion';
import {hold} from '../animations/presets';
import {SCENE01} from '../config/scene01';

/** Literal text makes each word group editable directly in native Remotion Studio. */
const CaptionBox:React.FC<{visible:number;children:React.ReactNode}>=({visible,children})=><div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',opacity:visible,transform:`translateY(${(1-visible)*12}px)`}}>{children}</div>;
export const SceneCaptions:React.FC<{seconds:number}>=({seconds:s})=>{
 const a=SCENE01.captions;
 const v=(i:number)=>hold(s,a[i].from,.15,a[i].to-.17,.17);
 return <div style={{position:'relative',height:96,width:900,fontFamily:'Inter, Segoe UI, Arial, sans-serif',textAlign:'center',pointerEvents:'none'}}>
  <CaptionBox visible={v(0)}><Interactive.Div name="S01 — Subtitle 01 Waktu Drive C penuh" style={{fontSize:44,fontWeight:740,color:'#27292A',letterSpacing:'-.8px',whiteSpace:'nowrap',pointerEvents:'auto',translate:'0px 0px',scale:1,rotate:'0deg'}}>Waktu Drive C penuh,</Interactive.Div></CaptionBox>
  <CaptionBox visible={v(1)}><Interactive.Div name="S01 — Subtitle 02 pernah nggak kepikiran" style={{fontSize:44,fontWeight:740,color:'#27292A',letterSpacing:'-.8px',whiteSpace:'nowrap',pointerEvents:'auto',translate:'0px 0px',scale:1,rotate:'0deg'}}>pernah nggak kepikiran</Interactive.Div></CaptionBox>
  <CaptionBox visible={v(2)}><Interactive.Div name="S01 — Subtitle 03 buat nambahin kapasitasnya" style={{fontSize:42,fontWeight:740,color:'#27292A',letterSpacing:'-1px',whiteSpace:'nowrap',pointerEvents:'auto',translate:'0px 0px',scale:1,rotate:'0deg'}}>buat nambahin kapasitasnya</Interactive.Div></CaptionBox>
  <CaptionBox visible={v(3)}><Interactive.Div name="S01 — Subtitle 04 dari Drive D" style={{fontSize:44,fontWeight:740,color:'#27292A',letterSpacing:'-.8px',whiteSpace:'nowrap',pointerEvents:'auto',translate:'0px 0px',scale:1,rotate:'0deg'}}>dari Drive D?</Interactive.Div></CaptionBox>
 </div>;
};
