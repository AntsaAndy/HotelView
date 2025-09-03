import { RegisterForm } from "@/components/auth/register-form"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="font-serif text-2xl text-stone-900 hover:text-amber-600">
            Hôtels Antananarivo
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-stone-900">Créer un compte</h2>
          <p className="mt-2 text-sm text-stone-600">
            Ou{" "}
            <Link href="/auth/login" className="font-medium text-amber-600 hover:text-amber-500">
              connectez-vous à votre compte existant
            </Link>
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
