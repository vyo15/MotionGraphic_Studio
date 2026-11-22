import React from 'react';
import {AbsoluteFill,Interactive,useCurrentFrame} from 'remotion';
import {EditableSvgLayer} from '../components/EditableSvgLayer';
import type {Easy2BootScene03Props,LayerOverride} from '../config/props';
import {S05_STAGES,S05_VO_BEATS,S05_APPROVED_VO} from '../config/scene05Acc';

/**
 * S05 — ACC 21-11-2026, 486 frames (16.2 s), 540 × 960 design coordinates.
 * Source-editable and Props-editable SVG vectors. This is NOT one flat SVG/video.
 * Stages use the same laptop/monitor: USB -> Boot Menu -> agFM -> WIN11 ISO ->
 * boot-method -> loading -> Windows Setup. Boot menu wording is schematic and
 * may vary by hardware/firmware and installed agFM version.
 * All motion derives from useCurrentFrame(); no CSS runtime animations.
 */
const INK='#202020', CORAL='#DF805F', PAPER='#F7F7F5', MUTED='#858D8E';
const NAVY='#141D29', PANEL='#182733', OFFWHITE='#FAFAF9';
const FONT='Inter, Arial, sans-serif';
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const ease=(n:number)=>{const p=clamp(n);return p*p*(3-2*p);};
const lerp=(a:number,b:number,p:number)=>a+(b-a)*p;
const ap=(frame:number,start:number,end:number)=>ease((frame-start)/Math.max(1,end-start));

const G:React.FC<{id:string;name:string;p:Easy2BootScene03Props;children:React.ReactNode;opacity?:number;x?:number;y?:number;motion?:string}> =
 ({id,name,p,children,opacity=1,x=0,y=0,motion=''})=><EditableSvgLayer id={id} scene="S05" name={name} props={p}
  basePosition={{x,y}} opacity={opacity} animationTransform={motion}>{children}</EditableSvgLayer>;

const Text:React.FC<{id:string;name?:string;p:Easy2BootScene03Props;x:number;y:number;
  children:string;size?:number;color?:string;weight?:number;anchor?:'start'|'middle'|'end';opacity?:number}>=
 ({id,name,p,x,y,children,size=16,color=INK,weight=650,anchor='start',opacity=1})=>{
  const override:LayerOverride=p.layerOverrides?.[`S05:${id}`]??{};
  return <G id={id} name={name??id} p={p} x={x} y={y} opacity={opacity}>
   <text x={0} y={0} textAnchor={anchor} dominantBaseline="middle"
    fontFamily={override.fontFamily??p.fontFamily??FONT} fontSize={override.fontSize??size}
    fontWeight={override.fontWeight??weight} fill={override.fill??color}
    letterSpacing={override.letterSpacing??0}>{override.text??children}</text>
  </G>;
 };
const Win:React.FC<{x:number;y:number;unit?:number;fill?:string}>=({x,y,unit=18,fill='#1687CF'})=><g fill={fill}>
 {[0,1].flatMap(r=>[0,1].map(c=><rect key={`${r}-${c}`} x={x+c*(unit+3)} y={y+r*(unit+3)} width={unit} height={unit} rx={1}/>))}
 </g>;
const Folder:React.FC<{x:number;y:number;size?:number}>=({x,y,size=24})=><g transform={`translate(${x} ${y}) scale(${size/42})`}>
 <path d="M0 10V5Q0 0 6 0H20L26 7H36Q42 7 42 13V34Q42 38 38 38H4Q0 38 0 33Z" fill="#E9B47D"/>
 </g>;
const ISOIcon:React.FC<{x:number;y:number}>=({x,y})=><g transform={`translate(${x} ${y})`}>
 <path d="M0 0H16L24 8V31H0Z" fill="#E3E9ED" stroke="#AABAC3" strokeWidth={1}/>
 <path d="M16 0V8H24" fill="#C5D2D9"/>
 <circle cx={11} cy={17} r={5.5} fill="#AEBFC6"/><circle cx={11} cy={17} r={2.4} fill="#E3E9ED"/>
 </g>;
const Usb:React.FC<{p:Easy2BootScene03Props;x:number;y:number;scale:number;opacity:number}>=({p,x,y,scale,opacity})=><G id="usb-multiboot-object" name="USB empat installer — objek utama" p={p}
 x={x} y={y} opacity={opacity} motion={`scale(${scale})`}>
 <rect x={13} y={-32} width={32} height={35} rx={5} fill="#9EAFB6"/>
 <rect x={0} y={-3} width={58} height={122} rx={12} fill="#253943"/>
 <rect x={5} y={5} width={48} height={106} rx={8} fill="#324955"/>
 <rect x={10} y={20} width={38} height={31} rx={5} fill={CORAL}/>
 <text x={29} y={39} fontSize={15} fontWeight={760} fill="#FFFFFF" textAnchor="middle">USB</text>
 {[0,1,2,3].map(i=><g key={i} transform={`translate(${11+(i%2)*22},${59+Math.floor(i/2)*24})`}>
 <rect width={18} height={19} rx={3} fill={OFFWHITE}/>
 {i<3?<Win x={4} y={4} unit={4} fill="#438ABA"/>:<g><ellipse cx={9} cy={10} rx={5} ry={7} fill="#161B21"/><ellipse cx={9} cy={11} rx={3} ry={4} fill="white"/><path d="M5 16L9 17L13 16" stroke="#E5A52C" strokeWidth={2}/></g>}
 </g>)}
 </G>;

const ScreenBg:React.FC<{p:Easy2BootScene03Props;name:string;fill:string}>=({p,name,fill})=><G id={`screen-${name}`} name={`Laptop — layar ${name}`} p={p}>
 <rect x={38} y={304} width={464} height={280} rx={7} fill={fill}/>
 </G>;

const Row:React.FC<{p:Easy2BootScene03Props;id:string;y:number;label:string;selected?:boolean;iso?:boolean;empty?:boolean;fontSize?:number}>=
 ({p,id,y,label,selected=false,iso=false,empty=false,fontSize=16})=><>
 <G id={`row-${id}-bg`} name={`Menu — ${label} latar`} p={p}>
  <rect x={55} y={y-8} width={430} height={42} rx={6}
   fill={selected?CORAL:empty?'transparent':'#253A48'} opacity={selected?1:.92}/>
 </G>
 {iso?<G id={`row-${id}-iso`} name={`Ikon ISO — ${id}`} p={p}><ISOIcon x={64} y={y-3}/></G>:
 <G id={`row-${id}-folder`} name={`Ikon folder — ${id}`} p={p}><Folder x={64} y={y+2} size={24}/></G>}
 <Text id={`row-${id}-label`} name={`Nama menu — ${label}`} p={p} x={107} y={y+13}
  color={selected?'#FFFFFF':'#CBD9E1'} weight={selected?760:520} size={fontSize}>{label}</Text>
 </>;

const Laptop:React.FC<{p:Easy2BootScene03Props}>=({p})=><>
 <G id="laptop-bezel" name="Laptop — bezel" p={p}>
  <rect x={31} y={291} width={478} height={308} rx={14} fill="#26343D"/>
  <circle cx={270} cy={298} r={2.6} fill="#64717A"/>
 </G>
 <G id="laptop-base" name="Laptop — keyboard/perak" p={p}>
  <path d="M24 595H516L533 614H7Z" fill="#BAC3C6"/>
  <rect x={10} y={609} width={520} height={16} rx={6} fill="#D7DDDE"/>
  <rect x={239} y={601} width={62} height={5} rx={3} fill="#88959B"/>
  <rect x={91} y={628} width={358} height={7} rx={4} fill="#E8EAE9"/>
 </G>
 </>;

const Screen:React.FC<{p:Easy2BootScene03Props;f:number}>=({p,f})=>{
 const active=S05_STAGES.find(s=>f>=s.from&&f<s.to)??S05_STAGES[S05_STAGES.length-1];
 const part=active.id;const age=f-active.from;
 const entrance=ap(age,0,6);
 const introOpacity=1-(1-entrance)*.16;
 const header=(path?:string)=><>
  <G id="agfm-header-bg" name="agFM — header latar" p={p}>
   <rect x={38} y={304} width={464} height={50} rx={7} fill="#263B48"/>
   <path d="M54 353H486" stroke="#4D6674" strokeWidth={1}/>
   <rect x={413} y={314} width={73} height={27} rx={6} fill="#355060"/>
  </G>
  <Text id="agfm-title" p={p} x={54} y={330} size={18} color="#F4F7FA" weight={750}>Easy2Boot agFM</Text>
  <Text id="agfm-uefi" p={p} x={449} y={329} size={12} color="#DAEDF6" anchor="middle">UEFI64</Text>
  {path?<Text id="agfm-path" p={p} x={58} y={372} size={13} color="#A3C7D7">{path}</Text>:null}
 </>;
 return <g opacity={introOpacity}>
  {part==='usb'?<>
   <ScreenBg p={p} name="startup" fill="#101E2B"/>
   {f>=35?<Text id="usb-device-detected" p={p} x={270} y={429} anchor="middle" size={15} color="#AEC6D4">USB boot device detected</Text>:null}
  </>:null}
  {part==='boot-menu'?<>
   <ScreenBg p={p} name="boot-menu" fill={NAVY}/>
   <Text id="boot-menu-title" p={p} x={61} y={333} size={20} weight={760} color="#FFFFFF">Boot Menu</Text>
   <Text id="boot-uefi-label" p={p} x={457} y={332} size={12} weight={700} color="#99BACC" anchor="end">UEFI</Text>
   <G id="boot-menu-divider" name="Boot Menu — pemisah" p={p}><path d="M58 355H482" stroke="#4B6474" strokeWidth={2}/></G>
   <G id="boot-windows-row" name="Boot Menu — Windows Boot Manager" p={p}>
    <rect x={57} y={376} width={426} height={49} rx={6} fill={f<106?CORAL:'#263A48'}/>
   </G>
   <Text id="boot-windows-text" p={p} x={75} y={401} color={f<106?'#FFFFFF':'#C0D1DA'} size={18}>Windows Boot Manager</Text>
   <G id="boot-usb-highlight" name="Boot Menu — pilihan USB aktif" p={p}>
    <rect x={57} y={435} width={426} height={50} rx={6} fill={f>=106?CORAL:'#263A48'}/>
   </G>
   <Text id="boot-usb-text" p={p} x={75} y={459} color="#FFFFFF" size={18} weight={760}>{p.bootOption}</Text>
   <Text id="boot-menu-keys" p={p} x={60} y={564} color="#A8BFCB" size={13}>↑ ↓  Pilih    Enter  Konfirmasi</Text>
   {f>=130?<Text id="boot-key-enter" p={p} x={461} y={543} size={12} anchor="end" color="#DCE8F1">ENTER ↵</Text>:null}
  </>:null}
  {part.startsWith('agfm-')?<>
   <ScreenBg p={p} name="agfm" fill={PANEL}/>
   {part==='agfm-home'?<>
    {header()}
    <Row id="agfm-home-windows" p={p} y={380} label="WINDOWS Install ISOs" selected={age>33}/>
    <Row id="agfm-home-linux" p={p} y={423} label="LINUX ISOs"/>
    <Row id="agfm-home-tools" p={p} y={466} label="UTILITIES"/>
    <Row id="agfm-home-memtest" p={p} y={509} label="MEMTEST"/>
   </>:null}
   {part==='agfm-windows'?<>
    {header('/_ISO/WINDOWS')}
    <Row id="win8" p={p} y={394} label="WIN8" selected={age<21}/>
    <Row id="win10" p={p} y={438} label="WIN10"/>
    <Row id="win11" p={p} y={482} label="WIN11" selected={age>=21}/>
    <Row id="win-back" p={p} y={526} label=".." empty/>
   </>:null}
   {part==='agfm-win11'?<>
    {header('/_ISO/WINDOWS/WIN11')}
    <Row id="iso-win11" p={p} y={425} label={p.isoBootName} selected iso fontSize={17}/>
    <Row id="iso-back" p={p} y={480} label=".." empty/>
    {age>34?<Text id="iso-select-enter" p={p} x={270} y={547} anchor="middle" size={13} color="#E1EDF1">Pilih ISO  •  Enter ↵</Text>:null}
   </>:null}
   {part==='agfm-boot-method'?<>
    {header(p.isoBootName)}
    <Text id="method-label" p={p} x={61} y={405} size={14} weight={700} color="#A4C4D2">PILIH METODE BOOT</Text>
    <G id="method-selected" name="Pilihan metode boot ISO" p={p}>
     <rect x={55} y={430} width={430} height={54} rx={7} fill={CORAL}/>
    </G>
    <Text id="method-name" p={p} x={75} y={455} color="#FFFFFF" weight={770} size={17}>Boot Windows Install ISO</Text>
    <Text id="method-note" p={p} x={71} y={514} color="#AEC4CD" size={12}>Pilihan bergantung pada versi agFM</Text>
    {age>40?<Text id="method-enter" p={p} x={456} y={548} anchor="end" color="#DCE8F1" size={13}>ENTER ↵</Text>:null}
   </>:null}
   {part!=='agfm-boot-method'?<Text id="agfm-keys" p={p} x={58} y={568} size={13} color="#A9C0CC">↑ ↓  Pilih    Enter  Buka / Jalankan</Text>:null}
  </>:null}
  {part==='windows-loading'?<>
   <ScreenBg p={p} name="loading" fill="#08172A"/>
   <G id="loading-logo" name="Windows Setup — logo loading" p={p}><Win x={240} y={354} unit={22} fill="#56ACED"/></G>
   <G id="loading-spinner" name="Loading — putaran titik" p={p} motion={`rotate(${age*10} 270 497)`}>
    {[0,1,2,3,4,5,6,7].map(i=>{const a=Math.PI*2*i/8;return <circle key={i} cx={270+25*Math.cos(a)} cy={497+25*Math.sin(a)} r={3.8+i*.28} fill="#A6D4F2" opacity={.28+i*.09}/>;})}
   </G>
  </>:null}
  {part==='windows-setup'?<>
   <ScreenBg p={p} name="windows-setup" fill="#E7F0F8"/>
   <G id="setup-windows-logo" name="Windows Setup — logo" p={p}><Win x={238} y={335} unit={20} /></G>
   <Text id="setup-title" p={p} x={270} y={412} anchor="middle" size={23} weight={780} color="#183348">Windows Setup</Text>
   <Text id="setup-label-language" p={p} x={133} y={451} size={12} color="#284960">Language to install:</Text>
   <G id="setup-language-field" name="Windows Setup — language field" p={p}>
    <rect x={132} y={465} width={277} height={29} rx={4} fill="#FFFFFF" stroke="#A1B8C8"/>
   </G>
   <Text id="setup-language-value" p={p} x={141} y={480} size={12} color="#244359">English (United States)</Text>
   <Text id="setup-label-keyboard" p={p} x={133} y={519} size={12} color="#284960">Keyboard or input method:</Text>
   <G id="setup-keyboard-field" name="Windows Setup — keyboard field" p={p}>
    <rect x={132} y={534} width={277} height={28} rx={4} fill="#FFFFFF" stroke="#A1B8C8"/>
   </G>
   <Text id="setup-keyboard-value" p={p} x={141} y={547} size={12} color="#244359">US</Text>
  </>:null}
 </g>;
};

const wrap=(s:string,max=34)=>{
 const words=s.split(/\s+/).filter(Boolean);const result:string[]=[];let current='';
 for(const w of words){if((current+' '+w).trim().length>max&&current){result.push(current);current=w;}else current=(current+' '+w).trim();}
 if(current)result.push(current);return result;
};
export const Scene05Boot:React.FC<Easy2BootScene03Props>=(p)=>{
 const f=useCurrentFrame();
 const move=ap(f,8,54);
 const usbX=lerp(224,18,move),usbY=lerp(347,532,move)-19*Math.sin(Math.PI*move);
 const usbScale=lerp(1.3,.53,move);const usbOpacity=1-ap(f,53,57);
 const activeSegment=S05_VO_BEATS.flatMap((b,i)=>b.segments.map(s=>({...s,index:i}))).find(s=>f>=s.from&&f<s.to);
 const isDefault=p.scene05SubtitleLines.every((v,i)=>v===S05_APPROVED_VO[i]);
 const caption=activeSegment?(isDefault?activeSegment.text:p.scene05SubtitleLines[activeSegment.index]):'';
 const lines=wrap(caption,37);
 const footAlpha=ap(f,10,19);
 return <AbsoluteFill style={{background:p.backgroundColor}}>
  <svg xmlns="http://www.w3.org/2000/svg" width={1080} height={1920} viewBox="0 0 540 960"
   style={{position:'absolute',inset:0,width:'100%',height:'100%',overflow:'visible'}}>
   {/* Plain off-white editorial background; no large circular decoration. */}
   <G id="top-label" name="LANGKAH 05 — label" p={p}><rect x={0} y={0} width={540} height={960} fill={PAPER} opacity={0}/></G>
   <Text id="step-number" name="Langkah 05" p={p} x={39} y={164} size={17} color={MUTED} weight={760}>LANGKAH 05</Text>
   <Text id="heading-boot" name="Judul BOOT" p={p} x={39} y={205} size={29} weight={800}>BOOT</Text>
   <Text id="heading-usb" name="Judul FLASHDISK" p={p} x={134} y={205} size={29} color={CORAL} weight={800}>FLASHDISK.</Text>
   <Laptop p={p}/>
   <Screen p={p} f={f}/>
   {f<57?<Usb p={p} x={usbX} y={usbY} scale={usbScale} opacity={usbOpacity}/>:null}
   {p.scene05ShowTextVO&&!p.showSubtitles&&isDefault?<g opacity={footAlpha}>
    {/* 5 native text callsites for Remotion Studio direct-text editing (unlike dynamic .map()). */}
    {f<60?<Interactive.Text name="S05 — Subtitle VO 1" x={270} y={745} textAnchor="middle"
     fontFamily="Inter, Arial, sans-serif" fontSize={18} fontWeight={700} fill="#202020"
     style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Sekarang, booting seperti biasa,</Interactive.Text>:null}
    {f>=60&&f<144?<Interactive.Text name="S05 — Subtitle VO 2" x={270} y={745} textAnchor="middle"
     fontFamily="Inter, Arial, sans-serif" fontSize={18} fontWeight={700} fill="#202020"
     style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Pilih booting USB.</Interactive.Text>:null}
    {f>=144&&f<309?<Interactive.Text name="S05 — Subtitle VO 3" x={270} y={745} textAnchor="middle"
     fontFamily="Inter, Arial, sans-serif" fontSize={18} fontWeight={700} fill="#202020"
     style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><tspan x={270} dy={0}>Begitu muncul, kamu tinggal pilih ISO</tspan><tspan x={270} dy={27}>yang kamu butuhkan.</tspan></Interactive.Text>:null}
    {f>=309&&f<402?<Interactive.Text name="S05 — Subtitle VO 4" x={270} y={745} textAnchor="middle"
     fontFamily="Inter, Arial, sans-serif" fontSize={18} fontWeight={700} fill="#202020"
     style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Jalankan, dan beberapa saat kemudian,</Interactive.Text>:null}
    {f>=402?<Interactive.Text name="S05 — Subtitle VO 5" x={270} y={745} textAnchor="middle"
     fontFamily="Inter, Arial, sans-serif" fontSize={18} fontWeight={700} fill="#202020"
     style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Windows Setup pun terbuka.</Interactive.Text>:null}
   </g>:null}
   {p.scene05ShowTextVO&&!p.showSubtitles&&!isDefault&&activeSegment&&lines.map((line,i)=><Text
    key={`${activeSegment.from}-${i}`} id={`vo-caption-${activeSegment.from}-${i}`}
    name={`VO Guide — ${activeSegment.from} — ${i+1}`} p={p} x={270} y={742+27*i}
    anchor="middle" size={18} weight={700} color={INK} opacity={footAlpha}>{line}</Text>)}
  </svg>
 </AbsoluteFill>;
};
