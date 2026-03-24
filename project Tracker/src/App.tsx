import { useState, useEffect } from "react";
import type { Task } from "./types";
import Kanban from "./components/Kanban";
import ListView from "./components/ListView";
import TimelineView from "./components/TimelineView";
import ViewButtons from "./components/ViewButtons";

function App() {
  const [view, setView] = useState<"kanban" | "list" | "timeline">("kanban");

  const [tasks, setTasks] = useState<Task[]>([]);

const [title, setTitle] = useState("");
const [assignee, setAssignee] = useState("");
const [status, setStatus] = useState<"todo" | "in-progress" | "review" | "done">("todo");

  useEffect(() => {
    setTasks([
      {
        id: "1",
        title: "Build UI",
        status: "todo",
        priority: "high",
        assignee: "1",
        dueDate: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Fix Bugs",
        status: "in-progress",
        priority: "medium",
        assignee: "2",
        dueDate: new Date().toISOString(),
      },
    ]);
  }, []);

  const addTask = () => {
    if (!title.trim()) return;

  const newTask: Task = {
    id: Date.now().toString(),
    title,
    status,
    priority: "medium",
    assignee,
    dueDate: new Date().toISOString(),
  };

  setTasks((prev) => [...prev, newTask]);

  // reset fields
  setTitle("");
  setAssignee("");
  setStatus("todo");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-6">
      
      {/* Main Container */}
      <div className="w-full max-w-6xl flex flex-col items-center">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 text-center">
          Project Tracker
        </h1>

        {/* Buttons (Centered) */}
        {/* <div className="flex gap-3 mb-6 justify-center flex-wrap rou">
          <button
            onClick={() => setView("kanban")}
            className="px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600"
          >
            Kanban
          </button>

          <button
            onClick={() => setView("list")}
            className="px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600"
          >
            List
          </button>

          <button
            onClick={() => setView("timeline")}
            className="px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600"
          >
            Timeline
          </button>

          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-500"
          >
            + Add Task
          </button>
        </div> */}
        <ViewButtons setView={setView} addTask={addTask} />

        <div className="flex gap-2 mb-6 flex-wrap justify-center">
  <input
    type="text"
    placeholder="Task Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="px-3 py-2 rounded bg-gray-700 text-white"
  />

  <input
    type="text"
    placeholder="Assignee"
    value={assignee}
    onChange={(e) => setAssignee(e.target.value)}
    className="px-3 py-2 rounded bg-gray-700 text-white"
  />

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value as any)}
    className="px-8 py-2 rounded bg-gray-700 text-white"
  >
    <option value="todo">Todo</option>
    <option value="in-progress">In Progress</option>
    <option value="review">Review</option>
    <option value="done">Done</option>
  </select>

  <button
    onClick={addTask}
    className="px-4 py-2 bg-blue-900 rounded-full hover:bg-blue-800 active:scale-95"
  >
    + Add Task
  </button>
</div>

        {/* Content Area */}
        <div className="w-full bg-gray-800 p-4 rounded-xl">
          {view === "kanban" && (
            <Kanban tasks={tasks} setTasks={setTasks} />
          )}
          {view === "list" && <ListView tasks={tasks} />}
          {view === "timeline" && <TimelineView tasks={tasks} />}

        </div>

      </div>
    </div>
  );
}

export default App;