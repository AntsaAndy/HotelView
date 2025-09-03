import { Bell, Settings, User, LogOut, Hotel } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Hotel className="h-8 w-8 text-amber-600" />
            <div>
              <h1 className="font-serif text-xl font-bold text-stone-900">Espace Hôteliers</h1>
              <p className="text-sm text-stone-600">Hôtel Colbert - Analakely</p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Vérifié
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
