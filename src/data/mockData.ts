
// Mock data for turfs, used until Supabase integration
export const mockTurfs = [
  {
    id: 1,
    name: "FieldMasters Arena",
    address: "123 Stadium Road",
    city: "Nagpur",
    description: "A premium turf facility with FIFA approved synthetic grass and professional lighting system.",
    basePrice: 1200,
    imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    sports: ["Football", "Cricket"],
  },
  {
    id: 2,
    name: "SportsPark Central",
    address: "45 College Square",
    city: "Nagpur",
    description: "Centrally located with multiple courts for various sports and excellent changing facilities.",
    basePrice: 1000,
    imageUrl: "https://images.unsplash.com/photo-1552667466-07770ae110d0",
    sports: ["Football", "Tennis", "Badminton"],
  },
  {
    id: 3,
    name: "Green Zone Sports",
    address: "78 Garden Avenue",
    city: "Nagpur",
    description: "Eco-friendly turf with rainwater harvesting and solar lighting. Perfect for evening games.",
    basePrice: 1500,
    imageUrl: "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253",
    sports: ["Football", "Rugby", "Baseball"],
  },
  {
    id: 4,
    name: "Victory Grounds",
    address: "15 Champions Lane",
    city: "Nagpur",
    description: "Premium sports complex with professional standard facilities and equipment rental.",
    basePrice: 1800,
    imageUrl: "https://images.unsplash.com/photo-1571138497743-a69a9c9b1bc8",
    sports: ["Football", "Basketball", "Volleyball"],
  },
  {
    id: 5,
    name: "Elite Sports Hub",
    address: "230 Fitness Street",
    city: "Nagpur",
    description: "Modern sports hub with cafeteria, viewing gallery, and professional coaching sessions available.",
    basePrice: 1300,
    imageUrl: "https://images.unsplash.com/photo-1565992441121-4367c2967103",
    sports: ["Football", "Cricket", "Hockey"],
  },
  {
    id: 6,
    name: "City Sport Complex",
    address: "56 Metro Station Road",
    city: "Nagpur",
    description: "State-of-the-art facilities in the heart of the city with easy transportation access.",
    basePrice: 1100,
    imageUrl: "https://images.unsplash.com/photo-1552691562-ca3c5e7d6a02",
    sports: ["Football", "Tennis", "Athletics"],
  }
];

// Mock data for community messages
export const mockMessages = [
  {
    id: 1,
    userId: "user1",
    userName: "Vikram Singh",
    message: "Looking for 2 players for a football match tonight at FieldMasters Arena. Anyone interested?",
    createdAt: "2023-05-11T14:30:00Z",
  },
  {
    id: 2,
    userId: "user2",
    userName: "Ananya Patel",
    message: "Just booked Victory Grounds for badminton on Sunday morning. Still have 2 slots available!",
    createdAt: "2023-05-11T15:15:00Z",
  },
  {
    id: 3,
    userId: "user3",
    userName: "Rajesh Kumar",
    message: "Anyone interested in a cricket match at Green Zone on Saturday evening?",
    createdAt: "2023-05-11T16:45:00Z",
  },
  {
    id: 4,
    userId: "user4",
    userName: "Priya Sharma",
    message: "Looking for experienced tennis players for a doubles match this Friday at SportsPark.",
    createdAt: "2023-05-11T17:30:00Z",
  },
];

// Mock data for player polls
export const mockPolls = [
  {
    id: 1,
    userId: "user1",
    userName: "Vikram Singh",
    turfId: 1,
    turfName: "FieldMasters Arena",
    sportType: "Football",
    slotDate: "2023-05-15",
    playersNeeded: 3,
    status: "open",
  },
  {
    id: 2,
    userId: "user3",
    userName: "Rajesh Kumar",
    turfId: 3,
    turfName: "Green Zone Sports",
    sportType: "Cricket",
    slotDate: "2023-05-14",
    playersNeeded: 5,
    status: "open",
  },
];
