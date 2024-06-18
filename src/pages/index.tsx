import AlertCard from "@/components/Alert";
import HeaderText from "@/components/NotesHeader";
import SearchBar from "@/components/SearchBar";
import TaskList from "@/components/TaskList";
import { useNoteStore } from  "../store/note";
export default function Home() {
  const {alert} = useNoteStore();
  return (
    <div>
      <HeaderText title="My Notes" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="sm:w-11/12 lg:w-2/4 bg-slate-300 h-4/5"
          style={{ height: "50vh" }}
        >
          <SearchBar />
          { alert && <AlertCard /> }
          <TaskList />
        </div>
      </div>
    </div>
  );
}
