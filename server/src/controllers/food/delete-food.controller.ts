import { Request, Response } from "express";
import { FoodModel } from "../../models";

export const deleteFood = async (req: Request, res: Response) => {
  try {
    const { foodId } = req.params;

    const deleted = await FoodModel.findByIdAndDelete(foodId);

    if (!deleted) return res.status(404).send({ message: "Food not found" });

    return res.status(200).send({ message: "Food deleted", data: deleted });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error deleting food", error });
  }
};
