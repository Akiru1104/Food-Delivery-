import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { verifyUserEmail } from "../../utils/mail-utils";

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign({_id:""}, "hello", {exiresIn: "2h"}); 

    const sign = await UserModel.create({
      email,
      password: hashedPassword,
    });
    res.status(200).send({ message: "User created successfully", data: sign });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating user", error: error });
  }
};
