import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyPass = async (req: Request, res: Response) => {
  try {
    const { token, code } = req.body;

    if (!token || !code) {
      res.status(400).json({ message: "token, code required" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      userId: string;
      code: string;
    };

    if (String(decoded.code) !== String(code).trim()) {
      return res.status(400).json({ message: "wrong code" });
    }

    res.status(200).json({ message: "code зөв" });
    return;
  } catch (error: any) {
    res.status(400).json({
      message: "token буруу эсвэл хугацаа дууссан",
      error: error?.message,
    });
  }
};
