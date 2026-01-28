import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";
import bcrypt from "bcrypt";

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const signIn = await UserModel.findOne({ email });

    if (!signIn) return res.status(404).send({ message: "User not found" });

    const isPasswordValid = bcrypt.compareSync(password, signIn.password);

    if (!isPasswordValid)
      return res.status(401).send({ message: "Invalid password" });
    res
      .status(200)
      .send({ message: "User signed in successfully", data: signIn });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error signing in", error: error });
  }
};

