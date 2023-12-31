import { motion } from "framer-motion";
import { useState } from "react";

const MainMenu = ({ onStartGame }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.5, staggerChildren: 0.5 },
    },
  };

  const childVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className="flex flex-col justify-center items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit={{ y: -1000, opacity: 0, transition: { duration: 1 } }}
      >
        <motion.h1
          variants={childVariants}
          className="sm:text-[150px] md:text-[200px] text-6xl select-none font-bold text-center mb-8 text-glow"
        >
          Sudoku
        </motion.h1>
        <motion.div
          className="flex flex-col items-center justify-center sm:block sm:flex-row sm:justify-start sm:items-center gap-4"
          variants={childVariants}
        >
          <label
            htmlFor="difficulty"
            className="sm:text-[30px] select-none font-bold pr-3"
          >
            Select Difficulty:
          </label>
          <motion.select
            id="difficulty"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="mr-4 px-4 py-2 select-none rounded border-2 border-gray-400  "
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="expert">Expert</option>
            {/*<option value="test">Test</option>*/}
          </motion.select>{" "}
        </motion.div>{" "}
        <motion.button
          whileHover={{
            scale: 1.1,
            color: "#915eff",
            backgroundColor: "#fff",
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            onStartGame(true, selectedDifficulty);
          }}
          className="bg-tertiary text-white select-none px-4 py-2 rounded mt-4 ml-[-16px]"
          variants={childVariants}
        >
          Start Game
        </motion.button>
      </motion.div>
    </div>
  );
};

export default MainMenu;
