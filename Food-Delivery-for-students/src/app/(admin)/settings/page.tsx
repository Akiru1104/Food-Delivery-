"use client";

import { UserContext } from "@/app/(main)/context";
import { useContext } from "react";

export default function AdminSettings() {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full h-full p-6 bg-secondary">
      <div className="bg-background rounded-xl p-6 flex flex-col gap-6">
        <p className="text-xl font-semibold">Admin Settings</p>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground font-medium">Email</p>
          <p className="text-sm font-semibold">{user?.email}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground font-medium">Role</p>
          <p className="text-sm font-semibold">{user?.role}</p>
        </div>
      </div>
    </div>
  );
}
