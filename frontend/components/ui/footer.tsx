import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram 
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <MapPin className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold">ANTANANARIVO Hotelview </h3>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Votre plateforme de confiance pour découvrir et réserver les meilleurs hébergements 
              à Antananarivo. Simplicité, qualité et service client exceptionnel.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-smooth">Rechercher un hôtel</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-smooth">Destinations populaires</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-smooth">Offres spéciales</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-smooth">Guide voyage</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-smooth">Support client</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-white/80 text-sm">Antananarivo, Madagascar</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-white/80 text-sm">+261 20 XX XX XX  </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-white/80 text-sm">contact@hotelview.mg</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="text-center mb-6">
            <h4 className="text-xl font-semibold mb-2">Restez informé</h4>
            <p className="text-white/80">Recevez nos meilleures offres et actualités</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Votre adresse email" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button variant="default" className="px-8">
              Se connecter
            </Button>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © 2025 Antananarivo HotelView. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-smooth">
              Conditions d'utilisation
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-smooth">
              Politique de confidentialité
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-smooth">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};