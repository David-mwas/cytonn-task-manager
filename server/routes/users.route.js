import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, isAdmin, getUsers);
router.put("/:id", protect, isAdmin, updateUser);
router.delete("/:id", protect, isAdmin, deleteUser);

export default router;
