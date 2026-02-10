import { Request, Response } from "express";
import { OrderModel } from "../../models/order.model";

export const foodCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const cart = await OrderModel.findOne({ userId, status: "CART" });
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }
    return res.status(200).send({ message: "Cart retrieved", data: cart });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error retrieving cart", error });
  }
};



