import { Header } from "@/components/header"

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-6">OUR LOCATIONS</h1>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
              Experience Emily Hotels in the world's most desirable destinations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="aspect-[4/5] bg-taupe/20 mb-6 overflow-hidden">
                <img
                  src="/modern-paris-hotel.png"
                  alt="Emily Hotel Paris"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-2">PARIS</h3>
              <p className="text-charcoal/70 mb-4">
                Located in the heart of Saint-Germain, our Parisian location offers timeless elegance.
              </p>
              <button className="text-charcoal border-b border-charcoal hover:border-charcoal/50 transition-colors">
                DISCOVER MORE
              </button>
            </div>

            <div className="group">
              <div className="aspect-[4/5] bg-taupe/20 mb-6 overflow-hidden">
                <img
                  src="/modern-tokyo-hotel.png"
                  alt="Emily Hotel Tokyo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-2">TOKYO</h3>
              <p className="text-charcoal/70 mb-4">Experience contemporary luxury in the vibrant Shibuya district.</p>
              <button className="text-charcoal border-b border-charcoal hover:border-charcoal/50 transition-colors">
                DISCOVER MORE
              </button>
            </div>

            <div className="group">
              <div className="aspect-[4/5] bg-taupe/20 mb-6 overflow-hidden">
                <img
                  src="/modern-hotel-exterior-nyc.png"
                  alt="Emily Hotel New York"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-2">NEW YORK</h3>
              <p className="text-charcoal/70 mb-4">
                Manhattan sophistication meets modern comfort in our flagship location.
              </p>
              <button className="text-charcoal border-b border-charcoal hover:border-charcoal/50 transition-colors">
                DISCOVER MORE
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
