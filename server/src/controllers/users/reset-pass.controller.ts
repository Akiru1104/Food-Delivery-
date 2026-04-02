import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";
import crypto from "crypto";
import { Resend } from "resend";
import { configDotenv } from "dotenv";

configDotenv();

const resend = new Resend(process.env.RESEND_API_KEY);

export const resetPasswordRequest = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // Development: show reset link in console
    if (process.env.NODE_ENV !== "production") {
      console.log(`\n[DEV] Password reset link for ${email}:\n${resetLink}\n`);
    }

    resend.emails
      .send({
        from: process.env.AUTH_MAIL || "onboarding@resend.dev",
        to: email,
        subject: "Reset Password",
        html: `<div style="width:300px;border-radius:8px;padding:20px;background-color:#f0f9ff">
          <p>Click the link below to reset your password:</p>
          <a href="${resetLink}" style="font-size:16px;color:blue">Reset Password</a>
          <p style="color:#888;font-size:12px">This link expires in 30 minutes.</p>
        </div>`,
        text: `Password reset link: ${resetLink}`,
      })
      .catch((err) => console.error("Failed to send reset email:", err));

    return res.status(200).send({ message: "Reset password link sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Серверийн алдаа гарлаа" });
  }
};
