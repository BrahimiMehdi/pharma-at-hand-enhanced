"use client";
import { useMainContext } from "@/app/context/MainContext";
import { useState,useEffect } from "react";

type Props = {
  module: ModuleType;
  inputs: string[];
};

function TableRow({ module, inputs }: Props) {
  const [T1, setT1] = useState<string | undefined>();
  const [T2, setT2] = useState<string | undefined>();
  const [T3, setT3] = useState<string | undefined>();
  const [TP, setTP] = useState<string | undefined>();
  const [Moyenne, setMoyenne] = useState<string>();
  const [MoyenneCoeff, setMoyenneCoeff] = useState<string>();
  const {changeTableModules,tableModules} = useMainContext()
  const calculateMoyenne=()=>{
        const t1 = T1 ? +T1 : undefined;
        const t2 = T2 ? +T2 : undefined;;
        const t3 =T3 ? +T3 : undefined;;
        const tp = TP ? +TP : undefined;;
        if(t1 && t2 && !t3){
            if(tp && typeof tp ==="number"){
                const sum = ((t1+t2+tp)/3) 
                return sum
            }
            const sum = (((t1+t2)/2))
            
            return sum
        }
        else if(t1 && t2 && t3){
            if(tp && typeof tp ==="number"){
                const sum = ((((t1+t2+t3)/3) * 2) + tp)/3
                return sum
            }
            const sum = (((t1+t2+t3)/3))
            return sum
        }
         return 0
  }
  useEffect(() => {
    const sum = calculateMoyenne()
    setMoyenne(sum.toFixed(2))
    setMoyenneCoeff((sum*module.coeff).toFixed(2))
    if(sum>0) changeTableModules(module,sum,sum*module.coeff)
    else{
        changeTableModules(module,0,0)
    }
  }, [T1,T2,T3,TP])
 
  
  return (
    <div className="col-span-8 p-2  place-items-center grid-flow-col auto-cols-[8rem] grid">
      <div className="grid col-span-1 row-span-1 place-items-center text-center text-sm p-3">{module.name}</div>
      <div className="grid col-span-1 row-span-1 place-items-center text-center text-sm p-3">
        <input
          value={T1}
          onChange={(e) => setT1(e.target.value)}
          type="number"
          className="max-w-[4rem] outline outline-secondary rounded-md text-center w-full"
        />
      </div>
      <div className="grid col-span-1 row-span-1 place-items-center text-center text-sm p-3">
        <input
          value={T2}
          onChange={(e) => setT2(e.target.value)}
          type="number"
          className="max-w-[4rem] outline outline-secondary rounded-md text-center w-full"
        />
      </div>
      <div className="grid col-span-1 row-span-1 place-items-center text-center text-sm p-3">
        <input
          value={T3}
          onChange={(e) => setT3(e.target.value)}
          type="number"
          className="max-w-[4rem] outline outline-secondary rounded-md text-center w-full"
        />
      </div>
      <div className="grid col-span-1 row-span-1 place-items-center text-center text-sm p-3">
        {module.tp && (
          <input
            value={TP}
            onChange={(e) => setTP(e.target.value)}
            type="number"
            className="max-w-[4rem] outline outline-secondary rounded-md text-center w-full"
          />
        )}
      </div>
      <div className="grid col-span-1 row-span-1 place-items-center text-center text-sm p-3">{module.coeff}</div>
      <div className="grid col-span-1 row-span-1 place-items-center text-center text-sm p-3">{Moyenne}</div>
      <div className="grid col-span-1 row-span-1 place-items-center text-center text-sm p-3">{MoyenneCoeff}</div>

    </div>
  );
}

export default TableRow;
