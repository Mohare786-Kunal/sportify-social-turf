
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Mock data for bookings
const mockBookings = [
  {
    id: 1,
    turfName: "Green Arena Turf",
    turfAddress: "123 Main Street, Nagpur",
    sportName: "Football",
    date: "2025-05-15",
    startTime: "17:00",
    endTime: "18:00",
    totalAmount: 800,
    status: "completed",
    imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    turfName: "Green Arena Turf",
    turfAddress: "123 Main Street, Nagpur",
    sportName: "Cricket",
    date: "2025-05-18",
    startTime: "15:00",
    endTime: "16:00",
    totalAmount: 1000,
    status: "upcoming",
    imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 3,
    turfName: "Green Arena Turf",
    turfAddress: "123 Main Street, Nagpur",
    sportName: "Football",
    date: "2025-05-09",
    startTime: "18:00",
    endTime: "19:00",
    totalAmount: 800,
    status: "cancelled",
    imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  }
];

const MyBookings = () => {
  const [rebookDialogOpen, setRebookDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [rebookDate, setRebookDate] = useState<Date | undefined>(new Date());

  const handleOpenRebookDialog = (booking: any) => {
    setSelectedBooking(booking);
    setRebookDialogOpen(true);
  };

  const handleCloseRebookDialog = () => {
    setRebookDialogOpen(false);
    setSelectedBooking(null);
  };

  const handleRebook = () => {
    // In a real app, this would call an API to create a new booking
    toast({
      title: "Booking Confirmed!",
      description: `You have successfully rebooked ${selectedBooking?.turfName} for ${format(rebookDate as Date, "PPP")}.`,
    });
    setRebookDialogOpen(false);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto py-10 px-4 md:px-0"
    >
      <h1 className="text-3xl font-bold font-futura mb-8 text-center md:text-left">My Bookings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBookings.map((booking) => (
          <Card key={booking.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="h-48 overflow-hidden">
              <img 
                src={booking.imageUrl} 
                alt={booking.turfName} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="font-futura">{booking.turfName}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin size={14} className="mr-1 opacity-70" /> 
                    {booking.turfAddress}
                  </CardDescription>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs uppercase font-medium ${getStatusBadgeClass(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Sport</span>
                <span>{booking.sportName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium flex items-center">
                  <Calendar size={14} className="mr-1" /> Date
                </span>
                <span>{new Date(booking.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium flex items-center">
                  <Clock size={14} className="mr-1" /> Time
                </span>
                <span>{booking.startTime} - {booking.endTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Amount</span>
                <span>₹{booking.totalAmount}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-2">
              {booking.status === "completed" && (
                <Button 
                  variant="outline" 
                  onClick={() => handleOpenRebookDialog(booking)}
                  className="transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  Rebook
                </Button>
              )}
              <Button 
                variant="default" 
                className="bg-primary text-white hover:bg-primary/90 transition-all duration-300"
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Rebook Dialog */}
      <Dialog open={rebookDialogOpen} onOpenChange={setRebookDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-futura">Rebook {selectedBooking?.turfName}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <p className="mb-2 text-sm font-medium">Choose a date:</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !rebookDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {rebookDate ? format(rebookDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={rebookDate}
                    onSelect={setRebookDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">Time:</p>
              <p className="text-sm">{selectedBooking?.startTime} - {selectedBooking?.endTime}</p>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">Sport:</p>
              <p className="text-sm">{selectedBooking?.sportName}</p>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">Amount:</p>
              <p className="text-sm">₹{selectedBooking?.totalAmount}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseRebookDialog}>
              Cancel
            </Button>
            <Button onClick={handleRebook} className="bg-primary hover:bg-primary/90">
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default MyBookings;
