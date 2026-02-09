import { Router } from "express";

import { getFoodCategory } from "../controllers/category/get-food-category.controller";
import { createFoodCategory } from "../controllers/category/create-food-category.controller";

export const userRouter = Router();

userRouter.post("/create-food-category", createFoodCategory);
userRouter.post("/get-food-category", getFoodCategory);
