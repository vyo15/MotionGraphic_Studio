import {useCopy} from '../../../editor/TextOverrides';
import {layerStyle} from '../../../editor/LayerStyling';
import React from 'react';
import {Interactive} from 'remotion';
import type {VideoConfig} from '../config/video';

/** Browser, tabs, address bar and document all remain DOM/CSS, not baked into an image. */
export const BrowserChrome: React.FC<{lost:boolean;style:React.CSSProperties;config:VideoConfig}> = ({lost,style,config}) => { const copy=useCopy(); return (
  <Interactive.Div name="S02 — Chrome Browser Window" className="chromeContainer" style={{...layerStyle('window'),left:config.layers.browser.x,top:config.layers.browser.y,width:config.layers.browser.width,height:config.layers.browser.height,...style}}>
    <div className="webWinWallpaper"/>
    <div className="browserCanvas">
      <div className="chromeTitle">
        {!lost && <div className="chromeTab doc"><span style={{fontSize:22,color:'#4285ed',fontWeight:950}}>▤</span><span className="tabText">{copy("tab-title","Laporan Kerja - Google Docs")}</span><span className="tabCross">×</span></div>}
        <div className="chromeTab home" style={lost?{background:'#fff',color:'#253346'}:{}}><span style={{color:'#4285ed',fontWeight:900}}>G</span><span className="tabText">Google</span><span>×</span></div>
        <span style={{fontSize:26,color:'#536373',margin:'0 5px'}}>+</span>
        <div className="chromeActions"><span>−</span><span>□</span><span>×</span></div>
      </div>
      <div className="chromeToolbar"><span className="browserIcon">‹</span><span className="browserIcon">›</span><span className="browserIcon" style={{fontSize:23}}>⟳</span><div className="address"><span className="lockIcon">♧</span><span>{lost?'google.com':'docs.google.com/document/d/1-Laporan-Kerja/edit'}</span></div><span style={{fontSize:26,color:'#718299'}}>☆</span><span style={{color:'#5b6b7a',fontSize:24}}>⋮</span></div>
      <div className="bookmarks"><span>⭐ Bookmark</span><span>🗂️ Pekerjaan</span><span>📁 Dokumen</span><span>✉️ Gmail</span></div>
      <div className="browserBody">
        {lost? <div className="googlePage"><div className="googleLogo"><span style={{color:'#4285f4'}}>G</span><span style={{color:'#ea4335'}}>o</span><span style={{color:'#fbbc05'}}>o</span><span style={{color:'#4285f4'}}>g</span><span style={{color:'#34a853'}}>l</span><span style={{color:'#ea4335'}}>e</span></div><div className="googleSearch"><span>⌕</span> Telusuri Google atau ketik URL</div><div className="googleLinks"><span>Penelusuran Google</span><span>Saya Lagi Beruntung</span></div><div className="googleFooter">Tab dokumen tadi sudah tertutup</div></div> :
          <div><div className="docsHeader"><div className="docBadge">▤</div><div><div className="docName">Laporan Kerja Mingguan</div><div className="docSub">File &nbsp; Edit &nbsp; View &nbsp; Insert &nbsp; Format &nbsp; Tools</div></div><div className="share">↗ &nbsp; Share</div></div><div className="docsToolbar"><span>↶</span><span>↷</span><span>▣</span><span>100%</span><span>Normal text</span><span>Arial</span><span>11</span><span>𝗕</span><span>≡</span></div><div className="docsPaper"><div className="reportTitle">{copy("document-title","LAPORAN MINGGUAN")}</div><div className="rule"/><div className="textLine" style={{width:'95%'}}/><div className="textLine" style={{width:'77%'}}/><div className="textLine" style={{width:'90%'}}/><div className="statRow"><div className="statBox"/><div className="statBox"/><div className="statBox"/></div><div className="textLine" style={{width:'85%'}}/></div></div>
        }
      </div>
      <div className="winTaskbar"><div className="winIcon"><i/><i/><i/><i/></div><span className="appIcon">⌕</span><span className="appIcon">📁</span><div className="chromeLogo"/><span className="appIcon">▣</span></div>
    </div>
  </Interactive.Div>
); };
