import { Router } from "express";
import { createFood } from "../controllers/food/create-new-food.controller";
import { getFoodById } from "../controllers/food/get-by-id-food.controller";
import { getFood } from "../controllers/food/get-food.controller";
import { updateFood } from "../controllers/food/update-food.controller";
import { deleteFood } from "../controllers/food/delete-food.controller";

export const foodRouter = Router();

foodRouter.post("/food-create", createFood);
foodRouter.get("/food-get", getFood);
foodRouter.get("/food/get/:foodId", getFoodById);
foodRouter.patch("/food/:foodId", updateFood);
foodRouter.delete("/food/:foodId", deleteFood);
