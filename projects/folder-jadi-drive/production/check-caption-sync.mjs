// Read-only guard: check materialized caption text against current canonical VO.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'src/config/narration.json'),'utf8'));
const s=fs.readFileSync(path.join(root,'src/components/DraftCaptions.tsx'),'utf8');
const swiss=fs.readFileSync(path.join(root,'src/scenes/Scene01.tsx'),'utf8');
const actual=new Map([...s.matchAll(/<Interactive\.Text name="([^"]+)"[^>]*>([^<]*)<\/Interactive\.Text>/g)].map(m=>[m[1],m[2].trim().replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>')]));
let fail=0,expected=0;
for(const [bi,b] of data.beats.entries()){
 if(!b.text.trim())continue;
 if(b.startFrame===348&&b.scene==='S01'){
  const a=swiss.match(/<Interactive\.Text name="S01 Nah ternyata"[^>]*>([^<]*)<\/Interactive\.Text>/)?.[1];
  const z=swiss.match(/<Interactive\.Text name="S01 Bisa loh"[^>]*>([^<]*)<\/Interactive\.Text>/)?.[1];
  if(`${a?.trim()} ${z?.trim()}`!==b.text.trim()){console.error('Swiss typography berbeda dari VO');fail++;}continue;
 }
 const words=b.text.trim().split(/\s+/);let off=0;
 for(const [ci,c] of (b.captionCuts??[]).entries()){
  const w=words.slice(off,off+c.wordCount);off+=c.wordCount;const lines=c.lineBreakAfter?[w.slice(0,c.lineBreakAfter).join(' '),w.slice(c.lineBreakAfter).join(' ')]:[w.join(' ')];
  for(const [li,t] of lines.entries()){const name=`${b.scene} Subtitle ${String(bi+1).padStart(2,'0')}.${ci+1}.${li+1}`;expected++;if(actual.get(name)!==t){console.error('Caption berbeda:',name);fail++;}}
 }
 if(off!==words.length){console.error('Caption cut berbeda:',b.scene,bi+1);fail++;}
}
if(actual.size!==expected){console.error('Jumlah target caption berbeda:',actual.size,expected);fail++;}
console.log(`[CAPTION SYNC] ${expected} baris + Swiss beat; ${fail} perbedaan. Tidak mengubah source.`);
if(fail)process.exitCode=1;
