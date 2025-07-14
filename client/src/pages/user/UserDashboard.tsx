
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../lib/fetch";
import type { Task } from "../../types/types";
import DashboardHeader from "../../components/shared/DashboardHeader";
import UserTaskList from "../../components/admin/UserTaskList";

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    const all = await api.get("/tasks");
    setTasks(
      all.filter((t: Task) =>
        typeof t.assignedTo === "object"
          ? t.assignedTo._id === user?._id
          : t.assignedTo === user?._id
      )
    );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader user={user} onLogout={logout} title="My Tasks" />

      <main className="pt-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            🔍
          </span>
        </div>

        <UserTaskList tasks={filtered} refresh={fetchTasks} />
      </main>
    </div>
  );
}
