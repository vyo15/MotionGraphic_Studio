import React from 'react';
import {Interactive} from 'remotion';
import {SCENE04} from '../config/scene04';
import {between, clamp01, ramp} from '../animations/scene04';
import {PsMark} from './Scene04Windows';
const base={translate:'0px 0px',scale:1,rotate:'0deg'} as const;
const style=(props:React.CSSProperties):React.CSSProperties=>({...props,...base});
const MONO='Cascadia Mono, Consolas, DejaVu Sans Mono, monospace';

/** Accurate one-line command field with a non-verbatim illustrative processing overlay. */
export const Scene04Terminal:React.FC<{seconds:number}>=({seconds:s})=>{
  const t=SCENE04.timing;
  const visible=ramp(s,t.terminalOpen,t.terminalOpen+.42)*(1-ramp(s,t.winutilReveal,t.winutilEnd));
  const progress=clamp01((s-t.commandTypeStart)/(t.commandTypeEnd-t.commandTypeStart));
  const charCount=Math.floor(SCENE04.command.length*progress);
  // The JSX command is a literal in Interactive.Div so direct text editing is supported.
  // Revealing by a stepped-width clip means direct text editing does not detach the animation.
  const commandReveal= `${charCount}ch`;
  const isLoading=s>=t.enter;
  const barOpacity=ramp(s,t.progressStart,t.progressStart+.2)*(1-ramp(s,t.progressEnd,t.progressFadeEnd));
  const barFill=ramp(s,t.progressStart+.08,t.progressEnd-.04);
  const blink=Math.floor(s*3)%2===0;
  return <div style={{position:'absolute',left:SCENE04.position.terminal.x,top:SCENE04.position.terminal.y,width:920,height:732,opacity:visible,transform:`translateY(${(1-visible)*18}px)`,pointerEvents:'none'}}>
    <Interactive.Div name="S04 — Jendela PowerShell / Warna / Posisi" style={{pointerEvents:'auto',position:'absolute',inset:0,borderRadius:22,background:SCENE04.colors.terminal,border:'1px solid #495362',boxShadow:'0 20px 62px rgba(3,10,19,.36)',overflow:'hidden',translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <div style={{height:80,background:'#F2F4F7',display:'flex',alignItems:'center',gap:17,padding:'0 28px',fontFamily:'Segoe UI, Arial, sans-serif',color:'#354253'}}>
        <PsMark size={48}/>
        <Interactive.Div name="S04 — Judul PowerShell Administrator" style={{pointerEvents:'auto',fontSize:24,fontWeight:700,whiteSpace:'nowrap',flex:1,translate:'0px 0px',scale:1,rotate:'0deg'}}>Administrator: Windows PowerShell</Interactive.Div>
        <span style={{fontSize:27,color:'#788492',marginLeft:'auto'}}>–</span><span style={{fontSize:24,color:'#788492'}}>□</span><span style={{fontSize:30,color:'#788492'}}>×</span>
      </div>
      <div style={{position:'relative',margin:0,padding:'32px 21px',color:'#DFE8EF',fontFamily:MONO,fontWeight:400,fontSize:24,lineHeight:1.43,whiteSpace:'nowrap'}}>
        <Interactive.Div name="S04 — Isi terminal Windows PowerShell" style={{pointerEvents:'auto',fontSize:23,color:'#E2E9EF',translate:'0px 0px',scale:1,rotate:'0deg'}}>Windows PowerShell</Interactive.Div>
        <Interactive.Div name="S04 — Isi terminal Copyright" style={{pointerEvents:'auto',fontSize:19,color:'#A8B4C2',marginTop:8,translate:'0px 0px',scale:1,rotate:'0deg'}}>Copyright (C) Microsoft Corporation.</Interactive.Div>
        <Interactive.Div name="S04 — Isi terminal All rights reserved" style={{pointerEvents:'auto',fontSize:19,color:'#A8B4C2',marginTop:2,translate:'0px 0px',scale:1,rotate:'0deg'}}>All rights reserved.</Interactive.Div>
        <div style={{position:'relative',marginTop:35,height:39,display:'flex',alignItems:'center',whiteSpace:'pre',overflow:'visible',fontFamily:MONO,fontSize:20,letterSpacing:'-.55px'}}>
          <Interactive.Div name="S04 — Prompt PowerShell" style={{pointerEvents:'auto',flex:'0 0 auto',color:'#E1EAF2',whiteSpace:'pre',translate:'0px 0px',scale:1,rotate:'0deg'}}>PS C:\Windows\system32&gt; </Interactive.Div>
          <div style={{position:'relative',flex:'1 1 auto',height:35,minWidth:0}}>
            <div style={{position:'relative',maxWidth:'100%',width:isLoading?'100%':commandReveal,overflow:'hidden',height:35,whiteSpace:'pre'}}>
              <Interactive.Div name="S04 — PERINTAH SATU BARIS (edit teks di sini)" style={{pointerEvents:'auto',fontFamily:MONO,fontSize:20,color:'#E2EAF1',whiteSpace:'pre',display:'inline-block',width:'max-content',letterSpacing:'-.55px',translate:'0px 0px',scale:1,rotate:'0deg'}}>irm https://christitus.com/win | iex</Interactive.Div>
            </div>
            {!isLoading&&s>=t.commandTypeStart&&blink ? <span style={{position:'absolute',left:commandReveal,top:2,width:3,height:27,background:'#F7FFFF'}}/> : null}
          </div>
        </div>
        {isLoading?<div style={{height:32,marginTop:9,opacity:blink&&s<10.7?1:.2}}><span style={{display:'inline-block',width:12,height:23,background:'#DCEAF4'}}/></div>:null}
        <Interactive.Div name="S04 — Loading Bar (edit posisi dan warna)" style={{pointerEvents:'auto',position:'absolute',left:25,top:363,width:787,height:125,opacity:barOpacity,translate:'0px 0px',scale:1,rotate:'0deg'}}>
          <Interactive.Div name="S04 — Processing Text" style={{pointerEvents:'auto',fontFamily:MONO,fontSize:22,color:'#CAD9E7',letterSpacing:'.1px',translate:'0px 0px',scale:1,rotate:'0deg'}}>Processing...</Interactive.Div>
          <div style={{width:765,height:25,background:'#303945',borderRadius:13,marginTop:13,overflow:'hidden',border:'1px solid rgba(255,255,255,.09)'}}>
            <div style={{height:'100%',width:`${Math.round(100*barFill)}%`,background:'linear-gradient(90deg,#327FD7,#51B1F5)',borderRadius:13,boxShadow:'0 0 14px rgba(62,170,245,.55)'}}/>
          </div>
          <Interactive.Div name="S04 — Catatan Animasi Proses" style={{pointerEvents:'auto',marginTop:12,fontSize:16,color:'#8DA1B3',fontFamily:'Segoe UI, Arial, sans-serif',translate:'0px 0px',scale:1,rotate:'0deg'}}>Visualisasi proses (bukan output PowerShell asli)</Interactive.Div>
        </Interactive.Div>
      </div>
    </Interactive.Div>
  </div>;
};
