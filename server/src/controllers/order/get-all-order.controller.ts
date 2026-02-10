import { Request, Response } from "express";
import { OrderModel } from "../../models";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).send({ message: "Orders retrieved", data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving orders", error });
  }
};
