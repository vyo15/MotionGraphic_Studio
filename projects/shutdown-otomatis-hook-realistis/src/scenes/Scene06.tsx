import React from 'react';
import {AbsoluteFill, Interactive, useCurrentFrame, interpolate} from 'remotion';
import {DEFAULT_PROPS, type VideoProps} from '../config/props';

/**
 * Scene 06 — Swiss Motion, variation #02 explicitly selected by the user.
 * 255 local frames at 30 fps, source-editable vector remake of the approved preview.
 * No footage is flattened or overlaid. Every major UI/text element is a named layer.
 * Do not alter Scenes 01–05 while editing this module.
 */
const clip = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => { const x=clip(v); return x*x*(3-2*x); };
const appear = (f: number, a: number, b: number) => ease(interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}));
const vanish = (f: number, a: number, b: number) => 1-appear(f,a,b);

export const Scene06: React.FC<VideoProps> = (input) => {
 const p={...DEFAULT_PROPS,...input};
 const f=useCurrentFrame();
 const dark = p.navyColor;
 const ink = p.inkColor;
 const coral = p.coralColor;
 const runScale = p.scene06RunScale;
 const runX=151+p.scene06RunShiftX;
 const runY=846-(1-appear(f,52,75))*43+p.scene06RunShiftY;
 const runOpacity=appear(f,52,75)*vanish(f,200,222);
 const mainOpacity=vanish(f,204,225);
 const finalOpacity=appear(f,212,239);
 const fieldW=590;
 const commandSource=p.scene06CommandText||'shutdown /a';
 const typed=Math.min(commandSource.length,Math.max(0,Math.round(appear(f,103,176)*commandSource.length)));
 // Reveal the approved literal with a clip. The editable text remains a literal
 // child of Interactive.Text; Props overrides use a separately rendered fallback.
 const revealWidth = Math.min(fieldW - 22, Math.max(0, typed * 22.3 + 1));
 const caretVisible=f>=103&&f<200&&Math.floor(f/13)%2===0;
 const pressed=appear(f,202,207)*vanish(f,210,218);
 const subtitleData:[number,number,string][]=[
  [0,53,'Kalau mau batalin,'],
  [54,110,'tinggal buka Run lagi,'],
  [111,202,'ketik perintah ini,'],
  [203,254,'lalu Enter.'],
 ];
 const showSub=subtitleData.find(([a,b])=>f>=a&&f<=b);
 const subOpacity=showSub?Math.max(.04,Math.min(appear(f,showSub[0],showSub[0]+8),vanish(f,showSub[1]-7,showSub[1]+1))):0;
 const mainDX=p.scene06MainShiftX;
 const mainDY=p.scene06MainShiftY;
 const mainScale=p.scene06MainScale;
 const currentTitle=p.scene06ResultTitle||'DIBATALKAN';
 return <AbsoluteFill style={{backgroundColor:p.backgroundColor}}>
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg" style={{fontFamily:'Inter, Arial, Helvetica, sans-serif',overflow:'hidden'}}>
   <rect width="1080" height="1920" fill={p.backgroundColor}/>
   <defs>
    <filter id="s06-softshadow" x="-30%" y="-30%" width="160%" height="175%"><feGaussianBlur stdDeviation={9}/></filter>
    <clipPath id="s06-command-typewriter"><rect x={161} y={250} width={revealWidth} height={65}/></clipPath>
   </defs>
   {p.showBackgroundGrid && <Interactive.G name="S06 · Grid tipis editorial" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <g stroke="#F0F1EE" strokeWidth={2}>
     {[90,270,450,630,810,990].map(x=><path key={'x'+x} d={`M${x} 495V1435`}/>)}
     {[500,675,850,1025,1200,1375].map(y=><path key={'y'+y} d={`M90 ${y}H990`}/>)}
    </g>
   </Interactive.G>}
   <g opacity={appear(f,0,10)}>
    <Interactive.G name="S06 · Garis editorial header" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><path d="M88 300H992" stroke="#DCE1DE" strokeWidth={2}/></Interactive.G>
    <Interactive.Text name="S06 · Judul Batalkan shutdown otomatis" x={88} y={333} dominantBaseline="hanging" fontSize={52} fontWeight={750} fill={ink} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Batalkan shutdown otomatis.</Interactive.Text>
    <Interactive.Text name="S06 · Nama gaya 02 Swiss Motion" x={90} y={420} dominantBaseline="hanging" fontSize={22} fontWeight={580} fill="#8B9597" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>02 · SWISS MOTION</Interactive.Text>
   </g>
   {/* All key regions stay on a single virtual canvas; no slide switching. */}
   <g transform={`translate(${mainDX+540*(1-mainScale)} ${mainDY+850*(1-mainScale)}) scale(${mainScale})`}>
    <g opacity={mainOpacity}>
     <Interactive.Text name="S06 · Status JADWAL AKTIF" x={108} y={589} dominantBaseline="hanging" fontSize={26} fontWeight={650} fill="#8B9597" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>JADWAL AKTIF</Interactive.Text>
     <Interactive.Text name="S06 · Countdown 00 59 42" x={108} y={638} dominantBaseline="hanging" fontSize={101} fontWeight={780} letterSpacing={-2} fill={dark} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>00:59:42</Interactive.Text>
     <Interactive.G name="S06 · Rel timer dasar" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><rect x={110} y={766} width={860} height={10} rx={5} fill="#E2E8E4"/></Interactive.G>
     <Interactive.G name="S06 · Rel timer coral" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><rect x={110} y={766} width={500} height={10} rx={5} fill={coral}/></Interactive.G>
    </g>
    <g opacity={runOpacity} transform={`translate(${runX} ${runY}) scale(${runScale})`}>
     <Interactive.G name="S06 · Jendela Run shadow dan background" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
      <rect x={2} y={11} width={770} height={440} rx={20} fill="#233D46" opacity={.12} filter="url(#s06-softshadow)"/>
      <rect x={0} y={0} width={770} height={440} rx={20} fill="#FFFFFF" stroke="#CDD6D7" strokeWidth={2}/>
      <path d="M20 0H750Q770 0 770 20V70H0V20Q0 0 20 0Z" fill="#F1F4F4"/>
      <path d="M0 70H770M0 343H770" stroke="#D9E0E0" strokeWidth={2}/>
     </Interactive.G>
     <Interactive.G name="S06 · Icon Run" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
      <rect x={22} y={20} width={28} height={28} rx={5} fill="#208BB9"/>
      <rect x={28} y={26} width={17} height={17} rx={2} fill="#E9F6FC"/>
     </Interactive.G>
     <Interactive.Text name="S06 · Title Run" x={65} y={21} dominantBaseline="hanging" fontSize={30} fontWeight={750} fill={ink} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Run</Interactive.Text>
     <Interactive.G name="S06 · Close icon" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><path d="M724 30L739 45M739 30L724 45" stroke="#718086" strokeWidth={2}/></Interactive.G>
     <Interactive.G name="S06 · Ikon dialog Run" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><rect x={43} y={121} width={51} height={49} rx={24} fill="#E7EEF1"/><rect x={55} y={130} width={26} height={23} rx={3} fill="#93B8CA"/><rect x={61} y={135} width={15} height={11} rx={1} fill="#FFFFFF"/></Interactive.G>
     <Interactive.Text name="S06 · Instruksi Run baris 1" x={114} y={110} dominantBaseline="hanging" fontSize={26} fontWeight={500} fill="#435057" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Type the name of a program, folder,</Interactive.Text>
     <Interactive.Text name="S06 · Instruksi Run baris 2" x={114} y={144} dominantBaseline="hanging" fontSize={26} fontWeight={500} fill="#435057" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>document, or Internet resource, and</Interactive.Text>
     <Interactive.Text name="S06 · Instruksi Run baris 3" x={114} y={178} dominantBaseline="hanging" fontSize={26} fontWeight={500} fill="#435057" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Windows will open it for you.</Interactive.Text>
     <Interactive.Text name="S06 · Label Open" x={31} y={261} dominantBaseline="hanging" fontSize={28} fontWeight={750} fill={ink} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Open:</Interactive.Text>
     <Interactive.G name="S06 · Kolom input perintah" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><rect x={145} y={246} width={fieldW} height={65} rx={8} fill="#FFFFFF" stroke="#7DAAC2" strokeWidth={2}/></Interactive.G>
     <g clipPath="url(#s06-command-typewriter)">
      {commandSource === 'shutdown /a' ? (
       <Interactive.Text name="S06 · Teks ketik shutdown slash a" x={161} y={262} dominantBaseline="hanging" fontSize={37} fontFamily="Consolas, DejaVu Sans Mono, monospace" fontWeight={500} fill={dark} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>shutdown /a</Interactive.Text>
      ) : (
       <text x={161} y={262} dominantBaseline="hanging" fontSize={37} fontFamily="Consolas, DejaVu Sans Mono, monospace" fontWeight={500} fill={dark}>{commandSource}</text>
      )}
     </g>
     {caretVisible&&<Interactive.G name="S06 · Caret ketik" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><path d={`M${163+typed*22.3} 260V303`} stroke={dark} strokeWidth={2}/></Interactive.G>}
     <Interactive.G name="S06 · Tombol OK dan status ditekan" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
      <rect x={425} y={361} width={115} height={55} rx={8} fill={pressed>.15?'#DCEBF2':'#F6F8F8'} stroke={pressed>.15?'#7AA7BE':'#C9D2D3'} strokeWidth={2}/>
      {pressed>.01&&<circle cx={482.5} cy={388.5} r={37+35*pressed} stroke={coral} strokeWidth={2} fill="none" opacity={pressed}/>}
     </Interactive.G>
     <Interactive.Text name="S06 · Label OK" x={482.5} y={390} textAnchor="middle" dominantBaseline="middle" fontSize={26} fontWeight={700} fill={dark} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>OK</Interactive.Text>
     <Interactive.G name="S06 · Tombol Cancel" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><rect x={546} y={361} width={111} height={55} rx={8} fill="#F6F8F8" stroke="#CAD4D4" strokeWidth={2}/></Interactive.G>
     <Interactive.Text name="S06 · Label Cancel" x={601.5} y={390} textAnchor="middle" dominantBaseline="middle" fontSize={22} fontWeight={500} fill="#526A75" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Cancel</Interactive.Text>
     <Interactive.G name="S06 · Tombol Browse" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><rect x={665} y={361} width={81} height={55} rx={8} fill="#F6F8F8" stroke="#CAD4D4" strokeWidth={2}/></Interactive.G>
     <Interactive.Text name="S06 · Label Browse" x={705} y={390} textAnchor="middle" dominantBaseline="middle" fontSize={17} fontWeight={500} fill="#526A75" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Browse...</Interactive.Text>
    </g>
    <g opacity={finalOpacity}>
     <Interactive.Text name="S06 · Label hasil JADWAL SHUTDOWN" x={540} y={612} textAnchor="middle" dominantBaseline="hanging" fontSize={29} fontWeight={650} fill="#8B9597" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>JADWAL SHUTDOWN</Interactive.Text>
     <Interactive.Text name="S06 · Hasil DIBATALKAN" x={540} y={705} textAnchor="middle" dominantBaseline="hanging" fontSize={85} fontWeight={750} fill={dark} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{currentTitle}</Interactive.Text>
     <Interactive.G name="S06 · Underline coral hasil" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><rect x={260} y={814} width={560} height={11} rx={5.5} fill={coral}/></Interactive.G>
     <Interactive.G name="S06 · Lingkaran hijau sukses" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><circle cx={540} cy={982} r={66} fill="#E6F1EB"/></Interactive.G>
     <Interactive.G name="S06 · Check mark hasil pembatalan" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><path d="M505 984L532 1010L580 955" fill="none" stroke="#568F7E" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round"/></Interactive.G>
     <Interactive.Text name="S06 · Laptop tetap menyala" x={540} y={1114} textAnchor="middle" dominantBaseline="hanging" fontSize={37} fontWeight={550} fill={dark} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Laptop tetap menyala</Interactive.Text>
    </g>
   </g>
   {p.showCaptions && showSub && <g opacity={subOpacity} transform={`translate(${p.textShiftX+p.subtitleShiftX} ${p.textShiftY+p.subtitleShiftY})`}>
    {f<=53 && <Interactive.Text name="S06 · Subtitle VO 01 Kalau mau batalin" x={540} y={p.subtitleBaselineY+12} textAnchor="middle" dominantBaseline="hanging" fontSize={p.subtitleFontSize+2} fontWeight={650} fill={p.subtitleColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Kalau mau batalin,</Interactive.Text>}
    {f>=54&&f<=110 && <Interactive.Text name="S06 · Subtitle VO 02 buka Run lagi" x={540} y={p.subtitleBaselineY+12} textAnchor="middle" dominantBaseline="hanging" fontSize={p.subtitleFontSize+2} fontWeight={650} fill={p.subtitleColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>tinggal buka Run lagi,</Interactive.Text>}
    {f>=111&&f<=202 && <Interactive.Text name="S06 · Subtitle VO 03 ketik perintah ini" x={540} y={p.subtitleBaselineY+12} textAnchor="middle" dominantBaseline="hanging" fontSize={p.subtitleFontSize+2} fontWeight={650} fill={p.subtitleColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>ketik perintah ini,</Interactive.Text>}
    {f>=203 && <Interactive.Text name="S06 · Subtitle VO 04 lalu Enter" x={540} y={p.subtitleBaselineY+12} textAnchor="middle" dominantBaseline="hanging" fontSize={p.subtitleFontSize+2} fontWeight={650} fill={p.subtitleColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>lalu Enter.</Interactive.Text>}
   </g>}
  </svg>
 </AbsoluteFill>;
};
