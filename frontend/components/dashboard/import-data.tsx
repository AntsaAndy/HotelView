import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileSpreadsheet, Calendar, Zap } from "lucide-react"

export function ImportData() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif flex items-center">
          <Upload className="h-5 w-5 mr-2" />
          Import de données
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Importer CSV/Excel
          </Button>

          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            Synchroniser iCal
          </Button>

          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Zap className="h-4 w-4 mr-2" />
            Connecter PMS
          </Button>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium text-sm mb-2">Dernière synchronisation</h4>
          <p className="text-xs text-stone-600">Il y a 2 heures</p>
          <p className="text-xs text-green-600">✓ 45 chambres mises à jour</p>
        </div>
      </CardContent>
    </Card>
  )
}
