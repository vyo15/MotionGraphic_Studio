/** Bounded differential PNG review: four controlled renders, not a glyph/paint mask.
 * No dependency or source mutation. Only common 8-bit RGB/RGBA noninterlaced PNGs.
 */
import fs from 'node:fs';
import {inflateSync} from 'node:zlib';
import {createHash} from 'node:crypto';
const sha=b=>createHash('sha256').update(b).digest('hex');
const paeth=(a,b,c)=>{const p=a+b-c,x=Math.abs(p-a),y=Math.abs(p-b),z=Math.abs(p-c);return x<=y&&x<=z?a:y<=z?b:c;};
export function decodeReviewPng(bytes){
 if(!Buffer.isBuffer(bytes)||bytes.length<33||bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('Invalid PNG');
 let w,h,channels,done=false;const chunks=[];let at=8;
 while(at+12<=bytes.length){const n=bytes.readUInt32BE(at),type=bytes.toString('ascii',at+4,at+8);if(n>bytes.length-at-12)throw Error('Truncated PNG');const d=bytes.subarray(at+8,at+8+n);at+=12+n;
  if(type==='IHDR'){if(w!==undefined||n!==13)throw Error('Invalid PNG header');w=d.readUInt32BE(0);h=d.readUInt32BE(4);channels=d[9]===2?3:d[9]===6?4:0;if(!w||!h||w*h>12000000||d[8]!==8||!channels||d[10]||d[11]||d[12])throw Error('Unsupported PNG format');}
  if(type==='IDAT')chunks.push(d);if(type==='IEND'){done=true;break;}
 }
 if(!done||!w||!chunks.length)throw Error('Incomplete PNG');const stride=w*channels,raw=inflateSync(Buffer.concat(chunks),{maxOutputLength:(stride+1)*h});if(raw.length!==(stride+1)*h)throw Error('PNG scanline mismatch');const data=Buffer.alloc(stride*h);
 for(let y=0;y<h;y++){const off=y*(stride+1),filter=raw[off];if(filter>4)throw Error('Unsupported PNG filter');for(let x=0;x<stride;x++){const idx=y*stride+x,a=x>=channels?data[idx-channels]:0,b=y?data[idx-stride]:0,c=y&&x>=channels?data[idx-stride-channels]:0;data[idx]=(raw[off+1+x]+(filter===1?a:filter===2?b:filter===3?Math.floor((a+b)/2):filter===4?paeth(a,b,c):0))&255;}}
 return {width:w,height:h,channels,data};
}
export function compareIsolatedPixels(images,region,{threshold=8}={}){
 const [base,noTarget,noCover,neither,repeat]=images;
 if(![base,noTarget,noCover,neither,repeat].every(a=>a&&a.width===base.width&&a.height===base.height&&a.channels===base.channels&&Buffer.isBuffer(a.data)&&a.data.length===a.width*a.height*a.channels)||!base.data.equals(repeat.data))return {status:'INCOMPLETE',reason:'Capture size/format or repeated baseline differs'};
 if(!region||![region.x,region.y,region.w,region.h,threshold].every(Number.isFinite)||region.w<=0||region.h<=0||threshold<1||threshold>255)return {status:'INCOMPLETE',reason:'Invalid comparison region'};
 const x0=Math.max(0,Math.floor(region.x)),y0=Math.max(0,Math.floor(region.y)),x1=Math.min(base.width,Math.ceil(region.x+region.w)),y1=Math.min(base.height,Math.ceil(region.y+region.h));if(x1<=x0||y1<=y0)return {status:'INCOMPLETE',reason:'Empty region'};
 const delta=(a,b,i)=>{let d=0;for(let j=0;j<base.channels;j++)d=Math.max(d,Math.abs(a.data[i+j]-b.data[i+j]));return d;};let reference=0,retained=0,lost=0,changed=0;
 for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){const i=(y*base.width+x)*base.channels,ref=delta(noCover,neither,i),actual=delta(base,noTarget,i);if(ref<threshold)continue;reference++;if(actual>=threshold)retained++;else lost++;if(actual<ref*.5)changed++;}
 if(!reference)return {status:'INCOMPLETE',reason:'No detectable target contribution without cover'};
 return {status:lost?'PIXEL_CONTRIBUTION_LOSS_CANDIDATE':'NO_LOSS_IN_TESTED_REGION',referencePixels:reference,retainedPixels:retained,lostPixels:lost,lossFraction:lost/reference,attenuatedPixels:changed,threshold,verification:'Controlled differential renders; detects layer contribution, not exact glyph mask or proof of readability. Does not waive other QA findings.'};
}
export function reviewPngFiles(files,region){const buffers=files.map(f=>fs.readFileSync(f));return {...compareIsolatedPixels(buffers.map(decodeReviewPng),region),imageHashes:buffers.map(sha)};}
