import { Header } from "@/components/header"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-7xl font-serif font-light text-white mb-8 tracking-wide">ABOUT US</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez l'excellence hôtelière à Antananarivo avec notre plateforme de recherche intelligente
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-black mb-8 tracking-wide">
                Notre Histoire
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Née de la passion pour l'hospitalité malgache, notre plateforme connecte les voyageurs aux plus beaux
                établissements d'Antananarivo.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nous croyons que chaque séjour doit être une expérience mémorable, alliant confort moderne et
                authenticité locale.
              </p>
            </div>
            <div className="relative">
              <img
                src="/antananarivo-hotel-lobby.png"
                alt="Hotel lobby"
                className="w-full h-96 object-cover rounded-2xl filter grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-light text-black mb-6 tracking-wide">Nos Valeurs</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-serif font-light text-black mb-4 tracking-wide">EXCELLENCE</h3>
              <p className="text-gray-700 leading-relaxed">
                Nous sélectionnons rigoureusement chaque établissement pour garantir des standards de qualité
                exceptionnels.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-serif font-light text-black mb-4 tracking-wide">AUTHENTICITÉ</h3>
              <p className="text-gray-700 leading-relaxed">
                Chaque hôtel reflète l'âme de Madagascar, offrant une expérience culturelle unique et enrichissante.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-serif font-light text-black mb-4 tracking-wide">INNOVATION</h3>
              <p className="text-gray-700 leading-relaxed">
                Notre technologie de recherche intelligente facilite la découverte de votre séjour idéal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white mb-12 tracking-wide">Contactez-Nous</h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center p-8 bg-gray-900 rounded-2xl">
              <h3 className="text-xl font-serif font-light text-white mb-4 tracking-wide">ADRESSE</h3>
              <p className="text-gray-300">
                Antananarivo, Madagascar
                <br />
                Quartier des Affaires
              </p>
            </div>

            <div className="text-center p-8 bg-gray-900 rounded-2xl">
              <h3 className="text-xl font-serif font-light text-white mb-4 tracking-wide">CONTACT</h3>
              <p className="text-gray-300">
                contact@hotelantananarivo.mg
                <br />
                +261 20 XX XXX XX
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
