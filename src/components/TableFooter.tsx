"use client"
import { useMainContext } from "@/app/context/MainContext"
type Props = {}

function TableFooter({}: Props) {
    const {tableModules} = useMainContext()
    const totalMoyenneCoeff = tableModules.map((item)=>item.moycoeff).reduce((a,b)=>a+b,0).toFixed(2)
    const totalMoyenne = tableModules.map((item)=>item.moyenne).reduce((a,b)=>a+b,0).toFixed(2)
  return (
    <div className='col-span-8 p-2 bg-muted  place-items-center grid-flow-col auto-cols-[8rem] grid'>
        <div className="col-span-6"></div>
        <div className="grid col-span-1 border-x h-full row-span-1 place-items-center text-center text-sm p-3">{totalMoyenne}</div>
        <div className="grid col-span-1  border-x h-full row-span-1 place-items-center text-center text-sm p-3">{totalMoyenneCoeff}</div>
    </div>
  )
}

export default TableFooter