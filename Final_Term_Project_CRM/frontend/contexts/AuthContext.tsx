"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authService } from "@/services/authService";
import { getApiError } from "@/lib/api";
import type { User } from "@/types";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("crm_token");

    if (!token) {
      setLoading(false);
      return;
    }

    authService
      .me()
      .then((data) => setUser(data.user))
      .catch(() => localStorage.removeItem("crm_token"))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      login: async (email, password) => {
        try {
          const data = await authService.login({ email, password });
          localStorage.setItem("crm_token", data.token);
          setUser(data.user);
          toast.success("Login successful");
          router.push("/dashboard");
        } catch (error) {
          toast.error(getApiError(error));
          throw error;
        }
      },
      register: async (name, email, password) => {
        try {
          const data = await authService.register({ name, email, password });
          localStorage.setItem("crm_token", data.token);
          setUser(data.user);
          toast.success("Registration successful");
          router.push("/dashboard");
        } catch (error) {
          toast.error(getApiError(error));
          throw error;
        }
      },
      logout: () => {
        localStorage.removeItem("crm_token");
        setUser(null);
        toast.success("Logout successful");
        router.push("/login");
      }
    }),
    [loading, router, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
