import React, { MouseEvent, MouseEventHandler } from "react";
import { FilterContext, FilterContextType } from "../../context/FilterProvider";


const Filter = () => {
  const { filters, updateFilters} = React.useContext(FilterContext) as FilterContextType;

  return (
    <div className="flex md:flex-col items-center space-x-4">
      <h1 className="text-xl font-bold text-white">Weaknesses</h1>
      <ul className="flex space-x-2">
        {filters.map(({ icon, label, value, selected }) => {
          return (
            <li key={value}>
              <button className={`flex flex-col ${selected ? "opacity-100" : "opacity-30"} hover:opacity-100`} onClick={() => updateFilters(value)}>
                {icon && <span className="m-0">{icon}</span>}
                <span className="text-xs text-white">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Filter;
