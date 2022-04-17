import Image from "next/image";
import React from "react";

export interface IFilter {
  label: string;
  value: string;
  icon: React.ReactNode;
  selected: boolean;
}
export type FilterContextType = {
  filters: IFilter[];
  updateFilters: (value: string) => void;
};

export const FilterContext = React.createContext<FilterContextType | null>(null);

interface FilterProviderProps {
  children: React.ReactNode;
}

const FilterProvider = ({ children }: FilterProviderProps) => {
  const [filters, setFilters] = React.useState<IFilter[]>([
    {
      label: "Aard",
      value: "aard",
      icon: <Image src="/aard.svg" alt="aard sign" width={32} height={32}></Image>,
      selected: true,
    },
    {
      label: "Igni",
      value: "igni",
      icon: <Image src="/igni.svg" alt="igni sign" width={32} height={32}></Image>,
      selected: true,
    },
    {
      label: "Yrden",
      value: "yrden",
      icon: <Image src="/yrden.svg" alt="yrden sign" width={32} height={32}></Image>,
      selected: true,
    },
    {
      label: "Axii",
      value: "axii",
      icon: <Image src="/axii.svg" alt="axii sign" width={32} height={32}></Image>,
      selected: true,
    },
    {
      label: "Quen",
      value: "quen",
      icon: <Image src="/quen.svg" alt="quen sign" width={32} height={32}></Image>,
      selected: true,
    },
  ]);

  const updateFilters = (value: string) => {
    filters.filter((filter: IFilter) => {
      if (filter.value === value) {
        filter.selected = !filter.selected;
        setFilters([...filters]);
      }
    });
  };
  return <FilterContext.Provider value={{ filters, updateFilters }}>{children}</FilterContext.Provider>;
};

export default FilterProvider;
