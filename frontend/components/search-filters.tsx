"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import type { SearchFilters as SearchFiltersType, Hotel } from "@/lib/types"
import { MapPin, DollarSign, Star, Filter, X } from "lucide-react"

interface SearchFiltersProps {
  filters: SearchFiltersType
  onFiltersChange: (filters: SearchFiltersType) => void
}

const availableAmenities = [
  "WiFi",
  "Piscine",
  "Restaurant",
  "Spa",
  "Parking",
  "Climatisation",
  "Plage privée",
  "Club enfants",
  "Sports nautiques",
  "Centre affaires",
  "Salle de conférence",
  "Guide nature",
]

const regions = [
  "Analamanga",
  "Alaotra-Mangoro",
  "Diana",
  "Atsinanana",
  "Haute Matsiatra",
  "Vakinankaratra",
  "Boeny",
  "Menabe",
]

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number]>([filters.priceMax || 200000])
  const [showAllAmenities, setShowAllAmenities] = useState(false)

  const updateFilter = (key: keyof SearchFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({})
    setPriceRange([200000])
  }

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = filters.amenities || []
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a) => a !== amenity)
      : [...currentAmenities, amenity]
    updateFilter("amenities", newAmenities.length > 0 ? newAmenities : undefined)
  }

  const displayedAmenities = showAllAmenities ? availableAmenities : availableAmenities.slice(0, 6)

  return (
    <div className="space-y-6">
      {/* Header des filtres */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filtres
        </h2>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500 hover:text-gray-700">
          <X className="w-4 h-4 mr-1" />
          Effacer
        </Button>
      </div>

      {/* Localisation */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
            Localisation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="location">Ville ou région</Label>
            <Input
              id="location"
              placeholder="Ex: Antananarivo, Nosy Be..."
              value={filters.location || ""}
              onChange={(e) => updateFilter("location", e.target.value || undefined)}
            />
          </div>
          <div>
            <Label htmlFor="region">Région</Label>
            <Select
              value={filters.location || "all"}
              onValueChange={(value) => updateFilter("location", value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une région" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les régions</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Prix */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-emerald-600" />
            Prix par nuit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="priceMin">Min (Ar)</Label>
              <Input
                id="priceMin"
                type="number"
                placeholder="0"
                value={filters.priceMin || ""}
                onChange={(e) => updateFilter("priceMin", e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
            <div>
              <Label htmlFor="priceMax">Max (Ar)</Label>
              <Input
                id="priceMax"
                type="number"
                placeholder="200000"
                value={filters.priceMax || ""}
                onChange={(e) => updateFilter("priceMax", e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
          </div>
          <div>
            <Label>Prix maximum: {priceRange[0].toLocaleString()} Ar</Label>
            <Slider
              value={priceRange}
              onValueChange={(value) => {
                setPriceRange(value as [number])
                updateFilter("priceMax", value[0])
              }}
              max={200000}
              min={20000}
              step={10000}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Note */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Star className="w-4 h-4 mr-2 text-emerald-600" />
            Note minimum
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={filters.rating?.toString() || "all"}
            onValueChange={(value) => updateFilter("rating", value ? Number(value) : undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Toutes les notes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les notes</SelectItem>
              <SelectItem value="4.5">4.5+ étoiles</SelectItem>
              <SelectItem value="4">4+ étoiles</SelectItem>
              <SelectItem value="3.5">3.5+ étoiles</SelectItem>
              <SelectItem value="3">3+ étoiles</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Catégorie */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Catégorie</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={filters.category || "all"}
            onValueChange={(value) => updateFilter("category", (value as Hotel["category"]) || undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Toutes les catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              <SelectItem value="luxury">Luxe</SelectItem>
              <SelectItem value="business">Affaires</SelectItem>
              <SelectItem value="family">Famille</SelectItem>
              <SelectItem value="eco">Écologique</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Équipements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Équipements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {displayedAmenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={filters.amenities?.includes(amenity) || false}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <Label htmlFor={amenity} className="text-sm font-normal cursor-pointer">
                {amenity}
              </Label>
            </div>
          ))}
          {availableAmenities.length > 6 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllAmenities(!showAllAmenities)}
              className="text-emerald-600 hover:text-emerald-700 p-0 h-auto font-normal"
            >
              {showAllAmenities ? "Voir moins" : `Voir ${availableAmenities.length - 6} de plus`}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
