import React from 'react';
import {SnipIcon,WindowsIcon} from './Icons';
import {CONFIG} from '../config/video';
import {interpolate,Easing} from 'remotion';

const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const ease=(v:number)=>Easing.inOut(Easing.cubic)(clamp(v));

/** Pure SVG wallpaper: original, independent editable vector shapes. */
const Wallpaper:React.FC = () => <svg viewBox="0 0 924 601" preserveAspectRatio="xMidYMid slice" className="wssWallpaper" aria-label="Windows 11 inspired blue wallpaper">
  <defs>
    <linearGradient id="wss-bg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#174AA1"/><stop offset=".53" stopColor="#0B265B"/><stop offset="1" stopColor="#061936"/></linearGradient>
    <linearGradient id="wss-bloom" x1="0" y1="0" x2="1" y2=".85"><stop stopColor="#B5EAFF"/><stop offset=".16" stopColor="#52BBFF"/><stop offset=".53" stopColor="#236DE3"/><stop offset="1" stopColor="#103A9A"/></linearGradient>
    <linearGradient id="wss-bloom2" x1=".1" y1="0" x2=".95" y2="1"><stop stopColor="#5ACFFF"/><stop offset=".4" stopColor="#0E5CD6"/><stop offset="1" stopColor="#082859"/></linearGradient>
    <filter id="wss-shadow"><feGaussianBlur stdDeviation="13"/></filter>
  </defs>
  <rect width="924" height="601" fill="url(#wss-bg)"/>
  <path d="M236 476C339 416 440 243 627 157c133-61 231-22 229 50-2 89-161 96-242 169S358 552 236 476Z" fill="#0A2A6B" opacity=".9" filter="url(#wss-shadow)"/>
  <path d="M137 488c151-119 318-254 486-306 78-25 159-28 208 29 47 55 17 143-39 179-67 44-167 3-248 55-89 58-254 108-407 43Z" fill="url(#wss-bloom)"/>
  <path d="M213 483c117-102 313-242 442-268 80-16 147-1 169 39 15 29-7 50-44 67-94 42-171-3-269 62-99 65-208 118-298 100Z" fill="url(#wss-bloom2)" stroke="#7BD9FF" strokeOpacity=".5" strokeWidth="3"/>
  <path d="M270 505c134-56 248-124 346-180 97-55 156-36 177-14-41 22-107 12-177 62-88 63-211 123-346 132Z" fill="#1A64CE" opacity=".85"/>
  <path d="M270 506c190-25 259-143 375-163 63-11 116-9 136-31" stroke="#A0E5FF" strokeWidth="5" fill="none" opacity=".65"/>
  <path d="M193 465c143-160 303-248 441-284 121-32 193 14 208 55" stroke="#C4EFFF" strokeWidth="4" fill="none" opacity=".5"/>
</svg>;

const FakeBrowser: React.FC = ()=><div className="wssBrowser">
  <div className="wssBrowserTabs"><div className="wssEdgeLogo">e</div><div className="wssBrowserTab">✨  Dashboard Tim <span className="wssTabClose">×</span></div><div className="wssTabPlus">＋</div><div className="wssWindowButtons">─　□　×</div></div>
  <div className="wssAddressBar"><span>‹</span><span>›</span><span>⟳</span><div className="wssUrl">♧　https://dashboard.local/overview</div><span style={{color:'#708399'}}>☆</span><span>⋯</span></div>
  <div className="wssWebContent">
    <div className="wssSidebar"><div className="wssBrandMark">◈</div><span className="wssSidebarActive">▦</span><span>▤</span><span>▥</span><span>⚙</span></div>
    <div className="wssPage">
      <div className="wssPageTop"><span>Workspace / Overview</span><div className="wssUser">AM</div></div>
      <div className="wssPageHello">Project Overview</div>
      <div className="wssPageMinor">Ringkasan aktivitas tim hari ini</div>
      <div className="wssMetrics"><div><span>Task selesai</span><b>128</b><small>↗ 12.5%</small></div><div><span>Proyek aktif</span><b>08</b><small>↗ 4.2%</small></div><div><span>Produktivitas</span><b>96%</b><small>● On track</small></div></div>
      <div className="wssChartGroup"><div className="wssGraph"><div className="wssChartTitle">Aktivitas Mingguan</div><svg viewBox="0 0 370 110" width="100%" height="113" aria-label="Area chart">
        <defs><linearGradient id="wssArea" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#377DFF" stopOpacity=".3"/><stop offset="1" stopColor="#377DFF" stopOpacity="0"/></linearGradient></defs>
        <path d="M8 89H362M8 63H362M8 37H362M8 11H362" stroke="#E7EEF8" strokeWidth="1"/>
        <path d="M8 84C49 77 64 53 102 63S179 74 211 41 272 52 306 21 341 31 362 8V103H8Z" fill="url(#wssArea)"/>
        <path d="M8 84C49 77 64 53 102 63S179 74 211 41 272 52 306 21 341 31 362 8" fill="none" stroke="#3F86EE" strokeWidth="4" strokeLinecap="round"/>
      </svg><div className="wssGraphMonths">Sen　 Sel　 Rab　 Kam　 Jum　 Sab　 Min</div></div>
      <div className="wssActivity"><b>Progress</b><div className="wssProgressItem"><i style={{background:'#5C9BFA'}}/> UI Design <strong>90%</strong></div><div className="wssProgressBar"><em style={{width:'90%'}}/></div><div className="wssProgressItem"><i style={{background:'#42CFC1'}}/> Development <strong>72%</strong></div><div className="wssProgressBar"><em style={{width:'72%',background:'#42CFC1'}}/></div><div className="wssProgressItem"><i style={{background:'#FBBF6E'}}/> Testing <strong>48%</strong></div><div className="wssProgressBar"><em style={{width:'48%',background:'#FBBF6E'}}/></div></div></div>
    </div>
  </div>
</div>;

export const Desktop:React.FC<{time:number}> = ({time}) => {
 const tl=CONFIG.timeline;
 const overlay=clamp((time-tl.overlay)/.29)* (1-clamp((time-tl.capture)/.16));
 const selecting=clamp((time-tl.selectionStart)/.26);
 const progress=ease((time-tl.selectionStart)/ (tl.selectionEnd-tl.selectionStart));
 const {startX,startY,endX,endY}=CONFIG.selection;
 const width=(endX-startX)*progress, height=(endY-startY)*progress;
 const left=startX,top=startY, right=CONFIG.screen.width-left-width, bottom=CONFIG.screen.height-top-height;
 const flash=clamp((time-tl.capture)/.045)*(1-clamp((time-tl.capture-.08)/.20));
 const popup=clamp((time-tl.toast)/.32)*(1-clamp((time-9.15)/.3));
 const showSelect=overlay>.001&&selecting>0;
 return <div className="wssDesktop">
  <Wallpaper/>
  <div className="wssDeskIcon" style={{left:14,top:19}}><span>🗑️</span>Recycle Bin</div>
  <div className="wssDeskIcon" style={{left:14,top:95}}><span>📁</span>Projects</div>
  <FakeBrowser/>
  <div className="wssTaskbar"><div className="wssTaskbarIcons"><WindowsIcon size={20} color="#0B8BE6"/><div className="wssTaskbarSearch">⌕　 Search</div><span style={{fontSize:19}}>📁</span><div className="wssEdgeLogo">e</div><span style={{fontSize:17,color:'#6F5EE3'}}>◈</span></div><div className="wssTaskbarClock">09:41<br/>27/10/2026</div></div>
  {overlay>0&& <div className="wssSnipOverlay" style={{opacity:overlay}}>
    {showSelect? <>
      <div className="wssDarkStripe" style={{left:0,top:0,width:'100%',height:Math.max(0,top)}} />
      <div className="wssDarkStripe" style={{left:0,top:top,width:Math.max(0,left),height:height}} />
      <div className="wssDarkStripe" style={{left:left+width,top,width:Math.max(0,right),height:height}} />
      <div className="wssDarkStripe" style={{left:0,top:top+height,width:'100%',height:Math.max(0,bottom)}} />
      <div className="wssSnipBounds" style={{left,top,width,height,opacity:selecting}}>
       <div className="wssSnipCorner" style={{left:-4,top:-4}}/><div className="wssSnipCorner" style={{right:-4,top:-4}}/><div className="wssSnipCorner" style={{left:-4,bottom:-4}}/><div className="wssSnipCorner" style={{right:-4,bottom:-4}}/>
      </div>
    </>:<div className="wssDarkStripe" style={{inset:0}}/>}
    <div className="wssSnipToolbar" style={{transform:`translateX(-50%) translateY(${(1-clamp((time-tl.overlay)/.4))*-45}px)`}}>
      <span className="wssSnipActive"><SnipIcon type="rectangle"/></span>
      <span><SnipIcon type="freeform"/></span><span><SnipIcon type="window"/></span><span><SnipIcon type="fullscreen"/></span>
      <div className="wssSnipDivider"/><span className="wssSnipClose">×</span>
    </div>
  </div>}
  {flash>0&&<div style={{position:'absolute',inset:0,background:'#ffffff',opacity:flash*.72,pointerEvents:'none',zIndex:32}}/>}
  {popup>0&&<div className="wssSnipToast" style={{opacity:popup,transform:`translateY(${(1-popup)*75}px)`}}><div className="wssToastIcon"><SnipIcon type="rectangle" size={20}/></div><div><strong>Snipping Tool</strong><small>Screenshot copied to clipboard</small></div></div>}
 </div>;
};
