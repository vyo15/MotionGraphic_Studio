import React from 'react';
import {AbsoluteFill, Audio, Interactive, Sequence, interpolate, Easing, staticFile, useCurrentFrame} from 'remotion';
import {EditableHouse, EditableLaptop, EditableParcel, EditableRouter} from './components/EditableAssets';
import {TinyStar} from './components/Visuals';

/**
 * IP ADDRESS REELS — VISUAL EDITABLE EDITION
 * 5 scene, 24 detik, 1080 x 1920, 30fps.
 *
 * PENTING UNTUK REMOTION STUDIO:
 * - Setiap objek penting ditulis sebagai JSX <Interactive.Div> yang TERPISAH.
 * - Posisi, warna, ukuran, teks, opacity dan scale ditulis inline pada setiap objek.
 * - translate/scale/rotate adalah properti CSS tersendiri (bukan transform string).
 * - Ilustrasi SVG adalah komponen Interactive.create() dengan color-picker.
 * - Hindari mengubah JSX independen menjadi .map() karena itu akan menggabungkan
 *   kontrol pengeditan instance di Remotion Studio.
 */

export type IPAddressReelsProps = {
  backgroundColor: string;
  musicVolume: number;
};

const SCENE_1 = {from: 0, duration: 102};
const SCENE_2 = {from: 90, duration: 150};
const SCENE_3 = {from: 228, duration: 150};
const SCENE_4 = {from: 366, duration: 168};
const SCENE_5 = {from: 522, duration: 198};

// Fade antarscene asli: 12 frame masuk dan 12 frame keluar.
const SceneCanvas:React.FC<{length:number;children:React.ReactNode}> = ({length,children}) => {
  const frame=useCurrentFrame();
  const fadeIn=interpolate(frame,[0,12],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const fadeOut=interpolate(frame,[length-12,length],[1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <AbsoluteFill style={{opacity:Math.min(fadeIn,fadeOut)}}>{children}</AbsoluteFill>;
};

const Background:React.FC<{baseColor:string}> = ({baseColor}) => {
  const frame=useCurrentFrame();
  return <AbsoluteFill style={{background:`linear-gradient(150deg, ${baseColor} 0%, #092641 50%, #0B172B 100%)`,overflow:'hidden'}}>
    <div style={{position:'absolute',left:-250+Math.sin(frame/58)*36,top:130,width:640,height:640,borderRadius:'50%',background:'#0ABCD625',filter:'blur(115px)'}}/>
    <div style={{position:'absolute',right:-280+Math.cos(frame/72)*40,top:870,width:770,height:770,borderRadius:'50%',background:'#176FDE1E',filter:'blur(145px)'}}/>
    <svg width="1080" height="1920" style={{position:'absolute',opacity:0.22,pointerEvents:'none'}}>
      <defs><pattern id="ip-bg-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0 H0 V60" stroke="#4D8FAD" strokeWidth="1" fill="none"/></pattern></defs>
      <rect width="1080" height="1920" fill="url(#ip-bg-grid)"/>
    </svg>
    {Array.from({length:14},(_,i)=>{
      const x=70+(i*139)%980, y=200+(i*239)%1400;
      return <div key={i} style={{position:'absolute',top:y+Math.sin(frame/20+i*0.8)*11,left:x,width:4+(i%3)*2,height:4+(i%3)*2,borderRadius:20,background:i%2?'#FFDC78':'#36E2F2',opacity:0.3+(i%3)*0.12}}/>;
    })}
    <div style={{position:'absolute',left:54,top:246,width:972,height:1375,border:'1px solid #6CACC51D',borderRadius:44}}/>
  </AbsoluteFill>;
};

const HeaderFooter:React.FC = () => {
  const frame=useCurrentFrame();
  return <>
    <Interactive.Div name="HUD • Label seri NETWORKING" style={{position:'absolute',left:78,top:273,width:480,height:46,color:'#A5C2D8',fontSize:26,fontWeight:800,letterSpacing:4,translate:'0px 0px',scale:1,rotate:'0deg',display:'flex',alignItems:'center',gap:15}}>
      <span style={{display:'inline-block',width:13,height:13,borderRadius:'50%',backgroundColor:'#36E2F2',boxShadow:'0 0 15px #36E2F2'}}/>
      NETWORKING / 01
    </Interactive.Div>
    <Interactive.Div name="HUD • BELAJAR 24 DETIK" style={{position:'absolute',left:745,top:275,width:276,height:44,color:'#FFDC78',fontSize:25,fontWeight:800,letterSpacing:2,textAlign:'right',translate:'0px 0px',scale:1,rotate:'0deg'}}>
      BELAJAR 24 DETIK
    </Interactive.Div>
    <div style={{position:'absolute',left:82,top:1483,width:916,height:6,borderRadius:8,background:'#295373'}}>
      <div style={{height:'100%',width:`${100*frame/719}%`,background:'linear-gradient(90deg,#36E2F2,#FFDC78)',borderRadius:8}}/>
    </div>
    <Interactive.Div name="HUD • Footer IP ADDRESS" style={{position:'absolute',left:83,top:1507,width:570,height:42,color:'#8BACCA',fontSize:23,fontWeight:700,letterSpacing:2,translate:'0px 0px',scale:1,rotate:'0deg'}}>
      IP ADDRESS • REELS EDUKASI
    </Interactive.Div>
    <div style={{position:'absolute',right:82,top:1507,fontSize:23,color:'#8BACCA',fontWeight:700}}>{Math.floor(frame/30).toString().padStart(2,'0')}:24</div>
  </>;
};

const HookScene:React.FC = () => {
  const frame=useCurrentFrame();
  return <SceneCanvas length={102}>
    <Interactive.Div name="S1 • Badge PERTANYAAN SINGKAT" style={{position:'absolute',left:247,top:402,width:585,height:101,backgroundColor:'#143755',border:'2px solid #FFDC7877',borderRadius:35,padding:'22px 25px',boxSizing:'border-box',fontSize:37,fontWeight:800,letterSpacing:2,textAlign:'center',color:'#FFDC78',translate:'0px 0px',scale:interpolate(frame,[0,13],[0.87,1],{extrapolateRight:'clamp'}),opacity:interpolate(frame,[0,11],[0,1],{extrapolateRight:'clamp'}),rotate:'0deg'}}>
      💡 PERTANYAAN SINGKAT
    </Interactive.Div>
    <Interactive.Div name="S1 • Judul KOK DATA" style={{position:'absolute',left:75,top:535,width:930,color:'#F6FCFF',fontSize:95,fontWeight:900,lineHeight:1.09,textAlign:'center',letterSpacing:-2,translate:'0px 0px',scale:interpolate(frame,[5,22],[0.89,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[5,16],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      KOK DATA
    </Interactive.Div>
    <Interactive.Div name="S1 • Judul NGGAK NYASAR" style={{position:'absolute',left:75,top:648,width:930,color:'#36E2F2',fontSize:105,fontWeight:900,lineHeight:1.09,textAlign:'center',letterSpacing:-2,translate:'0px 0px',scale:interpolate(frame,[12,29],[0.89,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[12,23],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      NGGAK NYASAR?
    </Interactive.Div>
    <Interactive.Div
      name="S1 • Subjudul perangkat"
      style={{
        position: 'absolute',
        left: 75,
        top: 810,
        width: 930,
        color: '#A5C2D8',
        fontSize: 43,
        fontWeight: 600,
        textAlign: 'center',
        lineHeight: 1.09,
        translate: '-4.6px 64.5px',
        scale: 1,

        opacity: interpolate(frame, [22, 36], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp'
        }),

        rotate: '0deg'
      }}
    >
      Tiap perangkat perlu alamat.
    </Interactive.Div>
    <EditableLaptop name="S1 • Laptop kiri" screenColor="#0A2344" trimColor="#8DE7EF" accentColor="#19CEE5" style={{position:'absolute',left:122,top:988,width:268,height:260,translate:'0px 0px',scale:interpolate(frame,[25,44],[0.75,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}/>
    <EditableHouse name="S1 • Rumah kanan" wallColor="#E7F7FF" roofColor="#31E7E7" accentColor="#66EAF2" style={{position:'absolute',left:735,top:980,width:242,height:217,translate:'0px 0px',scale:interpolate(frame,[25,44],[0.75,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}/>
    <Interactive.Svg name="S1 • Garis & panah alur" width={365} height={55} viewBox="0 0 365 55" style={{position:'absolute',left:370,top:1093,translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <path d="M5 28 H350" stroke="#42D9E5" strokeWidth="8" strokeDasharray="17 13" strokeLinecap="round" opacity="0.6"/>
      <path d="M337 12 L355 28 L337 44" fill="none" stroke="#FFDC78" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    </Interactive.Svg>
    <EditableParcel name="S1 • Paket bergerak" boxColor="#FCD26C" sideColor="#FAAF4E" tapeColor="#FFF0B4" style={{position:'absolute',left:355,top:1049,width:98,height:103,translate:interpolate(frame,[30,78],['0px 0px','385px 0px'],{easing:Easing.inOut(Easing.cubic),extrapolateLeft:'clamp',extrapolateRight:'clamp'}),scale:1,rotate:interpolate(frame,[30,78],['-8deg','8deg'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}/>
    <Interactive.Div name="S1 • Caption rahasia IP" style={{position:'absolute',left:75,top:1330,width:930,color:'#FFDC78',fontSize:38,fontWeight:800,textAlign:'center',translate:'0px 0px',scale:1,opacity:interpolate(frame,[40,56],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      RAHASIANYA ADA DI IP ADDRESS.
    </Interactive.Div>
  </SceneCanvas>;
};

const AddressScene:React.FC = () => {
  const frame=useCurrentFrame();
  return <SceneCanvas length={150}>
    <Interactive.Div name="S2 • Judul IP ADDRESS" style={{position:'absolute',left:75,top:418,width:930,color:'#36E2F2',fontSize:96,fontWeight:900,textAlign:'center',letterSpacing:-2,translate:'0px 0px',scale:interpolate(frame,[3,19],[0.89,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[3,14],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      IP ADDRESS
    </Interactive.Div>
    <Interactive.Div name="S2 • Judul = ALAMAT RUMAH" style={{position:'absolute',left:75,top:531,width:930,color:'#F6FCFF',fontSize:84,fontWeight:900,textAlign:'center',letterSpacing:-2,translate:'0px 0px',scale:interpolate(frame,[9,25],[0.89,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[9,21],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      = ALAMAT RUMAH
    </Interactive.Div>
    <Interactive.Div name="S2 • Penjelasan alamat" style={{position:'absolute',left:75,top:675,width:930,color:'#A5C2D8',fontSize:41,fontWeight:600,textAlign:'center',translate:'0px 0px',scale:1,opacity:interpolate(frame,[16,29],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      Setiap perangkat punya alamat di jaringan.
    </Interactive.Div>
    <EditableHouse name="S2 • Rumah utama BESAR" wallColor="#E7F7FF" roofColor="#31E7E7" accentColor="#66EAF2" style={{position:'absolute',left:244,top:769,width:590,height:529,translate:'0px 0px',scale:interpolate(frame,[15,35],[0.83,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}/>
    <Interactive.Div
      name="S2 • Badge IPv4 192.168.1.10"
      style={{
        position: 'absolute',
        left: 255,
        top: 1365,
        width: 570,
        height: 102,
        backgroundColor: '#143755',
        border: '2px solid #FFDC7877',
        borderRadius: 35,
        padding: '22px 25px',
        boxSizing: 'border-box',
        fontSize: 37,
        fontWeight: 800,
        letterSpacing: 2,
        textAlign: 'center',
        color: '#FFDC78',
        translate: '9.2px -32.2px',

        scale: interpolate(frame, [30, 50], [0.89, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp'
        }),

        opacity: interpolate(frame, [30, 42], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp'
        }),

        rotate: '0deg'
      }}
    >
      192.168.1.10
    </Interactive.Div>
  </SceneCanvas>;
};

const OctetScene:React.FC = () => {
  const frame=useCurrentFrame();
  return <SceneCanvas length={150}>
    <Interactive.Div name="S3 • Judul BENTUK IP" style={{position:'absolute',left:75,top:426,width:930,color:'#F6FCFF',fontSize:83,fontWeight:900,letterSpacing:-2,textAlign:'center',translate:'0px 0px',scale:interpolate(frame,[4,19],[0.89,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[4,15],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      BENTUK IP ITU...
    </Interactive.Div>
    <Interactive.Div name="S3 • Judul 4 BAGIAN ANGKA" style={{position:'absolute',left:75,top:548,width:930,color:'#36E2F2',fontSize:82,fontWeight:900,letterSpacing:-2,textAlign:'center',translate:'0px 0px',scale:interpolate(frame,[10,25],[0.89,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[10,21],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      4 BAGIAN ANGKA
    </Interactive.Div>
    <Interactive.Div name="S3 • Oktet 1 / 192" style={{position:'absolute',left:80,top:842,width:180,height:155,border:'3px solid #36E2F2',borderRadius:28,backgroundColor:'#154057',boxShadow:'0 15px 35px #03172B88',color:'#F6FCFF',fontSize:66,fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center',translate:'0px 0px',scale:interpolate(frame,[20,38],[0.75,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[20,34],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      192
    </Interactive.Div>
    <Interactive.Div name="S3 • Titik pemisah 1" style={{position:'absolute',left:263,top:879,width:54,height:110,fontSize:62,fontWeight:900,color:'#FFDC78',textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>.</Interactive.Div>
    <Interactive.Div name="S3 • Oktet 2 / 168" style={{position:'absolute',left:319,top:842,width:180,height:155,border:'3px solid #36E2F2',borderRadius:28,backgroundColor:'#194563',boxShadow:'0 15px 35px #03172B88',color:'#F6FCFF',fontSize:66,fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center',translate:'0px 0px',scale:interpolate(frame,[28,46],[0.75,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[28,42],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      168
    </Interactive.Div>
    <Interactive.Div name="S3 • Titik pemisah 2" style={{position:'absolute',left:502,top:879,width:54,height:110,fontSize:62,fontWeight:900,color:'#FFDC78',textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>.</Interactive.Div>
    <Interactive.Div name="S3 • Oktet 3 / 1" style={{position:'absolute',left:558,top:842,width:180,height:155,border:'3px solid #FFDC78',borderRadius:28,backgroundColor:'#154057',boxShadow:'0 15px 35px #03172B88',color:'#F6FCFF',fontSize:66,fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center',translate:'0px 0px',scale:interpolate(frame,[36,54],[0.75,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[36,50],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      1
    </Interactive.Div>
    <Interactive.Div name="S3 • Titik pemisah 3" style={{position:'absolute',left:741,top:879,width:54,height:110,fontSize:62,fontWeight:900,color:'#FFDC78',textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>.</Interactive.Div>
    <Interactive.Div name="S3 • Oktet 4 / 10" style={{position:'absolute',left:797,top:842,width:180,height:155,border:'3px solid #36E2F2',borderRadius:28,backgroundColor:'#194563',boxShadow:'0 15px 35px #03172B88',color:'#F6FCFF',fontSize:66,fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center',translate:'0px 0px',scale:interpolate(frame,[44,62],[0.75,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[44,58],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      10
    </Interactive.Div>
    <Interactive.Div name="S3 • Contoh alamat lengkap" style={{position:'absolute',left:75,top:1129,width:930,color:'#FFDC78',fontSize:50,fontWeight:900,textAlign:'center',translate:'0px 0px',scale:1,opacity:interpolate(frame,[50,64],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      192.168.1.10
    </Interactive.Div>
    <Interactive.Div name="S3 • Keterangan IPv4 privat" style={{position:'absolute',left:75,top:1271,width:930,color:'#A5C2D8',fontSize:40,fontWeight:600,textAlign:'center',translate:'0px 0px',scale:1,opacity:interpolate(frame,[59,74],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      Contoh alamat IPv4 privat
    </Interactive.Div>
    <Interactive.Div name="S3 • Indikator 4 oktet" style={{position:'absolute',left:385,top:1375,width:270,height:15,display:'flex',gap:16,translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <span style={{width:55,height:11,borderRadius:15,background:'#FFDC78'}}/><span style={{width:55,height:11,borderRadius:15,background:'#346882'}}/><span style={{width:55,height:11,borderRadius:15,background:'#346882'}}/><span style={{width:55,height:11,borderRadius:15,background:'#346882'}}/>
    </Interactive.Div>
  </SceneCanvas>;
};

const RouteScene:React.FC = () => {
  const frame=useCurrentFrame();
  return <SceneCanvas length={168}>
    <Interactive.Div name="S4 • DATA = PAKET" style={{position:'absolute',left:75,top:422,width:930,color:'#FFDC78',fontSize:77,fontWeight:900,textAlign:'center',letterSpacing:-2,translate:'0px 0px',scale:interpolate(frame,[1,18],[0.89,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[1,13],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      DATA = PAKET 📦
    </Interactive.Div>
    <Interactive.Div name="S4 • ROUTER = PENGARAH" style={{position:'absolute',left:75,top:531,width:930,color:'#F6FCFF',fontSize:72,fontWeight:900,textAlign:'center',letterSpacing:-2,translate:'0px 0px',scale:interpolate(frame,[11,27],[0.89,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[11,23],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      ROUTER = PENGARAH
    </Interactive.Div>
    <Interactive.Div name="S4 • Penjelasan routing" style={{position:'absolute',left:75,top:675,width:930,color:'#A5C2D8',fontSize:40,fontWeight:600,textAlign:'center',translate:'0px 0px',scale:1,opacity:interpolate(frame,[17,30],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      Router bantu paket menuju jaringan tujuan.
    </Interactive.Div>
    <Interactive.Svg name="S4 • Garis pengiriman" width={930} height={70} viewBox="0 0 930 70" style={{position:'absolute',left:82,top:1090,translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <path d="M18 34 H912" stroke="#1D7B9C" strokeWidth="13" strokeLinecap="round"/>
      <path d="M18 34 H912" stroke="#36E2F2" strokeWidth="7" strokeLinecap="round" strokeDasharray="18 26" opacity=".7"/>
    </Interactive.Svg>
    <EditableLaptop name="S4 • Laptop pengirim" screenColor="#0A2344" trimColor="#8DE7EF" accentColor="#19CEE5" style={{position:'absolute',left:52,top:920,width:235,height:228,translate:'0px 0px',scale:interpolate(frame,[14,32],[0.83,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}/>
    <EditableRouter name="S4 • Router di tengah" bodyColor="#2E527A" trimColor="#37DBF2" signalColor="#F4D66C" style={{position:'absolute',left:398,top:902,width:270,height:270,translate:'0px 0px',scale:interpolate(frame,[14,32],[0.83,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}/>
    <EditableHouse name="S4 • Rumah tujuan" wallColor="#E7F7FF" roofColor="#31E7E7" accentColor="#66EAF2" style={{position:'absolute',left:766,top:940,width:236,height:212,translate:'0px 0px',scale:interpolate(frame,[14,32],[0.83,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}/>
    <EditableParcel name="S4 • Paket melintasi router" boxColor="#FCD26C" sideColor="#FAAF4E" tapeColor="#FFF0B4" style={{position:'absolute',left:180,top:995,width:103,height:108,translate:interpolate(frame,[26,70,113],['0px 0px','350px -55px','700px 0px'],{easing:Easing.inOut(Easing.cubic),extrapolateLeft:'clamp',extrapolateRight:'clamp'}),scale:1,rotate:interpolate(frame,[26,113],['-7deg','7deg'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}/>
    <Interactive.Div name="S4 • Label PERANGKAT" style={{position:'absolute',left:78,top:1243,width:220,color:'#F6FCFF',fontSize:31,fontWeight:800,textAlign:'center',letterSpacing:1.5,translate:'0px 0px',scale:1,rotate:'0deg'}}>PERANGKAT</Interactive.Div>
    <Interactive.Div name="S4 • Label ROUTER" style={{position:'absolute',left:414,top:1243,width:220,color:'#F6FCFF',fontSize:31,fontWeight:800,textAlign:'center',letterSpacing:1.5,translate:'0px 0px',scale:1,rotate:'0deg'}}>ROUTER</Interactive.Div>
    <Interactive.Div name="S4 • Label TUJUAN" style={{position:'absolute',left:777,top:1243,width:220,color:'#F6FCFF',fontSize:31,fontWeight:800,textAlign:'center',letterSpacing:1.5,translate:'0px 0px',scale:1,rotate:'0deg'}}>TUJUAN</Interactive.Div>
    <Interactive.Div name="S4 • Badge IP MEMBERI PETUNJUK" style={{position:'absolute',left:195,top:1385,width:690,height:102,backgroundColor:'#143755',border:'2px solid #FFDC7877',borderRadius:35,padding:'22px 25px',boxSizing:'border-box',fontSize:37,fontWeight:800,letterSpacing:1.5,textAlign:'center',color:'#FFDC78',translate:'0px 0px',scale:interpolate(frame,[60,80],[0.89,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[60,74],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      IP MEMBERI PETUNJUK ALAMAT
    </Interactive.Div>
  </SceneCanvas>;
};

const EndScene:React.FC = () => {
  const frame=useCurrentFrame();
  return <SceneCanvas length={198}>
    <Interactive.Div name="S5 • Judul SEKARANG INGAT" style={{position:'absolute',left:75,top:393,width:930,color:'#F6FCFF',fontSize:88,fontWeight:900,textAlign:'center',letterSpacing:-2,translate:'0px 0px',scale:interpolate(frame,[4,20],[0.89,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[4,16],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      SEKARANG INGAT!
    </Interactive.Div>
    <Interactive.Div name="S5 • Subjudul TIGA KATA" style={{position:'absolute',left:75,top:512,width:930,color:'#A5C2D8',fontSize:42,fontWeight:600,textAlign:'center',translate:'0px 0px',scale:1,opacity:interpolate(frame,[14,27],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      Tiga kata kunci jaringan:
    </Interactive.Div>
    {/* Row backgrounds, left labels, right labels are SEPARATE interactive layers. */}
    <Interactive.Div name="S5 • Kartu 1 latar" style={{position:'absolute',left:115,top:650,width:850,height:125,border:'2px solid #4DBBCD70',borderRadius:27,backgroundColor:'#143550',translate:interpolate(frame,[22,45],['125px 0px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),scale:1,opacity:interpolate(frame,[22,40],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}/>
    <Interactive.Div name="S5 • Kartu 1 IP" style={{position:'absolute',left:157,top:676,width:310,fontSize:56,fontWeight:900,color:'#FFDC78',translate:'0px 0px',scale:1,opacity:interpolate(frame,[22,40],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>IP</Interactive.Div>
    <Interactive.Div name="S5 • Kartu 1 ALAMAT" style={{position:'absolute',left:480,top:681,width:430,fontSize:50,fontWeight:900,textAlign:'right',color:'#36E2F2',translate:'0px 0px',scale:1,opacity:interpolate(frame,[22,40],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>→ ALAMAT</Interactive.Div>

    <Interactive.Div name="S5 • Kartu 2 latar" style={{position:'absolute',left:115,top:804,width:850,height:125,border:'2px solid #4DBBCD70',borderRadius:27,backgroundColor:'#143550',translate:interpolate(frame,[35,58],['125px 0px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),scale:1,opacity:interpolate(frame,[35,53],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}/>
    <Interactive.Div name="S5 • Kartu 2 DATA" style={{position:'absolute',left:157,top:830,width:310,fontSize:56,fontWeight:900,color:'#FFDC78',translate:'0px 0px',scale:1,opacity:interpolate(frame,[35,53],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>DATA</Interactive.Div>
    <Interactive.Div name="S5 • Kartu 2 PAKET" style={{position:'absolute',left:480,top:835,width:430,fontSize:50,fontWeight:900,textAlign:'right',color:'#36E2F2',translate:'0px 0px',scale:1,opacity:interpolate(frame,[35,53],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>→ PAKET</Interactive.Div>

    <Interactive.Div name="S5 • Kartu 3 latar" style={{position:'absolute',left:115,top:958,width:850,height:125,border:'2px solid #4DBBCD70',borderRadius:27,backgroundColor:'#143550',translate:interpolate(frame,[48,71],['125px 0px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),scale:1,opacity:interpolate(frame,[48,66],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}/>
    <Interactive.Div name="S5 • Kartu 3 ROUTER" style={{position:'absolute',left:157,top:984,width:310,fontSize:56,fontWeight:900,color:'#FFDC78',translate:'0px 0px',scale:1,opacity:interpolate(frame,[48,66],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>ROUTER</Interactive.Div>
    <Interactive.Div name="S5 • Kartu 3 PENGARAH" style={{position:'absolute',left:480,top:989,width:430,fontSize:50,fontWeight:900,textAlign:'right',color:'#36E2F2',translate:'0px 0px',scale:1,opacity:interpolate(frame,[48,66],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>→ PENGARAH</Interactive.Div>

    <Interactive.Div name="S5 • CTA FOLLOW NEXT DNS" style={{position:'absolute',left:174,top:1220,width:735,padding:'31px 22px',boxSizing:'border-box',textAlign:'center',borderRadius:40,backgroundColor:'#FFDC78',color:'#10233D',fontSize:49,fontWeight:900,letterSpacing:-1.8,translate:'0px 0px',scale:interpolate(frame,[75,92],[0.75,1],{easing:Easing.out(Easing.cubic),extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[75,90],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}>
      FOLLOW • NEXT: DNS 🚀
    </Interactive.Div>
    <Interactive.Div name="S5 • Ikon BINTANG" style={{position:'absolute',left:527,top:1408,width:33,height:33,translate:'0px 0px',scale:1,opacity:interpolate(frame,[75,95],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:'0deg'}}><TinyStar size={33}/></Interactive.Div>
  </SceneCanvas>;
};

export const IPAddressReels:React.FC<IPAddressReelsProps> = ({backgroundColor,musicVolume}) => (
  <AbsoluteFill style={{color:'#F6FCFF',fontFamily:'Arial, Helvetica, sans-serif'}}>
    <Background baseColor={backgroundColor}/>
    <Audio name="AUDIO • Beat original" src={staticFile('videos/ip-address/audio/beat.mp3')} volume={musicVolume}/>
    <Sequence name="SCENE 01 • Hook / Kok data tidak nyasar?" from={SCENE_1.from} durationInFrames={SCENE_1.duration}><HookScene/></Sequence>
    <Sequence name="SCENE 02 • Analogi IP = alamat rumah" from={SCENE_2.from} durationInFrames={SCENE_2.duration}><AddressScene/></Sequence>
    <Sequence name="SCENE 03 • IPv4 = empat angka" from={SCENE_3.from} durationInFrames={SCENE_3.duration}><OctetScene/></Sequence>
    <Sequence name="SCENE 04 • Router & paket" from={SCENE_4.from} durationInFrames={SCENE_4.duration}><RouteScene/></Sequence>
    <Sequence name="SCENE 05 • Kesimpulan & CTA" from={SCENE_5.from} durationInFrames={SCENE_5.duration}><EndScene/></Sequence>
    <HeaderFooter/>
  </AbsoluteFill>
);

// Nama export baku untuk registrasi folder-first.
export const Video = IPAddressReels;
