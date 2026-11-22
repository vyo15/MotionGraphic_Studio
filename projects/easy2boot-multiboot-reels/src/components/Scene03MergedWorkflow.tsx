import React from 'react';
import {Interactive, useCurrentFrame} from 'remotion';
import type {Easy2BootScene03Props} from '../config/props';

/**
 * Scene 03 ACC (2026-11-21): Fold & Unfold + inline application loading.
 * All geometry is editable SVG/React. No flattened image, video or DOMParser
 * for the NEW folder, loader, cursor, window, drive selector, button or progress.
 *
 * Frames are ORIGINAL Scene03 source frames. Scene03ReadableEntrance is the
 * only owner of the separate 472-frame presentation/entrance time remap.
 * Nothing here changes Scene01, Scene02, the approved 02->03 bridge or S04-06.
 */
export const S03_MERGED_TIMING = {
  folderEnter: 93,
  fileClick: 155,
  foldStart: 158,
  foldEnd: 177,
  loaderStart: 171,
  loaderEnd: 190,
  unfoldStart: 188,
  unfoldEnd: 201,
  driveHover: 222,
  driveClick: 243,
  driveSelected: 262,
  makeClick: 296,
  progressStart: 315,
  progressDone: 388,
  readyHold: 419,
} as const;

const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const ease=(v:number)=>{const t=clamp(v);return t*t*(3-2*t)};
const tween=(f:number,a:number,b:number)=>ease((f-a)/Math.max(1,b-a));
const cursorPosition=(f:number,from:number,to:number,a:[number,number],b:[number,number]):[number,number]=>{
 const t=tween(f,from,to);return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
};

const EditableCursor:React.FC<{x:number;y:number;alpha:number;click:number}>=({x,y,alpha,click})=><g transform={`translate(${x.toFixed(2)} ${y.toFixed(2)})`} opacity={clamp(alpha)}>
 <Interactive.G name="S03 — Kursor / hotspot" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
  <path d="M0 0L2 57L18 43L31 77L45 71L30 36L51 37Z" fill="#FFFFFF" stroke="#26343C" strokeWidth={6} strokeLinejoin="round"/>
 </Interactive.G>
 <g opacity={click}>
  <Interactive.G name="S03 — Ring klik" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <circle cx={0} cy={0} r={32+14*click} stroke="#DF805F" strokeWidth={7} fill="none"/>
  </Interactive.G>
 </g>
 </g>;

/** Distinct folder/file elements, all selectable/editable independently. */
const FolderCard:React.FC<{selected:boolean;props:Easy2BootScene03Props}>=({selected,props:p})=><>
 <Interactive.G name="S03 — Jendela folder Easy2Boot" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>
  <rect x={98} y={717} width={885} height={640} rx={32} fill="#FFFFFF" stroke="#E2E7E7" strokeWidth={3}/>
  <rect x={98} y={717} width={885} height={91} rx={32} fill="#F3F6F6"/>
  <rect x={98} y={768} width={885} height={40} fill="#F3F6F6"/>
 </Interactive.G>
 <Interactive.G name="S03 — Ikon folder" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>
  <path d="M160 763v-21q0-10 10-10h36l12 12h16q12 0 12 12v25h-86Z" fill="#F5C890"/>
 </Interactive.G>
 <Interactive.Text name="S03 — Nama folder Easy2Boot" x={215} y={775} fill="#4A565B" fontSize={31} fontWeight={790} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>Easy2Boot_v2.xx</Interactive.Text>
 <Interactive.G name="S03 — Header daftar file" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>
  <rect x={142} y={850} width={797} height={79} rx={15} fill="#F8FAFA" stroke="#E7EBEB" strokeWidth={2}/>
 </Interactive.G>
 <Interactive.Text name="S03 — Kolom Name" x={172} y={901} fontSize={31} fill="#6D797B" fontWeight={650} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>Name</Interactive.Text>
 <Interactive.Text name="S03 — Kolom Type" x={825} y={901} fontSize={29} textAnchor="end" fill="#99A0A1" fontWeight={650} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>Type</Interactive.Text>
 <Interactive.G name="S03 — Seleksi file EXE" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>
  <rect x={142} y={951} width={797} height={142} rx={20} fill={selected?'#FEEBE3':'#EDF5F9'} stroke="#A5CBDC" strokeWidth={3}/>
 </Interactive.G>
 <Interactive.G name="S03 — Ikon file EXE" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>
  <rect x={175} y={982} width={94} height={87} rx={17} fill="#E7F2F8"/>
  <rect x={204} y={1000} width={35} height={49} fill="#5D94B6"/>
  <path d="M213 1014h17m-17 11h17m-17 11h13" stroke="white" strokeWidth={5} strokeLinecap="round"/>
 </Interactive.G>
 <Interactive.Text name="S03 — Nama file Make_E2B.exe" x={300} y={1017} fontSize={49} fontWeight={830} fill="#26353E" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>Make_E2B.exe</Interactive.Text>
 <Interactive.Text name="S03 — Jenis aplikasi" x={300} y={1062} fontSize={28} fontWeight={640} fill="#8A979B" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>Application</Interactive.Text>
 <Interactive.Text name="S03 — Ekstensi EXE" x={894} y={1027} textAnchor="end" fontSize={28} fill="#9FA5A6" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>EXE</Interactive.Text>
 <Interactive.G name="S03 — Tombol Buka aplikasi" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>
  <path d="M153 1136H923" stroke="#E7EAEA" strokeWidth={3}/>
  <rect x={172} y={1184} width={404} height={79} rx={19} fill="#26353D"/>
 </Interactive.G>
 <Interactive.Text name="S03 — Teks Buka aplikasi" x={374} y={1237} fill="white" textAnchor="middle" fontSize={31} fontWeight={800} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>BUKA APLIKASI</Interactive.Text>
 </>;

const LoadingPill:React.FC<{frame:number}>=({frame})=><>
 <Interactive.G name="S03 — Loading pill" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>
  <rect x={336} y={899} width={408} height={126} rx={27} fill="white" stroke="#DEE6E5" strokeWidth={3}/>
  <rect x={359} y={918} width={81} height={88} rx={21} fill="#FEECE5"/>
 </Interactive.G>
 <g transform={`rotate(${((frame-S03_MERGED_TIMING.loaderStart)*22)%360} 400 961)`}>
  <Interactive.G name="S03 — Loading spinner" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>
   <circle cx={400} cy={961} r={24} fill="none" stroke="#F3C7B4" strokeWidth={8}/>
   <path d="M400 937a24 24 0 0 1 24 24" fill="none" stroke="#DF805F" strokeWidth={8} strokeLinecap="round"/>
  </Interactive.G>
 </g>
 <Interactive.Text name="S03 — Loading nama EXE" x={463} y={956} fontSize={28} fontWeight={820} fill="#25343A" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>Make_E2B.exe</Interactive.Text>
 <Interactive.Text name="S03 — Loading keterangan" x={463} y={987} fontSize={23} fontWeight={650} fill="#8C999A" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>Membuka aplikasi...</Interactive.Text>
 </>;

const AppWindow:React.FC<{p:Easy2BootScene03Props;frame:number}>=({p,frame:f})=>{
 const T=S03_MERGED_TIMING;
 const choose=tween(f,T.driveClick,T.driveSelected);
 const dropdown=ease((f-225)/8)*(1-ease((f-249)/10));
 const doing=tween(f,T.progressStart,T.progressStart+7);
 const done=tween(f,T.progressDone,T.progressDone+9);
 const progress=tween(f,T.progressStart,T.progressDone);
 const pct=Math.min(100,Math.round(progress*100));
 const finished=f>=T.progressDone+5;
 return <>
  <Interactive.G name="S03 — Jendela Make_E2B.exe" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>
   <rect x={95} y={685} width={893} height={671} rx={31} fill="white" stroke="#DEE5E5" strokeWidth={3}/>
   <rect x={95} y={685} width={893} height={85} rx={31} fill="#EDF1F2"/>
   <rect x={95} y={735} width={893} height={35} fill="#EDF1F2"/>
   <rect x={131} y={714} width={24} height={28} rx={5} fill="#DF805F"/>
  </Interactive.G>
  <Interactive.Text name="S03 — Nama aplikasi" x={174} y={742} fontSize={29} fill="#3B484F" fontWeight={790} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>Make_E2B.exe</Interactive.Text>
  <Interactive.Text name="S03 — Kontrol jendela" x={930} y={737} textAnchor="end" fontSize={30} fill="#A1A9AD" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>−   □   ×</Interactive.Text>
  <Interactive.Text name="S03 — Label USB Drive" x={139} y={817} fontSize={28} fill="#717D7F" fontWeight={780} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>USB DRIVE</Interactive.Text>
  <Interactive.G name="S03 — Dropdown USB Drive" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>
   <rect x={133} y={842} width={674} height={101} rx={14} fill="#F7FBFB" stroke={choose>0?'#DF805F':'#BACBCF'} strokeWidth={choose>0?4:3}/>
   <path d="M748 883l20 20 20-20" fill="none" stroke="#55686F" strokeWidth={6} strokeLinejoin="round" strokeLinecap="round"/>
  </Interactive.G>
  {p.usbDriveLabel==='E: USB Flash Drive  —  32 GB' ?
   <Interactive.Text name="S03 — Nama USB 32 GB" x={164} y={904} fontSize={39} fontWeight={820} fill="#273741" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>E: USB Flash Drive — 32 GB</Interactive.Text> :
   <Interactive.Text name="S03 — Nama USB dari Props" x={164} y={904} fontSize={39} fontWeight={820} fill="#273741" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>{p.usbDriveLabel}</Interactive.Text>}
  <Interactive.G name="S03 — Tombol Refresh" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>
   <rect x={826} y={842} width={127} height={102} rx={14} fill="#ECF1F1" stroke="#DDE6E4" strokeWidth={3}/>
  </Interactive.G>
  <Interactive.Text name="S03 — Teks Refresh" x={889} y={904} textAnchor="middle" fontSize={25} fontWeight={790} fill="#58686D" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>Refresh</Interactive.Text>

  {dropdown>0.01 ? <g opacity={dropdown}>
   <Interactive.G name="S03 — Daftar pilih USB" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>
    <rect x={133} y={945} width={674} height={126} rx={14} fill="white" stroke="#BECBD0" strokeWidth={3}/>
    <rect x={149} y={954} width={643} height={104} rx={11} fill="#FDEFEA"/>
    <path d="M746 1003l18 18 28-40" stroke="#31A878" strokeWidth={8} fill="none" strokeLinecap="round"/>
   </Interactive.G>
   <Interactive.Text name="S03 — Opsi USB di dropdown" x={169} y={1019} fontSize={36} fontWeight={800} fill="#46555B" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>E: USB Flash Drive — 32 GB</Interactive.Text>
  </g>:null}

  <Interactive.G name="S03 — Area aksi/progres (satu jendela)" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>
   <rect x={131} y={975} width={822} height={259} rx={18} fill="#F6F8F7" stroke="#E1E8E6" strokeWidth={2}/>
  </Interactive.G>
  {doing<1 ? <g opacity={1-doing}>
   <Interactive.G name="S03 — Tombol Make E2B Drive" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>
    <rect x={169} y={1021} width={450} height={146} rx={19} fill={f>=T.makeClick&&f<T.makeClick+7?'#B95046':'#D95E4F'}/>
    <path d="M220 1094h51m-15-17 21 17-21 17" stroke="white" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
   </Interactive.G>
   <Interactive.Text name="S03 — Teks Make E2B Drive" x={298} y={1109} fontSize={33} fill="white" fontWeight={830} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>Make E2B Drive</Interactive.Text>
   <Interactive.G name="S03 — Ikon peringatan" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>
    <path d="M660 1037l25-42 25 42Z" fill="#E69D61"/>
    <rect x={682} y={1009} width={6} height={17} fill="white"/>
    <circle cx={685} cy={1032} r={3} fill="white"/>
   </Interactive.G>
   <Interactive.Text name="S03 — Warning" x={650} y={1085} fontSize={24} fontWeight={830} fill="#8B6462" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>Warning:</Interactive.Text>
   <Interactive.Text name="S03 — USB drive will" x={651} y={1125} fontSize={24} fontWeight={700} fill="#956D67" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>USB drive will</Interactive.Text>
   <Interactive.Text name="S03 — be erased" x={651} y={1165} fontSize={24} fontWeight={700} fill="#956D67" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>be erased!</Interactive.Text>
  </g>:null}
  {doing>0 ? <g opacity={doing}>
   <Interactive.G name="S03 — Indikator proses" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>
    <circle cx={188} cy={1047} r={27} fill={finished?'#DDF2E8':'#FFF0EA'}/>
    {finished?<path d="M173 1047l13 12 20-28" fill="none" stroke="#26966F" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round"/>:<g transform={`rotate(${f*18} 188 1047)`}><path d="M188 1026a21 21 0 0 1 21 21" fill="none" stroke="#DF805F" strokeWidth={6} strokeLinecap="round"/></g>}
   </Interactive.G>
   {!finished?<Interactive.Text name="S03 — Membuat USB" x={235} y={1060} fontSize={39} fontWeight={800} fill="#25343A" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>Membuat USB multiboot</Interactive.Text>:null}
   {finished?<Interactive.Text name="S03 — USB selesai" x={235} y={1060} fontSize={39} fontWeight={800} fill="#25343A" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>USB multiboot selesai</Interactive.Text>:null}
   <Interactive.Text name="S03 — Drive E Easy2Boot" x={181} y={1126} fontSize={29} fontWeight={690} fill="#78878A" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>Drive E: • Easy2Boot</Interactive.Text>
   <Interactive.G name="S03 — Track progress" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}><rect x={180} y={1159} width={730} height={26} rx={13} fill="#E2E9E7"/></Interactive.G>
   <Interactive.G name="S03 — Isi progress" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}><rect x={180} y={1159} width={Math.max(0,730*progress)} height={26} rx={13} fill={finished?'#299C78':'#DF805F'}/></Interactive.G>
   <Interactive.Text name="S03 — Angka progress (simulasi)" x={910} y={1131} textAnchor="end" fontSize={35} fontWeight={850} fill={finished?'#299C78':'#DF805F'} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>{pct}%</Interactive.Text>
   {!finished?<Interactive.Text name="S03 — Keterangan progress" x={180} y={1220} fontSize={26} fontWeight={710} fill="#8C9898" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>Sedang menyiapkan flashdisk...</Interactive.Text>:null}
   {finished?<Interactive.Text name="S03 — Berikutnya salin ISO" x={180} y={1220} fontSize={27} fontWeight={710} fill="#5E7579" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>Berikutnya: salin file ISO</Interactive.Text>:null}
  </g>:null}
 </>;
};

export const Scene03MergedWorkflow:React.FC<{props:Easy2BootScene03Props}>=({props:p})=>{
 const f=useCurrentFrame(); const T=S03_MERGED_TIMING;
 if(f<T.folderEnter)return null;
 const folderIn=tween(f,T.folderEnter,T.folderEnter+22);
 const fold=tween(f,T.foldStart,T.foldEnd);
 const folderOpacity=folderIn*(1-tween(f,T.foldStart,T.foldEnd));
 const foldedScale=.88+.12*folderIn;
 const loadingOpacity=tween(f,T.loaderStart,T.loaderStart+7)*(1-tween(f,T.loaderEnd-6,T.loaderEnd+4));
 const appIn=tween(f,T.unfoldStart,T.unfoldEnd);
 const titleOpacity=tween(f,T.folderEnter,T.folderEnter+24)*(1-tween(f,T.unfoldStart+1,T.unfoldEnd+12));
 const [fx,fy]=cursorPosition(f,118,T.fileClick-6,[825,1276],[463,1010]);
 const [ax,ay]=cursorPosition(f,T.unfoldEnd+2,T.driveClick-5,[905,1143],[764,883]);
 const [bx,by]=cursorPosition(f,272,T.makeClick-4,[767,907],[419,1091]);
 const pointerVisible=(f>=118&&f<T.foldStart)||(f>=T.unfoldEnd+2&&f<T.makeClick+8);
 const pos=(f<T.unfoldStart)?[fx,fy]:f<272?[ax,ay]:[bx,by];
 const click=(f>=T.fileClick&&f<T.fileClick+7?1-tween(f,T.fileClick,T.fileClick+7):
              f>=T.driveClick&&f<T.driveClick+7?1-tween(f,T.driveClick,T.driveClick+7):
              f>=T.makeClick&&f<T.makeClick+9?1-tween(f,T.makeClick,T.makeClick+9):0);
 return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width={1080} height={1920}
  style={{position:'absolute',inset:0,width:'100%',height:'100%',overflow:'visible',fontFamily:p.fontFamily,pointerEvents:'none'}}>
  <g opacity={clamp(titleOpacity)}>
   <Interactive.Text name="S03 — Judul BUKA" x={92} y={437} fontSize={67} fill="#7E8787" fontWeight={700} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>BUKA</Interactive.Text>
   {p.titleOpen==='EASY2BOOT.' ? <Interactive.Text name="S03 — Judul EASY2BOOT" x={87} y={558} fontSize={108} fontWeight={850} fill="#DF805F" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>EASY2BOOT.</Interactive.Text> :
    <Interactive.Text name="S03 — Judul dari Props" x={87} y={558} fontSize={108} fontWeight={850} fill="#DF805F" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}>{p.titleOpen}</Interactive.Text>}
  </g>
  {folderOpacity>0.001?<g opacity={folderOpacity} transform={`translate(540 1037) scale(${(foldedScale*(1-.75*fold)).toFixed(4)} ${(foldedScale*(1-.55*fold)).toFixed(4)}) translate(-540 -1037)`}>
   <FolderCard selected={f>=T.fileClick} props={p}/>
  </g>:null}
  {loadingOpacity>0.001?<g opacity={loadingOpacity}>
   <g transform={`translate(540 960) scale(${(0.82+0.18*tween(f,T.loaderStart,T.loaderStart+10)).toFixed(4)}) translate(-540 -960)`}>
    <LoadingPill frame={f}/>
   </g>
  </g>:null}
  {appIn>0.001?<g opacity={appIn} transform={`translate(540 1010) scale(${(.34+.66*appIn).toFixed(4)} ${(.80+.20*appIn).toFixed(4)}) translate(-540 -1010)`}>
   <AppWindow p={p} frame={f}/>
  </g>:null}
  {pointerVisible?<EditableCursor x={pos[0]} y={pos[1]} alpha={(f<T.unfoldStart?folderOpacity:appIn)} click={click}/>:null}
 </svg>;
};
