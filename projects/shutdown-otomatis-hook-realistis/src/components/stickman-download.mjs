/** Scene02 redesigned layout: right-side stickman, left progress panel, independent from S01. */
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const ease=(a,b,f)=>{const t=clamp((f-a)/(b-a));return t*t*(3-2*t)};
const n=(v)=>Number(v).toFixed(2);
const esc=(s)=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
export const downloadBeats=[
 {start:0,end:28,label:'Kasus kedua: komposisi baru'},
 {start:28,end:90,label:'Tampilkan unduhan belum selesai'},
 {start:90,end:145,label:'Reaksi karakter mengantuk'},
 {start:145,end:180,label:'Tahan progress 75%'}
];
export function scene02Svg(frame, opts={}){
 const f=clamp(frame,0,179);
 const pct=clamp(Number(opts.downloadPercent??75),0,100);
 const fn=esc(opts.downloadFileLabel||'materi-video.mp4');
 const intro=ease(0,20,f),panel=ease(10,32,f),headline=ease(0,18,f);
 const delayed=ease(23,66,f),sigh=ease(75,100,f)*(1-ease(111,130,f));
 const bob=1.7*Math.sin(f*.08),sleepy=ease(56,110,f),blink=(f%79<5||f>149&&f<156)?0.13:1;
 const headAngle=-(3*sleepy+2*sigh),eyeH=n((1-.73*sleepy)*blink*4.5);
 const handBob=n(1.2*Math.sin(f*.05));
 const hour=f<72?'23:45':f<124?'00:10':'00:40';
 const color='#1C2C3F';
 const layers=opts.layerOffsets||{};
 const xf=(key)=>{let o=layers[key]||{},dx=Number(o.x)||0,dy=Number(o.y)||0,sz=o.scale==null?1:Number(o.scale),r=Number(o.rotation)||0,op=o.opacity==null?1:Number(o.opacity);return `transform="translate(${n(dx)} ${n(dy)}) rotate(${n(r)} 270 540) scale(${n(sz)})" opacity="${n(op)}"`};
 return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 540 960" role="img" aria-label="Kasus berbeda, stickman menunggu unduhan">
 <defs><linearGradient id="wall31" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#F8F5F1"/><stop offset="1" stop-color="#EEEFEF"/></linearGradient><filter id="soft31" x="-25%" y="-30%" width="160%" height="170%"><feGaussianBlur stdDeviation="9"/></filter></defs>
 <g data-layer="S02 · Background" ${xf('background')}>
  <rect width="540" height="960" fill="#FBF9F7"/>
  <path d="M0 108H540" stroke="#E7E5E2" stroke-width="2"/>
  <text x="42" y="64" font-family="Arial,DejaVu Sans,sans-serif" font-size="13" font-weight="700" letter-spacing="3" fill="#DF805F">WINDOWS · TIPS 01</text>
  <rect x="42" y="76" width="84" height="3" rx="1.5" fill="#DF805F"/>
  <rect x="24" y="284" width="492" height="490" rx="28" fill="url(#wall31)"/>
  <circle cx="462" cy="337" r="33" fill="#F1F1EB" stroke="#D6DBDC" stroke-width="3"/>
  <path d="M462 337V317M462 337L476 343" stroke="#617488" stroke-width="4" stroke-linecap="round"/>
  <rect x="353" y="417" width="135" height="8" rx="4" fill="#D8C9BA"/>
  <rect x="364" y="425" width="7" height="26" rx="3" fill="#B99F8B"/>
  <path d="M400 416q-24 -25 -9 -36q16 7 15 26q2 -29 18 -24q12 18 -10 36" fill="#83B0A0"/>
 </g>
 <g data-layer="S02 · Headline" opacity="${n(headline*(opts.showHookText===false?0:1))}">
  <text x="42" y="161" font-family="Arial,DejaVu Sans,sans-serif" font-weight="800" font-size="32" fill="${color}">${esc(opts.title1||'Mau tidur, tapi...')}</text>
  <text x="42" y="209" font-family="Arial,DejaVu Sans,sans-serif" font-weight="800" font-size="29.5" fill="${color}">${esc(opts.title2||'download belum selesai?')}</text>
  <text x="42" y="243" font-family="Arial,DejaVu Sans,sans-serif" font-size="16" fill="#6B7987">${esc(opts.small||'Sudah malam, belum selesai juga.')}</text>
 </g>
 <g data-layer="S02 · UI download utama" ${xf('downloadDetail')}><g opacity="${n(panel)}" transform="translate(0 ${n((1-panel)*18)})">
  <rect x="38" y="338" width="276" height="246" rx="19" fill="#C3CDD2" opacity=".22" filter="url(#soft31)"/>
  <rect x="38" y="327" width="276" height="246" rx="19" fill="#FFFFFF" stroke="#E4E8E8" stroke-width="2"/>
  <circle cx="65" cy="357" r="7" fill="#DF805F"/>
  <text x="84" y="364" font-family="Arial,DejaVu Sans,sans-serif" font-size="16" font-weight="700" fill="#2A3A4E">Sedang mengunduh</text>
  <rect x="54" y="387" width="244" height="1.4" fill="#ECEFF0"/>
  <rect x="55" y="408" width="50" height="54" rx="11" fill="#FCE8DD"/>
  <path d="M80 418V445M70 437L80 447L90 437M70 452H90" fill="none" stroke="#C87958" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="116" y="429" font-family="Arial,DejaVu Sans,sans-serif" font-size="13" font-weight="700" fill="${color}">${fn}</text>
  <text x="116" y="450" font-family="Arial,DejaVu Sans,sans-serif" font-size="12" fill="#6D8190">Proses belum selesai</text>
  <text x="55" y="502" font-family="Arial,DejaVu Sans,sans-serif" font-size="35" font-weight="800" fill="${color}">${n(pct).replace('.00','')}%</text>
  <rect x="55" y="518" width="242" height="12" rx="6" fill="#DBE3E7"/>
  <rect x="55" y="518" width="${n(242*pct/100*delayed)}" height="12" rx="6" fill="#DF805F"/>
  <text x="55" y="556" font-family="Arial,DejaVu Sans,sans-serif" font-size="12" fill="#738390">Menunggu unduhan...</text>
 </g></g>
 <g data-layer="S02 · Kursi" ${xf('chair')}>
  <rect x="371" y="584" width="120" height="156" rx="35" fill="#DAE2E6" stroke="#93A2AF" stroke-width="6"/>
  <path d="M391 604q36 -18 73 1" fill="none" stroke="#F2F5F7" stroke-width="4"/>
 </g>
 <g data-layer="S02 · Badan stickman" ${xf('body')}>
  <path d="M412 601Q414 648 419 711" stroke="${color}" stroke-width="18" fill="none" stroke-linecap="round"/>
  <path d="M419 712L399 766M420 712L442 766" stroke="${color}" stroke-width="15" fill="none" stroke-linecap="round"/>
 </g>
 <g data-layer="S02 · Meja" ${xf('desk')}>
  <rect x="267" y="703" width="258" height="25" rx="5" fill="#C9967C"/>
  <rect x="268" y="726" width="257" height="14" rx="2" fill="#AA7C67"/>
  <rect x="293" y="740" width="17" height="44" rx="4" fill="#8F6C5B"/>
  <rect x="499" y="740" width="17" height="44" rx="4" fill="#8F6C5B"/>
 </g>
 <g data-layer="S02 · Laptop properti" ${xf('laptop')}>
  <ellipse cx="347" cy="699" rx="56" ry="5" fill="#243448" opacity=".15"/>
  <path d="M294 684L364 683L377 703L290 704Z" fill="#8C9AA7"/>
  <path d="M299 610L374 603L371 688L296 689Z" fill="#566A7E" stroke="#344A5D" stroke-width="4" stroke-linejoin="round"/>
  <path d="M307 618L367 613L365 680L304 680Z" fill="#647B8F"/>
  <circle cx="335" cy="648" r="7" fill="#AEC0CB" opacity=".5"/>
  <path d="M291 699L376 700" stroke="#D7DFE5" stroke-width="2"/>
 </g>
 <g data-layer="S02 · Lengan dan tangan" ${xf('arms')}>
  <path d="M398 598Q373 632 383 695" stroke="${color}" stroke-width="14" stroke-linecap="round" fill="none"/>
  <path d="M441 598Q476 629 465 697" stroke="${color}" stroke-width="14" stroke-linecap="round" fill="none"/>
  <circle cx="383" cy="695" r="8" fill="${color}"/>
  <circle cx="465" cy="697" r="8" fill="${color}"/>
 </g>
 <g data-layer="S02 · Kepala dan mata" ${xf('head')}>
  <path d="M418 604L418 567" stroke="${color}" stroke-width="16" stroke-linecap="round"/>
  <g transform="rotate(${n(headAngle)} 414 544)">
   <circle cx="414" cy="530" r="48" fill="#FFF1E8" stroke="${color}" stroke-width="9"/>
   <path d="M384 501Q411 485 436 501" stroke="#304962" stroke-width="5" fill="none" stroke-linecap="round"/>
   <ellipse cx="400" cy="531" rx="3.2" ry="${eyeH}" fill="${color}"/>
   <ellipse cx="424" cy="532" rx="3.2" ry="${eyeH}" fill="${color}"/>
   <path d="M398 553Q411 ${n(551+4*sigh+bob)} 424 551" stroke="${color}" stroke-width="2.7" stroke-linecap="round" fill="none"/>
   <path d="M390 515L404 511 M420 511L434 515" stroke="#354758" stroke-width="2.8" stroke-linecap="round"/>
  </g>
 </g>
 <g data-layer="S02 · Kesimpulan" opacity="${n(ease(112,143,f)*(opts.showEndText===false?0:1))}">
   <rect x="42" y="808" width="456" height="66" rx="13" fill="#FFFFFF" stroke="#E8E9E8"/>
   <text x="60" y="837" font-family="Arial,DejaVu Sans,sans-serif" font-size="19" font-weight="800" fill="${color}">Mau istirahat,</text>
   <text x="60" y="861" font-family="Arial,DejaVu Sans,sans-serif" font-size="19" font-weight="800" fill="#CF7957">tapi download belum selesai.</text>
 </g>
 <text x="42" y="923" font-family="Arial,DejaVu Sans,sans-serif" font-size="10" letter-spacing="1.5" fill="#A2A6A9">SHUTDOWN OTOMATIS · SCENE 02</text>
 </svg>`;
}
