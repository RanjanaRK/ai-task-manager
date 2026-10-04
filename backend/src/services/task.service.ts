import { TaskModel } from "../models/task.model";

type Task = {
  title: string;
  description: string;
  priority: string;
  status: string;
  category: string;
  dueDate: string;
};

const createTask = async (userId: string, data: any) => {
  try {
    const task = await TaskModel.create({ ...data, userId });

    return {
      message: "Task created successfully",
      task,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

const getTasks = async (userId: string) => {
  try {
    const tasks = await TaskModel.find({ userId });
    return {
      message: "Tasks fetched successfully",
      tasks,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateTask = async (userId: string, taskId: string, data: any) => {
  try {
    const task = await TaskModel.findOneAndUpdate({ userId, taskId }, data, {
      new: true,
    });
    return {
      message: "Task updated successfully",
      task,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

const deleteTask = async (userId: string, taskId: string) => {
  try {
    const task = await TaskModel.findOneAndDelete({ userId, taskId });
    return {
      message: "Task deleted successfully",
      task,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export { createTask, getTasks, updateTask, deleteTask };
