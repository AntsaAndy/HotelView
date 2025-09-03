"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "./types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string, role?: User["role"]) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Données utilisateurs simulées
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@madagascar-hotels.mg",
    name: "Admin Principal",
    role: "admin",
    createdAt: new Date(),
  },
  {
    id: "2",
    email: "hotelier@example.mg",
    name: "Jean Rakoto",
    role: "hotelier",
    createdAt: new Date(),
  },
  {
    id: "3",
    email: "visitor@example.com",
    name: "Marie Dupont",
    role: "visitor",
    createdAt: new Date(),
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier si un utilisateur est connecté au chargement
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)

    try {
      const response = await fetch("http://localhost:5041/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        setLoading(false)
        return false
      }

      const data = await response.json()

      // Map backend role enum to frontend string role
      const roleMapping: { [key: string]: User["role"] } = {
        "Admin": "admin",
        "Partner": "hotelier",
        "User": "visitor",
        "Moderateur": "moderator",
        "DataAnalyst": "data-analyst"
      }

      const mappedRole = roleMapping[data.role] || "visitor"

      const user: User = {
        id: data.id.toString(),
        email: email,
        name: data.username,
        role: mappedRole,
        createdAt: new Date(),
      }

      setUser(user)
      localStorage.setItem("currentUser", JSON.stringify(user))
      setLoading(false)
      return true
    } catch (error) {
      console.error("Login error:", error)
      setLoading(false)
      return false
    }
  }

  const register = async (
    email: string,
    password: string,
    name: string,
    role: User["role"] = "visitor",
  ): Promise<boolean> => {
    setLoading(true)

    // Vérifier si l'email existe déjà
    if (mockUsers.find((u) => u.email === email)) {
      setLoading(false)
      return false
    }

    // Créer nouvel utilisateur
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      createdAt: new Date(),
    }

    mockUsers.push(newUser)
    setUser(newUser)
    localStorage.setItem("currentUser", JSON.stringify(newUser))
    setLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
