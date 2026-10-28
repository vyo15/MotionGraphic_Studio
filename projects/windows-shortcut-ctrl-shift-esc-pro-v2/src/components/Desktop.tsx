import React from 'react';
import {CONFIG} from '../config/video';
import {TaskManager} from './TaskManager';
import {interpolate,Easing} from 'remotion';
const ease=(v:number)=>v<=0?0:v>=1?1:v*v*(3-2*v);
const progress=(t:number,a:number,b:number)=>ease((t-a)/(b-a));
export const Desktop:React.FC<{time:number}>=({time})=>{
 const opened=progress(time,CONFIG.timing.managerAppear,CONFIG.timing.managerAppear+.50);
 const ended=time>=CONFIG.timing.remove;
 return <div className="cteDesktop">
   <div className="cteWallpaper"><div className="cteWblob one"/><div className="cteWblob two"/><div className="cteWblob three"/></div>
   <div className="cteDesktopIcon"><span className="cteRecycleIcon">♻</span>Recycle Bin</div>
   {time<CONFIG.timing.managerAppear+.10&&!ended&&<div className="cteExcelWindow" style={{opacity:1-progress(time,CONFIG.timing.managerAppear,CONFIG.timing.managerAppear+.1)}}>
    <div className="cteExcelHead"><span>X</span><b>Quarterly Report.xlsx - Excel (Not Responding)</b><span>—　□　×</span></div>
    <div className="cteExcelRibbon">File　　 Home　　 Insert　　 Page Layout　　 Formulas　　 Data　　 Review</div>
    <div className="cteExcelSheet"><div className="cteExcelSheetHeader">　 A　　　　B　　　　C　　　　D　　　　E　　　　F</div>
     {Array.from({length:10},(_,i)=><div className="cteExcelSheetRow" key={i}><span>{i+1}</span><span>{i===0?'SKU':i<6?`1250${i}23`:''}</span><span>{i===0?'Stock':i<6?i*32:''}</span><span>{i===0?'Status':i<6?'READY':''}</span><span></span><span></span></div>)}
    </div><div className="cteFreeze"><span className="cteFreezeSpinner"/> <div>Microsoft Excel is not responding</div></div>
   </div>}
   {time>=CONFIG.timing.managerAppear-.14&&<div className="cteManagerMount" style={{left:CONFIG.manager.left,top:CONFIG.manager.top,opacity:opened,transform:`translateY(${(1-opened)*26}px) scale(${.97+.03*opened})`}}><TaskManager time={time}/></div>}
   <div className="cteDesktopTaskbar"><span className="cteWindowsIcon"><i/><i/><i/><i/></span><span className="cteTaskSearch"><span>⌕</span> Search</span><span className="cteTbExplorer">📁</span><span className="cteTbEdge">e</span><span className="cteTbExcel">X</span><span className="cteTbTm">▤</span><span className="cteTbRight">ENG　▴　◖　◕<small>10:28<br/>28/10/2026</small></span></div>
 </div>
};
export const Cursor:React.FC<{x:number;y:number;pressed?:boolean;visible?:boolean}>=({x,y,pressed=false,visible=true})=>
 <div className="cteCursorWrap" style={{left:x,top:y,opacity:visible?1:0}}><svg viewBox="0 0 33 46" width="33" height="46"><path d="M3 2v34l8.6-9.2 7.5 14.8 7.2-3.6-7.7-14.2H31L3 2Z" fill="white" stroke="#111b27" strokeLinejoin="round" strokeWidth="2.6"/></svg>{pressed&&<span className="cteClickHalo"/>}</div>;
