import { Request, Response } from "express";
import { FoodModel } from "../../models/food.model";

export const getFood = async (_req: Request, res: Response) => {
  try {
    const foods = await FoodModel.find().populate("category");

    return res.status(200).send({ data: foods });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error fetching orders", error });
  }
};
