import { axiosInstance } from "../axios-instance";

export const deleteFood = async (foodId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/food/food/${foodId}`);
    return data;
  } catch (error) {
    console.error("Delete food error:", error);
    return undefined;
  }
};
