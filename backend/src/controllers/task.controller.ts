// import { Request, Response } from "express";
// import { TaskModel } from "../models/task.model";

// export const createTask = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user?.id;
//     const { title, description, priority, status, category, dueDate } =
//       req.body;

//     const task = await TaskModel.create({
//       title,
//       description,
//       priority,
//       status,
//       category,
//       dueDate,
//       userId,
//     });

//     return res.status(201).json({ message: "Task created successfully", task });
//   } catch (error) {
//     return res.status(500).json({ message: "something went wrong" });
//   }
// };

// export const getTasks = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user?.id;

//     const tasks = await TaskModel.find({ userId }).sort({ createdAt: -1 });

//     return res
//       .status(200)
//       .json({ message: "Tasks fetched successfully", tasks });
//   } catch (error) {
//     return res.status(500).json({ message: "something went wrong" });
//   }
// };

// export const deleteTask = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user?.id;
//     const { taskId } = req.params;

//     const task = await TaskModel.findOneAndDelete({
//       _id: taskId,
//       userId,
//     });

//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     return res.status(200).json({ message: "Task deleted successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "something went wrong" });
//   }
// };

// export const updateTask = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user?.id;
//     const { taskId } = req.params;
//     const { title, description, priority, status, category, dueDate } =
//       req.body;

//     const task = await TaskModel.findByIdAndUpdate(
//       {
//         _id: taskId,
//         userId,
//       },
//       {
//         title,
//         description,
//         priority,
//         status,
//         category,
//         dueDate,
//       },
//     );

//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     return res.status(200).json({ message: "Task updated successfully", task });
//   } catch (error) {
//     return res.status(500).json({ message: "something went wrong" });
//   }
// };

import { Request, Response } from "express";
import { TaskModel } from "../models/task.model";

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, description, priority, status, category, dueDate } =
      req.body;

    const task = await TaskModel.create({
      title,
      description,
      priority,
      status,
      category,
      dueDate,
      userId,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tasks = await TaskModel.find({ userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { taskId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const task = await TaskModel.findOneAndDelete({
      _id: taskId,
      userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { taskId } = req.params;
    const { title, description, priority, status, category, dueDate } =
      req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updateData = {
      title,
      description,
      priority,
      status,
      category,
      dueDate,
    };

    const task = await TaskModel.findOneAndUpdate(
      { _id: taskId, userId },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
