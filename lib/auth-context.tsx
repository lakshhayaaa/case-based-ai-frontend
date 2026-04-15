"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "./types"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signin: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("caseai_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])
  
  const API_URL = "http://127.0.0.1:8000";

const signin = async (email: string, password: string) => {
  try {
    const res = await fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return false;

    const data = await res.json();

    // ✅ store token + user
    localStorage.setItem("token", data.token);
    localStorage.setItem("caseai_user", JSON.stringify(data));

    setUser(data); // 🔥 IMPORTANT

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

  const signup = async (email: string, password: string, name: string) => {
  try {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("caseai_user");
    localStorage.removeItem("caseai_history");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
