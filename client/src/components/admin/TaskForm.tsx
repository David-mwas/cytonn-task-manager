// components/Admin/TaskAssignmentForm.tsx
import { useState } from "react";
import { api } from "../../lib/fetch";
import type { User } from "../../types/types";

export default function TaskAssignmentForm({
  users,
  onTaskCreated,
}: {
  users: User[];
  onTaskCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [assignee, setAssignee] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
    onTaskCreated();
  };

  return (
    <form
      onSubmit={handleSubmit}
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
          <option key={u._id} value={u._id}>
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
      <button className="col-span-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Assign Task
      </button>
    </form>
  );
}
