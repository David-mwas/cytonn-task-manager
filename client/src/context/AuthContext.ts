import { createContext } from "react";

type User = {
  _id: string;
  email: string;
  role: "admin" | "user";
};

type AuthContextType = {
  user: User | null;
  login: (userData: User, authToken: string) => void;
  logout: () => void;
  token: string | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
