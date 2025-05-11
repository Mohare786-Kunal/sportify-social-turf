import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockBookings, mockTurfs } from "@/data/mockOwnerData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const BookingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  
  // Find the booking based on the ID
  const booking = mockBookings.find(b => b.id === Number(id));
  
  // Fix: Use the correct property name 'id' instead of 'turfId' from the mockTurfs array
  const turf = booking ? mockTurfs.find(t => t.id === booking.turfId) : null;
  
  if (!booking || !turf) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-2xl font-bold mb-4">Booking Not Found</h1>
        <p className="mb-8">The booking you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/owner/bookings")}>Back to Bookings</Button>
      </div>
    );
  }

  const handleCancelBooking = () => {
    // In a real app, we would call an API to cancel the booking
    toast({
      title: "Booking cancelled",
      description: "The booking has been cancelled successfully.",
    });
    setCancelDialogOpen(false);
    navigate("/owner/bookings");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Booking Details</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate("/owner/bookings")}>
            Back to Bookings
          </Button>
          {booking.status !== "cancelled" && (
            <Button variant="destructive" onClick={() => setCancelDialogOpen(true)}>
              Cancel Booking
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
            <CardDescription>Basic details about this booking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <p className="font-medium">Booking ID</p>
              <p>{booking.id}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Sport</p>
              <p>{booking.sportName}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Date</p>
              <p>{booking.date}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Time</p>
              <p>{booking.startTime} - {booking.endTime}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Status</p>
              <span className={`px-2 py-1 rounded-full text-xs ${
                booking.status === 'confirmed' 
                  ? 'bg-green-100 text-green-800' 
                  : booking.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
            <CardDescription>Information about the customer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <p className="font-medium">Name</p>
              <p>{booking.userName}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">User ID</p>
              <p>{booking.userId}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>Information about the payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <p className="font-medium">Total Amount</p>
              <p>₹{booking.totalAmount}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Payment Status</p>
              <span className={`px-2 py-1 rounded-full text-xs ${
                booking.paymentStatus === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : booking.paymentStatus === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Turf Information</CardTitle>
          <CardDescription>Details about the turf</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4">
              <img 
                src={turf.imageUrls[0]} 
                alt={turf.name} 
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
            <div className="md:w-3/4 space-y-2">
              <h3 className="text-xl font-bold">{turf.name}</h3>
              <p><strong>Address:</strong> {turf.address}, {turf.city}</p>
              <p><strong>Base Price:</strong> ₹{turf.basePricePerHour}/hour</p>
              <p className="text-muted-foreground">{turf.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to cancel the booking for {booking.userName} on {booking.date}?
            {booking.paymentStatus === 'completed' && (
              <span className="block mt-2 text-red-500">
                Note: This will initiate a refund process.
              </span>
            )}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              No, Keep It
            </Button>
            <Button variant="destructive" onClick={handleCancelBooking}>
              Yes, Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default BookingDetail;
