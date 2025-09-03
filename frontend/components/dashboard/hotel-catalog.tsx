import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Camera, Calendar, DollarSign } from "lucide-react"

const rooms = [
  {
    id: 1,
    name: "Chambre Standard",
    type: "Standard",
    price: 120000,
    availability: "Disponible",
    photos: 5,
    status: "active",
  },
  {
    id: 2,
    name: "Suite Junior",
    type: "Suite",
    price: 180000,
    availability: "Complet",
    photos: 8,
    status: "active",
  },
  {
    id: 3,
    name: "Chambre Familiale",
    type: "Familiale",
    price: 150000,
    availability: "Disponible",
    photos: 3,
    status: "draft",
  },
]

export function HotelCatalog() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-serif">Catalogue des chambres</CardTitle>
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une chambre
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rooms.map((room) => (
            <div key={room.id} className="border border-stone-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-stone-900">{room.name}</h3>
                  <p className="text-sm text-stone-600">{room.type}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={room.status === "active" ? "default" : "secondary"}>
                    {room.status === "active" ? "Publié" : "Brouillon"}
                  </Badge>
                  <Badge variant={room.availability === "Disponible" ? "secondary" : "destructive"}>
                    {room.availability}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center text-sm text-stone-600">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {room.price.toLocaleString()} Ar/nuit
                </div>
                <div className="flex items-center text-sm text-stone-600">
                  <Camera className="h-4 w-4 mr-1" />
                  {room.photos} photos
                </div>
                <div className="flex items-center text-sm text-stone-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  Calendrier à jour
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Modifier
                </Button>
                <Button variant="outline" size="sm">
                  <Camera className="h-4 w-4 mr-1" />
                  Photos
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  Disponibilités
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
