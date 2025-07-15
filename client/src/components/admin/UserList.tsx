import { useState } from "react";
import type { User } from "../../types/types";
import { api } from "../../lib/fetch";
import Modal from "./Modal";
import toast from "react-hot-toast";

type UserFormData = {
  email: string;
  password?: string;
  role: "admin" | "user";
};

export default function UserManagement({
  users,
  refresh,
}: {
  users: User[];
  refresh: () => void;
}) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    password: "",
    role: "user",
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({ email: "", password: "", role: "user" });
    setShowModal(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({ email: user.email, role: user.role });
    setShowModal(true);
  };

  const saveUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEditing = !!editingUser;
    const action = isEditing ? "Updating user..." : "Creating user...";

    await toast.promise(
      isEditing
        ? api.put(`/users/${editingUser._id}`, {
            email: formData.email,
            role: formData.role,
          })
        : api.post("/auth/register", {
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }),
      {
        loading: action,
        success: isEditing
          ? "User updated successfully"
          : "User created successfully",
        error: isEditing ? "Failed to update user" : "Failed to create user",
      }
    );

    setShowModal(false);
    refresh();
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Delete this user?")) return;

    await toast.promise(api.delete(`/users/${id}`), {
      loading: "Deleting user...",
      success: "User deleted successfully",
      error: "Failed to delete user",
    });

    refresh();
  };

  const filtered = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-12">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Users</h2>
        <button
          onClick={openAddModal}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow"
        >
          + Add User
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-green-500
                     placeholder-gray-400"
        />
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          🔍
        </span>
      </div>

      {/* User List */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((u) => (
          <li
            key={u._id}
            className="bg-white shadow hover:shadow-md transition p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-gray-900">{u.email}</p>
              <p className="text-sm text-gray-500">{u.role}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => openEditModal(u)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(u._id)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-500 py-8">
            No users found.
          </p>
        )}
      </ul>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingUser ? "Edit User" : "Add New User"}
      >
        <form onSubmit={saveUser} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {!editingUser && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as "admin" | "user",
                })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="user">User</option>
              {/* <option value="admin">Admin</option> */}
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded-full border border-gray-300
                         hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow"
            >
              {editingUser ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
