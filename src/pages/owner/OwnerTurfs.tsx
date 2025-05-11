
import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Plus, Trash2, Clock } from "lucide-react";
import { mockTurfs } from "@/data/mockOwnerData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const OwnerTurfs = () => {
  const navigate = useNavigate();
  // For an owner with a single turf, we'll use the first turf from mock data
  const [turf, setTurf] = useState(mockTurfs[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [turfData, setTurfData] = useState({
    name: turf.name,
    address: turf.address,
    city: turf.city,
    description: turf.description,
    basePricePerHour: turf.basePricePerHour,
    imageUrls: [...turf.imageUrls]
  });

  const handleEditTurf = () => {
    setTurfData({
      name: turf.name,
      address: turf.address,
      city: turf.city,
      description: turf.description,
      basePricePerHour: turf.basePricePerHour,
      imageUrls: [...turf.imageUrls]
    });
    setIsEditing(true);
  };

  const handleDeleteTurf = () => {
    // In a real app, we would call an API to delete the turf
    toast({
      title: "Turf deleted",
      description: "The turf has been deleted successfully.",
    });
    setDeleteDialogOpen(false);
    // Reset to empty turf data
    setTurf({
      id: 0,
      name: "",
      address: "",
      city: "",
      description: "",
      basePricePerHour: 0,
      imageUrls: [""],
      ownerId: "owner-123"
    });
  };

  const handleAddImage = () => {
    setTurfData({
      ...turfData,
      imageUrls: [...turfData.imageUrls, ""]
    });
  };

  const handleRemoveImage = (index: number) => {
    const newImageUrls = [...turfData.imageUrls];
    newImageUrls.splice(index, 1);
    setTurfData({
      ...turfData,
      imageUrls: newImageUrls
    });
  };

  const handleImageChange = (index: number, value: string) => {
    const newImageUrls = [...turfData.imageUrls];
    newImageUrls[index] = value;
    setTurfData({
      ...turfData,
      imageUrls: newImageUrls
    });
  };

  const handleSubmit = () => {
    // In a real app, we would call an API to save the turf
    toast({
      title: "Turf updated",
      description: "The turf has been updated successfully.",
    });
    setTurf({
      ...turf,
      name: turfData.name,
      address: turfData.address,
      city: turfData.city,
      description: turfData.description,
      basePricePerHour: turfData.basePricePerHour,
      imageUrls: turfData.imageUrls
    });
    setIsEditing(false);
  };

  const manageTimeSlots = () => {
    navigate("/owner/timeslots");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Your Turf</h1>
        {!turf.name && (
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Your Turf
          </Button>
        )}
      </div>

      {turf.name ? (
        <div className="grid grid-cols-1 gap-6">
          <Card className="overflow-hidden">
            <div className="relative h-64">
              <img 
                src={turf.imageUrls[0]} 
                alt={turf.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">{turf.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="mb-2"><strong>Address:</strong> {turf.address}, {turf.city}</p>
              <p className="mb-2"><strong>Base Price:</strong> ₹{turf.basePricePerHour}/hour</p>
              <p className="text-muted-foreground">{turf.description}</p>
              
              <div className="flex flex-wrap gap-3">
                {turf.imageUrls.slice(1).map((url, index) => (
                  <img 
                    key={index} 
                    src={url} 
                    alt={`${turf.name} view ${index + 2}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => setDeleteDialogOpen(true)}>
                <Trash2 className="h-4 w-4 mr-1" /> Delete
              </Button>
              <Button variant="outline" size="sm" onClick={manageTimeSlots}>
                <Clock className="h-4 w-4 mr-1" /> Manage Time Slots
              </Button>
              <Button size="sm" onClick={handleEditTurf}>
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No turf added yet</h3>
          <p className="text-muted-foreground mb-4">Add your turf to start receiving bookings</p>
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Your Turf
          </Button>
        </div>
      )}

      <Dialog open={isEditing} onOpenChange={(open) => !open && setIsEditing(false)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{turf.name ? "Edit Turf" : "Add Your Turf"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                className="col-span-3"
                value={turfData.name}
                onChange={(e) => setTurfData({ ...turfData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">Address</Label>
              <Input
                id="address"
                className="col-span-3"
                value={turfData.address}
                onChange={(e) => setTurfData({ ...turfData, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">City</Label>
              <Input
                id="city"
                className="col-span-3"
                value={turfData.city}
                onChange={(e) => setTurfData({ ...turfData, city: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="basePrice" className="text-right">Base Price (₹/hr)</Label>
              <Input
                id="basePrice"
                type="number"
                className="col-span-3"
                value={turfData.basePricePerHour}
                onChange={(e) => setTurfData({ ...turfData, basePricePerHour: Number(e.target.value) })}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea
                id="description"
                className="col-span-3"
                rows={4}
                value={turfData.description}
                onChange={(e) => setTurfData({ ...turfData, description: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <div className="text-right">
                <Label>Images</Label>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-xs mt-1" 
                  onClick={handleAddImage}
                >
                  + Add another image
                </Button>
              </div>
              <div className="col-span-3 space-y-2">
                {turfData.imageUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={url}
                      placeholder="Image URL"
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="flex-grow"
                    />
                    {index > 0 && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Turf</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete your turf? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTurf}>
              Delete Turf
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default OwnerTurfs;
