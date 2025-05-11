
export interface Turf {
  id: number;
  name: string;
  address: string;
  city: string;
  description: string;
  basePricePerHour: number;
  imageUrls: string[];
  ownerId: string;
}

export interface Sport {
  id: number;
  turfId: number;
  name: string;
  description: string;
  priceRanges: PriceRange[];
}

export interface PriceRange {
  id: number;
  sportId: number;
  startDay: number; // 0 = Sunday, 1 = Monday, etc.
  endDay: number;
  pricePerHour: number;
}

export interface Booking {
  id: number;
  userId: string;
  userName: string;
  turfId: number;
  sportId: number;
  sportName: string;
  date: string;
  startTime: string;
  endTime: string;
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "pending" | "completed" | "failed";
}

export interface EarningsSummary {
  totalEarnings: number;
  pendingPayments: number;
  weeklyEarnings: {
    week: string;
    amount: number;
  }[];
  monthlySummary: {
    month: string;
    amount: number;
  }[];
  sportWiseEarnings: {
    sport: string;
    amount: number;
  }[];
}

export const mockTurfs: Turf[] = [
  {
    id: 1,
    name: "Green Field Turf",
    address: "123 Sports Lane",
    city: "Nagpur",
    description: "A premium football turf with high-quality artificial grass and floodlights for night play.",
    basePricePerHour: 1000,
    imageUrls: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f",
      "https://images.unsplash.com/photo-1524242496855-23599394a4ff"
    ],
    ownerId: "owner-123"
  },
  {
    id: 2,
    name: "Multi-Sport Arena",
    address: "456 Game Street",
    city: "Nagpur",
    description: "Versatile sports facility offering football, badminton, and basketball courts.",
    basePricePerHour: 1200,
    imageUrls: [
      "https://images.unsplash.com/photo-1594470117722-de4b9a02ebed",
      "https://images.unsplash.com/photo-1556056504-5c7696c4c28d"
    ],
    ownerId: "owner-123"
  }
];

export const mockSports: Sport[] = [
  {
    id: 1,
    turfId: 1,
    name: "Football",
    description: "5-a-side football on premium artificial turf with goals and markings.",
    priceRanges: [
      {
        id: 1,
        sportId: 1,
        startDay: 1, // Monday
        endDay: 3, // Wednesday
        pricePerHour: 1000
      },
      {
        id: 2,
        sportId: 1,
        startDay: 4, // Thursday
        endDay: 6, // Saturday
        pricePerHour: 1500
      },
      {
        id: 3,
        sportId: 1,
        startDay: 0, // Sunday
        endDay: 0,
        pricePerHour: 1800
      }
    ]
  },
  {
    id: 2,
    turfId: 1,
    name: "Badminton",
    description: "Indoor badminton court with professional flooring and nets.",
    priceRanges: [
      {
        id: 4,
        sportId: 2,
        startDay: 1, // Monday
        endDay: 5, // Friday
        pricePerHour: 800
      },
      {
        id: 5,
        sportId: 2,
        startDay: 6, // Saturday
        endDay: 0, // Sunday
        pricePerHour: 1200
      }
    ]
  },
  {
    id: 3,
    turfId: 2,
    name: "Basketball",
    description: "Full-sized basketball court with professional hoops.",
    priceRanges: [
      {
        id: 6,
        sportId: 3,
        startDay: 1, // Monday
        endDay: 4, // Thursday
        pricePerHour: 900
      },
      {
        id: 7,
        sportId: 3,
        startDay: 5, // Friday
        endDay: 0, // Sunday
        pricePerHour: 1300
      }
    ]
  }
];

export const mockBookings: Booking[] = [
  {
    id: 1,
    userId: "user-1",
    userName: "Rahul Sharma",
    turfId: 1,
    sportId: 1,
    sportName: "Football",
    date: "2025-05-15",
    startTime: "18:00",
    endTime: "20:00",
    totalAmount: 3000,
    status: "confirmed",
    paymentStatus: "completed"
  },
  {
    id: 2,
    userId: "user-2",
    userName: "Priya Patel",
    turfId: 1,
    sportId: 2,
    sportName: "Badminton",
    date: "2025-05-16",
    startTime: "17:00",
    endTime: "19:00",
    totalAmount: 1600,
    status: "confirmed",
    paymentStatus: "completed"
  },
  {
    id: 3,
    userId: "user-3",
    userName: "Amit Kumar",
    turfId: 1,
    sportId: 1,
    sportName: "Football",
    date: "2025-05-18",
    startTime: "09:00",
    endTime: "11:00",
    totalAmount: 3600,
    status: "pending",
    paymentStatus: "pending"
  },
  {
    id: 4,
    userId: "user-4",
    userName: "Neha Singh",
    turfId: 2,
    sportId: 3,
    sportName: "Basketball",
    date: "2025-05-20",
    startTime: "16:00",
    endTime: "18:00",
    totalAmount: 2600,
    status: "confirmed",
    paymentStatus: "completed"
  }
];

export const mockEarningsSummary: EarningsSummary = {
  totalEarnings: 10800,
  pendingPayments: 3600,
  weeklyEarnings: [
    { week: "May 1-7", amount: 5000 },
    { week: "May 8-14", amount: 6200 },
    { week: "May 15-21", amount: 4800 },
    { week: "May 22-28", amount: 3800 }
  ],
  monthlySummary: [
    { month: "Jan 2025", amount: 28000 },
    { month: "Feb 2025", amount: 32000 },
    { month: "Mar 2025", amount: 30000 },
    { month: "Apr 2025", amount: 34000 },
    { month: "May 2025", amount: 19800 }
  ],
  sportWiseEarnings: [
    { sport: "Football", amount: 6600 },
    { sport: "Badminton", amount: 1600 },
    { sport: "Basketball", amount: 2600 }
  ]
};

export const getDayName = (day: number): string => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day];
};
