import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const sign = await UserModel.create(req.body);
    res.status(201).send({ message: "New User", sign });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something wrong" });
  }
};
