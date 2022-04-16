import type { NextPage } from "next";
import { CardProps } from "../components/HomePage/Card";
import Cards from "../components/HomePage/Cards";
import Header from "../components/HomePage/Header";
import MainBar from "../components/HomePage/MainBar";
import Navbar from "../components/Navigation/Navbar";

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <MainBar />
      <Cards cards={cards} />
    </div>
  );
};

export default Home;

const cards: CardProps[] = [
  {
    id: "1",
    name: "Bear",
    type: "Beast",
    weaknesses: ["Fire", "Lightning"],
    image: {
      url: "https://static.wikia.nocookie.net/witcher/images/0/07/Tw3_journal_bear.png/revision/latest?cb=20160304204324",
      alt: "A bear",
    },
  },
  {
    id: "2",
    name: "Dog",
    type: "Beast",
    weaknesses: ["Fire", "Lightning"],
    image: {
      url: "https://static.wikia.nocookie.net/witcher/images/e/e4/Tw3_journal_dog.png/revision/latest/scale-to-width-down/350?cb=20160304193515",
      alt: "A bear",
    },
  },
  {
    id: "3",
    name: "Wolf",
    type: "Beast",
    weaknesses: ["Fire", "Lightning"],
    image: {
      url: "https://static.wikia.nocookie.net/witcher/images/6/62/Tw3_journal_wolf.png/revision/latest?cb=20160409074701",
      alt: "A bear",
    },
  },
  {
    id: "4",
    name: "Warg",
    type: "Beast",
    weaknesses: ["Fire", "Lightning"],
    image: {
      url: "https://static.wikia.nocookie.net/witcher/images/8/85/Tw3_Warg.png/revision/latest/scale-to-width-down/280?cb=20160516164703",
      alt: "A bear",
    },
  },
  {
    id: "5",
    name: "Werebear",
    type: "Cursed One",
    weaknesses: ["Fire", "Lightning"],
    image: {
      url: "https://static.wikia.nocookie.net/witcher/images/4/48/Tw3_journal_berserker.png/revision/latest/scale-to-width-down/350?cb=20160408152240",
      alt: "A bear",
    },
  },
  {
    id: "6",
    name: "Lubberkin",
    type: "Cursed One",
    weaknesses: ["Fire", "Lightning"],
    image: {
      url: "https://static.wikia.nocookie.net/witcher/images/d/d5/Lubberkin.png/revision/latest/scale-to-width-down/350?cb=20151026232902",
      alt: "A bear",
    },
  },
];

// {
//   image: {
//     url: string;
//     alt: string;
//   },
//   name: string;
//   type: string;
//   weaknesses: string[];
//   id: string;
// }
