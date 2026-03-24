type Props = {
  setView: (view: "kanban" | "list" | "timeline") => void;
  addTask: () => void;
};

export default function ViewButtons({ setView }: Props) {
  return (
    <div className="flex gap-3 mb-6 justify-center flex-wrap ">
      <button
        onClick={() => setView("kanban")}
        className="px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600 active:scale-98"
      >
        Kanban
      </button>

      <button
        onClick={() => setView("list")}
        className="px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600 active:scale-98"
      >
        List
      </button>

      <button
        onClick={() => setView("timeline")}
        className="px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600 active:scale-98"
      >
        Timeline
      </button>

      {/* <button
        onClick={addTask}
        className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-500 active:scale-98"
      >
        + Add Task
      </button> */}
    </div>
  );
}