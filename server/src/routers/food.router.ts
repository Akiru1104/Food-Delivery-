import { Router } from "express";
import { createFoodOrder } from "../controllers/food/create-new-food.controller";
import { getFoodOrdersByUser } from "../controllers/food/get-by-id-food.controller";
import { getFoodOrders } from "../controllers/food/get-food.controller";
import { updateFoodOrderStatus } from "../controllers/food/update-food.controller";
import { deleteFood } from "../controllers/food/delete-food.controller";

const router = Router();

router.post("/food-order", createFoodOrder);
router.get("/food-order", getFoodOrders);
router.get("/food-order/user/:userId", getFoodOrdersByUser);
router.patch("/food-order/:foodOrderId", updateFoodOrderStatus);
router.delete("/food-order/:foodId", deleteFood);

export default router;
