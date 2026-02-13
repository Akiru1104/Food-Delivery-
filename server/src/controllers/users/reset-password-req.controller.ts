import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models";

export const confirmResetPass = async (req: Request, res: Response) => {
  try {
    console.log("REQ BODY:", req.body);

    const { token, code, newPassword } = req.body;

    console.log("token:", token, "type:", typeof token);
    console.log("code:", code, "type:", typeof code);
    console.log("newPassword:", newPassword, "type:", typeof newPassword);

    if (!token || !code || !newPassword) {
      return res
        .status(400)
        .json({ message: "token, code, newPassword required" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      userId: string;
      code: string;
    };

    if (String(decoded.code) !== String(code).trim()) {
      return res.status(400).json({ message: "code буруу" });
    }

    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "user олдсонгүй" });
    }

    user.password = bcrypt.hashSync(String(newPassword), 10);
    await user.save();

    return res.status(200).json({
      message: "password амжилттай солигдлоо",
    });
  } catch (err: any) {
    return res.status(400).json({
      message: "token буруу эсвэл хугацаа дууссан",
      error: err?.message,
    });
  }
};
