import React,{createContext,useContext} from 'react';
import {COPY_LABELS} from './EditorNames';
const TextContext=createContext<{copy:Record<string,string>;scope:string}>({copy:{},scope:''});
export const TextOverrides:React.FC<{copy:Record<string,string>;scope:string;children:React.ReactNode}>=({copy,scope,children})=><TextContext.Provider value={{copy:copy??{},scope}}>{children}</TextContext.Provider>;
/** Props names are Indonesian; rendering keys remain predictable and backward-compatible. */
export const useCopy=()=>{const {copy,scope}=useContext(TextContext);return (key:string,original:string)=>{
 const names=COPY_LABELS[scope as keyof typeof COPY_LABELS] as Record<string,string>|undefined;
 const value=copy[names?.[key]??key]??copy[key];
 return typeof value==='string' && value.trim() ? value : original;
};};
