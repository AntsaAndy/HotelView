"use client"

import { useState, useMemo } from "react"
import { SearchFilters } from "@/components/search-filters"
import { SearchResults } from "@/components/search-results"
import { AISearch } from "@/components/ai-search"
import { mockHotels } from "@/lib/mock-data"
import type { SearchFilters as SearchFiltersType } from "@/lib/types"
import { Search, Sparkles } from "lucide-react"
import { Header } from "@/components/header"

export default function SearchPage() {
  const [filters, setFilters] = useState<SearchFiltersType>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"price" | "rating" | "name">("rating")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isAIMode, setIsAIMode] = useState(false)

  // Filtrage et recherche des hôtels
  const filteredHotels = useMemo(() => {
    let results = [...mockHotels]

    // Recherche textuelle
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(query) ||
          hotel.city.toLowerCase().includes(query) ||
          hotel.region.toLowerCase().includes(query) ||
          hotel.description.toLowerCase().includes(query) ||
          hotel.amenities.some((amenity) => amenity.toLowerCase().includes(query)),
      )
    }

    // Filtres de localisation
    if (filters.location) {
      const location = filters.location.toLowerCase()
      results = results.filter(
        (hotel) =>
          hotel.city.toLowerCase().includes(location) ||
          hotel.region.toLowerCase().includes(location) ||
          hotel.address.toLowerCase().includes(location),
      )
    }

    // Filtres de prix
    if (filters.priceMin !== undefined) {
      results = results.filter((hotel) => hotel.priceRange.min >= filters.priceMin!)
    }
    if (filters.priceMax !== undefined) {
      results = results.filter((hotel) => hotel.priceRange.max <= filters.priceMax!)
    }

    // Filtre de note
    if (filters.rating !== undefined) {
      results = results.filter((hotel) => hotel.rating >= filters.rating!)
    }

    // Filtre de catégorie
    if (filters.category) {
      results = results.filter((hotel) => hotel.category === filters.category)
    }

    // Filtre d'équipements
    if (filters.amenities && filters.amenities.length > 0) {
      results = results.filter((hotel) =>
        filters.amenities!.every((amenity) =>
          hotel.amenities.some((hotelAmenity) => hotelAmenity.toLowerCase().includes(amenity.toLowerCase())),
        ),
      )
    }

    // Tri
    results.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "price":
          comparison = a.priceRange.min - b.priceRange.min
          break
        case "rating":
          comparison = a.rating - b.rating
          break
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

    return results
  }, [filters, searchQuery, sortBy, sortOrder])

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "linear-gradient(120deg, #eaf4f4 10%, #a4c3b2 120%)", // gris clair vers bleu pastel plus sombre
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header de recherche */}
        <main className="mb-20 bg-transparent">
          <Header />
        </main>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Rechercher un hôtel</h1>
            <button
              onClick={() => setIsAIMode(!isAIMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isAIMode ? "bg-[#0c7489] hover:bg-[#095e6d] text-white" : "bg-[#326273] text-white hover:bg-[#254c5b]"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              Mode IA
            </button>
          </div>
          <p className="text-gray-700 mb-6">Découvrez les meilleurs hôtels de Madagascar</p>

          {isAIMode ? (
            <AISearch
              onSearchResults={(hotels) => {
                // Update filtered hotels with AI results
                setFilters({})
                setSearchQuery("")
              }}
              onQueryChange={setSearchQuery}
            />
          ) : (
            /* Barre de recherche principale */
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, ville, région ou équipements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg text-gray-900"
              />
            </div>
          )}
        </div>

        {!isAIMode && (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filtres */}
            <div className="lg:col-span-1">
              <SearchFilters filters={filters} onFiltersChange={setFilters} />
            </div>

            {/* Résultats */}
            <div className="lg:col-span-3">
              <SearchResults
                hotels={filteredHotels}
                totalCount={mockHotels.length}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={setSortBy}
                onSortOrderChange={setSortOrder}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
