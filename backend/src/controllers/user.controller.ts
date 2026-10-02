import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await UserModel.findById(userId).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
