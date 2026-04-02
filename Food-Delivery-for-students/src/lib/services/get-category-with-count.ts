import { CategoryWithCount } from "@/components/admin/food-menu/DishesCategory";
import { axiosInstance } from "../axios-instance";

type CategoryResponse = {
  _id: string;
  categoryName: string;
};

type FoodResponse = {
  category: CategoryResponse;
};

export const fetchCategoriesWithCount = async (): Promise<{
  data: CategoryWithCount[];
  error: boolean;
}> => {
  try {
    const [categoriesRes, foodsRes] = await Promise.all([
      axiosInstance.get<{ data: CategoryResponse[] }>("/category/food-category"),
      axiosInstance.get<{ data: FoodResponse[] }>("/food/food-get"),
    ]);

    const categories = categoriesRes.data.data;
    const foods = foodsRes.data.data;

    const countMap: Record<string, number> = {};
    foods.forEach((food) => {
      const catId = food.category?._id;
      if (catId) countMap[catId] = (countMap[catId] || 0) + 1;
    });

    const data: CategoryWithCount[] = categories.map((cat) => ({
      _id: cat._id,
      categoryName: cat.categoryName,
      count: countMap[cat._id] || 0,
    }));

    return { data, error: false };
  } catch (error) {
    console.error("Fetch categories with count error:", error);
    return { data: [], error: true };
  }
};
