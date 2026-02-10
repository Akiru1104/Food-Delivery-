import { Router } from "express";

import { foodCart } from "../controllers/order/food-cart.controller";
import { getAllOrders } from "../controllers/order/get-all-order.controller";
import { getOrderedFood } from "../controllers/order/get-ordered-food.controller";
import { updateFoodOrderStatus } from "../controllers/order/food-order-update.controller";

export const orderRouter = Router();

orderRouter.get("/food-cart", foodCart);
orderRouter.put("/food-cart/:orderId", updateFoodOrderStatus);
orderRouter.get("/all-orders", getAllOrders);
orderRouter.get("/ordered-food/:orderId", getOrderedFood);

