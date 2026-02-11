import { Request, Response } from "express";
import mongoose from "mongoose";
import { OrderModel } from "../../models/order.model";

export const getOrderedFood = async (
  req: Request<{ userId: string }>,
  res: Response,
) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send({ message: "userId is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ message: "Invalid userId" });
    }

    const orders = await OrderModel.find({
      user: new mongoose.Types.ObjectId(userId),
      isCart: false,
    }).sort({ createdAt: -1 });

    return res.status(200).send({ message: "User orders", data: orders });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Error fetching user orders", error });
  }
};
