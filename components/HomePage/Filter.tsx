import React from "react";
import { FilterContext, FilterContextType } from "../../context/FilterProvider";

const Filter = () => {
  const { filters, updateFilters } = React.useContext(FilterContext) as FilterContextType;

  return (
    <div className="flex flex-col items-center space-x-4 md:flex-row">
      <h1 className="text-xl font-bold text-white">Weaknesses</h1>
      <ul className="flex space-x-2">
        {filters.map(({ icon, label, value, selected }) => {
          return (
            <li key={value}>
              <button
                className={`flex flex-col mx-1 ${selected ? "opacity-100" : "opacity-30"} hover:opacity-100`}
                onClick={() => updateFilters(value)}
              >
                {icon && <span className="mx-auto">{icon}</span>}
                <p className="text-xs text-center">{label}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Filter;
