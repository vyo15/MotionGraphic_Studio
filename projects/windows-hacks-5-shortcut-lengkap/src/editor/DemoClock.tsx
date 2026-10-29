import React,{createContext,useContext} from 'react';
import {useCurrentFrame} from 'remotion';
const DemoFrame=createContext<{sourceStart:number;frozen?:number}|null>(null);
/** Scene native animations sample their exact source frames, not stretched/warped. */
export const DemoClock:React.FC<{sourceStart:number;frozen?:number;children:React.ReactNode}>=({sourceStart,frozen,children})=><DemoFrame.Provider value={{sourceStart,frozen}}>{children}</DemoFrame.Provider>;
export const useDemoFrame=()=>{const frame=useCurrentFrame();const c=useContext(DemoFrame);return c?(c.frozen??c.sourceStart+frame):frame;};
