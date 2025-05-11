
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Landmark } from "lucide-react";
import { motion } from "framer-motion";

interface TurfCardProps {
  id: number;
  name: string;
  address: string;
  city: string;
  imageUrl: string;
  pricePerHour: number;
  sports: string[];
  index?: number; // For staggered animations
}

export default function TurfCard({ id, name, address, city, imageUrl, pricePerHour, sports, index = 0 }: TurfCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="glass rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48">
        <img 
          src={imageUrl} 
          alt={`${name} turf`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold dark:text-white text-turfGreen mb-2">{name}</h3>
        <div className="flex items-center text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{address}, {city}</span>
        </div>
        <div className="flex items-center text-sm mb-3">
          <Landmark className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="font-semibold text-turfGreen-light dark:text-turfYellow">
            ₹{pricePerHour}/hour
          </span>
        </div>
        {sports.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {sports.map((sport) => (
              <span 
                key={sport}
                className="text-xs px-2 py-1 bg-turfGreen/10 dark:bg-turfGold/10 rounded-full"
              >
                {sport}
              </span>
            ))}
          </div>
        )}
        <Link to={`/turfs/${id}`} className="block">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-turfGreen dark:bg-turfGold text-white dark:text-turfBlue font-semibold py-2 rounded-md transition-colors hover:bg-turfGreen-dark dark:hover:bg-turfGold-dark"
          >
            <div className="flex items-center justify-center">
              <CalendarDays className="h-4 w-4 mr-2" />
              View Details
            </div>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
