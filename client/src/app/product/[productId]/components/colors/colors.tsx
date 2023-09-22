import React, { useState } from "react";

const Colors = ({ colors }: { colors: string[] }) => {
  const [selected, setSelected] = useState(0);

  return (
    <ul className="flex gap-5">
      {colors.map((color, index) => (
        <li
          key={color}
          className={`h-10 w-10 rounded-full cursor-pointer border-4  ${
            selected === index ? " border-amazon-primary " : "border-white"
          }`}
          style={{ backgroundColor: color }}
          onClick={() => setSelected(index)}
        ></li>
      ))}
    </ul>
  );
};

export default Colors;
