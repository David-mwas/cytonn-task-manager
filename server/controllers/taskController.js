const Task = require("../models/Task.model");
const User = require("../models/User.model");
const sendEmail = require("../utils/sendEmail");

exports.createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, createdBy: req.user.id });
  const assignedUser = await User.findById(req.body.assignedTo);
  await sendEmail(
    assignedUser.email,
    "New Task Assigned",
    `You have a new task: ${task.title}`
  );
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const query = req.user.role === "admin" ? {} : { assignedTo: req.user.id };
  const tasks = await Task.find(query).populate("assignedTo", "name email");
  res.json(tasks);
};

exports.updateStatus = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (req.user.role !== "admin" && String(task.assignedTo) !== req.user.id)
    return res.status(403).json({ message: "Not your task" });

  task.status = req.body.status;
  await task.save();
  res.json(task);
};
