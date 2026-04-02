import { Request, Response } from "express";

import { CategoryModel } from "../../models/category.model";

export const getFoodCategory = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      CategoryModel.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      CategoryModel.countDocuments(),
    ]);

    return res.status(200).send({ data: categories, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error(error);

    return res.status(500).send({ message: "Error fetching categories" });
  }
};
