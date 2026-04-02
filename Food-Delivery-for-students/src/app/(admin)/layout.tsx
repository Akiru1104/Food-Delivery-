"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { UserContext } from "@/app/(main)/context";
import { UserRoleEnum } from "@/types";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useContext(UserContext);
  const { replace } = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user || (user.role as string) !== "ADMIN") {
      replace("/");
    }
  }, [user, loading]);

  return (
    <div className="flex bg-secondary">
      <AdminSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
