"use client"
import { ArrowRightCircle, FolderOpen } from "lucide-react";
import { useLayoutEffect,useRef } from "react";
import {gsap,Power3} from "gsap";
import { Button } from "./ui/button";
import { useState } from "react";
type Props = {
  drives: DriveType[];
  deps:DepartmentType[]
};

function DrivesSection({ drives,deps }: Props) {
    const [selected,setSelected ] = useState("fac-alger")
  return (
    <div className="flex overflow-x-hidden w-full flex-col gap-y-8">
      <h1 className="text-2xl font-bold">Drives</h1>
  
  <div className="h-20 w-full max-w-fit overflow-y-hidden overflow-x-auto flex items-center gap-x-8 rounded-md   ">
    {deps.map((dep)=>(
           <Button onClick={()=>setSelected(dep.slug)} variant={dep.slug === selected ? "secondary" :"ghost"}  key={dep.slug} value={dep.slug}>{dep.name}</Button>
    ))}
  </div>

      {deps.map((dep,index)=>(
       dep.slug===selected && <FilteredSection selected={selected} key={index} dep={dep} drives={drives} />
      ))}

    </div>
  );
}
const FilteredSection =({dep,selected,drives}:{selected:string,dep:DepartmentType,drives:DriveType[]})=>{
  const sectionRef = useRef<HTMLDivElement>(null)  
  const DepDrives = dep.slug ? drives.filter((drive)=>drive?.departement?.slug=== dep.slug) : drives.filter((drive)=>drive?.departement?.slug==="fac-alger")
  useLayoutEffect(() => {
    const ctx = gsap.context(()=>{
      gsap.from(sectionRef.current,{opacity:0,y:10,duration:0.6,ease:Power3.easeInOut})
    })
  
    return () => {
      ctx.revert()
    };
  }, [])
return(
    <div ref={sectionRef} className="grid w-full my-8 h-full  gap-8 [grid-template-columns:_repeat(_auto-fill,_minmax(16rem,_1fr));]">
    {DepDrives.length!==0 ? DepDrives?.map((drive, index) => (
      <a
        href={drive.link}
        target="_blank"
        rel="noopener noreferrer"
        key={index}
        className={`${
          drive.isMain ? "bg-primary text-white" : "bg-transparent"
        }  border shadow-sm hover:border-primary  transition-all duration-300 ease-in-out hover:-translate-y-2 rounded-lg p-8  pb-10 flex flex-col gap-y-1`}
      >
        <div className="w-full flex justify-between items-center">
          <FolderOpen strokeWidth={1.2} className="w-12 mr-1 h-12" />
          <ArrowRightCircle strokeWidth={1.2} className="w-6 mr-1 h-6" />
        </div>
        <h2 className="font-bold mt-2 text-xl">{drive.name}</h2>
      </a>
    )): <p className="text-lg ml-4 text-muted-foreground">
    No Drives found
    </p>}
  </div>
)
}
export default DrivesSection;
