import { Request, Response } from "express";
import { CategoryModel } from "../../models/category.model";

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { foodCategoryId } = req.params;
    const { categoryName } = req.body;

    if (!categoryName || typeof categoryName !== "string") {
      return res.status(400).send({ message: "categoryName is required" });
    }

    const updated = await CategoryModel.findByIdAndUpdate(
      foodCategoryId,
      { categoryName },
      { new: true }
    );

    if (!updated) return res.status(404).send({ message: "Category not found" });

    return res.status(200).send({ message: "Category updated", data: updated });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error updating category", error });
  }
};
