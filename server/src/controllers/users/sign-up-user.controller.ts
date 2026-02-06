import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const now = Date.now();
    const user = await UserModel.create({
      email,
      password: hashedPassword, 
      ttl: new Date(now + 1000 * 60 * 1),
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "2h",
    });

    return res.status(200).send({
      message: "User created successfully",
      data: user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error creating user", error });
  }
};
