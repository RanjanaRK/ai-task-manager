import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req: any, res: any) => {
  res.status(200).json({
    success: true,
    message: "AI Task Manager API is running",
  });
});

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
