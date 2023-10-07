const NumberBubble = ({ number, cell }) => {
  const { region, regionArrIndex } = cell;
  return (
    <div className="bubble bg-tertiary text-white border-2 border-black rounded-full text-glow select-none">
      <div onClick="" className="flex justify-center items-center m-[-4px] p-0">
        {number === null ? "x" : number}
      </div>
    </div>
  );
};

export default NumberBubble;
