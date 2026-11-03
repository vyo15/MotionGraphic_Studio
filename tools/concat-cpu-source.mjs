#!/usr/bin/env node
/**
 * Opt-in native Concat v0.2.8 CPU-only UI patch.
 * Does not touch the official portable runtime, user profiles or projects.
 * AGPL-3.0-or-later: preserve upstream license/attributions in patched source.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const MASTER = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXPECTED_COMMIT='79116bd0f9a103c633d888603ad27890e929dbdc';
const EXPECTED_PLATFORM_BLOB='dd1cfe1731737e26adf555f051ff2e8eeb41f2bf';
const MARKER='MOTIONGRAPHIC_STUDIO_CPU_UI_PATCH_V1';
export const cpuPatchMarker = MARKER;
const findOccurrences=(s,needle)=>s.split(needle).length-1;
function gitBlobHash(buffer){return crypto.createHash('sha1').update(Buffer.from(`blob ${buffer.length}\0`)).update(buffer).digest('hex');}

export function applyCpuPatch(src){
  if(src.includes(MARKER))return {changed:false,content:src};
  const oldGpu='    let gpu = Gpu::acquire();';
  const oldSelect='    selector = match &gpu {';
  const endSelect='    };\n\n    // The custom title bar.';
  for(const [name,needle] of [['GPU initialization',oldGpu],['backend selector',oldSelect],['selector closing',endSelect]]){
    if(findOccurrences(src,needle)!==1)throw new Error(`Source Concat berubah: ${name} tidak unik. Tidak mengubah file.`);
  }
  let next=src.replace(oldGpu,`    // ${MARKER}: true software UI, not DX12/WARP.\n    // This is opt-in; the official default path is left unchanged.\n    let force_cpu_ui = std::env::var("CONCAT_CPU_UI")\n        .is_ok_and(|value| value.trim() == "1");\n    let gpu = if force_cpu_ui {\n        log::warn!("CONCAT_CPU_UI=1: window and monitor use CPU-only rendering");\n        None\n    } else {\n        Gpu::acquire()\n    };`);
  next=next.replace(oldSelect,`    selector = if force_cpu_ui {\n        selector.renderer_name("software".into())\n    } else {\n        match &gpu {`);
  next=next.replace(endSelect,'        }\n    };\n\n    // The custom title bar.');
  return {changed:true,content:next};
}

export function patchLocalSource(root=MASTER,command='status'){
  const srcRoot=path.join(root,'apps','concat','source');
  const file=path.join(srcRoot,'src','crates','concat','src','platform.rs');
  if(!fs.existsSync(file))throw new Error('Source Concat belum ada. Jalankan npm run concat:cpu:build untuk setup dan build otomatis.');
  const commit=execFileSync('git',['-C',srcRoot,'rev-parse','HEAD'],{encoding:'utf8'}).trim();
  if(commit!==EXPECTED_COMMIT)throw new Error(`Hanya source resmi Concat v0.2.8 (${EXPECTED_COMMIT.slice(0,8)}) yang didukung. Ditemukan ${commit.slice(0,12)}.`);
  const original=fs.readFileSync(file);
  const code=original.toString('utf8');
  if(code.includes(MARKER)){
    if(command==='status')return {status:'patched',file};
    if(command==='apply')return {status:'already-patched',file};
  }
  if(command==='status')return {status:'not-patched',file};
  if(command!=='apply')throw new Error(`Action tidak tersedia: ${command}`);
  const actual=gitBlobHash(original);
  if(actual!==EXPECTED_PLATFORM_BLOB)throw new Error(`platform.rs memiliki perubahan lokal (${actual}). Tidak menimpa source. Buat salinan source bersih v0.2.8 jika ingin memakai patch CPU.`);
  const result=applyCpuPatch(code);
  const backupDir=path.join(root,'apps','concat','deps','cpu-source-backups');
  fs.mkdirSync(backupDir,{recursive:true});
  const backup=path.join(backupDir,`platform-${new Date().toISOString().replace(/[:.]/g,'-')}.rs`);
  fs.copyFileSync(file,backup,fs.constants.COPYFILE_EXCL);
  const tmp=`${file}.motiongraphic-tmp`;
  try{
    fs.writeFileSync(tmp,result.content,'utf8');
    fs.renameSync(tmp,file);
  }catch(e){try{fs.rmSync(tmp,{force:true});}catch{}throw e;}
  return {status:'patched',file,backup};
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{
    const result=patchLocalSource(MASTER,process.argv[2]||'status');
    console.log('[CPU SOURCE]',result.status);
    console.log('[SOURCE]',result.file);
    if(result.backup)console.log('[BACKUP]',result.backup);
    if(result.status==='patched' || result.status==='already-patched')console.log('[INFO] Native CPU UI baru aktif setelah Rust source dikompilasi; concat.exe portable TIDAK berubah.');
  }catch(err){console.error('[GAGAL CPU SOURCE]',err.message);process.exitCode=1;}
}
