import { Router } from "express";
import {
  createFoodCategory,
  getFoodCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category";
import { authMiddleware } from "../middleware/auth.middleware";

export const categoryRouter = Router();

categoryRouter.post("/food-category", authMiddleware, createFoodCategory);
categoryRouter.get("/food-category", getFoodCategory);
categoryRouter.patch(
  "/food-category/:foodCategoryId",
  authMiddleware,
  updateCategory,
);
categoryRouter.delete(
  "/food-category/:foodCategoryId",
  authMiddleware,
  deleteCategory,
);
