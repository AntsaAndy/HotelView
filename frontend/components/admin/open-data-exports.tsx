import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, Database } from "lucide-react"

const exports = [
  {
    name: "Données mensuelles Janvier 2025",
    type: "CSV",
    size: "2.3 MB",
    date: "01/02/2025",
    status: "ready",
    description: "Statistiques agrégées par commune",
  },
  {
    name: "Tendances tarifaires Q4 2024",
    type: "JSON",
    size: "1.8 MB",
    date: "15/01/2025",
    status: "ready",
    description: "Fourchettes de prix anonymisées",
  },
  {
    name: "Cartographie des équipements",
    type: "GeoJSON",
    size: "4.1 MB",
    date: "10/01/2025",
    status: "processing",
    description: "Répartition géographique des services",
  },
]

export function OpenDataExports() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif flex items-center">
          <Database className="h-5 w-5 mr-2" />
          Open Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {exports.map((exportItem) => (
            <div key={exportItem.name} className="border border-stone-200 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-sm">{exportItem.name}</h4>
                  <p className="text-xs text-stone-600">{exportItem.description}</p>
                </div>
                <Badge variant={exportItem.status === "ready" ? "secondary" : "outline"}>
                  {exportItem.status === "ready" ? "Prêt" : "En cours"}
                </Badge>
              </div>

              <div className="flex justify-between items-center text-xs text-stone-600 mb-3">
                <span>
                  {exportItem.type} • {exportItem.size}
                </span>
                <span>{exportItem.date}</span>
              </div>

              <Button
                size="sm"
                variant="outline"
                className="w-full bg-transparent"
                disabled={exportItem.status !== "ready"}
              >
                <Download className="h-3 w-3 mr-1" />
                Télécharger
              </Button>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <Button className="w-full bg-amber-600 hover:bg-amber-700">
            <Calendar className="h-4 w-4 mr-2" />
            Programmer un export
          </Button>
        </div>

        <div className="text-xs text-stone-600 space-y-1">
          <p>• Données anonymisées et agrégées</p>
          <p>• Conformité RGPD respectée</p>
          <p>• API publique disponible</p>
        </div>
      </CardContent>
    </Card>
  )
}
