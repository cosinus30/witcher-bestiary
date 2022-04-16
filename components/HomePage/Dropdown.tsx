import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const people = [
  { name: "All Creatures" },
  { name: "Beasts" },
  { name: "Vampires" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

export default function Dropdown() {
  const [selected, setSelected] = useState(people[0]);

  return (
    <div className="w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative p-4 w-full text-left text-white bg-darky rounded-lg shadow-md hover:cursor-pointer sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
              <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="overflow-auto absolute py-1 mt-1 w-full max-h-60 text-base bg-darky rounded-md focus:outline-none ring-1 ring-black/5 shadow-lg sm:text-sm">
            {people.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `hover:cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                    active ? "text-white bg-gray-800" : "text-white"
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{person.name}</span>
                    {selected ? (
                      <span className="flex absolute inset-y-0 left-0 items-center pl-3 text-amber-600 hover:cursor-pointer">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
