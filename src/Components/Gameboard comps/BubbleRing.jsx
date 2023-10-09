import { motion } from "framer-motion";
import NumberBubble from "./NumberBubble.jsx";
import { useEffect, useState } from "react";

const BubbleRing = ({ cell }) => {
  const initialAngleOffset = 2.2;
  const totalBubbles = 10;
  const [circleSize, setCircleSize] = useState(calculateCircleSize());

  // Calculate the circle size based on the screen size
  function calculateCircleSize() {
    // You can adjust this logic based on your requirements
    const screenSize = Math.min(window.innerWidth, window.innerHeight);
    return screenSize / 14;
  }

  // Update the circle size when the screen size changes
  useEffect(() => {
    function handleResize() {
      setCircleSize(calculateCircleSize());
    }

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.01, // Adjust the stagger duration as needed
      },
    },
  };

  const bubbleVariants = {
    initial: { opacity: 0, x: 0, y: 0 },
    animate: (index) => ({
      opacity: 1,
      x:
        Math.cos((index / totalBubbles) * 2 * Math.PI + initialAngleOffset) *
        Math.max(circleSize, 40),
      y:
        Math.sin((index / totalBubbles) * 2 * Math.PI + initialAngleOffset) *
        Math.max(circleSize, 40),
      transition: { duration: 0.25 }, // Adjust the duration as needed
    }),
  };

  return (
    <motion.div
      className="bubbleRing z-10"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {Array.from(Array(totalBubbles).keys()).map((i) => (
        <motion.div key={i} variants={bubbleVariants} custom={i}>
          <NumberBubble cell={cell} number={i === 9 ? "x" : i + 1} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BubbleRing;
