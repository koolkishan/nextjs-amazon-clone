import React from "react";
import { FaStar } from "react-icons/fa";

const Filters = () => {
  const filterData = {
    brands: ["Apple", "Samsung", "Xiaomi"],
  };
  return (
    <div className="px-4 text-sm text-amazon-dark flex flex-col gap-5">
      <div>
        <h4 className="font-semibold">Item Condition</h4>
        <ul className="">
          <li className="link-hover">New</li>
          <li className="link-hover">Renewed</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold">Customer Review</h4>
        {[4, 3, 2, 1].map((reviewIndex) => {
          return (
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-amazon-primary"
              key={reviewIndex}
            >
              <div className="flex cursor-pointer">
                {Array.from(Array(reviewIndex)).map((t) => (
                  <FaStar className="text-amazon-primary" key={t} />
                ))}
                {Array.from(Array(5 - reviewIndex)).map((t) => (
                  <FaStar className="text-gray-300" key={t} />
                ))}
              </div>
              <span>& up</span>
            </div>
          );
        })}
      </div>
      <div>
        <h4 className="font-semibold">Brand</h4>
        <ul>
          {filterData.brands.map((brand) => (
            <li key={brand} className="link-hover">
              {brand}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">Price</h4>
        <ul>
          <li className="link-hover">Under $10</li>
          <li className="link-hover">$10 - $50</li>
          <li className="link-hover">$50 - $100</li>
          <li className="link-hover">$100 - $500</li>
        </ul>
        <div className="my-2 flex gap-2">
          <input
            type="text"
            placeholder="Min"
            className="w-12 pl-2 border border-black rounded"
          />
          <input
            type="text"
            placeholder="Max"
            className="w-12 pl-2 border border-black rounded"
          />
          <button className="bg-amazon-secondary px-3 py-1 rounded text-white">
            Go
          </button>
        </div>
      </div>
      <div>
        <h4 className="font-semibold pb-1">Sort By</h4>
        <MyListbox />
      </div>
    </div>
  );
};

export default Filters;

import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

const sortingTypes = [
  { id: 1, name: "Price: Low to High" },
  { id: 2, name: "Price: High to Low" },
  { id: 3, name: "Avg. Customer Review" },
  { id: 4, name: "Newest Arrival" },
];

function MyListbox() {
  const [selectedPerson, setSelectedPerson] = useState(sortingTypes[0]);

  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
      <Listbox.Button className="bg-gray-200 p-2 rounded w-max">
        {selectedPerson.name}
      </Listbox.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Listbox.Options className="bg-gray-200 mt-1 w-max p-2">
          {sortingTypes.map((sorting) => (
            <Listbox.Option
              key={sorting.id}
              value={sorting}
              className="cursor-pointer"
            >
              {sorting.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
