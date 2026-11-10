import React from 'react';
import {Interactive} from 'remotion';
import {SCENE04} from '../config/scene04';
import {ramp} from '../animations/scene04';
const edit={translate:'0px 0px',scale:1,rotate:'0deg'} as const;
const style=(p:React.CSSProperties):React.CSSProperties=>({...p,...edit});
const tabs=['Install','Tweaks','Config','Updates','MicroWin'] as const;
const appsA=['Chrome','Firefox','Brave','Vivaldi'];
const appsB=['Discord','Telegram','Signal','Zoom'];
/** Editable recreation of the WinUtil Install UI, not a flattened screenshot. */
export const Scene04WinUtil:React.FC<{seconds:number}>=({seconds:s})=>{
  const t=SCENE04.timing;
  const a=ramp(s,t.winutilReveal,t.winutilEnd);
  return <div style={{position:'absolute',left:90,top:630,width:900,height:820,opacity:a,transform:`translateY(${(1-a)*22}px)`,fontFamily:'Inter, Segoe UI, Arial, sans-serif',pointerEvents:'none'}}>
    <Interactive.Div name="S04 — Jendela WinUtil" style={{position:'absolute',inset:0,background:'#F7F9FA',borderRadius:21,border:'1px solid #C9D1DA',boxShadow:'0 23px 66px rgba(9,27,42,.28)',overflow:'hidden',translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <Interactive.Div name="S04 — Judul Jendela WinUtil" style={{height:74,background:'#EEF1F4',fontSize:26,color:'#334151',fontWeight:680,display:'flex',alignItems:'center',paddingLeft:28,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Chris Titus Tech's Windows Utility</Interactive.Div>
      <div style={{position:'absolute',right:22,top:21,color:'#77848D',fontSize:24}}>–　□　×</div>
      <div style={{display:'flex',margin:'20px 24px 0',gap:9}}>
        {tabs.map((tab,i)=><Interactive.Div key={tab} name={`S04 — Tab WinUtil ${tab}`} style={{flex:1,height:61,display:'grid',placeItems:'center',fontSize:22,fontWeight:i===0?710:500,color:i===0?'#38475B':'#637080',background:i===0?'#DDE7F4':'#EDF0F3',borderRadius:10,border:'1px solid #DAE1E8',translate:'0px 0px',scale:1,rotate:'0deg'}}>{tab}</Interactive.Div>)}
      </div>
      <div style={{margin:'23px 34px',height:498,background:'#FFFFFF',borderRadius:14,border:'1px solid #E3E8EC',padding:'35px 28px'}}>
        <div style={{display:'flex',gap:37}}>
          <div style={{flex:1}}>
            <Interactive.Div name="S04 — WinUtil Browsers" style={{fontSize:26,fontWeight:710,color:'#293541',translate:'0px 0px',scale:1,rotate:'0deg'}}>Browsers</Interactive.Div>
            {appsA.map(a=><div key={a} style={{display:'flex',gap:15,alignItems:'center',marginTop:23}}>
              <span style={{display:'inline-block',width:24,height:24,background:'white',border:'2px solid #B1BEC8',borderRadius:4}}/>
              <Interactive.Div name={`S04 — WinUtil Item ${a}`} style={{fontSize:23,color:'#3A4B59',translate:'0px 0px',scale:1,rotate:'0deg'}}>{a}</Interactive.Div>
            </div>)}
          </div>
          <div style={{flex:1}}>
            <Interactive.Div name="S04 — WinUtil Communications" style={{fontSize:26,fontWeight:710,color:'#293541',translate:'0px 0px',scale:1,rotate:'0deg'}}>Communications</Interactive.Div>
            {appsB.map(a=><div key={a} style={{display:'flex',gap:15,alignItems:'center',marginTop:23}}>
              <span style={{display:'inline-block',width:24,height:24,background:'white',border:'2px solid #B1BEC8',borderRadius:4}}/>
              <Interactive.Div name={`S04 — WinUtil Item ${a}`} style={{fontSize:23,color:'#3A4B59',translate:'0px 0px',scale:1,rotate:'0deg'}}>{a}</Interactive.Div>
            </div>)}
          </div>
        </div>
        <div style={{height:1,background:'#E4EAF0',marginTop:38}}/>
        <Interactive.Div name="S04 — WinUtil Choose only what you need" style={{marginTop:19,fontSize:19,color:'#75828E',translate:'0px 0px',scale:1,rotate:'0deg'}}>Choose only what you need.</Interactive.Div>
        <Interactive.Div name="S04 — WinUtil Install Selected" style={{position:'absolute',right:60,bottom:97,padding:'16px 30px',borderRadius:10,border:'1px solid #C3CFD9',fontSize:19,color:'#526475',background:'#EEF2F6',translate:'0px 0px',scale:1,rotate:'0deg'}}>Install Selected</Interactive.Div>
      </div>
    </Interactive.Div>
  </div>;
};
