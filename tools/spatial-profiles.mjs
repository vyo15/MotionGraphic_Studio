import fs from 'node:fs';
const positive=v=>Number.isFinite(v)&&v>0;
export function validateSpatialProfiles(data){
 const {reference:r,profiles:p}=data??{};
 if(data?.schemaVersion!==1||!r||![r.width,r.height].every(v=>Number.isInteger(v)&&v>0)||!p||!Object.hasOwn(p,'legacy')||!Object.hasOwn(p,'compact-balanced-v1'))throw Error('Invalid spatial profiles');
 for(const [id,v] of Object.entries(p)){
  const s=v?.safe;if(!s||!['top','bottom','left','right'].every(k=>Number.isFinite(s[k])&&s[k]>=0)||s.left+s.right>=r.width||s.top+s.bottom>=r.height||!Number.isFinite(v.renderTolerance)||v.renderTolerance<0)throw Error('Invalid safe zone '+id);
  if(id!=='legacy'&&(![v.visualBottom,v.guideTop,v.guideBottom,v.guideGap,v.grid,v.guideFontMin,v.guideFontMax].every(positive)||v.visualBottom<=s.top||v.guideTop-v.visualBottom<v.guideGap||v.guideBottom<=v.guideTop||v.guideBottom>r.height-s.bottom||v.guideFontMax<v.guideFontMin))throw Error('Invalid visual/guide regions '+id);
 }
 return data;
}
export const spatialProfiles=validateSpatialProfiles(JSON.parse(fs.readFileSync(new URL('../contracts/spatial-profiles.json',import.meta.url),'utf8')));
export function resolveSpatialProfile(m=spatialProfiles.reference){
 const id=m.designContract??'legacy',p=spatialProfiles.profiles[id];
 if(!Object.hasOwn(spatialProfiles.profiles,id)||!p)throw Error('Unknown spatial profile: '+id);
 if(![m.width,m.height].every(v=>Number.isInteger(v)&&v>0))throw Error('Invalid composition dimensions');
 const {width,height}=spatialProfiles.reference,sx=m.width/width,sy=m.height/height;
 const {top,bottom,left,right}=p.safe;
 const safe={x:left*sx,y:top*sy,w:(width-left-right)*sx,h:(height-top-bottom)*sy};
 return {id,sx,sy,reference:p,safe,visual:p.visualBottom===undefined?safe:{...safe,h:(p.visualBottom-top)*sy},guide:p.guideTop===undefined?null:{x:safe.x,y:p.guideTop*sy,w:safe.w,h:(p.guideBottom-p.guideTop)*sy},guideGap:(p.guideGap??0)*sy};
}
export function compactStarterTokens(){const p=spatialProfiles.profiles['compact-balanced-v1'],w=spatialProfiles.reference.width;return {...p.safe,visualBottom:p.visualBottom,centerX:(w+p.safe.left-p.safe.right)/2,guideCenterY:(p.guideTop+p.guideBottom)/2,guideWidth:w-p.safe.left-p.safe.right,guideGap:p.guideGap,guideTop:p.guideTop,guideBottom:p.guideBottom};}
