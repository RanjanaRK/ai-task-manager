import express from "express";
import { login, register, getMe } from "../controllers/auth.controller";
import { authCheck } from "../middlewares/auth";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", authCheck, getMe);

export default authRouter;
