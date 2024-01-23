import Link from "next/link";
import { ArrowRightCircle, GraduationCap } from "lucide-react";

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
        <GraduationCap strokeWidth={1.2} className="w-12 mr-1 h-12" />
        <ArrowRightCircle strokeWidth={1.2} className="w-6 mr-1 h-6" />
      </div>
      <h2 className="font-bold mt-2 text-xl">{year.title}</h2>
    </Link>
  );
}

export default DrivesCard;
