// import { Request, Response } from "express";
// import { aiInteraction } from "../services/gemini.service.js";
// import {
//   createTaskFn,
//   deleteTaskFn,
//   getTasksFn,
//   updateTaskFn,
// } from "../services/task.service.js";

// export const chatWithAI = async (req: Request, res: Response) => {
//   try {
//     const { message } = req.body;
//     const userId = req.user?.id;

//     if (!message || !message.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Message is required",
//       });
//     }

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const aiRes = await aiInteraction(message);

//     console.log("AI response:", aiRes);

//     let result = null;
//     let functionCall = null;

//     for (const step of aiRes.steps) {
//       if (step.type !== "function_call") {
//         continue;
//       }
//       functionCall = step;

//       const toolName = step.name;
//       const toolArgs = step.arguments;

//       console.log("Tool:", toolName);
//       console.log("Arguments:", toolArgs);

//       if (toolName === "create_task") {
//         result = await createTaskFn(userId, toolArgs);
//       } else if (toolName === "get_tasks") {
//         result = await getTasksFn(userId, toolArgs);
//       } else if (toolName === "update_task") {
//         result = await updateTaskFn(userId, toolArgs.taskCode, toolArgs);
//       } else if (toolName === "delete_task") {
//         result = await deleteTaskFn(userId, toolArgs.taskCode);
//       }
//     }

//     if (!functionCall) {
//       return res.status(200).json({
//         success: true,
//         message: aiRes.output_text || "I couldn't process that request.",
//         result: null,
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: result?.message || "Request completed successfully",
//       result,
//     });
//   } catch (error: any) {
//     console.log(error, ":error");

//     return res.status(500).json({
//       success: false,
//       message: error.message || "Something went wrong",
//     });
//   }
// };

import { Request, Response } from "express";
import { aiInteraction } from "../services/gemini.service.js";
import {
  createTaskFn,
  deleteTaskFn,
  getTasksFn,
  updateTaskFn,
} from "../services/task.service.js";

type TaskAction = "create" | "update" | "delete" | "get";

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const userId = req.user?.id;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const aiRes = await aiInteraction(message);

    let result: any = null;
    let action: TaskAction | null = null;

    for (const step of aiRes.steps) {
      if (step.type !== "function_call") continue;

      const toolName = step.name;
      const toolArgs = step.arguments;

      console.log("Tool:", toolName);
      console.log("Arguments:", toolArgs);

      if (toolName === "create_task") {
        result = await createTaskFn(userId, toolArgs);
        action = "create";
      } else if (toolName === "get_tasks") {
        result = await getTasksFn(userId, toolArgs);
        action = "get";
      } else if (toolName === "update_task") {
        result = await updateTaskFn(userId, toolArgs.taskCode, toolArgs);
        action = "update";
      } else if (toolName === "delete_task") {
        result = await deleteTaskFn(userId, toolArgs.taskCode);
        action = "delete";
      }
    }

    if (!action) {
      return res.status(200).json({
        success: true,
        message: aiRes.output_text || "I couldn't process that request.",
        result: null,
        action: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: result?.message || "Request completed successfully",
      result,
      action,
    });
  } catch (error: any) {
    console.error("AI chat error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
