import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { useNoteStore } from  "../store/note";

export default function TaskList() {
  const {getNotes: handleAddToCart, notes} = useNoteStore();
  const notesData = notes?.data;
  useEffect(() => {
    handleAddToCart();
    return () => {
    };
  }, []);
  return (
    <>
      <ul className="list-decimal px-10 py-3">
      { notesData &&
        notesData.map((note: any) => (
            <li className="group/item py-3" key={note.data}>
              <TaskCard noteData={note} />
            </li>
          ))}
      </ul>
    </>
  );
}
