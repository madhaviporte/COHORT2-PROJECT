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
  const [status, setStatus] = useState<
    "todo" | "in-progress" | "review" | "done"
  >("todo");

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // ✅ FILTER STATES
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [assigneeFilter, setAssigneeFilter] = useState<string[]>([]);

  // ✅ LIVE USERS (COLLABORATION)
  const [users, setUsers] = useState([
    { id: "u1", name: "A", color: "bg-red-500", taskId: "1" },
    { id: "u2", name: "B", color: "bg-green-500", taskId: "2" },
    { id: "u3", name: "C", color: "bg-blue-500", taskId: "1" },
  ]);

  // ✅ RANDOM DATA GENERATOR
  const statuses = ["todo", "in-progress", "review", "done"] as const;
  const priorities = ["low", "medium", "high", "critical"] as const;

  const generateTasks = () => {
    return Array.from({ length: 500 }, (_, i) => ({
      id: i.toString(),
      title: `Task ${i}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      assignee: `${Math.floor(Math.random() * 6)}`,
      dueDate: new Date(
        Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
    }));
  };

  // ✅ DEFAULT DATA
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

  // ✅ SIMULATE LIVE USERS
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers((prev) =>
        prev.map((user) => {
          const randomTask =
            tasks[Math.floor(Math.random() * tasks.length)];
          return {
            ...user,
            taskId: randomTask?.id || user.taskId,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [tasks]);

  // ✅ ADD TASK
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

    setTitle("");
    setAssignee("");
    setStatus("todo");
  };

  // ✅ UPDATE TASK
  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setEditingTask(null);
  };

  // ✅ FILTER LOGIC
  const filteredTasks = tasks.filter((task) => {
    return (
      (statusFilter.length === 0 || statusFilter.includes(task.status)) &&
      (priorityFilter.length === 0 ||
        priorityFilter.includes(task.priority)) &&
      (assigneeFilter.length === 0 ||
        assigneeFilter.includes(task.assignee))
    );
  });

  // ✅ URL SYNC
  useEffect(() => {
    const params = new URLSearchParams();

    if (statusFilter.length) params.set("status", statusFilter.join(","));
    if (priorityFilter.length)
      params.set("priority", priorityFilter.join(","));
    if (assigneeFilter.length)
      params.set("assignee", assigneeFilter.join(","));

    window.history.replaceState({}, "", "?" + params.toString());
  }, [statusFilter, priorityFilter, assigneeFilter]);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-6">
      <div className="w-full max-w-6xl flex flex-col items-center">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6 text-center">
          Project Tracker
        </h1>

        {/* 🔥 LIVE USERS BAR */}
        <div className="flex gap-2 mb-4 items-center">
          <span>{users.length} people viewing</span>
          {users.map((u) => (
            <div
              key={u.id}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${u.color}`}
            >
              {u.name}
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <ViewButtons
          setView={setView}
          addTask={addTask}
          generateTasks={() => setTasks(generateTasks())}
        />

        {/* FILTER BAR */}
        <div className="flex gap-2 mb-4 flex-wrap justify-center">

          <select
            onChange={(e) =>
              setStatusFilter(e.target.value ? [e.target.value] : [])
            }
            className="px-3 py-2 bg-gray-700 rounded"
          >
            <option value="">All Status</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>

          <select
            onChange={(e) =>
              setPriorityFilter(e.target.value ? [e.target.value] : [])
            }
            className="px-3 py-2 bg-gray-700 rounded"
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          <input
            placeholder="Assignee"
            onChange={(e) =>
              setAssigneeFilter(e.target.value ? [e.target.value] : [])
            }
            className="px-3 py-2 bg-gray-700 rounded"
          />

          {/* CLEAR */}
          {(statusFilter.length ||
            priorityFilter.length ||
            assigneeFilter.length) > 0 && (
            <button
              onClick={() => {
                setStatusFilter([]);
                setPriorityFilter([]);
                setAssigneeFilter([]);
              }}
              className="px-3 py-2 bg-red-600 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* ADD TASK INPUTS */}
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
            className="px-3 py-2 rounded bg-gray-700 text-white"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* CONTENT */}
        <div className="w-full bg-gray-800 p-4 rounded-xl">
          {view === "kanban" && (
            <Kanban
              tasks={filteredTasks}
              setTasks={setTasks}
              setEditingTask={setEditingTask}
              users={users}
            />
          )}

          {view === "list" && <ListView tasks={filteredTasks} />}

          {view === "timeline" && (
            <TimelineView tasks={filteredTasks} />
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 p-6 rounded-xl w-96">

            <h2 className="text-xl font-bold mb-4">Edit Task</h2>

            <input
              className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
            />

            <input
              className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
              value={editingTask.assignee}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  assignee: e.target.value,
                })
              }
            />

            <select
              className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
              value={editingTask.status}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  status: e.target.value as Task["status"],
                })
              }
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 bg-gray-600 rounded"
                onClick={() => setEditingTask(null)}
              >
                Cancel
              </button>

              <button
                className="px-3 py-1 bg-blue-600 rounded"
                onClick={() => updateTask(editingTask)}
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;