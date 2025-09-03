"use client" 

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Heart,
  MapPin,
  Calendar,
  Star,
  Settings,
  Sparkles,
  Hotel,
  Clock,
  Search,
  MessageCircle,
  GitCompare as Compare,
  Filter,
  X,
  Send,
} from "lucide-react"
import Link from "next/link"

// -----------------------------
// ✅ Types explicites (corrige les erreurs sur id, image, reviews, etc.)
// -----------------------------

type Review = {
  user: string
  rating: number
  comment: string
  date: string
}

type HotelType = {
  id: number
  name: string
  location: string
  rating: number
  price: number
  image: string
  description: string
  amenities: string[]
  reviews: Review[]
}

type ChatMessage = { id: number; text: string; sender: "ai" | "user" }

type Booking = { id: number; hotel: string; dates: string; status: string; total: string }

type Filters = { priceRange: [number, number]; rating: number; amenities: string[] }

type PerHotelUserReview = { rating: number; comment: string; date: string }

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedHotel, setSelectedHotel] = useState<HotelType | null>(null)
  const [comparisonHotels, setComparisonHotels] = useState<HotelType[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider à trouver l'hôtel parfait à Antananarivo ?",
      sender: "ai",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [favorites, setFavorites] = useState<HotelType[]>([])
  const [bookings] = useState<Booking[]>([])
  const [userReviews, setUserReviews] = useState<Record<number, PerHotelUserReview>>({})
  const [showComparison, setShowComparison] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 500000],
    rating: 0,
    amenities: [],
  })

  // -----------------------------
  // Données des hôtels (tipées)
  // -----------------------------
  const hotels: HotelType[] = [
    {
      id: 1,
      name: "Hôtel Colbert",
      location: "Analakely",
      rating: 4.8,
      price: 120000,
      image: "/luxury-hotel-antananarivo.png",
      description:
        "Un hôtel de luxe situé au cœur d'Antananarivo, offrant un service exceptionnel et des chambres spacieuses.",
      amenities: ["Wi-Fi", "Piscine", "Spa", "Restaurant", "Parking"],
      reviews: [
        { user: "Marie L.", rating: 5, comment: "Séjour exceptionnel ! Le personnel est très attentionné.", date: "2024-02-15" },
        { user: "Jean P.", rating: 4, comment: "Très bel hôtel, petit déjeuner excellent.", date: "2024-02-10" },
      ],
    },
    {
      id: 2,
      name: "Carlton Madagascar",
      location: "Ankorondrano",
      rating: 4.9,
      price: 180000,
      image: "/modern-hotel-suite-madagascar.png",
      description: "Hôtel moderne avec des suites luxueuses et une vue imprenable sur la ville.",
      amenities: ["Wi-Fi", "Piscine", "Gym", "Room Service", "Bar"],
      reviews: [
        { user: "Sophie T.", rating: 5, comment: "Vue magnifique et service impeccable.", date: "2024-02-18" },
        { user: "Paul M.", rating: 4, comment: "Très bon séjour, mais un peu cher.", date: "2024-02-12" },
      ],
    },
    {
      id: 3,
      name: "Palissandre Hotel & Spa",
      location: "Andrainarivo",
      rating: 4.7,
      price: 150000,
      image: "/placeholder.svg?height=200&width=300",
      description: "Hôtel boutique avec spa et restaurant gastronomique.",
      amenities: ["Wi-Fi", "Spa", "Restaurant", "Room Service", "Parking"],
      reviews: [{ user: "Lucie D.", rating: 5, comment: "Spa incroyable et nourriture délicieuse.", date: "2024-02-05" }],
    },
    {
      id: 4,
      name: "Ivato Hotel",
      location: "Ivato",
      rating: 4.5,
      price: 90000,
      image: "/placeholder.svg?height=200&width=300",
      description: "Hôtel pratique près de l'aéroport avec des chambres confortables.",
      amenities: ["Wi-Fi", "Navette aéroport", "Restaurant", "Parking"],
      reviews: [{ user: "Thomas B.", rating: 4, comment: "Parfait pour une nuit près de l'aéroport.", date: "2024-01-28" }],
    },
  ]

  // -----------------------------
  // Filtrage des hôtels
  // -----------------------------
  const filteredHotels = hotels.filter((hotel) => {
    const q = searchQuery.trim().toLowerCase()
    const matchesSearch =
      !q || hotel.name.toLowerCase().includes(q) || hotel.location.toLowerCase().includes(q)

    const matchesPrice = hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1]
    const matchesRating = hotel.rating >= filters.rating
    const matchesAmenities =
      filters.amenities.length === 0 || filters.amenities.every((a) => hotel.amenities.includes(a))

    return matchesSearch && matchesPrice && matchesRating && matchesAmenities
  })

  // -----------------------------
  // Gestion des favoris / comparaison / avis / chat
  // -----------------------------
  const toggleFavorite = (hotel: HotelType) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === hotel.id) ? prev.filter((f) => f.id !== hotel.id) : [...prev, hotel]
    )
  }

  const toggleComparison = (hotel: HotelType) => {
    setComparisonHotels((prev) =>
      prev.some((h) => h.id === hotel.id)
        ? prev.filter((h) => h.id !== hotel.id)
        : prev.length < 3
        ? [...prev, hotel]
        : prev
    )
  }

  const sendMessage = () => {
    const text = newMessage.trim()
    if (!text) return

    setChatMessages((prev) => {
      const nextId = prev.length ? prev[prev.length - 1].id + 1 : 1
      return [...prev, { id: nextId, text, sender: "user" }]
    })
    setNewMessage("")

    // Simulation de réponse IA
    setTimeout(() => {
      setChatMessages((prev) => {
        const nextId = prev.length ? prev[prev.length - 1].id + 1 : 1
        return [
          ...prev,
          {
            id: nextId,
            text:
              "Je comprends que vous cherchez un hôtel. Pouvez-vous me donner plus de détails sur vos préférences ?",
            sender: "ai",
          },
        ]
      })
    }, 500)
  }

  const addReview = (hotelId: number, rating: number, comment: string) => {
    setUserReviews((prev) => ({
      ...prev,
      [hotelId]: { rating, comment, date: new Date().toISOString().split("T")[0] },
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-400" />
              <span className="font-sans text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Hôtels Antananarivo
              </span>
            </Link>

            {/* Barre de recherche */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Rechercher un hôtel ou un lieu..."
                  className="pl-10 pr-4 py-2 w-full rounded-full bg-card border-purple-500/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowFilters((s) => !s)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setActiveTab("profile")}>
                <Settings className="h-4 w-4 mr-2" />
                Profil
              </Button>
            </div>
          </div>

          {/* Filtres */}
          {showFilters && (
            <div className="mt-4 p-4 bg-card rounded-lg border border-purple-500/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Filtres</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Prix max: {filters.priceRange[1].toLocaleString()} Ar
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={500000}
                    step={50000}
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, priceRange: [0, parseInt(e.target.value)] }))
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Note minimum</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters((f) => ({ ...f, rating: parseInt(e.target.value) }))}
                    className="w-full p-2 rounded-md border border-purple-500/20"
                  >
                    <option value={0}>Toutes</option>
                    <option value={3}>3+ étoiles</option>
                    <option value={4}>4+ étoiles</option>
                    <option value={5}>5 étoiles</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Équipements</label>
                  <select
                    multiple
                    value={filters.amenities}
                    onChange={(e) => {
                      const options = Array.from(e.currentTarget.selectedOptions, (o) => o.value)
                      setFilters((f) => ({ ...f, amenities: options }))
                    }}
                    className="w-full p-2 rounded-md border border-purple-500/20 h-24"
                  >
                    <option value="Wi-Fi">Wi-Fi</option>
                    <option value="Piscine">Piscine</option>
                    <option value="Spa">Spa</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Gym">Gym</option>
                    <option value="Parking">Parking</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Navigation principale */}
      <div className="container mx-auto px-4 py-4 border-b border-purple-500/20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 bg-card/50 border border-purple-500/20">
            <TabsTrigger value="home" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              Accueil
            </TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              Recherche
            </TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              Comparateur
            </TabsTrigger>
            <TabsTrigger value="assistant" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              Assistant IA
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              Mon Profil
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Page d'accueil */}
        {activeTab === "home" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Hôtels populaires à Antananarivo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <Card
                  key={hotel.id}
                  className="modern-card glass-effect border-purple-500/20 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-48 object-cover" />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                      onClick={() => toggleFavorite(hotel)}
                    >
                      <Heart
                        className={`h-4 w-4 ${favorites.some((f) => f.id === hotel.id) ? "fill-red-400 text-red-400" : ""}`}
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 left-2 bg-black/50 hover:bg-black/70 text-white"
                      onClick={() => toggleComparison(hotel)}
                    >
                      <Compare
                        className={`h-4 w-4 ${
                          comparisonHotels.some((h) => h.id === hotel.id) ? "text-blue-400" : ""
                        }`}
                      />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{hotel.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{hotel.location}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{hotel.rating}</span>
                      </div>
                      <span className="font-bold text-purple-400">{hotel.price.toLocaleString()} Ar/nuit</span>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelectedHotel(hotel)
                        setActiveTab("details")
                      }}
                    >
                      Voir les détails
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Page de recherche */}
        {activeTab === "search" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Résultats de recherche</h2>
            {filteredHotels.length === 0 ? (
              <Card className="modern-card glass-effect border-purple-500/20">
                <CardContent className="p-8 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucun hôtel trouvé</h3>
                  <p className="text-muted-foreground mb-4">Essayez de modifier vos critères de recherche</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHotels.map((hotel) => (
                  <Card key={hotel.id} className="modern-card glass-effect border-purple-500/20 overflow-hidden">
                    <div className="relative">
                      <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-48 object-cover" />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                        onClick={() => toggleFavorite(hotel)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.some((fav) => fav.id === hotel.id) ? "fill-red-400 text-red-400" : ""
                          }`}
                        />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{hotel.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{hotel.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{hotel.rating}</span>
                        </div>
                        <span className="font-bold text-purple-400">{hotel.price.toLocaleString()} Ar/nuit</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Détails de l'hôtel */}
        {activeTab === "details" && selectedHotel && (
          <div>
            <Button variant="ghost" onClick={() => setActiveTab("home")} className="mb-4">
              ← Retour
            </Button>

            <Card className="modern-card glass-effect border-purple-500/20 overflow-hidden mb-6">
              <div className="relative h-64">
                <img
                  src={selectedHotel.image || "/placeholder.svg"}
                  alt={selectedHotel.name}
                  className="w-full h-full object-cover"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => toggleFavorite(selectedHotel)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.some((fav) => fav.id === selectedHotel.id) ? "fill-red-400 text-red-400" : ""
                    }`}
                  />
                </Button>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedHotel.name}</h2>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{selectedHotel.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{selectedHotel.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-400">{selectedHotel.price.toLocaleString()} Ar/nuit</p>
                    <Button className="mt-2">Réserver maintenant</Button>
                  </div>
                </div>

                <p className="mb-6">{selectedHotel.description}</p>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Équipements</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedHotel.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Avis</h3>
                  {selectedHotel.reviews.map((review, index) => (
                    <Card key={index} className="mb-3 border-purple-500/20">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{review.user}</p>
                            <div className="flex items-center gap-1 mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                              ))}
                            </div>
                            <p className="text-sm">{review.comment}</p>
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Formulaire d'avis */}
                  <Card className="mt-4 border-purple-500/20">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Ajouter un avis</h4>
                      <div className="flex items-center gap-2 mb-3">
                        <span>Note:</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 cursor-pointer ${
                                star <= (userReviews[selectedHotel.id]?.rating || 0)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              onClick={() =>
                                addReview(selectedHotel.id, star, userReviews[selectedHotel.id]?.comment || "")
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <Textarea
                        placeholder="Votre avis..."
                        className="mb-3"
                        value={userReviews[selectedHotel.id]?.comment || ""}
                        onChange={(e) =>
                          addReview(selectedHotel.id, userReviews[selectedHotel.id]?.rating || 0, e.target.value)
                        }
                      />
                      <Button
                        onClick={() => {
                          /* Ici vous pourriez envoyer l'avis au backend */
                        }}
                      >
                        Publier l'avis
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Comparateur d'hôtels */}
        {activeTab === "comparison" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Comparateur d'hôtels</h2>
              {comparisonHotels.length > 0 && (
                <Button variant="outline" onClick={() => setShowComparison(true)}>
                  Voir la comparaison
                </Button>
              )}
            </div>

            {comparisonHotels.length === 0 ? (
              <Card className="modern-card glass-effect border-purple-500/20">
                <CardContent className="p-8 text-center">
                  <Compare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucun hôtel à comparer</h3>
                  <p className="text-muted-foreground mb-4">
                    Sélectionnez jusqu'à 3 hôtels à comparer en cliquant sur l'icône de comparaison
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comparisonHotels.map((hotel) => (
                  <Card key={hotel.id} className="modern-card glass-effect border-purple-500/20 overflow-hidden">
                    <div className="relative">
                      <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-48 object-cover" />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                        onClick={() => toggleComparison(hotel)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{hotel.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{hotel.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{hotel.rating}</span>
                        </div>
                        <span className="font-bold text-purple-400">{hotel.price.toLocaleString()} Ar/nuit</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Comparaison détaillée */}
            {showComparison && comparisonHotels.length > 0 && (
              <Dialog open={showComparison} onOpenChange={setShowComparison}>
                <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Comparaison détaillée</DialogTitle>
                  </DialogHeader>

                  <div className="grid grid-cols-4 gap-4 mt-4">
                    <div className="font-medium">Critères</div>
                    {comparisonHotels.map((hotel) => (
                      <div key={hotel.id} className="text-center">
                        <img
                          src={hotel.image || "/placeholder.svg"}
                          alt={hotel.name}
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                        <h4 className="font-semibold">{hotel.name}</h4>
                      </div>
                    ))}

                    <div className="font-medium col-span-4 mt-4 border-t pt-2">Prix par nuit</div>
                    {comparisonHotels.map((hotel) => (
                      <div key={hotel.id} className="text-center">
                        {hotel.price.toLocaleString()} Ar
                      </div>
                    ))}

                    <div className="font-medium col-span-4 mt-2">Note</div>
                    {comparisonHotels.map((hotel) => (
                      <div key={hotel.id} className="text-center">
                        <div className="flex justify-center items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{hotel.rating}</span>
                        </div>
                      </div>
                    ))}

                    <div className="font-medium col-span-4 mt-2">Localisation</div>
                    {comparisonHotels.map((hotel) => (
                      <div key={hotel.id} className="text-center">
                        {hotel.location}
                      </div>
                    ))}

                    <div className="font-medium col-span-4 mt-2">Équipements</div>
                    {comparisonHotels.map((hotel) => (
                      <div key={hotel.id} className="text-center">
                        <div className="flex flex-wrap justify-center gap-1">
                          {hotel.amenities.slice(0, 3).map((amenity, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs bg-purple-500/20 text-purple-400 border-purple-500/30"
                            >
                              {amenity}
                            </Badge>
                          ))}
                          {hotel.amenities.length > 3 && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-purple-500/20 text-purple-400 border-purple-500/30"
                            >
                              +{hotel.amenities.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        )}

        {/* Assistant IA */}
        {activeTab === "assistant" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Assistant IA</h2>

            <Card className="modern-card glass-effect border-purple-500/20">
              <CardContent className="p-6">
                <div className="h-96 overflow-y-auto mb-4 space-y-4">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs lg:max-w-md rounded-lg p-4 ${
                          message.sender === "user" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p>{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Posez votre question..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button onClick={sendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="text-left justify-start"
                    onClick={() => setNewMessage("Quels sont les meilleurs hôtels pour un voyage d'affaires ?")}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Hôtels d'affaires
                  </Button>
                  <Button
                    variant="outline"
                    className="text-left justify-start"
                    onClick={() => setNewMessage("Quels hôtels ont les meilleurs spas ?")}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Spas et détente
                  </Button>
                  <Button
                    variant="outline"
                    className="text-left justify-start"
                    onClick={() => setNewMessage("Je cherche un hôtel romantique pour un week-end.")}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Séjour romantique
                  </Button>
                  <Button
                    variant="outline"
                    className="text-left justify-start"
                    onClick={() => setNewMessage("Quels sont les hôtels les plus économiques ?")}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Options économiques
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Profil utilisateur */}
        {activeTab === "profile" && (
          <div>
            {/* Profile Header */}
            <div className="mb-8">
              <Card className="modern-card glass-effect border-purple-500/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20 border-2 border-purple-400">
                      <AvatarImage src="/professional-avatar.png" />
                      <AvatarFallback className="bg-purple-500/20 text-purple-400 text-xl font-bold">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold mb-2">John Doe</h1>
                      <p className="text-muted-foreground mb-4">Membre depuis Mars 2024</p>
                      <div className="flex items-center gap-4">
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          <Star className="h-3 w-3 mr-1" />
                          Voyageur Vérifié
                        </Badge>
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          <Heart className="h-3 w-3 mr-1" />
                          {favorites.length} Favoris
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="favorites" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-card/50 border border-purple-500/20">
                <TabsTrigger value="favorites" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                  <Heart className="h-4 w-4 mr-2" />
                  Mes Favoris
                </TabsTrigger>
                <TabsTrigger value="bookings" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  Mes Réservations
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                  <Clock className="h-4 w-4 mr-2" />
                  Historique
                </TabsTrigger>
              </TabsList>

              <TabsContent value="favorites" className="space-y-4">
                {favorites.length === 0 ? (
                  <Card className="modern-card glass-effect border-purple-500/20">
                    <CardContent className="p-8 text-center">
                      <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Aucun favori pour le moment</h3>
                      <p className="text-muted-foreground mb-4">
                        Ajoutez des hôtels à vos favoris en cliquant sur l'icône cœur
                      </p>
                      <Button asChild>
                        <Link href="/">Explorer les hôtels</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((hotel) => (
                      <Card key={hotel.id} className="modern-card glass-effect border-purple-500/20 overflow-hidden">
                        <div className="relative">
                          <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-48 object-cover" />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                            onClick={() => toggleFavorite(hotel)}
                          >
                            <Heart className="h-4 w-4 fill-red-400 text-red-400" />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{hotel.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{hotel.location}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{hotel.rating}</span>
                            </div>
                            <span className="font-bold text-purple-400">{hotel.price.toLocaleString()} Ar/nuit</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="bookings" className="space-y-4">
                {bookings.length === 0 ? (
                  <Card className="modern-card glass-effect border-purple-500/20">
                    <CardContent className="p-8 text-center">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Aucune réservation pour le moment</h3>
                      <p className="text-muted-foreground mb-4">Vos réservations apparaîtront ici</p>
                      <Button asChild>
                        <Link href="/">Réserver un hôtel</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  bookings.map((booking) => (
                    <Card key={booking.id} className="modern-card glass-effect border-purple-500/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-500/20 rounded-lg">
                              <Hotel className="h-6 w-6 text-purple-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{booking.hotel}</h3>
                              <p className="text-muted-foreground">{booking.dates}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              className={
                                booking.status === "Confirmé"
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              }
                            >
                              {booking.status}
                            </Badge>
                            <p className="font-bold text-lg mt-2">{booking.total}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card className="modern-card glass-effect border-purple-500/20">
                  <CardContent className="p-8 text-center">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Aucun historique pour le moment</h3>
                    <p className="text-muted-foreground mb-4">Vos recherches et activités récentes apparaîtront ici</p>
                    <Button asChild>
                      <Link href="/">Commencer à explorer</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      {/* Chat IA flottant */}
      <Button
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-purple-500 hover:bg-purple-600"
        onClick={() => setShowChat((s) => !s)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {showChat && (
        <Card className="fixed bottom-20 right-6 w-80 h-96 shadow-xl border-purple-500/20">
          <CardContent className="p-0 h-full flex flex-col">
            <div className="p-3 bg-purple-500 text-white font-semibold flex justify-between items-center">
              <span>Assistant IA</span>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white" onClick={() => setShowChat(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {chatMessages.slice(-6).map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs rounded-lg p-2 text-sm ${
                      message.sender === "user" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Posez une question..."
                  className="text-sm"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button size="sm" onClick={sendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
