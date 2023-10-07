// BubbleRing.jsx
import NumberBubble from "./NumberBubble";

const BubbleRing = ({ cell }) => {
  return (
    <div className="bubbleRing z-10">
      {Array.from(Array(9).keys()).map((e, i) => (
        <NumberBubble cell={cell} number={i + 1} key={i} />
      ))}
      <NumberBubble cell={cell} number={"x"} />
    </div>
  );
};

export default BubbleRing;
