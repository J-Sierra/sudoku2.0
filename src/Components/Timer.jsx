import React, { useState, useEffect } from "react";
import { useSudokuContext } from "../Context/SudokuContext.jsx";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const { handleSetTime } = useSudokuContext();

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
        handleSetTime(seconds); // Call handleSetTimer without the arrow function
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, handleSetTime]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="text-lg sm:text-4xl mb-1 select-none">
      <p>{formatTime(seconds)}</p>
    </div>
  );
};

export default Timer;
