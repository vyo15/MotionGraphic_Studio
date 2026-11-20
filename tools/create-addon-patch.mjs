#!/usr/bin/env node
/** Create a small revision patch from two snapshots of the SAME add-on. */
import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
import {validateAddon} from './validate-addon.mjs';
const sha=p=>createHash('sha256').update(fs.readFileSync(p)).digest('hex');
function walk(dir,root=dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name),root):e.isFile()?[path.relative(root,path.join(dir,e.name)).replaceAll('\\','/')]:[])};
try{
 const [oldArg,newArg,outArg]=process.argv.slice(2);
 if(!outArg)throw Error('Pakai: node tools/create-addon-patch.mjs <folder-lama> <folder-baru> <folder-output>');
 const old=path.resolve(oldArg),updated=path.resolve(newArg),out=path.resolve(outArg);
 const a=validateAddon(old,{matchFolder:false}),b=validateAddon(updated,{matchFolder:false});
 if(!a.ok||!b.ok)throw Error('Folder sumber/baru tidak valid: '+[...a.errors,...b.errors].join('; '));
 if(a.manifest.id!==b.manifest.id||a.manifest.slug!==b.manifest.slug)throw Error('ID/slug berbeda; patch tidak boleh mengganti identitas project');
 if(fs.existsSync(out))throw Error('Folder output sudah ada; gunakan folder kosong yang baru');
 const files=[];
 for(const rel of new Set([...walk(old),...walk(updated)])){
  if(rel.startsWith('node_modules/')||rel.startsWith('.git/'))continue;
  const x=path.join(old,rel),y=path.join(updated,rel);
  const h1=fs.existsSync(x)?sha(x):null,h2=fs.existsSync(y)?sha(y):null;
  if(h1===h2)continue;
  if(h2===null)files.push({path:rel,operation:'delete',expectedSha256:h1});
  else {const source='files/'+rel;const dest=path.join(out,source);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(y,dest);files.push({path:rel,operation:'write',expectedSha256:h1,sha256:h2,source})}
 }
 fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'addon-patch.json'),JSON.stringify({schemaVersion:1,slug:a.manifest.slug,id:a.manifest.id,files},null,2)+'\n');
 console.log(`[PATCH DIBUAT] ${files.length} file berubah: ${out}`);
}catch(e){console.error('[ERROR] '+e.message);process.exitCode=1}
