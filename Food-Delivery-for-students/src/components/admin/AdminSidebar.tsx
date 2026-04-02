"use client";

import { cn, getMenuColor } from "@/lib";
import { ADMIN_SIDEBAR_MENUS } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { HeaderLogo } from "@/app/(main)/_components/header/HeaderLogo";
import { UserContext } from "@/app/(main)/context";
import { useContext } from "react";
import { LogOut } from "lucide-react";

export const AdminSidebar = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const { user, logout } = useContext(UserContext);

  const handleClickMenu = (path: string) => () => push(path);

  return (
    <div className="w-[205px] px-5 py-9 flex flex-col justify-between h-[100vh] bg-background">
      <div className="space-y-10">
        <HeaderLogo textColor={["black", "black", "#71717A"]} />
        <div className="space-y-6">
          {ADMIN_SIDEBAR_MENUS.map(({ value, path, Icon }, index) => (
            <div
              key={index}
              onClick={handleClickMenu(path)}
              className={cn(
                "flex gap-[10px] px-6 py-2 items-center cursor-pointer",
                getMenuColor(pathname, path)
              )}
            >
              <Icon size={22} strokeWidth={1} />
              <p className="text-sm">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 px-2">
        <p className="text-xs text-muted-foreground truncate px-4">{user?.email}</p>
        <div
          onClick={logout}
          className="flex gap-[10px] px-6 py-2 items-center cursor-pointer rounded-lg hover:bg-secondary transition-colors"
        >
          <LogOut size={22} strokeWidth={1} />
          <p className="text-sm">Log out</p>
        </div>
      </div>
    </div>
  );
};
