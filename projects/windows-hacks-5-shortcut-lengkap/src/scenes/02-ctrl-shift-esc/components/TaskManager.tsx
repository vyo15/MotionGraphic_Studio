import {useCopy} from '../../../editor/TextOverrides';
import React from 'react';
import {CONFIG} from '../config/video';

// Windows 11 Task Manager rebuilt from HTML/CSS; not a flattened screenshot.
// Can be reused inside the floating detail magnifier and desktop viewport.
export const TaskManager:React.FC<{time:number;compact?:boolean}>=({time})=>{
 const copy=useCopy();
 const select=time>=CONFIG.timing.select;
 const ended=time>=CONFIG.timing.remove;
 const pressing=time>=CONFIG.timing.endPress&&time<CONFIG.timing.endPress+.19;
 return <div className="whecTM" style={{width:CONFIG.manager.width,height:CONFIG.manager.height}}>
   <div className="whecTmTitlebar">
    <div className="whecTmAppGlyph"><span></span><span></span><span></span><span></span></div>
    <span>Task Manager</span><div className="whecTmWindowButtons"><span>—</span><span>□</span><span>×</span></div>
   </div>
   <div className="whecTmBody">
    <div className="whecTmSidebar">
     <div className="whecTmHamburger"><Bars/></div>
     <NavIcon active kind="process" label="Processes"/>
     <NavIcon kind="performance" label="Performance"/>
     <NavIcon kind="history" label="App history"/>
     <NavIcon kind="startup" label="Startup apps"/>
     <NavIcon kind="users" label="Users"/>
     <NavIcon kind="details" label="Details"/>
     <NavIcon kind="services" label="Services"/>
     <div className="whecTmSettings"><NavIcon kind="settings" label="Settings"/></div>
    </div>
    <div className="whecTmMain">
      <div className="whecTmSectionHead"><b>Processes</b><div className="whecTmSearch"><Search/> <span>Type a name, publisher, or PID to search</span></div></div>
      <div className="whecTmToolbar">
       <div className="whecTmTool"><PlusTask/> <span>Run new task</span></div>
       <div className={'whecTmEnd '+(select&&!ended?'available ':'')+(pressing?'pressed':'')}><Ban/> <span>{copy("task-action",CONFIG.task.endTask)}</span></div>
       <div className="whecTmTool whecTmEfficiency"><span>♧</span> Efficiency mode</div>
       <div className="whecTmDots">···</div>
      </div>
      <div className="whecTmColumns"><span>Name</span><span>Status</span><div><strong>{CONFIG.task.cpu}</strong><small>CPU</small></div><div><strong>{CONFIG.task.memory}</strong><small>Memory</small></div><div><strong>0%</strong><small>Disk</small></div></div>
      <div className="whecTmCategory">Apps ({ended?CONFIG.task.appCountAfter:CONFIG.task.appCountBefore})</div>
      {!ended&&<div className={'whecTmProcess whecTmExcel '+(select?'selected':'')}>
        <div className="whecTmName"><span className="whecTmChevron">›</span><span className="whecTmExcelIcon">X</span><span><b>{copy("task-app",CONFIG.task.app)}</b></span></div>
        <div className="whecTmProcessStatus">{copy("task-status",CONFIG.task.status)}</div><div className="whecTmMetric hot">17.4%</div><div className="whecTmMetric warm">312.8 MB</div><div className="whecTmMetric">0 MB/s</div>
      </div>}
      <div className="whecTmProcess"><div className="whecTmName"><span className="whecTmChevron">›</span><span className="whecTmEdgeIcon">e</span><span>Microsoft Edge (8)</span></div><span></span><div className="whecTmMetric">1.2%</div><div className="whecTmMetric">448.9 MB</div><div className="whecTmMetric">0 MB/s</div></div>
      <div className="whecTmProcess"><div className="whecTmName"><span className="whecTmChevron">›</span><span className="whecTmFolderIcon">▰</span><span>Windows Explorer</span></div><span></span><div className="whecTmMetric">0.1%</div><div className="whecTmMetric">68.5 MB</div><div className="whecTmMetric">0 MB/s</div></div>
      <div className="whecTmProcess"><div className="whecTmName"><span className="whecTmChevron">›</span><span className="whecTmGearIcon">▣</span><span>Task Manager</span></div><span></span><div className="whecTmMetric">0.4%</div><div className="whecTmMetric">72.1 MB</div><div className="whecTmMetric">0 MB/s</div></div>
      <div className="whecTmCategory whecTmCategoryDim">Background processes (62)</div>
      <div className="whecTmProcess whecTmProcessDim"><div className="whecTmName"><span className="whecTmChevron">›</span><span className="whecTmGearIcon">⚙</span><span>Antimalware Service Executable</span></div><span></span><div className="whecTmMetric">0.1%</div><div className="whecTmMetric">160.3 MB</div><div className="whecTmMetric">0 MB/s</div></div>
    </div>
   </div>
 </div>;
};
const Bars:React.FC=()=> <svg viewBox="0 0 20 20"><path d="M4 5h12M4 10h12M4 15h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
const Search:React.FC=()=> <svg viewBox="0 0 20 20"><circle cx="8.5" cy="8.5" r="5.3" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="m12.5 12.5 4.5 4.5" stroke="currentColor" strokeWidth="1.5"/></svg>;
const Ban:React.FC=()=> <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M6.2 17.8 17.8 6.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
const PlusTask:React.FC=()=> <svg viewBox="0 0 24 24"><rect x="3" y="6" width="13" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M18 3v10M13 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
const NavIcon:React.FC<{active?:boolean;kind:string;label:string}>=({active,kind,label})=><div className={'whecTmNav '+(active?'active':'')}><span className="whecTmNavIcon">{kind==='process'?'▤':kind==='performance'?'⌁':kind==='history'?'◴':kind==='startup'?'↗':kind==='users'?'♙':kind==='details'?'☷':kind==='services'?'⬡':'⚙'}</span><span>{label}</span></div>;
