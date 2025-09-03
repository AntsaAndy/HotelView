import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "HotelTana - Recherche d'hôtels à Antananarivo",
  description: "Trouvez et réservez les meilleurs hôtels à Antananarivo, Madagascar",
  generator: "Next.js",
  keywords: ["hôtels", "Antananarivo", "Madagascar", "réservation", "hébergement", "voyage"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${openSans.variable} antialiased`}>
      <body className="min-h-screen bg-white text-slate-700 font-sans">
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
