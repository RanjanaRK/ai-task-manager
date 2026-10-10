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
        result = await updateTaskFn(userId, toolArgs.taskId, toolArgs);
      } else if (toolName === "delete_task") {
        result = await deleteTaskFn(userId, toolArgs.taskId);
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

// import { Request, Response } from "express";

// import {
//   createTaskFn,
//   deleteTaskFn,
//   getTasksFn,
//   updateTaskFn,
// } from "../services/task.service";
// import {
//   aiInteraction,
//   continueAIInteraction,
// } from "../services/gemini.service";

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

//     // --------------------------------
//     // First Gemini interaction
//     // --------------------------------

//     let aiRes = await aiInteraction(message);

//     console.log("AI response:", aiRes);

//     let lastToolResult: any = null;

//     // --------------------------------
//     // Keep processing tool calls
//     // until Gemini gives final answer
//     // --------------------------------

//     while (true) {
//       const functionCalls = aiRes.steps.filter(
//         (step: any) => step.type === "function_call",
//       );

//       // No more function calls
//       if (functionCalls.length === 0) {
//         break;
//       }

//       const functionResults = [];

//       for (const step of functionCalls) {
//         const toolName = step.name;
//         const toolArgs = step.arguments;

//         console.log("Tool:", toolName);
//         console.log("Arguments:", toolArgs);

//         let result: any = null;

//         // -----------------------------
//         // CREATE
//         // -----------------------------

//         if (toolName === "create_task") {
//           result = await createTaskFn(userId, toolArgs);
//         }

//         // -----------------------------
//         // GET
//         // -----------------------------
//         else if (toolName === "get_tasks") {
//           result = await getTasksFn(userId, toolArgs);
//         }

//         // -----------------------------
//         // UPDATE
//         // -----------------------------
//         else if (toolName === "update_task") {
//           result = await updateTaskFn(userId, toolArgs.taskId, toolArgs);
//         }

//         // -----------------------------
//         // DELETE
//         // -----------------------------
//         else if (toolName === "delete_task") {
//           result = await deleteTaskFn(userId, toolArgs.taskId);
//         } else {
//           result = {
//             message: `Unknown tool: ${toolName}`,
//           };
//         }

//         console.log("Tool result:", result);

//         lastToolResult = result;

//         // --------------------------------
//         // Send tool result back to Gemini
//         // --------------------------------

//         functionResults.push({
//           type: "function_result",

//           name: toolName,

//           call_id: step.id,

//           result: [
//             {
//               type: "text",
//               text: JSON.stringify(result),
//             },
//           ],
//         });
//       }

//       // --------------------------------
//       // Continue Gemini interaction
//       // --------------------------------

//       aiRes = await continueAIInteraction(aiRes.id, functionResults as any);

//       console.log("Next AI response:", aiRes);
//     }

//     // --------------------------------
//     // Final response
//     // --------------------------------

//     return res.status(200).json({
//       success: true,

//       message: aiRes.output_text || lastToolResult?.message || "Done!",

//       result: lastToolResult,
//     });
//   } catch (error: any) {
//     console.log(error, ":error");

//     return res.status(500).json({
//       success: false,
//       message: error.message || "Something went wrong",
//     });
//   }
// };
