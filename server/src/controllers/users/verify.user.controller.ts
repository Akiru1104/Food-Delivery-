import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models";

export const verifyPass = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Token required" });
    }

    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
    ) as { userId: string };

    await UserModel.findByIdAndUpdate(decoded.userId, {
      isVerified: true,
      ttl: null, // TTL-г арилгаж байна
    });

    return res.status(200).json({ message: "User verified successfully" });
  } catch (error: any) {
    return res.status(400).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};
