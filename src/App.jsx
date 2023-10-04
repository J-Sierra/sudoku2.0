import MainMenu from "./Components/MainMenu.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import StarsCanvas from "./Components/StarsCanvas.jsx";
import { useState } from "react";
import Socials from "./Components/Socials.jsx";
import { AnimatePresence } from "framer-motion";
import { SudokuProvider } from "./Context/SudokuContext.jsx";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const handleStartGame = (gameStart, difficulty) => {
    setGameStarted(gameStart);
    setDifficulty(difficulty);
  };

  return (
    <SudokuProvider>
      <AnimatePresence mode="wait">
        {gameStarted ? (
          <GameBoard key="gameBoard" />
        ) : (
          <MainMenu key="mainMenu" onStartGame={handleStartGame} />
        )}
        {gameStarted && <StarsCanvas />}
      </AnimatePresence>
      <Socials />
    </SudokuProvider>
  );
}

export default App;
