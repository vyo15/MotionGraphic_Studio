#!/usr/bin/env node
/**
 * Otomatis temukan bab/scene pada add-on folder-first TANPA mendaftarkan satu per satu.
 * Urutan prioritas:
 *  1. Manifest segments yang sudah ada (jangan disentuh)
 *  2. src/config/segments.json atau segments.ts (data statis)
 *  3. src/config/series.ts: TIMELINE (data statis)
 *  4. SCENE_N constants di file entry (mempertahankan overlap transition)
 *  5. <Sequence from={N} durationInFrames={N}> literal di file entry.
 * Tidak mengeksekusi TS/JS sumber dan tidak mengarang timing apabila ambigu.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const MASTER = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (condition, message) => {if (!condition) throw new Error(message);};
const windowsTitles = [
  ['HOOK','WinHacks-00-Opening','00 — Opening / Hook'],
  ['CTRL_SHIFT_T','WinHacks-01-CtrlShiftT','01 — Ctrl + Shift + T'],
  ['CTRL_SHIFT_ESC','WinHacks-02-TaskManager','02 — Ctrl + Shift + Esc'],
  ['WIN_SHIFT_S','WinHacks-03-Win-Shift-S','03 — Win + Shift + S'],
  ['WIN_E','WinHacks-04-Win-E','04 — Win + E'],
  ['CTRL_SHIFT_N','WinHacks-05-Ctrl-Shift-N','05 — Ctrl + Shift + N + Bonus'],
  ['CTA','WinHacks-06-CTA','06 — CTA / Closing'],
];
const ipTitles = [
  ['IPAddress-01-Hook','01 — Hook'],
  ['IPAddress-02-Alamat-Rumah','02 — IP = Alamat Rumah'],
  ['IPAddress-03-IPv4','03 — IPv4 Empat Angka'],
  ['IPAddress-04-Router-Paket','04 — Router dan Paket'],
  ['IPAddress-05-CTA','05 — Kesimpulan / CTA'],
];
const positiveInt = n => Number.isInteger(n) && n > 0;
const safeId = (m, i) => `${m.id.slice(0,66)}-S${String(i+1).padStart(2,'0')}`;
const safeLabel = (label, i) => `${String(i+1).padStart(2,'0')} — ${String(label || 'Scene '+(i+1)).trim()}`;

function validate(segments, total, video) {
  assert(Array.isArray(segments) && segments.length >= 2, `Video ${video}: minimal 2 segmen`);
  let frame = 0;
  for (const s of segments) {
    assert(/^[A-Za-z][A-Za-z0-9-]{1,75}$/.test(s.id), `ID segmen tidak valid: ${s.id}`);
    assert(typeof s.title === 'string' && s.title.trim(), `Judul segmen tidak valid: ${s.id}`);
    assert(s.startFrame === frame && positiveInt(s.durationInFrames), `Frame segmen tidak berurutan: ${video} / ${s.id}`);
    frame += s.durationInFrames;
  }
  assert(frame === total, `Durasi segmen ${video}: ${frame} harus ${total}`);
}
const read = file => fs.existsSync(file) ? fs.readFileSync(file,'utf8') : null;

// Konfigurasi TS harus literal statis (tanpa fungsi, ekspresi atau spread).
// Kompatibel dengan JSON array dan TS object literal sederhana (key tanpa kutip, trailing comma).
function staticArray(raw, name) {
  const marker = new RegExp(`(?:export\\s+)?const\\s+${name}\\s*(?::[^=\\n]+)?=\\s*\\[`, 'm');
  const found = marker.exec(raw);
  if (!found) return null;
  const start=found.index+found[0].length-1;
  let depth=0,quote=null,escaped=false,end=-1;
  for (let i=start;i<raw.length;i++) {
    const ch=raw[i];
    if(quote){
      if(escaped){escaped=false;continue}
      if(ch==='\\'){escaped=true;continue}
      if(ch===quote)quote=null;
      continue;
    }
    if(ch==='"'||ch==="'"||ch==='`'){quote=ch;continue}
    if(ch==='[')depth++;
    if(ch===']' && --depth===0){end=i;break}
  }
  if(end<0)return null;
  let source=raw.slice(start,end+1);
  try{return JSON.parse(source)}catch{}
  source=source.replace(/([{,]\s*)([A-Za-z_$][\w$]*)(\s*:)/g,'$1"$2"$3')
    .replace(/,\s*([}\]])/g,'$1')
    .replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g,(_,s)=>JSON.stringify(s.replace(/\\'/g,"'")));
  try{return JSON.parse(source)}catch{return null}
}
function segmentConfig(folder,m) {
  for(const file of ['src/config/segments.json','src/config/segments.ts','src/config/scenes.ts','src/config/series.ts']) {
    const raw=read(path.join(folder,file));if(!raw)continue;
    let list;
    if(file.endsWith('.json')) {
      try{const obj=JSON.parse(raw);list=Array.isArray(obj)?obj:obj.segments}catch{throw Error(`JSON segmen rusak: ${m.slug}/${file}`)}
    } else {
      list=staticArray(raw,'SEGMENTS') ?? staticArray(raw,'SCENES') ?? staticArray(raw,'TIMELINE');
    }
    if(!Array.isArray(list)||list.length<2)continue;
    const isWindows = m.id === 'WindowsHacks5ShortcutLengkap' && list.map(x=>x.key).join('|') === windowsTitles.map(x=>x[0]).join('|');
    const segments=list.map((x,i)=>{
      const startFrame=x.startFrame??x.from??x.start;
      const durationInFrames=x.durationInFrames??x.frames??x.duration;
      const title=typeof x.title==='string'?x.title:(isWindows?windowsTitles[i][2]:safeLabel(x.label??x.name??x.key,i));
      const id=typeof x.id==='string'?x.id:(isWindows?windowsTitles[i][1]:safeId(m,i));
      if(x.end!=null && x.end!==startFrame+durationInFrames)throw Error(`TIMELINE end tidak cocok: ${m.slug} / ${title}`);
      return {id,title,startFrame,durationInFrames};
    });
    validate(segments,m.durationInFrames,m.slug);
    return segments;
  }
  return null;
}
const safeEntry=m=>typeof m.entry==='string' && m.entry.startsWith('src/') && !m.entry.includes('\\') && !m.entry.split('/').some(x=>x==='..'||x==='.'||!x) && /\.(tsx|jsx)$/.test(m.entry);
function ipLikeSegments(folder,m) {
  if(!safeEntry(m))return null;
  const raw=read(path.join(folder,m.entry));if(!raw)return null;
  const found=[...raw.matchAll(/const\s+SCENE_(\d+)\s*=\s*\{\s*from:\s*(\d+)\s*,\s*duration:\s*(\d+)\s*\}/g)]
    .map(x=>({number:Number(x[1]),start:Number(x[2]),originalDuration:Number(x[3])}));
  if(found.length<2)return null;
  found.sort((a,b)=>a.number-b.number);
  for(const item of found) {
    if(!raw.includes(`from={SCENE_${item.number}.from}`)||!raw.includes(`durationInFrames={SCENE_${item.number}.duration}`))return null;
  }
  const isIP=m.id==='IPAddressReels'&&found.length===ipTitles.length;
  const segments=found.map((s,i)=>({
    id:isIP?ipTitles[i][0]:safeId(m,i),
    title:isIP?ipTitles[i][1]:safeLabel(`Scene ${s.number}`,i),
    startFrame:s.start,
    durationInFrames:(found[i+1]?.start??m.durationInFrames)-s.start,
  }));
  if(found[0].start!==0||found.at(-1).start+found.at(-1).originalDuration!==m.durationInFrames)return null;
  for(let i=0;i<found.length-1;i++)if(found[i].start+found[i].originalDuration<found[i+1].start)return null;
  validate(segments,m.durationInFrames,m.slug);
  return segments;
}
function jsxSequences(folder,m) {
  if(!safeEntry(m))return null;
  const raw=read(path.join(folder,m.entry));if(!raw)return null;
  const found=[];
  for(const mt of raw.matchAll(/<Sequence\b([^>]*?)\s*\/?\s*>/gs)) {
    const attr=mt[1];
    const start=/\bfrom=\{\s*(\d+)\s*\}/.exec(attr);
    const length=/\bdurationInFrames=\{\s*(\d+)\s*\}/.exec(attr);
    if(!start||!length)continue;
    const name=/\bname=["']([^"']+)["']/.exec(attr);
    found.push({startFrame:Number(start[1]),durationInFrames:Number(length[1]),title:name?.[1]});
  }
  if(found.length<2)return null;
  found.sort((a,b)=>a.startFrame-b.startFrame);
  const segments=found.map((x,i)=>({id:safeId(m,i),title:safeLabel(x.title,i),...{startFrame:x.startFrame,durationInFrames:x.durationInFrames}}));
  // JSX lain dapat menggunakan Sequence untuk overlay/audio. Jika tidak menutupi
  // seluruh durasi tanpa overlap, JANGAN mengarang bab dari elemen dekoratif.
  try{validate(segments,m.durationInFrames,m.slug)}catch{return null}
  return segments;
}
export function registerMissingSceneSegments(root=MASTER) {
  const projects=path.join(root,'projects');if(!fs.existsSync(projects))return 0;
  const updatePlan=[],allIds=new Set(),waiting=[];
  const dirs=fs.readdirSync(projects,{withFileTypes:true}).filter(d=>d.isDirectory()&&!d.name.startsWith('.')&&!d.name.startsWith('_'));
  for(const dir of dirs) {
    const folder=path.join(projects,dir.name),manifest=path.join(folder,'motiongraphic-video.json');
    if(!fs.existsSync(manifest))continue; // sync utama menangani folder tidak valid
    const original=fs.readFileSync(manifest,'utf8');
    const m=JSON.parse(original);
    if(Array.isArray(m.segments)&&m.segments.length) {
      for(const seg of m.segments){assert(!allIds.has(seg.id),`ID segmen duplikat: ${seg.id}`);allIds.add(seg.id)}
      continue; // tidak pernah menimpa manual/edit user
    }
    const segments=segmentConfig(folder,m)??ipLikeSegments(folder,m)??jsxSequences(folder,m);
    if(!segments){waiting.push(dir.name);continue}
    for(const seg of segments){assert(!allIds.has(seg.id),`ID segmen duplikat: ${seg.id}`);allIds.add(seg.id)}
    m.segments=segments;
    if(m.id==='WindowsHacks5ShortcutLengkap'&&!m.studioFolderName)m.studioFolderName='Windows-Hacks-5-Shortcut';
    updatePlan.push({manifest,original,updated:JSON.stringify(m,null,2)+'\n',id:m.id,count:segments.length});
  }
  if(updatePlan.length){
    const backupFolder=path.join(root,'library/backups/segment-registration');
    fs.mkdirSync(backupFolder,{recursive:true});
    const stamp=new Date().toISOString().replace(/[:.]/g,'-');
    for(const item of updatePlan){
      fs.writeFileSync(path.join(backupFolder,`${item.id}-${stamp}.json`),item.original);
      const tmp=item.manifest+'.'+process.pid+'.tmp';
      fs.writeFileSync(tmp,item.updated);fs.renameSync(tmp,item.manifest);
      console.log(`[SEGMENT AUTO] ${item.id}: ${item.count} komposisi segmen didaftarkan otomatis.`);
    }
  }
  if(waiting.length)console.log(`[SEGMENT INFO] Belum ada timing scene statis yang dapat dikenali: ${waiting.join(', ')}. Video lengkap tetap aktif. Gunakan src/config/segments.json (lihat PANDUAN-AUTO-SEGMEN.md).`);
  return updatePlan.length;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{const n=registerMissingSceneSegments();console.log(`[SEGMENT AUTO] ${n} manifest baru didaftarkan.`)}
  catch(e){console.error('[SEGMENT AUTO ERROR] '+e.message);process.exitCode=1}
}
