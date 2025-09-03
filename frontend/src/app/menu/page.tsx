import { Header } from "@/components/header"

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-6">HOTEL MENU</h1>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
              Discover our exceptional dining experiences and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-charcoal mb-6">DINING</h2>
                <div className="space-y-4">
                  <div className="border-b border-charcoal/20 pb-4">
                    <h3 className="text-xl font-medium text-charcoal mb-2">The Grand Restaurant</h3>
                    <p className="text-charcoal/70">Fine dining with contemporary cuisine</p>
                  </div>
                  <div className="border-b border-charcoal/20 pb-4">
                    <h3 className="text-xl font-medium text-charcoal mb-2">Rooftop Bar</h3>
                    <p className="text-charcoal/70">Cocktails with panoramic city views</p>
                  </div>
                  <div className="border-b border-charcoal/20 pb-4">
                    <h3 className="text-xl font-medium text-charcoal mb-2">Café Emily</h3>
                    <p className="text-charcoal/70">Artisanal coffee and light bites</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-charcoal mb-6">SERVICES</h2>
                <div className="space-y-4">
                  <div className="border-b border-charcoal/20 pb-4">
                    <h3 className="text-xl font-medium text-charcoal mb-2">Spa & Wellness</h3>
                    <p className="text-charcoal/70">Rejuvenating treatments and therapies</p>
                  </div>
                  <div className="border-b border-charcoal/20 pb-4">
                    <h3 className="text-xl font-medium text-charcoal mb-2">Concierge</h3>
                    <p className="text-charcoal/70">24/7 personalized assistance</p>
                  </div>
                  <div className="border-b border-charcoal/20 pb-4">
                    <h3 className="text-xl font-medium text-charcoal mb-2">Business Center</h3>
                    <p className="text-charcoal/70">Modern facilities for work and meetings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
