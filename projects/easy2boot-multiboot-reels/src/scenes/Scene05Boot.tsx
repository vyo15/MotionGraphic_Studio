import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {EditableSvgLayer} from '../components/EditableSvgLayer';
import type {Easy2BootScene03Props,LayerOverride} from '../config/props';

/** S05 — Layar pada laptop adalah konten vektor editable, bukan gambar atau video.
 * Siluet laptop sama dengan komponen pembuka Scene 01 (410x255 logical units).
 * Setiap badan, layar, logo, label, pilihan menu, status dan subtitle ber-ID.
 * Transisi deterministik 30 FPS; basePosition/userTransform/animationTransform terpisah.
 */
const INK='#202628';
const CORAL='#DF805F';
const BLUE='#167BC1';
const PAPER='#F7F7F5';
const clamp=(x:number)=>Math.min(1,Math.max(0,x));
const smooth=(x:number)=>{const y=clamp(x);return y*y*(3-2*y);};
const fade=(t:number,a:number,b:number)=>smooth((t-a)/(b-a));
const window=(t:number,a:number,b:number,c:number,d:number)=>fade(t,a,b)*(1-fade(t,c,d));
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const WindowsMark:React.FC<{x?:number;y?:number;unit?:number}>=({x=0,y=0,unit=17})=><g fill={BLUE}>
 {[0,1].flatMap(yy=>[0,1].map(xx=><rect key={`${xx}-${yy}`} x={x+xx*(unit+2)} y={y+yy*(unit+2)} width={unit} height={unit} rx={1}/>))}
</g>;
const Folder:React.FC<{color?:string}>=({color='#E7B05F'})=><path d="M0 10V5Q0 0 6 0H20L26 7H36Q42 7 42 13V34Q42 38 38 38H4Q0 38 0 33Z" fill={color}/>;

type L={id:string;name:string;props:Easy2BootScene03Props;x:number;y:number;value:string;size?:number;weight?:number;color?:string;opacity?:number;anchor?:'start'|'middle'|'end'};
const Txt:React.FC<L>=({id,name,props,x,y,value,size=20,weight=700,color=INK,opacity=1,anchor='middle'})=>{
 const override:LayerOverride=props.layerOverrides?.[`S05:${id}`]??{};
 return <EditableSvgLayer id={id} name={name} props={props} scene="S05" basePosition={{x,y}} opacity={opacity}>
  <text x={0} y={0} fontFamily={override.fontFamily??props.fontFamily} fontWeight={override.fontWeight??weight}
    fontSize={override.fontSize??size} fill={override.fill??color} textAnchor={anchor} dominantBaseline="middle"
    letterSpacing={override.letterSpacing}>{override.text??value}</text>
 </EditableSvgLayer>;
};

/** A distinct layer for every screen stage. All positions are within the SAME laptop transform. */
const ScreenStages:React.FC<{p:Easy2BootScene03Props;t:number}> =({p,t})=>{
 const system=window(t,0,.36,3.45,3.76);
 const boot=window(t,3.78,4.17,6.63,6.84);
 const loadingAgfm=window(t,6.68,6.81,7.13,7.26);
 const agfmFolders=window(t,7.16,7.34,9.21,9.42);
 const agfmIso=window(t,9.30,9.50,12.12,12.36);
 const loadingSetup=window(t,12.23,12.33,12.89,13.07);
 const setup=fade(t,12.91,13.38);
 const selectUsb=fade(t,4.65,5.25);
 const selectWin11=fade(t,7.75,8.25);
 return <>
  <EditableSvgLayer id="screen-system" name="Layar awal Windows 11" props={p} scene="S05" opacity={system}>
   <rect x={15} y={7} width={380} height={206} rx={7} fill="#E2EEF7"/>
   <path d="M230 7H379V212H286Z" fill="#D4E5F4" opacity={.55}/>
  </EditableSvgLayer>
  <EditableSvgLayer id="screen-system-logo" name="Logo Windows 11 saat menyala" props={p} scene="S05" opacity={system}>
   <WindowsMark x={171} y={71} unit={22}/>
  </EditableSvgLayer>
  <Txt id="screen-system-name" name="Teks Windows 11" props={p} x={205} y={169} size={20} weight={650} value="Windows 11" color="#25323E" opacity={system}/>

  <EditableSvgLayer id="boot-menu-background" name="Boot Menu — jendela" props={p} scene="S05" opacity={boot}>
   <rect x={15} y={7} width={380} height={206} rx={7} fill="#101A25"/>
   <path d="M35 48H375" stroke="#53616D" strokeWidth={1}/>
  </EditableSvgLayer>
  <Txt id="boot-menu-heading" name="Boot Menu — judul" props={p} x={35} y={31} value="Boot Menu" size={18} weight={780} color="#F8FAFC" anchor="start" opacity={boot}/>
  <EditableSvgLayer id="boot-option-manager" name="Boot Menu — Windows Boot Manager" props={p} scene="S05" opacity={boot}>
   <rect x={31} y={69} width={348} height={33} rx={6} fill="#273A4A"/>
  </EditableSvgLayer>
  <Txt id="boot-option-manager-text" name="Boot Manager — teks" props={p} x={44} y={85} anchor="start" value="Windows Boot Manager" size={15} weight={550} color="#C8D2D7" opacity={boot}/>
  <EditableSvgLayer id="boot-option-usb" name="Boot Menu — highlight flashdisk" props={p} scene="S05" opacity={boot}>
   <rect x={31} y={109} width={348} height={42} rx={7} fill={CORAL} opacity={.32+.68*selectUsb}/>
  </EditableSvgLayer>
  <Txt id="boot-option-usb-text" name="Pilihan UEFI USB Flash Drive" props={p} x={44} y={130} anchor="start" value={p.bootOption} color="#FFFFFF" size={18} weight={800} opacity={boot}/>
  <Txt id="boot-navigation" name="Petunjuk keyboard Boot Menu" props={p} x={35} y={183} anchor="start" value="↑ ↓  Select    Enter  Confirm" color="#BBC8CC" size={12} weight={540} opacity={boot}/>

  <EditableSvgLayer id="loading-agfm" name="Loading menuju agFM" props={p} scene="S05" opacity={loadingAgfm}>
   <rect x={15} y={7} width={380} height={206} rx={7} fill="#152530"/>
  </EditableSvgLayer>
  <Txt id="loading-agfm-text" name="Teks loading agFM" props={p} x={205} y={109} value="Loading agFM..." color="#C4D5DD" size={17} weight={650} opacity={loadingAgfm}/>

  <EditableSvgLayer id="agfm-folder-panel" name="agFM — panel folder Windows" props={p} scene="S05" opacity={agfmFolders}>
   <rect x={15} y={7} width={380} height={206} rx={7} fill="#1D313C"/>
   <rect x={15} y={7} width={380} height={38} rx={7} fill="#273C47"/>
  </EditableSvgLayer>
  <Txt id="agfm-folder-heading" name="agFM — judul file manager" props={p} x={31} y={27} anchor="start" value="agFM · File Manager" size={17} weight={770} color="#FFFFFF" opacity={agfmFolders}/>
  <Txt id="agfm-folder-path" name="agFM — path Windows" props={p} x={32} y={60} anchor="start" value="/_ISO/WINDOWS" size={13} color="#BDD0D8" weight={580} opacity={agfmFolders}/>
  {[{id:'win8',x:33,y:72,ty:92,label:'WIN8'},{id:'win10',x:33,y:109,ty:128,label:'WIN10'},{id:'win11',x:33,y:145,ty:165,label:'WIN11'}].map((r)=>
   <React.Fragment key={r.id}>
    {r.id==='win11'?<EditableSvgLayer id="agfm-win11-selected" name="Highlight folder WIN11" props={p} scene="S05" opacity={agfmFolders}>
      <rect x={27} y={144} width={355} height={40} rx={6} fill={CORAL} opacity={.30+.70*selectWin11}/>
     </EditableSvgLayer>:null}
    <EditableSvgLayer id={`agfm-folder-${r.id}`} name={`Ikon folder ${r.label}`} props={p} scene="S05" opacity={agfmFolders} basePosition={{x:r.x,y:r.y}} animationTransform="scale(.61)">
     <Folder color={r.id==='win11'?'#F6CB80':undefined}/>
    </EditableSvgLayer>
    <Txt id={`agfm-folder-${r.id}-name`} name={`Nama folder ${r.label}`} props={p} x={85} y={r.ty} anchor="start" value={r.label} size={r.id==='win11'?18:16} weight={r.id==='win11'?760:650} color={r.id==='win11'?'#FFFFFF':'#E5EEF2'} opacity={agfmFolders}/>
   </React.Fragment>)}
  <Txt id="agfm-folder-navigation" name="Petunjuk navigasi folder agFM" props={p} x={34} y={199} anchor="start" value="↑ ↓   Enter — open" size={12} weight={550} color="#BED0D7" opacity={agfmFolders}/>

  <EditableSvgLayer id="agfm-iso-panel" name="agFM — panel file ISO" props={p} scene="S05" opacity={agfmIso}>
   <rect x={15} y={7} width={380} height={206} rx={7} fill="#1D313C"/>
   <rect x={15} y={7} width={380} height={38} rx={7} fill="#273C47"/>
  </EditableSvgLayer>
  <Txt id="agfm-iso-heading" name="agFM — judul saat memilih ISO" props={p} x={31} y={27} anchor="start" value="agFM · File Manager" size={17} weight={770} color="#FFFFFF" opacity={agfmIso}/>
  <Txt id="agfm-iso-path" name="agFM — path folder WIN11" props={p} x={32} y={62} anchor="start" value="/_ISO/WINDOWS/WIN11" size={13} weight={580} color="#BDD0D8" opacity={agfmIso}/>
  <EditableSvgLayer id="agfm-iso-highlight" name="Highlight file ISO Windows 11" props={p} scene="S05" opacity={agfmIso}>
   <rect x={30} y={83} width={351} height={70} rx={9} fill={CORAL} opacity={.95+.05*Math.sin(t*6)}/>
  </EditableSvgLayer>
  <EditableSvgLayer id="agfm-iso-icon" name="Ikon file ISO terpilih" props={p} scene="S05" opacity={agfmIso}>
   <rect x={44} y={101} width={35} height={39} rx={4} fill="#F3F7FA"/>
   <path d="M54 112H68M54 119H69M54 127H65" stroke="#4089BA" strokeWidth={2.5} strokeLinecap="round"/>
  </EditableSvgLayer>
  <Txt id="agfm-iso-filename" name="Nama ISO Windows 11" props={p} x={90} y={113} anchor="start" value={p.isoBootName} size={18} color="#FFFFFF" weight={780} opacity={agfmIso}/>
  <Txt id="agfm-iso-filetype" name="Tipe file ISO" props={p} x={90} y={135} anchor="start" value="ISO INSTALLER" size={11} weight={640} color="#FFF3EA" opacity={agfmIso}/>
  <Txt id="agfm-iso-navigation" name="Petunjuk Enter boot ISO" props={p} x={33} y={191} anchor="start" value="Enter — boot selected ISO" size={13} weight={600} color="#BED0D7" opacity={agfmIso}/>

  <EditableSvgLayer id="loading-setup" name="Loading Windows Setup" props={p} scene="S05" opacity={loadingSetup}>
   <rect x={15} y={7} width={380} height={206} rx={7} fill="#142D43"/>
  </EditableSvgLayer>
  <Txt id="loading-setup-text" name="Teks memulai Windows Setup" props={p} x={205} y={111} value="Starting Windows Setup..." size={18} weight={650} color="#E9F3F8" opacity={loadingSetup}/>

  <EditableSvgLayer id="setup-screen" name="Windows Setup — latar installer" props={p} scene="S05" opacity={setup}>
   <rect x={15} y={7} width={380} height={206} rx={7} fill="#DCEBF4"/>
   <path d="M15 187L188 7H395V213H15Z" fill="#CEDFEB" opacity={.65}/>
  </EditableSvgLayer>
  <EditableSvgLayer id="setup-windows-logo" name="Windows Setup — logo Windows" props={p} scene="S05" opacity={setup}>
   <WindowsMark x={172} y={32} unit={19}/>
  </EditableSvgLayer>
  <Txt id="setup-title" name="Windows Setup — judul" props={p} x={205} y={110} value="Windows Setup" size={25} color="#263744" weight={780} opacity={setup}/>
  <EditableSvgLayer id="setup-button" name="Windows Setup — tombol Install now" props={p} scene="S05" opacity={setup}>
   <rect x={146} y={137} width={117} height={36} rx={5} fill="#1765AE"/>
  </EditableSvgLayer>
  <Txt id="setup-button-text" name="Windows Setup — teks Install now" props={p} x={205} y={155} value="Install now" size={15} weight={750} color="#FFFFFF" opacity={setup}/>
 </>;
};

const USBGraphic:React.FC<{p:Easy2BootScene03Props;opacity:number}> = ({p,opacity})=><>
 <EditableSvgLayer id="usb-metal" name="USB — konektor logam" props={p} scene="S05" opacity={opacity}>
  <rect x={18} y={0} width={61} height={45} rx={7} fill="#A4B2BB"/>
  <rect x={31} y={12} width={8} height={9} rx={1} fill="#637780"/>
  <rect x={57} y={12} width={8} height={9} rx={1} fill="#637780"/>
 </EditableSvgLayer>
 <EditableSvgLayer id="usb-body" name="USB — badan flashdisk" props={p} scene="S05" opacity={opacity}>
  <rect x={0} y={38} width={97} height={162} rx={14} fill="#2A343A"/>
  <rect x={6} y={45} width={85} height={147} rx={9} fill="#2F4248"/>
 </EditableSvgLayer>
 <EditableSvgLayer id="usb-orange-badge" name="USB — label coral" props={p} scene="S05" opacity={opacity}>
  <rect x={15} y={58} width={67} height={35} rx={8} fill={CORAL}/>
 </EditableSvgLayer>
 <Txt id="usb-label" name="USB — tulisan label" props={p} x={49} y={77} value="USB" size={22} weight={780} color="#FFFFFF" opacity={opacity}/>
 <EditableSvgLayer id="usb-os-grid" name="USB — empat chip installer" props={p} scene="S05" opacity={opacity}>
  {[[13,106],[52,106],[13,145],[52,145]].map(([x,y],i)=><rect key={i} x={x} y={y} width={32} height={31} rx={6} fill="#EDF4F8"/>)}
  <WindowsMark x={21} y={114} unit={6}/><WindowsMark x={60} y={114} unit={6}/><WindowsMark x={21} y={153} unit={6}/>
  <ellipse cx={68} cy={161} rx={7} ry={10} fill="#253640"/>
  <ellipse cx={68} cy={163} rx={4} ry={6} fill={PAPER}/>
 </EditableSvgLayer>
 </>;

export const Scene05Boot:React.FC<Easy2BootScene03Props>=(p)=>{
 const f=useCurrentFrame();const t=f/30;
 const dolly=fade(t,2.15,3.30);
 const lx=lerp(65,25,dolly),ly=lerp(444,358,dolly)+18*(1-fade(t,.15,.81));
 const lw=lerp(410,490,dolly),lh=lerp(255,313,dolly);
 const laptopOpacity=fade(t,.65,1.32);
 const usbProgress=fade(t,.72,2.68);
 const ux=lerp(214,-10,usbProgress),uy=lerp(350,660,usbProgress);
 const uScale=lerp(1.15,.38,usbProgress),uRotate=lerp(0,-88,fade(t,1.05,2.23));
 const usbOpacity=1-fade(t,2.55,3.25);
 const intro=window(t,.64,1.12,2.64,3.18);
 const subtitles=p.scene05SubtitleLines??[
  'Sekarang, boot dari flashdisk.', 'Di Boot Menu, pilih USB.',
  'Buka menu agFM.', 'Pilih ISO Windows 11, lalu jalankan.',
  'Installer Windows pun terbuka.',
 ];
 const timings:[number,number][]=[[.72,3.4],[3.55,6.75],[6.8,9.40],[9.45,12.85],[12.90,16.0]];
 return <AbsoluteFill style={{background:p.backgroundColor}}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 960" width={1080} height={1920}
    style={{position:'absolute',inset:0,width:'100%',height:'100%',overflow:'visible'}}>
   {/* One scene. Same original silhouette from Scene01, including silver base, blue screen. */}
   {p.scene05ShowIntro!==false?<>
    <Txt id="intro-line-1" name="Intro: Boot dari" props={p} x={270} y={251} value="BOOT DARI" size={37} weight={800} color={INK} opacity={intro}/>
    <Txt id="intro-line-2" name="Intro: Flashdisk" props={p} x={270} y={302} value="FLASHDISK" size={43} weight={800} color={CORAL} opacity={intro}/>
   </>:null}
   <g transform={`translate(${lx} ${ly}) scale(${lw/410} ${lh/255})`} opacity={laptopOpacity}>
    <EditableSvgLayer id="laptop-shadow" name="Laptop — bayangan bawah" props={p} scene="S05">
     <rect x={18} y={243} width={374} height={19} rx={8} fill="#CED4D5" opacity={.4}/>
    </EditableSvgLayer>
    <EditableSvgLayer id="laptop-bezel" name="Laptop — bingkai layar" props={p} scene="S05">
     <rect x={10} y={0} width={390} height={220} rx={12} fill="#282D35"/>
    </EditableSvgLayer>
    <ScreenStages p={p} t={t}/>
    <EditableSvgLayer id="laptop-base" name="Laptop — alas perak" props={p} scene="S05">
     <path d="M5 220H405L418 237H-8Z" fill="#C8CFD3"/>
     <path d="M-8 237H418L406 240H4Z" fill="#A8B0B6"/>
     <rect x={168} y={223} width={75} height={6} rx={3} fill="#9AA5AD"/>
    </EditableSvgLayer>
   </g>
   <g transform={`translate(${ux} ${uy}) rotate(${uRotate}) scale(${uScale})`}>
    <USBGraphic p={p} opacity={usbOpacity}/>
   </g>
   {p.scene05ShowTextVO!==false && !p.showSubtitles ? timings.map(([start,end],i)=>{
    if(t<start||t>=end)return null;
    const alpha=fade(t,start,start+.27)*(1-fade(t,end-.25,end));
    return <Txt key={i} id={`subtitle-${i}`} name={`Teks VO — bagian ${i+1}`} props={p}
      x={270} y={773} value={subtitles[i]??''} size={20} weight={700} color={INK} opacity={alpha}/>;
   }):null}
  </svg>
 </AbsoluteFill>;
};
