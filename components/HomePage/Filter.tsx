import { MouseEvent, MouseEventHandler } from "react";

interface FilterProps {
  filters: {
    label: string;
    value: string;
    icon: React.ReactNode;
    selected: boolean;
  }[];
}

const Filter = ({ filters }: FilterProps) => {
  return (
    <div className="flex items-center p-4 space-x-4">
      <h1 className="text-xl font-bold text-white">Weaknesses</h1>
      <ul className="flex space-x-2">
        {filters.map(({ icon, label, value, selected }) => {
          return (
            <li key={value}>
              <button className={`flex flex-col ${selected ? "opacity-100" : "opacity-30"} hover:opacity-100`}>
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
