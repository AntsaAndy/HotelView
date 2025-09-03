"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Search, TrendingUp, Heart, MapPin } from "lucide-react"
import { performSemanticSearch, generateRecommendations, generateSearchSuggestions } from "@/lib/ai-service"
import type { Hotel } from "@/lib/types"

interface AISearchProps {
  onSearchResults?: (hotels: Hotel[]) => void
  onQueryChange?: (query: string) => void
}

export function AISearch({ onSearchResults, onQueryChange }: AISearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState(generateRecommendations())
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (query.length > 2) {
      setSuggestions(generateSearchSuggestions(query))
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSemanticSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    // Simulation d'un délai de traitement IA
    setTimeout(() => {
      const results = performSemanticSearch(query)
      onSearchResults?.(results)
      setIsSearching(false)
    }, 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    onQueryChange?.(suggestion)
    setSuggestions([])
  }

  const handleRecommendationClick = (hotel: Hotel) => {
    onSearchResults?.([hotel])
  }

  return (
    <div className="space-y-6">
      {/* Recherche Intelligente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Recherche Intelligente IA
          </CardTitle>
          <CardDescription>Décrivez votre séjour idéal en langage naturel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Ex: Je cherche un hôtel de luxe près de la plage pour ma lune de miel..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                onQueryChange?.(e.target.value)
              }}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
              onKeyPress={(e) => e.key === "Enter" && handleSemanticSearch()}
            />
            <Button
              onClick={handleSemanticSearch}
              disabled={isSearching || !query.trim()}
              className="absolute right-2 top-2 bg-purple-600 hover:bg-purple-700"
            >
              {isSearching ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Suggestions automatiques */}
          {suggestions.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Suggestions :</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-sm"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommandations IA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Recommandations Personnalisées
          </CardTitle>
          <CardDescription>Sélectionnées spécialement pour vous par notre IA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.slice(0, 6).map((rec, index) => (
              <div
                key={rec.hotel.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleRecommendationClick(rec.hotel)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{rec.hotel.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {Math.round(rec.score)}%
                  </Badge>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{rec.hotel.city}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{rec.reason}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-emerald-600">
                    {rec.hotel.priceRange.min.toLocaleString()} Ar/nuit
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">★ {rec.hotel.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recherches Populaires */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Recherches Populaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              "Hôtel luxe Nosy Be",
              "Lodge écologique Andasibe",
              "Resort familial Madagascar",
              "Hôtel romantique spa",
              "Hébergement budget Tana",
              "Hôtel vue océan",
            ].map((term, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(term)}
                className="text-sm hover:bg-red-50 hover:border-red-200"
              >
                {term}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
