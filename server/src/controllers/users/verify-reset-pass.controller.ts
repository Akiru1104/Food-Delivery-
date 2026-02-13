import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyPass = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "token, code required" });
    }

    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
    ) as unknown as {
      userId: string;
      code: string;
    };
    const { userId } = decoded;

    // if (String(decoded.code) !== String(token).trim()) {
    //   return res.status(400).json({ message: "Wrong code" });
    // }

    return res.status(200).json({ message: "Code verified" });
  } catch (error: any) {
    return res.status(400).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};
