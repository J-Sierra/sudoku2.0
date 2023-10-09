import { motion } from "framer-motion";
import "../../utils/index.scss";
import Region from "./Regions.jsx";
import { useSudokuContext } from "../../Context/SudokuContext.jsx";

import OptionButtons from "../OptionButtons.jsx";
import Timer from "../Timer.jsx";

const GameBoard = ({ onStartGame }) => {
  const { regions } = useSudokuContext();

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 6 } }}
      exit={{ y: "-100%", opacity: 0, transition: { duration: 1 } }}
      className="h-screen flex flex-col justify-center items-center relative"
    >
      <div className="flex flex-col justify-around items-center ">
        <h1 className="sm:text-[100px] text-6xl justify-self-start select-none font-bold text-center mb-8 text-glow">
          Sudoku
        </h1>
        <Timer />
      </div>
      <div className="items-center grid grid-cols-3 grid-rows-3 justify-center gameboard">
        {regions.map((region, index) => (
          <Region key={index} region={region} />
        ))}
      </div>
      <OptionButtons onStartGame={onStartGame} />
    </motion.div>
  );
};

export default GameBoard;
