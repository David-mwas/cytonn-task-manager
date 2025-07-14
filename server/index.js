import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import usersRoute from "./routes/users.route.js";
import tasksRoute from "./routes/tasks.route.js";
import connectDB from "./config/db.js";

dotenv.config();
console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);

const app = express();

//middlewares;
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/tasks", tasksRoute);

// home route
app.get("/", (req, res) => {
  res.send("Hello from cytonn-task-manager!");
});

// error handling
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 5000;
const startSever = async () => {
  try {
    await connectDB();

    // listen for local development
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () =>
        console.info(`server running on http://localhost:${PORT}`)
      );
    }
  } catch (error) {
    console.error("Error", error);
    process.exit(1);
  }
};

startSever();

// export for vercel
export default app;
