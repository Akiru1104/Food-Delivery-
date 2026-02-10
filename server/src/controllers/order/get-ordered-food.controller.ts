import { Request, Response } from "express";
import { OrderModel } from "../../models/order.model";

const allowed = ["PENDING", "CANCELED", "DELIVERED"];

const getOrderedFood = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find({ status: { $in: allowed } });
    res.status(200).send({ message: "Orders retrieved", data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving orders", error });
  }
};
export { getOrderedFood };


