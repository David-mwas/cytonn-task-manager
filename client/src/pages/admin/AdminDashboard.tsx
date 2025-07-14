import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { Task, User } from "../../types/types";
import { api } from "../../lib/fetch";

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [assignee, setAssignee] = useState("");
  const [deadline, setDeadline] = useState("");

  const fetchData = async () => {
    const u = await api.get("/users");
    const t = await api.get("/tasks");
    setUsers(u);
    setTasks(t);
  };

  const assignTask = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/tasks", {
      title,
      description: desc,
      assignedTo: assignee,
      deadline,
    });
    setTitle("");
    setDesc("");
    setAssignee("");
    setDeadline("");
    fetchData();
  };

  const updateStatus = async (taskId: string, newStatus: string) => {
    await api.put(`/tasks/${taskId}`, { status: newStatus });
    fetchData();
  };

  const deleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await api.delete(`/users/${userId}`);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Logged in as: <strong>{user?.email}</strong>
          </span>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Task Assignment */}
      <section className="bg-white shadow rounded p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Assign a New Task
        </h2>
        <form
          onSubmit={assignTask}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            className="border p-2 rounded"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <select
            className="border p-2 rounded"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            required
          >
            <option value="">Assign to...</option>
            {users.map((u) => (
              <option key={u?._id} value={u?._id}>
                {u.email}
              </option>
            ))}
          </select>
          <input
            className="border p-2 rounded"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          <button className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Assign Task
          </button>
        </form>
      </section>

      {/* All Tasks */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">All Tasks</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <select
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                  value={task.status}
                  onChange={(e) => updateStatus(task._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
              <p className="text-xs text-gray-500 mb-1">
                Deadline: {new Date(task.deadline).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                Assigned to:{" "}
                {users.find((u) => u._id === task.assignedTo)?.email || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Manage Users */}
      <section className="mt-12 bg-white p-6 shadow rounded">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Manage Users
        </h2>
        <ul className="divide-y divide-gray-200">
          {users.map((u) => (
            <li key={u._id} className="py-3 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">{u.email}</p>
                <p className="text-xs text-gray-500">{u.role || "User"}</p>
              </div>
              <div className="space-x-2">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => alert("Edit feature coming soon")}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline text-sm"
                  onClick={() => deleteUser(u._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
