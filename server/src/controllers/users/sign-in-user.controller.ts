import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";

export const signInUser = async (req: Request, res: Response) => {
  try {
    const signUp = await UserModel.create(req.body);
    res.status(201).send({ message: "Sign in ", signUp });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Problem error sign-up" });
  }
};
