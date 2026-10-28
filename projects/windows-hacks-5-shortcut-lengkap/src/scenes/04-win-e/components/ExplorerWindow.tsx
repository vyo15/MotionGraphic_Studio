import {layerStyle} from '../../../editor/LayerStyling';
import {Interactive} from 'remotion';
import {useCopy} from '../../../editor/TextOverrides';
import React from 'react';
import {CONFIG} from '../config/video';

// True DOM/CSS/SVG reproduction, NOT a rasterized UI. Sub-sections are independently authored.
export const Folder:React.FC<{kind?:string;size?:number}>=({kind='folder',size=26})=>{
 let color=kind==='Downloads'?'#10b1a4':kind==='Pictures'?'#51bce8':kind==='Videos'?'#965ce4':kind==='Documents'?'#688fc6':kind==='Music'?'#f09467':'#f6b52f';
 return <svg width={size} height={size} viewBox="0 0 34 32" style={{flexShrink:0}} aria-hidden="true">
  <path d="M3 7Q3 4 6 4h9l3 4h12q2 0 2 3v15q0 3-3 3H5q-2 0-2-3Z" fill="#e5a21f"/>
  <path d="M2 12q0-2 3-2h24q3 0 3 3l-2 13q0 3-3 3H4q-2 0-2-3Z" fill={color}/>
  <path d="M5 16h23" stroke="#ffec9e" strokeOpacity=".55"/>
  {kind==='Downloads'&&<path d="M17 13v10m-4-4 4 4 4-4" stroke="white" strokeWidth="2.6" strokeLinecap="round" fill="none"/>}
  {kind==='Documents'&&<path d="M12 13h11M12 17h11M12 21h8" stroke="white" strokeOpacity=".8" strokeWidth="1.6"/>}
  {kind==='Pictures'&&<path d="M10 23l5-7 4 4 3-3 5 6" stroke="white" strokeWidth="1.7" fill="none"/>}
 </svg>;
};
const Chev:React.FC<{way?:'left'|'right'|'down'|'up'}>=({way='right'})=><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" style={{transform:`rotate(${way==='left'?180:way==='down'?90:way==='up'?-90:0}deg)`}}><path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const Glass:React.FC=()=> <svg viewBox="0 0 20 20" width="15" height="15"><circle cx="8" cy="8" r="5.1" stroke="currentColor" fill="none" strokeWidth="1.5"/><path d="m12 12 5 5" stroke="currentColor" strokeWidth="1.5"/></svg>;
const Home:React.FC=()=> <svg width="16" height="16" viewBox="0 0 20 20"><path d="m2 9 8-7 8 7v9h-6v-6H8v6H2Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>;
const Computer:React.FC=()=> <svg width="17" height="17" viewBox="0 0 20 20"><rect x="2" y="3" width="16" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M7 18h6M10 14v4" stroke="currentColor" strokeWidth="1.6"/></svg>;
const Tile:React.FC<{name:string;selected?:boolean}>=({name,selected=false})=><div className={'weQuickTile '+(selected?'selected':'')}><Folder kind={name} size={36}/><div className="weQuickText"><b>{name}</b><span>Stored locally</span></div><span className="weQuickPin">♧</span></div>;
const Tool:React.FC<{symbol:string;label?:string}>=({symbol,label})=><div className="weTool"><b>{symbol}</b>{label&&<span>{label}</span>}</div>;
/** Independent, editable DOM-based Windows 11 Explorer window.
 * The original folder is frozen on Project Kerja while the second opens Home/Downloads.
 */
export const ExplorerWindow:React.FC<{time:number;mode?:'work'|'new'}>=({time,mode='new'})=>{
 const copy=useCopy();
 const old=mode==='work';
 const isDownloads=!old&&time>=CONFIG.timing.downloadsClick;
 const hover=!old&&time>=6.20&&!isDownloads;
 const page=old?copy('old-folder-label',CONFIG.text.oldFolder):isDownloads?copy('downloads-name',CONFIG.text.newFolder):'Home';
 return <div className="weExplorer" style={{width:CONFIG.windows.width,height:CONFIG.windows.height}}>
  <Interactive.Div name="04 · File Explorer tabs" data-layout-role="flow" className="weTabbar" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',height:39}}> <div className="weTab"><Folder size={16}/><span>{page}</span><i>×</i></div><span className="weNewTab">＋</span><div className="weSys"><span>─</span><span>□</span><span>×</span></div></Interactive.Div>
  <Interactive.Div name="04 · Explorer address bar" data-layout-role="flow" className="weNavBar" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',height:49}}> <div className="weNavBtns"><Chev way="left"/><span className="weDisabled"><Chev/></span><Chev way="down"/><span style={{marginLeft:5}}><Chev way="up"/></span></div>
   <div className="weBreadcrumb">{old?<><Home/><Chev/><Folder size={16} kind="Documents"/><b>Documents</b><Chev/><Folder size={16}/><b>{copy("old-folder-label",CONFIG.text.oldFolder)}</b></>:isDownloads?<><Home/><Chev/><Folder size={16} kind="Downloads"/><b>Downloads</b></>:<><Home/><b>Home</b></>}<span className="weCaret">⌄</span></div>
   <div className="weSearch"><span>Search {page}</span><Glass/></div></Interactive.Div>
  <Interactive.Div name="04 · Explorer · Toolbar" data-layout-role="flow" className="weCommands" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}}><Tool symbol="＋" label="New"/><i/><Tool symbol="✂"/><Tool symbol="▢"/><Tool symbol="▤"/><Tool symbol="⇪"/><Tool symbol="▣"/><i/><Tool symbol="↕" label="Sort"/><Tool symbol="☷" label="View"/><Tool symbol="•••"/></Interactive.Div>
  <div className="weWorkarea">
   <div className="weSidebar">
    <Interactive.Div name="04 · Explorer · Item sidebar" data-layout-role="flow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className={'weSideItem '+(!old&&!isDownloads?'active':'')}><Home/><span>Home</span></Interactive.Div>
    <Interactive.Div name="04 · Explorer · Item sidebar 2" data-layout-role="flow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className="weSideItem"><span className="weGallery">▧</span><span>Gallery</span></Interactive.Div>
    <div className="weDivider"/>
    <div className="weSideHeader"><Chev way="down"/><span>Quick access</span></div>
    <Interactive.Div name="04 · Explorer · Item sidebar 3" data-layout-role="flow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className="weSideItem"><Folder kind="Desktop" size={17}/><span>Desktop</span><span className="wePin">◦</span></Interactive.Div>
    <Interactive.Div name="04 · Explorer · Item sidebar 4" data-layout-role="flow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className={'weSideItem '+(hover?'hover':'')+' '+(isDownloads?'active':'')}><Folder kind="Downloads" size={17}/><span>Downloads</span><span className="wePin">◦</span></Interactive.Div>
    <Interactive.Div name="04 · Explorer · Item sidebar 5" data-layout-role="flow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className={'weSideItem '+(old?'active':'')}><Folder kind="Documents" size={17}/><span>Documents</span></Interactive.Div>
    <Interactive.Div name="04 · Explorer · Item sidebar 6" data-layout-role="flow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className="weSideItem"><Folder kind="Pictures" size={17}/><span>Pictures</span></Interactive.Div>
    <Interactive.Div name="04 · Explorer · Item sidebar 7" data-layout-role="flow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className="weSideItem"><Folder kind="Music" size={17}/><span>Music</span></Interactive.Div>
    <Interactive.Div name="04 · Explorer · Item sidebar 8" data-layout-role="flow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className="weSideItem"><Folder kind="Videos" size={17}/><span>Videos</span></Interactive.Div>
    <div className="weDivider"/>
    <Interactive.Div name="04 · Explorer · Item sidebar 9" data-layout-role="flow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className="weSideItem"><Computer/><span>This PC</span></Interactive.Div>
    <Interactive.Div name="04 · Explorer · Item sidebar 10" data-layout-role="flow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className="weSideItem"><span className="weNetwork">◎</span><span>Network</span></Interactive.Div>
   </div>
   <div className="weContent">
     {!old&&!isDownloads ? <>
       <div className="weSectionTitle"><Chev way="down"/><b>Quick access</b></div>
       <div className="weTiles"><Tile name="Desktop"/><Tile name="Downloads" selected={hover}/><Tile name="Documents"/><Tile name="Pictures"/><Tile name="Music"/><Tile name="Videos"/></div>
       <div className="weSectionTitle weRecentHead"><Chev way="down"/><b>Recent</b></div><div className="weRecent"><div className="weRecentEmpty">Your recent files will appear here</div></div>
     </>:<>
       <div className="weFilesTitle"><b>{page}</b><span>5 items</span></div>
       <div className="weFileList" style={layerStyle("explorer-files")}><div className="weFileHeader"><span>Name</span><span>Date modified</span><span>Type</span></div>
       <Interactive.Div name="04 · Explorer · Baris file" data-layout-role="flow" className="weFileRow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}}><Folder size={19}/><span>{copy("file-first",old?CONFIG.text.workFiles[0]:CONFIG.text.downloadFiles[0])}</span><time>Today</time><small>File folder</small></Interactive.Div>
       <Interactive.Div name="04 · Explorer · Baris file 2" data-layout-role="flow" className="weFileRow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}}><Folder size={19}/><span>{copy("file-second",old?CONFIG.text.workFiles[1]:CONFIG.text.downloadFiles[1])}</span><time>Today</time><small>File folder</small></Interactive.Div>
       <Interactive.Div name="04 · Explorer · Baris file 3" data-layout-role="flow" className="weFileRow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}}><span className="weFilePdf">{old?'W':'IMG'}</span><span>{copy("file-third",old?CONFIG.text.workFiles[2]:CONFIG.text.downloadFiles[2])}</span><time>Yesterday</time><small>{old?'Word document':'PNG file'}</small></Interactive.Div>
       <Interactive.Div name="04 · Explorer · Baris file 4" data-layout-role="flow" className="weFileRow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}}><span className="weFileX">{old?'X':'P'}</span><span>{copy("file-fourth",old?CONFIG.text.workFiles[3]:CONFIG.text.downloadFiles[3])}</span><time>10/27/2026</time><small>{old?'Worksheet':'Presentation'}</small></Interactive.Div>
       <Interactive.Div name="04 · Explorer · Baris file 5" data-layout-role="flow" className="weFileRow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}}><span className="weFileImg">{old?'▧':'W'}</span><span>{copy("file-fifth",old?CONFIG.text.workFiles[4]:CONFIG.text.downloadFiles[4])}</span><time>10/26/2026</time><small>{old?'PNG file':'Document'}</small></Interactive.Div>
       </div>
     </>}
   </div>
  </div>
  <Interactive.Div name="04 · Explorer statusbar" data-layout-role="flow" className="weStatusbar" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',height:30,fontSize:10,color:"#667688"}}> {old?'5 items · Folder kerja':isDownloads?'5 items':'Quick access'}<span>▦　☷</span></Interactive.Div>
 </div>;
};
