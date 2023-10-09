import React, { createContext, useContext, useState } from "react";

const SudokuContext = createContext();

export const useSudokuContext = () => {
  return useContext(SudokuContext);
};

export const SudokuProvider = ({ children }) => {
  const SIZE = 9;

  const [gameBoard, setGameBoard] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [solved, setSolved] = useState(false);
  const [endGameStats, setEndGameStats] = useState({
    time: 0,
    difficulty: "",
    cluesUsed: 0,
    errors: 0,
  });

  const startGame = async (difficulty) => {
    setLoading(true);
    setSolved(false);
    setEndGameStats(() => {
      return {
        time: 0,
        difficulty: "",
        cluesUsed: 0,
        errors: 0,
      };
    });

    // Generate a solved puzzle
    const solvedGameBoard = generateSolvedPuzzle();
    setGameBoard(solvedGameBoard);

    // Create regions from the solved puzzle
    const puzzleWithRegions = createRegions(solvedGameBoard);
    setRegions(puzzleWithRegions);

    // Remove cells based on difficulty
    const puzzleWithRemovedCells = removeCellsBasedOnDifficulty(
      puzzleWithRegions,
      difficulty,
    );
    setRegions(puzzleWithRemovedCells);
    setLoading(false);
  };

  const generateSolvedPuzzle = () => {
    const board = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));

    // Shuffle numbers 1 to 9 for the first row
    board[0] = shuffleArray(Array.from({ length: SIZE }, (_, i) => i + 1));

    if (solveSudoku(board)) {
      return board;
    }

    return null; // If no solution is found, return null
  };
  const shuffleArray = (array) => {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const solveSudoku = (board) => {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) {
      // If no empty cell is found, the puzzle is solved
      return true;
    }

    const { row, col } = emptyCell;

    for (let num = 1; num <= SIZE; num++) {
      if (isValid(board, row, col, num)) {
        board[row][col] = num;

        if (solveSudoku(board)) {
          return true;
        }

        board[row][col] = null;
      }
    }

    return false;
  };
  const findEmptyCell = (board) => {
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (board[row][col] === null) {
          return { row, col };
        }
      }
    }
    return null; // If no empty cell is found
  };
  const isValid = (board, row, col, num) => {
    // Check if 'num' is not already present in the current row, column, and box
    for (let x = 0; x < SIZE; x++) {
      if (
        board[row][x] === num ||
        board[x][col] === num ||
        board[row - (row % 3) + (x % 3)][
          col - (col % 3) + Math.floor(x / 3)
        ] === num
      ) {
        return false;
      }
    }
    return true;
  };
  const createRegions = (gameBoard) => {
    let cellId = 0;
    const newRegions = [[], [], [], [], [], [], [], [], []];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const region = Math.floor(col / 3) + Math.floor(row / 3) * 3;
        const regionArrIndex = (col % 3) + (row % 3) * 3;
        const value = gameBoard[row][col];
        newRegions[region].push({
          row,
          col,
          value,
          region,
          regionArrIndex,
          selected: false,
          correct: true,
          conflicting: false,
          editable: value === null,
          cellNotes: Array.from({ length: 9 }, (_, index) => ({
            visible: false,
            cellNoteNumber: index + 1,
          })),
          cellId: cellId,
        });
        cellId++;
      }
    }
    return newRegions;
  };
  const removeCellsBasedOnDifficulty = (puzzleWithRegions, difficulty) => {
    let removalRange;
    const puzzleCopy = [...puzzleWithRegions];

    switch (difficulty) {
      case "easy":
        removalRange = [32, 40];
        break;
      case "medium":
        removalRange = [40, 48];
        break;
      case "hard":
        removalRange = [48, 56];
        break;
      case "expert":
        removalRange = [56, 64];
        break;
      case "test":
        removalRange = [1, 1];
        break;
      default:
        removalRange = [40, 48];
    }
    handleEndGameStatsDifficulty(difficulty);
    const [minCellsToRemove, maxCellsToRemove] = removalRange;
    const flatPuzzle = puzzleCopy.flat();

    // Create an array of all possible cells with non-null values
    const nonEmptyCells = flatPuzzle.filter((cell) => cell.value !== null);

    // Remove cells randomly until reaching the desired number of removals
    for (let i = 0; i < maxCellsToRemove; i++) {
      if (nonEmptyCells.length === 0) {
        // If there are no more non-empty cells, break to avoid an infinite loop
        break;
      }

      const randomIndex = Math.floor(Math.random() * nonEmptyCells.length);
      const selectedCell = nonEmptyCells[randomIndex];

      selectedCell.value = null; // Set the cell value to null
      selectedCell.editable = true; // Allow the user to edit the cell

      // Remove the selected cell from the array of non-empty cells
      nonEmptyCells.splice(randomIndex, 1);
    }

    // Convert the flat array back to a 2D array
    for (let i = 0; i < SIZE; i++) {
      puzzleCopy[i] = flatPuzzle.slice(i * SIZE, (i + 1) * SIZE);
    }

    return puzzleCopy;
  };

  const handleBubbleClick = (cell, newValue) => {
    const { region, regionArrIndex } = cell;
    const newRegions = [...regions];
    newRegions[region][regionArrIndex] = {
      ...newRegions[region][regionArrIndex],
      selected: true,
      value: newValue === "x" ? null : newValue,
      correct: checkIfCorrect(cell, newValue),
      cellNotes: Array.from({ length: 9 }, (_, index) => ({
        visible: false,
        cellNoteNumber: index + 1,
      })),
    };

    // Update the state with the modified array
    setRegions(newRegions);
    handleConflicting();
    setSolved(checkIfSolved());
  };
  const checkIfCorrect = (cell, newValue) => {
    if (newValue === "x") {
      return true;
    }
    if (newValue === gameBoard[cell.row][cell.col]) {
      return true;
    } else {
      handleEndGameStatsErrors();
      return false;
    }
  };

  const handleCellNoteClick = (cell, cellNoteNumber) => {
    const { region, regionArrIndex } = cell;
    setRegions((prevRegions) => {
      const newRegions = [...prevRegions];
      const cellNotes = newRegions[region][regionArrIndex].cellNotes;
      cellNotes[cellNoteNumber - 1] = {
        ...cellNotes[cellNoteNumber - 1],
        visible: !cellNotes[cellNoteNumber - 1].visible,
      };
      return newRegions;
    });
  };

  const handleConflicting = () => {
    const newRegions = [...regions];

    // Reset conflicting property to false for all cells
    newRegions.flat().forEach((cell) => {
      cell.conflicting = false;
    });

    const conflictingCells = [];

    // Check if the value conflicts with the row, column, or region
    newRegions.flat().forEach((cell) => {
      const { row, col, region, value, cellId } = cell;
      newRegions
        .flat()
        .filter((otherCell) => otherCell.cellId !== cellId && value)
        .some((otherCell) => {
          if (otherCell.row === row && otherCell.value === value) {
            conflictingCells.push(otherCell);
          }
          if (otherCell.col === col && otherCell.value === value) {
            conflictingCells.push(otherCell);
          }
          if (otherCell.region === region && otherCell.value === value) {
            conflictingCells.push(otherCell);
          }
        });
    });

    // Update conflicting property for conflicting cells
    conflictingCells.forEach((conflictingCell) => {
      const { region, regionArrIndex } = conflictingCell;
      newRegions[region][regionArrIndex] = {
        ...newRegions[region][regionArrIndex],
        conflicting: true,
      };
    });

    setRegions(newRegions);
  };
  const handleErrorSwitch = () => {
    setShowErrors(!showErrors);
  };
  const handleClues = () => {
    const newRegions = [...regions];
    const flatGameboard = gameBoard.flat();
    const flatPuzzle = newRegions.flat();
    const nullCells = flatPuzzle.filter((cell) => cell.value === null);

    if (nullCells.length === 0) {
      console.log("No null cells available for clues");
      setSolved(checkIfSolved());
      return;
    }

    const randomIndex = Math.floor(Math.random() * nullCells.length);
    const selectedCell = nullCells[randomIndex];

    // Check if the selected cell is already filled
    if (selectedCell.value !== null) {
      console.log("Selected cell is not null");
      return;
    }

    const { region, regionArrIndex } = selectedCell;
    newRegions[region][regionArrIndex] = {
      ...newRegions[region][regionArrIndex],
      value: flatGameboard[selectedCell.cellId],
    };

    setRegions(newRegions);
    setSolved(checkIfSolved());
    handleEndGameStatsCluesUsed();
  };
  const checkIfSolved = () => {
    const flatPuzzle = regions.flat();
    return flatPuzzle.every(
      (cell) => cell.value === gameBoard[cell.row][cell.col],
    );
  };
  const handleBackArrowClick = () => {
    setGameStarted(false);
    setLoading(true);
    setSolved(false);
  };
  const handleSetTime = (time) => {
    setEndGameStats((prevStats) => ({ ...prevStats, time }));
  };
  const handleEndGameStatsDifficulty = (difficulty) => {
    setEndGameStats((prevStats) => ({ ...prevStats, difficulty }));
  };
  const handleEndGameStatsCluesUsed = () => {
    setEndGameStats((prevStats) => ({
      ...prevStats,
      cluesUsed: prevStats.cluesUsed + 1,
    }));
  };
  const handleEndGameStatsErrors = () => {
    setEndGameStats((prevStats) => ({
      ...prevStats,
      errors: prevStats.errors + 1,
    }));
  };
  const calculateScore = () => {
    const { time, cluesUsed, errors, difficulty } = endGameStats;

    // Define weights for each stat
    const startScore = {
      easy: 10000,
      medium: 25000,
      hard: 50000,
      expert: 100000,
    };

    const timeWeight = -10000 / 600; // 10,000 points for 10 minutes
    const cluesUsedWeight = 2000;
    const errorsWeight = 5000;

    // Adjust score based on difficulty
    const difficultyWeights = {
      easy: 1,
      medium: 1.5,
      hard: 2,
      expert: 2.5,
    };

    let score = startScore[difficulty];
    score -=
      (time * timeWeight +
        cluesUsed * cluesUsedWeight +
        errors * errorsWeight) *
      difficultyWeights[difficulty];

    // Ensure the score is non-negative
    return Math.round(Math.max(0, score));
  };

  const contextValue = {
    handleCellNoteClick,
    handleBubbleClick,
    handleErrorSwitch,
    handleBackArrowClick,
    handleSetTime,
    handleClues,
    calculateScore,
    setGameStarted,
    showErrors,
    setGameBoard,
    setRegions,
    gameBoard,
    regions,
    gameStarted,
    startGame,
    loading,
    solved,
    endGameStats,
  };

  return (
    <SudokuContext.Provider value={contextValue}>
      {children}
    </SudokuContext.Provider>
  );
};
