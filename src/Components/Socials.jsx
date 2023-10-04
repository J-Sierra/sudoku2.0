import { motion } from "framer-motion";

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
        className="flex flex-col fixed bottom-0 justify-center items-center"
      >
        <div className="w-[2px] lightGray-gradient h-[40vh] ml-3" />
      </motion.div>
      <motion.div
        initial={animations.initial}
        animate={animations.animate}
        className="flex flex-col right-0 fixed bottom-0 justify-center items-center"
      >
        <div className="w-[2px] lightGray-gradient h-[40vh] mr-3" />
      </motion.div>
    </>
  );
};

export default Socials;
