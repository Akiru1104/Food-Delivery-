import { FoodCategory } from "@/components/admin/food-menu/AdminFoodsSection";
import { axiosInstance } from "../axios-instance";

type FoodItem = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  createdAt?: string;
  updatedAt?: string;
  category: {
    _id: string;
    categoryName: string;
  };
};

export const fetchFoodsWithCategories = async (): Promise<{
  data: FoodCategory[];
  error: boolean;
}> => {
  try {
    const { data } = await axiosInstance.get<{ data: FoodItem[] }>(
      "/food/food-get"
    );
    const foods = data.data;

    const categoryMap: Record<string, FoodCategory> = {};
    foods.forEach((food) => {
      const cat = food.category;
      if (!cat) return;
      if (!categoryMap[cat._id]) {
        categoryMap[cat._id] = {
          _id: cat._id,
          categoryName: cat.categoryName,
          count: 0,
          foods: [],
        };
      }
      categoryMap[cat._id].foods.push({
        _id: food._id,
        foodName: food.foodName,
        price: food.price,
        image: food.image,
        ingredients: food.ingredients,
        createdAt: food.createdAt,
        updatedAt: food.updatedAt,
      });
      categoryMap[cat._id].count++;
    });

    return { data: Object.values(categoryMap), error: false };
  } catch (error) {
    console.error("Fetch foods with categories error:", error);
    return { data: [], error: true };
  }
};
