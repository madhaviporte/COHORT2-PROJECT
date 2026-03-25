import { useState } from "react";
import type { Task } from "../types";

type Props = {
  tasks: Task[];
};

const ROW_HEIGHT = 60; // ek row ki height
const VISIBLE_COUNT = 10; // screen pe kitne rows dikhenge
const BUFFER = 5; // smooth scrolling ke liye extra rows

export default function ListView({ tasks }: Props) {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = tasks.length * ROW_HEIGHT;

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ROW_HEIGHT) - BUFFER
  );

  const endIndex = Math.min(
    tasks.length,
    startIndex + VISIBLE_COUNT + BUFFER
  );

  const visibleTasks = tasks.slice(startIndex, endIndex);

  return (
    <div
      className="h-86 overflow-y-auto bg-gray-900 rounded-xl"
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      {/* Fake full height */}
      <div style={{ height: totalHeight, position: "relative" }}>

        {visibleTasks.map((task, i) => {
          const index = startIndex + i;

          return (
            <div
              key={task.id}
              style={{
                position: "absolute",
                top: index * ROW_HEIGHT,
                left: 0,
                right: 0,
                height: ROW_HEIGHT,
              }}
              className="flex items-center justify-between px-4 border-b border-gray-700 text-white"
            >
              <span>{task.title}</span>
              <span>{task.assignee}</span>
              <span>{task.priority}</span>
              <span>
                {new Date(task.dueDate).toDateString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}