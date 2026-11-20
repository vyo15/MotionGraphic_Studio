#!/usr/bin/env node
/** Generate a blank, project-local VO guide script without touching active animations. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2];
try {
  if (!slug || !/^[a-z][a-z0-9-]{1,48}$/.test(slug)) throw Error('Pakai: npm run vo:init -- <slug>');
  const project = path.join(ROOT,'projects',slug);
  const manifest = path.join(project,'motiongraphic-video.json');
  if (!fs.existsSync(manifest)) throw Error('Manifest tidak ditemukan: projects/'+slug);
  const m = JSON.parse(fs.readFileSync(manifest,'utf8'));
  if (m.slug !== slug) throw Error('Slug manifest tidak sama dengan nama folder.');
  const output = path.join(project,'src/config/narration.json');
  if (fs.existsSync(output)) {
    console.log('[AMAN] narration.json sudah ada. Tidak ditimpa: '+path.relative(ROOT,output));
    process.exit(0);
  }
  const beats = m.segments?.length ? m.segments.map(s => ({scene:s.title,startFrame:s.startFrame,endFrame:s.startFrame+s.durationInFrames,text:''}))
    : [{scene:'FULL',startFrame:0,endFrame:m.durationInFrames,text:''}];
  fs.mkdirSync(path.dirname(output),{recursive:true});
  fs.writeFileSync(output,JSON.stringify({schemaVersion:1,status:'draft',beats},null,2)+'\n');
  console.log('[VO GUIDE] Template dibuat: '+path.relative(ROOT,output));
  console.log('Isi "text" pada beat sesuai naskah, lalu jalankan npm run sync.');
}catch(e){console.error('[VO GUIDE ERROR] '+e.message);process.exitCode=1}
