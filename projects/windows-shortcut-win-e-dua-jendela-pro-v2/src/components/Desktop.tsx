import React from 'react';
import {CONFIG} from '../config/video';
import {ExplorerWindow,Folder} from './ExplorerWindow';
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const smooth=(v:number)=>{const t=clamp(v);return t*t*(3-2*t);};
const slide=(t:number,a:number,b:number)=>smooth((t-a)/(b-a));
const lerp=(a:number,b:number,p:number)=>a+(b-a)*p;
export const Desktop:React.FC<{time:number}>=({time})=>{
 const spread=slide(time,CONFIG.timing.arrange,CONFIG.timing.arrange+.94);
 const show=slide(time,CONFIG.timing.newExplorerOpen,CONFIG.timing.newExplorerOpen+.51);
 const windowScale=lerp(CONFIG.windows.initialScale,CONFIG.windows.spreadScale,spread);
 const oldX=lerp(CONFIG.windows.oldX,CONFIG.windows.oldSpreadX,spread);
 const oldY=lerp(CONFIG.windows.oldY,CONFIG.windows.spreadY,spread);
 const newX=lerp(CONFIG.windows.newX,CONFIG.windows.newSpreadX,spread);
 const newY=lerp(CONFIG.windows.newY,CONFIG.windows.spreadY,spread);
 const hover=time>=6.24&&time<CONFIG.timing.downloadsClick;
 return <div className="cteDesktop">
  <div className="cteWallpaper"><div className="cteWblob one"/><div className="cteWblob two"/><div className="cteWblob three"/></div>
  <div className="cteDesktopIcon"><span className="cteRecycleIcon">♻</span>Recycle Bin</div>
  <div className="weV2OldMount" style={{left:oldX,top:oldY,transform:`scale(${windowScale})`,opacity:1}}>
   <ExplorerWindow mode="work" time={time}/>
  </div>
  {time>=CONFIG.timing.newExplorerOpen&&<div className="weV2NewMount" style={{left:newX,top:newY,opacity:show,transform:`translateY(${(1-show)*47}px) scale(${windowScale*(.89+.11*show)})`}}><ExplorerWindow mode="new" time={time}/></div>}
  <div className="weV2OldBadge" style={{opacity:spread,top:lerp(57,119,spread),left:lerp(95,42,spread)}}><span>01</span> FOLDER LAMA <b>✓</b></div>
  <div className="weV2NewBadge" style={{opacity:spread,top:lerp(57,119,spread),left:lerp(200,515,spread)}}><span>02</span> WINDOW BARU <b>✓</b></div>
  <div className="weV2DesktopCursor" style={{opacity:slide(time,5.77,6.01)*(1-slide(time,6.99,7.28)),left:lerp(755,CONFIG.windows.newSpreadX+60,slide(time,6.0,6.65)),top:lerp(457,CONFIG.windows.spreadY+163,slide(time,6.0,6.65))}}>
   <svg width="29" height="40" viewBox="0 0 33 46"><path d="M3 2v34l8.6-9.2 7.5 14.8 7.2-3.6-7.7-14.2H31L3 2Z" fill="white" stroke="#18324e" strokeWidth="2.5" strokeLinejoin="round"/></svg>
   {time>=6.68&&time<=6.96&&<div className="weV2ClickRipple" style={{transform:`scale(${.5+slide(time,6.68,6.96)})`,opacity:1-slide(time,6.68,6.96)}}/>}
  </div>
  <div className="cteDesktopTaskbar"><span className="cteWindowsIcon"><i/><i/><i/><i/></span><span className="cteTaskSearch"><span>⌕</span> Search</span><span className="weTaskbarFolder"><Folder size={25}/></span><span className="cteTbEdge">e</span><span style={{fontSize:23,color:'#4595f8'}}>▣</span><span className="cteTbRight">ENG　◕ <small>10:28<br/>28/10/2026</small></span></div>
 </div>;
};
