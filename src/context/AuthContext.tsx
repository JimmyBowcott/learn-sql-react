import { createContext, useState, useEffect, useRef, useContext } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type User = {
  username?: string,
  token: string,
  isGuest: boolean,
}

type AuthContextType = {
  user: User,
  unlockedLevel: number,
  setUnlockedLevel: Dispatch<SetStateAction<number>>,
  isAuthenticated: boolean,
  login: (data: any) => void,
  logout: () => void
};

const defaultUser: User = { token: "", isGuest: true }

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const isFirstRender = useRef(true);

  useEffect(() => {
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

  const logout = () => {
    setUser(defaultUser);
    setUnlockedLevel(1);
    localStorage.removeItem("user");
    localStorage.removeItem("level");
  }

  const login = (data: any) => {
    console.log(data);
    setUser({ username: data.username, token: data.token, isGuest: false});
    setUnlockedLevel(data.level);
  }

  const value = {
    user,
    unlockedLevel,
    setUnlockedLevel,
    isAuthenticated: !!user && !!user.token && !!user.isGuest,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
