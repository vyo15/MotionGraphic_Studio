/** Gerakan Scene06 deterministik berdasarkan frame. */
export const animateScene06=(root:HTMLDivElement,frame:number):void=>{
 const el=(id:string): SVGElement|null=>root.querySelector<SVGElement>(`#${id}`);
 const clamp=(x:number,a=0,b=1):number=>Math.max(a,Math.min(b,x));
 const ease=(x:number):number=>{x=clamp(x);return x*x*(3-2*x)};
 const s=(t:number,a:number,b:number):number=>ease((t-a)/(b-a));
 const show=(t:number,a:number,b:number,c:number,d:number):number=>s(t,a,b)*(1-s(t,c,d));
 const opacity=(id:string,v:number):void=>{el(id)?.setAttribute('opacity',clamp(v).toFixed(4))};
 const tf=(id:string,x=0,y=0,scale=1,rotation=0,cx=540,cy=1040):void=>{el(id)?.setAttribute('transform',`translate(${x.toFixed(2)} ${y.toFixed(2)}) translate(${cx} ${cy}) rotate(${rotation.toFixed(1)}) scale(${scale.toFixed(3)}) translate(${-cx} ${-cy})`)};
const t=frame/30;el('timebar')?.setAttribute('width',String(904*clamp(t/13)));opacity('chrome',1-s(t,10.45,11.15));
// last scene's Windows Setup is pulled away before the question appears
opacity('carry',1-s(t,.18,.83));tf('carry',-175*s(t,.12,.83),-72*s(t,.12,.83),1-.18*s(t,.12,.83));
// The viewer can identify with making a single USB again, then see the alternative
opacity('problem',show(t,.56,1.00,4.70,5.15));tf('problem',160*(1-s(t,.60,1.10))-160*s(t,4.71,5.17),0,.97+.03*s(t,.60,1.12));tf('problemTitle',0,56*(1-s(t,.65,1.10)));
opacity('oldUsb',s(t,1.15,1.52));tf('oldUsb',0,70*(1-s(t,1.13,1.62)));
opacity('needCard',s(t,2.23,2.65));tf('needCard',0,82*(1-s(t,2.25,2.78)));
opacity('repeatPanel',s(t,3.10,3.54));el('repeatFill')?.setAttribute('width',String(585*s(t,3.45,4.70)*.71));
// Alternative becomes clear by visibly containing more installers, not just a title
opacity('multi',show(t,4.82,5.23,10.30,10.86));tf('multi',160*(1-s(t,4.82,5.26))-45*s(t,10.30,10.86),0,.965+.035*s(t,4.87,5.34));tf('multiTitle',0,57*(1-s(t,4.84,5.37)));
tf('multiUsb',0,120*(1-s(t,5.1,5.77)),.92+.08*s(t,5.10,5.77));
opacity('isoA',s(t,6.10,6.47));opacity('isoB',s(t,6.44,6.82));opacity('isoC',s(t,6.78,7.16));
tf('isoA',-130*(1-s(t,6.10,6.58)),90*(1-s(t,6.10,6.58)));tf('isoB',0,110*(1-s(t,6.44,6.91)));tf('isoC',130*(1-s(t,6.78,7.26)),90*(1-s(t,6.78,7.26)));
opacity('multiBar',s(t,7.34,7.70));
// One small reminder appears over the multiboot result: no third headline,
// no repeated option cards, and no extra scene change just to say "comment".
opacity('comment',show(t,8.12,8.55,10.26,10.77));
tf('comment',0,45*(1-s(t,8.12,8.62)),.975+.025*s(t,8.12,8.62));
// Cover is an actual final video frame, all other CTA content is gone
opacity('cover',s(t,10.53,11.20));tf('cover',0,70*(1-s(t,10.53,11.23)),.955+.045*s(t,10.53,11.23));tf('coverTitle',0,25*(1-s(t,10.60,11.30)));
opacity('coverIso',s(t,11.20,11.63));tf('coverIso',0,22*(1-s(t,11.20,11.65)));opacity('coverCaption',s(t,11.54,11.90));

};
