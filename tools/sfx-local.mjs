#!/usr/bin/env node
// Offline cue preparation; creates only a NEW staging folder, never edits an add-on.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {fileURLToPath,pathToFileURL} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const assert=(condition,message)=>{if(!condition)throw Error(message)};
const json=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const sha=b=>createHash('sha256').update(b).digest('hex');
const writeJson=(f,data)=>fs.writeFileSync(f,JSON.stringify(data,null,2)+'\n',{flag:'wx'});
const safeId=s=>typeof s==='string'&&/^[a-z0-9][a-z0-9_-]{0,100}$/.test(s);
const text=s=>typeof s==='string'&&s.trim().length>0;
const tags=a=>Array.isArray(a)&&a.length>0&&a.every(s=>safeId(s));
function contained(base,rel){
 assert(typeof rel==='string'&&/^[a-zA-Z0-9_./-]+$/.test(rel)&&!rel.split('/').some(s=>!s||s==='.'||s==='..'),'Path aset tidak aman');
 const b=fs.realpathSync(base); let p=b;
 for(const part of rel.split('/')){p=path.join(p,part);assert(!fs.lstatSync(p).isSymbolicLink(),'Symlink aset dilarang');}
 assert(fs.realpathSync(p).startsWith(b+path.sep),'Aset keluar pack');return p;
}
// PCM WAV verification with RIFF chunks, exact sample count, peak and non-silence.
export function inspectWav(b){
 assert(b.length>=44&&b.toString('ascii',0,4)==='RIFF'&&b.toString('ascii',8,12)==='WAVE'&&b.readUInt32LE(4)+8===b.length,'WAV RIFF tidak sah');
 let fmt,data;for(let p=12;p+8<=b.length;){const n=b.readUInt32LE(p+4),end=p+8+n;assert(end<=b.length,'Chunk WAV terpotong');const id=b.toString('ascii',p,p+4);if(id==='fmt '){assert(!fmt,'fmt duplikat');fmt=b.subarray(p+8,end);}if(id==='data'){assert(!data,'data duplikat');data=b.subarray(p+8,end);}p=end+(n%2);}
 assert(fmt&&fmt.length>=16&&data&&fmt.readUInt16LE(0)===1&&fmt.readUInt16LE(14)===16,'WAV harus PCM 16-bit');
 const channels=fmt.readUInt16LE(2),rate=fmt.readUInt32LE(4),block=fmt.readUInt16LE(12);assert([1,2].includes(channels)&&rate>=8000&&rate<=96000&&block===channels*2&&fmt.readUInt32LE(8)===rate*block&&data.length%block===0,'Format PCM salah');
 const samples=data.length/block;assert(samples>0&&samples/rate<=15,'Durasi one-shot wajib 0–15 detik');
 let peak=0,peakSample=0;for(let p=0;p<data.length;p+=2){const v=Math.abs(data.readInt16LE(p));if(v>peak){peak=v;peakSample=Math.floor(p/block);}}assert(peak>0&&peak<32767,'Audio kosong atau peak full-scale');return {sampleRate:rate,samples,duration:samples/rate,channels,peak,peakSample};
}
function validateSource(s){
 assert(s&&['own','openverse','real-recording','earshot','licensed-other'].includes(s.kind)&&text(s.title)&&text(s.creator)&&text(s.license)&&text(s.sourceUrl),'Metadata sumber tidak lengkap');
 const l=s.license.toLowerCase();assert(['cc0','cc0-1.0','cc-by-4.0','cc-by-3.0','public-domain','earshot-rendered-output'].includes(l),'Lisensi tidak masuk whitelist Local-First');
 if(l.startsWith('cc-by'))assert(text(s.attribution)&&text(s.licenseUrl),'CC BY memerlukan atribusi dan URL lisensi');
 if(s.kind==='openverse')assert(text(s.licenseUrl),'Openverse memerlukan licenseUrl');
 if(l==='earshot-rendered-output')assert(s.kind==='earshot','Lisensi Earshot hanya untuk hasil Earshot');
}
export function loadLibrary(root=ROOT){
 const dirs=[path.join(root,'templates/sfx-library')],local=path.join(root,'library/sfx');
 if(fs.existsSync(local)){assert(!fs.lstatSync(local).isSymbolicLink(),'Library symlink dilarang');for(const d of fs.readdirSync(local,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){if(d.isDirectory()&&!d.isSymbolicLink()&&fs.existsSync(path.join(local,d.name,'catalog.json')))dirs.push(path.join(local,d.name));}}
 const out=[],ids=new Set();for(const dir of dirs){assert(!fs.lstatSync(dir).isSymbolicLink(),'Pack symlink dilarang');const doc=json(contained(dir,'catalog.json'));assert(doc.schemaVersion===1&&Array.isArray(doc.assets),'Catalog tidak sah: '+dir);
 for(const a of doc.assets){assert(safeId(a.id)&&!ids.has(a.id),'ID aset invalid/duplikat: '+a.id);ids.add(a.id);assert(tags(a.tags)&&['recorded','synthetic'].includes(a.character),'Tag/character tidak sah: '+a.id);validateSource(a.source);if(dir!==dirs[0])assert(text(a.rightsEvidence),'Bukti hak pakai pack lokal wajib');assert(a.character!=='recorded'||a.source.kind!=='earshot','Earshot bukan rekaman asli');
 assert(/\.wav$/i.test(a.file),'Hanya WAV PCM');const full=contained(dir,a.file),stat=fs.statSync(full);assert(stat.isFile()&&stat.size<=6_000_000,'Ukuran file tidak sah: '+a.id);const b=fs.readFileSync(full);assert(sha(b)===a.sha256,'SHA256 tidak cocok: '+a.id);const audio=inspectWav(b);
 assert(Number.isInteger(a.impactSample)&&a.impactSample>=0&&a.impactSample<audio.samples,'impactSample salah: '+a.id);assert(Number.isFinite(a.gainDb)&&a.gainDb>=-80&&a.gainDb<=0,'gainDb aset salah');out.push({...a,...audio,full});}}
 return out;
}
export function selectAsset(assets,request){
 assert(['recorded','synthetic','either'].includes(request.character),'Pilih character recorded/synthetic/either');
 let matches=assets.filter(a=>request.character==='either'||a.character===request.character);
 if(request.assetId!==undefined){assert(safeId(request.assetId),'assetId salah');matches=matches.filter(a=>a.id===request.assetId);}
 else {assert(tags(request.tags),'tags wajib');matches=matches.filter(a=>request.tags.every(t=>a.tags.includes(t)));}
 assert(matches.length,'Tidak ada SFX cocok; impor rekaman legal atau pilih omit beralasan. Tidak ada fallback rekaman palsu.');
 return matches.sort((a,b)=>(request.character==='either'?Number(b.character==='recorded')-Number(a.character==='recorded'):0)||a.id.localeCompare(b.id))[0];
}
export function prepare(manifest,requests,output,assets){
 assert(typeof manifest.slug==='string'&&/^[a-z][a-z0-9-]{1,48}$/.test(manifest.slug)&&Number.isInteger(manifest.fps)&&manifest.fps>0&&manifest.fps<=120&&Number.isInteger(manifest.durationInFrames)&&manifest.durationInFrames>0,'Manifest timing/slug salah');
 assert(requests.schemaVersion===1&&Array.isArray(requests.cues)&&requests.cues.length>0,'Request cues kosong');
 const segments=manifest.segments?.length?manifest.segments:[{startFrame:0,durationInFrames:manifest.durationInFrames}];
 assert(segments.every(s=>Number.isInteger(s.startFrame)&&Number.isInteger(s.durationInFrames)&&s.startFrame>=0&&s.durationInFrames>0&&s.startFrame+s.durationInFrames<=manifest.durationInFrames),'Segment manifest salah');
 const used=new Map(),ids=new Set(),coverage=new Set(),log=[];
 const cues=requests.cues.map(r=>{
  assert(safeId(r.id)&&!ids.has(r.id)&&text(r.action),'ID/action request salah');ids.add(r.id);
  assert(Number.isInteger(r.impactFrame),'impactFrame harus integer');const i=segments.findIndex(s=>r.impactFrame>=s.startFrame&&r.impactFrame<s.startFrame+s.durationInFrames),seg=segments[i];
  assert(seg&&r.scene==='S'+String(i+1).padStart(2,'0'),'Scene tidak sesuai impactFrame: '+r.id);coverage.add(i);
  const base={id:r.id,scene:r.scene,action:r.action,impactFrame:r.impactFrame};
  if(r.status==='omit'){assert(text(r.reason),'omit perlu alasan');return {...base,startFrame:r.impactFrame,endFrame:r.impactFrame,status:'omit',reason:r.reason};}
  assert(r.status==='ready','Request hanya ready/omit');const a=selectAsset(assets,r);
  const startFrame=r.impactFrame-Math.round(a.impactSample/a.sampleRate*manifest.fps),endFrame=startFrame+Math.max(1,Math.ceil(a.duration*manifest.fps))-1;
  assert(startFrame>=seg.startFrame&&endFrame<seg.startFrame+seg.durationInFrames&&startFrame<=r.impactFrame&&r.impactFrame<=endFrame,'Cue keluar segment: '+r.id+'; pilih aset pendek atau revisi timing tanpa memotong tail');
  const gainDb=r.gainDb??a.gainDb;assert(Number.isFinite(gainDb)&&gainDb>=-80&&gainDb<=0,'gainDb request salah');
  const file=`audio/sfx/${a.id}.wav`;used.set(file,a);log.push({cueId:r.id,assetId:a.id,character:a.character,sha256:a.sha256,impactSample:a.impactSample,sampleRate:a.sampleRate,source:a.source,providerExecution:'local-file-only',startFrame,impactFrame:r.impactFrame,endFrame});
  return {...base,startFrame,endFrame,status:'ready',file,source:a.source,gainDb};
 });
 assert(coverage.size===segments.length,'Setiap segment wajib punya cue/omit');
 const out=path.resolve(output);assert(!fs.existsSync(out),'Output sudah ada: tidak overwrite');
 // Never write directly to a Master project: staging root must be a new directory outside projects/.
 assert(!out.split(path.sep).some(x=>x.toLowerCase()==='projects')&&!fs.realpathSync(path.dirname(out)).split(path.sep).some(x=>x.toLowerCase()==='projects'),'Gunakan folder staging di luar projects/');
 fs.mkdirSync(out,{recursive:false});
 try{
  fs.mkdirSync(path.join(out,'public/audio/sfx'),{recursive:true});fs.mkdirSync(path.join(out,'production'));fs.mkdirSync(path.join(out,'src/components'),{recursive:true});
  for(const [rel,a] of used){const b=fs.readFileSync(a.full);assert(sha(b)===a.sha256,'Aset berubah ketika disalin');fs.writeFileSync(path.join(out,'public',rel),b,{flag:'wx'});}
  writeJson(path.join(out,'production/sound-cues.json'),{schemaVersion:1,status:'review',notes:'Local-first preparation; visual alignment and listening pending.',cues});
  writeJson(path.join(out,'production/sfx-provider-log.json'),{schemaVersion:1,network:false,execution:'local-file-only',listeningQA:'not-tested',cues:log});
  const map=[...used.keys()].map(rel=>`  '${rel}': staticFile('videos/${manifest.slug}/${rel}'),`).join('\n');
  fs.writeFileSync(path.join(out,'src/components/SoundAssets.ts'),`import {staticFile} from 'remotion';\nexport const SFX_FILES: Record<string,string> = {\n${map}\n};\n`,{flag:'wx'});
  return {ok:true,output:out,cues:cues.length,assets:used.size,qa:'PCM/metadata only; no render/listening'};
 }catch(e){fs.rmSync(out,{recursive:true,force:true});throw e;}
}
// Ingest reviewed local files, never fetch, extract or execute third-party code.
export function importPack(specPath,packId,root=ROOT){
 assert(safeId(packId)&&packId!=='starter','Nama pack tidak sah');const doc=json(specPath),base=path.dirname(path.resolve(specPath));
 assert(doc.schemaVersion===1&&Array.isArray(doc.assets)&&doc.assets.length>0,'Import manifest kosong');
 const ids=new Set(loadLibrary(root).map(a=>a.id));const entries=doc.assets.map(a=>{
  assert(safeId(a.id)&&!ids.has(a.id),'ID duplikat/invalid: '+a.id);ids.add(a.id);assert(tags(a.tags)&&['recorded','synthetic'].includes(a.character),'Tag/character salah');validateSource(a.source);
  assert(a.character!=='recorded'||a.source.kind!=='earshot','Earshot bukan recording');assert(text(a.rightsEvidence),'Bukti hak pakai wajib (review manusia)');
  const f=contained(base,a.file);assert(fs.statSync(f).isFile()&&fs.statSync(f).size<=6_000_000,'File input tidak sah');const b=fs.readFileSync(f),audio=inspectWav(b),impactSample=a.impactSample??audio.peakSample,gainDb=a.gainDb??-16;
  assert(Number.isInteger(impactSample)&&impactSample>=0&&impactSample<audio.samples,'impactSample salah');assert(Number.isFinite(gainDb)&&gainDb>=-80&&gainDb<=0,'gainDb salah');
  return {b,asset:{id:a.id,file:`audio/${a.id}.wav`,character:a.character,tags:a.tags,source:a.source,rightsEvidence:a.rightsEvidence,impactSample,gainDb,sha256:sha(b)}};
 });
 const parent=path.join(root,'library/sfx');fs.mkdirSync(parent,{recursive:true});assert(!fs.lstatSync(parent).isSymbolicLink(),'Library symlink dilarang');const out=path.join(parent,packId);fs.mkdirSync(out);
 try{fs.mkdirSync(path.join(out,'audio'));for(const {b,asset} of entries)fs.writeFileSync(path.join(out,asset.file),b,{flag:'wx'});writeJson(path.join(out,'catalog.json'),{schemaVersion:1,assets:entries.map(e=>e.asset)});return {ok:true,pack:packId,assets:entries.length,qa:'Metadata/PCM; rights evidence supplied by user, not independently verified'};}
 catch(e){fs.rmSync(out,{recursive:true,force:true});throw e;}
}
// Optional explicit adapter; only uses the locally installed offline sound bank.
// No installation, MCP, listening model, API calls, shell or automatic fit.
export function renderEarshot(preset,packId,t,root=ROOT,run=spawnSync){
 assert(typeof preset==='string'&&/^[a-z0-9_-]+\/[a-z0-9_-]+$/.test(preset)&&!preset.startsWith('fit/'),'Pilih preset bank non-fit, misalnya whoosh_fast/crisp');
 assert(safeId(packId)&&tags(t),'Pack ID dan tags wajib');
 assert(!fs.existsSync(path.join(root,'library/sfx',packId)),'Pack sudah ada: tidak overwrite');
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'mgs-earshot-'));
 try{
  const raw=path.join(tmp,'raw.wav'),pcm=path.join(tmp,'pcm.wav');
  const call=(command,args)=>{const r=run(command,args,{encoding:'utf8',timeout:120000,windowsHide:true,maxBuffer:1024*1024});assert(!r.error&&r.status===0,`${command} gagal: ${r.error?.message??r.stderr??'exit '+r.status}`);return r;};
  call('earshot',['sfx','render',preset,'-o',raw,'--sr','48000','--peak','-3']);
  assert(fs.existsSync(raw),'Earshot tidak menghasilkan WAV');
  // Earshot may write PCM24. Convert via FFmpeg only when PCM16 input gate fails.
  let file='raw.wav';try{inspectWav(fs.readFileSync(raw));}catch{call('ffmpeg',['-nostdin','-v','error','-n','-i',raw,'-ar','48000','-ac','1','-c:a','pcm_s16le',pcm]);file='pcm.wav';}
  const id='earshot-'+packId;assert(safeId(id),'ID hasil terlalu panjang');
  const spec={schemaVersion:1,assets:[{id,file,character:'synthetic',tags:t,gainDb:-16,source:{kind:'earshot',title:preset,creator:'Earshot bank / locally rendered',license:'earshot-rendered-output',sourceUrl:'https://github.com/Leonxlnx/earshot',licenseUrl:'https://github.com/Leonxlnx/earshot/issues/21',preset},rightsEvidence:'Original non-fit bank output; upstream license clarification issue #21 / CHANGELOG. Verify installed revision and output rights before distribution.'}]};
  const p=path.join(tmp,'spec.json');writeJson(p,spec);return {...importPack(p,packId,root),provider:'earshot-local',preset};
 }finally{fs.rmSync(tmp,{recursive:true,force:true});}
}
const publicAsset=({full,...a})=>a;
function main(){const [cmd,...args]=process.argv.slice(2);if(!cmd||cmd==='--help'){console.log('node tools/sfx-local.mjs verify | list | search <character> <tag>... | import <reviewed-local-spec.json> <new-pack-id> | earshot <bank/preset> <new-pack-id> <tag>... | prepare <manifest.json> <requests.json> <new-staging-folder>');return;}
 if(cmd==='earshot'){const [preset,packId,...t]=args;console.log(JSON.stringify(renderEarshot(preset,packId,t),null,2));return;}
 if(cmd==='import'){assert(args.length===2,'import <spec> <pack-id>');console.log(JSON.stringify(importPack(args[0],args[1]),null,2));return;}
 const assets=loadLibrary();if(cmd==='verify')console.log(JSON.stringify({ok:true,assets:assets.length,recorded:assets.filter(a=>a.character==='recorded').length,synthetic:assets.filter(a=>a.character==='synthetic').length,qa:'PCM and metadata only'},null,2));
 else if(cmd==='list')console.log(JSON.stringify(assets.map(publicAsset),null,2));
 else if(cmd==='search'){const [character,...t]=args;assert(['recorded','synthetic','either'].includes(character)&&tags(t),'search <character> <tag>...');console.log(JSON.stringify(assets.filter(a=>(character==='either'||character===a.character)&&t.every(x=>a.tags.includes(x))).map(publicAsset),null,2));}
 else if(cmd==='prepare'){assert(args.length===3,'prepare <manifest> <requests> <new-staging-folder>');console.log(JSON.stringify(prepare(json(args[0]),json(args[1]),args[2],assets),null,2));}
 else throw Error('Perintah tidak dikenal');}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){try{main()}catch(e){console.error('[SFX FAIL] '+e.message);process.exitCode=1;}}
