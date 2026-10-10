import { TaskModel } from "../models/task.model.js";

const createTaskFn = async (userId: string, data: any) => {
  try {
    const taskData = { ...data };

    delete taskData.taskCode;
    delete taskData.userId;
    delete taskData._id;

    const task = await TaskModel.create({
      ...taskData,
      userId,
    });

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

    const query: any = { userId };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;

    if (due) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (due === "overdue") {
        query.dueDate = { $lt: today, $ne: null };
      } else if (due === "today") {
        query.dueDate = { $gte: today, $lt: tomorrow };
      } else if (due === "upcoming") {
        query.dueDate = { $gte: tomorrow };
      } else if (due === "no-due-date") {
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

const updateTaskFn = async (userId: string, taskCode: string, data: any) => {
  try {
    const { taskCode: ignoredTaskCode, ...inputData } = data;

    const updateData: any = {};

    const allowedFields = [
      "title",
      "description",
      "priority",
      "status",
      "category",
      "dueDate",
    ];

    for (const field of allowedFields) {
      if (inputData[field] !== undefined) {
        updateData[field] = inputData[field];
      }
    }

    const task = await TaskModel.findOneAndUpdate(
      {
        taskCode: taskCode.trim().toUpperCase(),
        userId,
      },
      { $set: updateData },
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

const deleteTaskFn = async (userId: string, taskCode: string) => {
  try {
    const task = await TaskModel.findOne({
      taskCode: taskCode.trim().toUpperCase(),
      userId,
    });

    if (!task) {
      return {
        message: "Task not found",
        task: null,
      };
    }

    await TaskModel.deleteOne({ _id: task._id, userId });

    return {
      message: "Task deleted successfully",
      task,
    };
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export { createTaskFn, deleteTaskFn, getTasksFn, updateTaskFn };
