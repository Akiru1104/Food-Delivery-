import {
  LoginResponse,
  PasswordResetResponse,
  PasswordResetTypes,
  SendPasswordResetMail,
  SignUpResponse,
  SignUpTypes,
} from "@/constants/auth";

export const handleSignUp = async ({ email, password }: SignUpTypes) => {
  const endPoint = "/auth/sign-up";
  const payload = {
    email: email,
    password: password,
  };
};

export const handleSignIn = async ({ email, password }: SignUpTypes) => {
  const endPoint = "/auth/sign-in";

  const payload = {
    email: email,
    password: password,
  };
};

export const handleSendPasswordResetMail = async ({
  email,
}: SendPasswordResetMail) => {
  const endPoint = "/auth/forgot-password";
  const payload = {
    email: email,
  };
};

export const handlePasswordReset = async ({
  token,
  password,
}: PasswordResetTypes) => {
  const endPoint = "/auth/reset-password";
  const payload = {
    token: token,
    password: password,
  };
};
