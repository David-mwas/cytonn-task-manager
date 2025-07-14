// src/pages/admin/dashboard.tsx
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../lib/fetch";

import type { Task, User } from "../../types/types";
import TaskForm from "../../components/admin/TaskForm";
import TaskList from "../../components/admin/TaskList";
import DashboardHeader from "../../components/admin/DashboardHeader";
import Modal from "../../components/admin/Modal";
import UserManagement from "../../components/admin/UserList";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [view, setView] = useState<"tasks" | "users">("tasks");
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchData = async () => {
    setUsers(await api.get("/users"));
    setTasks(await api.get("/tasks"));
  };
  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-white w-64 p-4 flex-col justify-between shadow
          transform md:translate-x-0 transition-transform duration-200 mt-[80px] z-50 h-[90vh]  flex py-12
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:static md:flex`}
      >
        <nav className="space-y-6">
          <button
            className={`w-full text-left px-3 py-2 rounded ${
              view === "tasks" ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
            onClick={() => setView("tasks")}
          >
            📝 Task Management
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded ${
              view === "users" ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
            onClick={() => setView("users")}
          >
            👤 User Management
          </button>
        </nav>
        <button
          onClick={logout}
          className="mt-4 w-full bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <DashboardHeader
          title="Admin Dashboard"
          user={user}
          onLogout={logout}
          onHamburgerClick={() => setSidebarOpen((s) => !s)}
        />

        {view === "tasks" && (
          <div className="mb-6 flex justify-end mt-[60px]">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Add a New Task
            </button>
          </div>
        )}

        {view === "tasks" ? (
          <TaskList tasks={tasks} users={users} refresh={fetchData} />
        ) : (
          <UserManagement users={users} refresh={fetchData} />
        )}

        {/* New Task Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Assign a New Task"
        >
          <TaskForm
            users={users}
            onTaskCreated={() => {
              fetchData();
              setIsModalOpen(false);
            }}
          />
        </Modal>
      </main>
    </div>
  );
}
