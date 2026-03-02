import { toast } from "sonner";

export const createCategory = async (payload: { categoryName: string }) => {
  const endPoint = "/food-category";
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Token not found");
    return undefined;
  }
};
