import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle } from "lucide-react"

const qualityChecks = [
  {
    category: "Informations de base",
    score: 95,
    status: "good",
    issues: [],
  },
  {
    category: "Photos",
    score: 70,
    status: "warning",
    issues: ["3 chambres sans photos", "Photos de mauvaise qualité détectées"],
  },
  {
    category: "Géolocalisation",
    score: 100,
    status: "good",
    issues: [],
  },
  {
    category: "Tarifs et disponibilités",
    score: 85,
    status: "warning",
    issues: ["Calendrier non mis à jour depuis 5 jours"],
  },
]

export function DataQuality() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
          Qualité des données
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {qualityChecks.map((check) => (
          <div key={check.category} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{check.category}</span>
              <span className="text-sm text-stone-600">{check.score}%</span>
            </div>
            <Progress value={check.score} className="h-2" />
            {check.issues.length > 0 && (
              <div className="space-y-1">
                {check.issues.map((issue, index) => (
                  <div key={index} className="flex items-center text-xs text-amber-600">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {issue}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <Button variant="outline" className="w-full mt-4 bg-transparent">
          Améliorer la qualité
        </Button>
      </CardContent>
    </Card>
  )
}
