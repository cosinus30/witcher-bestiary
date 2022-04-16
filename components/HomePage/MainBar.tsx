import Image from "next/image";
import Filter from "./Filter";
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
    <div className="mx-auto my-8 border border-secondary border-opacity-75 md:max-w-5xl">
      <Filter filters={filters} />
    </div>
  );
};

export default MainBar;
