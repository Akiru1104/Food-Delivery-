import { User } from "@/types";

export const updateCurrentUser = async (
  payload: Partial<User>
): Promise<User | undefined> => {
  const endPoint = `/auth`;
  const token = localStorage.getItem("token");
  return undefined;
};
