"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
type Props = {
  prayers: Prayer[];
};

const PrayerCarousel = ({ prayers }: Props) => {
  const [index, setIndex] = useState(0);
  const currentPrayer = prayers[index];
  const handleClick = (action: "reduce" | "add") => {
    switch (action) {
      case "reduce":
        if (index !== 0) setIndex((prev) => prev - 1);
        break;
      case "add":
        if (index !== prayers.length - 1) setIndex((prev) => prev + 1);

        break;
      default:
        break;
    }
  };
  return (
    <div className="flex sm:h-auto h-64 sm:flex-row flex-col items-center justify-between gap-y-4 gap-x-4">
      <div className="w-7 h-7 sm:block hidden aspect-square  mt-6 lg:mb-6  mb-6">
        {index !== 0 && (
          <Button aria-label="prayer-back" size={"icon"} variant={"secondary"} onClick={() => handleClick("reduce")}>
            <ArrowLeft strokeWidth={1.2} size={"28px"} />
          </Button>
        )}
      </div>
      <p lang="ar" className="rounded-md text-right  outline outline-primary/40 p-6">
        {currentPrayer.prayer}
      </p>
      <div className="w-7 h-7 sm:block hidden aspect-square  mt-6 lg:mb-6  mb-6">
        {index !== prayers.length - 1 && (
          <Button aria-label="prayer-back" size={"icon"} variant={"secondary"} onClick={() => handleClick("add")}>
            <ArrowRight strokeWidth={1.2} size={"28px"} />
          </Button>
        )}
      </div>
      <div className="flex sm:hidden w-full items-center justify-between">
      <div className="w-7 h-7  aspect-square  mt-6 lg:mb-6  mb-6">
        {index !== 0 && (
          <Button aria-label="prayer-back" size={"icon"} variant={"secondary"} onClick={() => handleClick("reduce")}>
            <ArrowLeft strokeWidth={1.2} size={"28px"} />
          </Button>
        )}
      </div>
      <div className="w-7 h-7  aspect-square  mt-6 lg:mb-6  mb-6">
        {index !== prayers.length - 1 && (
          <Button aria-label="prayer-back" size={"icon"} variant={"secondary"} onClick={() => handleClick("add")}>
            <ArrowRight strokeWidth={1.2} size={"28px"} />
          </Button>
        )}
      </div>
      </div>
    </div>
  );
};

export default PrayerCarousel;
