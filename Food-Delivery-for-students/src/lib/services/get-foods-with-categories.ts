import { FoodCategory } from "@/components/admin/food-menu/AdminFoodsSection";

export const fetchFoodsWithCategories = async (): Promise<{
  data: FoodCategory[];
  error: boolean;
}> => {
  return { data: [], error: false };
};
