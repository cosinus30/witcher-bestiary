import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Quote from "../../components/CardDetail/Quote";
import { supabase } from "../../util/SupabaseClient";

interface IDetailPage {
  id: string;
  name: string;
  type: string;
  images: {
    url: string;
    alt: string;
  }[];
  weaknesses: string[];
  shortDescription: string;
  summary: string;
  bestiaryEntry: {
    entry: string;
    author: string;
  }[];
  combatTactics: string[];
}

const Home = (props: IDetailPage) => {
  const [selectedTab, setSelectedTab] = useState("bestiaryEntry");
  const { name, type, images, bestiaryEntry, combatTactics, shortDescription, summary, weaknesses } = props;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="block ml-2 text-7xl sm:text-8xl ">{name}</h1>
      <div className="grid grid-flow-col gap-2 sm:grid-rows-2">
        <div className="overflow-hidden row-span-2 w-full rounded-sm shadow-lg aspect-w-9 aspect-h-16">
          <Image src={images[0].url} alt={images[0].alt} layout="fill" objectFit="cover"></Image>
        </div>
        <div className="hidden overflow-hidden col-span-1 w-full rounded-sm shadow-lg aspect-w-4 aspect-h-3 sm:block">
          <Image src={images[1].url} alt={images[1].alt} layout="fill" objectFit="cover"></Image>
        </div>
        <div className="hidden overflow-hidden col-span-1 w-full rounded-sm shadow-lg aspect-w-4 aspect-h-3 sm:block">
          <Image src={images[2].url} alt={images[2].alt} layout="fill" objectFit="cover"></Image>
        </div>
      </div>
      <div className="grid gap-2 p-8 my-8 border border-secondary/75 divide-secondary/75 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
        <div className="flex flex-col justify-center mr-16 space-y-4">
          <div className="flex justify-between items-center sm:grid sm:grid-cols-3">
            <p className="col-span-2 text-xl font-semibold ">Weaknesses</p>
            <div className="-ml-2">
              {weaknesses.map((weakness) => {
                return <Image key={weakness} src={`/${weakness}.svg`} alt={type} width={48} height={48}></Image>;
              })}
            </div>
          </div>
          <div className="flex justify-between items-center sm:grid sm:grid-cols-3">
            <p className="col-span-2 text-xl font-semibold">Class</p>
            <div className="flex items-center">
              <p>{type}</p>
              <span>
                <Image src={`/${type}.svg`} alt={type} width={32} height={32}></Image>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-4 space-y-4 font-lustria sm:pl-4">
          <p>{shortDescription}</p>
        </div>
      </div>
      <div className="flex justify-between items-center sm:mx-48">
        <button
          className={`p-4 hover:bg-secondary/75 rounded-sm border border-secondary hover:border-darky ${
            selectedTab === "bestiaryEntry" ? "bg-secondary/75" : ""
          }`}
          onClick={() => setSelectedTab("bestiaryEntry")}
        >
          Bestiary Entry
        </button>
        <span className="w-2 h-2 bg-secondary rounded-full"></span>
        <button
          className={`p-4 hover:bg-secondary/75 rounded-sm border border-secondary hover:border-darky ${
            selectedTab === "combatTactics" ? "bg-secondary/75" : ""
          }`}
          onClick={() => setSelectedTab("combatTactics")}
        >
          Combat Tactics
        </button>
      </div>
      <div className="flex flex-col justify-between my-12 mx-4 md:mx-12">
        {selectedTab === "bestiaryEntry" ? (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">Summary</h2>
              <p className="font-lustria text-base sm:text-lg">{summary}</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">Bestiary Entry</h2>
              {bestiaryEntry.map((entry, entryIdx) => {
                return <Quote key={entryIdx} author={entry.author} content={entry.entry} />;
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">Combat Tactics</h2>
              <ul className="space-y-2">
                {combatTactics.map((entry, entryIdx) => {
                  return (
                    <li className="font-lustria text-base sm:text-lg" key={entryIdx}>
                      {entry}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, error } = await supabase.from("creatures").select(`
    id,
    name
  `);
  if (error) {
    console.error(error);
  }
  if (data) {
    const paths = data.map((creature) => {
      return { params: { creatureName: creature.name } };
    });
    return { paths, fallback: false };
  }
  return { paths: [{ params: { creatureName: "" } }], fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentCreatureName = context.params?.creatureName;
  const { data, error } = await supabase
    .from("creatures")
    .select(
      `
        id,
        name,
        type,
        weaknesses,
        images->images,
        short_description,
        summary,
        bestiary_entry->bestiary_entry,
        combat_tactics->combat_tactics
      `
    )
    .eq("name", currentCreatureName)
    .single();

  return {
    props: {
      id: data?.id,
      name: data?.name,
      type: data?.type,
      weaknesses: data?.weaknesses.split(","),
      images: [...data?.images],
      shortDescription: data?.short_description,
      summary: data?.summary,
      bestiaryEntry: data?.bestiary_entry,
      combatTactics: data?.combat_tactics,
    },
  };
};