import { toast } from "sonner";
import axios from "axios";
import { axiosInstance } from "../axios-instance";

export const createCategory = async (payload: { categoryName: string }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Token not found");
    return undefined;
  }

  try {
    const { data } = await axiosInstance.post("/category/food-category", payload);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      toast.error("This category already exists.");
    } else {
      toast.error("Failed to create category. Please try again.");
    }
    return undefined;
  }
};
