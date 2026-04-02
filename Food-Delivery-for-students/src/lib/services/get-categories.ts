import { axiosInstance } from "../axios-instance";

export type Category = {
  categoryName: string;
  _id: string;
};

export const fetchCategories = async (): Promise<{
  data: Category[];
  error: boolean;
}> => {
  try {
    const { data } = await axiosInstance.get<{ data: Category[] }>(
      "/category/food-category"
    );
    return { data: data.data, error: false };
  } catch (error) {
    console.error("Fetch categories error:", error);
    return { data: [], error: true };
  }
};
