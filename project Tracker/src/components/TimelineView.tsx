import type { Task } from "../types";

export default function TimelineView({ tasks }: { tasks: Task[] }) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="p-3 border mb-2">
          <h3>{task.title}</h3>
          <p>Due: {new Date(task.dueDate).toDateString()}</p>
        </div>
      ))}
    </div>
  );
}