
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import TurfCard from "@/components/TurfCard";
import { mockTurfs } from "@/data/mockData";

const Turfs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([1000, 2000]);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  // Get unique sports from all turfs
  const allSports = Array.from(
    new Set(mockTurfs.flatMap((turf) => turf.sports))
  );
  
  // Filter turfs based on search, price, and sports
  const filteredTurfs = mockTurfs.filter((turf) => {
    const matchesSearch = turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           turf.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           turf.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = turf.basePrice >= priceRange[0] && turf.basePrice <= priceRange[1];
    
    const matchesSports = selectedSports.length === 0 ||
                          selectedSports.some(sport => turf.sports.includes(sport));
    
    return matchesSearch && matchesPrice && matchesSports;
  });
  
  const handleSportToggle = (sport: string) => {
    setSelectedSports((prev) =>
      prev.includes(sport)
        ? prev.filter((s) => s !== sport)
        : [...prev, sport]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange([1000, 2000]);
    setSelectedSports([]);
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-4">Browse Turfs</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Discover and book the perfect turf for your next game
          </p>
        </motion.div>
        
        {/* Search & Filters */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 dark:bg-turfBlue/50 backdrop-blur-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* Filter Toggle */}
            <Button 
              variant="outline"
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="border-turfGreen dark:border-turfGold text-turfGreen dark:text-turfGold"
            >
              <Filter className="mr-2 h-4 w-4" />
              {filtersVisible ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          
          {/* Advanced Filters */}
          {filtersVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-lg p-5 mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Price Range Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Price Range (₹/hr)</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={priceRange}
                      min={500}
                      max={3000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-5"
                    />
                    <div className="flex justify-between text-sm">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                {/* Sports Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Sports</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {allSports.map((sport) => (
                      <div key={sport} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`sport-${sport}`}
                          checked={selectedSports.includes(sport)}
                          onCheckedChange={() => handleSportToggle(sport)}
                        />
                        <label
                          htmlFor={`sport-${sport}`}
                          className="text-sm cursor-pointer"
                        >
                          {sport}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Reset Filters */}
                <div className="flex items-center justify-end">
                  <Button 
                    variant="outline"
                    onClick={resetFilters}
                    className="border-destructive/70 text-destructive/70 hover:text-destructive"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reset All Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Turf Listings */}
        {filteredTurfs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredTurfs.map((turf, index) => (
              <TurfCard
                key={turf.id}
                id={turf.id}
                name={turf.name}
                address={turf.address}
                city={turf.city}
                imageUrl={turf.imageUrl}
                pricePerHour={turf.basePrice}
                sports={turf.sports}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass p-12 rounded-lg text-center"
          >
            <h3 className="text-xl font-bold mb-3">No turfs found</h3>
            <p className="mb-4 opacity-80">
              Try adjusting your filters or search term
            </p>
            <Button 
              onClick={resetFilters}
              className="bg-turfGreen dark:bg-turfGold text-white dark:text-turfBlue"
            >
              Reset Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Turfs;
