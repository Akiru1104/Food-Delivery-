import { Router } from "express";
import { createFoodOrder } from "../controllers/food/create-new-food.controller";
import { getFoodOrdersByUser } from "../controllers/food/get-by-id-food.controller";
import { getFoodOrders } from "../controllers/food/get-food.controller";
import { updateFoodOrderStatus } from "../controllers/food/update-food.controller";
import { deleteFood } from "../controllers/food/delete-food.controller";

export const foodRouter = Router();

foodRouter.post("/food-order", createFoodOrder);
foodRouter.get("/food-order", getFoodOrders);
foodRouter.get("/food-order/user/:userId", getFoodOrdersByUser);
foodRouter.patch("/food-order/:foodOrderId", updateFoodOrderStatus);
foodRouter.delete("/food-order/:foodId", deleteFood);