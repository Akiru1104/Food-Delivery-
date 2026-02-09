import { Request, Response } from "express";
import { OrderModel } from "../../models/order.model";

export const getFoodOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find()
      .populate("user", "email")
      .populate("foodOrderItems.food");

    return res.status(200).send({ data: orders });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error fetching orders", error });
  }
};
