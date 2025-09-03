export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  hotelId: string
  rating: number
  title: string
  comment: string
  date: Date
  helpful: number
  verified: boolean
}

export const mockReviews: Review[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Marie Dubois",
    hotelId: "1",
    rating: 5,
    title: "Séjour exceptionnel au cœur d'Antananarivo",
    comment:
      "Hôtel magnifique avec une vue imprenable sur la ville. Le service est impeccable et le personnel très accueillant. Je recommande vivement !",
    date: new Date("2024-01-15"),
    helpful: 12,
    verified: true,
  },
  {
    id: "2",
    userId: "user2",
    userName: "Jean Rakoto",
    hotelId: "1",
    rating: 4,
    title: "Très bon hôtel, quelques points à améliorer",
    comment:
      "Excellent emplacement et chambres confortables. Le petit-déjeuner pourrait être plus varié mais dans l'ensemble très satisfait.",
    date: new Date("2024-01-10"),
    helpful: 8,
    verified: true,
  },
  {
    id: "3",
    userId: "user3",
    userName: "Sophie Martin",
    hotelId: "2",
    rating: 5,
    title: "Une expérience unique dans la nature",
    comment:
      "Lodge parfait pour observer les lémuriens ! Guide très compétent et hébergement authentique. Une expérience inoubliable.",
    date: new Date("2024-01-20"),
    helpful: 15,
    verified: true,
  },
  {
    id: "4",
    userId: "user4",
    userName: "Paul Andry",
    hotelId: "3",
    rating: 4,
    title: "Parfait pour les familles",
    comment:
      "Excellent resort familial. Les enfants ont adoré la piscine et les activités. Plage magnifique et personnel attentionné.",
    date: new Date("2024-01-12"),
    helpful: 10,
    verified: true,
  },
]
