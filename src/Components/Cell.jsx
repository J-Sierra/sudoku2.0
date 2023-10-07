import React, { useState } from "react";
import CellNote from "./CellNote.jsx";
import BubbleRing from "./BubbleRing.jsx";

const Cell = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const { value, editable, cellNotes, correct, conflicting } = cell;

  return (
    <div
      onClick={editable ? () => setEditing(!editing) : null}
      className={`cell ${!editable ? "font-bold bg-gray-200" : "bg-white"}
        ${correct ? null : "bg-red-500"} 
        ${conflicting ? "bg-red-300" : ""}
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
              className="cellNote flex hover:bg-gray-400 items-center justify-center cursor-pointer select-none text-center"
            >
              {note.cellNoteNumber}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cell;
