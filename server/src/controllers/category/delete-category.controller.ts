import { Request, Response } from "express";
import mongoose from "mongoose";
import { CategoryModel } from "../../models/category.model";

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { foodCategoryId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(foodCategoryId)) {
      return res.status(400).json({ message: "ID буруу байна" });
    }

    const deleted = await CategoryModel.findByIdAndDelete(foodCategoryId);
    if (!deleted) return res.status(404).send({ message: "Category not found" });

    return res.status(200).send({ message: "Category deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Серверийн алдаа гарлаа" });
  }
};
