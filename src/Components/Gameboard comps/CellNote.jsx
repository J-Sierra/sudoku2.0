import { useSudokuContext } from "../../Context/SudokuContext.jsx";

const CellNote = ({ cell, note }) => {
  const { handleCellNoteClick } = useSudokuContext();

  return (
    <div
      onClick={() => handleCellNoteClick(cell, note.cellNoteNumber)}
      className=" cellNote flex hover:bg-gray-400 items-center justify-center cursor-pointer select-none bg-neutral-600 text-center"
    >
      {note.cellNoteNumber}
    </div>
  );
};
export default CellNote;
