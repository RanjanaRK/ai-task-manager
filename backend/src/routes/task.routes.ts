import express from "express";
import { authCheck } from "../middlewares/auth.js";
import {
  createTask,
  deleteTask,
  updateTask,
  getTasks,
} from "../controllers/task.controller.js";

const taskRouter = express.Router();

taskRouter.post("/add", authCheck, createTask);

taskRouter.get("/", authCheck, getTasks);

taskRouter.delete("/delete/:taskId", authCheck, deleteTask);

taskRouter.put("/update/:taskId", authCheck, updateTask);

export default taskRouter;
