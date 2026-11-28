/** Profil encoding untuk SATU renderer Remotion yang sudah ada.
 * Tidak mengubah source/manifest. CRF dan bitrate video tidak boleh disetel bersamaan.
 * Keputusan output untuk CapCut melalui props hanya dari key yang sudah terdaftar.
 */
export const RENDER_PROFILES=Object.freeze({
  capcut:Object.freeze({label:'CapCut HQ — motion + SFX, tanpa VO/subtitle panduan',quality:'high',capcut:true}),
  high:Object.freeze({label:'Kualitas Tinggi — tanpa VO Guide sementara (project baru)',quality:'high',capcut:false}),
  preview:Object.freeze({label:'Preview Cepat — cek gerakan, bukan master final',quality:'preview',capcut:false}),
});
export function renderProfileChoices(){return [
 ['1','capcut',RENDER_PROFILES.capcut.label],
 ['2','high',RENDER_PROFILES.high.label],
 ['3','preview',RENDER_PROFILES.preview.label],
]}
export function resolveRenderProfile(value){
 const key=Object.hasOwn(RENDER_PROFILES,value)?value:renderProfileChoices().find(row=>row[0]===value)?.[1];
 if(!key)throw Error(`Profil render tidak dikenal: ${value}. Gunakan capcut, high, atau preview.`);
 return key;
}
export function encoderFlags(profile){
 const p=RENDER_PROFILES[resolveRenderProfile(profile)];
 if(p.quality==='preview')return [
   '--codec=h264','--crf=23','--x264-preset=veryfast','--image-format=jpeg',
   '--pixel-format=yuv420p','--color-space=bt709','--audio-codec=aac',
   '--audio-bitrate=128k','--sample-rate=48000','--hardware-acceleration=disable',
 ];
 return [
   '--codec=h264','--crf=16','--x264-preset=slow','--image-format=png',
   '--pixel-format=yuv420p','--color-space=bt709','--audio-codec=aac',
   '--audio-bitrate=256k','--sample-rate=48000','--hardware-acceleration=disable',
 ];
}
export function capcutOverrides(defaultProps){
 if(!defaultProps||typeof defaultProps!=='object'||Array.isArray(defaultProps)){
  throw Error('Profil CapCut perlu defaultProps object dari katalog. Jalankan npm run sync.');
 }
 // Clone JSON supaya tidak mengubah referensi source/status Studio.
 const props=structuredClone(defaultProps),changed=[];
 const set=(key,value)=>{if(Object.hasOwn(props,key)){
  if(props[key]!==value){props[key]=value;changed.push(key)}
 }};
 set('showSfx',true);set('showSafeZone',false);
 set('showVoiceOver',false);set('showMusic',false);
 set('showOnScreenCaptions',false);set('showCaptions',false);
 // Khusus pola Easy2Boot: saat on-screen captions dimatikan,
 // showSubtitles=true menyembunyikan DRAFT text VO via !showSubtitles,
 // tanpa menampilkan SubtitleTrack (dikunci oleh showOnScreenCaptions).
 if(Object.hasOwn(props,'showOnScreenCaptions')&&Object.hasOwn(props,'showSubtitles'))set('showSubtitles',true);
 else set('showSubtitles',false);
 set('scene01ShowCaptions',false);
 for(const key of Object.keys(props)){
  if(/^scene\d+ShowTextVO$/.test(key)&&typeof props[key]==='boolean')set(key,false);
 }
 return {props,changed};
}

export function finalGuideOverrides(defaultProps,designContract){
 const props=structuredClone(defaultProps),changed=[];
 if(designContract==='compact-balanced-v1')for(const key of ['showSubtitles','showSafeZone'])if(Object.hasOwn(props,key)&&props[key]!==false){props[key]=false;changed.push(key);}
 return {props,changed};
}

/** Keep capture and exported pixels in the same visual state; probe differs only for capture. */
export function renderVisualProps(defaultProps,designContract,profile,{instrumented=false}={}){
 const key=resolveRenderProfile(profile);const selected=key==='capcut'?capcutOverrides(defaultProps).props:key==='high'?finalGuideOverrides(defaultProps,designContract).props:structuredClone(defaultProps);
 return instrumented?{...selected,showSafeZone:false,qaSpatialCapture:false}:selected;
}
/** Actual geometry capture uses the same temporary preset resolver as rendering. */
export function spatialCaptureProps(defaultProps,designContract,{mode='preview',profile=mode==='final'?'high':'preview'}={}){
 const key=resolveRenderProfile(profile);if((mode==='preview')!==(key==='preview'))throw Error('Capture mode/preset mismatch');
 return {...renderVisualProps(defaultProps,designContract,key,{instrumented:true}),qaSpatialCapture:true};
}
