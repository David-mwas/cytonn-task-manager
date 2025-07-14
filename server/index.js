const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// middlewares routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/users", require("./routes/users"));
app.use("/api/v1/tasks", require("./routes/tasks"));

// home route
app.get("/", (req, res) => {
  res.send("Hello from cytonn-task-manager!");
});

const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
