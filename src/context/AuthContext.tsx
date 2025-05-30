import { createContext, useState, useEffect, useRef, useContext } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type User = {
  username?: string,
  isGuest: boolean
}

type AuthContextType = {
  user: User,
  unlockedLevel: number,
  setUnlockedLevel: Dispatch<SetStateAction<number>>,
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>({ isGuest: true });
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!!storedToken) setToken(storedToken);
    const storedUser = localStorage.getItem("user");
    if (!!storedUser) setUser(JSON.parse(storedUser));
    const storedLevel = localStorage.getItem("level");
    if (!!storedLevel) setUnlockedLevel(Number(storedLevel));
  }, []);

  useEffect(()=>{
    isFirstRender.current = false;
  },[])

  useEffect(() => {
    if (!isFirstRender.current && unlockedLevel > 1) {
      localStorage.setItem("level", String(unlockedLevel));
    }
  }, [unlockedLevel]);

  useEffect(() => {
    if (!user.isGuest) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user, user.isGuest]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    }
  }, [token]);

  const value = {
    user,
    unlockedLevel,
    setUnlockedLevel,
    token,
    setToken,
    isAuthenticated: !!token && !!user && !!user.isGuest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
