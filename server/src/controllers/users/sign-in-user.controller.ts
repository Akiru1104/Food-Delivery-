import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";
import bcrypt from "bcrypt";

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const signIn = await UserModel.findOne({ email });
    if (!signIn) return res.status(404).send({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, signIn.password);
    if (!isPasswordValid)
      return res.status(401).send({ message: "Invalid password" });

    const user = await UserModel.findOne({ email }).select("password");

    return res
      .status(200)
      .send({ message: "User signed in successfully", data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error signing in", error });
  }
};
