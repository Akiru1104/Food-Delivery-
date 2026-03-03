import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models";

export const refreshUser = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "refresh token байхгүй" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string,
    ) as { userId: string };

    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "user олдсонгүй" });
    }

    const newAccessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "30m" },
    );

    return res.status(200).json({
      message: "Token refreshed",
      newAccessToken,
    });
  } catch (error) {
    return res.status(401).json({ message: "refresh token буруу" });
  }
};
