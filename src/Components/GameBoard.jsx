import { motion } from "framer-motion";

import Region from "./Regions.jsx";
import { useSudokuContext } from "../Context/SudokuContext.jsx";

const GameBoard = () => {
  const { regions } = useSudokuContext();

  console.log("regions", regions);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
      className=" w-full h-screen flex flex-col justify-center items-center"
    >
      <motion.h1 className="text-[100px] justify-self-start select-none font-bold text-center mb-8 text-glow">
        Sudoku
      </motion.h1>
      <div className="h-[60vh] w-[60vh] border-2 border-tertiary bg-secondary">
        <div className="grid grid-cols-3 grid-rows-3 h-full w-full">
          {regions.map((region, index) => (
            //region is an array of 9 objects
            // console.log("region", region),
            <Region key={index} region={region} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GameBoard;
