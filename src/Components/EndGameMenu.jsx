import { useSudokuContext } from "../Context/SudokuContext.jsx";
import ReactParallaxTilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion.js";

const EndGameMenu = () => {
  const { endGameStats, handleBackArrowClick, calculateScore } =
    useSudokuContext();
  const { time, score, errors, cluesUsed, difficulty } = endGameStats;

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  return (
    <motion.div
      intial={{ opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 2 } }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center w-screen h-screen"
    >
      <ReactParallaxTilt
        options={{ max: 90, scale: 1, speed: 450 }}
        className=" w-3/4"
      >
        <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
          <div className="bg-primary rounded-[20px] py-5 px-12 min-h-[550px] flex flex-col items-center justify-center gap-5 py-5">
            <h3 className="text-white text-glow font-extrabold text-xl sm:text-[50px] md:text-[60px] lg:-[90px] xl:text-[100px]  select-none text-center">
              Congratulations!
            </h3>
            <p className="text-white text-[20px] xl:text-[25px] 2xl:text-[40px] select-none font-bold text-center">
              Difficulty:{" "}
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </p>
            <p className="text-white text-[20px] xl:text-[25px] 2xl:text-[30px] select-none font-bold text-center">
              Time: {formatTime(time)}
            </p>
            <p className="text-white text-[20px] xl:text-[25px] 2xl:text-[30px] select-none font-bold text-center">
              Errors: {errors}
            </p>
            <p className="text-white text-[20px] xl:text-[25px] 2xl:text-[30px] select-none font-bold text-center">
              Clues Used: {cluesUsed}
            </p>
            <p className="text-white text-[20px] xl:text-[25px] 2xl:text-[30px] select-none font-bold text-center">
              Score: {calculateScore()}
            </p>
            <motion.button
              onClick={() => handleBackArrowClick()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white text-[20px] xl:text-[30px] 2xl:text-[40px] select-none font-bold text-center bg-tertiary rounded-full px-5"
            >
              New Game?
            </motion.button>
          </div>
        </div>
      </ReactParallaxTilt>
    </motion.div>
  );
};
export default EndGameMenu;
