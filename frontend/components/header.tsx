"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/language-selector"
import Link from "next/link"
import { User, LogIn, UserPlus, Menu } from "lucide-react"
import { useState, useEffect } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Mock authentication state - in real app this would come from auth context
  const isAuthenticated = false
  const userRole = null // 'public' | 'hotelier' | 'admin'
  const userName = null

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md border-b border-slate-200" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span
                className={`font-serif text-3xl font-light tracking-wider transition-colors duration-300 ${
                  isScrolled ? "text-slate-900" : "text-white"
                } hover:opacity-80`}
                style={{
                  fontFamily: "Playfair Display, serif",
                  letterSpacing: "0.1em",
                  textShadow: isScrolled ? "none" : "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                HotelView
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium  transition-colors ${
                isScrolled ? "text-slate-700" : "text-white/90 hover:text-grey-100"
              }`}
            >
              Home
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <LanguageSelector />

            {!isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`transition-colors ${
                      isScrolled
                        ? "text-slate-700 hover:text-primary"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="btn-primary">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {userRole === "hotelier" && (
                  <Link href="/dashboard">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary/20 text-primary hover:bg-primary/10 bg-transparent"
                    >
                      Dashboard
                    </Button>
                  </Link>
                )}
                {userRole === "admin" && (
                  <Link href="/admin">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500/20 text-red-600 hover:bg-red-50 bg-transparent"
                    >
                      Admin
                    </Button>
                  </Link>
                )}
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm text-slate-700">{userName}</span>
                  {userRole && (
                    <Badge
                      variant={userRole === "admin" ? "destructive" : "secondary"}
                      className="bg-primary/10 text-primary"
                    >
                      {userRole === "admin" ? "Admin" : userRole === "hotelier" ? "Hotelier" : "User"}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`md:hidden transition-colors ${
                isScrolled ? "text-slate-700 hover:text-primary" : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden mt-4 pb-4 transition-colors ${
              isScrolled ? "border-t border-slate-200" : "border-t border-white/20"
            }`}
          >
            <div className="flex flex-col space-y-3 pt-4">
              <Link
                href="/"
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  isScrolled ? "text-slate-700" : "text-white/90 hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link
                href="/locations"
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  isScrolled ? "text-slate-700" : "text-white/90 hover:text-white"
                }`}
              >
                Locations
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  isScrolled ? "text-slate-700" : "text-white/90 hover:text-white"
                }`}
              >
                About
              </Link>

              {!isAuthenticated && (
                <div
                  className={`flex flex-col space-y-2 pt-3 transition-colors ${
                    isScrolled ? "border-t border-slate-200" : "border-t border-white/20"
                  }`}
                >
                  <Link href="/auth/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start transition-colors ${
                        isScrolled
                          ? "text-slate-700 hover:text-primary"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="sm" className="w-full btn-primary">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
