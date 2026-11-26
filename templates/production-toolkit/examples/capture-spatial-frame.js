/** Browser-console helper. No DOM mutation. Call captureSpatialFrame(compositionRoot, frame, 1080,1920) at a settled frame.
 * The root must be the actual unrotated composition container, including viewport and subtitle. */
function captureSpatialFrame(root,frame,width,height){
 if(!root?.getBoundingClientRect||!Number.isInteger(frame)||frame<0||!Number.isFinite(width)||!Number.isFinite(height)||width<=0||height<=0)throw Error('Invalid root/frame/dimensions');
 const base=root.getBoundingClientRect();if(base.width<=0||base.height<=0)throw Error('Composition root not visible');
 const sx=width/base.width,sy=height/base.height,rects=[],seen=new Set();
 for(const node of root.querySelectorAll('[data-qa-track]')){
  let visible=true;for(let x=node;x&&x!==root.parentElement;x=x.parentElement){const c=getComputedStyle(x);if(c.display==='none'||c.visibility==='hidden'||Number(c.opacity)===0){visible=false;break;}}
  if(!visible)continue;const id=node.getAttribute('data-qa-track'),r=node.getBoundingClientRect();
  if(r.width<=0||r.height<=0)continue;if(!id||seen.has(id))throw Error('Duplicate/invalid data-qa-track '+id);seen.add(id);
  rects.push({id,x:(r.left-base.left)*sx,y:(r.top-base.top)*sy,w:r.width*sx,h:r.height*sy});
 }
 return {frame,rects};
}
