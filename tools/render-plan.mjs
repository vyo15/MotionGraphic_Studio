/**
 * Rencana render: satu sumber komposisi dari katalog hasil sync (bukan memotong MP4).
 * Fungsi murni supaya menu interaktif dan mode CLI selalu memakai validasi yang sama.
 */
const assert=(ok,message)=>{if(!ok)throw new Error(message)};
export const MODES=Object.freeze(['full','scene','selected','all']);
const safeId=(value)=>typeof value==='string'&&/^[A-Za-z][A-Za-z0-9-]{1,80}$/.test(value);

export function listScenes(video){
 const total=Number(video?.durationInFrames);
 assert(safeId(video?.id)&&Number.isInteger(total)&&total>0,'Data video tidak valid. Jalankan npm run sync.');
 const scenes=video?.segments??[];
 assert(Array.isArray(scenes),'Data segments harus array. Jalankan npm run sync.');
 let next=0;const used=new Set([video.id]);
 for(const scene of scenes){
  assert(safeId(scene?.id)&&!used.has(scene.id),`ID scene duplikat/tidak valid: ${scene?.id??'(kosong)'}`);
  assert(typeof scene.title==='string'&&scene.title.trim(),`Judul scene tidak valid: ${scene.id}`);
  assert(scene.startFrame===next&&Number.isInteger(scene.durationInFrames)&&scene.durationInFrames>0,
   `Timing scene ${scene.id} tidak berurutan. Jalankan npm run sync.`);
  next+=scene.durationInFrames;
  assert(next<=total,`Durasi scene ${scene.id} melebihi total video.`);
  used.add(scene.id);
 }
 if(scenes.length)assert(next===total,'Jumlah durasi scene tidak sama dengan full video. Jalankan npm run sync.');
 return scenes;
}

function requireScenes(video){
 const scenes=listScenes(video);
 assert(scenes.length>0,`Project ${video.id} belum memiliki scene terdaftar. Full video masih bisa dirender; tambahkan segments melalui manifest lalu jalankan npm run sync.`);
 return scenes;
}

function fromSelection(scenes,raw,{multiple=false}={}){
 assert(typeof raw==='string'&&raw.trim(),'Nomor atau ID scene wajib diisi.');
 const tokens=raw.split(',').map(v=>v.trim());
 assert(tokens.every(Boolean),`Format scene tidak valid: "${raw}". Contoh: 1,3,5`);
 if(!multiple)assert(tokens.length===1,'Pilih tepat satu scene.');
 const result=[];const seen=new Set();
 for(const token of tokens){
  const scene=/^[1-9]\d*$/.test(token)?scenes[Number(token)-1]:scenes.find(s=>s.id===token);
  assert(scene,`Scene "${token}" tidak ditemukan. Pilih nomor 1–${scenes.length} atau ID scene.`);
  assert(!seen.has(scene.id),`Scene ${scene.id} dipilih lebih dari sekali.`);
  result.push(scene);seen.add(scene.id);
 }
 return result;
}

export function makeRenderPlan(video,mode='full',selection=''){
 assert(MODES.includes(mode),`Mode render tidak dikenal: ${mode}. Gunakan full, scene, selected, all.`);
 const scenes=listScenes(video);
 if(mode==='full'){
  assert(!selection, 'Mode full tidak memerlukan --scene/--scenes.');
  return [{id:video.id,title:'Video Lengkap',frames:video.durationInFrames,kind:'full'}];
 }
 requireScenes(video);
 if(mode==='all'){
  assert(!selection,'Mode all tidak memerlukan --scene/--scenes.');
 }
 let chosen;
 if(mode==='all')chosen=scenes;
 else chosen=fromSelection(scenes,selection,{multiple:mode==='selected'});
 return chosen.map(s=>({id:s.id,title:s.title,frames:s.durationInFrames,kind:'scene'}));
}

export function resolveMode(raw){
 const modes={'1':'full','2':'scene','3':'selected','4':'all'};
 const mode=modes[raw]??raw;
 assert(MODES.includes(mode),`Mode "${raw}" tidak dikenal.`);
 return mode;
}

export const renderChoices=[
 ['1','Full Video — 1 MP4 lengkap','full'],
 ['2','Satu Scene — pilih scene yang mau dirender','scene'],
 ['3','Scene Pilihan — beberapa MP4 terpisah','selected'],
 ['4','Semua Scene — MP4 terpisah otomatis','all'],
];

export function printSceneList(video,print=console.log){
 for(const [i,s] of requireScenes(video).entries()){
  const seconds=(s.durationInFrames/video.fps).toFixed(2);
  print(`  ${String(i+1).padStart(2)}. ${s.title} (${seconds} detik) [${s.id}]`);
 }
}
