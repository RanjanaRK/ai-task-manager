import { Request, Response } from "express";
import { aiInteraction } from "../services/gemini.service";

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

    const aiRes = await aiInteraction(message);

    for (const step of aiRes.steps) {
      if (step.type === "function_call") {
        const toolName = step.name;
        const toolArgs = step.arguments;

        console.log("Tool:", toolName);
        console.log("Arguments:", toolArgs);
      }
    }

    return res.status(200).json({ success: true, message: aiRes });
  } catch (error) {}
};
