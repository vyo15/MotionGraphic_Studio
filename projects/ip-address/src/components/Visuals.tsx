import React from 'react';

// Ilustrasi SVG orisinal. Ukuran selalu mengikuti kotak layer Remotion.
// Warna menerima props supaya muncul sebagai color-picker di Studio.
export const House: React.FC<{wallColor?: string; roofColor?: string; accentColor?: string}> = ({
  wallColor = '#E7F7FF', roofColor = '#31E7E7', accentColor = '#66EAF2',
}) => {
  const id = React.useId().replace(/:/g, '');
  return (
  <svg viewBox="0 0 580 520" width="100%" height="100%" style={{overflow: 'visible'}}>
    <defs>
      <linearGradient id={`${id}-house-wall`} x1="0" x2="1" y1="0" y2="1"><stop stopColor={wallColor}/><stop offset="1" stopColor="#7ADFFF"/></linearGradient>
      <linearGradient id={`${id}-house-roof`} x1="0" x2="1" y1="0" y2="1"><stop stopColor={roofColor}/><stop offset="1" stopColor="#0BA6D2"/></linearGradient>
      <filter id={`${id}-house-glow`}><feGaussianBlur stdDeviation="20" /></filter>
    </defs>
    <ellipse cx="290" cy="475" rx="235" ry="23" fill="#11C4DD" opacity="0.22" filter={`url(#${id}-house-glow)`} />
    <path d="M93 232 L290 67 L487 232 L487 440 Q487 459 465 459 L115 459 Q93 459 93 439 Z" fill={`url(#${id}-house-wall)`} stroke="#DFFBFF" strokeWidth="12" />
    <path d="M48 236 L275 42 Q290 29 305 42 L532 236 Q546 250 534 265 L516 282 Q504 292 490 280 L290 111 L90 280 Q76 292 64 282 L46 265 Q33 252 48 236 Z" fill={`url(#${id}-house-roof)`} stroke="#A8FAFF" strokeWidth="9" />
    <rect x="243" y="304" width="106" height="155" rx="14" fill="#16345E" />
    <circle cx="325" cy="387" r="8" fill="#FFE27D" />
    <rect x="126" y="293" width="85" height="89" rx="12" fill="#15518B" stroke={accentColor} strokeWidth="7" />
    <path d="M168 295 V381 M126 338 H211" stroke={accentColor} strokeWidth="6" />
    <rect x="375" y="293" width="85" height="89" rx="12" fill="#15518B" stroke={accentColor} strokeWidth="7" />
    <path d="M418 295 V381 M375 338 H460" stroke={accentColor} strokeWidth="6" />
    <rect x="413" y="125" width="38" height="77" rx="6" fill="#D3F7FB" />
    <circle cx="484" cy="100" r="12" fill="#FFE680" />
    <circle cx="506" cy="76" r="6" fill="#FFE680" />
  </svg>
  );
};

export const Router: React.FC<{bodyColor?: string; trimColor?: string; signalColor?: string}> = ({
  bodyColor = '#2E527A', trimColor = '#37DBF2', signalColor = '#F4D66C',
}) => {
  const id = React.useId().replace(/:/g, '');
  return (
  <svg viewBox="0 0 340 340" width="100%" height="100%" style={{overflow: 'visible'}}>
    <defs><linearGradient id={`${id}-router-body`} x1="0" x2="1" y1="0" y2="1"><stop stopColor={bodyColor}/><stop offset="1" stopColor="#0B203E"/></linearGradient></defs>
    <rect x="85" y="40" width="16" height="141" rx="8" fill="#9CF5FE" transform="rotate(-16 93 110)" />
    <rect x="244" y="40" width="16" height="141" rx="8" fill="#9CF5FE" transform="rotate(16 252 110)" />
    <rect x="26" y="151" width="288" height="139" rx="35" fill={`url(#${id}-router-body)`} stroke={trimColor} strokeWidth="10" />
    <rect x="51" y="181" width="236" height="42" rx="18" fill="#152E50" />
    <circle cx="85" cy="245" r="11" fill="#DFFBFF"/><circle cx="123" cy="245" r="11" fill={trimColor}/><circle cx="161" cy="245" r="11" fill={signalColor}/>
    <path d="M148 103 Q170 81 192 103 M134 90 Q170 52 206 90 M120 77 Q170 27 220 77" fill="none" stroke={signalColor} strokeWidth="9" strokeLinecap="round"/>
    <rect x="70" y="282" width="32" height="22" rx="7" fill="#15355B"/><rect x="242" y="282" width="32" height="22" rx="7" fill="#15355B"/>
  </svg>
  );
};

export const Laptop: React.FC<{screenColor?: string; trimColor?: string; accentColor?: string}> = ({
  screenColor = '#0A2344', trimColor = '#8DE7EF', accentColor = '#19CEE5',
}) => (
  <svg viewBox="0 0 320 310" width="100%" height="100%" style={{overflow:'visible'}}>
    <rect x="39" y="46" width="244" height="181" rx="17" fill="#13405D" stroke={trimColor} strokeWidth="12" />
    <rect x="57" y="64" width="208" height="145" rx="7" fill={screenColor} />
    <path d="M15 235 H305 L288 268 H34 Z" fill={trimColor} />
    <rect x="120" y="245" width="81" height="7" rx="4" fill="#15445C" />
    <circle cx="161" cy="131" r="33" fill="#163E66" stroke={accentColor} strokeWidth="6" />
    <path d="M135 131 H187 M161 100 Q138 131 161 162 M161 100 Q184 131 161 162 M128 118 H194 M128 144 H194" stroke={accentColor} strokeWidth="4" fill="none"/>
  </svg>
);

export const Parcel: React.FC<{boxColor?: string; sideColor?: string; tapeColor?: string}> = ({
  boxColor = '#FCD26C', sideColor = '#FAAF4E', tapeColor = '#FFF0B4',
}) => (
  <svg viewBox="0 0 200 210" width="100%" height="100%" style={{overflow:'visible'}}>
    <path d="M18 54 L98 13 L185 56 L103 98 Z" fill={boxColor} stroke="#FFF2BC" strokeWidth="6" strokeLinejoin="round" />
    <path d="M18 54 L103 98 L103 194 L18 150 Z" fill="#EBA54A" stroke="#FFF2BC" strokeWidth="6" strokeLinejoin="round" />
    <path d="M103 98 L185 56 L185 151 L103 194 Z" fill={sideColor} stroke="#FFF2BC" strokeWidth="6" strokeLinejoin="round" />
    <path d="M66 29 L149 74 L149 112 L127 122 L127 85 L43 41 Z" fill={tapeColor} opacity="0.94" />
    <path d="M42 128 L66 141" stroke="#B66D36" strokeWidth="7" strokeLinecap="round" />
  </svg>
);

export const TinyStar: React.FC<{size?:number; color?:string}> = ({size=28,color='#FFE27B'}) => (
  <svg width={size} height={size} viewBox="0 0 40 40"><path d="M20 2 L24.3 15.7 L38 20 L24.3 24.3 L20 38 L15.7 24.3 L2 20 L15.7 15.7 Z" fill={color}/></svg>
);
