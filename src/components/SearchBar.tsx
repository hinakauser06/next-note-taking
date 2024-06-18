import { useState } from "react";
import { useNoteStore } from "../store/note";

export default function SearchBar() {
  const { addNote } = useNoteStore();
  const [note, setNote] = useState("");
  const createNote = async () => {
    await addNote(note);
    setNote("");
  };
  const cut = () => setNote("");

  return (
    <>
      <div className="flex items-center border-b border-teal-500 py-2 px-5 ">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Add Note"
        />
        {note && (
          <button
            className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
            type="button"
            onClick={cut}
          >
            cut
          </button>
        )}
        <button
          onClick={createNote}
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
        >
          Add
        </button>
      </div>
    </>
  );
}
