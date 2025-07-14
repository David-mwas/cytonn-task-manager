const router = require("express").Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");
const {
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", protect, isAdmin, getUsers);
router.put("/:id", protect, isAdmin, updateUser);
router.delete("/:id", protect, isAdmin, deleteUser);

module.exports = router;
