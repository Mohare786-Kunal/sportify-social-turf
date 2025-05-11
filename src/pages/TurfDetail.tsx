
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Calendar, 
  Users, 
  ChevronLeft,
  Star,
  SquareCheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTurfs } from "@/data/mockData";

const TurfDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [turf, setTurf] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("18:00");
  const [endTime, setEndTime] = useState<string>("19:00");
  const [needPlayers, setNeedPlayers] = useState<boolean>(false);
  const [playersNeeded, setPlayersNeeded] = useState<number>(2);
  
  useEffect(() => {
    // Simulate API call to fetch turf details
    const fetchTurf = async () => {
      try {
        // In a real app, this would be a Supabase query
        const foundTurf = mockTurfs.find(t => t.id === parseInt(id || "0"));
        
        if (foundTurf) {
          setTurf(foundTurf);
          if (foundTurf.sports.length > 0) {
            setSelectedSport(foundTurf.sports[0]);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching turf:", error);
        setLoading(false);
      }
    };
    
    fetchTurf();
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="glass p-8 rounded-lg text-center animate-pulse">
          <div className="h-8 w-48 bg-muted rounded mb-4 mx-auto"></div>
          <div className="h-4 w-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!turf) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="container mx-auto glass p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Turf Not Found</h2>
          <p className="mb-6">The turf you're looking for doesn't exist.</p>
          <Link to="/turfs">
            <Button>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Turfs
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Calculate total price based on selected time and sport
  const calculateTotalPrice = () => {
    const start = parseInt(startTime.split(":")[0]);
    const end = parseInt(endTime.split(":")[0]);
    const hours = end - start;
    
    return turf.basePrice * hours;
  };
  
  // Available time slots
  const timeSlots = [];
  for (let i = 6; i <= 22; i++) {
    timeSlots.push(`${i.toString().padStart(2, '0')}:00`);
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <Link to="/turfs" className="inline-flex items-center text-turfGreen dark:text-turfGold hover:underline mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Turfs
        </Link>
        
        {/* Turf Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image and Basic Info */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-lg overflow-hidden"
            >
              <div className="h-64 md:h-96 relative">
                <img 
                  src={turf.imageUrl} 
                  alt={turf.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-turfGreen dark:bg-turfGold text-white dark:text-turfBlue px-3 py-1 rounded-full text-sm font-semibold">
                  ₹{turf.basePrice}/hr
                </div>
              </div>
              
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-3">{turf.name}</h1>
                
                <div className="flex items-center text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{turf.address}, {turf.city}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {turf.sports.map((sport: string) => (
                    <span 
                      key={sport}
                      className="px-3 py-1 bg-turfGreen/10 dark:bg-turfGold/10 rounded-full text-sm"
                    >
                      {sport}
                    </span>
                  ))}
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">About this turf</h3>
                  <p className="opacity-80">{turf.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass p-3 rounded-lg flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-turfGreen dark:text-turfGold" />
                    <div>
                      <div className="text-xs opacity-70">Hours</div>
                      <div className="font-medium">6:00 AM - 10:00 PM</div>
                    </div>
                  </div>
                  
                  <div className="glass p-3 rounded-lg flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-turfGreen dark:text-turfGold" />
                    <div>
                      <div className="text-xs opacity-70">Contact</div>
                      <div className="font-medium">+91 9876543210</div>
                    </div>
                  </div>
                  
                  <div className="glass p-3 rounded-lg flex items-center">
                    <Star className="h-5 w-5 mr-3 text-turfGreen dark:text-turfGold" />
                    <div>
                      <div className="text-xs opacity-70">Rating</div>
                      <div className="font-medium">4.5/5 (120 reviews)</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Facilities & Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-lg p-6 mt-8"
            >
              <h2 className="text-xl font-bold mb-4">Facilities & Amenities</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Changing Rooms", 
                  "Shower", 
                  "Drinking Water", 
                  "Parking", 
                  "Equipment Rental", 
                  "Floodlights",
                  "Seating Area",
                  "First Aid Kit",
                  "Cafeteria"
                ].map((facility) => (
                  <div key={facility} className="flex items-center">
                    <SquareCheckIcon className="h-4 w-4 mr-2 text-turfGreen dark:text-turfGold" />
                    <span className="text-sm">{facility}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Booking Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass rounded-lg p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold mb-4">Book This Turf</h2>
              
              <Tabs defaultValue="book" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="book">Book a Slot</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                </TabsList>
                
                <TabsContent value="book" className="space-y-5">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <div className="glass p-3 rounded-lg">
                      <input
                        type="date"
                        value={selectedDate.toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  {/* Sport Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Sport</label>
                    <select
                      value={selectedSport}
                      onChange={(e) => setSelectedSport(e.target.value)}
                      className="w-full glass p-3 rounded-lg bg-transparent focus:outline-none"
                    >
                      {turf.sports.map((sport: string) => (
                        <option key={sport} value={sport}>
                          {sport}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Time Selection */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Start Time</label>
                      <select
                        value={startTime}
                        onChange={(e) => {
                          setStartTime(e.target.value);
                          // Ensure end time is after start time
                          const startHour = parseInt(e.target.value.split(':')[0]);
                          const endHour = parseInt(endTime.split(':')[0]);
                          if (startHour >= endHour) {
                            setEndTime(`${(startHour + 1).toString().padStart(2, '0')}:00`);
                          }
                        }}
                        className="w-full glass p-3 rounded-lg bg-transparent"
                      >
                        {timeSlots.slice(0, -1).map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">End Time</label>
                      <select
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full glass p-3 rounded-lg bg-transparent"
                      >
                        {timeSlots
                          .filter(time => {
                            const hour = parseInt(time.split(':')[0]);
                            return hour > parseInt(startTime.split(':')[0]);
                          })
                          .map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Player Poll Option */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="needPlayers"
                      checked={needPlayers}
                      onChange={() => setNeedPlayers(!needPlayers)}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="needPlayers" className="text-sm">
                      Need more players?
                    </label>
                  </div>
                  
                  {/* Players Needed */}
                  {needPlayers && (
                    <div className="glass p-4 rounded-lg animate-fade-in">
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="playersNeeded" className="text-sm font-medium">
                          Players needed:
                        </label>
                        <span className="text-turfGreen dark:text-turfGold font-semibold">
                          {playersNeeded}
                        </span>
                      </div>
                      <input
                        type="range"
                        id="playersNeeded"
                        min="1"
                        max="10"
                        value={playersNeeded}
                        onChange={(e) => setPlayersNeeded(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex items-center mt-2 text-xs">
                        <Users className="h-4 w-4 mr-1" />
                        <span>This will post to the community chat</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Price Calculation */}
                  <div className="border-t border-white/10 pt-4 mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Base price</span>
                      <span>₹{turf.basePrice}/hr</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm">Duration</span>
                      <span>
                        {parseInt(endTime.split(":")[0]) - parseInt(startTime.split(":")[0])} hr
                      </span>
                    </div>
                    <div className="flex justify-between items-center font-bold">
                      <span>Total Amount</span>
                      <span className="text-turfGreen dark:text-turfGold text-lg">
                        ₹{calculateTotalPrice()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Book Now Button */}
                  <Button 
                    className="w-full bg-turfGreen dark:bg-turfGold text-white dark:text-turfBlue hover:bg-turfGreen-dark dark:hover:bg-turfGold-dark"
                    size="lg"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                </TabsContent>
                
                <TabsContent value="availability">
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-60" />
                    <p className="text-sm opacity-70 mb-4">
                      Connect to Supabase to implement real-time availability checking
                    </p>
                    <Button 
                      variant="outline"
                      className="border-turfGreen dark:border-turfGold text-turfGreen dark:text-turfGold"
                      onClick={() => document.querySelector('button[value="book"]')?.click()}
                    >
                      Return to Booking
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurfDetail;
