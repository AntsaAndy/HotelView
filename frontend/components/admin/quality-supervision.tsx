import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp } from "lucide-react"

const qualityMetrics = [
  {
    category: "Complétude des fiches",
    score: 87,
    trend: "+5%",
    details: "213/247 hôtels avec fiches complètes",
  },
  {
    category: "Qualité des photos",
    score: 72,
    trend: "+12%",
    details: "Détection IA : 34 photos à améliorer",
  },
  {
    category: "Géolocalisation",
    score: 95,
    trend: "+2%",
    details: "12 adresses à vérifier",
  },
  {
    category: "Tarifs à jour",
    score: 68,
    trend: "-3%",
    details: "79 hôtels sans mise à jour >7j",
  },
]

const searchTrends = [
  { query: "hôtel analakely", count: 1247, change: "+15%" },
  { query: "maison d'hôtes ivandry", count: 892, change: "+8%" },
  { query: "hôtel pas cher antananarivo", count: 756, change: "+22%" },
  { query: "hôtel avec piscine", count: 634, change: "+5%" },
]

export function QualitySupervision() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Supervision qualité
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {qualityMetrics.map((metric) => (
            <div key={metric.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{metric.category}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-stone-600">{metric.score}%</span>
                  <span className="text-xs text-green-600">{metric.trend}</span>
                </div>
              </div>
              <Progress value={metric.score} className="h-2" />
              <p className="text-xs text-stone-600">{metric.details}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Tendances de recherche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {searchTrends.map((trend, index) => (
              <div key={trend.query} className="flex justify-between items-center p-2 bg-stone-50 rounded">
                <div>
                  <div className="text-sm font-medium">
                    #{index + 1} {trend.query}
                  </div>
                  <div className="text-xs text-stone-600">{trend.count} recherches</div>
                </div>
                <div className="text-xs text-green-600">{trend.change}</div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 bg-transparent">
            Voir toutes les tendances
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
