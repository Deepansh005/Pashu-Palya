"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "farmer" | "vet" | "mofahd"

export interface User {
  id: string
  email: string
  role: UserRole
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call - in real app, this would be actual authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - accept any email/password for demo
    if (email && password) {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role,
        name: email.split("@")[0],
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
