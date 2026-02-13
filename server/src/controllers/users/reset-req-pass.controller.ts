import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models";

export const confirmResetPass = async (req: Request, res: Response) => {
  try {
    const { token, code, newPassword } = req.body;

    if (!token || !code || !newPassword) {
      return res
        .status(400)
        .json({ message: "token, code, newPassword required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      code: string;
    };

    if (String(decoded.code) !== String(code).trim()) {
      return res.status(400).json({ message: "Wrong code" });
    }

    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(String(newPassword), 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};
