import { axiosInstance } from "../axios-instance";

export type UserOrderFood = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
};

export type UserOrderItem = {
  food: UserOrderFood;
  quantity: number;
};

export type UserOrder = {
  _id: string;
  totalPrice: number;
  status: "PENDING" | "DELIVERED" | "CANCELED";
  foodOrderItems: UserOrderItem[];
  createdAt: string;
};

export const fetchUserOrders = async (
  userId: string
): Promise<UserOrder[]> => {
  try {
    const { data } = await axiosInstance.get<{ data: UserOrder[] }>(
      `/order/food-order/user/${userId}`
    );
    return data.data;
  } catch (error) {
    console.error("Fetch user orders error:", error);
    return [];
  }
};
