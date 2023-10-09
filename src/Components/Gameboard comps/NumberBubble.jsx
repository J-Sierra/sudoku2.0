import { useSudokuContext } from "../../Context/SudokuContext.jsx";
import { motion } from "framer-motion";

const NumberBubble = ({ number, cell }) => {
  const { handleBubbleClick } = useSudokuContext();
  const handleClick = () => {
    handleBubbleClick(cell, number);
  };
  return (
    <motion.div
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 0.8 }}
      className="bubble bg-tertiary text-white border-2 border-black rounded-full text-glow select-none"
    >
      <div
        onClick={handleClick}
        className="flex justify-center items-center m-[-4px] p-0"
      >
        {number}
      </div>
    </motion.div>
  );
};

export default NumberBubble;
