import MainMenu from "./Components/MainMenu.jsx";
import GameBoard from "./Components/Gameboard comps/GameBoard.jsx";
import StarsCanvas from "./Components/Canvas/StarsCanvas.jsx";
import Socials from "./Components/Socials.jsx";
import { AnimatePresence } from "framer-motion";
import { useSudokuContext } from "./Context/SudokuContext.jsx";
import EndGameMenu from "./Components/EndGameMenu.jsx";

function App() {
  const { startGame, loading, gameStarted, setGameStarted, solved } =
    useSudokuContext();
  const handleStartGame = (gameStart, difficulty) => {
    setGameStarted(gameStart);
    startGame(difficulty);
  };

  return (
    <>
      <AnimatePresence>
        <div className="w-screen h-screen flex flex-col justify-center items-center">
          {gameStarted && !loading ? (
            solved ? (
              <EndGameMenu />
            ) : (
              <GameBoard key="gameBoard" onStartGame={handleStartGame} />
            )
          ) : (
            <MainMenu key="mainMenu" onStartGame={handleStartGame} />
          )}
          {gameStarted && <StarsCanvas key="starsCanvas" />}
        </div>
      </AnimatePresence>
      <Socials />
      <p className="absolute bottom-0 right-2 text-xs font-extralight ">
        Created by <a href="https://www.johnnysierra.com">Johnny Sierra</a>
      </p>
    </>
  );
}

export default App;
