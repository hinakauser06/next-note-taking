import { create } from "zustand";

type NoteStore = {
  notes: [];
  addNote: (note: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  updateNote: (id: string) => Promise<void>;
  getNotes: () => Promise<void>;
  alert: Boolean;
  alertMessage: string;
  setAlert: (val: boolean) => void;
};

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  alert: false,
  alertMessage: "",
  setAlert: (val) => {
    set({ alert: val });
  },
  getNotes: async () => {
    const res = await fetch("/api/note");
    const data = await res.json();
    set({ notes: data });
  },
  addNote: async (note) => {
    await fetch("/api/note", {
      method: "POST",
      body: note,
    });
    useNoteStore.getState().getNotes();
    set({ alertMessage: "New task added.", alert: true })
  },
  deleteNote: async (id) => {
    await fetch(`/api/note`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note_id: id,
      }),
    });
    useNoteStore.getState().getNotes();
    set({ alertMessage: "task deleted.", alert: true })
  },
  updateNote: async (id) => {
    await fetch("/api/note", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note_id: id,
      }),
    });
    useNoteStore.getState().getNotes();
    set({ alertMessage: "New updated.", alert: true })
  },
}));
