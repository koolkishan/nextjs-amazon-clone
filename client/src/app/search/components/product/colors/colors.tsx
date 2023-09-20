import React from "react";

const Colors = ({ colors }: { colors: string[] }) => {
  return (
    <ul className="flex gap-1">
      {colors.map((color) => (
        <li
          key={color}
          className="h-5 w-5 rounded-full"
          style={{ backgroundColor: color }}
        ></li>
      ))}
    </ul>
  );
};

export default Colors;
