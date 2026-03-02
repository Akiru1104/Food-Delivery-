import { toast } from "sonner";

type FoodOrderItem = {
  food: string;
  quantity: number;
};

type FoodOrder = {
  user?: string;
  totalPrice: string;
  foodOrderItems: FoodOrderItem[];
  status?: string;
};

export const createOrder = async (payload: FoodOrder) => {
  const endPoint = "/food-order";
};
