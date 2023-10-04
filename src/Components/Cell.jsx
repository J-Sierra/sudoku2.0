import React from "react";

const Cell = ({ cell }) => {
  // console.log("cell", cell);
  const { value } = cell;
  return (
    <div className="h-full w-full flex justify-center items-center text-black border-[1px] border-primary">
      <span className="font-semibold text-4xl">{value}</span>
    </div>
  );
};

export default Cell;
