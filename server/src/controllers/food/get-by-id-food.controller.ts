import { Request, Response } from "express";
import { FoodModel } from "../../models/food.model";

export const getFoodById = async (req: Request, res: Response) => {
  try {
    const { foodId } = req.params;

    const food = await FoodModel.findById(foodId);

    if (!food) {
      return res.status(404).send({ message: "Food not found" });
    }

    return res.status(200).send({ data: food });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Error fetching food by ID", error });
  }
};
