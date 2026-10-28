import React from 'react';
import {CONFIG} from '../config/video';

// Windows 11 Task Manager rebuilt from HTML/CSS; not a flattened screenshot.
// Can be reused inside the floating detail magnifier and desktop viewport.
export const TaskManager:React.FC<{time:number;compact?:boolean}>=({time})=>{
 const select=time>=CONFIG.timing.select;
 const ended=time>=CONFIG.timing.remove;
 const pressing=time>=CONFIG.timing.endPress&&time<CONFIG.timing.endPress+.19;
 return <div className="cteTM" style={{width:CONFIG.manager.width,height:CONFIG.manager.height}}>
   <div className="cteTmTitlebar">
    <div className="cteTmAppGlyph"><span></span><span></span><span></span><span></span></div>
    <span>Task Manager</span><div className="cteTmWindowButtons"><span>—</span><span>□</span><span>×</span></div>
   </div>
   <div className="cteTmBody">
    <div className="cteTmSidebar">
     <div className="cteTmHamburger"><Bars/></div>
     <NavIcon active kind="process" label="Processes"/>
     <NavIcon kind="performance" label="Performance"/>
     <NavIcon kind="history" label="App history"/>
     <NavIcon kind="startup" label="Startup apps"/>
     <NavIcon kind="users" label="Users"/>
     <NavIcon kind="details" label="Details"/>
     <NavIcon kind="services" label="Services"/>
     <div className="cteTmSettings"><NavIcon kind="settings" label="Settings"/></div>
    </div>
    <div className="cteTmMain">
      <div className="cteTmSectionHead"><b>Processes</b><div className="cteTmSearch"><Search/> <span>Type a name, publisher, or PID to search</span></div></div>
      <div className="cteTmToolbar">
       <div className="cteTmTool"><PlusTask/> <span>Run new task</span></div>
       <div className={'cteTmEnd '+(select&&!ended?'available ':'')+(pressing?'pressed':'')}><Ban/> <span>{CONFIG.task.endTask}</span></div>
       <div className="cteTmTool cteTmEfficiency"><span>♧</span> Efficiency mode</div>
       <div className="cteTmDots">···</div>
      </div>
      <div className="cteTmColumns"><span>Name</span><span>Status</span><div><strong>{CONFIG.task.cpu}</strong><small>CPU</small></div><div><strong>{CONFIG.task.memory}</strong><small>Memory</small></div><div><strong>0%</strong><small>Disk</small></div></div>
      <div className="cteTmCategory">Apps ({ended?CONFIG.task.appCountAfter:CONFIG.task.appCountBefore})</div>
      {!ended&&<div className={'cteTmProcess cteTmExcel '+(select?'selected':'')}>
        <div className="cteTmName"><span className="cteTmChevron">›</span><span className="cteTmExcelIcon">X</span><span><b>{CONFIG.task.app}</b></span></div>
        <div className="cteTmProcessStatus">{CONFIG.task.status}</div><div className="cteTmMetric hot">17.4%</div><div className="cteTmMetric warm">312.8 MB</div><div className="cteTmMetric">0 MB/s</div>
      </div>}
      <div className="cteTmProcess"><div className="cteTmName"><span className="cteTmChevron">›</span><span className="cteTmEdgeIcon">e</span><span>Microsoft Edge (8)</span></div><span></span><div className="cteTmMetric">1.2%</div><div className="cteTmMetric">448.9 MB</div><div className="cteTmMetric">0 MB/s</div></div>
      <div className="cteTmProcess"><div className="cteTmName"><span className="cteTmChevron">›</span><span className="cteTmFolderIcon">▰</span><span>Windows Explorer</span></div><span></span><div className="cteTmMetric">0.1%</div><div className="cteTmMetric">68.5 MB</div><div className="cteTmMetric">0 MB/s</div></div>
      <div className="cteTmProcess"><div className="cteTmName"><span className="cteTmChevron">›</span><span className="cteTmGearIcon">▣</span><span>Task Manager</span></div><span></span><div className="cteTmMetric">0.4%</div><div className="cteTmMetric">72.1 MB</div><div className="cteTmMetric">0 MB/s</div></div>
      <div className="cteTmCategory cteTmCategoryDim">Background processes (62)</div>
      <div className="cteTmProcess cteTmProcessDim"><div className="cteTmName"><span className="cteTmChevron">›</span><span className="cteTmGearIcon">⚙</span><span>Antimalware Service Executable</span></div><span></span><div className="cteTmMetric">0.1%</div><div className="cteTmMetric">160.3 MB</div><div className="cteTmMetric">0 MB/s</div></div>
    </div>
   </div>
 </div>;
};
const Bars:React.FC=()=> <svg viewBox="0 0 20 20"><path d="M4 5h12M4 10h12M4 15h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
const Search:React.FC=()=> <svg viewBox="0 0 20 20"><circle cx="8.5" cy="8.5" r="5.3" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="m12.5 12.5 4.5 4.5" stroke="currentColor" strokeWidth="1.5"/></svg>;
const Ban:React.FC=()=> <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M6.2 17.8 17.8 6.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
const PlusTask:React.FC=()=> <svg viewBox="0 0 24 24"><rect x="3" y="6" width="13" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M18 3v10M13 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
const NavIcon:React.FC<{active?:boolean;kind:string;label:string}>=({active,kind,label})=><div className={'cteTmNav '+(active?'active':'')}><span className="cteTmNavIcon">{kind==='process'?'▤':kind==='performance'?'⌁':kind==='history'?'◴':kind==='startup'?'↗':kind==='users'?'♙':kind==='details'?'☷':kind==='services'?'⬡':'⚙'}</span><span>{label}</span></div>;
