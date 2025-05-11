
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Phone, Clock, Star, CheckCircle2, Calendar, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

// Mock time slots
const mockTimeSlots = [
  { id: 1, startTime: "06:00", endTime: "07:00", available: true },
  { id: 2, startTime: "07:00", endTime: "08:00", available: true },
  { id: 3, startTime: "08:00", endTime: "09:00", available: false },
  { id: 4, startTime: "09:00", endTime: "10:00", available: true },
  { id: 5, startTime: "17:00", endTime: "18:00", available: true },
  { id: 6, startTime: "18:00", endTime: "19:00", available: false },
  { id: 7, startTime: "19:00", endTime: "20:00", available: true },
  { id: 8, startTime: "20:00", endTime: "21:00", available: true },
];

// Mock data for sports pricing
const mockSportsPricing = [
  { id: 1, name: "Football", price: 800, image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" },
  { id: 2, name: "Cricket", price: 1000, image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=867&q=80" },
  { id: 3, name: "Basketball", price: 700, image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=890&q=80" },
];

const mockReviews: Review[] = [
  {
    id: 1,
    userId: "user-1",
    userName: "Rahul Sharma",
    rating: 5,
    comment: "Excellent turf with well-maintained facilities. Highly recommended!",
    date: "2024-07-15",
    avatar: "https://i.pravatar.cc/150?img=59"
  },
  {
    id: 2,
    userId: "user-2",
    userName: "Priya Patel",
    rating: 4,
    comment: "Good playing surface and convenient location. Will definitely book again.",
    date: "2024-07-10",
    avatar: "https://i.pravatar.cc/150?img=32"
  }
];

const TurfDetail = () => {
  const { id } = useParams();
  const [turf, setTurf] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState(mockReviews);
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [selectedSport, setSelectedSport] = useState<any>(null);
  const [selectedDateTab, setSelectedDateTab] = useState("0");
  const { toast } = useToast();

  useEffect(() => {
    // Fetch turf details based on ID (replace with actual API call)
    const fetchTurfDetails = async () => {
      // Mock data for demonstration
      const mockTurf = {
        id: id,
        name: "Green Arena Turf",
        address: "123 Main Street",
        city: "Nagpur",
        phone: "9876543210",
        openingHours: "9:00 AM - 10:00 PM",
        rating: 4.5,
        description: "A well-maintained turf with excellent facilities for football and cricket. Floodlights available for night games.",
        price: 800,
        images: [
          "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1524242496855-23599394a4ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        ],
        sports: ["Football", "Cricket", "Basketball"]
      };
      setTurf(mockTurf);
    };

    fetchTurfDetails();
  }, [id]);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitReview = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newReview = {
      id: reviews.length + 1,
      userId: "current-user", 
      userName: "Current User", 
      rating: rating,
      comment: comment,
      date: new Date().toISOString().slice(0, 10),
      avatar: "https://i.pravatar.cc/150?img=12"
    };

    setReviews([...reviews, newReview]);
    setRating(0);
    setComment("");
    setIsSubmitting(false);

    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };

  const handleOpenBookDialog = () => {
    setIsBookDialogOpen(true);
    setSelectedSport(mockSportsPricing[0]);
  };

  const handleCloseBookDialog = () => {
    setIsBookDialogOpen(false);
    setSelectedSlot(null);
  };

  const handleSelectSlot = (slot: any) => {
    if (!slot.available) return;
    setSelectedSlot(slot);
  };

  const handleBookTurf = () => {
    if (!selectedSlot || !selectedSport) return;
    
    toast({
      title: "Booking Successful!",
      description: `You have booked ${turf.name} for ${format(date as Date, "PPP")} at ${selectedSlot.startTime}-${selectedSlot.endTime} for ${selectedSport.name}.`,
    });
    setIsBookDialogOpen(false);
  };

  const getDateOptions = () => {
    const options = [];
    for (let i = 0; i < 10; i++) {
      const date = addDays(new Date(), i);
      options.push({
        value: i.toString(),
        label: format(date, "EEE, MMM d"),
        date: date
      });
    }
    return options;
  };

  const dateOptions = getDateOptions();

  if (!turf) {
    return <div className="text-center py-10">Loading turf details...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto py-8"
    >
      {/* Turf Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="relative h-96 mb-4">
            <img
              src={turf.images[0]}
              alt={turf.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {turf.images.slice(1).map((image: string, index: number) => (
              <div key={index} className="relative w-24 h-24 flex-shrink-0">
                <img
                  src={image}
                  alt={`${turf.name} - Image ${index + 2}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Turf Information */}
        <div>
          <h1 className="text-3xl font-bold mb-2 font-futura">{turf.name}</h1>
          <div className="flex items-center mb-4">
            <Star className="text-primary mr-1" size={20} />
            <span className="text-gray-700 dark:text-gray-300">{turf.rating}</span>
            <span className="text-gray-500 ml-2">({reviews.length} reviews)</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
            <MapPin className="mr-2" size={16} />
            {turf.address}, {turf.city}
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
            <Phone className="mr-2" size={16} />
            {turf.phone}
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
            <Clock className="mr-2" size={16} />
            Opening Hours: {turf.openingHours}
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{turf.description}</p>
          <div className="mb-4">
            <Badge variant="secondary">₹{turf.price} / hour (Base Price)</Badge>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 font-futura">Sports Available:</h3>
            <div className="flex space-x-2">
              {turf.sports.map((sport: string, index: number) => (
                <Badge key={index} className="bg-primary text-white">{sport}</Badge>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <Button 
              onClick={handleOpenBookDialog}
              className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 font-futura"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      {/* Display Reviews Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6 font-futura">Reviews ({reviews.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    {review.avatar && (
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={review.avatar} 
                          alt={review.userName} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-base font-medium">{review.userName}</CardTitle>
                      <CardDescription className="text-xs">
                        {new Date(review.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star
                        key={value}
                        className={cn(
                          "mr-0.5 h-4 w-4",
                          review.rating >= value ? "text-primary fill-primary" : "text-gray-300 dark:text-gray-600"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{review.comment}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leave a Review Section */}
      <div className="mb-10 p-6 bg-muted rounded-lg">
        <h2 className="text-2xl font-bold mb-4 font-futura">Leave a Review</h2>
        <div className="mb-4">
          <p className="mb-2 font-medium">Your Rating:</p>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((value) => (
              <Button
                key={value}
                variant="ghost"
                className={cn(
                  "p-1",
                  rating >= value ? "text-primary hover:text-primary" : "text-gray-400 hover:text-gray-500"
                )}
                onClick={() => handleRatingChange(value)}
                disabled={isSubmitting}
              >
                <Star 
                  size={24} 
                  className={rating >= value ? "fill-primary" : "fill-none"}
                />
              </Button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <p className="mb-2 font-medium">Your Comment:</p>
          <Textarea
            placeholder="Write your review here..."
            value={comment}
            onChange={handleCommentChange}
            disabled={isSubmitting}
            className="resize-none"
          />
        </div>
        <Button 
          onClick={handleSubmitReview} 
          disabled={isSubmitting} 
          className="bg-primary hover:bg-primary/90 text-white transition-all duration-300"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </div>

      {/* Book Turf Dialog */}
      <Dialog open={isBookDialogOpen} onOpenChange={setIsBookDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-futura">Book {turf.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div>
              <h3 className="text-lg font-medium mb-3 font-futura">1. Choose a date</h3>
              <Tabs value={selectedDateTab} onValueChange={setSelectedDateTab}>
                <TabsList className="w-full flex overflow-x-auto space-x-1 h-auto py-1 px-1">
                  {dateOptions.map((option) => (
                    <TabsTrigger 
                      key={option.value} 
                      value={option.value}
                      onClick={() => setDate(option.date)}
                      className="flex-1 whitespace-nowrap py-1.5 px-3"
                    >
                      {option.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 font-futura">2. Choose a sport</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {mockSportsPricing.map((sport) => (
                  <div
                    key={sport.id}
                    onClick={() => setSelectedSport(sport)}
                    className={cn(
                      "border rounded-lg overflow-hidden cursor-pointer transition-all",
                      selectedSport?.id === sport.id 
                        ? "border-primary ring-2 ring-primary/20" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="h-24 overflow-hidden">
                      <img 
                        src={sport.image} 
                        alt={sport.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <span className="font-medium">{sport.name}</span>
                      <span className="text-sm">₹{sport.price}</span>
                      {selectedSport?.id === sport.id && (
                        <CheckCircle2 className="h-5 w-5 text-primary ml-2" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 font-futura">3. Choose a time slot</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {mockTimeSlots.map((slot) => (
                  <div
                    key={slot.id}
                    onClick={() => handleSelectSlot(slot)}
                    className={cn(
                      "border p-3 rounded-lg text-center transition-all duration-200",
                      !slot.available 
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed" 
                        : selectedSlot?.id === slot.id
                        ? "bg-primary/10 border-primary text-primary font-medium cursor-pointer"
                        : "hover:border-primary hover:bg-primary/5 cursor-pointer"
                    )}
                  >
                    <span className="block text-sm">
                      {slot.startTime} - {slot.endTime}
                    </span>
                    <span className="block text-xs mt-1">
                      {slot.available ? "Available" : "Booked"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="font-medium mb-2 font-futura">Booking Summary</div>
              <div className="grid grid-cols-2 gap-y-1 text-sm">
                <span>Date:</span>
                <span>{date ? format(date, "PPP") : "Select a date"}</span>
                
                <span>Sport:</span>
                <span>{selectedSport?.name || "Select a sport"}</span>
                
                <span>Time:</span>
                <span>
                  {selectedSlot 
                    ? `${selectedSlot.startTime} - ${selectedSlot.endTime}` 
                    : "Select a time slot"}
                </span>
                
                <span>Price:</span>
                <span>₹{selectedSport?.price || "--"}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseBookDialog}>
              Cancel
            </Button>
            <Button 
              onClick={handleBookTurf} 
              disabled={!selectedSlot || !selectedSport}
              className="bg-primary hover:bg-primary/90 text-white transition-all duration-300"
            >
              Book Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default TurfDetail;
