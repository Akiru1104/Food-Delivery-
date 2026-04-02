import {
  LoginResponse,
  PasswordResetResponse,
  PasswordResetTypes,
  SendPasswordResetMail,
  SignUpResponse,
  SignUpTypes,
} from "@/constants/auth";
import axios from "axios";
import { axiosInstance } from "../axios-instance";

export type SignUpErrorResponse = {
  message: string;
  error: string;
};

export const handleSignUp = async ({
  email,
  password,
  role,
}: SignUpTypes & { role?: string }): Promise<SignUpResponse | SignUpErrorResponse | undefined> => {
  try {
    const { data } = await axiosInstance.post<SignUpResponse>("/user/sign-up", {
      email,
      password,
      role,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Registration failed.";
      return { message, error: message };
    }
    return undefined;
  }
};

export const handleSignIn = async ({
  email,
  password,
}: SignUpTypes): Promise<LoginResponse | undefined> => {
  try {
    const { data } = await axiosInstance.post<LoginResponse>("/user/sign-in", {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error("Sign in error:", error);
    return undefined;
  }
};

export const handleSendPasswordResetMail = async ({
  email,
}: SendPasswordResetMail): Promise<PasswordResetResponse | undefined> => {
  try {
    const { data } = await axiosInstance.post<PasswordResetResponse>(
      "/user/reset-password",
      { email }
    );
    return data;
  } catch (error) {
    console.error("Send reset mail error:", error);
    return undefined;
  }
};

export const handlePasswordReset = async ({
  token,
  password,
}: PasswordResetTypes): Promise<PasswordResetResponse | undefined> => {
  try {
    const { data } = await axiosInstance.post<PasswordResetResponse>(
      "/user/verify-reset-password",
      { token, newPassword: password }
    );
    return data;
  } catch (error) {
    console.error("Password reset error:", error);
    return undefined;
  }
};
