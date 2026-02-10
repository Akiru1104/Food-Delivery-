import { Router } from "express";
import {
  createFoodCategory,
  getFoodCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category";

export const categoryRouter = Router();

categoryRouter.post("/food-category", createFoodCategory);
categoryRouter.get("/food-category", getFoodCategory);
categoryRouter.patch("/food-category/:foodCategoryId", updateCategory);
categoryRouter.delete("/food-category/:foodCategoryId", deleteCategory); 
