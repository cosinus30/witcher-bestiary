import Image from "next/image";
import React from "react";

export interface IDropdown {
  label: string;
  value: string;
  icon?: React.ReactNode;
}
export type DropdownContextType = {
  dropdownItems: IDropdown[];
  selectedDropdownItem: IDropdown;
  updateSelected: (value: string) => void;
};

export const DropdownContext = React.createContext<DropdownContextType | null>(null);

interface DropdownProviderProps {
  children: React.ReactNode;
}

const DropdownProvider = ({ children }: DropdownProviderProps) => {
  const [dropdownItems, setDropdownItems] = React.useState<IDropdown[]>(initialDropdownState);
  const [selectedDropdownItem, setSelectedDropdownItem] = React.useState<IDropdown>(dropdownItems[0]);

  const updateSelected = (value: string) => {
    const selected = dropdownItems.find((item: IDropdown) => item.value === value) as IDropdown;
    setSelectedDropdownItem(selected);
  };
  return (
    <DropdownContext.Provider value={{ dropdownItems, selectedDropdownItem, updateSelected }}>
      {children}
    </DropdownContext.Provider>
  );
};

export default DropdownProvider;

export const initialDropdownState = [
  {
    label: "All Creatures",
    value: "all",
  },
  {
    label: "Beasts",
    value: "beasts",
    icon: <Image src="/beasts.svg" width={20} height={20} alt={"beasts"}></Image>,
  },
  {
    label: "Cursed Ones",
    value: "cursed_ones",
    icon: <Image src="/cursed_ones.svg" width={20} height={20} alt={"beasts"}></Image>,
  },
  {
    label: "Draconids",
    value: "draconids",
    icon: <Image src="/beasts.svg" width={20} height={20} alt={"beasts"}></Image>,
  },
  {
    label: "Elementa",
    value: "elementa",
    icon: <Image src="/beasts.svg" width={20} height={20} alt={"beasts"}></Image>,
  },
  {
    label: "Hybrids",
    value: "hybrids",
    icon: <Image src="/beasts.svg" width={20} height={20} alt={"beasts"}></Image>,
  },
  {
    label: "Insectoids",
    value: "insectoids",
    icon: <Image src="/beasts.svg" width={20} height={20} alt={"beasts"}></Image>,
  },
  {
    label: "Necrophages",
    value: "necrophages",
    icon: <Image src="/beasts.svg" width={20} height={20} alt={"beasts"}></Image>,
  },
  {
    label: "Ogroids",
    value: "ogroids",
    icon: <Image src="/beasts.svg" width={20} height={20} alt={"beasts"}></Image>,
  },
  {
    label: "Relicts",
    value: "relicts",
    icon: <Image src="/beasts.svg" width={20} height={20} alt={"beasts"}></Image>,
  },
  {
    label: "Specters",
    value: "specters",
    icon: <Image src="/beasts.svg" width={20} height={20} alt={"beasts"}></Image>,
  },
  {
    label: "Vampires",
    value: "vampires",
    icon: <Image src="/beasts.svg" width={20} height={20} alt={"beasts"}></Image>,
  },
];
