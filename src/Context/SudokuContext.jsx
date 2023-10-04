import React, { createContext, useContext, useState } from "react";

const SudokuContext = createContext();

export const useSudokuContext = () => {
  return useContext(SudokuContext);
};

export const SudokuProvider = ({ children }) => {
  const [gameBoard, setGameBoard] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const SIZE = 9;

  const startGame = async (difficulty) => {
    setLoading(true);

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
    console.log("Final gameBoard:", solvedGameBoard);
    console.log("Final regions:", puzzleWithRemovedCells);
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
    return Array.from({ length: SIZE }, (_, row) =>
      Array(SIZE)
        .fill()
        .map((_, col) => {
          const region = Math.floor(col / 3) + Math.floor(row / 3) * 3;
          const regionArrIndex = (col % 3) + (row % 3) * 3;
          const value = gameBoard[row][col];

          return {
            col,
            row,
            region,
            regionArrIndex,
            value,
            selected: false,
            correct: null,
            conflicting: false,
            editable: value === null,
            cellNotes: Array.from({ length: 9 }, (_, index) => ({
              visible: false,
              cellNoteNumber: index + 1,
            })),
          };
        }),
    );
  };

  const removeCellsBasedOnDifficulty = (puzzleWithRegions, difficulty) => {
    let removalRange;
    const puzzleCopy = [...puzzleWithRegions];

    switch (difficulty) {
      case "easy":
        removalRange = [32, 40]; // Remove between 32 to 40 cells
        break;
      case "medium":
        removalRange = [40, 48]; // Remove between 40 to 48 cells
        break;
      case "hard":
        removalRange = [48, 56]; // Remove between 48 to 56 cells
        break;
      default:
        removalRange = [40, 48]; // Default to medium difficulty
    }

    const [minCellsToRemove, maxCellsToRemove] = removalRange;
    const cellsToRemove = Math.floor(
      Math.random() * (maxCellsToRemove - minCellsToRemove + 1) +
        minCellsToRemove,
    );

    // Flatten the puzzle for easier removal
    const flatPuzzle = puzzleCopy.flat();

    // Remove cells randomly until reaching the desired number of removals
    for (let i = 0; i < cellsToRemove; i++) {
      const randomIndex = Math.floor(Math.random() * flatPuzzle.length);
      flatPuzzle[randomIndex].value = null; // Set the cell value to null
    }

    // Convert the flat array back to a 2D array
    for (let i = 0; i < SIZE; i++) {
      puzzleCopy[i] = flatPuzzle.slice(i * SIZE, (i + 1) * SIZE);
    }

    return puzzleCopy;
  };

  const contextValue = {
    gameBoard,
    regions,
    startGame,
    loading,
  };

  return (
    <SudokuContext.Provider value={contextValue}>
      {children}
    </SudokuContext.Provider>
  );
};
