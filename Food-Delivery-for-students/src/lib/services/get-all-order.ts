import { AllFoodOrders } from "@/types";
import { axiosInstance } from "../axios-instance";

export const fetchAllOrders = async (): Promise<
  { data: AllFoodOrders[] } | undefined
> => {
  try {
    const { data } = await axiosInstance.get<{ data: AllFoodOrders[] }>(
      "/order/food-order"
    );
    return data;
  } catch (error) {
    console.error("Fetch all orders error:", error);
    return undefined;
  }
};
