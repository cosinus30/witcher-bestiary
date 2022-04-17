import Image from "next/image";
import Dropdown from "./Dropdown";
import Filter from "./Filter";
import Search from "./Search";

const MainBar = () => {
  return (
    <div className="flex flex-col justify-center my-8 mx-auto border border-secondary/75 md:flex-row md:items-center md:justify-between md:max-w-5xl p-4">
      <Filter />
      <Search />
      <Dropdown /> 
    </div>
  );
};

export default MainBar;
