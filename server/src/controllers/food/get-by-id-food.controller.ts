import { Request, Response } from "express";
import { OrderModel } from "../../models/order.model";

export const getFoodOrdersByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const orders = await OrderModel.find({ user: userId }).populate(
      "foodOrderItems.food",
    );

    return res.status(200).send({ data: orders });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Error fetching user orders", error });
  }
};
