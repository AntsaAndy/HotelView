"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { HotelCatalog } from "@/components/dashboard/hotel-catalog"
import { DataQuality } from "@/components/dashboard/data-quality"
import { ImportData } from "@/components/dashboard/import-data"

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      // Redirige vers login si pas connecté
      router.push("/auth/login");
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  }

  return (
    <div className="min-h-screen bg-[#246a73] text-white">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-4 flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-[#127475] px-4 py-2 rounded"
        >
          Déconnexion
        </button>
      </div>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <DashboardStats />
            <HotelCatalog />
          </div>
          <div className="space-y-6">
            <DataQuality />
            <ImportData />
          </div>
        </div>
      </main>
    </div>
  )
}
