import type { Task } from "../types";

export default function ListView({ tasks }: { tasks: Task[] }) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="p-3 border mb-2">
          <h3>{task.title}</h3>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}