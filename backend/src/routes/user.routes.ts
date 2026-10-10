import express from "express";
import { editUserProfile } from "../controllers/user.controller.js";
import { authCheck } from "../middlewares/auth.js";
import upload from "../middlewares/upload.middleware.js";

const userRouter = express.Router();

userRouter.patch(
  "/profile/",
  authCheck,
  upload.single("avatar"),
  editUserProfile,
);

export default userRouter;
