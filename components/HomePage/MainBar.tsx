import Dropdown from "./Dropdown";
import Filter from "./Filter";

const MainBar = () => {
  return (
    <div className="flex flex-col justify-center p-4 my-8 mx-auto border border-secondary/75 md:flex-row md:justify-between md:items-center md:max-w-5xl">
      <Filter />
      <Dropdown /> 
    </div>
  );
};

export default MainBar;
