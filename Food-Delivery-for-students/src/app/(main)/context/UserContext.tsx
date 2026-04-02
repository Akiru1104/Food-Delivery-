"use client";

import { User } from "@/constants/auth";
import { handleSignIn } from "@/lib";
import { getCurrentUser } from "@/lib/services/user";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

type UserContextType = {
  user?: User;
  loading: boolean;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  login: (_email: string, _password: string, _selectedRole?: string) => Promise<void>;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string, selectedRole?: string) => {
    const data = await handleSignIn({ email, password });
    if (data?.token) {
      const actualRole = data.user?.role;
      if (selectedRole && actualRole !== selectedRole) {
        toast.error(
          selectedRole === "ADMIN"
            ? "This account does not have admin access."
            : "This account does not have user access."
        );
        return;
      }
      localStorage.setItem("token", data.token);
      setUser(data.user);
      push(actualRole === "ADMIN" ? "/orders" : "/");
    } else {
      toast.error("Incorrect email or password.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(undefined);
    push("/login");
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      const data = await getCurrentUser(token);
      if (!data?.user) {
        localStorage.removeItem("token");
      }
      setUser(data?.user);
      setLoading(false);
    };
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
