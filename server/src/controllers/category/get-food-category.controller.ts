import { Request, Response } from "express";

import { CategoryModel } from "../../models/category.model";

export const getFoodCategory = async (_req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find().sort({ createdAt: -1 });

    return res.status(200).send({ data: categories });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .send({ message: "Error fetching categories", error });
  }
};
