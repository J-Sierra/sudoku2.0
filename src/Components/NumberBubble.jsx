import { useSudokuContext } from "../Context/SudokuContext.jsx";

const NumberBubble = ({ number, cell }) => {
  const { handleBubbleClick } = useSudokuContext();
  const handleClick = () => {
    handleBubbleClick(cell, number);
  };
  return (
    <div className="bubble bg-tertiary text-white border-2 border-black rounded-full text-glow select-none">
      <div
        onClick={handleClick}
        className="flex justify-center items-center m-[-4px] p-0"
      >
        {number}
      </div>
    </div>
  );
};

export default NumberBubble;
