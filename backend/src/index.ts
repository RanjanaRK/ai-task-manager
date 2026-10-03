import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/db";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

// Test route
app.get("/", (req: any, res: any) => {
  res.status(200).json({
    success: true,
    message: "AI Task Manager API is running",
  });
});

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
