import express from "express";
import { authCheck } from "../middlewares/auth";
import { chatWithAI } from "../controllers/ai.controller";

const aiRouter = express.Router();

aiRouter.post("/chat", authCheck, chatWithAI);

export default aiRouter;
