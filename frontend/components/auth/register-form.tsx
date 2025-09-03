"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Lock, User, Building, Phone, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"

// Mock API function pour simuler l'inscription
const mockRegisterAPI = (data: any): Promise<{ message: string }> => {
  return new Promise((resolve, reject) => {
    // Simuler un délai réseau
    setTimeout(() => {
      // Simuler une erreur aléatoire (20% de chance)
      if (Math.random() > 0.8) {
        reject({
          response: {
            data: {
              message: "L'email est déjà utilisé"
            },
            status: 400
          }
        })
      } else {
        // Simuler une réponse réussie
        resolve({
          message: "Utilisateur enregistré avec succès. Veuillez vérifier votre email."
        })
      }
    }, 1500)
  })
}

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [accountType, setAccountType] = useState<"public" | "hotelier">("public")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    hotelName: "",
    nif: "",
    acceptTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const body = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        ...(accountType === "hotelier" && {
          hotelName: formData.hotelName,
          nif: formData.nif,
        }),
        role: accountType === "public" ? 0 : 2, // 0 = User, 2 = Admin
      }

      // Utilisation du mock API au lieu d'Axios
      const res = await mockRegisterAPI(body)
      
      setSuccess(true)
      // Réinitialiser le formulaire après succès
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        hotelName: "",
        nif: "",
        acceptTerms: false,
      })
    } catch (err: any) {
      console.error("Erreur détaillée:", err)
      
      if (err.response) {
        // Le serveur a répondu avec un code d'erreur
        setError(err.response.data.message || `Erreur du serveur: ${err.response.status}`)
      } else if (err.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        setError("Le serveur ne répond pas. Vérifiez que le serveur est en cours d'exécution.")
      } else {
        setError("Une erreur inattendue s'est produite.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c7489] to-[#119da4] p-4">
      <Card className="border-0 shadow-lg w-full max-w-md mx-auto">
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-2xl font-semibold text-[#0c7489]">Créer un compte</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Erreur d'inscription</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Inscription réussie!</p>
                <p className="text-sm">Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.</p>
              </div>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
            <p className="text-yellow-700 text-sm font-medium">Mode démonstration</p>
            <p className="text-yellow-600 text-xs">Cette version utilise une API simulée pour tester le formulaire.</p>
          </div>

          <div className="mb-6">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={accountType === "public" ? "default" : "outline"}
                onClick={() => setAccountType("public")}
                className={
                  accountType === "public"
                    ? "bg-[#0c7489] hover:bg-[#119da4] text-white"
                    : "bg-transparent text-[#0c7489] border-[#0c7489] hover:bg-[#f8f9fa]"
                }
                disabled={isLoading}
              >
                <User className="h-4 w-4 mr-2" />
                Utilisateur
              </Button>
              <Button
                type="button"
                variant={accountType === "hotelier" ? "default" : "outline"}
                onClick={() => setAccountType("hotelier")}
                className={
                  accountType === "hotelier"
                    ? "bg-[#0c7489] hover:bg-[#119da4] text-white"
                    : "bg-transparent text-[#0c7489] border-[#0c7489] hover:bg-[#f8f9fa]"
                }
                disabled={isLoading}
              >
                <Building className="h-4 w-4 mr-2" />
                Hôtelier
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-[#0c7489]" />
                <Input
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  className="pl-10 border-[#d1d5db] focus:border-[#0c7489] focus:ring-[#0c7489]"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-[#0c7489]" />
                <Input
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  className="pl-10 border-[#d1d5db] focus:border-[#0c7489] focus:ring-[#0c7489]"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-[#0c7489]" />
              <Input
                type="email"
                placeholder="Adresse email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className="pl-10 border-[#d1d5db] focus:border-[#0c7489] focus:ring-[#0c7489]"
                required
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-[#0c7489]" />
              <Input
                type="tel"
                placeholder="Téléphone (+261...)"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                className="pl-10 border-[#d1d5db] focus:border-[#0c7489] focus:ring-[#0c7489]"
                required
                disabled={isLoading}
              />
            </div>

            {accountType === "hotelier" && (
              <>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-[#0c7489]" />
                  <Input
                    placeholder="Nom de l'établissement"
                    value={formData.hotelName}
                    onChange={(e) => updateFormData("hotelName", e.target.value)}
                    className="pl-10 border-[#d1d5db] focus:border-[#0c7489] focus:ring-[#0c7489]"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <Input
                    placeholder="NIF/STAT (numéro d'identification fiscale)"
                    value={formData.nif}
                    onChange={(e) => updateFormData("nif", e.target.value)}
                    className="border-[#d1d5db] focus:border-[#0c7489] focus:ring-[#0c7489]"
                    required
                    disabled={isLoading}
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-[#0c7489]" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                className="pl-10 pr-10 border-[#d1d5db] focus:border-[#0c7489] focus:ring-[#0c7489]"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#0c7489] hover:text-[#119da4]"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => updateFormData("acceptTerms", checked as boolean)}
                className="data-[state=checked]:bg-[#0c7489] border-[#d1d5db]"
                disabled={isLoading}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                J'accepte les{" "}
                <a href="#" className="text-[#0c7489] hover:text-[#119da4] font-medium">
                  conditions d'utilisation
                </a>{" "}
                et la{" "}
                <a href="#" className="text-[#0c7489] hover:text-[#119da4] font-medium">
                  politique de confidentialité
                </a>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0c7489] hover:bg-[#119da4] text-white font-medium py-2.5"
              disabled={!formData.acceptTerms || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Inscription en cours...
                </>
              ) : (
                "Créer mon compte"
              )}
            </Button>

            {accountType === "hotelier" && (
              <div className="text-xs text-gray-600 bg-[#e6f7f9] p-3 rounded border border-[#b6e2e7]">
                <strong>Note :</strong> Les comptes hôteliers nécessitent une vérification KYC. Vous recevrez un email
                avec les documents à fournir après inscription.
              </div>
            )}
          </form>

          
        </CardContent>
      </Card>
    </div>
  )
}