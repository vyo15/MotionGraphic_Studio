import React from 'react';
import {CFG} from '../config/video';
const ease=(x:number)=>{x=Math.min(1,Math.max(0,x));return x*x*(3-2*x)};
const phase=(t:number,a:number,b:number)=>ease((t-a)/(b-a));
export const FolderIcon:React.FC<{size?:number;blue?:boolean}>=({size=24,blue})=><svg width={size} height={size} viewBox="0 0 38 33" style={{flexShrink:0}} aria-hidden="true"><path d="M3 7 Q3 3 7 3H17l4 5h12q3 0 3 4v16q0 4-4 4H6q-3 0-3-4Z" fill="#e8a326"/><path d="M2 13q0-2 4-2h27q4 0 4 4l-3 13q0 4-4 4H4q-3 0-3-3Z" fill={blue?'#53afed':'#ffc342'}/><path d="M7 15h24" stroke="#ffedd0" opacity=".65" /></svg>;
const Icon:React.FC<{id:string}>=({id})=><span className="csnGlyph">{id==='doc'?'W':id==='png'?'▧':id==='video'?'▶':'◧'}</span>;
export const Pointer:React.FC<{x:number;y:number;click?:number}>=({x,y,click=0})=><div className="csnPointer" style={{left:x,top:y}}><svg width="30" height="42" viewBox="0 0 33 46"><path d="M3 2v34l8.6-9.2 7.5 14.8 7.2-3.6-7.7-14.2H31L3 2Z" fill="white" stroke="#15273b" strokeWidth="2.6" strokeLinejoin="round"/></svg><div className="csnCursorRing" style={{opacity:click,transform:`translate(-27px,-27px) scale(${.45+(1-click)*.65})`}}/></div>;
export const ExplorerUI:React.FC<{t:number}>=({t})=>{
 const made=t>=CFG.timings.folderCreated;
 const editing=made&&t<CFG.timings.renameConfirm;
 const renaming=t>=CFG.timings.renameStart;
 const done=t>=CFG.timings.renameConfirm;
 const newName=CFG.text.newFolder;
 const typed=renaming?newName.slice(0,Math.round((newName.length)*phase(t,CFG.timings.renameStart,CFG.timings.renameEnd))):'New folder';
 const showContext=t>=CFG.timings.contextOpen&&t<CFG.timings.contextClose;
 const subContext=t>=1.95&&t<CFG.timings.contextClose;
 const cursorX=t<1.0?406:t<2.05?406:t<3.25?545:t<6.0?540:t<7.75?413:t<10.2?400:650;
 const cursorY=t<1.0?294:t<2.05?294:t<3.25?507:t<6.0?385:t<7.75?283:t<10.2?270:340;
 const click=phase(t,1.17,1.29)*(1-phase(t,1.35,1.59)) + phase(t,2.56,2.66)*(1-phase(t,2.69,2.88));
 return <div className="csnWinExplorer">
   <div className="csnTabs"><div className="csnActiveTab"><FolderIcon size={18}/>{CFG.text.originalFolder}<span>×</span></div><b>＋</b><div className="csnWinButtons">─　□　×</div></div>
   <div className="csnNav"><span className="csnNavArrows">‹　›　⌄　↑</span><div className="csnAddress"><span>⌂</span><b>›</b><FolderIcon size={16}/><span>Documents</span><b>›</b><FolderIcon size={16}/><strong>{CFG.text.originalFolder}</strong><i>⌄</i></div><div className="csnSearch">Search Project Kerja　⌕</div></div>
   <div className="csnToolbar"><div className="csnNewBtn">＋ <b>New</b> ⌄</div><div className="csnDivider"/><span>✂</span><span>▣</span><span>▤</span><span>▥</span><div className="csnDivider"/><div>↕ Sort</div><div>☷ View</div><div>···</div></div>
   <div className="csnBody"><aside><div className="csnSideItem">⌂　Home</div><div className="csnSideItem">▧　Gallery</div><div className="csnAsideLine"/><div className="csnSideItem">⭐　Quick access</div><div className="csnSideItem">▣　Desktop</div><div className="csnSideItem">⬇　Downloads</div><div className="csnSideItem selected">▤　Documents</div><div className="csnSideItem">▧　Pictures</div><div className="csnSideItem">▻　Videos</div><div className="csnAsideLine"/><div className="csnSideItem">▣　This PC</div><div className="csnSideItem">◎　Network</div></aside>
    <main><div className="csnColHead"><span>Name <small>⌄</small></span><span>Date modified</span><span>Type</span></div>
    {made&&<div className={'csnFileRow csnNewRow '+(editing?'edit':'done')}><FolderIcon size={21}/><div className="csnFilename">{editing?<span className="csnInlineEdit">{renaming?<>{typed}<em>|</em></>:<span className="csnSelectedText">New folder</span>}</span>:<b>{CFG.text.newFolder}</b>}</div><span>Just now</span><span>File folder</span></div>}
    <div className="csnFileRow"><FolderIcon size={21}/><b>{CFG.text.fileRows[0]}</b><span>Today</span><span>File folder</span></div>
    <div className="csnFileRow"><FolderIcon size={21}/><b>{CFG.text.fileRows[1]}</b><span>Today</span><span>File folder</span></div>
    <div className="csnFileRow"><Icon id="doc"/><b>{CFG.text.fileRows[2]}</b><span>Yesterday</span><span>Word document</span></div>
    <div className="csnFileRow"><Icon id="png"/><b>{CFG.text.fileRows[3]}</b><span>10/27/2026</span><span>PNG file</span></div>
    <div className="csnEmptyArea"/></main>
   </div>
   <div className="csnStatus">{made?'5 items':'4 items'}　|　{made?'1 new folder created':'Project Kerja'}<span>▦　☰</span></div>
   {showContext&&<><div className="csnContext" style={{left:Math.min(cursorX,490)-48,top:190,opacity:phase(t,1.2,1.43)*(1-phase(t,3.04,3.28))}}><div>▤　View</div><div>↕　Sort by</div><div>⟳　Refresh</div><hr/><div>▧　Customize this folder...</div><hr/><div className={'csnContextNew '+(subContext?'hover':'')}>＋　New <b>›</b></div><div>▣　Properties</div><div>◫　Show more options</div></div>{subContext&&<div className="csnSubcontext" style={{opacity:phase(t,1.95,2.2)*(1-phase(t,3.05,3.28))}}><div>📁　Folder</div><div>⇢　Shortcut</div><div>▤　Text Document</div></div>}</>}
   {t<3.32&&<Pointer x={cursorX} y={cursorY} click={click}/>}
   {made&&t<10.5&&<div className="csnHighlight" style={{opacity:phase(t,6.53,6.82)*(1-phase(t,10.15,10.49))}}/>}
  </div>;
};
export const BrowserUI:React.FC<{t:number}>=({t})=>{
 const inPrivate=t>=CFG.timings.privateOpen;
 const fade=phase(t,CFG.timings.privateOpen,CFG.timings.privateOpen+.7);
 return <div className="csnBrowser">
  <div className="csnEdgeTabs"><div className="csnEdgeLogo">e</div><span>New tab</span><b>×</b><i>＋</i><strong>─　□　×</strong></div>
  <div className="csnEdgeTools">‹　›　⟳　⌂ <div>🔒　Search or enter web address</div> ☆　☻　···</div>
  <div className="csnEdgePage"><div className="csnEdgeBigLogo">e</div><b>Start browsing</b><div className="csnEdgeSearch">Search the web　⌕</div><div className="csnEdgeCards"><span>Microsoft 365</span><span>Outlook</span><span>OneDrive</span></div></div>
  {inPrivate&&<div className="csnPrivateWindow" style={{opacity:fade,transform:`translateY(${(1-fade)*36}px) scale(${.94+.06*fade})`}}><div className="csnPrivateTab"><span>◧　InPrivate</span><span>＋</span><b>─　□　×</b></div><div className="csnPrivateAddress">‹　›　⟳　<div>Search or enter web address</div> ⋆　<span>InPrivate</span>　···</div><div className="csnPrivatePage"><div className="csnInPrivateIcon">◧</div><div className="csnInPrivateHeading">InPrivate browsing</div><p>When you're done, close all InPrivate windows.</p><div className="csnPrivateInfo"><b>What InPrivate does</b><div>Browse without saving local browsing history in this window.</div></div></div></div>}
 </div>;
};
