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
        if (creature.weaknesses?.includes(sign.value)) {
          signsMatch = true;
        }
      });
      if(!creature.weaknesses)
        signsMatch = true;
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