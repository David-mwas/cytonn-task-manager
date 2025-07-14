const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  updateStatus,
} = require("../controllers/taskController");

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id/status", protect, updateStatus);

module.exports = router;
