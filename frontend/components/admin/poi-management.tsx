import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Plus, Edit, Hospital, Building, Plane } from "lucide-react"

const poiCategories = [
  {
    name: "Hôpitaux",
    count: 12,
    icon: Hospital,
    color: "text-red-600",
    recent: "Hôpital Militaire ajouté",
  },
  {
    name: "Ministères",
    count: 8,
    icon: Building,
    color: "text-blue-600",
    recent: "Ministère du Tourisme mis à jour",
  },
  {
    name: "Aéroports",
    count: 2,
    icon: Plane,
    color: "text-green-600",
    recent: "Ivato - horaires mis à jour",
  },
  {
    name: "Zones d'affaires",
    count: 15,
    icon: Building,
    color: "text-purple-600",
    recent: "Galaxy Andraharo ajouté",
  },
]

export function POIManagement() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-serif flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Points d'intérêt
          </CardTitle>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
            <Plus className="h-4 w-4 mr-1" />
            Ajouter POI
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {poiCategories.map((category) => (
          <div key={category.name} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <category.icon className={`h-5 w-5 ${category.color}`} />
              <div>
                <div className="font-medium text-sm">{category.name}</div>
                <div className="text-xs text-stone-600">{category.recent}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{category.count}</Badge>
              <Button variant="ghost" size="sm">
                <Edit className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}

        <div className="border-t pt-4">
          <h4 className="font-medium text-sm mb-2">Statistiques d'utilisation</h4>
          <div className="text-xs text-stone-600 space-y-1">
            <p>• 1,247 recherches "près de" cette semaine</p>
            <p>• POI le plus recherché: Aéroport Ivato</p>
            <p>• 89% des recherches incluent un POI</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
