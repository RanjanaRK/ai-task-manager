import express from "express";
import { authCheck } from "../middlewares/auth";
import { chatWithAI } from "../controllers/ai.controller";

const aiRouter = express.Router();

aiRouter.post("/", authCheck, chatWithAI);

export default aiRouter;
