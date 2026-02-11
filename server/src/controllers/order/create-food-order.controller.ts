import { Request, Response } from "express";
import { FoodModel } from "../../models/food.model";
import { OrderModel } from "../../models/order.model";
import mongoose from "mongoose";

export const createFoodOrder = async (req: Request, res: Response) => {
  try {
    const { userId, foodOrderItems } = req.body;

    if (
      !userId ||
      !Array.isArray(foodOrderItems) ||
      foodOrderItems.length === 0
    ) {
      return res
        .status(400)
        .send({ message: "userId & foodOrderItems required" });
    }

    const foodIds = foodOrderItems.map((i: any) => i.food);
    const foods = await FoodModel.find({ _id: { $in: foodIds } });

    const priceMap = new Map<string, number>();
    foods.forEach((f: any) => priceMap.set(String(f._id), Number(f.price)));

    let totalPrice = 0;
    for (const item of foodOrderItems) {
      const price = priceMap.get(String(item.food)) || 0;
      totalPrice += price * Number(item.quantity || 0);
    }

    const order = await OrderModel.create({
      user: new mongoose.Types.ObjectId(userId),
      foodOrderItems,
      totalPrice,
      status: "PENDING",
      isCart: true,
    });

    return res.status(201).send({ message: "Order created", data: order });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error creating order", error });
  }
};
