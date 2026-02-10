import { Request, Response } from "express";
import { CategoryModel } from "../../models/category.model";

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { foodCategoryId } = req.params;

    const deleted = await CategoryModel.findByIdAndDelete(foodCategoryId);
    if (!deleted) return res.status(404).send({ message: "Category not found" });

    return res.status(200).send({ message: "Category deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error deleting category", error });
  }
};
