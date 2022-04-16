import Image from "next/image";
import Filter from "./Filter";
import Search from "./Search";
interface FilterProps {
  onFilterChange: (filter: string) => void;
  filters: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
}

const filters = [
  {
    label: "Aard",
    value: "aard",
    icon: <Image src="/aard.svg" alt="aard sign" width={32} height={32}></Image>,
    selected: false,
  },
  {
    label: "Igni",
    value: "igni",
    icon: <Image src="/igni.svg" alt="igni sign" width={32} height={32}></Image>,
    selected: false,
  },
  {
    label: "Yrden",
    value: "yrden",
    icon: <Image src="/yrden.svg" alt="yrden sign" width={32} height={32}></Image>,
    selected: false,
  },
  {
    label: "Axii",
    value: "axii",
    icon: <Image src="/axii.svg" alt="axii sign" width={32} height={32}></Image>,
    selected: false,
  },
  {
    label: "Quen",
    value: "quen",
    icon: <Image src="/quen.svg" alt="quen sign" width={32} height={32}></Image>,
    selected: true,
  },
];

const MainBar = () => {
  return (
    <div className="flex flex-col justify-center my-8 mx-auto border border-secondary/75 md:flex-row md:items-center md:justify-between md:max-w-5xl p-4">
      <Filter filters={filters} />
      <Search />
    </div>
  );
};

export default MainBar;
