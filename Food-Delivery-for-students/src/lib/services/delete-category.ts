import { axiosInstance } from "../axios-instance";

export const deleteCategory = async (id: string) => {
  const { data } = await axiosInstance.delete(`/category/food-category/${id}`);
  return data;
};
