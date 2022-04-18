import type { GetStaticProps, NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { CardProps } from "../components/HomePage/Card";
import Cards from "../components/HomePage/Cards";
import Header from "../components/HomePage/Header";
import MainBar from "../components/HomePage/MainBar";
import { DropdownContext, DropdownContextType } from "../context/DropdownProvider";
import { FilterContext, FilterContextType } from "../context/FilterProvider";
import { supabase } from "../util/SupabaseClient";

interface IHome {
  initialCreatures: CardProps[];
}

const Home = ({ initialCreatures }: IHome) => {
  const [creatures, setCreatures] = useState<CardProps[]>(initialCreatures);
  const { selectedDropdownItem } = useContext(DropdownContext) as DropdownContextType;
  const { filters } = useContext(FilterContext) as FilterContextType;

  useEffect(() => {
    const activeSigns = filters.filter((sign) => sign.selected);
    const type = selectedDropdownItem.value;

    console.log(type);

    const filteredCreatures = initialCreatures.filter((creature) => {
      let signsMatch = false;
      let typeMatch = false;
      activeSigns.forEach((sign) => {
        if (creature.weaknesses.includes(sign.value)) {
          signsMatch = true;
        }
      });
      if (type === "all") {
        typeMatch = true;
      } else if (creature.type === type) {
        typeMatch = true;
      }
      return typeMatch && signsMatch;
    });

    setCreatures(filteredCreatures);
  }, [selectedDropdownItem, filters]);

  return (
    <div>
      <Header />
      <MainBar />
      <Cards cards={creatures} />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const { data, error } = await supabase.from("creatures").select(`
    id,
    name,
    type,
    weaknesses,
    images->images
  `);
  if(error){
    console.error(error);
  }

  return {
    props: {
      initialCreatures: data?.map((creature) => {
        return {
          id: creature.id,
          name: creature.name,
          type: creature.type,
          weaknesses: creature.weaknesses,
          image: creature.images[0],
        };
      }),
    },
  };
};

const cards: CardProps[] = [
  {
    id: "1",
    name: "Bear",
    type: "beasts",
    weaknesses: ["yrden", "quen"],
    image: {
      url: "https://static.wikia.nocookie.net/witcher/images/0/07/Tw3_journal_bear.png/revision/latest?cb=20160304204324",
      alt: "A bear",
    },
  },
  {
    id: "2",
    name: "Dog",
    type: "beasts",
    weaknesses: ["yrden", "axii"],
    image: {
      url: "https://static.wikia.nocookie.net/witcher/images/e/e4/Tw3_journal_dog.png/revision/latest/scale-to-width-down/350?cb=20160304193515",
      alt: "A bear",
    },
  },
  {
    id: "3",
    name: "Wolf",
    type: "beasts",
    weaknesses: ["yrden", "igni"],
    image: {
      url: "https://static.wikia.nocookie.net/witcher/images/6/62/Tw3_journal_wolf.png/revision/latest?cb=20160409074701",
      alt: "A bear",
    },
  },
  {
    id: "4",
    name: "Warg",
    type: "beasts",
    weaknesses: ["yrden", "quen"],
    image: {
      url: "https://static.wikia.nocookie.net/witcher/images/8/85/Tw3_Warg.png/revision/latest/scale-to-width-down/280?cb=20160516164703",
      alt: "A bear",
    },
  },
  {
    id: "5",
    name: "Werebear",
    type: "cursed_ones",
    weaknesses: ["yrden", "aard"],
    image: {
      url: "https://static.wikia.nocookie.net/witcher/images/4/48/Tw3_journal_berserker.png/revision/latest/scale-to-width-down/350?cb=20160408152240",
      alt: "A bear",
    },
  },
  {
    id: "6",
    name: "Lubberkin",
    type: "cursed_ones",
    weaknesses: ["yrden", "igni"],
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
