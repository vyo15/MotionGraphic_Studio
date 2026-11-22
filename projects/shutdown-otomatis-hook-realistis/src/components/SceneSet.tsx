import React from 'react';
import {EditorialClock} from './EditorialClock';
import {Interactive} from 'remotion';
import type {VideoProps} from '../config/props';
import {DEFAULT_PROPS} from '../config/props';
import {eased,headSleep,yawn,lerp,fade,stageShift} from '../animations/motion';

type Props={globalFrame:number;options:Required<VideoProps>};
/** SVG source geometry. It is NOT rasterized or a video layer.
 * Each meaningful prop is isolated as a semantically named Interactive layer.
 * Scene 01 and 02 mount this same layout at non-overlapping frames.
 */
export const SceneSet:React.FC<Props>=({globalFrame:f,options:p})=>{
 const shift=stageShift(f,p.cameraStrength);
 // In Scene 02, the story changes from already asleep to still awake and
 // struggling to stay alert while a download finishes. Smoothly rise from
 // the exact final pose of Scene 01; no sudden character replacement.
 const waitingForDownload=eased(f,260,300);
 const sleepy=lerp(headSleep(f),0.43,waitingForDownload);
 const waitingYawn=fade(f,328,340)*(1-fade(f,349,360));
 const yawning=Math.max(yawn(f),waitingYawn*0.62);
 const movieToDownload=eased(f,243,261);
 const playerPercent=lerp(p.playerStartingProgress,p.playerEndingProgress,Math.min(1,f/225));
 const downloadPercent=f<339?p.downloadStartingPercent:p.downloadStartingPercent+(p.downloadEndingPercent-p.downloadStartingPercent)*eased(f,339,378);
 const windowMorning=fade(f,192,229)*(1-eased(f,245,265));
 const timeVis=fade(f,187,203)*(1-fade(f,233,248));
 const headX=lerp(310,400,sleepy)+shift+p.stickmanShiftX;
 const headY=lerp(866,1012,sleepy)+p.stickmanShiftY;
 const bodyWaistX=291+shift+p.stickmanShiftX;
 const bodyWaistY=1219+p.stickmanShiftY;
 const tableX=shift+p.deskShiftX;
 const laptopX=shift+p.laptopShiftX;
 const windowX=shift+p.nightWindowShiftX;
 const moveY=4*Math.sin(f/23);
 const wave= f<91 ? Math.sin(f/20)*3 : 0;
 const eyeClosed=f>=74 && (sleepy>.7 || Math.sin((f-74)/7)>-0.2);
 return <>
  <Interactive.G name="SET — Grid latar samar" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   {p.showBackgroundGrid?<g opacity={0.25} stroke="#E4E7E4" strokeWidth="1">
     <path d="M110 450H970M110 552H970M110 654H970M110 756H970M110 858H970M110 960H970M110 1062H970M110 1164H970M110 1266H970M110 1368H970"/>
     <path d="M110 455V1368M220 455V1368M330 455V1368M440 455V1368M550 455V1368M660 455V1368M770 455V1368M880 455V1368M970 455V1368"/>
    </g>:null}
  </Interactive.G>

  <Interactive.G name="SET — Jendela malam dan bulan" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <g transform={`translate(${windowX} ${moveY+p.nightWindowShiftY})`}>
    <rect x="759" y="488" width="246" height="288" rx="31" fill="#FFFFFF" stroke="#DFE2E0" strokeWidth="3"/>
    <rect x="777" y="505" width="210" height="255" rx="15" fill="#213F4C"/>
    <rect x="777" y="505" width="210" height="255" rx="15" fill="#F1BD98" opacity={windowMorning}/>
    <path d="M882 505V760M777 629H987" stroke="#A1B2B7" strokeWidth="3" opacity=".95"/>
    <path d="M914 530a28 28 0 1 0 24 39 23 23 0 1 1-24-39" fill="#F0C47C" opacity={1-windowMorning*0.85}/>
    <circle cx="820" cy="540" r="3" fill="#C1D1DA"/>
    <circle cx="959" cy="667" r="3" fill="#C1D1DA"/>
   </g>
  </Interactive.G>

  {/* Clock introduced in S01, retained through S02, then enlarged in the question bridge. */}
  <Interactive.G name="SET — Jam dinding penghubung S01–S03" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <EditorialClock p={p} x={580+shift} y={615} scale={0.31} handAngle={-32+22*Math.sin(Math.PI*Math.min(f,404)/404)**2}/>
  </Interactive.G>

  <Interactive.G name="SET — Kursi stickman" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <g transform={`translate(${shift+p.deskShiftX} ${p.deskShiftY})`}>
    <path d="M171 1076V1396" stroke="#A2B8BC" strokeWidth="18" strokeLinecap="round"/>
    <path d="M145 1216H373" stroke="#A2B8BC" strokeWidth="18" strokeLinecap="round"/>
    <rect x="163" y="1257" width="221" height="38" rx="17" fill="#CDDBD8"/>
    <path d="M181 1279L176 1398M357 1288L390 1395" stroke="#97AEB1" strokeWidth="12" strokeLinecap="round"/>
   </g>
  </Interactive.G>

  <Interactive.G name="SET — Meja dan kaki meja" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <g transform={`translate(${tableX} ${p.deskShiftY})`}>
    <path d="M151 1256H992" stroke="#9CB2B5" strokeWidth="19" strokeLinecap="round"/>
    <path d="M932 1268V1440" stroke="#A2B7B9" strokeWidth="10" strokeLinecap="round"/>
   </g>
  </Interactive.G>

  <Interactive.G name="SET — Kaki stickman" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <g transform={`translate(${shift+p.stickmanShiftX} ${p.stickmanShiftY})`} stroke={p.inkColor} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M291 1219L228 1392H271"/>
    <path d="M291 1219L352 1392H399"/>
   </g>
  </Interactive.G>

  <Interactive.G name="SET — Tubuh dan tangan kiri stickman" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <g stroke={p.inkColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none">
    <path d={`M${lerp(314,388,sleepy)+shift+p.stickmanShiftX} ${lerp(960,1101,sleepy)+p.stickmanShiftY} Q${lerp(297,279,sleepy)+shift+p.stickmanShiftX} ${lerp(1010,1058,sleepy)+p.stickmanShiftY} ${bodyWaistX} ${bodyWaistY}`}/>
    <path d={`M${lerp(296,355,sleepy)+shift+p.stickmanShiftX} ${lerp(981,1114,sleepy)+p.stickmanShiftY} Q${lerp(268,301,sleepy)+shift+p.stickmanShiftX} ${lerp(1025,1152,sleepy)+p.stickmanShiftY} ${lerp(280,280,sleepy)+shift+p.stickmanShiftX} ${lerp(1163,1188,sleepy)+p.stickmanShiftY}`}/>
   </g>
  </Interactive.G>

  <Interactive.G name="SET — Tangan ke laptop" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <path d={`M${lerp(333,428,sleepy)+shift+p.stickmanShiftX} ${lerp(975,1129,sleepy)+p.stickmanShiftY} Q${lerp(401,466,sleepy)+shift} ${lerp(1019,1178,sleepy)} ${lerp(551,544,sleepy)+shift} ${1211}`} stroke={p.inkColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </Interactive.G>

  <Interactive.G name="SET — Kepala stickman (animasi mengantuk)" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <g transform={`translate(${headX} ${headY+wave}) rotate(${lerp(0,12,sleepy)})`}>
    <circle cx="0" cy="0" r="74" stroke={p.inkColor} strokeWidth="9" fill={p.backgroundColor}/>
    <g opacity={1-waitingForDownload}>
     {eyeClosed?<path d="M-40 -2Q-27 12 -13 0M12 0Q25 12 39 0" stroke={p.inkColor} strokeWidth="5" strokeLinecap="round" fill="none"/>:
       <><circle cx="-24" cy="-6" r="10" fill={p.inkColor}/><circle cx="27" cy="-6" r="10" fill={p.inkColor}/></>}
    </g>
    <Interactive.G name="SET — Mata sayu menunggu download (S02)" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     <g opacity={waitingForDownload}>
      <path d="M-43 -10Q-28 -20 -11 -12M10 -12Q25 -20 42 -10" stroke={p.inkColor} strokeWidth="5" strokeLinecap="round" fill="none"/>
      <path d="M-40 -3Q-25 7 -11 -3M11 -3Q26 7 40 -3" stroke={p.inkColor} strokeWidth="3.4" strokeLinecap="round" fill="none"/>
      <circle cx="-25" cy="3" r="4.5" fill={p.inkColor}/><circle cx="26" cy="3" r="4.5" fill={p.inkColor}/>
     </g>
    </Interactive.G>
    <Interactive.G name="SET — Mulut dan ekspresi mengantuk (S01–S02)" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     {yawning>0.02?<ellipse cx="0" cy="38" rx={14+yawning*3} ry={6+yawning*18} fill={p.inkColor}/>:<>
      <path d="M-15 32Q0 45 16 30" stroke={p.inkColor} strokeWidth="4" strokeLinecap="round" fill="none" opacity={1-waitingForDownload}/>
      <path d="M-13 38Q0 34 14 39" stroke={p.inkColor} strokeWidth="4" strokeLinecap="round" fill="none" opacity={waitingForDownload}/>
     </>}
    </Interactive.G>
   </g>
  </Interactive.G>

  <Interactive.G name="SET — Laptop body dan keyboard" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <g transform={`translate(${laptopX} ${p.laptopShiftY})`}>
    <rect x="572" y="867" width="400" height="347" rx="29" fill="#9DB6BA"/>
    <rect x="581" y="876" width="380" height="330" rx="26" fill="#213F4C"/>
    <rect x="595" y="888" width="352" height="280" rx="14" fill="#294D5D"/>
    <path d="M548 1211H993L977 1254H567Z" fill="#E4EEF0" stroke="#86A1A6" strokeWidth="5" strokeLinejoin="round"/>
    <path d="M730 1234H812" stroke="#A2B8BC" strokeWidth="6" strokeLinecap="round"/>
   </g>
  </Interactive.G>

  <Interactive.G name="SET — Film thriller malam (adegan karakter, editable)" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <g transform={`translate(${laptopX} ${p.laptopShiftY})`} opacity={1-movieToDownload}>
    {/* An original, cinematic night scene: a worried character, a lit doorway and movie subtitles. */}
    <rect x="597" y="893" width="350" height="267" rx="13" fill="#132633"/>
    <path d="M597 919H947V1122H597Z" fill="#233D4B"/>
    <path d="M597 919H696V1122H597Z" fill="#142935"/>
    <rect x="613" y="928" width="90" height="178" rx="3" fill="#274B61"/>
    <path d="M660 928V1106M613 1005H703" stroke="#819BA6" strokeWidth="5"/>
    <path d="M627 950L618 968M651 966L644 984M686 988L679 1006M632 1027L623 1047M686 1044L679 1067M646 1070L637 1090" stroke="#ADD0D5" strokeWidth="2.4" strokeLinecap="round" opacity=".65"/>
    {/* Background door and dim warm silhouette. */}
    <path d="M872 928H934V1119H872Z" fill="#C0A07A"/>
    <path d="M891 928H936V1119H891Z" fill="#4C3943"/>
    <path d="M886 989C886 962 916 958 922 987V1013L935 1043V1118H872V1046Z" fill="#1C2C36"/>
    <path d="M873 930V1116" stroke="#E8BC84" strokeWidth="7" opacity=".75"/>
    {/* Main actor shoulder, hair and dramatic facial expression. */}
    <path d="M706 1132Q716 1063 760 1052H829Q874 1076 884 1132Z" fill="#344C5E"/>
    <path d="M742 1130Q751 1081 766 1064L815 1066Q833 1097 844 1132Z" fill="#536C78"/>
    <path d="M731 998Q724 944 756 927Q798 912 830 941Q842 966 838 1013L823 1060H751Z" fill="#1D2834"/>
    <path d="M754 968Q769 946 792 950Q819 952 822 981L812 1036Q803 1057 781 1057Q759 1045 756 1018Z" fill="#D2A88D"/>
    <path d="M754 978Q765 960 777 956Q761 985 759 1010L749 1035Q740 1000 754 978Z" fill="#1B2733"/>
    <path d="M817 974Q829 982 833 1009L821 1041L813 1033Z" fill="#1B2733"/>
    <path d="M767 997Q776 991 785 998M797 999Q806 992 815 998" fill="none" stroke="#443A3B" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="777" cy="1002" r="3.4" fill="#243039"/><circle cx="805" cy="1003" r="3.4" fill="#243039"/>
    <path d="M793 1008L789 1020L795 1021" fill="none" stroke="#805F52" strokeWidth="2" strokeLinecap="round"/>
    <path d="M784 1035Q792 1031 800 1036" fill="none" stroke="#8E5D59" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M750 950Q765 931 790 934Q811 934 829 952" fill="none" stroke="#1C2733" strokeWidth="17" strokeLinecap="round"/>
    <path d="M809 958Q816 975 815 992" fill="none" stroke="#F0D1B1" strokeWidth="4" opacity=".55"/>
    {/* Letterbox and movie-like dialogue: readable in the close-up render. */}
    <path d="M597 893H947V918H597ZM597 1124H947V1158H597Z" fill="#121D27"/>
    <Interactive.Text name="FILM — Subtitle adegan" x={772} y={1111} fontSize={18} fontWeight={700} textAnchor="middle" fill="#FFFFFF" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Jangan buka pintunya...</Interactive.Text>
    <rect x="629" y="1148" width="300" height="6" rx="3" fill="#74858C"/>
    <rect x="629" y="1148" width={300*playerPercent/100} height="6" rx="3" fill={p.coralColor}/>
    <path d="M608 1142V1157M617 1142V1157" stroke="#E2ECEE" strokeWidth="4" strokeLinecap="round"/>
   </g>
  </Interactive.G>

  <Interactive.G name="SET — Download panel (75–76 persen)" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <g transform={`translate(${laptopX} ${p.laptopShiftY})`} opacity={movieToDownload}>
    <rect x="597" y="891" width="350" height="273" rx="16" fill="#F7FAFA"/>
    <path d="M613 891H934Q947 891 947 907V935H597V908Q597 891 613 891" fill="#DDE7E9"/>
    <circle cx="616" cy="911" r="5" fill="#D97F61"/><circle cx="632" cy="911" r="5" fill="#9EB2B6"/><circle cx="649" cy="911" r="5" fill="#9EB2B6"/>

    <rect x="612" y="945" width="321" height="205" rx="14" fill="#FFFFFF"/>
    <rect x="629" y="972" width="43" height="48" rx="6" fill="#E8EEF0"/>
    <path d="M640 979H657L663 986V1008H640Z" stroke="#45616B" strokeWidth="2.7" fill="none"/>


    <text x="629" y="1100" fontSize="56" fontWeight="800" fill={p.coralColor}>{Math.round(downloadPercent)}%</text>

    <rect x="629" y="1130" width="282" height="7" rx="3.5" fill="#D9E2E3"/>
    <rect x="629" y="1130" width={282*downloadPercent/100} height="7" rx="3.5" fill={p.coralColor}/>
   </g>
  </Interactive.G>

  <g transform={`translate(${laptopX} ${p.laptopShiftY})`} opacity={movieToDownload}>
   <Interactive.Text name="SET — Label DOWNLOAD" x={775} y={920} textAnchor="middle" fontSize={19} fontWeight={700} fill="#263943" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>DOWNLOAD</Interactive.Text>
   <Interactive.Text name="SET — Nama file video-lengkap.mp4" x={683} y={989} fontSize={16} fontWeight={700} fill="#202525" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>video-lengkap.mp4</Interactive.Text>
   <Interactive.Text name="SET — Status sedang diunduh" x={683} y={1014} fontSize={12} fill="#829095" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Sedang diunduh...</Interactive.Text>
   <Interactive.Text name="SET — Label belum selesai" x={759} y={1101} fontSize={13} fill="#839194" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>belum selesai</Interactive.Text>
  </g>

  {p.showTimeIndicator?<Interactive.G name="SET — Jam sebagai bukti semalaman" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <g opacity={timeVis} transform={`translate(${windowX} ${p.nightWindowShiftY})`}>
    <rect x="773" y="782" width="145" height="46" rx="22" fill="#FFFFFF" stroke="#DDE2E0"/>
    <circle cx="796" cy="804" r="9" fill="none" stroke={p.coralColor} strokeWidth="2"/>
    <path d="M796 798V804L802 809" stroke={p.coralColor} strokeWidth="2" fill="none" strokeLinecap="round"/>
    <text x="838" y="811" fontSize="21" fill="#223E4A" fontWeight="700">{f<219?'03:24':'05:42'}</text>
   </g>
  </Interactive.G>:null}
 </>;
};
