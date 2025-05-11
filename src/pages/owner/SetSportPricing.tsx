
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { mockSports, getDayName } from "@/data/mockOwnerData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const daysOfWeek = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

interface PriceRange {
  id: number | string;
  startDay: number;
  endDay: number;
  pricePerHour: number;
}

const SetSportPricing = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = id !== "999";
  
  // Find the sport we're editing (or create a new one for add mode)
  const sportToEdit = isEditMode ? mockSports.find(s => s.id === Number(id)) : null;
  
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>(
    sportToEdit?.priceRanges || [
      { id: "new-1", startDay: 1, endDay: 5, pricePerHour: 1000 }, // Monday to Friday
      { id: "new-2", startDay: 6, endDay: 0, pricePerHour: 1500 }, // Saturday and Sunday
    ]
  );
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addPriceRange = () => {
    setPriceRanges([
      ...priceRanges,
      {
        id: `new-${Date.now()}`,
        startDay: 1,
        endDay: 1,
        pricePerHour: 1000,
      }
    ]);
  };

  const removePriceRange = (index: number) => {
    const newPriceRanges = [...priceRanges];
    newPriceRanges.splice(index, 1);
    setPriceRanges(newPriceRanges);
  };

  const updatePriceRange = (index: number, field: keyof PriceRange, value: any) => {
    const newPriceRanges = [...priceRanges];
    newPriceRanges[index] = { ...newPriceRanges[index], [field]: value };
    setPriceRanges(newPriceRanges);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (priceRanges.length === 0) {
      newErrors.general = "At least one price range is required";
    }
    
    // Check for overlapping days
    const daysCovered = new Array(7).fill(false);
    
    priceRanges.forEach((range, index) => {
      if (range.pricePerHour <= 0) {
        newErrors[`price-${index}`] = "Price must be greater than 0";
      }
      
      // Check for day coverage
      let current = range.startDay;
      while (true) {
        if (daysCovered[current]) {
          newErrors[`overlap-${index}`] = "Days cannot overlap between price ranges";
        }
        daysCovered[current] = true;
        
        if (current === range.endDay) break;
        current = (current + 1) % 7;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, we would call an API to update the price ranges
      toast({
        title: isEditMode ? "Pricing updated" : "Sport created",
        description: isEditMode 
          ? "Sport pricing has been updated successfully." 
          : "New sport has been created successfully.",
      });
      
      navigate("/owner/sports");
    }
  };

  const getDayRangeText = (startDay: number, endDay: number) => {
    if (startDay === endDay) {
      return getDayName(startDay);
    } else {
      return `${getDayName(startDay)} - ${getDayName(endDay)}`;
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
        <h1 className="text-3xl font-bold">
          {isEditMode ? "Edit Sport Pricing" : "Set Sport Pricing"}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {isEditMode ? `Update pricing for ${sportToEdit?.name}` : "Step 2: Set Pricing"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                {errors.general}
              </div>
            )}
            
            <div className="space-y-4">
              {priceRanges.map((range, index) => (
                <div key={range.id} className="p-4 border rounded-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">
                      Price Range {index + 1}: {getDayRangeText(range.startDay, range.endDay)}
                    </h3>
                    {priceRanges.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePriceRange(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  {errors[`overlap-${index}`] && (
                    <div className="p-2 mb-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                      {errors[`overlap-${index}`]}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`start-day-${index}`}>Start Day</Label>
                      <select
                        id={`start-day-${index}`}
                        className="w-full h-10 px-3 rounded-md border"
                        value={range.startDay}
                        onChange={(e) => updatePriceRange(index, 'startDay', Number(e.target.value))}
                      >
                        {daysOfWeek.map(day => (
                          <option key={day.value} value={day.value}>
                            {day.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor={`end-day-${index}`}>End Day</Label>
                      <select
                        id={`end-day-${index}`}
                        className="w-full h-10 px-3 rounded-md border"
                        value={range.endDay}
                        onChange={(e) => updatePriceRange(index, 'endDay', Number(e.target.value))}
                      >
                        {daysOfWeek.map(day => (
                          <option key={day.value} value={day.value}>
                            {day.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor={`price-${index}`}>Price per Hour (₹)</Label>
                      <Input
                        id={`price-${index}`}
                        type="number"
                        min="0"
                        value={range.pricePerHour}
                        onChange={(e) => updatePriceRange(index, 'pricePerHour', Number(e.target.value))}
                        className={errors[`price-${index}`] ? 'border-red-500' : ''}
                      />
                      {errors[`price-${index}`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`price-${index}`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addPriceRange}
              className="flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Another Price Range
            </Button>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate("/owner/sports")}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? "Update Pricing" : "Save Sport"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SetSportPricing;
