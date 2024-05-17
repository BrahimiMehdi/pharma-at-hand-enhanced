"use client"
import { useMainContext } from "@/app/context/MainContext"
type Props = {
    totalCoeff:number;
}

function Moyenne({totalCoeff}: Props) {
    const {tableModules} = useMainContext()
    const moyenCoeff = tableModules.map((item)=>item.moycoeff)
    const totalMoyenneCoeff = moyenCoeff.reduce((a,b)=>a+b,0) || 0
    const final = (totalMoyenneCoeff/totalCoeff).toFixed(4)
  return (
    <div className="flex flex-col gap-y-8">
     <h2 className="text-2xl font-bold">Votre Moyenne : <span>{final}</span></h2>
        
    </div>
  )
}

export default Moyenne