// components/Admin/TaskList.tsx
import type { Task, User } from "../../types/types";
import { api } from "../../lib/fetch";
import { useState } from "react";

export default function TaskList({
  tasks,
  users,
  refresh,
}: {
  tasks: Task[];
  users: User[];
  refresh: () => void;
}) {
  const [search, setSearch] = useState("");

  // const updateStatus = async (id: string, status: string) => {
  //   await api.put(`/tasks/${id}`, { status });
  //   refresh();
  // };

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );
  console.log(tasks, "tasks in tasklist");
  return (
    <div className="mt-8">
      <input
        className="w-full border p-2 px-4 rounded-3xl mb-4"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <h2 className="text-xl font-semibold mb-4 mt-6">Tasks</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((task) => (
          <div key={task._id} className="bg-white shadow rounded-lg p-4 border">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{task.title}</h3>
              {/* <select
                className="text-xs bg-gray-100 px-2 py-1 rounded"
                value={task.status}
                onChange={(e) => updateStatus(task._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select> */}
              <div
                className={`text-xs ${
                  task.status === "completed"
                    ? "bg-green-100"
                    : task.status === "in_progress"
                    ? "bg-yellow-100"
                    : "bg-red-100"
                } px-2 py-1 rounded `}
              >
                {task.status}
              </div>
            </div>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-xs text-gray-500">
              Deadline: {new Date(task.deadline).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-500">
              Assigned to: {task.assignedTo?.email || "Unassigned"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
