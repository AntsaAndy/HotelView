import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Flag, CheckCircle, XCircle, Clock } from "lucide-react"

const moderationItems = [
  {
    id: 1,
    type: "review",
    content: "Excellent hôtel, service impeccable. Je recommande vivement !",
    author: "Marie R.",
    hotel: "Hôtel Colbert",
    status: "pending",
    priority: "normal",
    date: "Il y a 2h",
  },
  {
    id: 2,
    type: "report",
    content: "Photos ne correspondent pas à l'établissement",
    author: "Jean M.",
    hotel: "Villa Sibylle",
    status: "urgent",
    priority: "high",
    date: "Il y a 4h",
  },
  {
    id: 3,
    type: "review",
    content: "Chambre sale, personnel désagréable. À éviter absolument.",
    author: "Paul L.",
    hotel: "Résidence Lapasoa",
    status: "pending",
    priority: "normal",
    date: "Il y a 6h",
  },
]

export function ContentModeration() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-serif flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Modération de contenu
          </CardTitle>
          <Badge variant="destructive">23 en attente</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {moderationItems.map((item) => (
            <div key={item.id} className="border border-stone-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  {item.type === "review" ? (
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Flag className="h-4 w-4 text-red-600" />
                  )}
                  <span className="font-medium text-sm">{item.type === "review" ? "Avis" : "Signalement"}</span>
                  <Badge variant={item.priority === "high" ? "destructive" : "secondary"}>
                    {item.priority === "high" ? "Urgent" : "Normal"}
                  </Badge>
                </div>
                <span className="text-xs text-stone-500">{item.date}</span>
              </div>

              <p className="text-sm text-stone-700 mb-2">"{item.content}"</p>

              <div className="flex justify-between items-center text-xs text-stone-600 mb-3">
                <span>Par {item.author}</span>
                <span>Concernant {item.hotel}</span>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="text-green-600 border-green-600 bg-transparent">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Approuver
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 border-red-600 bg-transparent">
                  <XCircle className="h-3 w-3 mr-1" />
                  Rejeter
                </Button>
                <Button size="sm" variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  Reporter
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
