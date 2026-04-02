import { AllFoodOrders } from "@/types";
import { axiosInstance } from "../axios-instance";

export const updateMultipleOrder = async (
  ids: string[],
  updateData: Partial<AllFoodOrders>
): Promise<AllFoodOrders | undefined> => {
  try {
    const promises = ids.map((id) =>
      axiosInstance.patch<AllFoodOrders>(`/order/food-order/${id}`, updateData)
    );
    const results = await Promise.all(promises);
    return results[results.length - 1]?.data;
  } catch (error) {
    console.error("Update multiple orders error:", error);
    return undefined;
  }
};
