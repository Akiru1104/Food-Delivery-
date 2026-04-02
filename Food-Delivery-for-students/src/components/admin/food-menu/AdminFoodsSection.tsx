"use client";

import { axiosInstance } from "@/lib/axios-instance";
import { useEffect, useState } from "react";
import { AdminFoodCard } from "./AdminFoodCard";
import { AdminFoodSkeleton } from "./AdminFoodSkeleton";
import { AddFoodModal } from "./AddFoodModal";

export type FoodCategory = {
  _id: string;
  categoryName: string;
  count: number;
  foods: {
    _id: string;
    foodName: string;
    price: number;
    image: string;
    ingredients: string;
    createdAt?: string;
    updatedAt?: string;
  }[];
};

type CategoryResponse = { _id: string; categoryName: string };
type FoodResponse = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  createdAt?: string;
  updatedAt?: string;
  category: { _id: string; categoryName: string };
};

export const AdminFoodsSection = ({ onRefresh }: { onRefresh?: () => void }) => {
  const [foodsWithCategories, setFoodsWithCategories] = useState<FoodCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [categoriesRes, foodsRes] = await Promise.all([
        axiosInstance.get<{ data: CategoryResponse[] }>("/category/food-category"),
        axiosInstance.get<{ data: FoodResponse[] }>("/food/food-get"),
      ]);

      const categories = categoriesRes.data.data;
      const foods = foodsRes.data.data;

      const categoryMap: Record<string, FoodCategory> = {};
      categories.forEach((cat) => {
        categoryMap[cat._id] = {
          _id: cat._id,
          categoryName: cat.categoryName,
          count: 0,
          foods: [],
        };
      });

      foods.forEach((food) => {
        const catId = food.category?._id;
        if (catId && categoryMap[catId]) {
          categoryMap[catId].foods.push({
            _id: food._id,
            foodName: food.foodName,
            price: food.price,
            image: food.image,
            ingredients: food.ingredients,
            createdAt: food.createdAt,
            updatedAt: food.updatedAt,
          });
          categoryMap[catId].count++;
        }
      });

      setFoodsWithCategories(Object.values(categoryMap));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <AdminFoodSkeleton />;

  if (!foodsWithCategories.length)
    return (
      <div className="p-6 bg-background rounded-xl text-sm text-muted-foreground">
        No categories yet. Add a category first.
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      {foodsWithCategories.map((category) => (
        <div
          key={category._id}
          className="flex flex-col gap-4 p-6 bg-background rounded-xl"
        >
          <div className="flex items-center gap-2 text-xl font-semibold">
            <p>{category.categoryName}</p>
            <p className="flex items-center">{category.count}</p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <AddFoodModal
              categoryName={category.categoryName}
              categoryId={category._id}
              onCreated={() => { fetchData(); onRefresh?.(); }}
            />
            {category.foods.map((food) => (
              <div key={food._id} className="flex gap-2">
                <AdminFoodCard
                  _id={food._id}
                  image={food.image}
                  price={food.price}
                  ingredients={food.ingredients}
                  foodName={food.foodName}
                  onDeleted={() => { fetchData(); onRefresh?.(); }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
