import { Request, Response } from "express";
import { OrderModel } from "../../models";

export const createNewFood = async (req: Request, res: Response) => {
  try {
    await FoodModel.create(req.body);
    res.status(201).send({ message: "Amjiltai" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Aldatai baina" });
  }
};
