import { useContext } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { DropdownContext, DropdownContextType } from "../../context/DropdownProvider";

export default function Dropdown() {
  const { dropdownItems, selectedDropdownItem, updateSelected } = useContext(DropdownContext) as DropdownContextType;

  return (
    <div className="mt-4 w-full md:mt-0 md:w-72">
      <Listbox value={selectedDropdownItem.value} onChange={updateSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative p-4 w-full text-left text-white bg-darky rounded-lg shadow-md hover:cursor-pointer sm:text-sm">
            <span className="block truncate">{selectedDropdownItem.label}</span>
            <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
              <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="overflow-auto absolute z-10 py-1 mt-1 w-full max-h-60 text-base bg-darky rounded-md focus:outline-none ring-1 ring-black/5 shadow-lg sm:text-sm">
            {dropdownItems.map(({label, value, icon}) => (
              <Listbox.Option
                key={value}
                className={({ active }) =>
                  `hover:cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                    active ? "text-white bg-gray-800" : "text-white"
                  }`
                }
                value={value}
              >
                {({ selected }) => (
                  <div className="flex justify-between">
                    <span className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}>{label}</span>
                    {selected ? (
                      <span className="flex absolute inset-y-0 left-0 items-center pl-3 text-amber-600 hover:cursor-pointer">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                    <span className="">
                      {icon}
                    </span>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
