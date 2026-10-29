import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createInterface} from 'node:readline/promises';
export const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const readCatalog=()=>JSON.parse(fs.readFileSync(path.join(ROOT,'library/catalog.json'),'utf8'));
export const writeCatalog=(data)=>fs.writeFileSync(path.join(ROOT,'library/catalog.json'),JSON.stringify(data,null,2)+'\n');
export async function selectVideo(videos,args){
 if(!videos.length)throw Error('Belum ada video yang terdaftar.');
 console.log('\nVIDEO TERSEDIA:');
 videos.forEach((v,i)=>console.log(`  ${i+1}. ${v.title}  [${v.id}]`));
 let value=args[0];
 if(!value){
  if(!process.stdin.isTTY)throw Error('Terminal interaktif dibutuhkan, atau pakai npm run <perintah> -- IDVideo');
  const rl=createInterface({input:process.stdin,output:process.stdout});
  try{value=(await rl.question('\nPilih nomor / ID video (Enter untuk batal): ')).trim()}finally{rl.close()}
 }
 if(!value)throw Error('Dibatalkan.');
 const v=videos.find((v,i)=>String(i+1)===value||v.id===value||v.slug===value);
 if(!v)throw Error('Pilihan tidak dikenali: '+value);
 return v;
}
export async function confirm(message){
 if(!process.stdin.isTTY)throw Error('Konfirmasi interaktif diperlukan sebelum menghapus.');
 const rl=createInterface({input:process.stdin,output:process.stdout});
 try{return (await rl.question(message)).trim()==='HAPUS'}finally{rl.close()}
}
export function uniqueDir(folder,stem){let dest=path.join(folder,stem),i=2;while(fs.existsSync(dest))dest=path.join(folder,stem+'-'+i++);return dest}
