import { useNoteStore } from  "../store/note";

export default function TaskCard(props: any) {
  const {deleteNote, updateNote} = useNoteStore();
  const { noteData } = props;
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className={noteData.done ? "line-through" : ""}>
          {noteData.data}
        </span>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="group/edit invisible group-hover/item:visible ..."
        >
          {!noteData.done && (
            <button
              onClick={() => updateNote(noteData._id)}
              className="text-cyan-500 px-2"
            >
              Done
            </button>
          )}
          <button
            onClick={() => deleteNote(noteData._id)}
            className="text-rose-500	px-2"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
