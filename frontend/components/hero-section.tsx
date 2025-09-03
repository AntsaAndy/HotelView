"use client"

import { useLanguage } from "@/contexts/language-context"
import { Search } from "lucide-react"

export function HeroSection() {
  const { language } = useLanguage()
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
<div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url('/tanahaute.webp')`, // chemin relatif au dossier public
  }}
>
  <div className="absolute inset-0 bg-black/30"></div> {/* opacité réduite */}
</div>
      {/* Content */}
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-20">
        
        <div className="animate-fade-in">
          <h1 className="font-display text-7xl md:text-5xl lg:text-7xl font-light text-white mb-6 leading-tight">
            DÉCOUVREZ LES HÔTELS 
            <br />
            <span className="text-white">  D'ANTANANARIVO</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            La plateforme moderne pour trouver votre hébergement parfait dans la capitale malgache
          </p>
        </div>
        <div className="animate-fade-in p-6 md:p-8 mt-6 flex justify-center">
          <a href="/search">
          <button className="w-full md:w-auto bg-white hover:bg-grey text-black font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2">
            <Search className="w-6 h-6 text-black" />
            Rechercher un hotel
          </button>
          </a>
        </div>
      </div>
    </section>
  )
}
