import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { RoomsSection } from "@/components/rooms-section"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/ui/footer"


export default function HomePage() {
  return (
    <main className="min-h-screen bg-darker">
      <Header />
      <HeroSection />
      <RoomsSection />
      <StatsSection />
      <Footer />
      
    </main>
  )
}
