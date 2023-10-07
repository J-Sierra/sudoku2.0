const CellNote = ({ cell, note }) => {
  return (
    <div className=" cellNote hover:bg-gray-400 items-center justify-center cursor-pointer select-none bg-neutral-600 text-center">
      {note.cellNoteNumber}
    </div>
  );
};
export default CellNote;
