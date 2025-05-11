
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { mockTurfs } from "@/data/mockOwnerData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const AddSport = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    turfId: "",
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.turfId) {
      newErrors.turfId = "Please select a turf";
    }
    
    if (!formData.name.trim()) {
      newErrors.name = "Sport name is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, we would call an API to create the sport
      toast({
        title: "Sport created",
        description: "Now let's set up pricing for this sport.",
      });
      
      // Navigate to pricing setup (in a real app we would use the ID returned by the API)
      navigate("/owner/sports/pricing/999");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Add New Sport</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Step 1: Sport Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="turf">Select Turf</Label>
              <select
                id="turf"
                className={`w-full h-10 px-3 rounded-md border ${errors.turfId ? 'border-red-500' : ''}`}
                value={formData.turfId}
                onChange={(e) => setFormData({ ...formData, turfId: e.target.value })}
              >
                <option value="">-- Select a turf --</option>
                {mockTurfs.map(turf => (
                  <option key={turf.id} value={turf.id}>{turf.name}</option>
                ))}
              </select>
              {errors.turfId && (
                <p className="text-red-500 text-xs">{errors.turfId}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Sport Name</Label>
              <Input
                id="name"
                placeholder="e.g., Football, Badminton"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the sport facilities, rules, or any special features"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-red-500 text-xs">{errors.description}</p>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate("/owner/sports")}>
                Cancel
              </Button>
              <Button type="submit">
                Continue to Pricing
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AddSport;
