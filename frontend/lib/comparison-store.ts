"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { Hotel } from "./types"

interface ComparisonStore {
  comparedHotels: Hotel[]
  addToComparison: (hotel: Hotel) => void
  removeFromComparison: (hotelId: string) => void
  clearComparison: () => void
  isInComparison: (hotelId: string) => boolean
}

export const useComparisonStore = create<ComparisonStore>()(
  persist(
    (set, get) => ({
      comparedHotels: [],
      addToComparison: (hotel) => {
        const current = get().comparedHotels
        if (current.length < 3 && !current.find((h) => h.id === hotel.id)) {
          set({ comparedHotels: [...current, hotel] })
        }
      },
      removeFromComparison: (hotelId) => {
        set({ comparedHotels: get().comparedHotels.filter((h) => h.id !== hotelId) })
      },
      clearComparison: () => set({ comparedHotels: [] }),
      isInComparison: (hotelId) => get().comparedHotels.some((h) => h.id === hotelId),
    }),
    {
      name: "hotel-comparison",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      }),
    },
  ),
)
