import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createTask,
  getTasks,
  getUserTasks,
  updateStatus,
}  from "../controllers/taskController.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
// New: tasks for the logged‑in user
router.get("/mytasks", protect, getUserTasks);
router.put("/:id/status", protect, updateStatus);

export default router;
