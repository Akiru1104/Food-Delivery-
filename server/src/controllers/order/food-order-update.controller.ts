import { Request, Response } from "express";
import { OrderModel } from "../../models/order.model";

const allowed = ["PENDING", "CANCELED", "DELIVERED"];

export const updateFoodOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!allowed.includes(status)) {
      return res.status(400).send({ message: "Invalid status" });
    }

    const updated = await OrderModel.findByIdAndUpdate(
      orderId,
      { status, isCart: false },
      { new: true },
    );

    if (!updated) return res.status(404).send({ message: "Order not found" });

    return res.status(200).send({ message: "Order updated", data: updated });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error updating order", error });
  }
};
