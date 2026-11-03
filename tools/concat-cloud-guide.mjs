#!/usr/bin/env node
import {execFileSync} from 'node:child_process';
let remote='';
try{remote=execFileSync('git',['remote','get-url','origin'],{encoding:'utf8'}).trim()}catch{}
let url=remote.match(/github\.com[:/]([^/]+\/[^/]+?)(?:\.git)?$/i)?.[1];
if(url) console.log(`\n[BUKA] https://github.com/${url}/actions/workflows/build-concat-cpu-portable.yml`);
else console.log('\n[BUKA] Repository MotionGraphic_Studio kamu di GitHub > Actions > Build Concat CPU-only (Windows portable).');
console.log('1. Commit/push patch CHANGE ONLY ke branch default GitHub dahulu.');
console.log('2. Tekan Run workflow. GitHub akan membangun executable CPU-only di Windows runner (Rust lokal tidak diperlukan).');
console.log('3. Jika build sukses, download artifact Concat-CPU-Portable-Windows-x64 ke Downloads.');
console.log('4. npm run concat:cpu:import');
console.log('5. npm run concat:cpu');
console.log('\n[CATATAN] Build memerlukan menit/jam dan bergantung pada kuota GitHub Actions. Workflow belum diuji di runner GitHub.');
