"use client";

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

const MainContext = createContext({});
type props = {
  children: React.ReactNode;
};
type returnProps = {
    tableModules:MoyenState[],
    changeTableModules:(module:ModuleType,moyenne:number,moycoeff:number)=>void
}
export const MainContextProvider = ({ children }: props) => {
  const [tableModules, setTableModules] = useState<MoyenState[]>([]);
  const changeTableModules = (module:ModuleType,moyenne:number,moycoeff:number)=>{
    const index = tableModules?.findIndex((item)=>item.module.name===module.name)
    if(moyenne && moycoeff > 0){
        if(index!==-1){
            const tempArray = [...tableModules]
            let tempElement = tempArray[index]
            tempElement.moyenne = moyenne
            tempElement.moycoeff = moycoeff
            setTableModules([...tempArray])
        }
        else{
            setTableModules((prev)=> [...prev,{module:module,moyenne:moyenne,moycoeff:moycoeff}])
        }
    }
    else{
        if(index!==-1){
            const tempArray = [...tableModules]
            let tempElement = tempArray[index]
            tempElement.moyenne = 0
            tempElement.moycoeff = 0
            setTableModules([...tempArray])
        }
    }
  }
  const ctxValue:returnProps = {
    tableModules,
    changeTableModules,
  };
  return <MainContext.Provider value={ctxValue}>{children}</MainContext.Provider>;
};

export const useMainContext = () => useContext(MainContext) as returnProps;
