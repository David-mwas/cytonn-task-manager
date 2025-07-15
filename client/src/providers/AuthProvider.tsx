import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import type { User } from "../types/types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({} as User);
  // const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cytonnUser");
      if (stored && stored !== "undefined") {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        // setToken(token);
      }
    } catch (err) {
      console.error("Failed to parse stored user:", err);
      localStorage.removeItem("cytonnUser");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData: User, authToken: string) => {
    localStorage.setItem("cytonnUser", JSON.stringify(userData));
    localStorage.setItem("cytonnUserToken", authToken);
    setUser(userData);
    // setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem("cytonnUser");
    localStorage.removeItem("cytonnUserToken");
    setUser({} as User);
    // setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
