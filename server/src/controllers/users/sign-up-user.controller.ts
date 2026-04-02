import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyUserEmail } from "../../utils/mail-utils";
import { configDotenv } from "dotenv";

configDotenv();

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const { password, email, role } = req.body;

    if (
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).send({ message: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).send({ message: "Server configuration error" });
    }

    const existingUser = await UserModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).send({ message: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const isDev = process.env.NODE_ENV !== "production";

    const user = await UserModel.create({
      email: normalizedEmail,
      password: hashedPassword,
      role: role === "ADMIN" ? "ADMIN" : "USER",
      isVerified: isDev,
      ttl: isDev ? null : new Date(Date.now() + 2 * 60 * 60 * 1000),
    });

    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "2h",
    });

    if (!isDev) {
      verifyUserEmail(
        normalizedEmail,
        `${process.env.BACKEND_API}/user/verify-user?token=${token}`,
      ).catch((err) => console.error("Failed to send verification email:", err));
    } else {
      console.log(`[DEV] User ${normalizedEmail} auto-verified (role: ${user.role})`);
    }

    const { password: _pw, ...userWithoutPassword } = user.toObject();

    return res.status(200).send({
      message: "User created successfully",
      data: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error creating user" });
  }
};
