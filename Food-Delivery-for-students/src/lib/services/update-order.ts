import { AllFoodOrders } from "@/types";
import { axiosInstance } from "../axios-instance";

export const updateOrder = async (
  id: string,
  payload: Partial<AllFoodOrders>
): Promise<AllFoodOrders | undefined> => {
  try {
    const { data } = await axiosInstance.patch<AllFoodOrders>(
      `/order/food-order/${id}`,
      payload
    );
    return data;
  } catch (error) {
    console.error("Update order error:", error);
    return undefined;
  }
};
