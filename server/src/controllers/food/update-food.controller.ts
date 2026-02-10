import { Request, Response } from "express";
import { FoodModel } from "../../models/food.model";

export const updateFood = async (req: Request, res: Response) => {
  try {
    const { foodId } = req.params;
    const updated = await FoodModel.findByIdAndUpdate(foodId, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).send({ message: "Food not found" });
    return res.status(200).send({ message: "Food updated", data: updated });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error updating food", error });
  }
};
