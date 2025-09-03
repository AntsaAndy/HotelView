import { AdminHeader } from "@/components/admin/admin-header"
import { AdminStats } from "@/components/admin/admin-stats"
import { ContentModeration } from "@/components/admin/content-moderation"
import { QualitySupervision } from "@/components/admin/quality-supervision"
import { POIManagement } from "@/components/admin/poi-management"
import { OpenDataExports } from "@/components/admin/open-data-exports"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <AdminStats />
            <ContentModeration />
            <QualitySupervision />
          </div>
          <div className="space-y-6">
            <POIManagement />
            <OpenDataExports />
          </div>
        </div>
      </main>
    </div>
  )
}
