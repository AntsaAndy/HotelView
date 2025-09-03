import { Shield, Settings, Users, Database, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function AdminHeader() {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-red-600" />
            <div>
              <h1 className="font-serif text-xl font-bold text-stone-900">Administration</h1>
              <p className="text-sm text-stone-600">Plateforme Hôtels Antananarivo</p>
            </div>
            <Badge variant="destructive" className="bg-red-100 text-red-800">
              Super Admin
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Users className="h-4 w-4 mr-1" />
              Utilisateurs
            </Button>
            <Button variant="ghost" size="sm">
              <Key className="h-4 w-4 mr-1" />
              API
            </Button>
            <Button variant="ghost" size="sm">
              <Database className="h-4 w-4 mr-1" />
              Données
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
