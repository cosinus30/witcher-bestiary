import Card, { CardProps } from "./Card";

export interface CardsProps {
  cards: CardProps[];
}

const Cards = ({ cards }: CardsProps) => {
  return (
    <div className="grid grid-cols-2 mx-auto space-y-8 space-x-6 max-w-5xl sm:grid-cols-3 md:grid-cols-5">
      {cards.map((card) => {
        return <Card key={card.id} {...card} />;
      })}
    </div>
  );
};

export default Cards;
