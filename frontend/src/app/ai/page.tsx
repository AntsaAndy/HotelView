"use client"

import { useState } from "react"
import { AISearch } from "@/components/ai-search"
import { AIChatbot } from "@/components/ai-chatbot"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Brain, MessageSquare, TrendingUp, Zap, Target } from "lucide-react"
import type { Hotel } from "@/lib/types"

export default function AIPage() {
  const [searchResults, setSearchResults] = useState<Hotel[]>([])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <Brain className="h-10 w-10 text-purple-600" />
          Intelligence Artificielle
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Découvrez nos fonctionnalités d'IA avancées pour trouver l'hôtel parfait à Madagascar
        </p>
      </div>

      {/* Fonctionnalités IA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="border-purple-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Sparkles className="h-5 w-5" />
              Recherche Sémantique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Recherchez en langage naturel. Notre IA comprend vos intentions et trouve les hôtels correspondants.
            </p>
            <Badge className="mt-2 bg-purple-100 text-purple-700">Actif</Badge>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <Target className="h-5 w-5" />
              Recommandations Personnalisées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Recevez des suggestions d'hôtels basées sur vos préférences et votre historique de recherche.
            </p>
            <Badge className="mt-2 bg-emerald-100 text-emerald-700">Actif</Badge>
          </CardContent>
        </Card>

        <Card className="border-blue-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <MessageSquare className="h-5 w-5" />
              Assistant Virtuel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Chattez avec notre assistant IA pour obtenir des conseils personnalisés sur votre séjour.
            </p>
            <Badge className="mt-2 bg-blue-100 text-blue-700">Actif</Badge>
          </CardContent>
        </Card>

        <Card className="border-orange-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <TrendingUp className="h-5 w-5" />
              Analyse Prédictive
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Prédiction des prix et de la disponibilité pour vous aider à réserver au meilleur moment.
            </p>
            <Badge className="mt-2 bg-orange-100 text-orange-700">Bientôt</Badge>
          </CardContent>
        </Card>

        <Card className="border-red-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <Zap className="h-5 w-5" />
              Optimisation Automatique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Optimisation automatique de votre itinéraire et suggestions d'activités locales.
            </p>
            <Badge className="mt-2 bg-red-100 text-red-700">Bientôt</Badge>
          </CardContent>
        </Card>

        <Card className="border-indigo-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-700">
              <Brain className="h-5 w-5" />
              Apprentissage Continu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Notre IA apprend de vos préférences pour améliorer continuellement ses recommandations.
            </p>
            <Badge className="mt-2 bg-indigo-100 text-indigo-700">Actif</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Interface de recherche IA */}
      <AISearch onSearchResults={setSearchResults} />

      {/* Résultats de recherche */}
      {searchResults.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Résultats de la Recherche IA</CardTitle>
            <CardDescription>
              {searchResults.length} hôtel(s) trouvé(s) grâce à notre intelligence artificielle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((hotel) => (
                <div key={hotel.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <img
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-lg mb-2">{hotel.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {hotel.city}, {hotel.region}
                  </p>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">{hotel.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-emerald-600">
                      {hotel.priceRange.min.toLocaleString()} Ar/nuit
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-medium">{hotel.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chatbot IA */}
      <AIChatbot />
    </div>
  )
}
