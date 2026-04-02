"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DynamicCardHeader } from "@/components/card";
import { SignUpFooter } from "./SignUpFooter";
import { ShieldCheck, User } from "lucide-react";

type RoleBoxProps = {
  selectedRole: string;
  onSelectRole: (role: string) => void;
  handleNext: () => void;
};

export const SignUpRoleBox = ({
  selectedRole,
  onSelectRole,
  handleNext,
}: RoleBoxProps) => {
  const roles = [
    {
      value: "USER",
      label: "User",
      description: "Order food",
      Icon: User,
    },
    {
      value: "ADMIN",
      label: "Admin",
      description: "Manage orders & menu",
      Icon: ShieldCheck,
    },
  ];

  return (
    <Card className="w-[416px] border-none shadow-none gap-6 flex flex-col">
      <DynamicCardHeader
        title="Who are you?"
        description="Select your role before continuing."
      />
      <CardContent className="p-0 flex flex-col gap-6">
        <div className="flex gap-4">
          {roles.map(({ value, label, description, Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => onSelectRole(value)}
              className={`flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                selectedRole === value
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Icon
                size={32}
                strokeWidth={1.2}
                className={selectedRole === value ? "text-red-500" : "text-gray-400"}
              />
              <div className="text-center">
                <p className={`font-semibold text-sm ${selectedRole === value ? "text-red-500" : "text-gray-700"}`}>
                  {label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{description}</p>
              </div>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedRole}
          className="w-full h-11 rounded-full bg-black text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
        >
          Continue
        </button>
      </CardContent>
      <SignUpFooter />
    </Card>
  );
};
