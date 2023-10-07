import MainMenu from "./Components/MainMenu.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import StarsCanvas from "./Components/StarsCanvas.jsx";
import { useState } from "react";
import Socials from "./Components/Socials.jsx";
import { AnimatePresence } from "framer-motion";
import { useSudokuContext } from "./Context/SudokuContext.jsx";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const { startGame, loading } = useSudokuContext();
  const handleStartGame = (gameStart, difficulty) => {
    setGameStarted(gameStart);
    startGame(difficulty);
  };

  return (
    <>
      <AnimatePresence>
        {gameStarted && !loading ? (
          <GameBoard key="gameBoard" />
        ) : (
          <MainMenu key="mainMenu" onStartGame={handleStartGame} />
        )}
        {/*{gameStarted && <StarsCanvas key="starsCanvas" />}*/}
      </AnimatePresence>
      <Socials />
    </>
  );
}

export default App;
