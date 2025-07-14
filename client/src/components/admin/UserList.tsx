// components/admin/UserManagement.tsx
import { useState } from "react";
import type { User } from "../../types/types";
import { api } from "../../lib/fetch";
import Modal from "./Modal";

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

    if (editingUser) {
      // UPDATE existing user
      await api.put(`/users/${editingUser._id}`, {
        email: formData.email,
        role: formData.role,
      });
    } else {
      // REGISTER new user via auth endpoint
      await api.post("/auth/register", {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
    }

    setShowModal(false);
    refresh();
  };

  const deleteUser = async (id: string) => {
    if (confirm("Delete this user?")) {
      await api.delete(`/users/${id}`);
      refresh();
    }
  };

  const filtered = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Users</h2>
        <button
          onClick={openAddModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add User
        </button>
      </div>

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="bg-white shadow rounded divide-y divide-gray-200">
        {filtered.map((u) => (
          <li key={u._id} className="flex justify-between items-center p-4">
            <div>
              <p className="font-medium">{u.email}</p>
              <p className="text-sm text-gray-500">{u.role}</p>
            </div>
            <div className="space-x-2">
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
      </ul>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingUser ? "Edit User" : "Add New User"}
      >
        <form onSubmit={saveUser} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
          </div>

          {!editingUser && (
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as "admin" | "user",
                })
              }
              className="w-full border p-2 rounded"
            >
              <option value="user">User</option>
              {/* <option value="admin">Admin</option> */}
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingUser ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
