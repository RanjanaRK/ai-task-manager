import { editUserProfile } from "../controllers/user.controller";
import { authCheck } from "../middlewares/auth";

import express from "express";
import upload from "../middlewares/upload.middleware";

const userRouter = express.Router();

userRouter.patch(
  "/profile/edit",
  authCheck,
  upload.single("avatar"),
  editUserProfile,
);

export default userRouter;
