import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";
import crypto from "crypto";
// import { sendResetPasswordEmail } from "../../utils/mail-utils";

export const resetPasswordRequest = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 30);
    await user.save();

    return res.status(200).send({ message: "Reset password link sent" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Error requesting reset password", error });
  }
};
