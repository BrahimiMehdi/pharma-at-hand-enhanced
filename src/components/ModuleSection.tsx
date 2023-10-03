import React from "react";
import Image from "next/image";
import { Youtube } from "lucide-react";
type Props = {
  module: ModuleType;
};

function ModuleSection({ module }: Props) {
  return (
    <section className="flex w-full flex-col gap-y-8">
      <div className={` flex items-center gap-x-4`}>
        <div style={{ backgroundColor: module.color.hex }} className="rounded-md max-h-10 p-1  h-full aspect-square">
          <Image src={module.image.url} alt={module.name} width={module.image.width} height={module.image.height} />
        </div>
        <h2 className="font-bold  text-xl">{module.name}</h2>
      </div>

      <div className="grid gap-8 mt-12 [grid-template-columns:_repeat(_auto-fill,_minmax(24rem,_1fr));]">
        {module.video.map((video,index)=>(
            
     <a
     href={video.link} target="_blank" rel="noopener noreferrer"
     key={index}
     
     className={` border bgred shadow-sm hover:border-primary  transition-all duration-300 ease-in-out hover:-translate-y-2 rounded-lg p-4 flex items-center justify-between`}
   >
     <p className="font-bold mt-2 text-lg">{video.name}</p>
    <Youtube strokeWidth={1.2} size={"30px"} fill="rgb(239,68,68)" />
   </a>
        ))}
      </div>
    </section>
  );
}

export default ModuleSection;
