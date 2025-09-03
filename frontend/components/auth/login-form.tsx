"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { login, loading, user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(email, password)
    if (success) {
      // Redirect based on user role after login
      // The auth context will handle setting the user
      // We need to wait for the user to be set, so we'll redirect after a short delay
      setTimeout(() => {
        if (user) {
          if (user.role === "admin") {
            router.push("/admin")
          } else if (user.role === "hotelier") {
            router.push("/dashboard")
          } else {
            router.push("/profile")
          }
        }
      }, 100)
    } else {
      setError("Email ou mot de passe incorrect.")
    }
  }

  return (
    <Card className="modern-card border-[#0c7489]/20 shadow-lg">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-[#119da4]" />
          <CardTitle className="font-sans text-2xl bg-gradient-to-r from-[#0c7489] to-[#119da4] bg-clip-text text-transparent">
            Connexion
          </CardTitle>
        </div>
        <p className="text-muted-foreground">Accédez à votre espace personnel</p>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <Input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-background/50 border-[#0c7489]/20 focus:border-[#0c7489] transition-all"
              required
            />
          </div>

          <div className="relative group">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 bg-background/50 border-[#0c7489]/20 focus:border-[#0c7489] transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-muted-foreground hover:text-[#0c7489] transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0c7489] to-[#119da4] hover:from-[#0a6578] hover:to-[#0e8c93] transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
