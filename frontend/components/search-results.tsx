"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HotelCard } from "@/components/hotel-card"
import type { Hotel } from "@/lib/types"
import { ArrowUpDown, Grid, List } from "lucide-react"

interface SearchResultsProps {
  hotels: Hotel[]
  totalCount: number
  sortBy: "price" | "rating" | "name"
  sortOrder: "asc" | "desc"
  onSortChange: (sort: "price" | "rating" | "name") => void
  onSortOrderChange: (order: "asc" | "desc") => void
}

export function SearchResults({
  hotels,
  totalCount,
  sortBy,
  sortOrder,
  onSortChange,
  onSortOrderChange,
}: SearchResultsProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const hotelsPerPage = 12

  const totalPages = Math.ceil(hotels.length / hotelsPerPage)
  const startIndex = (currentPage - 1) * hotelsPerPage
  const endIndex = startIndex + hotelsPerPage
  const currentHotels = hotels.slice(startIndex, endIndex)

  const getSortLabel = (sort: string) => {
    switch (sort) {
      case "price":
        return "Prix"
      case "rating":
        return "Note"
      case "name":
        return "Nom"
      default:
        return "Pertinence"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header des résultats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {hotels.length} hôtel{hotels.length > 1 ? "s" : ""} trouvé{hotels.length > 1 ? "s" : ""}
          </h2>
          <p className="text-gray-600">Sur {totalCount} hôtels disponibles</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Tri */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Trier par:</span>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Note</SelectItem>
                <SelectItem value="price">Prix</SelectItem>
                <SelectItem value="name">Nom</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
              className="px-2"
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>

          {/* Mode d'affichage */}
          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Résultats */}
      {currentHotels.length > 0 ? (
        <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col space-y-4"}>
          {currentHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun hôtel trouvé</h3>
          <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              )
            })}
            {totalPages > 5 && (
              <>
                <span className="px-2 text-gray-500">...</span>
                <Button
                  variant={currentPage === totalPages ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  className="w-10"
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  )
}
