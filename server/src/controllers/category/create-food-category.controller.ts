import { Request, Response } from "express";
import { CategoryModel } from "../../models/category.model";
export const createFoodCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName || typeof categoryName !== "string") {
      return res.status(400).send({ message: "categoryName is required" });
    }
    const exists = await CategoryModel.findOne({
      categoryName: categoryName.trim(),
    });
    if (exists)
      return res.status(409).send({ message: "Category already exists" });
    const category = await CategoryModel.create({ categoryName });
    return res
      .status(201)
      .send({ message: "Category created", data: category });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error creating category", error });
  }
};
