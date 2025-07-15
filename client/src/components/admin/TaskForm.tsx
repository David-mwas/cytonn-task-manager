import { useState } from "react";
import { api } from "../../lib/fetch";
import type { User } from "../../types/types";
import { toast } from "react-hot-toast";

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
    if (!title || !desc || !assignee || !deadline) {
      toast.error("All fields are required");
      return;
    }
    if (title.length < 3) {
      toast.error("Title must be at least 3 characters long");
      return;
    }
    if (new Date(deadline) < new Date()) {
      toast.error("Deadline cannot be in the past");
      return;
    }

    // Show loading, success, and error using toast.promise
    await toast.promise(
      api.post("/tasks", {
        title,
        description: desc,
        assignedTo: assignee,
        deadline,
      }),
      {
        loading: "Creating task...",
        success: "Task created successfully and email sent!",
        error: "Failed to create task",
      }
    );

    setTitle("");
    setDesc("");
    setAssignee("");
    setDeadline("");
    onTaskCreated();
  };

  return (
    <>
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
    </>
  );
}
