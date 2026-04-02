"use client";

import { useFormik } from "formik";
import { loginValidationSchema } from "@/lib";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { FormInput } from "@/components/dynamic-inputs";
import { Button } from "@/components/ui/button";
import { DynamicCardHeader } from "@/components/card";
import { LoginFooter } from "./LoginFooter";
import { FooterButtons } from "@/components/auth";
import { loginInitialValues } from "@/constants";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(main)/context";
import { ShieldCheck, User } from "lucide-react";

export const Login = () => {
  const { push } = useRouter();
  const { login } = useContext(UserContext);
  const [selectedRole, setSelectedRole] = useState<string>("USER");

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      await login(values.email, values.password, selectedRole);
    },
  });

  const formErrorPassword = formik.touched.password && formik.errors.password;
  const formErrorEmail = formik.touched.email && formik.errors.email;

  const emailInputProps = {
    name: "email",
    placeholder: "Email",
    value: formik.values.email,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    inputError: formErrorEmail,
    inputErrorMessage: formik.errors.email,
  };
  const passwordInputProps = {
    name: "password",
    placeholder: "Password",
    type: "password",
    value: formik.values.password,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    inputError: formErrorPassword,
    inputErrorMessage: formik.errors.password,
  };

  const isButtonDisabled = [
    !!formik.errors.email,
    !formik.values.email,
    !formik.values.password,
  ].some(Boolean);

  const roles = [
    { value: "USER", label: "User", Icon: User },
    { value: "ADMIN", label: "Admin", Icon: ShieldCheck },
  ];

  return (
    <Card className="w-[416px] border-none shadow-none gap-6 flex flex-col">
      <DynamicCardHeader
        title="Log in"
        description="Log in to enjoy your favorite dishes."
      />

      <CardContent className="p-0">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <div className="flex gap-3">
            {roles.map(({ value, label, Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setSelectedRole(value)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                  selectedRole === value
                    ? "border-red-500 bg-red-50 text-red-500"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                <Icon size={16} strokeWidth={1.5} />
                {label}
              </button>
            ))}
          </div>

          <div className="grid items-start w-full gap-4">
            <FormInput {...emailInputProps} />
            <FormInput {...passwordInputProps} />
            <Button
              variant="link"
              className="p-0 underline w-fit"
              onClick={() => push("/forgot-password")}
            >
              Forgot password ?
            </Button>
          </div>
          <FooterButtons
            buttonDisable={isButtonDisabled}
            buttonText="Let`s Go"
          />
        </form>
      </CardContent>
      <LoginFooter />
    </Card>
  );
};
