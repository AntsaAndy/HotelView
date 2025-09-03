// Types pour la plateforme hôtelière Madagascar

export interface User {
  id: string
  email: string
  name: string
  role: "visitor" | "hotelier" | "moderator" | "admin" | "data-analyst"
  createdAt: Date
}

export interface Hotel {
  id: string
  name: string
  description: string
  address: string
  city: string
  region: string
  coordinates: {
    lat: number
    lng: number
  }
  priceRange: {
    min: number
    max: number
  }
  rating: number
  amenities: string[]
  images: string[]
  category: "family" | "business" | "eco" | "luxury"
  badges: string[]
  availability: boolean
  hotelierEmail: string
  createdAt: Date
}

export interface SearchFilters {
  location?: string
  priceMin?: number
  priceMax?: number
  rating?: number
  amenities?: string[]
  category?: Hotel["category"]
  dateFrom?: Date
  dateTo?: Date
}

export interface Reservation {
  id: string
  userId: string
  hotelId: string
  checkIn: Date
  checkOut: Date
  guests: number
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: Date
}
