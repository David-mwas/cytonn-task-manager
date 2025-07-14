const User = require("../models/User");

exports.getUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.json(users);
};

exports.updateUser = async (req, res) => {
  const { name, email } = req.body;
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    { name, email },
    { new: true }
  );
  res.json(updated);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
