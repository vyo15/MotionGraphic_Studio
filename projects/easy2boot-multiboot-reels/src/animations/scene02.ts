/** VO aligned scene 02 motion. ISO file movement proves the solution. */
export const animateScene02=(root:Element,frame:number):void=>{
 const el=(id:string):SVGElement=>root.querySelector<SVGElement>(`#${id}`)!;
 const clamp=(x:number,a=0,b=1)=>Math.max(a,Math.min(b,x));
 const smooth=(x:number)=>{x=clamp(x);return x*x*(3-2*x)};
 const z=(t:number,a:number,b:number)=>smooth((t-a)/(b-a));
 const show=(t:number,a:number,b:number,c:number,d:number)=>z(t,a,b)*(1-z(t,c,d));
 const setOpacity=(id:string,a:number)=>el(id).setAttribute('opacity',String(clamp(a)));
 const setMove=(id:string,x=0,y=0,s=1,rot=0,pX=540,pY=1010)=>el(id).setAttribute('transform',`translate(${x.toFixed(2)} ${y.toFixed(2)}) translate(${pX} ${pY}) rotate(${rot.toFixed(2)}) scale(${s.toFixed(3)}) translate(${-pX} ${-pY})`);
const t=frame/30;
 el('timebar').setAttribute('width',String(900*clamp(t/11)));
 // Show inherited progress, reject need to repeat. Start exactly like previous scene D
 const a=show(t,0,.02,2.40,2.84);setOpacity('A',a);
 setMove('ahead',0,-36*z(t,.45,.80),1-.12*z(t,.45,.9));setOpacity('ahead',1-z(t,.47,.85));
 setMove('progress',-250*z(t,2.18,2.65),-30*z(t,2.18,2.65),1-.12*z(t,2.18,2.65));
 setOpacity('stopRing',show(t,.60,.77,1.06,1.25));setMove('stopRing',0,0,.73+.27*z(t,.57,.81));
 setOpacity('noRedo',show(t,.86,1.10,2.38,2.71));setMove('noRedo',0,56*(1-z(t,.86,1.23)),.93+.07*z(t,.86,1.23));
 // Solution: wordmark enters and USB flies smoothly from edge
 const b=show(t,2.50,2.84,5.20,5.72);setOpacity('B',b);setMove('B',160*(1-z(t,2.50,2.87))-145*z(t,5.20,5.66),-15*z(t,5.2,5.66),.96+.04*z(t,2.5,2.92));
 setMove('btitle',0,43*(1-z(t,2.50,2.99)));setOpacity('bbadge',z(t,3.40,3.72));setMove('bbadge',0,25*(1-z(t,3.4,3.78)));
 setMove('busb',500*(1-z(t,3.03,3.92)),60*(1-z(t,3.03,3.92)),.76+.24*z(t,3.03,3.94));
 setOpacity('bside',z(t,4.16,4.52));setMove('bside',0,33*(1-z(t,4.15,4.57)));
 // One USB, copies as sequential file-to-USB movements
 const c=show(t,5.37,5.69,8.25,8.72);setOpacity('C',c);setMove('C',260*(1-z(t,5.37,5.74))-200*z(t,8.25,8.72),0,1+.06*z(t,8.25,8.72));
 setMove('ctitle',0,45*(1-z(t,5.4,5.84)));
 setMove('cusb',0,60*(1-z(t,5.42,5.87)),.86+.14*z(t,5.42,5.94));
 const data:[string,number,number,number,number][]=[['isoWin10',5.62,6.23,40,735],['isoWin11',6.41,7.03,602,775],['isoLinux',7.18,7.77,90,795]];
 for(const [id,start,end,x,y] of data){
   const enter=z(t,start,start+.24), fly=z(t,start+.34,end);
   // Each label starts in foreground then gets absorbed into the USB
   setOpacity(id,show(t,start,start+.2,end-.18,end+.05));
   const tx=x + (475-x)*fly;
   const ty=y + (1065-y)*fly - 35*Math.sin(fly*Math.PI);
   setMove(id,tx,ty,(.83+.17*enter)*(1-.73*fly), 0,0,0);
 }
 const n=t>=7.77?3:t>=7.03?2:t>=6.23?1:0;
 el('pcount').textContent=n+' ISO tersimpan';
 setOpacity('pcounter',show(t,6.12,6.39,8.24,8.59));setMove('pcounter',0,26*(1-z(t,6.12,6.43)));
 [1,2,3].forEach(i=>el('led'+i).setAttribute('fill',n>=i?'#31A878':'#657076'));
 // Final state list, readable hold
 const d=z(t,8.42,8.83);setOpacity('D',d);setMove('D',220*(1-d),30*(1-d),.95+.05*d);
 setMove('dtitle',0,41*(1-z(t,8.43,8.96)));setMove('dpanel',0,85*(1-z(t,8.40,8.98)),.89+.11*z(t,8.40,8.98));
 ['row1','row2','row3'].forEach((id,i)=>{const st=8.98+i*.32;setOpacity(id,z(t,st,st+.22));setMove(id,0,25*(1-z(t,st,st+.25)));});
 setOpacity('dtag',z(t,10.0,10.3));setMove('dtag',0,27*(1-z(t,10.0,10.34)),.94+.06*z(t,10,10.38));

};
