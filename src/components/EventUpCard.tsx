import React from "react";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import AuthorCard from "./Articles/AuthorCard";
type Props = {
  card: EventsType;
};

function EventUpCard({ card }: Props) {
  return (
    <a
      href={`${card.link}`}
      target="_blank"
      rel="noopener noreferrer"
      className="h-96 p-4 py-8  group w-full overflow-hidden   relative rounded-xl"
    >
      <div className="absolute  z-[2] inset-0 w-full h-full dark:bg-background bg-foreground transition-all duration-300 ease-in-out dark:opacity-50 dark:group-hover:opacity-40 group-hover:opacity-50 opacity-60"></div>
      <div className="absolute z-[1] inset-0 w-full h-full">
        <Image
          src={card.image.url}
          alt={card.title}
          width={card.image.width}
          height={card.image.height}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex relative justify-between z-[3] dark:text-foreground  text-background   flex-col h-full w-full">
        <div className="flex  flex-col gap-y-8">
          <h2 className="font-bold  relative  text-4xl ">
            {card.title}
          </h2>
          <p className="font-medium text-lg">{card.description}</p>
        </div>
        <div className="flex   relative flex-col   gap-y-6">
          <p className="font-bold    relative  flex gap-x-3">
            {" "}
            <span className="text-primary">
              {" "}
              <MapPin />{" "}
            </span>{" "}
            {card.location}
          </p>
          <p className="font-bold    relative  flex gap-x-3">
            {" "}
            <span className="text-primary">
              {" "}
              <Calendar />{" "}
            </span>{" "}
            {card.date}
          </p>
        </div>
        <div className="transition-all duration-300 ease-in-out group-hover:translate-y-0 translate-y-24">
          <AuthorCard bg author={card.author} />
        </div>
      </div>
    </a>
  );
}

export default EventUpCard;
