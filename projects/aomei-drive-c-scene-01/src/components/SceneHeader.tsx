import React from 'react';
import {Interactive} from 'remotion';
export const SceneHeader:React.FC=()=> <div style={{position:'relative',display:'flex',alignItems:'center',height:34,gap:16}}>
  <Interactive.Div name="S01 — Garis aksen header" style={{width:36,height:5,borderRadius:3,background:'#DF805F',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
  <Interactive.Div name="S01 — Label WINDOWS / STORAGE" style={{fontFamily:'Inter, Segoe UI, Arial, sans-serif',fontSize:17,letterSpacing:'.4px',fontWeight:500,color:'#8B9192',whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>WINDOWS / STORAGE</Interactive.Div>
</div>;
