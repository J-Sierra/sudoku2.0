import Cell from "./Cell.jsx";

const Region = (props) => {
  const { region } = props;
  // console.log("region", region);
  return (
    <div className="grid grid-cols-3 grid-rows-3 h-full w-full border-2 border-primary">
      {region.map((cell, index) => (
        //cell is an object{col, row, region, regionIndex, value, ...baseCell}
        <Cell key={index} cell={cell} />
      ))}
    </div>
  );
};
export default Region;
