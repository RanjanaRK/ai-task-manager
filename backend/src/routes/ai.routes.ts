import express from "express";
import { authCheck } from "../middlewares/auth.js";
import { chatWithAI } from "../controllers/ai.controller.js";

const aiRouter = express.Router();

aiRouter.post("/chat", authCheck, chatWithAI);

export default aiRouter;
