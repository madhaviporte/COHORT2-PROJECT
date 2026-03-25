type Props = {
  setView: (view: "kanban" | "list" | "timeline") => void;
  addTask: () => void;
  generateTasks: () => void;
};

export default function ViewButtons({
  setView,
  addTask,
  generateTasks,
}: Props) {
  return (
    <div className="flex gap-3 mb-6 justify-center flex-wrap">

      {/* VIEW BUTTONS */}
      <button
        onClick={() => setView("kanban")}
        className="px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600 active:scale-95 transition"
      >
        Kanban
      </button>

      <button
        onClick={() => setView("list")}
        className="px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600 active:scale-95 transition"
      >
        List
      </button>

      <button
        onClick={() => setView("timeline")}
        className="px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600 active:scale-95 transition"
      >
        Timeline
      </button>

      {/* ADD TASK */}
      <button
        onClick={addTask}
        className="px-4 py-2 bg-blue-700 rounded-full hover:bg-blue-600 active:scale-95 transition"
      >
        + Add Task
      </button>

      {/* GENERATE TASKS */}
      <button
        onClick={generateTasks}
        className="px-4 py-2 bg-purple-700 rounded-full hover:bg-purple-600 active:scale-95 transition"
      >
        Generate 500 Tasks
      </button>

    </div>
  );
}