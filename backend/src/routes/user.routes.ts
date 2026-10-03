import { editUserProfile } from "../controllers/user.controller";
import { authCheck } from "../middlewares/auth";
import upload from "../middlewares/upload.middleware";
import express from "express";

const userRouter = express.Router();

userRouter.patch(
  "/profile/edit",
  authCheck,
  upload.single("avatar"),
  editUserProfile,
);

export default userRouter;
