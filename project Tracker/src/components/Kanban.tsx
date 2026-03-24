import type { Task } from "../types";
import React from "react";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const columns = [
  { key: "todo", label: "To Do" },
  { key: "in-progress", label: "In Progress" },
  { key: "review", label: "In Review" },
  { key: "done", label: "Done" },
] as const;

export default function Kanban({ tasks, setTasks }: Props) {

  // ✅ EDIT FUNCTION
  const handleEdit = (task: Task) => {
    const newTitle = prompt("Edit task title:", task.title);

    if (!newTitle) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, title: newTitle } : t
      )
    );
  };

  return (
    <div className="flex gap-4">
      {columns.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.key);

        return (
          <div
            key={col.key}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const id = e.dataTransfer.getData("taskId");

              setTasks((prev) =>
                prev.map((task) =>
                  task.id === id
                    ? { ...task, status: col.key }
                    : task
                )
              );

              console.log("Dropped:", id, "to", col.key);
            }}
            className="flex-1 bg-gray-900 p-4 rounded-xl min-h-96"
          >
            {/* Column Header */}
            <h3 className="font-bold mb-4">
              {col.label} ({colTasks.length})
            </h3>

            {/* Empty State */}
            {colTasks.length === 0 && (
              <p className="text-gray-100 text-sm">No tasks</p>
            )}

            {/* Cards */}
            {colTasks.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("taskId", task.id);
                }}
                className="bg-white text-black font-bold p-3 mb-3 rounded-lg shadow hover:shadow-md transition"
              >
                <h4 className="font-semibold">{task.title}</h4>

                <p className="text-sm text-gray-600">
                  👤 {task.assignee}
                </p>

                <p className="text-sm">
                  ⚡{" "}
                  <span
                    className={
                      task.priority === "critical"
                        ? "text-red-500"
                        : task.priority === "high"
                        ? "text-orange-500"
                        : task.priority === "medium"
                        ? "text-blue-500"
                        : "text-green-500"
                    }
                  >
                    {task.priority}
                  </span>
                </p>

                <p className="text-sm text-gray-500">
                  📅 {new Date(task.dueDate).toDateString()}
                </p>

                {/* ✅ BUTTONS */}
                <div className="mt-2">
                  <button
                    onClick={() => {
                      setTasks((prev) =>
                        prev.filter((t) => t.id !== task.id)
                      );
                    }}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleEdit(task)}
                    className="ml-3 text-blue-500 text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}