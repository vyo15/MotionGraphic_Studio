import React from 'react';
import {AbsoluteFill,Freeze,Interactive,useCurrentFrame} from 'remotion';
import type {Easy2BootScene03Props,LayerOverrides} from '../config/props';
import {Scene05Boot} from './Scene05Boot';
import {InstallerTile,UsbParts} from '../components/Scene06EditableIcons';
import {fadeWindowS06,progressS06,lerpS06} from '../animations/scene06Acc';

/**
 * S06 — USER ACC / LOCKED: CTA Mix + USB Match Move to compact Reels cover.
 * 390 frames (13 s, 30 FPS). No embedded MP4, image-gen still, SVG string,
 * DOMParser, canvas bitmap, or motion hidden inside one selectable SVG group.
 * Individual major objects and text are native Remotion Interactive elements.
 * Outer <g> has frame-controlled motion; inner Interactive positions remain
 * independent and editable without destroying the approved animation.
 * In Remotion Studio, native text direct-Save behaviour still needs Windows QA.
 */
const INK='#202628',CORAL='#DF805F',PAPER='#F7F7F5',MUTED='#737C7F';
const ease=(t:number,a:number,b:number)=>progressS06(t,a,b);
const show=(t:number,a:number,b:number,c:number,d:number)=>fadeWindowS06(t,a,b,c,d);

const TextLine:React.FC<{
 name:string;x:number;y:number;size:number;color?:string;weight?:number;
 children:React.ReactNode;opacity?:number;offsetY?:number;align?:'start'|'middle'|'end';
 editId?:string;overrides?:LayerOverrides;
}>=({name,x,y,size,color=INK,weight=800,children,opacity=1,offsetY=0,align='middle',editId,overrides})=>{
 const o=editId ? overrides?.[`S06:${editId}`] : undefined;
 if(o?.visible===false)return null;
 return <g opacity={opacity*(o?.opacity??1)}
  transform={`translate(${x+(o?.x??0)} ${y+(o?.y??0)+offsetY}) rotate(${o?.rotation??0}) scale(${o?.scale??1})`}
  fontFamily={o?.fontFamily??'Inter, Arial, sans-serif'} fontSize={o?.fontSize??size}
  fontWeight={o?.fontWeight??weight} fill={o?.fill??color} textAnchor={align}>
   {o?.text!==undefined
     ? <Interactive.Text name={`${name} — Props override`} x={0} y={0} dominantBaseline="middle"
        style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{o.text}</Interactive.Text>
     : typeof children==='string'
       ? <Interactive.Text name={name} x={0} y={0} dominantBaseline="middle"
          style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{children}</Interactive.Text>
       : children}
  </g>;
};

const UsbSingle:React.FC<{x:number;y:number;s:number;alpha:number;overrides?:LayerOverrides}>=({x,y,s,alpha,overrides})=>{
 const o=overrides?.['S06:usb-old'];if(o?.visible===false)return null;
 return <g opacity={alpha*(o?.opacity??1)} transform={`translate(${x+(o?.x??0)} ${y+(o?.y??0)}) rotate(${o?.rotation??0}) scale(${s*(o?.scale??1)})`}>
 <UsbParts scope="OLD">
  <g transform="translate(83 245)"><InstallerTile name="S06 — USB biasa — tile Windows 10" id="s06-win10-single" version="10" w={103} h={112}/></g>
 </UsbParts>
 </g>;
};

const UsbMultiboot:React.FC<{x:number;y:number;s:number;alpha:number;t:number;overrides?:LayerOverrides}>=({x,y,s,alpha,t,overrides})=>{
 const o=overrides?.['S06:usb-multi'];if(o?.visible===false)return null;
 const installerSteps:[string,number,number,number][]=[['8',49,239,0],['10',141,239,1],['11',49,326,2],['LINUX',141,326,3]];
 const tileMove=(index:number,axis:'x'|'y')=>{
  const ent=ease(t,4.70+index*.10,5.67+index*.10);
  if(axis==='x')return (index%2===0?-90:90)*(1-ent);
  return 55*(1-ent);
 };
 return <g opacity={alpha*(o?.opacity??1)} transform={`translate(${x+(o?.x??0)} ${y+(o?.y??0)}) rotate(${o?.rotation??0}) scale(${s*(o?.scale??1)})`}>
  <UsbParts scope="MULTI">
   <g opacity={ease(t,4.70,5.67)} transform={`translate(${49+tileMove(0,'x')} ${239+tileMove(0,'y')})`}>
    <InstallerTile name="S06 — Multiboot — Windows 8" id="s06-win8" version="8"/>
   </g>
   <g opacity={ease(t,4.80,5.77)} transform={`translate(${141+tileMove(1,'x')} ${239+tileMove(1,'y')})`}>
    <InstallerTile name="S06 — Multiboot — Windows 10" id="s06-win10" version="10"/>
   </g>
   <g opacity={ease(t,4.90,5.87)} transform={`translate(${49+tileMove(2,'x')} ${326+tileMove(2,'y')})`}>
    <InstallerTile name="S06 — Multiboot — Windows 11" id="s06-win11" version="11"/>
   </g>
   <g opacity={ease(t,5.00,5.97)} transform={`translate(${141+tileMove(3,'x')} ${326+tileMove(3,'y')})`}>
    <InstallerTile name="S06 — Multiboot — Linux" id="s06-linux" version="LINUX"/>
   </g>
  </UsbParts>
 </g>;
};

const CommentIcon:React.FC=()=> <Interactive.G
 name="S06 — Ikon komentar"
 style={{
  translate: '-37.2px 0px',
  scale: 1,
  rotate: '0deg',
  opacity: 1
 }}
>
 <path d="M8 11 H70 Q76 11 76 21 V51 Q76 60 66 60 H34 L18 76 L22 58 Q8 58 8 46 V25 Q8 11 22 11 Z" fill="none" stroke={CORAL} strokeWidth={6} strokeLinejoin="round"/>
 <circle cx={29} cy={37} r={4} fill={CORAL}/><circle cx={42} cy={37} r={4} fill={CORAL}/><circle cx={55} cy={37} r={4} fill={CORAL}/>
 </Interactive.G>;

export const Scene06Closing:React.FC<Easy2BootScene03Props>=(p)=>{
 const frame=useCurrentFrame();
 const t=frame/30;
 // Exact match-move of the same multiboot USB from the CTA comparison to cover.
 const appear=ease(t,1.05,1.65),shift=ease(t,3.98,5.00),exit=ease(t,10.14,11.22);
 const oldX=lerpS06(lerpS06(220,61,shift),-275,exit);
 const oldY=lerpS06(400,378,appear);
 const oldScale=lerpS06(lerpS06(1.01,.88,shift),.68,exit);
 const oldAlpha=appear*(1-ease(t,10.28,10.82));
 const manyAlpha=ease(t,4.22,5.04);
 const manyStartX=lerpS06(740,392,manyAlpha);
 const manyX=lerpS06(manyStartX,(720-270*.70)/2,exit);
 const manyY=lerpS06(382-(1-manyAlpha)*30,544,exit);
 const manyScale=lerpS06(.97,.70,exit);
 const oldTitle=show(t,.7,1.35,3.94,4.32);
 const multiTitle=show(t,4.18,4.74,7.23,7.58);
 const question=show(t,7.68,8.2,10.12,10.70);
 const cta=show(t,8.02,8.60,10.13,10.86);
 const captionsVisible=p.scene06ShowTextVO!==false && !p.showSubtitles;
 const oldWords=(p.ctaOld||'BOOTABLE ULANG?').replace(/\s*ULANG\??$/i,'').trim()||'BOOTABLE';
 const bottomAlpha=(1-ease(t,10.08,10.70));
 const voiceOld=t<4.1 ? ease(t,.85,1.20)*bottomAlpha : 0;
 const voiceMulti=t>=4.1&&t<8 ? (1-ease(t,7.32,7.77))*bottomAlpha : 0;
 const voiceComment=t>=8 ? ease(t,8.05,8.46)*bottomAlpha : 0;
 return <AbsoluteFill style={{background:p.backgroundColor??PAPER}}>
  <svg width="100%" height="100%" viewBox="0 0 720 1280" preserveAspectRatio="xMidYMid meet"
   xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scene 06: Bootable ulang atau multiboot? CTA Match Move dan cover Reels">
   {/* Background is plain: no extra editorial header, footer, grid, or ornaments. */}
   <Interactive.G name="S06 — Background polos" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <rect width={720} height={1280} fill={p.backgroundColor??PAPER}/>
   </Interactive.G>
   <TextLine editId="headline-a-bootable" overrides={p.layerOverrides} name="S06 — Headline A: BOOTABLE" x={360} y={188} size={58} opacity={oldTitle} offsetY={(1-oldTitle)*-30}><Interactive.Text name="S06 — Headline A: BOOTABLE" x={0} y={0} dominantBaseline="middle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{oldWords}</Interactive.Text></TextLine>
   <TextLine editId="headline-a-ulang" overrides={p.layerOverrides} name="S06 — Headline A: ULANG?" x={360} y={258} size={68} color={CORAL} opacity={oldTitle} offsetY={(1-oldTitle)*-30}><Interactive.Text name="S06 — Headline A: ULANG?" x={0} y={0} dominantBaseline="middle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>ULANG?</Interactive.Text></TextLine>
   <TextLine editId="headline-b-atau-multiboot" overrides={p.layerOverrides} name="S06 — Headline B: ATAU MULTIBOOT?" x={360} y={245} size={54} opacity={multiTitle}><Interactive.Text name="S06 — Headline B: ATAU MULTIBOOT?" x={0} y={0} dominantBaseline="middle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{`ATAU ${p.ctaMulti||'MULTIBOOT?'}`}</Interactive.Text></TextLine>
   <g opacity={multiTitle}>
    <Interactive.G name="S06 — Garis aksen bawah Multiboot" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     <path d="M125 302H595" stroke={CORAL} strokeWidth={4}/>
    </Interactive.G>
   </g>
   <TextLine editId="pertanyaan-kamu-tim-mana" overrides={p.layerOverrides} name="S06 — Pertanyaan: KAMU TIM MANA?" x={360} y={212} size={52} opacity={question} offsetY={(1-question)*5}><Interactive.Text name="S06 — Pertanyaan: KAMU TIM MANA?" x={0} y={0} dominantBaseline="middle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene06Question??'KAMU TIM MANA?'}</Interactive.Text></TextLine>
   <UsbSingle x={oldX} y={oldY} s={oldScale} alpha={oldAlpha} overrides={p.layerOverrides}/>
   <UsbMultiboot x={manyX} y={manyY} s={manyScale} alpha={manyAlpha} t={t} overrides={p.layerOverrides}/>
   <TextLine editId="jumlah-installer-bootable-ulang" overrides={p.layerOverrides} name="S06 — Jumlah installer bootable ulang" x={185} y={835} size={23} opacity={show(t,2.25,2.62,7.3,7.86)} weight={700}><Interactive.Text name="S06 — Jumlah installer bootable ulang" x={0} y={0} dominantBaseline="middle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>1 INSTALLER</Interactive.Text></TextLine>
   <TextLine editId="jumlah-installer-multiboot" overrides={p.layerOverrides} name="S06 — Jumlah installer multiboot" x={523} y={835} size={23} opacity={show(t,5.12,5.55,7.3,7.86)} weight={700}><Interactive.Text name="S06 — Jumlah installer multiboot" x={0} y={0} dominantBaseline="middle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>4 INSTALLER</Interactive.Text></TextLine>
   {/* Comment prompt is a single animated unit; inner icon/text separately editable. */}
   <g opacity={cta} transform={`translate(0 ${(1-cta)*-10})`}>
    <Interactive.G name="S06 — Pita CTA halus" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     <rect x={91} y={875} width={538} height={85} rx={26} fill="#FFFFFF" fillOpacity={.72}/>
    </Interactive.G>
    <g transform="translate(215 877) scale(.875)"><CommentIcon/></g>
    <TextLine editId="cta-tulis-pilihanmu" overrides={p.layerOverrides} name="S06 — CTA: TULIS PILIHANMU" x={415} y={919} size={32} color={CORAL}><Interactive.Text
     name="S06 — CTA: TULIS PILIHANMU"
     x={0}
     y={0}
     dominantBaseline="middle"
     style={{
      translate: '7.5px -7.5px',
      scale: 1,
      rotate: '0deg',
      opacity: 1
     }}
    >{p.scene06Prompt??'TULIS PILIHANMU'}</Interactive.Text></TextLine>
   </g>
   {/* VO GUIDE: simple direct text, no lower-third box. Editable and switchable. */}
   {captionsVisible?<>
    <TextLine editId="vo-kalau-kamu-biasanya" overrides={p.layerOverrides} name="S06 — VO: Kalau kamu, biasanya" x={360} y={1016} size={29} opacity={voiceOld} weight={740}><Interactive.Text name="S06 — VO: Kalau kamu, biasanya" x={0} y={0} dominantBaseline="middle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Kalau kamu, biasanya</Interactive.Text></TextLine>
    <TextLine editId="vo-bikin-bootable-ulang" overrides={p.layerOverrides} name="S06 — VO: bikin bootable ulang" x={360} y={1058} size={29} opacity={voiceOld} weight={740}><Interactive.Text name="S06 — VO: bikin bootable ulang" x={0} y={0} dominantBaseline="middle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>bikin bootable ulang</Interactive.Text></TextLine>
    <TextLine editId="vo-atau-pakai-multiboot" overrides={p.layerOverrides} name="S06 — VO: atau pakai multiboot?" x={360} y={1016} size={29} opacity={voiceMulti} weight={740}><Interactive.Text
     name="S06 — VO: atau pakai multiboot?"
     x={0}
     y={0}
     dominantBaseline="middle"
     style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}
    >atau pakai multiboot?</Interactive.Text></TextLine>
    <TextLine editId="vo-coba-tulis" overrides={p.layerOverrides} name="S06 — VO: Coba tulis" x={360} y={1016} size={29} opacity={voiceComment} weight={740}><Interactive.Text name="S06 — VO: Coba tulis" x={0} y={0} dominantBaseline="middle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Coba tulis</Interactive.Text></TextLine>
    <TextLine editId="vo-di-kolom-komentar" overrides={p.layerOverrides} name="S06 — VO: di kolom komentar!" x={360} y={1058} size={29} opacity={voiceComment} weight={740}><Interactive.Text name="S06 — VO: di kolom komentar!" x={0} y={0} dominantBaseline="middle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>di kolom komentar!</Interactive.Text></TextLine>
   </>:null}
   {/* Cover title follows the USB's movement, never replaces it with a new layer. */}
   <TextLine editId="cover-easy2boot" overrides={p.layerOverrides} name="S06 — Cover: EASY2BOOT" x={360} y={352} size={28} color={CORAL} opacity={ease(t,11.13,11.50)} weight={800} offsetY={(1-ease(t,11.13,11.50))*15}><Interactive.Text name="S06 — Cover: EASY2BOOT" x={0} y={0} dominantBaseline="middle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.coverBrand??'EASY2BOOT'}</Interactive.Text></TextLine>
   <TextLine editId="cover-1-flashdisk" overrides={p.layerOverrides} name="S06 — Cover: 1 FLASHDISK" x={360} y={416} size={49} opacity={ease(t,11.26,11.70)} offsetY={(1-ease(t,11.26,11.70))*15}><Interactive.Text name="S06 — Cover: 1 FLASHDISK" x={0} y={0} dominantBaseline="middle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.coverLine1??'1 FLASHDISK'}</Interactive.Text></TextLine>
   <TextLine editId="cover-banyak-installer" overrides={p.layerOverrides} name="S06 — Cover: BANYAK INSTALLER" x={360} y={481} size={38} color={CORAL} opacity={ease(t,11.37,11.83)} offsetY={(1-ease(t,11.37,11.83))*15}><Interactive.Text name="S06 — Cover: BANYAK INSTALLER" x={0} y={0} dominantBaseline="middle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.coverLine2??'BANYAK INSTALLER'}</Interactive.Text></TextLine>
   <TextLine editId="cover-windows-8-10-11-linux" overrides={p.layerOverrides} name="S06 — Cover: Windows 8 · 10 · 11 · Linux" x={360} y={905} size={21} color={MUTED} opacity={ease(t,11.46,11.92)} weight={620}><Interactive.Text name="S06 — Cover: Windows 8 · 10 · 11 · Linux" x={0} y={0} dominantBaseline="middle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>WINDOWS 8  •  10  •  11  •  LINUX</Interactive.Text></TextLine>
  </svg>
  {/* The actual (editable) last Scene 05 frame overlays the background briefly,
      so the first second continues seamlessly from the previous scene. */}
  {frame<36?<AbsoluteFill style={{opacity:1-ease(t,.2,1.05)}}>
   <Freeze frame={485}><Scene05Boot {...p} /></Freeze>
  </AbsoluteFill>:null}
 </AbsoluteFill>;
};
