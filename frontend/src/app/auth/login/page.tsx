import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20" />

      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all"
          >
            <Sparkles className="h-6 w-6 text-purple-400" />
            Hôtels Antananarivo
          </Link>
          <h2 className="mt-6 text-3xl font-bold">Découvrez le Luxe à Antananarivo</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Ou{" "}
            <Link href="/auth/register" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
              créez un nouveau compte
            </Link>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
