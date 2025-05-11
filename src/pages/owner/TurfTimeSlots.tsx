
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  daysAvailable: string[];
}

const TurfTimeSlots = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: 1, startTime: "06:00", endTime: "07:00", isAvailable: true, daysAvailable: ["1", "2", "3", "4", "5", "6", "0"] },
    { id: 2, startTime: "07:00", endTime: "08:00", isAvailable: true, daysAvailable: ["1", "2", "3", "4", "5"] },
    { id: 3, startTime: "18:00", endTime: "19:00", isAvailable: true, daysAvailable: ["1", "2", "3", "4", "5", "6", "0"] },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTimeSlot, setNewTimeSlot] = useState<Omit<TimeSlot, "id">>({
    startTime: "08:00",
    endTime: "09:00",
    isAvailable: true,
    daysAvailable: ["1", "2", "3", "4", "5", "6", "0"],
  });
  
  const daysOfWeek = [
    { value: "0", label: "Sunday" },
    { value: "1", label: "Monday" },
    { value: "2", label: "Tuesday" },
    { value: "3", label: "Wednesday" },
    { value: "4", label: "Thursday" },
    { value: "5", label: "Friday" },
    { value: "6", label: "Saturday" },
  ];

  const handleAddTimeSlot = () => {
    // Validate time slot
    if (!newTimeSlot.startTime || !newTimeSlot.endTime || newTimeSlot.daysAvailable.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Add new time slot
    setTimeSlots([
      ...timeSlots,
      {
        id: timeSlots.length > 0 ? Math.max(...timeSlots.map(slot => slot.id)) + 1 : 1,
        ...newTimeSlot,
      },
    ]);
    
    // Reset form and close dialog
    setNewTimeSlot({
      startTime: "08:00",
      endTime: "09:00",
      isAvailable: true,
      daysAvailable: ["1", "2", "3", "4", "5", "6", "0"],
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Time slot added",
      description: "The time slot has been added successfully.",
    });
  };

  const handleDeleteTimeSlot = (id: number) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
    toast({
      title: "Time slot deleted",
      description: "The time slot has been deleted successfully.",
    });
  };

  const handleToggleAvailability = (id: number) => {
    setTimeSlots(
      timeSlots.map(slot => 
        slot.id === id ? { ...slot, isAvailable: !slot.isAvailable } : slot
      )
    );
    
    const slot = timeSlots.find(slot => slot.id === id);
    toast({
      title: `Time slot ${slot?.isAvailable ? "disabled" : "enabled"}`,
      description: `The time slot has been ${slot?.isAvailable ? "disabled" : "enabled"} successfully.`,
    });
  };

  const handleDayToggle = (day: string) => {
    setNewTimeSlot(prev => {
      const isSelected = prev.daysAvailable.includes(day);
      return {
        ...prev,
        daysAvailable: isSelected 
          ? prev.daysAvailable.filter(d => d !== day)
          : [...prev.daysAvailable, day]
      };
    });
  };

  const formatDaysAvailable = (daysAvailable: string[]) => {
    if (daysAvailable.length === 7) return "All days";
    
    const days = daysAvailable.map(day => {
      const dayObj = daysOfWeek.find(d => d.value === day);
      return dayObj?.label.substring(0, 3);
    });
    
    return days.join(", ");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Time Slots</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Time Slot
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {timeSlots.map((slot) => (
          <Card key={slot.id} className={slot.isAvailable ? "border-green-500/30" : "border-gray-500/30"}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="text-lg">
                  {slot.startTime} - {slot.endTime}
                </span>
                <Switch 
                  checked={slot.isAvailable} 
                  onCheckedChange={() => handleToggleAvailability(slot.id)}
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Available on:</p>
              <p>{formatDaysAvailable(slot.daysAvailable)}</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => handleDeleteTimeSlot(slot.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {timeSlots.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No time slots added yet</h3>
          <p className="text-muted-foreground mb-4">Create time slots that users can book for your turf</p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Time Slot
          </Button>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Time Slot</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input 
                  id="startTime" 
                  type="time" 
                  value={newTimeSlot.startTime}
                  onChange={(e) => setNewTimeSlot({...newTimeSlot, startTime: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input 
                  id="endTime"
                  type="time"
                  value={newTimeSlot.endTime}
                  onChange={(e) => setNewTimeSlot({...newTimeSlot, endTime: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Available Days</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {daysOfWeek.map((day) => (
                  <Button
                    key={day.value}
                    type="button"
                    variant={newTimeSlot.daysAvailable.includes(day.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleDayToggle(day.value)}
                  >
                    {day.label.substring(0, 3)}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="available" 
                checked={newTimeSlot.isAvailable}
                onCheckedChange={(checked) => setNewTimeSlot({...newTimeSlot, isAvailable: checked})}
              />
              <Label htmlFor="available">Available for booking</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTimeSlot}>Add Time Slot</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default TurfTimeSlots;
