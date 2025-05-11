
import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Plus, Trash2 } from "lucide-react";
import { mockTurfs } from "@/data/mockOwnerData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const OwnerTurfs = () => {
  const [selectedTurf, setSelectedTurf] = useState<typeof mockTurfs[0] | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [turfData, setTurfData] = useState({
    name: "",
    address: "",
    city: "",
    description: "",
    basePricePerHour: 0,
    imageUrls: [""]
  });

  const handleEditTurf = (turf: typeof mockTurfs[0]) => {
    setSelectedTurf(turf);
    setTurfData({
      name: turf.name,
      address: turf.address,
      city: turf.city,
      description: turf.description,
      basePricePerHour: turf.basePricePerHour,
      imageUrls: turf.imageUrls
    });
    setIsEditing(true);
  };

  const handleAddNewTurf = () => {
    setSelectedTurf(null);
    setTurfData({
      name: "",
      address: "",
      city: "",
      description: "",
      basePricePerHour: 0,
      imageUrls: [""]
    });
    setIsEditing(true);
  };

  const handleDeleteTurf = (turfId: number) => {
    // In a real app, we would call an API to delete the turf
    toast({
      title: "Turf deleted",
      description: "The turf has been deleted successfully.",
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
      title: selectedTurf ? "Turf updated" : "Turf added",
      description: selectedTurf ? "The turf has been updated successfully." : "A new turf has been added successfully.",
    });
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Turfs</h1>
        <Button onClick={handleAddNewTurf}>
          <Plus className="mr-2 h-4 w-4" /> Add New Turf
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTurfs.map((turf) => (
          <Card key={turf.id} className="overflow-hidden">
            <div className="relative h-48">
              <img 
                src={turf.imageUrls[0]} 
                alt={turf.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{turf.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2"><strong>Address:</strong> {turf.address}, {turf.city}</p>
              <p className="mb-2"><strong>Base Price:</strong> ₹{turf.basePricePerHour}/hour</p>
              <p className="text-muted-foreground">{turf.description}</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleDeleteTurf(turf.id)}>
                <Trash2 className="h-4 w-4 mr-1" /> Delete
              </Button>
              <Button size="sm" onClick={() => handleEditTurf(turf)}>
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isEditing} onOpenChange={(open) => !open && setIsEditing(false)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTurf ? "Edit Turf" : "Add New Turf"}</DialogTitle>
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
    </motion.div>
  );
};

export default OwnerTurfs;
