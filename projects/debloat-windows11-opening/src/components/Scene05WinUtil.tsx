import React from 'react';
import {Interactive} from 'remotion';
import {SCENE05} from '../config/scene05';
import {s05ramp,s05smooth} from '../animations/scene05';

const EDIT={translate:'0px 0px',scale:1,rotate:'0deg'} as const;
const edit=(x:React.CSSProperties):React.CSSProperties=>({...x,...EDIT});
const ui=SCENE05.colors;
const FONT='Inter, Segoe UI, Arial, sans-serif';

/**
 * Native Remotion Studio editable components.
 * Each callsite can be edited independently (text, transform, visibility and timing).
 * The older nested <Interactive.Div> in a shared React wrapper made children/text
 * computed at the editable node and prevented independent per-instance edits.
 */
const CheckboxInner:React.FC<{on?:boolean;style?:React.CSSProperties}>=({on=false,style})=>
  <div style={{pointerEvents:'auto',flex:'0 0 28px',width:28,height:28,position:'relative',borderRadius:6,
    border:`2px solid ${on?ui.blue:'#A5B7C5'}`,background:on?ui.blue:'#FFFFFF',boxSizing:'border-box',
    translate:'0px 0px',scale:1,rotate:'0deg',...style}}>
    {on?<svg style={{position:'absolute',left:3,top:2}} width="19" height="19" viewBox="0 0 19 19"><path d="M3 9.4 7.6 14 16 4.8" fill="none" stroke="white" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round"/></svg>:null}
  </div>;
const Checkbox=Interactive.create({Component:CheckboxInner,schema:{on:{type:'boolean',default:false,description:'Status checkbox (visual simulasi)'}}});

const ButtonInner:React.FC<{active?:boolean;children?:React.ReactNode;style?:React.CSSProperties}>=({active=false,children,style})=>
  <div style={{fontSize:21,...style}}>
    <div style={{pointerEvents:'auto',boxSizing:'border-box',background:active?'#DDEFFC':'#F8FAFC',
      border:`${active?2:1}px solid ${active?ui.blue:ui.border}`,
      borderRadius:10,minHeight:55,padding:'12px 14px',display:'flex',alignItems:'center',
      justifyContent:'center',fontSize:'inherit',fontWeight:active?690:540,
      color:active?'#286AAB':'#445565',whiteSpace:'nowrap'}}>{children}</div>
  </div>;
const Button=Interactive.create({Component:ButtonInner,schema:{...Interactive.childrenSchema,active:{type:'boolean',default:false,description:'Highlight tombol (visual simulasi)'}}});

const PaneTextInner:React.FC<{children?:React.ReactNode;strong?:boolean;style?:React.CSSProperties}>=({children,strong=false,style})=>
  <div style={{pointerEvents:'auto',fontFamily:FONT,fontSize:24,fontWeight:strong?700:460,
    color:strong?'#354655':'#506272',whiteSpace:'nowrap',...style}}>{children}</div>;
const PaneText=Interactive.create({Component:PaneTextInner,schema:{...Interactive.childrenSchema,strong:{type:'boolean',default:false,description:'Teks tebal'}}});

const Install:React.FC=()=>
  <Interactive.Div name="S05 — Panel Install utama / posisi & warna" style={{pointerEvents:'auto',position:'absolute',left:30,right:30,top:191,bottom:27,borderRadius:14,background:'#FFFFFF',border:'1px solid #E7EBEF',padding:'26px 24px',display:'flex',gap:26,translate:'0px 0px',scale:1,rotate:'0deg'}}>
    <Interactive.Div name="S05 — Install Actions Sidebar" style={{pointerEvents:'auto',width:192,background:'#F6F8FA',borderRadius:10,padding:'18px 12px',display:'flex',flexDirection:'column',gap:13,translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <PaneText name="Install Actions title" strong style={{fontSize:24}}>Actions</PaneText>
      <Button name="Install / Install" >Install</Button>
      <Button name="Install / Uninstall">Uninstall</Button>
      <Button name="Install / Upgrade">Upgrade</Button>
    </Interactive.Div>
    <div style={{display:'flex',gap:35,flex:1,overflow:'hidden'}}>
      <div style={{width:200}}>
        <PaneText name="Install Browsers heading" strong style={{fontSize:27,marginBottom:18}}>Browsers</PaneText>
        <div style={{display:'flex',alignItems:'center',gap:13,marginBottom:21}}><Checkbox name="Chrome" on={false}/><PaneText name="Install Chrome">Chrome</PaneText></div>
        <div style={{display:'flex',alignItems:'center',gap:13,marginBottom:21}}><Checkbox name="Firefox" on={false}/><PaneText name="Install Firefox">Firefox</PaneText></div>
        <div style={{display:'flex',alignItems:'center',gap:13,marginBottom:21}}><Checkbox name="Brave" on={false}/><PaneText name="Install Brave">Brave</PaneText></div>
        <div style={{display:'flex',alignItems:'center',gap:13}}><Checkbox name="Vivaldi" on={false}/><PaneText name="Install Vivaldi">Vivaldi</PaneText></div>
      </div>
      <div style={{width:225}}>
        <PaneText name="Install Communication heading" strong style={{fontSize:26,marginBottom:18}}>Communication</PaneText>
        <div style={{display:'flex',alignItems:'center',gap:13,marginBottom:21}}><Checkbox name="Discord" on={false}/><PaneText name="Install Discord">Discord</PaneText></div>
        <div style={{display:'flex',alignItems:'center',gap:13,marginBottom:21}}><Checkbox name="Telegram" on={false}/><PaneText name="Install Telegram">Telegram</PaneText></div>
        <div style={{display:'flex',alignItems:'center',gap:13,marginBottom:21}}><Checkbox name="Signal" on={false}/><PaneText name="Install Signal">Signal</PaneText></div>
        <div style={{display:'flex',alignItems:'center',gap:13}}><Checkbox name="Zoom" on={false}/><PaneText name="Install Zoom">Zoom</PaneText></div>
      </div>
    </div>
    <PaneText name="Install Helper" style={{position:'absolute',bottom:45,left:246,fontSize:19,color:'#82909B'}}>Choose only what you need.</PaneText>
    <Button name="Install Selected" style={{position:'absolute',bottom:21,right:21,fontSize:19,minHeight:51}}>Install Selected</Button>
  </Interactive.Div>;

const TweakRowInner:React.FC<{children?:React.ReactNode;checked:boolean;strong?:boolean;highlight?:boolean;style?:React.CSSProperties}>=
  ({children,checked,strong=false,highlight=false,style})=><div style={{pointerEvents:'auto',display:'flex',alignItems:'center',gap:17,
    height:62,background:checked?'#EFF7FD':highlight?'#FBFBFC':'transparent',padding:'0 16px',borderRadius:10,
    translate:'0px 0px',scale:1,rotate:'0deg',...style}}>
      <Checkbox name="S05 — Checkbox pada baris Tweak" on={checked}/>
      <PaneText name="S05 — Nama Tweak" strong={strong} style={{fontSize:24}}>{children}</PaneText>
    </div>;
const TweakRow=Interactive.create({Component:TweakRowInner,schema:{...Interactive.childrenSchema,checked:{type:'boolean',default:false},strong:{type:'boolean',default:false},highlight:{type:'boolean',default:false}}});

const Tweaks:React.FC<{s:number}>=({s})=>{
  const t=SCENE05.time;const isRestored=s>=t.restoreSelect;
  const progress=s05smooth((s-t.restoreProgressStart)/(t.restoreProgressEnd-t.restoreProgressStart));
  const loading=s>=t.restoreProgressStart&&s<t.restoreProgressEnd;
  const done=s>=t.restoreProgressEnd&&s<t.restoreStatusEnd;
  return <Interactive.Div name="S05 — Panel Tweaks utama / posisi & warna" style={{pointerEvents:'auto',position:'absolute',left:28,right:28,top:189,bottom:28,background:'#FFFFFF',border:'1px solid #E6EBF0',borderRadius:14,padding:'24px 26px',translate:'0px 0px',scale:1,rotate:'0deg'}}>
    <PaneText name="Recommended Selections" strong style={{fontSize:22,marginBottom:17}}>Recommended Selections</PaneText>
    <div style={{display:'flex',gap:9,marginBottom:22}}>
      <Button name="Standard" style={{flex:1,fontSize:20,minHeight:51}}>Standard</Button>
      <Button name="Minimal" style={{flex:1,fontSize:20,minHeight:51}}>Minimal</Button>
      <Button name="Advanced" style={{flex:1,fontSize:20,minHeight:51}}>Advanced</Button>
      <Button name="Clear" style={{flex:1,fontSize:20,minHeight:51}}>Clear</Button>
    </div>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
      <PaneText name="Essential Tweaks" strong style={{background:'#EAF4FB',borderRadius:9,padding:'12px 20px',fontSize:23,width:480}}>Essential Tweaks</PaneText>
      <Button name="AppX Removal" active={s>=8.9&&s<9.7} style={{fontSize:22,minHeight:51,width:264}}>AppX Removal</Button>
    </div>
    <TweakRow name="S05 — Baris Create Restore Point" checked={isRestored} strong highlight={s<4.2}>Create Restore Point</TweakRow>
    <TweakRow name="S05 — Baris Disable Telemetry" checked={false}>Disable Telemetry</TweakRow>
    <TweakRow name="S05 — Baris Disable Game DVR" checked={false}>Disable Game DVR</TweakRow>
    <TweakRow name="S05 — Baris Show File Extensions" checked={false}>Show File Extensions</TweakRow>
    <div style={{position:'absolute',bottom:47,left:42,right:40,height:1,background:'#E1E8EE'}}/>
    <PaneText name="Tweaks Safety Reminder" style={{position:'absolute',bottom:17,left:40,fontSize:17,color:'#798995'}}>Select only the changes you understand.</PaneText>
    <Button name="Run Tweaks" active={s>=5.00&&s<5.65} style={{position:'absolute',bottom:8,right:39,width:252,minHeight:53,fontSize:21}}>Run Tweaks</Button>
    {loading?<div style={{position:'absolute',left:30,bottom:-4,right:30,height:25,background:'#E2EBF2',borderRadius:11,overflow:'hidden'}}>
      <Interactive.Div name="S05 — Progress bar Restore Point / warna / posisi" style={{pointerEvents:'auto',height:'100%',width:`${Math.round(progress*100)}%`,background:'linear-gradient(90deg,#4096D9,#60BBF1)',borderRadius:11,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
    </div>:null}
    {done?<Interactive.Div name="S05 — Status Restore Point berhasil (simulasi)" style={{pointerEvents:'auto',position:'absolute',left:30,bottom:-17,fontSize:17,padding:'8px 20px',borderRadius:10,background:'#E8F7EE',color:'#25835C',translate:'0px 0px',scale:1,rotate:'0deg'}}>Restore point step complete (simulation)</Interactive.Div>:null}
  </Interactive.Div>;
};

const AppXRowInner:React.FC<{children?:React.ReactNode;checked:boolean;style?:React.CSSProperties}>=({children,checked,style})=>
  <div style={{pointerEvents:'auto',display:'flex',alignItems:'center',gap:23,height:78,padding:'0 23px',
    borderBottom:'1px solid #EEF1F4',borderRadius:checked?8:0,background:checked?'#EFF7FD':'transparent',
    translate:'0px 0px',scale:1,rotate:'0deg',...style}}>
    <Checkbox name="S05 — Checkbox baris AppX" on={checked}/>
    <PaneText name="S05 — Nama Paket AppX" style={{fontSize:26}}>{children}</PaneText>
  </div>;
const AppXRow=Interactive.create({Component:AppXRowInner,schema:{...Interactive.childrenSchema,checked:{type:'boolean',default:false,description:'Centang visual aplikasi'}}});

const AppX:React.FC<{s:number}>=({s})=>{
  const checkedXbox=s>=SCENE05.time.xboxSelect;
  const checkedCopilot=s>=SCENE05.time.copilotSelect;
  const amount=(checkedXbox?1:0)+(checkedCopilot?1:0);
  return <Interactive.Div name="S05 — Panel AppX utama / posisi & warna" style={{pointerEvents:'auto',position:'absolute',left:28,right:28,top:189,bottom:26,background:'#FFFFFF',border:'1px solid #E6EBF0',borderRadius:14,padding:'21px 25px',translate:'0px 0px',scale:1,rotate:'0deg'}}>
    <PaneText name="AppX Removal heading" strong style={{fontSize:30,marginBottom:7}}>AppX Removal</PaneText>
    <PaneText name="AppX Helper" style={{fontSize:20,color:'#84929D',marginBottom:17}}>Choose individual Windows app packages.</PaneText>
    <Interactive.Div name="S05 — AppX Search Bar / posisi" style={{pointerEvents:'auto',height:62,border:'1px solid #D5DFE8',borderRadius:10,background:'#F9FBFC',display:'flex',alignItems:'center',padding:'0 17px',gap:18,marginBottom:13,translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <svg width="23" height="23" viewBox="0 0 23 23"><circle cx="10" cy="10" r="7" fill="none" stroke="#8798A6" strokeWidth="2"/><path d="M16 16 22 22" fill="none" stroke="#8798A6" strokeWidth="2"/></svg>
      <PaneText name="AppX Search Placeholder" style={{fontSize:22,color:'#9AA4AD'}}>Search apps...</PaneText>
    </Interactive.Div>
    <AppXRow name="S05 — Baris AppX Xbox App" checked={checkedXbox}>Xbox App</AppXRow>
    <AppXRow name="S05 — Baris AppX Microsoft Copilot" checked={checkedCopilot}>Microsoft Copilot</AppXRow>
    <AppXRow name="S05 — Baris AppX Feedback Hub" checked={false}>Feedback Hub</AppXRow>
    <AppXRow name="S05 — Baris AppX Xbox Identity Provider" checked={false}>Xbox Identity Provider</AppXRow>
    <div style={{position:'absolute',bottom:11,left:22,right:26,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{display:'flex',gap:7}}>
        {amount===0?<PaneText name="Jumlah dipilih 0" strong style={{fontSize:22,color:'#8794A0'}}>0 selected</PaneText>
        :amount===1?<PaneText name="Jumlah dipilih 1" strong style={{fontSize:22,color:'#3487C2'}}>1 selected</PaneText>
        :<PaneText name="Jumlah dipilih 2" strong style={{fontSize:22,color:'#3487C2'}}>2 selected</PaneText>}
      </div>
      <Button name="Remove Selected — klik simulasi" active={amount>0&&s>=SCENE05.time.removeClick-.28} style={{fontSize:21,minHeight:54}}>Remove Selected</Button>
    </div>
    {s>=SCENE05.time.removeProgressStart?<div style={{position:'absolute',left:20,right:20,bottom:2,height:73,background:'#F7FAFD',border:'1px solid #C3D2E0',borderRadius:11,padding:'8px 15px',boxSizing:'border-box',zIndex:4}}>
      <div style={{display:'flex',justifyContent:'space-between',gap:15,marginBottom:7}}>
        <div style={{fontSize:17,fontWeight:630,color:'#386A92'}}>
          {s>=SCENE05.time.removeSuccess?<Interactive.Div name="S05 — Status selesai (SIMULASI)" style={{pointerEvents:'auto',translate:'0px 0px',scale:1,rotate:'0deg'}}>Simulasi penghapusan selesai</Interactive.Div>
           :s<18.0?<Interactive.Div name="S05 — Status Removing Xbox App" style={{pointerEvents:'auto',translate:'0px 0px',scale:1,rotate:'0deg'}}>Removing Xbox App...</Interactive.Div>
           :<Interactive.Div name="S05 — Status Removing Microsoft Copilot" style={{pointerEvents:'auto',translate:'0px 0px',scale:1,rotate:'0deg'}}>Removing Microsoft Copilot...</Interactive.Div>}
        </div>
        <div style={{fontSize:17,color:'#708295'}}>{s<18.0?'1/2':'2/2'}</div>
      </div>
      <div style={{height:13,borderRadius:7,background:'#DFE9F2',overflow:'hidden'}}>
        <Interactive.Div name="S05 — Loading bar penghapusan aplikasi / warna / ukuran" style={{pointerEvents:'auto',height:'100%',width:`${Math.round(s05smooth((s-SCENE05.time.removeProgressStart)/(SCENE05.time.removeProgressEnd-SCENE05.time.removeProgressStart))*100)}%`,background:s>=SCENE05.time.removeSuccess?ui.green:ui.blue,borderRadius:7,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
      </div>
    </div>:null}
  </Interactive.Div>;
};

/** HTML/SVG app recreation, no screenshot flattening. Preview-only cursor/ticks; never deletes real apps. */
export const Scene05WinUtil:React.FC<{seconds:number}>=({seconds:s})=>{
  const t=SCENE05.time;
  const isInstall=s<t.installToTweaks;const showAppx=s>=t.appxOpen;
  const showAppxFade=s05ramp(s,t.appxOpen,t.appxOpen+.38);
  return <div style={{position:'absolute',left:SCENE05.ui.x,top:SCENE05.ui.y,width:SCENE05.ui.width,height:SCENE05.ui.height,pointerEvents:'none',fontFamily:FONT}}>
    <Interactive.Div name="S05 — Jendela WinUtil / posisi / ukuran / warna" style={{pointerEvents:'auto',position:'absolute',inset:0,background:'#F7F9FA',border:'1px solid #CBD5DE',borderRadius:21,overflow:'hidden',boxShadow:'0 23px 66px rgba(9,27,42,.22)',translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <Interactive.Div name="S05 — Bilah judul WinUtil / posisi / warna" style={{pointerEvents:'auto',height:74,background:'#EFF3F6',display:'flex',alignItems:'center',padding:'0 27px',translate:'0px 0px',scale:1,rotate:'0deg'}}>
        <Interactive.Div name="S05 — Logo WinUtil W" style={{pointerEvents:'auto',width:33,height:33,display:'grid',placeItems:'center',fontSize:23,color:'#FFF',fontWeight:770,background:'#3087C5',borderRadius:7,marginRight:17,translate:'0px 0px',scale:1,rotate:'0deg'}}>W</Interactive.Div>
        <PaneText name="Judul Chris Titus Tech Windows Utility" strong style={{fontSize:25}}>Chris Titus Tech's Windows Utility</PaneText>
        <PaneText name="Kontrol Window" style={{position:'absolute',right:20,top:17,fontSize:29,color:'#82909D'}}>–  □  ×</PaneText>
      </Interactive.Div>
      <div style={{position:'absolute',top:94,left:23,right:23,display:'flex',gap:9}}>
        <Interactive.Div name="S05 — Tab Install / teks posisi warna" style={{pointerEvents:'auto',flex:1,height:61,borderRadius:10,background:isInstall?'#DEEAF5':'#F0F3F6',border:`${isInstall?2:1}px solid ${isInstall?'#81AEDA':'#DDE4EA'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:isInstall?710:520,color:isInstall?'#2E567B':'#5F7081',whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Install</Interactive.Div>
        <Interactive.Div name="S05 — Tab Tweaks / teks posisi warna" style={{pointerEvents:'auto',flex:1,height:61,borderRadius:10,background:!isInstall?'#DEEAF5':'#F0F3F6',border:`${!isInstall?2:1}px solid ${!isInstall?'#81AEDA':'#DDE4EA'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:!isInstall?710:520,color:!isInstall?'#2E567B':'#5F7081',whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Tweaks</Interactive.Div>
        <Interactive.Div name="S05 — Tab Config / teks posisi warna" style={{pointerEvents:'auto',flex:1,height:61,borderRadius:10,background:false?'#DEEAF5':'#F0F3F6',border:`${false?2:1}px solid ${false?'#81AEDA':'#DDE4EA'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:false?710:520,color:false?'#2E567B':'#5F7081',whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Config</Interactive.Div>
        <Interactive.Div name="S05 — Tab Updates / teks posisi warna" style={{pointerEvents:'auto',flex:1,height:61,borderRadius:10,background:false?'#DEEAF5':'#F0F3F6',border:`${false?2:1}px solid ${false?'#81AEDA':'#DDE4EA'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:false?710:520,color:false?'#2E567B':'#5F7081',whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Updates</Interactive.Div>
        <Interactive.Div name="S05 — Tab MicroWin / teks posisi warna" style={{pointerEvents:'auto',flex:1,height:61,borderRadius:10,background:false?'#DEEAF5':'#F0F3F6',border:`${false?2:1}px solid ${false?'#81AEDA':'#DDE4EA'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:false?710:520,color:false?'#2E567B':'#5F7081',whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>MicroWin</Interactive.Div>
      </div>
      {isInstall?<Install/>:showAppx?<div style={{position:'absolute',inset:0,opacity:showAppxFade,transform:`translateX(${Math.round((1-showAppxFade)*13)}px)`}}><AppX s={s}/></div>:<Tweaks s={s}/>}
    </Interactive.Div>
  </div>;
};
