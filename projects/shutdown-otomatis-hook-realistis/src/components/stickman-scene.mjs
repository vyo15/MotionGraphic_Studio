/** Scene 01 — vector only, deterministic frame animation. No bitmaps, video sprites or CSS transitions. */
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const ease=(a,b,f)=>{const t=clamp((f-a)/(b-a));return t*t*(3-2*t)};
const mix=(a,b,t)=>a+(b-a)*t;
const attr=(s)=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const p=(v)=>Number(v).toFixed(2);
export const stickmanBeats=[
 {start:0,end:58,label:'Menonton'},
 {start:58,end:106,label:'Mulai mengantuk'},
 {start:106,end:150,label:'Menguap'},
 {start:150,end:209,label:'Tertidur'},
 {start:209,end:240,label:'Laptop tetap menyala'}
];
export function sceneSvg(frame, opts={}){
 const f=Math.max(0,Math.min(239,frame));
 const film=attr(opts.filmLabel||'Sedang menonton film');
 const layers=opts.layerOffsets||{};
 const tf=(key)=>{let t=layers[key]||{};let x=Number(t.x)||0,y=Number(t.y)||0,s=t.scale==null?1:Number(t.scale),rot=Number(t.rotation)||0,op=t.opacity==null?1:Number(t.opacity); return `transform="translate(${p(x)} ${p(y)}) rotate(${p(rot)} 270 540) scale(${p(s)})" opacity="${p(op)}"`};
 const sleepy=ease(65,107,f);
 const lean=ease(157,214,f);
 const yawn=ease(107,122,f)*(1-ease(143,155,f));
 const sleepyNod=1.8*Math.sin(f*0.11)*(sleepy*(1-lean));
 const breathing=Math.sin(f*0.10)*1.6;
 const headX=mix(196,292,lean),headY=mix(488,595,lean)+sleepyNod;
 const shoulderX=mix(196,246,lean),shoulderY=mix(562,633,lean);
 const neckX=mix(203,265,lean),neckY=mix(540,642,lean);
 const bodyStroke='#171F2B',w=15;
 const blink=(f>30&&f<35)||(f>74&&f<79)||(f>96&&f<100);
 const eye=blink?0.1:(1-sleepy*0.73)*(1-lean);
 const blinkH=Math.max(.12,eye);
 const lip=yawn>0.02?`<ellipse cx="${p(headX+20)}" cy="${p(headY+25)}" rx="${p(6+yawn*3)}" ry="${p(3+yawn*10)}" fill="#171F2B"/>`:lean>.6?`<path d="M${p(headX+13)} ${p(headY+28)}q10 7 20 -1" fill="none" stroke="#171F2B" stroke-width="2.8" stroke-linecap="round"/>`:`<path d="M${p(headX+13)} ${p(headY+25)}q10 7 20 -1" fill="none" stroke="#171F2B" stroke-width="2.8" stroke-linecap="round"/>`;
 const at=f>210?1:ease(197,229,f);
 const openOpacity=p(1-ease(188,207,f));
 const headLower=lean;
 const hRightX=mix(324,330,lean),hRightY=mix(661,660,lean);
 const hLeftX=mix(273,305,lean),hLeftY=mix(656,661,lean);
 const armPath1=`M ${p(shoulderX+18)} ${p(shoulderY+1)} Q ${p(mix(264,288,lean))} ${p(mix(618,652,lean))} ${p(hRightX)} ${p(hRightY)}`;
 const armPath2=`M ${p(shoulderX-9)} ${p(shoulderY+16)} Q ${p(mix(230,260,lean))} ${p(mix(618,666,lean))} ${p(hLeftX)} ${p(hLeftY)}`;
 const finalCaptionOp=p(ease(196,220,f)*(opts.showEndText===false?0:1));
 const mainTitleOp=p((1-ease(201,227,f))*(opts.showHookText===false?0:1));
 const cardOp=p(1-ease(207,232,f)*.02);
 const progress=p(36 + f*0.145);
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 960" width="100%" height="100%" role="img" aria-label="Scene satu stickman menonton film lalu ketiduran">
 <defs>
   <filter id="shadow1" x="-30%" y="-30%" width="160%" height="170%"><feGaussianBlur stdDeviation="11"/></filter>
   <linearGradient id="room" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#F7F6F2"/><stop offset="1" stop-color="#ECE9E4"/></linearGradient>
   <linearGradient id="film" x1="0" x2="0.9" y1="0" y2="1"><stop stop-color="#6E91AA"/><stop offset="1" stop-color="#1A3858"/></linearGradient>
 </defs>
 <g data-layer="S01 · Latar statis" ${tf('background')}>
 <rect width="540" height="960" fill="#F8F4F1"/>
 <path d="M0 109H540" stroke="#E9E8E4" stroke-width="1.5"/>
 <text x="42" y="62" fill="#E18B67" font-size="13" font-family="DejaVu Sans,Arial" font-weight="700" letter-spacing="3">WINDOWS · TIPS 01</text>
 <path d="M42 76H125" stroke="#E18B67" stroke-width="3" stroke-linecap="round"/>
 <rect x="25" y="268" width="490" height="492" rx="28" fill="url(#room)"/>
 <rect x="55" y="306" width="136" height="142" rx="14" fill="#E3E9EC" stroke="#CDD9DD" stroke-width="4"/>
 <rect x="63" y="315" width="120" height="124" rx="9" fill="#19334D"/>
 <circle cx="158" cy="346" r="15" fill="#F8D898"/>
 <path d="M63 410 L96 382L118 404L144 373L183 413V439H63Z" fill="#274760"/>
 <path d="M123 315V439 M63 378H183" stroke="#9AAEBD" stroke-width="3" opacity=".6"/>
 <circle cx="90" cy="345" r="2.3" fill="#fff"/><circle cx="110" cy="358" r="1.8" fill="#fff"/>
 <rect x="63" y="470" width="113" height="8" rx="4" fill="#DDCEC1"/>
 <rect x="64" y="475" width="5" height="48" rx="2" fill="#C3B7AB"/>
 <path d="M85 469Q60 446 77 435Q91 438 91 453Q99 433 112 444Q122 457 94 470" fill="#6EA68C"/>
 </g>
 <g data-layer="S01 · Headline" opacity="${mainTitleOp}">
 <text x="42" y="163" font-family="DejaVu Sans,Arial" font-size="39" font-weight="800" fill="#171F2B">${attr(opts.hook1||'Pernah ketiduran')}</text>
 <text x="42" y="210" font-family="DejaVu Sans,Arial" font-size="39" font-weight="800" fill="#171F2B">${attr(opts.hook2||'pas nonton?')}</text>
 <text x="43" y="241" font-family="DejaVu Sans,Arial" font-size="16" fill="#687482">${attr(opts.hookSmall||'Pernah ngalamin yang begini?')}</text>
 </g>
 <g data-layer="S01 · Kursi" ${tf('chair')}>
 <rect x="126" y="550" width="91" height="161" rx="33" fill="#D6DCE2" stroke="#8799A8" stroke-width="6"/>
 <rect x="141" y="565" width="62" height="111" rx="25" fill="#EDF0F2"/>
 <rect x="145" y="693" width="136" height="25" rx="12" fill="#596F80"/>
 <path d="M202 713V750 M172 750H234" stroke="#596F80" stroke-width="9" stroke-linecap="round"/>
 </g>
 <g data-layer="S01 · Badan stickman" ${tf('body')}>
 <path d="M206 692Q${p(mix(186,217,lean))} ${p(mix(627,675,lean))} ${p(shoulderX)} ${p(shoulderY)}" fill="none" stroke="${bodyStroke}" stroke-width="${w+5}" stroke-linecap="round"/>
 <path d="M205 692Q166 710 177 739" fill="none" stroke="${bodyStroke}" stroke-width="16" stroke-linecap="round"/>
 <path d="M211 692Q233 714 248 739" fill="none" stroke="${bodyStroke}" stroke-width="16" stroke-linecap="round"/>
 </g>
 <g data-layer="S01 · Meja dan permukaan" ${tf('desk')}>
 <ellipse cx="380" cy="708" rx="131" ry="11" fill="#171F2B" opacity=".09" filter="url(#shadow1)"/>
 <rect x="250" y="660" width="274" height="29" rx="5" fill="#C89478"/>
 <path d="M250 684H524V699H250Z" fill="#A67563"/>
 <rect x="280" y="697" width="18" height="64" rx="4" fill="#866557"/>
 <rect x="494" y="697" width="18" height="64" rx="4" fill="#866557"/>
 </g>
 <g data-layer="S01 · Laptop dari belakang" ${tf('laptop')}>
  <ellipse cx="434" cy="659" rx="80" ry="6" fill="#39404D" opacity=".13"/>
  <path d="M361 644 L478 642 L497 662 L369 663Z" fill="#677482"/>
  <path d="M367 655L495 657" stroke="#A9B3BF" stroke-width="2"/>
  <path d="M372 522L487 514Q494 514 494 523L483 651Q483 655 478 655L359 659Q354 659 356 653L366 531Q366 524 372 522Z" fill="#445569" stroke="#223349" stroke-width="5"/>
  <path d="M374 535L478 527L468 641L365 645Z" fill="#52677D"/>
  <circle cx="424" cy="582" r="11" fill="#7890A5" opacity=".72"/>
  <path d="M358 656L480 653" stroke="#B2BBC5" stroke-width="3" stroke-linecap="round"/>
 </g>
 <g data-layer="S01 · Lengan dan tangan" ${tf('arms')}>
   <path d="${armPath1}" fill="none" stroke="${bodyStroke}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
   <path d="${armPath2}" fill="none" stroke="${bodyStroke}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
   <circle cx="${p(hLeftX)}" cy="${p(hLeftY)}" r="8" fill="#171F2B"/>
   <circle cx="${p(hRightX)}" cy="${p(hRightY)}" r="8" fill="#171F2B"/>
 </g>
 <g data-layer="S01 · Kepala dan ekspresi" ${tf('head')}>
   <path d="M${p(shoulderX+4)} ${p(shoulderY-7)}L${p(neckX)} ${p(neckY)}" stroke="${bodyStroke}" stroke-width="17" fill="none" stroke-linecap="round"/>
   <circle cx="${p(headX)}" cy="${p(headY)}" r="51" fill="#FFF2E8" stroke="${bodyStroke}" stroke-width="9"/>
   <path d="M${p(headX-36)} ${p(headY-32)}Q${p(headX-3)} ${p(headY-49)} ${p(headX+24)} ${p(headY-32)}" stroke="#273C54" stroke-width="6" fill="none" stroke-linecap="round"/>
   <ellipse cx="${p(headX+12)}" cy="${p(headY+4)}" rx="3.2" ry="${p(6.5*blinkH)}" fill="${bodyStroke}"/>
   <ellipse cx="${p(headX+33)}" cy="${p(headY+5)}" rx="3.2" ry="${p(6*blinkH)}" fill="${bodyStroke}"/>
   ${lip}
 </g>
 <g data-layer="S01 · Status film animasi" ${tf('filmCard')}>
  <rect x="295" y="315" width="215" height="163" rx="17" fill="#FFFFFF" stroke="#E8E9E6" stroke-width="2"/>
  <rect x="295" y="315" width="215" height="163" rx="17" fill="#091D34" opacity=".04" filter="url(#shadow1)"/>
  <circle cx="316" cy="339" r="5.2" fill="#E58E71"/>
  <text x="330" y="344" fill="#344256" font-family="DejaVu Sans,Arial" font-size="12.3" font-weight="700">${film}</text>
  <rect x="308" y="355" width="189" height="94" rx="10" fill="url(#film)"/>
  <circle cx="447" cy="382" r="13" fill="#F2C98F"/>
  <path d="M308 429L343 394L365 412L399 385L445 426L497 401V449H308Z" fill="#375773"/>
  <path d="M308 440L362 407L404 439L450 413L497 439V449H308Z" fill="#24435E"/>
  <path d="M397 391V411" stroke="#FFF" stroke-width="1" opacity=".4"/>
  <path d="M390 397L390 407L400 402Z" fill="#FFF" opacity=".86"/>
  <rect x="314" y="455" width="176" height="4" rx="2" fill="#E9EBEE"/>
  <rect x="314" y="455" width="${progress}" height="4" rx="2" fill="#DF805F"/>
  <text x="308" y="470" font-family="DejaVu Sans,Arial" font-size="8.5" fill="#8792A1">FILM BERJALAN</text>
 </g>
 <g data-layer="S01 · Kesimpulan" opacity="${finalCaptionOp}">
 <rect x="40" y="788" width="460" height="70" rx="16" fill="#FFFFFF" stroke="#E7E7E5"/>
 <text x="60" y="818" font-family="DejaVu Sans,Arial" font-size="19" font-weight="800" fill="#263345">${attr(opts.end1||'Film masih jalan.')}</text>
 <text x="60" y="846" font-family="DejaVu Sans,Arial" font-size="19" font-weight="800" fill="#D97754">${attr(opts.end2||'Kamu sudah tidur.')}</text>
 </g>
 <g data-layer="S01 · Safe footer">
 <text x="41" y="908" font-family="DejaVu Sans,Arial" font-size="11" fill="#A2A5A6" letter-spacing="1">SHUTDOWN OTOMATIS · SCENE 01</text>
 <path d="M41 921H499" stroke="#E9E9E7"/>
 </g>
 </svg>`;
}
