import React from 'react';
import {AbsoluteFill, Interactive, useCurrentFrame} from 'remotion';
import {DEFAULT_PROPS, type VideoProps} from '../config/props';
import {EditorialClock} from '../components/EditorialClock';
import {QuestionOrnaments} from '../components/QuestionOrnaments';

/**
 * S04 visible order / Scene03 source: ACC variation 05 v15, now native React/SVG.
 * All titles, activity cards, status icons, progress bars, timeline and shutdown
 * notification remain vector-editable. The counter values are frame-derived;
 * drag the "Countdown" layer in Studio and change timing using source constants.
 * Scene03 question -> Scene04 solution shares EditorialClock for its match move.
 * The completed progress is an illustrative 60-minute time-lapse, not a Windows
 * promise to wait for a download before shutting down.
 */
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const ease=(v:number)=>{const t=clamp(v);return t*t*(3-2*t)};
const phase=(f:number,a:number,b:number)=>ease((f-a)/(b-a));
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const GREEN='#5B9C80';
const LIGHT='#E2E8E6';
const MUTED='#798B90';
const BACK='#FFFFFF';
const CAMERA_END=54;

const CLOCK_START=66;
const CLOCK_END=185;

const ActivityFilmCard:React.FC<{
  kind:'film'|'download'; frame:number; x:number; y:number;
  p:Required<VideoProps>;
}>=({kind,frame:f,x,y,p})=>{
 const film=true;
 const finished=film?p.solution04FilmCompletionFrame:p.solution04DownloadCompletionFrame;
 const initial=clamp((film?p.solution04FilmInitialPercent:p.solution04DownloadInitialPercent)/100);
 const progress=mix(initial,1,phase(f,film?34:39,finished));
 const completed=phase(f,finished,finished+2);
 const entered=phase(f,15,34);
 const left=phase(f,185,205);
 const alpha=entered*(1-left);
 return <g opacity={alpha} transform={`translate(${x} ${y+20*(1-entered)-15*left})`}>
  <Interactive.G name="S04 — Kartu film: permukaan dan bayangan" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <rect x={3} y={10} width={436} height={188} rx={36} fill="#B0BEBA" opacity={0.14}/>
   <rect width={436} height={188} rx={34} fill={BACK} stroke={LIGHT} strokeWidth={3}/>
  </Interactive.G>
  <Interactive.G name="S04 — Kartu film: ikon putar" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   {film?<><circle cx={52} cy={55} r={21} fill={p.navyColor}/><path d="M46 44L46 66L65 55Z" fill="white"/></>:
    <g stroke={p.navyColor} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M52 34V65M40 55L52 68L64 55M36 75H68"/></g>}
  </Interactive.G>
  <g opacity={completed}>
   <Interactive.G name="S04 — Film: centang selesai" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <circle cx={52} cy={55} r={21} fill={GREEN}/>
    <path d="M42 55L49 62L64 45" stroke="white" strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
   </Interactive.G>
  </g>
  <Interactive.Text name="S04 — Kartu film: judul Nonton film" x={94} y={63} fontSize={30} fontWeight={800} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Nonton film</Interactive.Text>
  <g opacity={1-completed}>
   <Interactive.Text name="S04 — Film: label sedang diputar" x={94} y={110} fontSize={21} fill={MUTED} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Sedang diputar</Interactive.Text>
  </g>
  <g opacity={completed}>
   <Interactive.Text name="S04 — Film: selesai 100 persen" x={94} y={110} fontSize={21} fontWeight={700} fill={GREEN} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>100% · selesai</Interactive.Text>
  </g>
  <Interactive.G name="S04 — Film: progress 62 ke 100 persen" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <rect x={47} y={138} width={340} height={18} rx={9} fill={LIGHT}/>
   <rect x={47} y={138} width={340*progress} height={18} rx={9} fill={completed>0.5?GREEN:film?p.navyColor:p.coralColor}/>
  </Interactive.G>
  <Interactive.G name="S04 — Film: status LED" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <circle cx={388} cy={33} r={7} fill={completed>0.5?GREEN:film?p.navyColor:p.coralColor} opacity={0.75+0.25*Math.sin(f/10)**2}/>
  </Interactive.G>
 </g>;
};


const ActivityDownloadCard:React.FC<{
  kind:'film'|'download'; frame:number; x:number; y:number;
  p:Required<VideoProps>;
}>=({kind,frame:f,x,y,p})=>{
 const film=false;
 const finished=film?p.solution04FilmCompletionFrame:p.solution04DownloadCompletionFrame;
 const initial=clamp((film?p.solution04FilmInitialPercent:p.solution04DownloadInitialPercent)/100);
 const progress=mix(initial,1,phase(f,film?34:39,finished));
 const completed=phase(f,finished,finished+2);
 const entered=phase(f,15,34);
 const left=phase(f,185,205);
 const alpha=entered*(1-left);
 return <g opacity={alpha} transform={`translate(${x} ${y+20*(1-entered)-15*left})`}>
  <Interactive.G name="S04 — Kartu download: permukaan dan bayangan" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <rect x={3} y={10} width={436} height={188} rx={36} fill="#B0BEBA" opacity={0.14}/>
   <rect width={436} height={188} rx={34} fill={BACK} stroke={LIGHT} strokeWidth={3}/>
  </Interactive.G>
  <Interactive.G name="S04 — Kartu download: ikon panah" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   {film?<><circle cx={52} cy={55} r={21} fill={p.navyColor}/><path d="M46 44L46 66L65 55Z" fill="white"/></>:
    <g stroke={p.navyColor} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M52 34V65M40 55L52 68L64 55M36 75H68"/></g>}
  </Interactive.G>
  <g opacity={completed}>
   <Interactive.G name="S04 — Download: centang selesai" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <circle cx={52} cy={55} r={21} fill={GREEN}/>
    <path d="M42 55L49 62L64 45" stroke="white" strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
   </Interactive.G>
  </g>
  <Interactive.Text name="S04 — Kartu download: judul Download" x={94} y={63} fontSize={30} fontWeight={800} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Download</Interactive.Text>
  <g opacity={1-completed}>
   <Interactive.Text name="S04 — Download: label sedang diunduh" x={94} y={110} fontSize={21} fill={MUTED} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Sedang diunduh</Interactive.Text>
  </g>
  <g opacity={completed}>
   <Interactive.Text name="S04 — Download: selesai 100 persen" x={94} y={110} fontSize={21} fontWeight={700} fill={GREEN} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>100% · selesai</Interactive.Text>
  </g>
  <Interactive.G name="S04 — Download: progress 76 ke 100 persen" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <rect x={47} y={138} width={340} height={18} rx={9} fill={LIGHT}/>
   <rect x={47} y={138} width={340*progress} height={18} rx={9} fill={completed>0.5?GREEN:film?p.navyColor:p.coralColor}/>
  </Interactive.G>
  <Interactive.G name="S04 — Download: status LED" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <circle cx={388} cy={33} r={7} fill={completed>0.5?GREEN:film?p.navyColor:p.coralColor} opacity={0.75+0.25*Math.sin(f/10)**2}/>
  </Interactive.G>
 </g>;
};

export const Scene03:React.FC<VideoProps>=(props)=>{
 const p={...DEFAULT_PROPS,...props};
 const f=useCurrentFrame();
 const outgoing=1-phase(f,6,28);
 const titleIn=phase(f,18,40);
 const infoIn=phase(f,75,94);
 const titleY=15*(1-titleIn);
 const clockLift=phase(f,0,CAMERA_END);
 const clockY=mix(856,606,clockLift)+p.scene03ClockShiftY;
 const clockScale=mix(1,.97,clockLift)*p.scene03ClockScale;
 const analogOut=phase(f,CLOCK_START,85);
 const digitalIn=phase(f,76,96);
 const countdown=phase(f,93,p.solution04OffFrame-20);
 const seconds=Math.max(0,Math.round(3600*(1-countdown)));
 const counter=seconds>60?`${String(Math.floor(seconds/3600)).padStart(2,'0')}:${String(Math.floor((seconds%3600)/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`:`00:${String(seconds).padStart(2,'0')}`;
 const off=phase(f,p.solution04OffFrame-8,p.solution04OffFrame);
 const splitFade=phase(f,176,191)*(1-phase(f,198,210));
 const firstSubtitle=phase(f,10,20)*(1-phase(f,98,110));
 const secondSubtitle=phase(f,104,114)*(1-phase(f,227,239));
 const stageIn=phase(f,28,45);
 const clockAngle=-32+360*phase(f,0,150);
 return <AbsoluteFill style={{backgroundColor:p.backgroundColor}}>
 <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920" style={{fontFamily:'Inter, Arial, sans-serif',overflow:'hidden'}}>
  {p.showBackgroundGrid?<Interactive.G name="S04 — Background editorial putih" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <g stroke="#E1E5E2" strokeWidth={1} opacity={0.17}>
    <path d="M110 455H970M110 565H970M110 675H970M110 785H970M110 895H970M110 1005H970M110 1115H970M110 1225H970M110 1335H970"/>
    <path d="M110 455V1335M220 455V1335M330 455V1335M440 455V1335M550 455V1335M660 455V1335M770 455V1335M880 455V1335M970 455V1335"/>
   </g>
  </Interactive.G>:null}
  <g opacity={outgoing}>
   <QuestionOrnaments globalFrame={135+f} p={p}/>
   <g transform={`translate(${p.textShiftX} ${p.textShiftY-12*phase(f,6,28)})`}>
    <Interactive.Text name="S04 — Bridge pertanyaan EMANG ADA" x={540} y={393} textAnchor="middle" fontSize={76} fontWeight={800} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>EMANG ADA</Interactive.Text>
    <Interactive.Text name="S04 — Bridge pertanyaan SOLUSINYA" x={540} y={500} textAnchor="middle" fontSize={88} fontWeight={800} fill={p.coralColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>SOLUSINYA?</Interactive.Text>
   </g>
  </g>
  <g opacity={titleIn} transform={`translate(${p.textShiftX} ${p.textShiftY+titleY})`}>
   <Interactive.Text name="S04 — Judul center Atur waktunya" x={540} y={213} fontSize={60} fontWeight={800} textAnchor="middle" fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Atur waktunya,</Interactive.Text>
   <Interactive.Text name="S04 — Judul center lalu istirahat" x={540} y={290} fontSize={60} fontWeight={800} textAnchor="middle" fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>lalu istirahat.</Interactive.Text>
  </g>
  <g opacity={1-digitalIn}>
   <EditorialClock p={p} x={540+p.scene03ClockShiftX} y={clockY} scale={clockScale} handAngle={clockAngle}/>
  </g>
  <g opacity={digitalIn} transform={`translate(${p.scene03ClockShiftX} ${p.scene03ClockShiftY})`}>
   <Interactive.G name="S04 — Timer: permukaan jam dan 12 tanda waktu" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <circle cx={540} cy={617} r={176} fill="#B6C5C1" opacity={0.12}/>
    <circle cx={540} cy={606} r={165} fill="#FFFFFF" stroke="#D9E3E1" strokeWidth={5}/>
    <circle cx={540} cy={606} r={150} fill="#FBFCFB" stroke="#EBF0EE" strokeWidth={3}/>
    <circle cx={540} cy={606} r={132} fill="none" stroke={LIGHT} strokeWidth={8}/>
   </Interactive.G>
   <Interactive.G name="S04 — Timer: progress lingkaran coral" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <circle cx={540} cy={606} r={132} fill="none" stroke={p.coralColor} strokeWidth={9} strokeDasharray={`${Math.max(1,829*countdown)} 829`} strokeLinecap="round" transform="rotate(-90 540 606)"/>
   </Interactive.G>
   <Interactive.G name="S04 — Timer: angka hitung mundur editable sebagai grup" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <text x={540} y={619} textAnchor="middle" fontWeight={800} fontSize={seconds>60?53:65} fill={p.navyColor}>{counter}</text>
   </Interactive.G>
   <g opacity={1-off}>
    <Interactive.Text name="S04 — Timer: label simulasi" x={540} y={684} textAnchor="middle" fontSize={19} fontWeight={700} fill={p.coralColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>SIMULASI 60 MENIT</Interactive.Text>
   </g>
   <g opacity={off}>
    <Interactive.Text name="S04 — Timer: label waktu habis" x={540} y={684} textAnchor="middle" fontSize={22} fontWeight={700} fill={p.coralColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>WAKTU HABIS</Interactive.Text>
   </g>
  </g>
  <g opacity={infoIn} transform={`translate(${p.scene03CardsShiftX} ${p.scene03CardsShiftY})`}>
   <ActivityFilmCard kind="film" frame={f} x={86} y={936} p={p}/>
   <ActivityDownloadCard kind="download" frame={f} x={558} y={936} p={p}/>
  </g>
  <g opacity={splitFade} transform={`translate(${p.scene03CardsShiftX} ${p.scene03CardsShiftY})`}>
   <Interactive.Text name="S04 — Dua aktivitas selesai" x={540} y={1170} textAnchor="middle" fontSize={28} fontWeight={700} fill={GREEN} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>2 aktivitas selesai</Interactive.Text>
  </g>
  <g opacity={stageIn}>
   <Interactive.G name="S04 — Timeline AKTIF TIMER OFF: alur dan titik" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <path d="M206 1270H874" stroke={LIGHT} strokeWidth={7} strokeLinecap="round"/>
    <path d={`M206 1270H${206+668*phase(f,54,p.solution04OffFrame)}`} stroke={p.coralColor} strokeWidth={7} strokeLinecap="round"/>
    <circle cx={206} cy={1270} r={26} fill="#FFFFFF" stroke={p.coralColor} strokeWidth={5}/>
    <circle cx={540} cy={1270} r={26} fill="#FFFFFF" stroke={phase(f,82,110)>.5?p.coralColor:LIGHT} strokeWidth={5}/>
    <circle cx={874} cy={1270} r={26} fill="#FFFFFF" stroke={off>.5?p.coralColor:LIGHT} strokeWidth={5}/>
   </Interactive.G>
   <Interactive.Text name="S04 — Timeline AKTIF" x={206} y={1344} textAnchor="middle" fontSize={23} fontWeight={800} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>AKTIF</Interactive.Text>
   <Interactive.Text name="S04 — Timeline TIMER" x={540} y={1344} textAnchor="middle" fontSize={23} fontWeight={800} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>TIMER</Interactive.Text>
   <Interactive.Text name="S04 — Timeline OFF" x={874} y={1344} textAnchor="middle" fontSize={23} fontWeight={800} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>OFF</Interactive.Text>
  </g>
  <g opacity={off} transform={`translate(${p.scene03CardsShiftX} ${p.scene03CardsShiftY+20*(1-off)})`}>
   <Interactive.G name="S04 — Laptop OFF: permukaan kartu dan ikon power" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <rect x={178} y={940} width={724} height={216} rx={38} fill="#B9C7C4" opacity={0.16}/>
    <rect x={174} y={932} width={724} height={216} rx={38} fill={BACK} stroke={LIGHT} strokeWidth={4}/>
    <circle cx={270} cy={1036} r={48} fill="#FAE5DE"/>
    <path d="M270 992V1039M247 1009A32 32 0 1 0 293 1009" fill="none" stroke={p.coralColor} strokeWidth={9} strokeLinecap="round"/>
   </Interactive.G>
   <Interactive.Text name="S04 — Laptop OFF: judul LAPTOP MATI" x={346} y={1015} fontSize={38} fontWeight={800} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>LAPTOP MATI</Interactive.Text>
   <Interactive.Text name="S04 — Laptop OFF: judul OTOMATIS" x={346} y={1064} fontSize={38} fontWeight={800} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>OTOMATIS</Interactive.Text>
   <Interactive.Text name="S04 — Laptop OFF: keterangan setelah waktu diatur" x={346} y={1111} fontSize={22} fill={MUTED} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Setelah waktu yang diatur</Interactive.Text>
  </g>
  {p.showCaptions?<g transform={`translate(${p.subtitleShiftX} ${p.subtitleShiftY})`}>
   <g opacity={firstSubtitle}></g>
   <g opacity={secondSubtitle}></g>
  </g>:null}
 </svg>
 </AbsoluteFill>;
};
