// src/components/admin/TaskList.tsx
import { useState } from "react";
import type { Task, User } from "../../types/types";

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

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-8">
      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     placeholder-gray-400"
        />
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          🔍
        </span>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tasks</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((task) => {
          const badgeClasses =
            task.status === "Completed"
              ? "bg-green-100 text-green-800"
              : task.status === "In progress"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800";

          return (
            <div
              key={task._id}
              className="bg-white shadow hover:shadow-lg transition p-6 rounded-lg"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {task.title}
                </h3>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${badgeClasses}`}
                >
                  {task.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{task.description}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
                <span>
                  Assigned to:{" "}
                  {users.find((u) => u._id === task.assignedTo._id)?.email ??
                    "Unassigned"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
