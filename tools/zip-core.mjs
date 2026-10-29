/**
 * ZIP streamer tanpa PowerShell, WinRAR, npm tambahan, atau blokir event-loop.
 * Format: ZIP UTF-8, DEFLATE, data descriptors, central directory (ZIP32).
 * Menolak file > 4 GiB / ZIP64 daripada menghasilkan arsip korup.
 */
import fs from 'node:fs';
import path from 'node:path';
import {promises as fsp} from 'node:fs';
import {createDeflateRaw} from 'node:zlib';
import {randomUUID} from 'node:crypto';

const CRC_TABLE = Uint32Array.from({length:256},(_,i)=>{
  let c=i; for(let j=0;j<8;j++)c=(c&1) ? (0xEDB88320 ^ (c>>>1)) : (c>>>1);
  return c>>>0;
});
function crcUpdate(crc, bytes){for(const b of bytes)crc=(crc>>>8)^CRC_TABLE[(crc^b)&255];return crc>>>0}
const MAX32=0xffffffff;
const MAX16=0xffff;
const mb=n=>(n/1048576).toFixed(1);
function aborted(signal){if(signal?.aborted)throw Error('Ekspor dibatalkan (Ctrl+C). ZIP sementara dibersihkan.');}
function dosTime(d){
  const date=new Date(Math.max(new Date(1980,0,1).getTime(),d.getTime()));
  return {time:(date.getHours()<<11)|(date.getMinutes()<<5)|(date.getSeconds()>>1),
    day:((date.getFullYear()-1980)<<9)|((date.getMonth()+1)<<5)|date.getDate()};
}
function cleanName(name){
  const n=name.split(path.sep).join('/');
  if(n.startsWith('/')||n.includes('\\')||n.split('/').some(x=>x==='..'||x===''))throw Error('Path ZIP tidak aman: '+n);
  return n;
}
/** entries: [{absolute, name, isDirectory, size, date}] */
export async function collectEntries(sources,{ignoreNames=new Set()}={}){
  const entries=[];
  const seen=new Set();
  async function visit(absolute,name){
    const stat=await fsp.lstat(absolute);
    if(stat.isSymbolicLink())throw Error('Symlink tidak didukung pada ZIP: '+absolute);
    const n=cleanName(name);
    if(stat.isDirectory()){
      if(!seen.has(n+'/')){entries.push({absolute,name:n+'/',isDirectory:true,size:0,date:stat.mtime});seen.add(n+'/')}
      const children=(await fsp.readdir(absolute,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name));
      for(const child of children){if(!ignoreNames.has(child.name))await visit(path.join(absolute,child.name),n+'/'+child.name)}
    }else if(stat.isFile()){
      if(stat.size>MAX32)throw Error(`File >4 GiB belum didukung untuk ZIP: ${n}`);
      if(!seen.has(n)){entries.push({absolute,name:n,isDirectory:false,size:stat.size,date:stat.mtime});seen.add(n)}
    }
  }
  for(const {absolute,name} of sources){if(fs.existsSync(absolute))await visit(absolute,name)}
  if(entries.length>MAX16)throw Error('Terlalu banyak entri untuk ZIP32 (>65.535).');
  return entries;
}

export async function createZip(entries,out,{signal,onProgress=()=>{}}={}){
  if(!entries.length)throw Error('Tidak ada file untuk ZIP.');
  await fsp.mkdir(path.dirname(out),{recursive:true});
  const partial=path.join(path.dirname(out),`.motiongraphic-${randomUUID()}.partial.zip`);
  const total=entries.filter(e=>!e.isDirectory).reduce((a,e)=>a+e.size,0);
  let processed=0,done=0,offset=0;
  let handle;
  const central=[];
  const started=Date.now();
  function progress(stage,name=''){
    onProgress({stage,name,processed,total,done,count:entries.length,elapsedMs:Date.now()-started});
  }
  let timer;
  try{
    handle=await fsp.open(partial,'wx');
    async function write(buffer){
      aborted(signal);
      let index=0;
      while(index<buffer.length){
        const result=await handle.write(buffer,index,buffer.length-index,offset+index);
        if(!result.bytesWritten)throw Error('ZIP disk write menghasilkan 0 byte.');
        index+=result.bytesWritten;
      }
      offset+=buffer.length;
      if(offset>MAX32)throw Error('ZIP mencapai batas 4 GiB (ZIP64 tidak tersedia).');
    }
    timer=setInterval(()=>progress('Kompresi berjalan'),1000);
    timer.unref?.();
    progress('Memulai ekspor');
    for(const entry of entries){
      aborted(signal);
      const filename=Buffer.from(entry.name,'utf8');
      if(filename.length>MAX16)throw Error('Nama file terlalu panjang: '+entry.name);
      const localOffset=offset;
      const {time,day}=dosTime(entry.date);
      const flags=entry.isDirectory?0x0800:0x0808;
      const method=entry.isDirectory?0:8;
      const local=Buffer.alloc(30);
      local.writeUInt32LE(0x04034b50,0);
      local.writeUInt16LE(20,4);local.writeUInt16LE(flags,6);local.writeUInt16LE(method,8);
      local.writeUInt16LE(time,10);local.writeUInt16LE(day,12);
      local.writeUInt16LE(filename.length,26);
      await write(local); await write(filename);
      let crc=0, compressed=0, uncompressed=0;
      if(!entry.isDirectory){
        let running=0xffffffff;
        const source=fs.createReadStream(entry.absolute,{highWaterMark:128*1024});
        const compressor=createDeflateRaw({level:6});
        source.on('data',chunk=>{
          running=crcUpdate(running,chunk);uncompressed+=chunk.length;
          processed+=chunk.length;
        });
        source.on('error',e=>compressor.destroy(e));
        source.pipe(compressor);
        try{
          for await(const chunk of compressor){
            aborted(signal);
            await write(chunk);compressed+=chunk.length;
          }
        }finally{source.destroy();compressor.destroy()}
        crc=(running^0xffffffff)>>>0;
        if(uncompressed!==entry.size)throw Error('File berubah saat ZIP berjalan: '+entry.name);
        if(compressed>MAX32)throw Error('Ukuran file terkompresi melebihi batas ZIP32: '+entry.name);
        const descriptor=Buffer.alloc(16);
        descriptor.writeUInt32LE(0x08074b50,0);descriptor.writeUInt32LE(crc,4);
        descriptor.writeUInt32LE(compressed,8);descriptor.writeUInt32LE(uncompressed,12);
        await write(descriptor);
      }
      const c=Buffer.alloc(46);
      c.writeUInt32LE(0x02014b50,0);
      c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);
      c.writeUInt16LE(flags,8);c.writeUInt16LE(method,10);
      c.writeUInt16LE(time,12);c.writeUInt16LE(day,14);
      c.writeUInt32LE(crc,16);c.writeUInt32LE(compressed,20);c.writeUInt32LE(uncompressed,24);
      c.writeUInt16LE(filename.length,28);
      c.writeUInt32LE(entry.isDirectory?0x10:0,38);
      c.writeUInt32LE(localOffset,42);
      central.push([c,filename]);
      done++;
      progress('Mengemas',entry.name);
    }
    progress('Menulis indeks ZIP');
    const centralOffset=offset;
    for(const [record,filename] of central){await write(record);await write(filename)}
    const centralSize=offset-centralOffset;
    const eocd=Buffer.alloc(22);
    eocd.writeUInt32LE(0x06054b50,0);
    eocd.writeUInt16LE(entries.length,8);eocd.writeUInt16LE(entries.length,10);
    eocd.writeUInt32LE(centralSize,12);eocd.writeUInt32LE(centralOffset,16);
    await write(eocd);
    await handle.sync();await handle.close();handle=null;
    // Simpan atomik: hasil final baru muncul setelah kompresi tuntas.
    if(fs.existsSync(out))throw Error('ZIP tujuan sudah ada: '+out);
    await fsp.rename(partial,out);
    progress('Selesai');
    return {out,files:entries.length,bytes:total,compressedBytes:offset,durationMs:Date.now()-started};
  }catch(e){
    throw new Error(`ZIP gagal: ${e.message}`);
  }finally{
    if(timer)clearInterval(timer);
    if(handle)await handle.close().catch(()=>{});
    await fsp.rm(partial,{force:true}).catch(()=>{});
  }
}
export function progressLogger(){
  let previous=-1,lastTime=0,lastStage='';
  return info=>{
    const pct=info.total?Math.min(100,Math.round(info.processed/info.total*100)):100;
    const now=Date.now();
    if(info.stage==='Selesai'||info.stage==='Memulai ekspor'||info.stage==='Menulis indeks ZIP'||now-lastTime>1500||info.done===info.count){
      if(pct!==previous||now-lastTime>2500||info.stage!==lastStage){
        console.log(`[ZIP] ${info.stage} | ${pct}% | ${info.done}/${info.count} entri | ${mb(info.processed)}/${mb(info.total)} MB${info.name?' | '+info.name.slice(-72):''}`);
        previous=pct;lastTime=now;lastStage=info.stage;
      }
    }
  }
}
