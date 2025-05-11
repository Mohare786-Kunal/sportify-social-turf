
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Edit, Plus, Trash2 } from "lucide-react";
import { mockSports, mockTurfs, getDayName } from "@/data/mockOwnerData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const OwnerSports = () => {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState<typeof mockSports[0] | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleAddSport = () => {
    navigate("/owner/sports/add");
  };

  const handleEditSport = (sport: typeof mockSports[0]) => {
    navigate(`/owner/sports/pricing/${sport.id}`);
  };

  const handleDeleteSport = () => {
    if (selectedSport) {
      // In a real app, we would call an API to delete the sport
      toast({
        title: "Sport deleted",
        description: `${selectedSport.name} has been deleted successfully.`,
      });
      setDeleteDialogOpen(false);
    }
  };

  // Group sports by turf
  const sportsByTurf: Record<number, typeof mockSports> = {};
  mockSports.forEach(sport => {
    if (!sportsByTurf[sport.turfId]) {
      sportsByTurf[sport.turfId] = [];
    }
    sportsByTurf[sport.turfId].push(sport);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Sports</h1>
        <Button onClick={handleAddSport}>
          <Plus className="mr-2 h-4 w-4" /> Add New Sport
        </Button>
      </div>

      {Object.keys(sportsByTurf).map(turfIdStr => {
        const turfId = parseInt(turfIdStr);
        const turf = mockTurfs.find(t => t.id === turfId);
        const sports = sportsByTurf[turfId];

        return (
          <div key={turfId} className="space-y-4">
            <h2 className="text-2xl font-bold">{turf?.name || "Unknown Turf"}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sports.map(sport => (
                <Card key={sport.id}>
                  <CardHeader>
                    <CardTitle>{sport.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{sport.description}</p>
                    <h4 className="font-semibold mb-2">Pricing:</h4>
                    <div className="space-y-1">
                      {sport.priceRanges.map(range => (
                        <div key={range.id} className="flex justify-between text-sm">
                          <span className="font-medium">
                            {range.startDay === range.endDay 
                              ? getDayName(range.startDay)
                              : `${getDayName(range.startDay)} - ${getDayName(range.endDay)}`}
                          </span>
                          <span>₹{range.pricePerHour}/hour</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setSelectedSport(sport);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                    <Button size="sm" onClick={() => handleEditSport(sport)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit Pricing
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {Object.keys(sportsByTurf).length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No sports added yet</h3>
          <p className="text-muted-foreground mb-4">Add your first sport to start managing bookings</p>
          <Button onClick={handleAddSport}>
            <Plus className="mr-2 h-4 w-4" /> Add New Sport
          </Button>
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Sport</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete {selectedSport?.name}? This cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSport}>
              Delete Sport
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default OwnerSports;
