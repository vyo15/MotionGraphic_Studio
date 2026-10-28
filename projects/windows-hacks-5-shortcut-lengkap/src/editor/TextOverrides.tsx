import React,{createContext,useContext} from 'react';
const TextContext=createContext<Record<string,string>>({});
export const TextOverrides:React.FC<{copy:Record<string,string>;children:React.ReactNode}>=({copy,children})=><TextContext.Provider value={copy??{}}>{children}</TextContext.Provider>;
/** Empty string = use original text. Editable from Studio Props without changing source. */
export const useCopy=()=>{const copy=useContext(TextContext);return (key:string,original:string)=>copy[key]?.trim()?copy[key]:original;};
