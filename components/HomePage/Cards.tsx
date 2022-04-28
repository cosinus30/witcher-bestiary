import Card, { CardProps } from "./Card";
import { motion, AnimatePresence } from "framer-motion";
export interface CardsProps {
  cards: CardProps[];
}

const Cards = ({ cards }: CardsProps) => {
  return (
    <motion.div
      layout
      className="grid grid-cols-2 mx-auto space-y-8 space-x-6 max-w-5xl sm:grid-cols-3 md:grid-cols-5"
    >
      <AnimatePresence>
        {cards.map((card) => {
          return <Card key={card.id} {...card} />;
        })}
      </AnimatePresence>
    </motion.div>
  );
};

export default Cards;
