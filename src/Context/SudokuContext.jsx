import React, { createContext, useContext, useState } from "react";

const SudokuContext = createContext();

export const useSudokuContext = () => {
  return useContext(SudokuContext);
};

export const SudokuProvider = ({ children }) => {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const generateSolvedPuzzle = () => {
    const puzzle = Array.from({ length: 9 }, () => Array(9).fill({}));

    for (let row = 0; row < puzzle.length; row++) {
      for (let col = 0; col < puzzle[row].length; col++) {
        let num = getANoNConflictingNumber(row, col, puzzle);
        if (num === 0) {
          // Clear the entire row and restart the loop for the current row
          puzzle[row] = Array(9).fill({});
          col = -1; // Set col to -1 so that it becomes 0 after incrementing
        } else {
          puzzle[row][col] = {
            col,
            row,
            value: num,
          };
        }
      }
    }

    return puzzle;
  };

  const getANoNConflictingNumber = (row, col, puzzle) => {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let num = numbers.splice(getRandomInt(numbers.length), 1)[0];

    while (numberConflicts(row, col, num, puzzle)) {
      if (numbers.length > 0) {
        num = numbers.splice(getRandomInt(numbers.length), 1)[0];
      } else {
        num = 0;
        break;
      }
    }

    return num;
  };

  const numberConflicts = (row, col, num, puzzle) => {
    const regionNumbers = puzzle
      .slice(Math.floor(row / 3) * 3, Math.floor(row / 3) * 3 + 3)
      .flatMap((r) =>
        r.slice(Math.floor(col / 3) * 3, Math.floor(col / 3) * 3 + 3),
      );

    return (
      puzzle[row].some((cell) => cell.value === num) ||
      puzzle.map((r) => r[col]).some((cell) => cell.value === num) ||
      regionNumbers.some((cell) => cell.value === num)
    );
  };

  const createRegions = (gameBoard) => {
    const regions = Array.from({ length: 9 }, () => Array(9).fill({}));

    for (let row = 0; row < regions.length; row++) {
      for (let col = 0; col < regions[row].length; col++) {
        const region = Math.floor(col / 3) + Math.floor(row / 3) * 3;
        const regionArrIndex = (col % 3) + (row % 3) * 3;
        const value = gameBoard[row][col].value;

        regions[row][col] = {
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
      }
    }

    return regions;
  };

  const initialGameBoard = generateSolvedPuzzle();
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  // console.log(gameBoard);

  const initialRegions = createRegions(gameBoard);
  const [regions, setRegions] = useState(initialRegions);
  // console.log("regions", regions);

  const contextValue = {
    gameBoard,
    setGameBoard,
    regions,
    setRegions,
  };

  return (
    <SudokuContext.Provider value={contextValue}>
      {children}
    </SudokuContext.Provider>
  );
};
