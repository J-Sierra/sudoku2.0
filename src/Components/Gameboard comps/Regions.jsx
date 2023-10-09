import Cell from "./Cell.jsx";

const Region = (props) => {
  const { region } = props;
  return (
    <div className="region items-center border-black border-2 grid flex-wrap grid-rows-3 grid-cols-3 justify-center relative ">
      {region.map((cell, index) => (
        //cell is an object{col, row, region, regionIndex, value, ...baseCell}
        <Cell key={index} cell={cell} />
      ))}
    </div>
  );
};
export default Region;
