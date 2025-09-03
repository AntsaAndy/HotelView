"use client"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "./ui/card"
import { Badge, Star, Users, BedDouble, Gem, Phone, MapPin } from "lucide-react"
import { Button } from "./ui/button"

export function RoomsSection() {
  const { t } = useLanguage()

  const rooms = [
    {
      id: 1,
      name: "Deluxe Family Rooms",
      price: "150",
      currency: "€",
      period: "/ Night",
      image: "/antananarivo-hotel-family-room.png",
      rating: 4.8,
      badges: ["family", "deluxe"],
      location: "Antananarivo Centre",
      reviews: 120,
    },
    {
      id: 2,
      name: "Double Suite Rooms",
      price: "200",
      currency: "€",
      period: "/ Night",
      image: "/madagascar-hotel-suite.png",
      rating: 4.9,
      badges: ["suite", "double"],
      location: "Antananarivo Nord",
      reviews: 98,
    },
    {
      id: 3,
      name: "Superior Bed Rooms",
      price: "120",
      currency: "€",
      period: "/ Night",
      image: "/antananarivo-hotel-bedroom.png",
      rating: 4.7,
      badges: ["superior", "bed"],
      location: "Antananarivo Sud",
      reviews: 76,
    },
  ]

  // Define badgeConfig object
  const badgeConfig = {
   business: {
      label: "Business",
      color: "bg-purple-200 text-purple-800",
      icon: Gem,
    },
    family: {
      label: "Famille",
      color: "bg-blue-200 text-blue-800",
      icon: Users,
    },
    eco: {
      label: "Éco",
      color: "bg-green-200 text-green-800",
      icon: Gem,
    },
    deluxe: {
      label: "Deluxe",
      color: "bg-purple-500 text-white",
      icon: Gem,
    },
    suite: {
      label: "Suite",
      color: "bg-pink-500 text-white",
      icon: Gem,
    },
    double: {
      label: "Double",
      color: "bg-blue-500 text-white",
      icon: BedDouble,
    },
    superior: {
      label: "Supérieur",
      color: "bg-orange-500 text-white",
      icon: BedDouble,
    },
    bed: {
      label: "Lit",
      color: "bg-gray-500 text-white",
      icon: BedDouble,
    },
  }

  return (
    <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-gray-900 mb-4">Hôtels Recommandés</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos suggestions d'hôtels les plus populaires à Antananarivo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((hotel) => (
              <Card
                key={`rec-${hotel.id}`}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={hotel.image || "/placeholder.svg"}
                      alt={hotel.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-yellow-500 text-white">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {hotel.rating}
                      </Badge>
                    </div>
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
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

                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h4>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{hotel.location}</span>
                    </div> 

                    <div className="flex justify-between items-center mb-4">
                      <div className="text-2xl font-black text-gray-600">{hotel.price}€</div>
                      <div className="text-sm text-gray-600">({hotel.reviews} avis)</div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" style={{ backgroundColor: '#16697a', color: 'white' }}>Réserver</Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
  )
}
