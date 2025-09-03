"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "public" | "hotelier" | "admin"
  redirectTo?: string
}

export function AuthGuard({ children, requiredRole, redirectTo = "/auth/login" }: AuthGuardProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // Mock authentication check - in real app this would check actual auth state
    const checkAuth = async () => {
      try {
        // Simulate auth check
        const isAuthenticated = false // This would come from your auth system
        const userRole = null // This would come from your auth system

        if (!isAuthenticated) {
          router.push(redirectTo)
          return
        }

        if (requiredRole && userRole !== requiredRole) {
          // Redirect based on user role
          if (userRole === "admin") {
            router.push("/admin")
          } else if (userRole === "hotelier") {
            router.push("/dashboard")
          } else {
            router.push("/")
          }
          return
        }

        setIsAuthorized(true)
      } catch (error) {
        console.error("Auth check failed:", error)
        router.push(redirectTo)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [requiredRole, redirectTo, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-2 text-stone-600">Vérification des permissions...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
