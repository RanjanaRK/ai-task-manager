import { GoogleGenAI } from "@google/genai";
import tools from "../agents/tools";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const instructions = `
You are an AI task management assistant.

You can understand English, Hindi, Bengali, and Hinglish.

Users may write or speak in any of these languages.
Understand the meaning of the user's message regardless of the language.

For task management requests, use the available task tools.

Never require the user to translate their message into English.
`;

const aiInteraction = async (message: any) => {
  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash",
    input: message,
    tools: tools as any,
    system_instruction: instructions,
  });

  return interaction;
};

export { aiInteraction };
