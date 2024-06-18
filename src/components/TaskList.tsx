import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { useNoteStore } from  "../store/note";

export default function TaskList() {
  const {getNotes: handleAddToCart, notes} = useNoteStore();

  useEffect(() => {
    handleAddToCart();
    return () => {
    };
  }, []);
  return (
    <>
      <ul className="list-decimal px-10 py-3">
        {notes?.data &&
          notes?.data.map((note) => (
            <li className="group/item py-3" key={note.data}>
              <TaskCard noteData={note} />
            </li>
          ))}
      </ul>
    </>
  );
}
