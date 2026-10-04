import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import uploadAvatar from "../services/uploadToCloudinary.service";

export const editUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { name } = req.body;
    const file = req.file as Express.Multer.File;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    let avatarUrl = "";

    if (file) {
      const upload = await uploadAvatar(file.path);

      avatarUrl = upload.secure_url;
    }

    const updateData: { name?: string; avatar?: string } = {
      name,
    };

    if (avatarUrl) {
      updateData.avatar = avatarUrl;
    }

    const user = await UserModel.findByIdAndUpdate(userId, updateData, {
      returnDocument: "after",
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
