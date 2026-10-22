import Link from "next/link";
import { ArrowCircleRight, GraduationCap } from "@/components/icons";

type Props = {
    year:YearType
};

function DrivesCard({year}: Props) {
  return (
    <Link
      href={`/years/${year.slug}`}
      className="border shadow-sm hover:border-primary  transition-all duration-300 ease-in-out hover:-translate-y-2 rounded-lg p-8  pb-10 flex flex-col gap-y-1"
    >
      <div className="w-full flex items-center justify-between">
        <GraduationCap weight="duotone" className="w-12 mr-1 h-12" />
        <ArrowCircleRight weight="duotone" className="w-6 mr-1 h-6" />
      </div>
      <h2 className="font-bold mt-2 text-xl">{year.title}</h2>
    </Link>
  );
}

export default DrivesCard;
