// src/components/user/UserTaskList.tsx
import type { Task } from "../../types/types";
import { api } from "../../lib/fetch";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UserTaskList({
  tasks,
  refresh,
}: {
  tasks: Task[];
  refresh: () => void;
}) {
  const [loadingTaskId, setLoadingTaskId] = useState<string | null>(null); 
 const updateStatus = async (id: string, status: Task["status"]) => {
   setLoadingTaskId(id);
   try {
     await toast.promise(
       api.put(`/tasks/${id}/status`, { status }).then(() => refresh()),
       {
         loading: "Updating task...",
         success: "Task status updated",
         error: "Failed to update task status",
       }
     );
   } finally {
     setLoadingTaskId(null);
   }
 };

  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500 py-12">
        You have no tasks assigned.
      </p>
    );
  }

  return (
    <ul className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => {
        const badgeColor =
          task.status === "Completed"
            ? "bg-green-100 text-green-700"
            : task.status === "In Progress"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-gray-100 text-gray-700";

        return (
          <li
            key={task._id}
            className="bg-white shadow hover:shadow-md transition p-5 rounded-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}
              >
                {task.status}
              </span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-xs text-gray-500">
                Due: {new Date(task.deadline).toLocaleDateString()}
              </p>
              <select
                disabled={loadingTaskId === task._id}
                value={task.status}
                onChange={(e) =>
                  updateStatus(task._id, e.target.value as Task["status"])
                }
                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
