#!/usr/bin/env node
/** Rename project dengan transaksi/rollback. ID komposisi tidak berubah. */
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createInterface} from 'node:readline/promises';
import {ROOT} from './menu-helper.mjs';

const PROJECTS=path.join(ROOT,'projects');
const textExtensions=new Set(['.ts','.tsx','.js','.jsx','.json','.md','.txt','.css','.scss','.html','.svg','.yml','.yaml','.mjs','.cjs']);
const validSlug=s=>/^[a-z][a-z0-9-]{1,48}$/.test(s);
const slugify=s=>{let r=s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');if(/^[0-9]/.test(r))r='video-'+r;return r.slice(0,49).replace(/-$/,'')};
const fail=message=>{throw Error(message)};
function scan(){
  if(!fs.existsSync(PROJECTS))return [];
  return fs.readdirSync(PROJECTS,{withFileTypes:true})
    .filter(d=>d.isDirectory()&&!d.name.startsWith('.')&&!d.name.startsWith('_'))
    .map(d=>{
      const dir=path.join(PROJECTS,d.name), manifest=path.join(dir,'motiongraphic-video.json');
      if(!fs.existsSync(manifest))return {dir,name:d.name,missing:true};
      return {dir,name:d.name,manifest,config:JSON.parse(fs.readFileSync(manifest,'utf8'))};
    });
}
function argumentsOf(argv){
  const options={positional:[]};
  for(let i=0;i<argv.length;i++){
    const arg=argv[i];
    if(['--name','--title'].includes(arg)){if(!argv[i+1])fail('Parameter '+arg+' memerlukan nilai.');options[arg.slice(2)]=argv[++i]}
    else if(arg.startsWith('--name='))options.name=arg.slice(7);
    else if(arg.startsWith('--title='))options.title=arg.slice(8);
    else if(['--yes','--dry-run','--title-only','--adopt-folder','--repair'].includes(arg))options[arg.slice(2)]=true;
    else if(arg==='--help'){options.help=true}
    else if(arg.startsWith('--'))fail('Parameter tidak dikenal: '+arg);
    else options.positional.push(arg);
  }
  if(options.positional.length>1)fail('Gunakan satu ID/slug/nama folder saja.');
  const modes=[options['title-only'],options['adopt-folder'],options.repair].filter(Boolean);
  if(modes.length>1)fail('Pilih hanya satu mode: --title-only / --adopt-folder / --repair.');
  return options;
}
async function ask(q){
  if(!process.stdin.isTTY)fail('Terminal interaktif diperlukan. Contoh: npm run rename -- IDVideo --name "Nama Baru" --yes');
  const rl=createInterface({input:process.stdin,output:process.stdout});
  try{return (await rl.question(q)).trim()}finally{rl.close()}
}
function run(tool){
  const result=spawnSync(process.execPath,[path.join(ROOT,'tools',tool)],{cwd:ROOT,stdio:'inherit'});
  if(result.status!==0)fail('Pemeriksaan gagal: '+tool);
}
function walk(folder){
  const results=[];
  for(const e of fs.readdirSync(folder,{withFileTypes:true})){
    const p=path.join(folder,e.name);
    if(e.isSymbolicLink())fail('Symlink tidak diizinkan di project: '+p);
    if(e.isDirectory()){
      if(['node_modules','.git','dist','build','.cache'].includes(e.name))fail('Folder build tidak boleh berada di project: '+p);
      results.push(...walk(p));
    }else if(e.isFile())results.push(p);
  }
  return results;
}
function updateProject(folder,oldSlug,newSlug,newTitle){
  const manifest=path.join(folder,'motiongraphic-video.json');
  const cfg=JSON.parse(fs.readFileSync(manifest,'utf8'));
  cfg.slug=newSlug;cfg.title=newTitle;
  // Replace only technical references inside THIS project; never touch another project's source.
  // Old slug can occur in staticFile('videos/<slug>/...'), JSON asset references and docs.
  for(const file of walk(folder)){
    if(file===manifest||!textExtensions.has(path.extname(file).toLowerCase()))continue;
    const raw=fs.readFileSync(file,'utf8');
    if(raw.includes(oldSlug))fs.writeFileSync(file,raw.replaceAll(oldSlug,newSlug),'utf8');
  }
  fs.writeFileSync(manifest,JSON.stringify(cfg,null,2)+'\n');
}
async function main(){
  const opts=argumentsOf(process.argv.slice(2));
  if(opts.help){console.log(`\nPERINTAH RENAME\n  npm run rename                    # menu interaktif\n  npm run rename -- IDVideo --name "Judul Baru"\n  npm run rename -- IDVideo --title-only --title "Judul Baru"\n  npm run rename -- IDVideo --adopt-folder  # folder diubah manual → slug menyesuaikan\n  npm run rename -- IDVideo --repair        # folder dikembalikan sesuai slug di manifest\n  npm run rename -- IDVideo --name "Baru" --dry-run\n  Tambah --yes untuk otomatisasi tanpa konfirmasi.\n`);return}
  const projects=scan();
  const listed=projects.filter(p=>!p.missing);
  if(!listed.length)fail('Belum ada add-on dengan motiongraphic-video.json di projects/.');
  console.log('\n=== RENAME PROJECT — MOTIONGRAPHIC STUDIO ===');
  listed.forEach((p,i)=>console.log(` ${i+1}. ${p.config.title} [${p.config.id}]${p.name!==p.config.slug?' ⚠ nama folder berbeda':''}`));
  const selector=opts.positional[0]||(await ask('\nPilih nomor / ID / slug / folder: '));
  const project=listed.find((p,i)=>selector===String(i+1)||[p.name,p.config.id,p.config.slug].includes(selector));
  if(!project)fail('Project tidak ditemukan: '+selector);
  const oldSlug=project.config.slug;
  let mode=opts['title-only']?'title':opts['adopt-folder']?'adopt':opts.repair?'repair':'full';
  if(!opts.name&&!opts.title&&!opts['title-only']&&!opts['adopt-folder']&&!opts.repair){
    console.log('\n  1. Ganti judul tampilan saja (paling aman)');
    console.log('  2. Ganti judul + slug + folder dan path aset');
    console.log('  3. Gunakan nama folder yang sudah diganti di Explorer');
    console.log('  4. Perbaiki nama folder agar sesuai slug manifest');
    const choice=await ask('Pilih 1/2/3/4 (Enter = 2): ');
    if(choice==='1')mode='title';else if(choice==='3')mode='adopt';else if(choice==='4')mode='repair';
    else if(choice&&choice!=='2')fail('Pilihan tidak valid.');
  }
  let newTitle=opts.title??opts.name??project.config.title;
  let newSlug=oldSlug;
  if(mode==='title'){
    if(!opts.title&&!opts.name)newTitle=await ask('Judul baru: ');
  }else if(mode==='full'){
    if(!opts.name&&!opts.title)newTitle=await ask('Judul/nama baru: ');
    newSlug=slugify(opts.name??opts.title??newTitle);
  }else if(mode==='adopt')newSlug=slugify(project.name);
  else if(mode==='repair')newSlug=oldSlug;
  newTitle=newTitle.trim();
  if(!newTitle)fail('Judul tidak boleh kosong.');
  if(!validSlug(newSlug))fail('Slug hasil normalisasi tidak valid (gunakan nama yang diawali huruf dan maksimal 49 karakter): '+newSlug);
  const finalFolder=mode==='title'?project.name:newSlug;
  const destination=path.join(PROJECTS,finalFolder);
  if(projects.some(p=>p!==project&&(p.name===finalFolder||p.config?.slug===newSlug||p.config?.id===project.config.id)))fail('Folder, ID, atau slug sudah dipakai project lain. Tidak ada perubahan.');
  if(destination!==project.dir&&fs.existsSync(destination))fail('Tujuan sudah ada: projects/'+finalFolder);
  console.log(`\nPROJECT ID TETAP : ${project.config.id}`);
  console.log(`Judul            : ${project.config.title}  →  ${newTitle}`);
  console.log(`Folder           : ${project.name}  →  ${finalFolder}`);
  console.log(`Slug aset        : ${oldSlug}  →  ${newSlug}`);
  if(opts['dry-run']){console.log('\n[DRY RUN] Tidak ada file yang diubah.');return}
  if(project.name===finalFolder&&oldSlug===newSlug&&project.config.title===newTitle){console.log('\n[TIDAK ADA PERUBAHAN]');return}
  if(!opts.yes){
    if((await ask('\nKetik RENAME untuk menyimpan (selain itu batal): '))!=='RENAME'){
      console.log('[BATAL] Tidak ada perubahan.');return;
    }
  }
  // Title only: copy byte-for-byte manifest for rollback. Other source files untouched.
  if(mode==='title'){
    const previous=fs.readFileSync(project.manifest);
    try{
      const updated={...project.config,title:newTitle};
      fs.writeFileSync(project.manifest,JSON.stringify(updated,null,2)+'\n');
      run('sync-projects.mjs');run('validate-library.mjs');
      console.log('\n[BERHASIL] Judul diubah. Refresh Remotion Studio.');
    }catch(e){fs.writeFileSync(project.manifest,previous);run('sync-projects.mjs');throw e}
    return;
  }
  // Full rename: prepare a complete copy, verify it, then swap atomically.
  // Original remains as a temporary rollback copy until both sync and validation succeed.
  const stage=fs.mkdtempSync(path.join(PROJECTS,'_rename-stage-'));
  const backup=path.join(PROJECTS,'_rename-backup-'+path.basename(stage));
  let oldMoved=false,newMoved=false;
  try{
    for(const f of walk(project.dir)){const rel=path.relative(project.dir,f),out=path.join(stage,rel);fs.mkdirSync(path.dirname(out),{recursive:true});fs.copyFileSync(f,out)}
    updateProject(stage,oldSlug,newSlug,newTitle);
    fs.renameSync(project.dir,backup);oldMoved=true;
    fs.renameSync(stage,destination);newMoved=true;
    run('sync-projects.mjs');run('validate-library.mjs');
    fs.rmSync(backup,{recursive:true,force:true});oldMoved=false;
    console.log(`\n[BERHASIL] ${project.config.id} → projects/${finalFolder}`);
    console.log('[AMAN] ID komposisi tetap, referensi aset diperbarui, project lain tidak diubah.');
    console.log('Refresh Studio jika masih terbuka.');
  }catch(e){
    console.error('\n[ROLLBACK] Terjadi masalah, memulihkan project semula...');
    if(newMoved&&fs.existsSync(destination))fs.rmSync(destination,{recursive:true,force:true});
    if(oldMoved&&fs.existsSync(backup))fs.renameSync(backup,project.dir);
    try{run('sync-projects.mjs');run('validate-library.mjs')}catch(err){console.error('[PERINGATAN] Sync setelah rollback belum berhasil: '+err.message)}
    throw e;
  }finally{if(fs.existsSync(stage))fs.rmSync(stage,{recursive:true,force:true})}
}
try{await main()}catch(e){console.error('\n[ERROR RENAME] '+e.message);process.exitCode=1}
