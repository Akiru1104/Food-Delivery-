import { Request, Response } from "express";
import { UserModel } from "../../models";

export const Test = async (req: Request, res: Response) => {
  try {
    const Test1 = await UserModel.find();
    res.status(200).send({ message: "Amjiltai", data: Test1 });
  } catch (error) {
    res.status(500).send({ message: "Fail" });
  }
};
