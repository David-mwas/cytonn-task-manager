import User from "../models/User.model.js";

export const getUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.json(users);
};

export const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    { name, email },
    { new: true }
  );
  res.json(updated);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
