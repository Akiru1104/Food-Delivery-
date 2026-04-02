import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../context";
import { HeaderAddressSelectButton } from ".././header/HeaderAddressSelectButton";
import { HeaderCartButton } from "../header/HeaderCartButton";
import { HeaderUserProfileIcon } from "../header/HeaderUserProfileIcon";
import HeaderUserInformationSkeleton from "../header/HeaderUserInformationSkeleton";
import { useRouter } from "next/navigation";
import { UserRoleEnum } from "@/types";
import { ShieldCheck } from "lucide-react";

type UserToolbarProps = {
  openSidebar: () => void;
};

export const UserToolbar = ({ openSidebar }: UserToolbarProps) => {
  const { loading, user, logout } = useContext(UserContext);
  const { push } = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <HeaderUserInformationSkeleton />;
  }

  return (
    <>
      <HeaderAddressSelectButton />
      {user?.role === UserRoleEnum.ADMIN && (
        <button
          onClick={() => push("/orders")}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors"
        >
          <ShieldCheck size={15} />
          Admin
        </button>
      )}
      <HeaderCartButton openSidebar={openSidebar} />
      <div className="relative" ref={dropdownRef}>
        <div onClick={() => setDropdownOpen((prev) => !prev)}>
          <HeaderUserProfileIcon />
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 top-11 w-48 bg-white rounded-xl shadow-lg z-50 py-2 text-black">
            {user ? (
              <>
                <div className="px-4 py-2 text-sm font-medium border-b truncate">
                  {user.email}
                </div>
                <button
                  onClick={() => { setDropdownOpen(false); logout(); }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setDropdownOpen(false); push("/login"); }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Login
                </button>
                <button
                  onClick={() => { setDropdownOpen(false); push("/sign-up"); }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
