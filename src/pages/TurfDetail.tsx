import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Phone, Clock, Star, ImagePlus, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TurfDetailParams {
  id: string;
}

interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    userId: "user-1",
    userName: "Rahul Sharma",
    rating: 5,
    comment: "Excellent turf with well-maintained facilities. Highly recommended!",
    date: "2024-07-15"
  },
  {
    id: 2,
    userId: "user-2",
    userName: "Priya Patel",
    rating: 4,
    comment: "Good playing surface and convenient location. Will definitely book again.",
    date: "2024-07-10"
  },
  {
    id: 3,
    userId: "user-3",
    userName: "Amit Kumar",
    rating: 3,
    comment: "The turf was okay, but the lighting could be better. Average experience.",
    date: "2024-07-05"
  },
  {
    id: 4,
    userId: "user-4",
    userName: "Neha Singh",
    rating: 5,
    comment: "Best turf in the city! Impeccable service and top-notch facilities.",
    date: "2024-06-28"
  }
];

const TurfDetail = () => {
  const { id } = useParams<TurfDetailParams>();
  const [turf, setTurf] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState(mockReviews);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTurfData, setEditTurfData] = useState({
    name: "",
    address: "",
    city: "",
    description: "",
    price: 0,
    images: []
  });
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
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
        sports: ["Football", "Cricket"]
      };
      setTurf(mockTurf);

      // Set initial values for edit form
      setEditTurfData({
        name: mockTurf.name,
        address: mockTurf.address,
        city: mockTurf.city,
        description: mockTurf.description,
        price: mockTurf.price,
        images: mockTurf.images
      });
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
      userId: "current-user", // Replace with actual user ID
      userName: "Current User", // Replace with actual user name
      rating: rating,
      comment: comment,
      date: new Date().toISOString().slice(0, 10)
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

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditTurfData({ ...editTurfData, [name]: value });
  };

  const handleSaveTurfDetails = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update turf details with edited data
    setTurf({
      ...turf,
      name: editTurfData.name,
      address: editTurfData.address,
      city: editTurfData.city,
      description: editTurfData.description,
      price: editTurfData.price,
      images: editTurfData.images
    });

    setIsEditModalOpen(false);

    toast({
      title: "Turf details updated",
      description: "The turf details have been updated successfully.",
    });
  };

  const handleOpenAddImage = () => {
    setIsAddingImage(true);
  };

  const handleCloseAddImage = () => {
    setIsAddingImage(false);
    setNewImage("");
  };

  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewImage(e.target.value);
  };

  const handleAddImage = () => {
    if (newImage) {
      setEditTurfData({ ...editTurfData, images: [...editTurfData.images, newImage] });
      setNewImage("");
      setIsAddingImage(false);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...editTurfData.images];
    updatedImages.splice(index, 1);
    setEditTurfData({ ...editTurfData, images: updatedImages });
  };

  const handleOpenBookDialog = () => {
    setIsBookDialogOpen(true);
  };

  const handleCloseBookDialog = () => {
    setIsBookDialogOpen(false);
  };

  const handleBookTurf = () => {
    // Handle booking logic here
    toast({
      title: "Turf booked",
      description: `You have successfully booked ${turf?.name} for ${format(date as Date, "PPP")}.`,
    });
    setIsBookDialogOpen(false);
  };

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
            {turf.images.slice(1).map((image, index) => (
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
          <h1 className="text-3xl font-bold mb-2">{turf.name}</h1>
          <div className="flex items-center mb-4">
            <Star className="text-yellow-500 mr-1" size={20} />
            <span className="text-gray-700">{turf.rating}</span>
            <span className="text-gray-500 ml-2">({reviews.length} reviews)</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="mr-2" size={16} />
            {turf.address}, {turf.city}
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <Phone className="mr-2" size={16} />
            {turf.phone}
          </div>
          <div className="flex items-center text-gray-600 mb-4">
            <Clock className="mr-2" size={16} />
            Opening Hours: {turf.openingHours}
          </div>
          <p className="text-gray-700 mb-4">{turf.description}</p>
          <div className="mb-4">
            <Badge variant="secondary">₹{turf.price} / hour</Badge>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Sports Available:</h3>
            <div className="flex space-x-2">
              {turf.sports.map((sport, index) => (
                <Badge key={index}>{sport}</Badge>
              ))}
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <Button onClick={handleOpenBookDialog}>Book Now</Button>
            <Button variant="secondary" onClick={handleOpenEditModal}>
              Edit Details
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Review Submission Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
        <div className="mb-4">
          <Label>Rating:</Label>
          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <Button
                key={value}
                variant="ghost"
                className={cn(
                  "text-2xl",
                  rating >= value ? "text-yellow-500" : "text-gray-400"
                )}
                onClick={() => handleRatingChange(value)}
                disabled={isSubmitting}
              >
                <Star size={24} />
              </Button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="comment">Comment:</Label>
          <Textarea
            id="comment"
            placeholder="Write your review here..."
            value={comment}
            onChange={handleCommentChange}
            disabled={isSubmitting}
          />
        </div>
        <Button onClick={handleSubmitReview} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </div>

      <Separator className="my-8" />

      {/* Display Reviews Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to leave a review!</p>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="mb-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {review.userName}
                  <span className="ml-2 text-sm text-gray-500">
                    - {new Date(review.date).toLocaleDateString()}
                  </span>
                </CardTitle>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className={cn(
                        "mr-0.5",
                        review.rating >= value ? "text-yellow-500" : "text-gray-400"
                      )}
                      size={16}
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{review.comment}</CardDescription>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Turf Details Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Turf Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={editTurfData.name}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={editTurfData.address}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                City
              </Label>
              <Input
                type="text"
                id="city"
                name="city"
                value={editTurfData.city}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={editTurfData.price}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={editTurfData.description}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Images</Label>
              <div className="col-span-3 space-y-2">
                {editTurfData.images.map((image, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      type="text"
                      value={image}
                      readOnly
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <AlertTriangle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={handleOpenAddImage}>
                  Add Image
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={handleCloseEditModal}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveTurfDetails}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Image Modal */}
      <Dialog open={isAddingImage} onOpenChange={setIsAddingImage}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Image</DialogTitle>
            {/* <DialogDescription>Add a new image URL for the turf.</DialogDescription> */}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newImage" className="text-right">
                Image URL
              </Label>
              <Input
                type="text"
                id="newImage"
                value={newImage}
                onChange={handleNewImageChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={handleCloseAddImage}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddImage}>
              Add Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Book Turf Dialog */}
      <Dialog open={isBookDialogOpen} onOpenChange={setIsBookDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book {turf.name}</DialogTitle>
            {/* <DialogDescription>Choose a date to book this turf.</DialogDescription> */}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start" side="bottom">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) =>
                    date < new Date()
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={handleCloseBookDialog}>
              Cancel
            </Button>
            <Button type="button" onClick={handleBookTurf} disabled={!date}>
              Book Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default TurfDetail;
