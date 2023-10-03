import React from "react";
import Image from "next/image";
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
      <div className="grid gap-8 [grid-template-columns:_repeat(_auto-fill,_minmax(24rem,_1fr));]"></div>
    </section>
  );
}

export default ModuleSection;
