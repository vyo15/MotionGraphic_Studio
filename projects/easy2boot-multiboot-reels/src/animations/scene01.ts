/** Kinetic compositions from the approved S01 animation, driven only by Remotion frame. */
export const animateScene01=(root:Element,frame:number):void=>{
 const g=(id:string):SVGElement=>root.querySelector<SVGElement>(`#${id}`)!;
 const clip=(v:number,a=0,b=1)=>Math.max(a,Math.min(b,v));
 const smooth=(x:number)=>{x=clip(x);return x*x*(3-2*x)};
 const z=(t:number,a:number,b:number)=>smooth((t-a)/(b-a));
 const show=(t:number,a:number,b:number,c:number,d:number)=>z(t,a,b)*(1-z(t,c,d));
 function opacity(id:string,v:number){g(id).setAttribute('opacity',clip(v).toFixed(4));}
 function motion(id:string,x=0,y=0,s=1,r=0,cx=540,cy=960){g(id).setAttribute('transform',`translate(${x.toFixed(3)} ${y.toFixed(3)}) translate(${cx} ${cy}) rotate(${r.toFixed(3)}) scale(${s.toFixed(4)}) translate(${-cx} ${-cy})`);}

 const t=frame/30;
 opacity('micro',z(t,.05,.38));opacity('footer',z(t,.12,.55));g('timebar').setAttribute('width',String(900*clip(t/12)));
 // A 0-3.03. Intro composition with laptop + ISO floating into shot
 const A=show(t,.10,.37,2.85,3.22);opacity('A',A);
 motion('aheadline',0,44*(1-z(t,.10,.55)),1+.045*(1-z(t,.1,.55)));
 motion('adev',0,105*(1-z(t,.34,1.04)),.91+.09*z(t,.34,1.04));
 motion('afile',250*(1-z(t,1.20,1.83)),-54*(1-z(t,1.2,1.83)),.75+.25*z(t,1.2,1.83),8*(1-z(t,1.2,1.83)));
 // whole shot gently tracks target 2.05 - 2.8 seconds, then matches with card on B
 motion('A',-36*z(t,2.05,2.90)-290*z(t,2.86,3.24),-25*z(t,2.05,2.90),1+.035*z(t,2.05,2.90)-.10*z(t,2.86,3.24));
 // B 2.86-5.79. USB enters aggressively from right; comparison wakes up at 4.2
 const B=show(t,2.86,3.16,5.65,6.04);opacity('B',B);
 motion('bheadline',0,36*(1-z(t,2.88,3.27)));
 motion('bneeded',-140*(1-z(t,3.18,3.66)),8*(1-z(t,3.18,3.66)),.82+.18*z(t,3.18,3.66));
 motion('bflash',410*(1-z(t,3.38,4.13)),14*(1-z(t,3.38,4.13)),.85+.15*z(t,3.38,4.13),-5*(1-z(t,3.38,4.13)));
 opacity('bwrong',z(t,4.26,4.43));motion('bwrong',0,0,.5+.5*z(t,4.26,4.53));
 opacity('bsub',z(t,4.55,4.89));
 const bshake= (t>=4.48&&t<=4.94)?Math.sin((t-4.48)*58)*(1-z(t,4.48,4.94))*8:0;
 motion('B',260*(1-z(t,2.85,3.16))+bshake-290*z(t,5.66,6.07),-10*z(t,5.0,5.58),1+.035*z(t,5.00,5.58)-.07*z(t,5.66,6.07));
 // C 5.72-8.90. panel folds in, cursor comes from field to action
 const C=show(t,5.72,6.04,8.70,9.13);opacity('C',C);motion('C',255*(1-z(t,5.72,6.05))-330*z(t,8.77,9.17),0,1+.09*z(t,8.77,9.17));
 motion('cheadline',0,35*(1-z(t,5.75,6.2)));
 motion('cpanel',45*(1-z(t,5.73,6.14)),95*(1-z(t,5.73,6.14)),.87+.13*z(t,5.73,6.14));
 const ca=z(t,6.62,7.35),cb=z(t,7.46,8.08);
 motion('ccursor',740-235*ca-7*cb,1091+140*cb);
 opacity('ccursor',show(t,6.55,6.78,8.33,8.69));
 opacity('cclick',show(t,8.03,8.11,8.27,8.53));motion('cclick',0,0,.43+.8*z(t,8.02,8.31),0,600,1260);
 g('startbtn').setAttribute('fill',(t>=8.06&&t<=8.23)?'#bd6a4c':'#DF805F');
 // D 8.75-12. Initial punch focus on progress, wait then linger
 const D=z(t,8.76,9.14);opacity('D',D);motion('D',250*(1-z(t,8.76,9.16)),0,.96+.04*z(t,8.76,9.16));
 motion('dheadline',0,40*(1-z(t,8.80,9.23)));
 motion('dpanel',0,96*(1-z(t,8.74,9.16)),.87+.13*z(t,8.74,9.16));
 const p=Math.round(61*z(t,9.18,11.1));g('dpct').textContent=p+'%';g('dbar').setAttribute('width',String(731*p/100));
 opacity('dstop',z(t,11.02,11.38));motion('dstop',0,18*(1-z(t,11.02,11.4)),.94+.06*z(t,11.02,11.4));

};
