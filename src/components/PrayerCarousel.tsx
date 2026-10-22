"use client";

import { useState } from "react";
import Link from "next/link";
import { CaretLeft, CaretRight, Quotes } from "@/components/icons";
import { arabic } from "@/lib/fonts";
import CopyButton from "./CopyButton";

type Props = {
  prayers: Prayer[];
};

const navButton =
  "grid h-9 w-9 place-items-center rounded-full border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-foreground disabled:pointer-events-none disabled:opacity-40";

const PrayerCarousel = ({ prayers }: Props) => {
  const [index, setIndex] = useState(0);
  if (prayers.length === 0) return null;
  const current = prayers[index];

  return (
    <figure className="relative isolate flex flex-col gap-6 overflow-hidden rounded-2xl border bg-card p-6 sm:p-8">
      <Quotes size={72} weight="fill" aria-hidden className="absolute -left-2 -top-3 -z-10 text-primary/[0.07]" />
      <blockquote
        key={index}
        lang="ar"
        dir="rtl"
        className={`${arabic.className} min-h-[4.5rem] text-right text-2xl leading-[2.1] animate-in fade-in duration-300 motion-reduce:animate-none`}
      >
        {current.prayer}
      </blockquote>
      <figcaption className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Previous prayer" className={navButton} disabled={index === 0} onClick={() => setIndex(index - 1)}>
            <CaretLeft size={16} weight="bold" />
          </button>
          <span className="min-w-[3rem] text-center text-xs font-medium tabular-nums text-muted-foreground" aria-live="polite">
            {index + 1} / {prayers.length}
          </span>
          <button
            type="button"
            aria-label="Next prayer"
            className={navButton}
            disabled={index === prayers.length - 1}
            onClick={() => setIndex(index + 1)}
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton text={current.prayer} />
          <Link href="/prayers" className="rounded-full px-3 py-1.5 text-xs font-semibold text-primary hover:underline">
            All prayers
          </Link>
        </div>
      </figcaption>
    </figure>
  );
};

export default PrayerCarousel;
