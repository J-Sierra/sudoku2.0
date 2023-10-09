import { motion } from "framer-motion";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";

const Socials = () => {
  const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.5, delay: 2.5 } },
  };
  return (
    <>
      <motion.div
        initial={animations.initial}
        animate={animations.animate}
        className="flex-col fixed bottom-0 justify-center items-center gap-5 hidden lg:flex"
      >
        <a
          href="https://github.com/J-Sierra/React_Sudoku_Puzzle"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-[30px] hover:text-[#915eff] transition-all duration-300 ml-4"
        >
          <AiOutlineGithub />
        </a>
        <div className="w-[2px] lightGray-gradient h-[30vh] ml-3" />
      </motion.div>
      <motion.div
        initial={animations.initial}
        animate={animations.animate}
        className="flex flex-col right-[15px] fixed bottom-0 justify-center items-center gap-5 hidden lg:flex"
      >
        <a
          href={"https://www.linkedin.com/in/johnny-sierra/"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-[30px] hover:text-[#915eff] transition-all duration-300 mr-4"
        >
          <AiOutlineLinkedin />
        </a>
        <div className="w-[2px] lightGray-gradient h-[30vh] mr-3" />
      </motion.div>
    </>
  );
};

export default Socials;
