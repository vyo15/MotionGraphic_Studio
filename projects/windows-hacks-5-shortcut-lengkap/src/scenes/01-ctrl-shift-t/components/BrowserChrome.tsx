import {useCopy} from '../../../editor/TextOverrides';
import {layerStyle} from '../../../editor/LayerStyling';
import React from 'react';
import {Interactive} from 'remotion';
import type {VideoConfig} from '../config/video';

/** Browser, tabs, address bar and document all remain DOM/CSS, not baked into an image. */
export const BrowserChrome: React.FC<{lost:boolean;style:React.CSSProperties;config:VideoConfig}> = ({lost,style,config}) => { const copy=useCopy(); return (
  <Interactive.Div
    name="S02 — Chrome Browser Window"
    className="chromeContainer"
    style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:72,top:598,width:936,height:670,opacity:style.opacity,transform:style.transform}}
  >
    <div className="webWinWallpaper"/>
    <div className="browserCanvas">
      <Interactive.Div
        name="01 · Browser tabs"
        className="chromeTitle"
        style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',height:69}}
      > 
        {!lost && <Interactive.Div name="01 · Browser · Tab dokumen" className="chromeTab doc" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}}><span style={{fontSize:22,color:'#4285ed',fontWeight:950}}>▤</span><span className="tabText">{copy("tab-title","Laporan Kerja - Google Docs")}</span><span className="tabCross">×</span></Interactive.Div>}
        <Interactive.Div name="01 · Browser · Tab Google" className="chromeTab home" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',backgroundColor:lost?'#fff':'transparent',color:lost?'#253346':'#536577'}}><span style={{color:'#4285ed',fontWeight:900}}>G</span><span className="tabText">{copy("home-tab-label","Google")}</span><span>×</span></Interactive.Div>
        <span style={{fontSize:26,color:'#536373',margin:'0 5px'}}>+</span>
        <Interactive.Div name="01 · Browser · Kontrol jendela" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className="chromeActions"><span>−</span><span>□</span><span>×</span></Interactive.Div>
      </Interactive.Div>
      <Interactive.Div name="01 · Browser navigation" className="chromeToolbar" style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',height:67,fontSize:30,color:"#69717b"}}> <span className="browserIcon">‹</span><span className="browserIcon">›</span><span className="browserIcon" style={{fontSize:23}}>⟳</span><div className="address"><span className="lockIcon">♧</span><span>{copy('browser-address',lost?'google.com':'docs.google.com/document/d/1-Laporan-Kerja/edit')}</span></div><span style={{fontSize:26,color:'#718299'}}>☆</span><span style={{color:'#5b6b7a',fontSize:24}}>⋮</span></Interactive.Div>
      <div className="bookmarks"><span>⭐ Bookmark</span><span>🗂️ Pekerjaan</span><span>📁 Dokumen</span><span>✉️ Gmail</span></div>
      <div className="browserBody">
        {lost? <Interactive.Div name="01 · Empty tab homepage" className="googlePage" style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',fontSize:17,color:"#8493a4"}}> <div className="googleLogo"><span style={{color:'#4285f4'}}>G</span><span style={{color:'#ea4335'}}>o</span><span style={{color:'#fbbc05'}}>o</span><span style={{color:'#4285f4'}}>g</span><span style={{color:'#34a853'}}>l</span><span style={{color:'#ea4335'}}>e</span></div><div className="googleSearch"><span>⌕</span> Telusuri Google atau ketik URL</div><div className="googleLinks"><span>Penelusuran Google</span><span>Saya Lagi Beruntung</span></div><div className="googleFooter">Tab dokumen tadi sudah tertutup</div></Interactive.Div> :
          <div><div className="docsHeader"><div className="docBadge">▤</div><div><div className="docName">Laporan Kerja Mingguan</div><div className="docSub">File &nbsp; Edit &nbsp; View &nbsp; Insert &nbsp; Format &nbsp; Tools</div></div><div className="share">↗ &nbsp; Share</div></div><div className="docsToolbar"><span>↶</span><span>↷</span><span>▣</span><span>100%</span><span>Normal text</span><span>Arial</span><span>11</span><span>𝗕</span><span>≡</span></div><Interactive.Div name="01 · Browser · Isi dokumen" className="docsPaper" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}}><div className="reportTitle">{copy("document-title","LAPORAN MINGGUAN")}</div><div className="rule"/><div className="textLine" style={{width:'95%'}}/><div className="textLine" style={{width:'77%'}}/><div className="textLine" style={{width:'90%'}}/><div className="statRow"><div className="statBox"/><div className="statBox"/><div className="statBox"/></div><div className="textLine" style={{width:'85%'}}/></Interactive.Div></div>
        }
      </div>
      <div className="winTaskbar"><div className="winIcon"><i/><i/><i/><i/></div><span className="appIcon">⌕</span><span className="appIcon">📁</span><div className="chromeLogo"/><span className="appIcon">▣</span></div>
    </div>
  </Interactive.Div>
); };
