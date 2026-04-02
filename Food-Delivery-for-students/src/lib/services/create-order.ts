import { toast } from "sonner";
import { axiosInstance } from "../axios-instance";

type FoodOrderItem = {
  food: string;
  quantity: number;
};

type FoodOrder = {
  userId?: string;
  totalPrice: string;
  foodOrderItems: FoodOrderItem[];
  status?: string;
};

export const createOrder = async (payload: FoodOrder) => {
  try {
    const { data } = await axiosInstance.post("/order/food-order", payload);
    return data;
  } catch (error) {
    console.error("Create order error:", error);
    toast.error("Failed to place order. Please try again.");
    return undefined;
  }
};
