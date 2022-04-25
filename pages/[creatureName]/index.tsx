import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import ImageDeck from "../../components/CardDetail/ImageDeck";
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
      <Head>
        <title>{name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={shortDescription} />
      </Head>
      <h1 className="block ml-2 text-7xl sm:text-8xl ">{name}</h1>
      <ImageDeck images={images} />
      <div className="grid gap-2 items-center p-8 my-8 border border-secondary/75 divide-secondary/75 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
        <div className="flex flex-col justify-center mr-16 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold ">Weaknesses</p>
            <div>
              {weaknesses.length > 0 ? (
                weaknesses.map((weakness) => {
                  return <Image key={weakness} src={`/${weakness}.svg`} alt={type} width={48} height={48}></Image>;
                })
              ) : (
                <p className="text-center">Oops!</p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">Class</p>
            <div className="flex items-center space-x-1">
              <p className="whitespace-nowrap">{type.split("_").join(" ")}</p>
              <span className="">
                <Image src={`/${type}.svg`} alt={type} width={32} height={32}></Image>
              </span>
            </div>
          </div>
        </div>
        <div className="pt-4 space-y-4 font-lustria sm:pt-0 sm:pl-4">
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
                {combatTactics.length > 0 ? (
                  combatTactics.map((entry, entryIdx) => {
                    return (
                      <li className="font-lustria text-base sm:text-lg" key={entryIdx}>
                        {entry}
                      </li>
                    );
                  })
                ) : (
                  <li className="font-lustria text-base sm:text-lg">
                    We could not find any combat log regarding this creature fellow Witcher. You are on your own in this
                    one.
                  </li>
                )}
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
      weaknesses: data?.weaknesses ? data?.weaknesses.split(",") : [],
      images: [...data?.images],
      shortDescription: data?.short_description,
      summary: data?.summary,
      bestiaryEntry: data?.bestiary_entry,
      combatTactics: data?.combat_tactics,
    },
  };
};
