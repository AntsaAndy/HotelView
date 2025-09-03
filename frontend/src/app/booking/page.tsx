import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-6">BOOK YOUR STAY</h1>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
              Reserve your perfect room and experience luxury redefined
            </p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm p-8 md:p-12">
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="checkin" className="text-charcoal font-medium mb-2 block">
                    CHECK-IN DATE
                  </Label>
                  <Input id="checkin" type="date" className="bg-white/80 border-taupe/30 focus:border-charcoal" />
                </div>
                <div>
                  <Label htmlFor="checkout" className="text-charcoal font-medium mb-2 block">
                    CHECK-OUT DATE
                  </Label>
                  <Input id="checkout" type="date" className="bg-white/80 border-taupe/30 focus:border-charcoal" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="adults" className="text-charcoal font-medium mb-2 block">
                    ADULTS
                  </Label>
                  <Input
                    id="adults"
                    type="number"
                    min="1"
                    defaultValue="2"
                    className="bg-white/80 border-taupe/30 focus:border-charcoal"
                  />
                </div>
                <div>
                  <Label htmlFor="children" className="text-charcoal font-medium mb-2 block">
                    CHILDREN
                  </Label>
                  <Input
                    id="children"
                    type="number"
                    min="0"
                    defaultValue="0"
                    className="bg-white/80 border-taupe/30 focus:border-charcoal"
                  />
                </div>
                <div>
                  <Label htmlFor="rooms" className="text-charcoal font-medium mb-2 block">
                    ROOMS
                  </Label>
                  <Input
                    id="rooms"
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="bg-white/80 border-taupe/30 focus:border-charcoal"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location" className="text-charcoal font-medium mb-2 block">
                  LOCATION
                </Label>
                <select
                  id="location"
                  className="w-full p-3 bg-white/80 border border-taupe/30 focus:border-charcoal focus:outline-none"
                >
                  <option>Select Location</option>
                  <option>Paris</option>
                  <option>Tokyo</option>
                  <option>New York</option>
                </select>
              </div>

              <div>
                <Label htmlFor="room-type" className="text-charcoal font-medium mb-2 block">
                  ROOM TYPE
                </Label>
                <select
                  id="room-type"
                  className="w-full p-3 bg-white/80 border border-taupe/30 focus:border-charcoal focus:outline-none"
                >
                  <option>Select Room Type</option>
                  <option>King-Size Bed Lake-View Room</option>
                  <option>Executive Suite</option>
                  <option>Presidential Suite</option>
                  <option>Standard Room</option>
                </select>
              </div>

              <Button
                type="submit"
                className="w-full bg-charcoal text-white hover:bg-charcoal/90 py-4 text-lg tracking-wider"
              >
                CHECK AVAILABILITY
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
