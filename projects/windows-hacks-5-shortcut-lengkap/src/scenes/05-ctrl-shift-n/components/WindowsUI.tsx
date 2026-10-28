import {Interactive} from 'remotion';
import {layerStyle} from '../../../editor/LayerStyling';
import {useCopy} from '../../../editor/TextOverrides';
import React from 'react';
import {CFG} from '../config/video';
const ease=(x:number)=>{x=Math.min(1,Math.max(0,x));return x*x*(3-2*x)};
const phase=(t:number,a:number,b:number)=>ease((t-a)/(b-a));
export const FolderIcon:React.FC<{size?:number;blue?:boolean}>=({size=24,blue})=><svg width={size} height={size} viewBox="0 0 38 33" style={{flexShrink:0}} aria-hidden="true"><path d="M3 7 Q3 3 7 3H17l4 5h12q3 0 3 4v16q0 4-4 4H6q-3 0-3-4Z" fill="#e8a326"/><path d="M2 13q0-2 4-2h27q4 0 4 4l-3 13q0 4-4 4H4q-3 0-3-3Z" fill={blue?'#53afed':'#ffc342'}/><path d="M7 15h24" stroke="#ffedd0" opacity=".65" /></svg>;
const Icon:React.FC<{id:string}>=({id})=><span className="whnGlyph">{id==='doc'?'W':id==='png'?'▧':id==='video'?'▶':'◧'}</span>;
export const Pointer:React.FC<{x:number;y:number;click?:number}>=({x,y,click=0})=><Interactive.Div name="05 · Kursor · Pointer" className="whnPointer" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:x,top:y}}><svg width="30" height="42" viewBox="0 0 33 46"><path d="M3 2v34l8.6-9.2 7.5 14.8 7.2-3.6-7.7-14.2H31L3 2Z" fill="white" stroke="#15273b" strokeWidth="2.6" strokeLinejoin="round"/></svg><div className="whnCursorRing" style={{opacity:click,transform:`translate(-27px,-27px) scale(${.45+(1-click)*.65})`}}/></Interactive.Div>;
export const ExplorerUI:React.FC<{t:number}>=({t})=>{
 const copy=useCopy();
 const made=t>=CFG.timings.folderCreated;
 const editing=made&&t<CFG.timings.renameConfirm;
 const renaming=t>=CFG.timings.renameStart;
 const done=t>=CFG.timings.renameConfirm;
 const newName=copy("folder-name",CFG.text.newFolder);
 const typed=renaming?newName.slice(0,Math.round((newName.length)*phase(t,CFG.timings.renameStart,CFG.timings.renameEnd))):'New folder';
 const showContext=t>=CFG.timings.contextOpen&&t<CFG.timings.contextClose;
 const subContext=t>=1.95&&t<CFG.timings.contextClose;
 const cursorX=t<1.0?406:t<2.05?406:t<3.25?545:t<6.0?540:t<7.75?413:t<10.2?400:650;
 const cursorY=t<1.0?294:t<2.05?294:t<3.25?507:t<6.0?385:t<7.75?283:t<10.2?270:340;
 const click=phase(t,1.17,1.29)*(1-phase(t,1.35,1.59)) + phase(t,2.56,2.66)*(1-phase(t,2.69,2.88));
 return <div className="whnWinExplorer">
   <Interactive.Div name="05 · Folder tabbar" className="whnTabs" style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',height:42}}> <div className="whnActiveTab"><FolderIcon size={18}/>{copy("original-folder",CFG.text.originalFolder)}<span>×</span></div><b>＋</b><div className="whnWinButtons">─　□　×</div></Interactive.Div>
   <Interactive.Div name="05 · Folder breadcrumb" className="whnNav" style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',height:51}}> <span className="whnNavArrows">‹　›　⌄　↑</span><div className="whnAddress"><span>⌂</span><b>›</b><FolderIcon size={16}/><span>Documents</span><b>›</b><FolderIcon size={16}/><strong>{copy("original-folder",CFG.text.originalFolder)}</strong><i>⌄</i></div><div className="whnSearch">Search Project Kerja　⌕</div></Interactive.Div>
   <Interactive.Div name="05 · Explorer · Toolbar" className="whnToolbar" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}}><div className="whnNewBtn">＋ <b>New</b> ⌄</div><div className="whnDivider"/><span>✂</span><span>▣</span><span>▤</span><span>▥</span><div className="whnDivider"/><div>↕ Sort</div><div>☷ View</div><div>···</div></Interactive.Div>
   <div className="whnBody"><aside><div className="whnSideItem">⌂　Home</div><div className="whnSideItem">▧　Gallery</div><div className="whnAsideLine"/><div className="whnSideItem">⭐　Quick access</div><div className="whnSideItem">▣　Desktop</div><div className="whnSideItem">⬇　Downloads</div><div className="whnSideItem selected">▤　Documents</div><div className="whnSideItem">▧　Pictures</div><div className="whnSideItem">▻　Videos</div><div className="whnAsideLine"/><div className="whnSideItem">▣　This PC</div><div className="whnSideItem">◎　Network</div></aside>
    <main><Interactive.Div name="05 · File list header" className="whnColHead" style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',height:39,color:"#789",fontSize:12}}> <span>Name <small>⌄</small></span><span>Date modified</span><span>Type</span></Interactive.Div>
    {made&&<Interactive.Div name="05 · Explorer · Baris file" className={'whnFileRow whnNewRow '+(editing?'edit':'done')} style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}}><FolderIcon size={21}/><div className="whnFilename">{editing?<span className="whnInlineEdit">{renaming?<>{typed}<em>|</em></>:<span className="whnSelectedText">New folder</span>}</span>:<b>{newName}</b>}</div><span>Just now</span><span>File folder</span></Interactive.Div>}
    <Interactive.Div name="05 · Explorer · Baris file 2" className="whnFileRow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}}><FolderIcon size={21}/><b>{copy("file-one",CFG.text.fileRows[0])}</b><span>Today</span><span>File folder</span></Interactive.Div>
    <Interactive.Div name="05 · Explorer · Baris file 3" className="whnFileRow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}}><FolderIcon size={21}/><b>{copy("file-two",CFG.text.fileRows[1])}</b><span>Today</span><span>File folder</span></Interactive.Div>
    <Interactive.Div name="05 · Explorer · Baris file 4" className="whnFileRow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}}><Icon id="doc"/><b>{copy("file-three",CFG.text.fileRows[2])}</b><span>Yesterday</span><span>Word document</span></Interactive.Div>
    <Interactive.Div name="05 · Explorer · Baris file 5" className="whnFileRow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}}><Icon id="png"/><b>{copy("file-four",CFG.text.fileRows[3])}</b><span>10/27/2026</span><span>PNG file</span></Interactive.Div>
    <div className="whnEmptyArea"/></main>
   </div>
   <div className="whnStatus">{made?'5 items':'4 items'}　|　{made?'1 new folder created':'Project Kerja'}<span>▦　☰</span></div>
   {showContext&&<><Interactive.Div name="05 · Explorer · Menu klik kanan" className="whnContext" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:Math.min(cursorX,490)-48,top:190,opacity:phase(t,1.2,1.43)*(1-phase(t,3.04,3.28))}}><div>▤　View</div><div>↕　Sort by</div><div>⟳　Refresh</div><hr/><div>▧　Customize this folder...</div><hr/><Interactive.Div name="05 · Explorer · Menu klik kanan 2" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className={'whnContextNew '+(subContext?'hover':'')}>＋　New <b>›</b></Interactive.Div><div>▣　Properties</div><div>◫　Show more options</div></Interactive.Div>{subContext&&<Interactive.Div name="05 · Explorer · Submenu folder" className="whnSubcontext" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',opacity:phase(t,1.95,2.2)*(1-phase(t,3.05,3.28))}}><div>📁　Folder</div><div>⇢　Shortcut</div><div>▤　Text Document</div></Interactive.Div>}</>}
   {t<3.32&&<Pointer x={cursorX} y={cursorY} click={click}/>}
   {made&&t<10.5&&<div className="whnHighlight" style={{opacity:phase(t,6.53,6.82)*(1-phase(t,10.15,10.49))}}/>}
  </div>;
};
export const BrowserUI:React.FC<{t:number}>=({t})=>{
 const copy=useCopy();
 const inPrivate=t>=CFG.timings.privateOpen;
 const fade=phase(t,CFG.timings.privateOpen,CFG.timings.privateOpen+.7);
 return <div className="whnBrowser">
  <Interactive.Div name="05 · Edge browser tabs" className="whnEdgeTabs" style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',height:46,fontSize:17,fontWeight:400,letterSpacing:9}}> <div className="whnEdgeLogo">e</div><span>New tab</span><b>×</b><i>＋</i><strong>─　□　×</strong></Interactive.Div>
  <div className="whnEdgeTools">‹　›　⟳　⌂ <div>🔒　Search or enter web address</div> ☆　☻　···</div>
  <Interactive.Div name="05 · Edge · Halaman browser" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className="whnEdgePage"><div className="whnEdgeBigLogo">e</div><b>Start browsing</b><div className="whnEdgeSearch">Search the web　⌕</div><div className="whnEdgeCards"><span>Microsoft 365</span><span>Outlook</span><span>OneDrive</span></div></Interactive.Div>
  {inPrivate&&<Interactive.Div name="05 · InPrivate panel" className="whnPrivateWindow" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',opacity:fade,transform:`translateY(${(1-fade)*36}px) scale(${.94+.06*fade})`}}><div className="whnPrivateTab"><span>◧　InPrivate</span><span>＋</span><b>─　□　×</b></div><div className="whnPrivateAddress">‹　›　⟳　<div>Search or enter web address</div> ⋆　<span>InPrivate</span>　···</div><div className="whnPrivatePage" style={layerStyle("browser-page")}><div className="whnInPrivateIcon">◧</div><div className="whnInPrivateHeading">{copy("private-title","InPrivate browsing")}</div><p>{copy("tip-browser","When you're done, close all InPrivate windows.")}</p><div className="whnPrivateInfo"><b>What InPrivate does</b><div>Browse without saving local browsing history in this window.</div></div></div></Interactive.Div>}
 </div>;
};
