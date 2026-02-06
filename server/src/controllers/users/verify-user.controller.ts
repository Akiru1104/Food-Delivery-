import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyUser = async (req: Request, res: Response) => {
  const token = req.query.token as string;
  const decode = verify(token, process.env.JWT_SECRET as string);
  console.log(decode);
  res.status(200).send({ message: "success" });
};
