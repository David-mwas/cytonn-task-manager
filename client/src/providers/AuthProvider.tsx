import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";

type User = {
  id: string;
  email: string;
  role: "admin" | "user";
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cytonnUser");
      if (stored && stored !== "undefined") {
        const parsed = JSON.parse(stored);
        setUser(parsed?.user);
        setToken(parsed?.token);
      }
    } catch (err) {
      console.error("Failed to parse stored user:", err);
      localStorage.removeItem("cytonnUser");
    } finally {
      setLoading(false); 
    }
  }, []);

  const login = (userData: User, authToken: string) => {
    localStorage.setItem(
      "cytonnUser",
      JSON.stringify({ user: userData, token: authToken })
    );
    setUser(userData);
    setToken(authToken);
  };
  

  const logout = () => {
    localStorage.removeItem("cytonnUser");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
