import { Request, Response } from "express";
import { aiInteraction } from "../services/gemini.service";
import {
  createTaskFn,
  deleteTaskFn,
  getTasksFn,
  updateTaskFn,
} from "../services/task.service";

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const userId = req.user?.id;

    if (!message || !message.trim()) {
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

    console.log("AI response:", aiRes);

    let result = null;
    let functionCall = null;

    for (const step of aiRes.steps) {
      if (step.type !== "function_call") {
        continue;
      }
      functionCall = step;

      const toolName = step.name;
      const toolArgs = step.arguments;

      console.log("Tool:", toolName);
      console.log("Arguments:", toolArgs);

      if (toolName === "create_task") {
        result = await createTaskFn(userId, toolArgs);
      } else if (toolName === "get_tasks") {
        result = await getTasksFn(userId, toolArgs);
      } else if (toolName === "update_task") {
        result = await updateTaskFn(userId, toolArgs.taskCode, toolArgs);
      } else if (toolName === "delete_task") {
        result = await deleteTaskFn(userId, toolArgs.taskCode);
      }
    }

    if (!functionCall) {
      return res.status(200).json({
        success: true,
        message: aiRes.output_text || "I couldn't process that request.",
        result: null,
      });
    }

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error: any) {
    console.log(error, ":error");

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
