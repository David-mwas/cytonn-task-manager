import { createContext } from "react";
import type { User } from "../types/types";

type AuthContextType = {
  user: User | null;
  login: (userData: User, authToken: string) => void;
  logout: () => void;
  // token: string | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
