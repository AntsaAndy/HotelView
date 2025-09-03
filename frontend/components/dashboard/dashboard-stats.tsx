import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, MousePointer, TrendingUp, Users } from "lucide-react"

const stats = [
  {
    title: "Vues cette semaine",
    value: "1,247",
    change: "+12%",
    icon: Eye,
    color: "text-blue-600",
  },
  {
    title: "Clics vers réservation",
    value: "89",
    change: "+8%",
    icon: MousePointer,
    color: "text-green-600",
  },
  {
    title: "Taux de conversion",
    value: "7.1%",
    change: "+2.3%",
    icon: TrendingUp,
    color: "text-amber-600",
  },
  {
    title: "Recherches populaires",
    value: "156",
    change: "+15%",
    icon: Users,
    color: "text-purple-600",
  },
]

export function DashboardStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Statistiques de performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.title} className="text-center p-4 bg-stone-50 rounded-lg">
              <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-stone-900">{stat.value}</div>
              <div className="text-sm text-stone-600">{stat.title}</div>
              <div className="text-xs text-green-600 mt-1">{stat.change}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
