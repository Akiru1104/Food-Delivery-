import { Router } from "express";
import { getAllOrders } from "../controllers/order/get-all-order.controller";
import { getOrderedFood } from "../controllers/order/get-ordered-food.controller";
import { updateFoodOrderStatus } from "../controllers/order/food-order-update.controller";
import { createFoodOrder } from "../controllers/order/create-food-order.controller";

export const orderRouter = Router();

orderRouter.post("/food-order", createFoodOrder);
orderRouter.get("/food-order", getAllOrders);
orderRouter.get("/food-order/user/:userId", getOrderedFood);
orderRouter.patch("/food-order/:orderId", updateFoodOrderStatus);
