import Image from "next/image";
import { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";

const Search = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log('search:', search)
  },[search])

  return (
    <div className="block relative">
      <span className="sr-only">Search</span>
      <input
        className="block py-2 pr-3 pl-9 w-full h-12 placeholder:italic placeholder:text-slate-400 bg-darky rounded-md border-0 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary shadow-sm drop-shadow-sm sm:text-sm text-gray-300"
        placeholder="Search..."
        type="text"
        name="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <span className="flex absolute inset-y-0 left-0 items-center pl-2 ">
        <SearchIcon className="w-5 h-5 text-white" />
      </span>
    </div>
  );
};

export default Search;
