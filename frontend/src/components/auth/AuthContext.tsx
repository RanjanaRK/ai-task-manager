import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import api from "@/lib/axios";

export type User = {
  _id: string;
  name: string;
  email: string;
  avatar?: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        return;
      }

      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("AUTH ME RESPONSE:", response.data);
      console.log("AUTH ME USER:", response.data.user);
      console.log({ response });

      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch current user:", error);

      // Token may be expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);
    }
  };

  const refreshUser = async () => {
    await fetchCurrentUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      await fetchCurrentUser();
      setLoading(false);
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
