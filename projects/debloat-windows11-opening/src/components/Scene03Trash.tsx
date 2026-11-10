import React from 'react';
import {Interactive} from 'remotion';
import {AppIcon} from './AppIcons';
import {SCENE03} from '../config/scene03';
import {fadeOut, mix, rise} from '../animations/presets';

const clamp=(v:number)=>Math.min(1,Math.max(0,v));
const smooth=(v:number)=>{const p=clamp(v);return p*p*(3-2*p)};

type AppName = 'Xbox' | 'Bing Search' | 'Copilot';
const FLIGHTS: {name:AppName;start:number;end:number;fromX:number;fromY:number}[] = [
  {name:'Xbox',...SCENE03.timing.appFlights.xbox,fromX:274,fromY:816},
  {name:'Bing Search',...SCENE03.timing.appFlights.bing,fromX:540,fromY:816},
  {name:'Copilot',...SCENE03.timing.appFlights.copilot,fromX:806,fromY:816},
];

/** Individual icon on its own Interactive image layer, with deterministic wrapper movement. */
export const TrashFlyingApp: React.FC<{which:AppName; seconds:number}> = ({which,seconds}) => {
  const item=FLIGHTS.find(v=>v.name===which)!;
  const intro=rise(seconds,.30,.85);
  const before=seconds<item.start;
  const p=smooth((seconds-item.start)/(item.end-item.start));
  if(seconds>=item.end)return null;
  const x=before?item.fromX:mix(item.fromX,540,p);
  const y=before?item.fromY+mix(30,0,intro)+Math.sin(seconds*1.8+item.fromX)*4:
    mix(item.fromY,1270,p)-136*Math.sin(Math.PI*p);
  const size=before?1:mix(1,.09,p);
  const rotate=before?0:mix(0,which==='Bing Search'?16:-17,p);
  const opacity=before?intro:fadeOut(p,.78,1);
  if(opacity<.005)return null;
  return <div style={{position:'absolute',left:x-115,top:y-124,width:230,height:248,opacity,
    transform:`rotate(${rotate}deg) scale(${size})`,transformOrigin:'50% 50%'}}>
    <Interactive.Div name={`S03 — Kartu Icon ${which}`} style={{position:'absolute',inset:0,background:'#FFFFFF',border:'2px solid #EAE9E6',borderRadius:32,
      boxShadow:'0 15px 35px rgba(36,42,52,0.10)',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
    {which==='Xbox' ? <>
      <Interactive.Div name="S03 — Ikon Xbox (terbang)" style={{position:'absolute',left:51,top:25,width:128,height:128,translate:'0px 0px',scale:1,rotate:'0deg'}}><AppIcon app="Xbox" size={128}/></Interactive.Div>
      <Interactive.Div name="S03 — Teks Xbox" style={{position:'absolute',left:9,top:176,width:212,fontSize:29,color:'#242A34',fontWeight:650,textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>Xbox</Interactive.Div>
    </> : which==='Bing Search'? <>
      <Interactive.Div name="S03 — Ikon Bing Search (terbang)" style={{position:'absolute',left:51,top:25,width:128,height:128,translate:'0px 0px',scale:1,rotate:'0deg'}}><AppIcon app="Bing Search" size={128}/></Interactive.Div>
      <Interactive.Div name="S03 — Teks Bing Search" style={{position:'absolute',left:9,top:176,width:212,fontSize:27,color:'#242A34',fontWeight:650,textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>Bing Search</Interactive.Div>
    </> : <>
      <Interactive.Div name="S03 — Ikon Copilot (terbang)" style={{position:'absolute',left:51,top:25,width:128,height:128,translate:'0px 0px',scale:1,rotate:'0deg'}}><AppIcon app="Copilot" size={128}/></Interactive.Div>
      <Interactive.Div name="S03 — Teks Copilot" style={{position:'absolute',left:9,top:176,width:212,fontSize:29,color:'#242A34',fontWeight:650,textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>Copilot</Interactive.Div>
    </>}
  </div>;
};

/** Fully vector/editor-selectable bin: independent body, lid and status, no screenshot flattening. */
export const Scene03Trash: React.FC<{seconds:number}> = ({seconds}) => {
  const enter=rise(seconds,.4,1.05);
  const open=rise(seconds,.8,1.6)*fadeOut(seconds,6.4,7.1);
  const {bin}=SCENE03.positions;
  const count=FLIGHTS.filter(x=>seconds>=x.end).length;
  return <div style={{position:'absolute',left:bin.x,top:bin.y,width:bin.width,height:bin.height,
    opacity:enter,transform:`translateY(${mix(36,0,enter)}px)`}}>
    <Interactive.Div name="S03 — Tong Sampah SVG Badan" style={{position:'absolute',left:0,top:20,width:340,height:436,translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <svg viewBox="0 0 340 436" width="340" height="436" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="170" cy="407" rx="153" ry="17" fill="#202631" opacity=".09"/>
        <rect x="27" y="48" width="286" height="354" rx="34" stroke="#5F676F" strokeWidth="7" fill="#FCFCFC"/>
        <rect x="56" y="78" width="229" height="285" rx="23" fill="#F6F6F5"/>
        <path d="M108 125V333 M170 125V333 M233 125V333" stroke="#A8AEAE" strokeWidth="10" strokeLinecap="round"/>
        <rect x="10" y="28" width="320" height="32" rx="16" fill="#545B64"/>
      </svg>
    </Interactive.Div>
    <div style={{position:'absolute',left:1,top:mix(0,-90,open),width:338,height:77,
      transform:`rotate(${mix(0,-6,open)}deg)`,transformOrigin:'15% 65%'}}>
      <Interactive.Div name="S03 — Tutup Tong Sampah SVG" style={{position:'absolute',inset:0,translate:'0px 0px',scale:1,rotate:'0deg'}}>
        <svg viewBox="0 0 338 77" width="338" height="77" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 37L332 31L334 58L3 62Z" fill="#424951"/>
          <rect x="132" y="8" width="74" height="32" rx="11" fill="#424951"/>
        </svg>
      </Interactive.Div>
    </div>
    {seconds>=3.45?<div style={{position:'absolute',left:-24,top:392,width:388,opacity:rise(seconds,3.45,3.76),textAlign:'center'}}>
      {count===3?<Interactive.Div name="S03 — Status Simulasi Selesai" style={{fontSize:23,fontWeight:650,color:'#22996F',background:'#F1F9F4',padding:'10px 5px',borderRadius:22,translate:'0px 0px',scale:1,rotate:'0deg'}}>SIMULASI SELESAI</Interactive.Div>
       :count===2?<Interactive.Div name="S03 — Status 2 dari 3" style={{fontSize:22,fontWeight:630,color:'#22996F',background:'#F1F9F4',padding:'10px 5px',borderRadius:22,translate:'0px 0px',scale:1,rotate:'0deg'}}>2 / 3 APLIKASI DIBERSIHKAN</Interactive.Div>
       :count===1?<Interactive.Div name="S03 — Status 1 dari 3" style={{fontSize:22,fontWeight:630,color:'#22996F',background:'#F1F9F4',padding:'10px 5px',borderRadius:22,translate:'0px 0px',scale:1,rotate:'0deg'}}>1 / 3 APLIKASI DIBERSIHKAN</Interactive.Div>
       :<Interactive.Div name="S03 — Status 0 dari 3" style={{fontSize:22,fontWeight:630,color:'#22996F',background:'#F1F9F4',padding:'10px 5px',borderRadius:22,translate:'0px 0px',scale:1,rotate:'0deg'}}>0 / 3 APLIKASI DIBERSIHKAN</Interactive.Div>}
    </div>:null}
  </div>;
};
