/** Non-destructive static geometry QA with scene/frame scoped findings.
 * Limits: CSS effects and browser computed styles require a rendered-frame review.
 */
import fs from 'node:fs';import path from 'node:path';import {createRequire} from 'node:module';
import {ROOT} from './menu-helper.mjs';
let ts;function T(){if(!ts)ts=createRequire(import.meta.url)('typescript');return ts}
const walk=d=>fs.existsSync(d)?fs.readdirSync(d,{withFileTypes:true}).flatMap(x=>x.isSymbolicLink()?[]:x.isDirectory()?walk(path.join(d,x.name)):x.name.endsWith('.tsx')?[path.join(d,x.name)]:[]):[];
const number=(v)=>{const t=T();if(!v)return null;if(t.isNumericLiteral(v))return Number(v.text);if(t.isPrefixUnaryExpression(v)&&t.isNumericLiteral(v.operand))return v.operator===t.SyntaxKind.MinusToken?-Number(v.operand.text):Number(v.operand.text);return null};
const overlap=(a,b)=>Math.max(0,Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x))*Math.max(0,Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y));
export function checkQuality(slug){if(!/^[a-z][a-z0-9-]{1,48}$/.test(slug))throw Error('Slug tidak valid');const dir=path.join(ROOT,'projects',slug),m=JSON.parse(fs.readFileSync(path.join(dir,'motiongraphic-video.json'),'utf8'));
 const issues=[],rects=[],factors={};let total=0,geometry=0,computed=0;
 const add=(level,code,message,file='',frame=0,layer='')=>issues.push({level,code,message,file,frame,layer});
 let timeline=[];const series=path.join(dir,'src','config','series.ts');if(fs.existsSync(series)){const s=fs.readFileSync(series,'utf8');const mt=s.match(/export const TIMELINE\s*=\s*(\[[\s\S]*?\])\s+as const/);if(mt)try{timeline=JSON.parse(mt[1])}catch{}}
 const guess=(file)=>{let s=file.replaceAll('\\','/');for(const ent of timeline){const k=ent.key.toLowerCase().replaceAll('_','-');if(s.includes(k)||s.endsWith('/Hook.tsx')&&ent.key==='HOOK'||s.endsWith('/CTA.tsx')&&ent.key==='CTA')return {frame:ent.start+Math.floor(ent.frames/2),scene:ent.key};}return {frame:0,scene:'unknown'};};
 for(const file of walk(path.join(dir,'src'))){const source=fs.readFileSync(file,'utf8'),t=T(),sf=t.createSourceFile(file,source,t.ScriptTarget.Latest,true,t.ScriptKind.TSX);const local=[];const rel=path.relative(dir,file).replaceAll('\\','/');
 const visit=n=>{if((t.isJsxOpeningElement(n)||t.isJsxSelfClosingElement(n))&&n.tagName.getText(sf).startsWith('Interactive.')){
 total++;const attrs=n.attributes.properties,name=attrs.find(a=>t.isJsxAttribute(a)&&a.name.text==='name')?.initializer;
 const label=name&&t.isStringLiteral(name)?name.text:'Layer '+total;const st=attrs.find(a=>t.isJsxAttribute(a)&&a.name.text==='style')?.initializer;
 const expr=st&&t.isJsxExpression(st)?st.expression:null;const p={};if(expr&&t.isObjectLiteralExpression(expr)){for(const v of expr.properties)if(t.isPropertyAssignment(v)){const k=v.name?.text;if(['left','top','width','height','fontSize'].includes(k))p[k]=number(v.initializer);}}
 const f=guess(rel);if(p.left!=null&&p.top!=null&&p.width!=null&&p.height!=null){geometry++;const r={x:p.left,y:p.top,w:p.width,h:p.height,label,file:rel,frame:f.frame,scene:f.scene};local.push(r);
 if(r.x<0||r.y<0||r.x+r.w>m.width||r.y+r.h>m.height)add('warning','offscreen',`Objek ${label} keluar kanvas (${Math.round(r.x)}, ${Math.round(r.y)}).`,rel,f.frame,label);
 if((/judul|headline|subtitle|cta|teks|title/i).test(label) && (r.y<250||r.y+r.h>m.height-350))add('review','safe-zone',`Periksa ${label} dekat zona aman 250px atas / 350px bawah.`,rel,f.frame,label);
 }else computed++;
 }t.forEachChild(n,visit)};visit(sf);
 // Overlaps of independent DOM siblings only; don't flag intentionally nested UI components.
 for(let i=0;i<local.length;i++)for(let j=i+1;j<local.length;j++){const a=local[i],b=local[j];const aScene=/^S([1-9])\s*[•-]/.exec(a.label)?.[1],bScene=/^S([1-9])\s*[•-]/.exec(b.label)?.[1];if(aScene&&bScene&&aScene!==bScene)continue;const area=overlap(a,b);if(area>0&&area/Math.min(a.w*a.h,b.w*b.h)>.50&&a.w*a.h>5000&&b.w*b.h>5000&&Math.abs(a.y-b.y)<120){if(issues.filter(q=>q.code==='overlap').length<20)add('review','overlap',`Potensi tumpang tindih ${a.label} / ${b.label} (bisa sengaja).`,rel,a.frame,a.label);}}
 rects.push(...local);
 }
 const cursors=m.defaultProps?.cursorEditor||{};for(const [scene,c] of Object.entries(cursors)){const ent=timeline.find(x=>x.key===scene);const frame=(ent?.start||0)+(c.clickFrame||0);
 if(c.enabled){if(![c.startX,c.startY,c.endX,c.endY].every(Number.isFinite)||c.clickFrame<c.fromFrame||c.clickFrame>c.toFrame)add('warning','cursor-timing','Kursor atau timing klik tidak valid pada '+scene,'motiongraphic-video.json',frame,scene);
 if(c.endX<0||c.endX>m.width||c.endY<0||c.endY>m.height)add('warning','cursor-offscreen','Posisi akhir kursor keluar layar pada '+scene,'motiongraphic-video.json',frame,scene);
 add('review','cursor-target','Pastikan ujung kursor benar-benar menyentuh target klik pada '+scene+'; pemeriksaan piksel/target memerlukan preview frame.','motiongraphic-video.json',frame,scene);
 }}
 const tracks=m.defaultProps?.audioTimeline||[];for(const a of tracks){if(a.enabled){const asset=path.join(dir,'public',a.src||'');if(!a.src||!fs.existsSync(asset))add('error','missing-audio','Audio aktif tidak ditemukan: '+a.id,'motiongraphic-video.json',a.startFrame,a.id);if(a.startFrame<0||a.startFrame+a.durationFrames>m.durationInFrames)add('warning','audio-timing','Audio '+a.id+' melewati durasi video.','motiongraphic-video.json',a.startFrame,a.id)}}
 const sampled=timeline.flatMap(e=>[e.start,Math.round(e.start+e.frames/2),e.end-1]).filter(x=>x>=0&&x<m.durationInFrames);if(!sampled.length)sampled.push(0,Math.floor(m.durationInFrames/2),m.durationInFrames-1);
 return {project:slug,summary:{interactive:total,literalGeometry:geometry,computedGeometry:computed,issues:issues.length,framesToReview:[...new Set(sampled)].sort((a,b)=>a-b),isPixelPerfect:false},issues:issues.slice(0,120),note:'Audit geometri statis. Tidak menjamin benturan visual saat animasi atau ketepatan klik; lihat frame yang direkomendasikan di preview.'};
}
