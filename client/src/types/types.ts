// src/types.ts

export type UserRole = "admin" | "user";

export type User = {
  _id: string;
  email: string;
  role: UserRole;
};

export type TaskStatus = "Pending" | "In Progress" | "Completed";

export type Task = {
  _id: string;
  title: string;
  description: string;
  assignedTo: User; // userId
  status: TaskStatus;
  deadline: string;
};
