#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const {videos}=JSON.parse(fs.readFileSync(path.join(root,'library/catalog.json'),'utf8'));
console.log('\n=== DAFTAR VIDEO MOTIONGRAPHIC STUDIO ===');
if(!videos.length)console.log('(Tidak ada video terdaftar)');
for(const [i,v] of videos.entries()){
 console.log(`${String(i+1).padStart(2,' ')}. ${v.title}\n     ID: ${v.id} | ${v.width}x${v.height} | ${v.durationInFrames/v.fps}s`);
}
console.log(`\nTotal: ${videos.length} video.\n`);
