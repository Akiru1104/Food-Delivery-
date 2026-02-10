import { Request, Response } from "express";
import { FoodModel } from "../../models/food.model";

export const createFood = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingredients, category } = req.body;

    if (!foodName || !price || !category) {
      return res.status(400).send({ message: "Required fields missing" });
    }

    const food = await FoodModel.create({
      foodName,
      price,
      image,
      ingredients,
      category,
    });

    return res.status(201).send({
      message: "Food created successfully",
      data: food,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error creating food", error });
  }
};
