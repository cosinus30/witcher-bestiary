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

const cardDetil: IDetailPage = {
  id: "1",
  name: "Bear",
  type: "beasts",
  weaknesses: ["yrden", "quen"],
  images: [
    {
      url: "https://static.wikia.nocookie.net/witcher/images/0/07/Tw3_journal_bear.png/revision/latest?cb=20160304204324",
      alt: "A bear",
    },
    {
      url: "https://static.wikia.nocookie.net/witcher/images/4/47/Bear_in_TWAG.png/revision/latest/scale-to-width-down/266?cb=20160304210447",
      alt: "A bear",
    },
    {
      url: "https://static.wikia.nocookie.net/witcher/images/1/14/Gwent_cardart_neutral_unrelenting_she_bear.png/revision/latest/scale-to-width-down/992?cb=20190717215255",
      alt: "A bear",
    },
  ],
  shortDescription:
    "Bears can cross the path of Geralt of Rivia in The Witcher 3: Wild Hunt as well as in The Witcher Adventure Game and are one of the animals that are natural inhabitants of the world, meaning they didn't come with the First Conjunction.",
  summary:
    "Bears are generally found far from human habitation, either in the high mountains or in the deep woods. Opposite of dogs and wolves, bears are solitary creatures, which is probably for the best considering how strong a killing machine they are. It is simple enough a thing to avoid fighting a bear, but that is not always the case. A bear may be clumsy but they run at high speeds despite their bulky sizes, so running away may not always be an option, especially if you have already angered the bear.",
  bestiaryEntry: [
    {
      author: "Geralt of Rivia",
      entry:
        "Know that ditty about the bear \"climbing the mountain, to see what he could see?\" Biggest load of rubbish I've ever heard. When a bear climbs a mountain, it's not to see. It's to hunt. To kill.",
    },
    {
      author: "Unknown",
      entry:
        "Bears are omnivores – meaning men find a place in their diet beside berries, roots and salmon. When they snack on humans, they most frequently partake of the meat of travelers unwittingly trespassing on their territory, or else that of hunters for whom besting such a creature is a lifelong ambition.",
    },
    {
      author: "Unknown",
      entry:
        "There are several subspecies of bears – black bears, polar bears and cave bears – which differ from one another in coloring as well as in size and strength. All share one trait in common, however: a near-unmatched ability to kill.",
    },
  ],
  combatTactics: [
    "Any bear (though even more so a Berserker), will prove to be an admirable foe, they possess great vitality, amazing strength and are quick to anger if you find yourself within their territory. It is best to avoid a head on attack with a bear, try and dodge the swipes of their claws and cut at their flanks.",
    "The signs Igni and Yrden are not necessarily weaknesses, however they do have their uses when going up against a bear. Igni can be used to light the bear on fire, which will temporarily stun it and allow you to move in for flanking strikes. Yrden can be used to slow the bear down just enough to make it easier on you to evade their paws.",
    "Axii is a perfect choice against a bear since bears are almost always found alone. One cast and it's stunned, letting you get in a couple of good hits before it counterattacks (usually 3 Fast attacks) and then you can dodge backwards out of range. Then wait until your stamina recharges and repeat until dead.",
    "While fighting a bear, if it stands up on its hind legs, it is about to smash to the ground with its fore-paws. When doing this they can come down with such force, that even a veteran Witcher can be knocked to their backside.",
    "Ultimately bears are very territorial, just stepping inside their domain can and will incite aggression, but if you spot the bear early enough it can be fairly easy to avoid a fight.'",
  ],
};
