import {layerStyle} from '../../../editor/LayerStyling';
import React from 'react';
import {CONFIG} from '../config/video';
import {TaskManager} from './TaskManager';
import {interpolate,Easing} from 'remotion';
const ease=(v:number)=>v<=0?0:v>=1?1:v*v*(3-2*v);
const progress=(t:number,a:number,b:number)=>ease((t-a)/(b-a));
export const Desktop:React.FC<{time:number}>=({time})=>{
 const opened=progress(time,CONFIG.timing.managerAppear,CONFIG.timing.managerAppear+.50);
 const ended=time>=CONFIG.timing.remove;
 return <div className="whecDesktop">
   <div className="whecWallpaper"><div className="whecWblob one"/><div className="whecWblob two"/><div className="whecWblob three"/></div>
   <div className="whecDesktopIcon"><span className="whecRecycleIcon">♻</span>Recycle Bin</div>
   {time<CONFIG.timing.managerAppear+.10&&!ended&&<div className="whecExcelWindow" style={{opacity:1-progress(time,CONFIG.timing.managerAppear,CONFIG.timing.managerAppear+.1)}}>
    <div className="whecExcelHead"><span>X</span><b>Quarterly Report.xlsx - Excel (Not Responding)</b><span>—　□　×</span></div>
    <div className="whecExcelRibbon">File　　 Home　　 Insert　　 Page Layout　　 Formulas　　 Data　　 Review</div>
    <div className="whecExcelSheet"><div className="whecExcelSheetHeader">　 A　　　　B　　　　C　　　　D　　　　E　　　　F</div>
     {Array.from({length:10},(_,i)=><div className="whecExcelSheetRow" key={i}><span>{i+1}</span><span>{i===0?'SKU':i<6?`1250${i}23`:''}</span><span>{i===0?'Stock':i<6?i*32:''}</span><span>{i===0?'Status':i<6?'READY':''}</span><span></span><span></span></div>)}
    </div><div className="whecFreeze"><span className="whecFreezeSpinner"/> <div>Microsoft Excel is not responding</div></div>
   </div>}
   {time>=CONFIG.timing.managerAppear-.14&&<div className="whecManagerMount" style={{left:CONFIG.manager.left,top:CONFIG.manager.top,opacity:opened,transform:`translateY(${(1-opened)*26}px) scale(${.97+.03*opened})`}}><TaskManager time={time}/></div>}
   <div className="whecDesktopTaskbar"><span className="whecWindowsIcon"><i/><i/><i/><i/></span><span className="whecTaskSearch"><span>⌕</span> Search</span><span className="whecTbExplorer">📁</span><span className="whecTbEdge">e</span><span className="whecTbExcel">X</span><span className="whecTbTm">▤</span><span className="whecTbRight">ENG　▴　◖　◕<small>10:28<br/>28/10/2026</small></span></div>
 </div>
};
export const Cursor:React.FC<{x:number;y:number;pressed?:boolean;visible?:boolean}>=({x,y,pressed=false,visible=true})=>
 <div className="whecCursorWrap" style={{...layerStyle("cursor"),left:x,top:y,opacity:visible?1:0}}><svg viewBox="0 0 33 46" width="33" height="46"><path d="M3 2v34l8.6-9.2 7.5 14.8 7.2-3.6-7.7-14.2H31L3 2Z" fill="white" stroke="#111b27" strokeLinejoin="round" strokeWidth="2.6"/></svg>{pressed&&<span className="whecClickHalo"/>}</div>;
