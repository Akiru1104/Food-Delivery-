import { User } from "@/types";
import { axiosInstance } from "../axios-instance";

export const updateCurrentUser = async (
  payload: Partial<User>
): Promise<User | undefined> => {
  try {
    const { data } = await axiosInstance.patch<{ user: User }>(
      "/user/update",
      payload
    );
    return data.user;
  } catch (error) {
    console.error("Update current user error:", error);
    return undefined;
  }
};
