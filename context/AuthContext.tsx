"use client";
import { getRoles } from "@/lib/auth";

import {
clearToken,
DecodedToken,
decodeToken,
getToken,
isTokenExpired,
saveToken,
} from "@/lib/auth";
import { createContext,ReactNode,useContext,useEffect,useState } from "react";

interface AuthContextValue {
  token: string | null;
  user: DecodedToken | null;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getToken();
    if (stored) {
      const decoded = decodeToken(stored);
      if (decoded && !isTokenExpired(decoded)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setToken(stored);
        setUser(decoded);
      } else {
        clearToken();
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  function login(newToken: string) {
    saveToken(newToken);
    const decoded = decodeToken(newToken);
    setToken(newToken);
    setUser(decoded);
  }

  function logout() {
    clearToken();
    setToken(null);
    setUser(null);
  }
const isAdmin = user ? getRoles(user).includes("Admin") : false;

  return (
    <AuthContext.Provider value={{ token, user, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}