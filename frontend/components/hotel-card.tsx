"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Hotel } from "@/lib/types"
import { Star, MapPin, Wifi, Car, Utensils, Waves } from "lucide-react"

interface HotelCardProps {
  hotel: Hotel
  viewMode?: "grid" | "list"
}

const getAmenityIcon = (amenity: string) => {
  const amenityLower = amenity.toLowerCase()
  if (amenityLower.includes("wifi")) return <Wifi className="w-3 h-3" />
  if (amenityLower.includes("parking")) return <Car className="w-3 h-3" />
  if (amenityLower.includes("restaurant")) return <Utensils className="w-3 h-3" />
  if (amenityLower.includes("piscine")) return <Waves className="w-3 h-3" />
  return null
}

const getCategoryLabel = (category: Hotel["category"]) => {
  switch (category) {
    case "luxury":
      return "Luxe"
    case "business":
      return "Affaires"
    case "family":
      return "Famille"
    case "eco":
      return "Écologique"
    default:
      return category
  }
}

const getCategoryColor = (category: Hotel["category"]) => {
  switch (category) {
    case "luxury":
      return "bg-purple-100 text-purple-800"
    case "business":
      return "bg-blue-100 text-blue-800"
    case "family":
      return "bg-green-100 text-green-800"
    case "eco":
      return "bg-emerald-100 text-emerald-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function HotelCard({ hotel, viewMode = "grid" }: HotelCardProps) {
  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex">
          <div className="relative w-64 h-48 flex-shrink-0">
            <Image
              src={hotel.images[0] || "/placeholder.svg"}
              alt={hotel.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 256px"
            />
            <div className="absolute top-3 left-3">
              <Badge className={getCategoryColor(hotel.category)}>{getCategoryLabel(hotel.category)}</Badge>
            </div>
          </div>
          <CardContent className="flex-1 p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{hotel.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {hotel.city}, {hotel.region}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center mb-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{hotel.rating}</span>
                </div>
                <div className="text-lg font-bold text-emerald-600">
                  {hotel.priceRange.min.toLocaleString()} - {hotel.priceRange.max.toLocaleString()} Ar
                </div>
                <div className="text-sm text-gray-500">par nuit</div>
              </div>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.slice(0, 4).map((amenity) => (
                  <div key={amenity} className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {getAmenityIcon(amenity)}
                    <span className="ml-1">{amenity}</span>
                  </div>
                ))}
                {hotel.amenities.length > 4 && (
                  <span className="text-xs text-gray-500">+{hotel.amenities.length - 4} autres</span>
                )}
              </div>
              <Link href={`/hotel/${hotel.id}`}>
                <Button className="bg-emerald-600 hover:bg-emerald-700">Voir détails</Button>
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={hotel.images[0] || "/placeholder.svg"}
          alt={hotel.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <Badge className={getCategoryColor(hotel.category)}>{getCategoryLabel(hotel.category)}</Badge>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="font-medium text-sm">{hotel.rating}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{hotel.name}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="text-sm line-clamp-1">
              {hotel.city}, {hotel.region}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hotel.description}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <div key={amenity} className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {getAmenityIcon(amenity)}
              <span className="ml-1">{amenity}</span>
            </div>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="text-xs text-gray-500 px-2 py-1">+{hotel.amenities.length - 3}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-emerald-600">{hotel.priceRange.min.toLocaleString()} Ar</div>
            <div className="text-xs text-gray-500">par nuit</div>
          </div>
          <Link href={`/hotel/${hotel.id}`}>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              Voir détails
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
