import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { UserModel } from "../../models";

export const confirmResetPass = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "token, newPassword required" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await UserModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(String(newPassword), 10);

    user.password = hashedPassword;
    user.resetPasswordToken = "";
    user.resetPasswordExpires = new Date(0);
    await user.save();

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error: any) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
