import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Users, MessageSquare, AlertTriangle, TrendingUp, MapPin } from "lucide-react"

const stats = [
  {
    title: "Hôtels actifs",
    value: "247",
    change: "+12 cette semaine",
    icon: Building,
    color: "text-blue-600",
  },
  {
    title: "Utilisateurs inscrits",
    value: "1,856",
    change: "+89 cette semaine",
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Avis en attente",
    value: "23",
    change: "À modérer",
    icon: MessageSquare,
    color: "text-amber-600",
  },
  {
    title: "Signalements",
    value: "7",
    change: "Urgent: 2",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    title: "Recherches/jour",
    value: "3,421",
    change: "+15% vs hier",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    title: "POI référencés",
    value: "156",
    change: "Antananarivo",
    icon: MapPin,
    color: "text-teal-600",
  },
]

export function AdminStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Vue d'ensemble de la plateforme</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.title} className="p-4 bg-stone-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                <span className="text-2xl font-bold text-stone-900">{stat.value}</span>
              </div>
              <div className="text-sm font-medium text-stone-900">{stat.title}</div>
              <div className="text-xs text-stone-600 mt-1">{stat.change}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
