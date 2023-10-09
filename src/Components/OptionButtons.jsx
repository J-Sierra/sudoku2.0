import { motion } from "framer-motion";
import { FiArrowLeft, FiHelpCircle } from "react-icons/fi";
import ToggleSwitch from "./ToggleSwitch.jsx";
import { useState } from "react";
import { useSudokuContext } from "../Context/SudokuContext.jsx";

const OptionButtons = ({ options, selected, onSelect, onStartGame }) => {
  const { handleErrorSwitch, showErrors, handleClues, handleBackArrowClick } =
    useSudokuContext();
  return (
    <div className="flex flex-row justify-around items-center flex-wrap puzzleOptionContainer select-none">
      <div className="flex flex-col justify-center items-center">
        <span className="puzzleOptionText">Main Menu</span>
        <div onClick={() => handleBackArrowClick()}>
          <motion.button
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.1 }}
            className="btn btn-primary puzzleOptions"
          >
            <FiArrowLeft className="w-full h-full" />
          </motion.button>
        </div>
      </div>
      <div className="flex flex-col  justify-center items-center   btn btn-primary">
        <span className="puzzleOptionText">Hint</span>
        <div onClick={() => handleClues()}>
          <motion.button
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0 }}
            className="btn btn-primary puzzleOptions"
          >
            <FiHelpCircle className="w-full h-full" />
          </motion.button>
        </div>
      </div>
      <div className="flex flex-col  justify-center items-center   btn btn-primary">
        <span className="puzzleOptionText">Show Errors</span>
        <ToggleSwitch
          onChange={handleErrorSwitch}
          checked={showErrors}
          className="puzzleOptions"
        />
      </div>
    </div>
  );
};
export default OptionButtons;
