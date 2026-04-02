import { axiosInstance } from "../axios-instance";

export const updateCategory = async (id: string, categoryName: string) => {
  const { data } = await axiosInstance.patch(`/category/food-category/${id}`, { categoryName });
  return data;
};
