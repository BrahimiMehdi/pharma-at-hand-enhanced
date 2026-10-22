import { ArrowUpRight, CalendarBlank, MapPin } from "@/components/icons";
import AuthorCard from "./Articles/AuthorCard";
import { cn } from "@/lib/utils";

type Props = {
  card: EventsType;
  past?: boolean;
};

function EventUpCard({ card, past = false }: Props) {
  return (
    <a
      href={card.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {card.image?.url && (
          <img
            src={card.image.url}
            alt=""
            width={card.image.width}
            height={card.image.height}
            loading="lazy"
            className={cn(
              "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]",
              past && "grayscale-[40%]"
            )}
          />
        )}
        {card.date && (
          <span className="absolute left-3 top-3 flex max-w-[85%] items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
            <CalendarBlank size={14} weight="duotone" aria-hidden className="shrink-0 text-primary" />
            <span className="truncate">{card.date}</span>
          </span>
        )}
        {past && (
          <span className="absolute right-3 top-3 rounded-full bg-slate-900/70 px-2.5 py-1 text-[11px] font-semibold text-white">Past</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-bold leading-snug tracking-tight [text-wrap:balance]">{card.title}</h3>
        {card.description && <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{card.description}</p>}
        {card.location && (
          <p className="flex items-start gap-1.5 text-sm text-foreground/80">
            <MapPin size={16} weight="duotone" aria-hidden className="mt-0.5 shrink-0 text-primary" />
            <span>{card.location}</span>
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
          {card.author ? <AuthorCard author={card.author} size="sm" /> : <span />}
          <ArrowUpRight
            size={18}
            aria-hidden
            className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
          />
        </div>
      </div>
    </a>
  );
}

export default EventUpCard;
