import EventUpCard from "./EventUpCard";
type Props = {
  cards: EventsType[];
  size: 3 | 2;
};

function CardsCarousel({ cards, size }: Props) {
  return (
    <div
      className={`
    w-full grid gap-8 
    ${
      size === 3
        ? "[grid-template-columns:_repeat(_auto-fill,_minmax(14rem,_1fr));]  sm:[grid-template-columns:_repeat(_auto-fill,_minmax(24rem,_1fr));]"
        : "[grid-template-columns:_repeat(_auto-fill,_minmax(14rem,_1fr));] sm:[grid-template-columns:_repeat(_auto-fill,_minmax(30rem,_1fr));]"
    }
    `}
    >
      {cards.map((card, index) => (
        <EventUpCard card={card} key={index} />
      ))}
    </div>
  );
}

export default CardsCarousel;
