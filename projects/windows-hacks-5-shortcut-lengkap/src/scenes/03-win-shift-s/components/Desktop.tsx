import {layerStyle} from '../../../editor/LayerStyling';
import React from 'react';
import {useCopy} from '../../../editor/TextOverrides';
import {SnipIcon,WindowsIcon} from './Icons';
import {Interactive} from 'remotion';
import {CONFIG} from '../config/video';
import {interpolate,Easing} from 'remotion';

const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const ease=(v:number)=>Easing.inOut(Easing.cubic)(clamp(v));

/** Pure SVG wallpaper: original, independent editable vector shapes. */
const Wallpaper:React.FC = () => <svg viewBox="0 0 924 601" preserveAspectRatio="xMidYMid slice" className="whssWallpaper" aria-label="Windows 11 inspired blue wallpaper">
  <defs>
    <linearGradient id="whss-bg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#174AA1"/><stop offset=".53" stopColor="#0B265B"/><stop offset="1" stopColor="#061936"/></linearGradient>
    <linearGradient id="whss-bloom" x1="0" y1="0" x2="1" y2=".85"><stop stopColor="#B5EAFF"/><stop offset=".16" stopColor="#52BBFF"/><stop offset=".53" stopColor="#236DE3"/><stop offset="1" stopColor="#103A9A"/></linearGradient>
    <linearGradient id="whss-bloom2" x1=".1" y1="0" x2=".95" y2="1"><stop stopColor="#5ACFFF"/><stop offset=".4" stopColor="#0E5CD6"/><stop offset="1" stopColor="#082859"/></linearGradient>
    <filter id="whss-shadow"><feGaussianBlur stdDeviation="13"/></filter>
  </defs>
  <rect width="924" height="601" fill="url(#whss-bg)"/>
  <path d="M236 476C339 416 440 243 627 157c133-61 231-22 229 50-2 89-161 96-242 169S358 552 236 476Z" fill="#0A2A6B" opacity=".9" filter="url(#whss-shadow)"/>
  <path d="M137 488c151-119 318-254 486-306 78-25 159-28 208 29 47 55 17 143-39 179-67 44-167 3-248 55-89 58-254 108-407 43Z" fill="url(#whss-bloom)"/>
  <path d="M213 483c117-102 313-242 442-268 80-16 147-1 169 39 15 29-7 50-44 67-94 42-171-3-269 62-99 65-208 118-298 100Z" fill="url(#whss-bloom2)" stroke="#7BD9FF" strokeOpacity=".5" strokeWidth="3"/>
  <path d="M270 505c134-56 248-124 346-180 97-55 156-36 177-14-41 22-107 12-177 62-88 63-211 123-346 132Z" fill="#1A64CE" opacity=".85"/>
  <path d="M270 506c190-25 259-143 375-163 63-11 116-9 136-31" stroke="#A0E5FF" strokeWidth="5" fill="none" opacity=".65"/>
  <path d="M193 465c143-160 303-248 441-284 121-32 193 14 208 55" stroke="#C4EFFF" strokeWidth="4" fill="none" opacity=".5"/>
</svg>;

const FakeBrowser:React.FC=()=>{const copy=useCopy();return <Interactive.Div name="03 · Browser inside desktop" className="whssBrowser" style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:112,top:49,width:748,height:510,color:"#233143"}}> 
  <div className="whssBrowserTabs"><div className="whssEdgeLogo">e</div><div className="whssBrowserTab">✨  {copy("browser-tab","Dashboard Tim")} <span className="whssTabClose">×</span></div><div className="whssTabPlus">＋</div><div className="whssWindowButtons">─　□　×</div></div>
  <div className="whssAddressBar"><span>‹</span><span>›</span><span>⟳</span><div className="whssUrl">♧　https://dashboard.local/overview</div><span style={{color:'#708399'}}>☆</span><span>⋯</span></div>
  <div className="whssWebContent" style={layerStyle("snip-dashboard")}>
    <div className="whssSidebar"><div className="whssBrandMark">◈</div><span className="whssSidebarActive">▦</span><span>▤</span><span>▥</span><span>⚙</span></div>
    <div className="whssPage">
      <div className="whssPageTop"><span>Workspace / Overview</span><div className="whssUser">AM</div></div>
      <div className="whssPageHello">{copy("dashboard-name","Project Overview")}</div>
      <div className="whssPageMinor">Ringkasan aktivitas tim hari ini</div>
      <div className="whssMetrics"><div><span>Task selesai</span><b>128</b><small>↗ 12.5%</small></div><div><span>Proyek aktif</span><b>08</b><small>↗ 4.2%</small></div><div><span>Produktivitas</span><b>96%</b><small>● On track</small></div></div>
      <div className="whssChartGroup"><div className="whssGraph"><div className="whssChartTitle">Aktivitas Mingguan</div><svg viewBox="0 0 370 110" width="100%" height="113" aria-label="Area chart">
        <defs><linearGradient id="whssArea" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#377DFF" stopOpacity=".3"/><stop offset="1" stopColor="#377DFF" stopOpacity="0"/></linearGradient></defs>
        <path d="M8 89H362M8 63H362M8 37H362M8 11H362" stroke="#E7EEF8" strokeWidth="1"/>
        <path d="M8 84C49 77 64 53 102 63S179 74 211 41 272 52 306 21 341 31 362 8V103H8Z" fill="url(#whssArea)"/>
        <path d="M8 84C49 77 64 53 102 63S179 74 211 41 272 52 306 21 341 31 362 8" fill="none" stroke="#3F86EE" strokeWidth="4" strokeLinecap="round"/>
      </svg><div className="whssGraphMonths">Sen　 Sel　 Rab　 Kam　 Jum　 Sab　 Min</div></div>
      <div className="whssActivity" style={layerStyle("snip-progress-ui")}><b>{copy("dashboard-progress","Progress")}</b><div className="whssProgressItem"><i style={{background:'#5C9BFA'}}/> {copy("progress-1","UI Design")} <strong>90%</strong></div><Interactive.Div name="03 · Dashboard · Progress bar" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className="whssProgressBar"><em style={{...layerStyle("snip-progress-bar-1"),width:'90%'}}/></Interactive.Div><div className="whssProgressItem"><i style={{background:'#42CFC1'}}/> {copy("progress-2","Development")} <strong>72%</strong></div><Interactive.Div name="03 · Dashboard · Progress bar 2" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className="whssProgressBar"><em style={{...layerStyle("snip-progress-bar-2"),width:'72%',background:'#42CFC1'}}/></Interactive.Div><div className="whssProgressItem"><i style={{background:'#FBBF6E'}}/> {copy("progress-3","Testing")} <strong>48%</strong></div><Interactive.Div name="03 · Dashboard · Progress bar 3" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className="whssProgressBar"><em style={{...layerStyle("snip-progress-bar-3"),width:'48%',background:'#FBBF6E'}}/></Interactive.Div></div></div>
    </div>
  </div>
</Interactive.Div>;};

export const Desktop:React.FC<{time:number}> = ({time}) => {
 const copy=useCopy();
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
 return <div className="whssDesktop" style={layerStyle("snip-desktop")}>
  <Wallpaper/>
  <div className="whssDeskIcon" style={{left:14,top:19}}><span>🗑️</span>Recycle Bin</div>
  <div className="whssDeskIcon" style={{left:14,top:95}}><span>📁</span>Projects</div>
  <FakeBrowser/>
  <div className="whssTaskbar"><div className="whssTaskbarIcons"><WindowsIcon size={20} color="#0B8BE6"/><div className="whssTaskbarSearch">⌕　 Search</div><span style={{fontSize:19}}>📁</span><div className="whssEdgeLogo">e</div><span style={{fontSize:17,color:'#6F5EE3'}}>◈</span></div><div className="whssTaskbarClock">09:41<br/>27/10/2026</div></div>
  {overlay>0&& <Interactive.Div name="03 · Snipping Tool · Layar redup" className="whssSnipOverlay" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',opacity:overlay}}>
    {showSelect? <>
      <div className="whssDarkStripe" style={{left:0,top:0,width:'100%',height:Math.max(0,top)}} />
      <div className="whssDarkStripe" style={{left:0,top:top,width:Math.max(0,left),height:height}} />
      <div className="whssDarkStripe" style={{left:left+width,top,width:Math.max(0,right),height:height}} />
      <div className="whssDarkStripe" style={{left:0,top:top+height,width:'100%',height:Math.max(0,bottom)}} />
      <Interactive.Div name="03 · Snipping Tool · Kotak seleksi" className="whssSnipBounds" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left,top,width,height,opacity:selecting}}>
       <div className="whssSnipCorner" style={{left:-4,top:-4}}/><div className="whssSnipCorner" style={{right:-4,top:-4}}/><div className="whssSnipCorner" style={{left:-4,bottom:-4}}/><div className="whssSnipCorner" style={{right:-4,bottom:-4}}/>
      </Interactive.Div>
    </>:<div className="whssDarkStripe" style={{inset:0}}/>}
    <Interactive.Div name="03 · Snipping mode toolbar" className="whssSnipToolbar" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',top:13,height:41,color:"#EAF8FF",width:30,fontSize:28,fontWeight:250,transform:`translateX(-50%) translateY(${(1-clamp((time-tl.overlay)/.4))*-45}px)`}}>
      <span className="whssSnipActive"><SnipIcon type="rectangle"/></span>
      <span><SnipIcon type="freeform"/></span><span><SnipIcon type="window"/></span><span><SnipIcon type="fullscreen"/></span>
      <div className="whssSnipDivider"/><span className="whssSnipClose">×</span>
    </Interactive.Div>
  </Interactive.Div>}
  {flash>0&&<div style={{position:'absolute',inset:0,background:'#ffffff',opacity:flash*.72,pointerEvents:'none',zIndex:32}}/>}
  {popup>0&&<Interactive.Div name="03 · Clipboard notification" className="whssSnipToast" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',width:270,height:65,color:"#64778E",fontSize:10,fontWeight:750,opacity:popup,transform:`translateY(${(1-popup)*75}px)`}}><div className="whssToastIcon"><SnipIcon type="rectangle" size={20}/></div><div><strong>Snipping Tool</strong><small>{copy("snip-toast-message","Screenshot copied to clipboard")}</small></div></Interactive.Div>}
 </div>;
};
