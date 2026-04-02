import { LoginResponse } from "@/constants/auth";
import { axiosInstance } from "../axios-instance";

export const getCurrentUser = async (
  token: string | false | null
): Promise<LoginResponse | undefined> => {
  if (!token) return undefined;
  try {
    const { data } = await axiosInstance.get<LoginResponse>(
      "/user/get-current-user",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch {
    return undefined;
  }
};
