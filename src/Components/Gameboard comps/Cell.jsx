import React, { useState, useEffect, useRef } from "react";
import CellNote from "./CellNote.jsx";
import BubbleRing from "./BubbleRing.jsx";
import { useSudokuContext } from "../../Context/SudokuContext.jsx";

const Cell = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const { value, editable, cellNotes, correct, conflicting } = cell;
  const cellRef = useRef(null);
  const { showErrors } = useSudokuContext();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cellRef.current && !cellRef.current.contains(event.target)) {
        setEditing(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [cellRef]);
  const cellClasses = () => {
    if (showErrors) {
      if (!editable) {
        return conflicting ? "bg-red-200" : "bg-gray-200";
      } else {
        return conflicting
          ? correct
            ? "bg-red-200"
            : "bg-red-500"
          : correct
          ? "bg-white"
          : "bg-red-500";
      }
    } else if (!showErrors) {
      return editable ? "bg-white" : "bg-gray-200";
    }
  };

  return (
    <div
      ref={cellRef}
      onClick={editable ? () => setEditing(!editing) : null}
      className={`cell 
      ${!editable ? "font-bold" : "font-normal"}
       ${cellClasses()}
       items-center border-[1px] border-black text-black grid justify-center relative select-none `}
    >
      {!editing ? value : null}
      {editing && <BubbleRing cell={cell} />}

      <div
        className={
          "mt-[-.5px] grid grid-cols-3 grid-rows-3 h-full w-full relative"
        }
      >
        {editable &&
          editing &&
          cellNotes.map((note, key) => (
            <div
              style={{ visibility: !value ? "visible" : "hidden" }}
              key={key}
            >
              <CellNote key={key} note={note} cell={cell}></CellNote>
            </div>
          ))}
      </div>
      <div
        className={
          "mt-[-.5px] grid grid-cols-3 grid-rows-3 h-full w-full relative"
        }
      >
        {!editing &&
          !value &&
          cellNotes.map((note, key) => (
            <div
              style={{
                visibility: note.visible ? "visible" : "hidden",
                pointerEvents: "none",
              }}
              key={key}
              className="cellNote flex hover:bg-gray-400  text-gray-400 items-center justify-center cursor-pointer select-none text-center"
            >
              {note.cellNoteNumber}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cell;
