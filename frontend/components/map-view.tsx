"use client"

import { useEffect, useRef } from "react"
import type { Hotel } from "@/lib/types"

interface MapViewProps {
  hotels: Hotel[]
  selectedHotel: Hotel | null
  onHotelSelect: (hotel: Hotel | null) => void
}

export default function MapView({ hotels, selectedHotel, onHotelSelect }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return

    // Import dynamique de Leaflet
    const initMap = async () => {
      const L = (await import("leaflet")).default

      // Configuration des icônes par défaut
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      })

      if (!mapRef.current || mapInstanceRef.current) return

      // Initialiser la carte centrée sur Madagascar
      const map = L.map(mapRef.current).setView([-18.8792, 47.5079], 6)

      // Ajouter les tuiles OpenStreetMap
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map)

      mapInstanceRef.current = map

      // Créer des icônes personnalisées pour chaque catégorie
      const createCustomIcon = (category: Hotel["category"]) => {
        const colors = {
          luxury: "#8b5cf6", // purple
          business: "#3b82f6", // blue
          family: "#10b981", // emerald
          eco: "#059669", // emerald-600
        }

        const color = colors[category] || "#6b7280"

        return L.divIcon({
          html: `
            <div style="
              background-color: ${color};
              width: 24px;
              height: 24px;
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 12px;
              font-weight: bold;
            ">
              H
            </div>
          `,
          className: "custom-hotel-marker",
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        })
      }

      // Ajouter les marqueurs pour chaque hôtel
      const updateMarkers = () => {
        // Supprimer les anciens marqueurs
        markersRef.current.forEach((marker) => map.removeLayer(marker))
        markersRef.current = []

        // Ajouter les nouveaux marqueurs
        hotels.forEach((hotel) => {
          const marker = L.marker([hotel.coordinates.lat, hotel.coordinates.lng], {
            icon: createCustomIcon(hotel.category),
          })

          // Popup avec informations de l'hôtel
          const popupContent = `
            <div style="min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${hotel.name}</h3>
              <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">${hotel.city}, ${hotel.region}</p>
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="color: #fbbf24; margin-right: 4px;">★</span>
                <span style="font-weight: 500;">${hotel.rating}</span>
              </div>
              <div style="font-weight: bold; color: #059669; margin-bottom: 8px;">
                ${hotel.priceRange.min.toLocaleString()} - ${hotel.priceRange.max.toLocaleString()} Ar
              </div>
              <button 
                onclick="window.selectHotel('${hotel.id}')"
                style="
                  background: #059669;
                  color: white;
                  border: none;
                  padding: 6px 12px;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 12px;
                "
              >
                Voir détails
              </button>
            </div>
          `

          marker.bindPopup(popupContent)

          // Événement de clic sur le marqueur
          marker.on("click", () => {
            onHotelSelect(hotel)
          })

          marker.addTo(map)
          markersRef.current.push(marker)
        })

        // Ajuster la vue pour inclure tous les marqueurs
        if (hotels.length > 0) {
          const group = new L.featureGroup(markersRef.current)
          map.fitBounds(group.getBounds().pad(0.1))
        }
      }

      updateMarkers()

      // Fonction globale pour sélectionner un hôtel depuis le popup
      ;(window as any).selectHotel = (hotelId: string) => {
        const hotel = hotels.find((h) => h.id === hotelId)
        if (hotel) {
          onHotelSelect(hotel)
        }
      }
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      markersRef.current = []
    }
  }, [hotels, onHotelSelect])

  // Mettre en évidence l'hôtel sélectionné
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedHotel) return

    // Centrer la carte sur l'hôtel sélectionné
    mapInstanceRef.current.setView([selectedHotel.coordinates.lat, selectedHotel.coordinates.lng], 12)
  }, [selectedHotel])

  return (
    <>
      <div ref={mapRef} className="w-full h-full" />
      {/* Ajouter les styles CSS pour Leaflet */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
    </>
  )
}
