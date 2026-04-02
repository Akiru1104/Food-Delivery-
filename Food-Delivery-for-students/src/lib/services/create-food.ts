import { axiosInstance } from "../axios-instance";

type Food = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
};

export const createFood = async (payload: Food) => {
  try {
    const { data } = await axiosInstance.post("/food/food-create", payload);
    return data;
  } catch (error) {
    console.error("Create food error:", error);
    return undefined;
  }
};
