import { TaskModel } from "../models/task.model";

type Task = {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  status?: "todo" | "in-progress" | "completed";
  category?: "work" | "personal" | "study" | "other";
  dueDate?: string | null;
};
const createTaskFn = async (userId: string, data: any) => {
  try {
    const task = await TaskModel.create({ ...data, userId });

    return {
      message: "Task created successfully",
      task,
    };
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

const getTasksFn = async (userId: string, filters: any = {}) => {
  try {
    const { status, priority, category, due } = filters;

    const query: any = {
      userId,
    };

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    if (category) {
      query.category = category;
    }

    if (due) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (due === "overdue") {
        query.dueDate = {
          $lt: today,
          $ne: null,
        };
      }

      if (due === "today") {
        query.dueDate = {
          $gte: today,
          $lt: tomorrow,
        };
      }

      if (due === "upcoming") {
        query.dueDate = {
          $gte: tomorrow,
        };
      }

      if (due === "no-due-date") {
        query.$or = [{ dueDate: null }, { dueDate: { $exists: false } }];
      }
    }

    const tasks = await TaskModel.find(query).sort({
      createdAt: -1,
    });

    return {
      message: "Tasks fetched successfully",
      tasks,
    };
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch tasks");
  }
};

const updateTaskFn = async (userId: string, taskId: string, data: any) => {
  try {
    const { taskId: _, ...updateData } = data;

    const task = await TaskModel.findOneAndUpdate(
      { _id: taskId, userId },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!task) {
      return {
        message: "Task not found",
        task: null,
      };
    }

    return {
      message: "Task updated successfully",
      task,
    };
  } catch (error: any) {
    throw new Error(error.message || "Failed to update task");
  }
};

const deleteTaskFn = async (userId: string, taskId: string) => {
  try {
    const task = await TaskModel.findOneAndDelete({ _id: taskId, userId });
    return {
      message: "Task deleted successfully",
      task,
    };
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export { createTaskFn, deleteTaskFn, getTasksFn, updateTaskFn };
