import React from 'react';
import {Interactive,useCurrentFrame,useVideoConfig} from 'remotion';
import {SceneBase,VoGuide} from '../components/SceneBase';
import {Scene05Windows11} from '../components/Scene05Windows11';
import {AppIcon} from '../components/WindowsUI';
import {VideoProps} from '../config/props';

const cl=(n:number)=>Math.max(0,Math.min(1,n));
const smooth=(x:number)=>{const t=cl(x);return t*t*(3-2*t)};
const r=(t:number,a:number,b:number)=>smooth((t-a)/(b-a));
const band=(t:number,a:number,b:number,c:number,d:number)=>r(t,a,b)*(1-r(t,c,d));
/** 13 s, 390 frames. S04 visual ACC and CTA VO remain unchanged. */
export const Scene05:React.FC<VideoProps>=(p)=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 const demo=1-r(t,5.88,6.38),cta=r(t,6.22,6.73),out=r(t,12.6,12.97);
 const startText=band(t,.28,.66,2.85,3.22),resultText=band(t,3.2,3.55,5.85,6.2);
 return <SceneBase backgroundColor={p.backgroundColor}>
  <Interactive.Div name="S05 Teks — Selesai tinggal login" style={{position:'absolute',left:88,top:337,width:904,textAlign:'center',fontSize:74,fontWeight:760,letterSpacing:-2.5,lineHeight:1.12,color:'#202020',opacity:startText,translate:`0 ${16*(1-startText)}px`}}>Selesai. Tinggal <span style={{color:'#DF805F'}}>login!</span></Interactive.Div>
  <Interactive.Div name="S05 Teks — Excel terbuka otomatis" style={{position:'absolute',left:83,top:337,width:914,textAlign:'center',fontSize:74,fontWeight:760,letterSpacing:-2.5,lineHeight:1.12,color:'#202020',opacity:resultText,translate:`0 ${16*(1-resultText)}px`}}>Excel terbuka <span style={{color:'#DF805F'}}>sendiri.</span></Interactive.Div>
  <Interactive.Div name="S05 Hasil — Windows 11 next login and Excel" style={{position:'absolute',inset:0,opacity:demo,scale:1-0.025*(1-demo),transformOrigin:'center 900px',pointerEvents:'none'}}><Scene05Windows11 seconds={t}/></Interactive.Div>
  <Interactive.Div name="S05 Hasil — Tanpa perlu klik" style={{position:'absolute',left:308,top:1262,width:464,textAlign:'center',fontSize:32,fontWeight:660,color:'#53636D',opacity:band(t,4.15,4.58,5.91,6.18)}}>Terbuka tanpa klik manual</Interactive.Div>

  {/* CTA is its own visual beat, not crowded with the Windows simulation. */}
  <Interactive.Div name="S05 CTA — pertanyaan terkunci" style={{position:'absolute',left:80,top:385,width:920,textAlign:'center',fontSize:72,fontWeight:760,letterSpacing:-2.8,lineHeight:1.15,color:'#202020',opacity:cta*(1-out),translate:`0 ${18*(1-cta)}px`}}>Aplikasi apa yang paling<br/>sering kamu <span style={{color:'#DF805F'}}>buka?</span></Interactive.Div>
  <Interactive.Div name="S05 CTA — area kartu aplikasi" style={{position:'absolute',left:158,top:760,width:764,height:190,display:'flex',justifyContent:'space-between',gap:26,opacity:cta*(1-out)}}>
   <Interactive.Div name="S05 CTA — kartu Excel" style={{position:'relative',width:218,height:190,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:11,background:'#FFFFFF',border:'1px solid #E7E7E5',borderRadius:25,boxShadow:'0 9px 25px #2020200B',opacity:r(t,6.67,7.0),translate:`0 ${Math.round(20*(1-r(t,6.67,7.0)))}px`}}>
    <Interactive.Div name="S05 CTA — ikon Excel" style={{position:'relative'}}><AppIcon kind="excel" size={67}/></Interactive.Div>
    <Interactive.Div name="S05 CTA — label Excel" style={{position:'relative',fontSize:30,fontWeight:650,color:'#202020'}}>Excel</Interactive.Div>
   </Interactive.Div>
   <Interactive.Div name="S05 CTA — kartu Browser" style={{position:'relative',width:218,height:190,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:11,background:'#FFFFFF',border:'1px solid #E7E7E5',borderRadius:25,boxShadow:'0 9px 25px #2020200B',opacity:r(t,6.97,7.3),translate:`0 ${Math.round(20*(1-r(t,6.97,7.3)))}px`}}>
    <Interactive.Div name="S05 CTA — ikon Browser" style={{position:'relative'}}><AppIcon kind="edge" size={67}/></Interactive.Div>
    <Interactive.Div name="S05 CTA — label Browser" style={{position:'relative',fontSize:30,fontWeight:650,color:'#202020'}}>Browser</Interactive.Div>
   </Interactive.Div>
   <Interactive.Div name="S05 CTA — kartu Explorer" style={{position:'relative',width:218,height:190,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:11,background:'#FFFFFF',border:'1px solid #E7E7E5',borderRadius:25,boxShadow:'0 9px 25px #2020200B',opacity:r(t,7.27,7.6),translate:`0 ${Math.round(20*(1-r(t,7.27,7.6)))}px`}}>
    <Interactive.Div name="S05 CTA — ikon Explorer" style={{position:'relative'}}><AppIcon kind="folder" size={67}/></Interactive.Div>
    <Interactive.Div name="S05 CTA — label Explorer" style={{position:'relative',fontSize:30,fontWeight:650,color:'#202020'}}>Explorer</Interactive.Div>
   </Interactive.Div>
  </Interactive.Div>
  <Interactive.Div name="S05 CTA — tulis di komentar" style={{position:'absolute',left:176,top:1090,width:728,height:111,background:'#FFFFFF',border:'2px solid #E7E7E5',borderRadius:26,boxShadow:'0 10px 28px #2020200B',display:'flex',alignItems:'center',gap:22,padding:'0 29px',opacity:band(t,10.05,10.42,12.62,12.98),translate:`0 ${18*(1-r(t,10.05,10.42))}px`}}>
   <svg width="47" height="47" viewBox="0 0 47 47" fill="none" aria-hidden="true"><path d="M6 10 Q6 5 13 5 H34 Q41 5 41 12 V28 Q41 35 34 35 H19 L10 43 V35 Q6 34 6 27 Z" stroke="#DF805F" strokeWidth="3.5" strokeLinejoin="round"/><path d="M15 16 H32 M15 24 H29" stroke="#DF805F" strokeWidth="3" strokeLinecap="round"/></svg>
   <Interactive.Div name="S05 CTA — teks ajakan komentar" style={{position:'relative',fontSize:37,fontWeight:660,color:'#202020'}}>Coba tulis di komentar!</Interactive.Div>
  </Interactive.Div>
  <Interactive.Div name="S05 Transisi — garis coral ke cover" style={{position:'absolute',left:470,top:1240,width:140,height:6,borderRadius:6,background:'#DF805F',opacity:r(t,12.65,12.88)}}/>
  <VoGuide props={p} scene="S05"/>
 </SceneBase>;
};
