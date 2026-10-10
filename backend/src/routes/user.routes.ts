import express from "express";
import { editUserProfile } from "../controllers/user.controller";
import { authCheck } from "../middlewares/auth";
import upload from "../middlewares/upload.middleware";

const userRouter = express.Router();

userRouter.patch(
  "/profile/",
  authCheck,
  upload.single("avatar"),
  editUserProfile,
);

export default userRouter;
