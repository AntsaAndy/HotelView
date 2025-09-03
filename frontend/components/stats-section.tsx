"use client"

import { Award, Users, Star, MapPin, Calendar, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "./ui/card"

export function StatsSection() {
  const { t } = useLanguage()

  // Configuration for hotel badges
  const badgeConfig = {
    recommended: {
      label: "Recommandé",
      color: "bg-green-500 text-white",
      icon: Award,
    },
    popular: {
      label: "Populaire",
      color: "bg-yellow-500 text-white",
      icon: Users,
    },
    premium: {
      label: "Premium",
      color: "bg-purple-500 text-white",
      icon: Star,
    },
    eco: {
      label: "Éco",
      color: "bg-green-200 text-green-800",
      icon: Award,
    },
    famille: {
      label: "Famille",
      color: "bg-blue-200 text-blue-800",
      icon: Users,
    },
    business: {
      label: "Business",
      color: "bg-purple-200 text-purple-800",
      icon: Star,
    },
  };

  // Mock data for hotels
  const hotels = [
    {
      id: 1,
      name: "Hotel Example",
      image: "/placeholder.svg",
      location: "Antananarivo",
      rating: 4.5,
      reviews: 120,
      price: 80,
      badges: ["recommended"],
      amenities: ["WiFi", "Parking", "Piscine"],
    },
    {
    id: 2,
    name: "Relais des Plateaux",
    price: 85,
    rating: 4.2,
    reviews: 156,
    badges: ["eco", "famille"],
    image: "/boutique-hotel-madagascar.png",
    location: "Analakely",
    amenities: ["WiFi", "Restaurant", "Jardin", "Parking"],
  },
  {
    id: 3,
    name: "Sakamanga Hotel",
    price: 95,
    rating: 4.3,
    reviews: 289,
    badges: ["business"],
    image: "/business-hotel-antananarivo.png",
    location: "Tsaralalana",
    amenities: ["WiFi", "Centre d'affaires", "Restaurant", "Bar"],
  },
  ];

  return (
    <section className="py-20 bg-dark">
         {/* Contenu principal avec carte et hôtels */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des hôtels */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black text-gray-900">Hôtels disponibles ({hotels.length})</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Prix
                </Button>
                <Button variant="outline" size="sm">
                  Note
                </Button>
                <Button variant="outline" size="sm">
                  Distance
                </Button>
              </div>
            </div>

            {hotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={hotel.image || "/placeholder.svg"}
                        alt={hotel.name}
                        className="w-full h-48 md:h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex gap-1">
                        {hotel.badges.map((badge) => {
                          const config = badgeConfig[badge as keyof typeof badgeConfig]
                          const IconComponent = config.icon
                          return (
                            <Badge key={badge} className={`${config.color} flex items-center gap-1`}>
                              <IconComponent className="h-3 w-3" />
                              {config.label}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>

                    {/* Informations */}
                    <div className="md:col-span-2 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h4>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{hotel.location}</span>
                          </div>
                          <div className="flex items-center mb-3">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="ml-1 font-semibold">{hotel.rating}</span>
                              <span className="ml-1 text-gray-600 text-sm">({hotel.reviews} avis)</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-blue-600">{hotel.price}€</div>
                          <div className="text-sm text-gray-600">par nuit</div>
                        </div>
                      </div>

                      {/* Équipements */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.map((amenity, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex gap-3">
                        <Button
                          className="flex-1 hover:opacity-90 transition"
                            style={{ backgroundColor: "#16697a" }}
                            >
                            <Calendar className="h-4 w-4 mr-2" />
                            Réserver
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <Phone className="h-4 w-4 mr-2" />
                          Contacter
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Carte */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gray-200 h-96 flex items-center justify-center relative">
                    <img
                      src="/antananarivo-map-hotels.png"
                      alt="Carte d'Antananarivo"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center">
                        <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-gray-700">Carte interactive</p>
                        <p className="text-xs text-gray-600">Voir les hôtels sur la carte</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
