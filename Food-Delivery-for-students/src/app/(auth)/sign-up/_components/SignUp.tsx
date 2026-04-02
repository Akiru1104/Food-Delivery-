"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { determineValidationSchema, handleSignUp } from "@/lib";
import type { SignUpErrorResponse } from "@/lib/services/auth";
import { SignUpEmailBox } from "./SignUpEmailBox";
import { SignUpPasswordBox } from "./SignUpPasswordBox";
import { SignUpRoleBox } from "./SignUpRoleBox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const Signup = () => {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedRole, setSelectedRole] = useState<string>("USER");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: determineValidationSchema(currentStep - 1),
    onSubmit: async (values) => {
      const data = await handleSignUp({ ...values, role: selectedRole });

      if (data?.message === "User created successfully") {
        toast.success("Account created successfully! Please log in.");
        push("/login");
      } else {
        const errorMsg =
          (data as SignUpErrorResponse | undefined)?.error ||
          "Registration failed. Please try again.";
        toast.error(errorMsg);
      }
    },
  });

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  const emailBoxProps = {
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
    handleNext,
  };

  const passwordBoxProps = {
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
    handleCreateAccount: formik.handleSubmit,
    handleBack: handlePrevious,
  };

  const StepComponents = [
    <SignUpRoleBox
      key={0}
      selectedRole={selectedRole}
      onSelectRole={setSelectedRole}
      handleNext={handleNext}
    />,
    <SignUpEmailBox key={1} {...emailBoxProps} />,
    <SignUpPasswordBox key={2} {...passwordBoxProps} />,
  ];

  return StepComponents[currentStep];
};
