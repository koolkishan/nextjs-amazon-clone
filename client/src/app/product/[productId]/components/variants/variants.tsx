import React, { useState } from "react";

const Variants = ({ variants }: { variants: string[] }) => {
  const [selected, setSelected] = useState(0);

  return (
    <ul className="flex gap-5 my-5">
      {variants.map((variant, index) => (
        <li
          key={variant}
          className={`cursor-pointer border-2 p-1 text-sm font-semibold  ${
            selected === index ? " border-amazon-primary " : "border-white"
          }`}
          onClick={() => setSelected(index)}
        >
          {variant}
        </li>
      ))}
    </ul>
  );
};

export default Variants;
