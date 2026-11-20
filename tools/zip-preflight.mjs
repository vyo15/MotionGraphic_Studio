/** Read ZIP32 central directory before OS extraction (prevents ZIP slip & symlinks). */
import fs from 'node:fs';
import path from 'node:path';
const assert=(v,msg)=>{if(!v)throw Error(msg)};
export function inspectZip(file,{maxEntries=8000,maxBytes=1024**3}={}){
 const fd=fs.openSync(file,'r');
 try{
  const size=fs.fstatSync(fd).size;
  assert(size>22,'ZIP terlalu pendek');
  const tailBytes=Math.min(65557,size),tail=Buffer.alloc(tailBytes);
  fs.readSync(fd,tail,0,tailBytes,size-tailBytes);
  let end=-1;
  for(let i=tailBytes-22;i>=0;i--)if(tail.readUInt32LE(i)===0x06054b50&&i+22+tail.readUInt16LE(i+20)===tailBytes){end=i;break}
  assert(end>=0,'ZIP tidak lengkap (EOCD tidak ditemukan)');
  const count=tail.readUInt16LE(end+10),sizeCD=tail.readUInt32LE(end+12),offset=tail.readUInt32LE(end+16);
  assert(count>0&&count<=maxEntries,'Jumlah entri ZIP tidak aman');
  assert(sizeCD!==0xffffffff&&offset!==0xffffffff,'ZIP64 tidak didukung oleh importer ini');
  assert(offset+sizeCD<=size&&sizeCD<=16*1024*1024,'Central directory ZIP tidak wajar');
  const data=Buffer.alloc(sizeCD);fs.readSync(fd,data,0,sizeCD,offset);
  let p=0,bytes=0;const seen=new Set();
  const paths=[];
  for(let i=0;i<count;i++){
   assert(p+46<=data.length&&data.readUInt32LE(p)===0x02014b50,'Central directory rusak');
   const flags=data.readUInt16LE(p+8),method=data.readUInt16LE(p+10);
   const uncomp=data.readUInt32LE(p+24),nameLen=data.readUInt16LE(p+28),extraLen=data.readUInt16LE(p+30),commentLen=data.readUInt16LE(p+32);
   const madeBy=data.readUInt16LE(p+4),external=data.readUInt32LE(p+38);
   assert(p+46+nameLen+extraLen+commentLen<=data.length,'Nama entri ZIP terpotong');
   const raw=data.subarray(p+46,p+46+nameLen),name=raw.toString('utf8');
   assert(!(flags&1),'ZIP terenkripsi tidak didukung');
   assert(method===0||method===8,'Metode ZIP tidak didukung');
   assert(name&&name.length<1024&&!name.includes('\\')&&!name.startsWith('/')&&!/^\w:/.test(name)&&!name.includes('\0'),'Path ZIP tidak aman: '+name);
   assert(name.split('/').every((seg,j,all)=>seg && seg!=='.' && seg!=='..' || seg===''&&j===all.length-1&&name.endsWith('/')),'Path ZIP traversal: '+name);
   const type=(external>>>16)&0xF000;
   assert(!(madeBy>>8===3&&type===0xA000),'Symlink ZIP ditolak: '+name);
   const canon=name.replace(/\/$/,'').toLowerCase();
   assert(!seen.has(canon),'Nama file ZIP duplikat/case collision: '+name);seen.add(canon);
   bytes+=uncomp;assert(bytes<=maxBytes,'Total uncompressed >1 GiB');
   paths.push(name);
   p+=46+nameLen+extraLen+commentLen;
  }
  assert(p===data.length,'Central directory memiliki data tambahan');
  return {paths,count,bytes};
 }finally{fs.closeSync(fd)}
}
