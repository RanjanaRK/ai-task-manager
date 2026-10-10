import { randomBytes } from "crypto";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskCode: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      trim: true,
      default: () => `TSK-${randomBytes(6).toString("hex").toUpperCase()}`,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },

    category: {
      type: String,
      enum: ["work", "personal", "study", "other"],
      default: "other",
    },

    dueDate: {
      type: Date,
      default: null,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const TaskModel = mongoose.model("Task", taskSchema);
