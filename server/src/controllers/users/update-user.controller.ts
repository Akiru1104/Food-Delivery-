import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    const { name, address, phoneNumber } = req.body;
    const updatePayload: Record<string, string> = {};
    if (name !== undefined) updatePayload.name = name;
    if (address !== undefined) updatePayload.address = address;
    if (phoneNumber !== undefined) updatePayload.phoneNumber = phoneNumber;

    const user = await UserModel.findByIdAndUpdate(
      decoded.userId,
      { $set: updatePayload },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
