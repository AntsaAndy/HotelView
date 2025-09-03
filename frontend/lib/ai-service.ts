// Service d'IA simulé pour les fonctionnalités intelligentes
import { mockHotels } from "./mock-data"
import type { Hotel } from "./types"

export interface AIRecommendation {
  hotel: Hotel
  score: number
  reason: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

// Simulation d'une recherche sémantique intelligente
export function performSemanticSearch(query: string): Hotel[] {
  const normalizedQuery = query.toLowerCase()

  // Mots-clés sémantiques pour Madagascar
  const semanticMappings = {
    luxe: ["luxury", "premium", "5 étoiles", "haut de gamme"],
    nature: ["écologique", "jungle", "forêt", "parc", "réserve"],
    plage: ["océan", "mer", "côte", "sable", "balnéaire"],
    aventure: ["trekking", "randonnée", "exploration", "safari"],
    romantique: ["couple", "lune de miel", "intime", "spa"],
    famille: ["enfants", "familial", "piscine", "activités"],
    budget: ["économique", "pas cher", "abordable", "petit prix"],
    culture: ["traditionnel", "local", "authentique", "patrimoine"],
  }

  let results = [...mockHotels]

  // Recherche sémantique basée sur les mappings
  for (const [concept, keywords] of Object.entries(semanticMappings)) {
    if (normalizedQuery.includes(concept) || keywords.some((k) => normalizedQuery.includes(k))) {
      results = results.filter((hotel) => {
        const hotelText =
          `${hotel.name} ${hotel.description} ${hotel.amenities.join(" ")} ${hotel.category}`.toLowerCase()
        return keywords.some((keyword) => hotelText.includes(keyword)) || hotelText.includes(concept)
      })
    }
  }

  // Si pas de résultats sémantiques, faire une recherche classique
  if (results.length === 0) {
    results = mockHotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(normalizedQuery) ||
        hotel.city.toLowerCase().includes(normalizedQuery) ||
        hotel.description.toLowerCase().includes(normalizedQuery),
    )
  }

  return results
}

// Génération de recommandations personnalisées
export function generateRecommendations(userPreferences?: {
  budget?: number
  interests?: string[]
  previousStays?: string[]
}): AIRecommendation[] {
  const recommendations: AIRecommendation[] = []

  mockHotels.forEach((hotel) => {
    let score = hotel.rating * 20 // Score de base sur la note
    let reason = `Excellente note de ${hotel.rating}/5`

    // Ajustement basé sur le budget
    if (userPreferences?.budget) {
      if (hotel.priceRange.min <= userPreferences.budget) {
        score += 15
        reason += ", dans votre budget"
      } else {
        score -= 10
      }
    }

    // Ajustement basé sur les intérêts
    if (userPreferences?.interests) {
      const matchingInterests = userPreferences.interests.filter(
        (interest) =>
          hotel.amenities.some((amenity) => amenity.toLowerCase().includes(interest.toLowerCase())) ||
          hotel.description.toLowerCase().includes(interest.toLowerCase()),
      )

      if (matchingInterests.length > 0) {
        score += matchingInterests.length * 10
        reason += `, correspond à vos intérêts: ${matchingInterests.join(", ")}`
      }
    }

    // Bonus pour la diversité géographique
    if (hotel.region === "Nosy Be") {
      score += 5
      reason += ", destination populaire"
    }

    recommendations.push({ hotel, score, reason })
  })

  return recommendations.sort((a, b) => b.score - a.score).slice(0, 6)
}

// Simulation d'un chatbot intelligent
export async function processChatMessage(message: string, history: ChatMessage[]): Promise<string> {
  const normalizedMessage = message.toLowerCase()

  // Réponses basées sur des patterns
  if (normalizedMessage.includes("bonjour") || normalizedMessage.includes("salut")) {
    return "Bonjour ! Je suis votre assistant virtuel pour trouver l'hôtel parfait à Madagascar. Comment puis-je vous aider aujourd'hui ?"
  }

  if (normalizedMessage.includes("recommand") || normalizedMessage.includes("conseil")) {
    return "Je peux vous recommander des hôtels basés sur vos préférences ! Dites-moi quel type d'expérience vous recherchez : luxe, nature, plage, aventure, ou famille ?"
  }

  if (normalizedMessage.includes("prix") || normalizedMessage.includes("budget")) {
    return "Les prix varient selon la saison et le type d'hébergement. Nos hôtels vont de 50,000 Ar/nuit pour les options économiques à 500,000 Ar/nuit pour le luxe. Quel est votre budget approximatif ?"
  }

  if (normalizedMessage.includes("nosy be")) {
    return "Nosy Be est parfait pour les plages paradisiaques ! Je recommande le Nosy Be Beach Resort pour son cadre exceptionnel et ses activités nautiques."
  }

  if (normalizedMessage.includes("antananarivo") || normalizedMessage.includes("tana")) {
    return "Pour Antananarivo, l'Hôtel Colline d'Ambohimanga offre un excellent rapport qualité-prix avec une vue magnifique sur la ville."
  }

  if (normalizedMessage.includes("andasibe")) {
    return "Andasibe est idéal pour découvrir la faune malgache ! L'Andasibe Forest Lodge vous permettra d'observer les lémuriens dans leur habitat naturel."
  }

  if (normalizedMessage.includes("famille") || normalizedMessage.includes("enfant")) {
    return "Pour les familles, je recommande des hôtels avec piscine et activités pour enfants. Le Nosy Be Beach Resort et l'Hôtel Colline d'Ambohimanga sont parfaits !"
  }

  if (normalizedMessage.includes("spa") || normalizedMessage.includes("détente")) {
    return "Pour la détente, l'Andasibe Forest Lodge offre un spa exceptionnel en pleine nature. Parfait pour se ressourcer !"
  }

  // Réponse par défaut
  return "Je comprends que vous cherchez des informations sur nos hôtels. Pouvez-vous me donner plus de détails sur ce que vous recherchez ? Par exemple : votre destination préférée, votre budget, ou le type d'expérience souhaitée ?"
}

// Génération de suggestions automatiques
export function generateSearchSuggestions(query: string): string[] {
  const suggestions = [
    "Hôtel de luxe Antananarivo",
    "Resort plage Nosy Be",
    "Lodge écologique Andasibe",
    "Hôtel familial avec piscine",
    "Hébergement romantique spa",
    "Hôtel budget centre-ville",
    "Resort tout inclus Madagascar",
    "Hôtel vue océan Nosy Be",
    "Lodge observation lémuriens",
    "Hôtel business Antananarivo",
  ]

  if (!query.trim()) return suggestions.slice(0, 5)

  const filtered = suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase()))

  return filtered.length > 0 ? filtered : suggestions.slice(0, 3)
}
