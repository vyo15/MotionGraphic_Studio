import React from 'react';
import {Interactive} from 'remotion';
import {SCENE06} from '../config/scene06';
import {easeOut, reveal} from '../animations/scene06';

const {colors:C}=SCENE06;
const ED={translate:'0px 0px',scale:1,rotate:'0deg'} as const;
const FONT='Inter, Segoe UI, Arial, sans-serif';

/** One continuous evolving object composition; no carousel, no fake comment input. */
export const Scene06CTA:React.FC<{seconds:number;showGrid:boolean}>=({seconds,showGrid})=>{
  const t=seconds-SCENE06.timing.cta.start;
  const on=reveal(t,0,.54);
  const logoIn=reveal(t,.12,.88);
  const logoUp=reveal(t,1.00,1.02);
  const logoSize=.26+.74*easeOut((t-.1)/.9);
  const titleA=reveal(t,1.63,.55),titleB=reveal(t,1.83,.62),question=reveal(t,2.62,.65);
  const optionIn=reveal(t,3.05,.75),optionOut=reveal(t,5.2,.60),bubbleIn=reveal(t,5.44,.76);
  const footer1=reveal(t,6.33,.7),footer2=reveal(t,6.74,.65),line=reveal(t,7.13,.45);
  const shiftY=SCENE06.canvas.ctaLogo.y+(448-SCENE06.canvas.ctaLogo.y)*logoUp;
  return <div style={{position:'absolute',inset:0,opacity:on,fontFamily:FONT,pointerEvents:'none',overflow:'hidden'}}>
    <Interactive.Div name="S06 — Background off-white / warna" style={{position:'absolute',inset:0,background:C.bg,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
    {showGrid?<div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(to right,rgba(165,160,150,.045) 1px,transparent 1px), linear-gradient(to bottom,rgba(165,160,150,.045) 1px,transparent 1px)',backgroundSize:'56px 56px'}}/>:null}
    <div style={{position:'absolute',left:80,top:234,display:'flex',alignItems:'center',gap:21}}>
      <Interactive.Div name="S06 — Aksen coral brand" style={{width:38,height:5,borderRadius:10,background:C.accent,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
      <Interactive.Div name="S06 — Label DEBLOAT WINDOWS 11" style={{fontSize:20,fontWeight:680,letterSpacing:'.8px',color:C.muted,translate:'0px 0px',scale:1,rotate:'0deg'}}>DEBLOAT WINDOWS 11</Interactive.Div>
    </div>
    {/* Windows mark travels upward as the question is built. Four tiles remain separate editable layers. */}
    <div style={{position:'absolute',left:540,top:shiftY,transform:`translate(-50%,-50%) scale(${logoSize})`,opacity:logoIn,width:88,height:88}}>
      {[[0,0],[48,0],[0,48],[48,48]].map(([x,y],i)=><Interactive.Div key={i} name={`S06 — Windows tile ${i+1} / warna / posisi`} style={{position:'absolute',left:x,top:y,width:40,height:40,background:C.uiBlue,borderRadius:7,boxShadow:'0 3px 8px #2866BB24',translate:'0px 0px',scale:1,rotate:'0deg'}}/>)}
    </div>
    <div style={{position:'absolute',left:120,right:120,top:586,textAlign:'center',opacity:reveal(t,1.05,.55),transform:`translateY(${(1-reveal(t,1.05,.55))*14}px)`}}>
      <Interactive.Div name="S06 — Menurut kamu" style={{fontSize:37,fontWeight:650,color:C.muted,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>MENURUT KAMU,</Interactive.Div>
    </div>
    <div style={{position:'absolute',left:84,right:84,top:713,display:'grid',justifyItems:'center'}}>
      <div style={{opacity:titleA,transform:`translateY(${20*(1-titleA)}px)`}}><Interactive.Div name="S06 — DEBLOAT" style={{fontSize:108,fontWeight:820,lineHeight:1.05,letterSpacing:'-3px',color:C.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>DEBLOAT</Interactive.Div></div>
      <div style={{opacity:titleB,transform:`translateY(${20*(1-titleB)}px)`}}><Interactive.Div name="S06 — WINDOWS" style={{fontSize:108,fontWeight:820,lineHeight:1.05,letterSpacing:'-3px',color:C.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>WINDOWS</Interactive.Div></div>
      <div style={{opacity:question,transform:`translateY(${18*(1-question)}px)`,marginTop:19}}><Interactive.Div name="S06 — PERLU NGGAK SIH?" style={{fontSize:45,fontWeight:730,color:C.accent,letterSpacing:'-.5px',translate:'0px 0px',scale:1,rotate:'0deg'}}>PERLU NGGAK SIH?</Interactive.Div></div>
    </div>
    {/* Two alternatives converge into the comment visual: no actual choice is made. */}
    {optionIn>0&&optionOut<1?<div style={{position:'absolute',left:0,top:0,right:0,bottom:0,opacity:optionIn*(1-optionOut)}}>
      <Interactive.Div name="S06 — Pilihan PERLU / posisi" style={{position:'absolute',left:124+(216-124)*optionOut-215*(1-easeOut((t-3.05)/.68)),top:1166+26*optionOut,width:392,height:160,background:'#FFFFFF',border:`1px solid ${C.stroke}`,borderRadius:25,boxShadow:'0 15px 38px rgba(43,39,32,.075)',display:'flex',alignItems:'center',gap:18,padding:'0 30px',boxSizing:'border-box',translate:'0px 0px',scale:1,rotate:'0deg'}}>
        <div style={{width:49,height:49,borderRadius:99,display:'grid',placeItems:'center',background:C.accentSoft,color:C.accent,fontSize:30,fontWeight:700}}>?</div>
        <Interactive.Div name="S06 — PERLU" style={{fontSize:35,fontWeight:710,color:C.ink,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>PERLU</Interactive.Div>
      </Interactive.Div>
      <Interactive.Div name="S06 — Pilihan NGGAK / posisi" style={{position:'absolute',left:568-(216*optionOut)+214*(1-easeOut((t-3.17)/.67)),top:1166+26*optionOut,width:392,height:160,background:'#FFFFFF',border:`1px solid ${C.stroke}`,borderRadius:25,boxShadow:'0 15px 38px rgba(43,39,32,.075)',display:'flex',alignItems:'center',gap:18,padding:'0 30px',boxSizing:'border-box',translate:'0px 0px',scale:1,rotate:'0deg'}}>
        <div style={{width:49,height:49,borderRadius:99,display:'grid',placeItems:'center',background:'#F1F0ED',color:'#90918D',fontSize:30,fontWeight:700}}>?</div>
        <Interactive.Div name="S06 — NGGAK" style={{fontSize:35,fontWeight:710,color:C.ink,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>NGGAK</Interactive.Div>
      </Interactive.Div>
    </div>:null}
    {bubbleIn>0?<div style={{position:'absolute',left:540,top:1220,transform:`translate(-50%,-50%) scale(${.76+.24*easeOut((t-5.44)/.74)})`,opacity:bubbleIn}}>
      <Interactive.Div name="S06 — Bubble komentar / posisi / ukuran" style={{position:'relative',width:320,height:203,translate:'0px 0px',scale:1,rotate:'0deg'}}>
        <svg width="320" height="203" viewBox="0 0 320 203" style={{overflow:'visible'}}>
          <rect x="13" y="14" width="294" height="164" rx="36" fill="#000" opacity=".075"/>
          <rect x="10" y="6" width="294" height="164" rx="36" fill="#FFFFFF" stroke={C.stroke} strokeWidth="2"/>
          <path d="M228 166 260 199 266 164" fill="#FFFFFF" stroke={C.stroke} strokeWidth="2" strokeLinejoin="round"/>
          <path d="M229 168H265" stroke="#FFFFFF" strokeWidth="6"/>
        </svg>
        {[0,1,2].map(i=><Interactive.Div key={i} name={`S06 — Titik komentar ${i+1}`} style={{position:'absolute',left:113+i*48,top:80,width:22,height:22,borderRadius:99,background:C.accent,translate:'0px 0px',scale:1,rotate:'0deg'}}/>)}
      </Interactive.Div>
    </div>:null}
    {footer1>0?<div style={{position:'absolute',left:130,right:130,top:1418,textAlign:'center',opacity:footer1,transform:`translateY(${15*(1-footer1)}px)`}}>
      <Interactive.Div name="S06 — TULIS DI KOLOM" style={{fontSize:35,fontWeight:680,color:C.muted,translate:'0px 0px',scale:1,rotate:'0deg'}}>TULIS DI KOLOM</Interactive.Div>
    </div>:null}
    {footer2>0?<div style={{position:'absolute',left:130,right:130,top:1483,textAlign:'center',opacity:footer2,transform:`translateY(${13*(1-footer2)}px)`}}>
      <Interactive.Div name="S06 — KOMENTAR" style={{fontSize:68,fontWeight:820,letterSpacing:'-1.8px',color:C.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>KOMENTAR</Interactive.Div>
    </div>:null}
    {line>0?<Interactive.Div name="S06 — Garis kecil aksen komentar" style={{position:'absolute',left:540-53*line,top:1564,width:106*line,height:5,borderRadius:12,background:C.accent,translate:'0px 0px',scale:1,rotate:'0deg'}}/>:null}
  </div>;
};
