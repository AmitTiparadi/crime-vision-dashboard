
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { US_STATES, PREDICTION_YEARS } from "@/data/states";
import { getPrediction, PredictionResponse } from "@/utils/api";
import { useToast } from "@/components/ui/use-toast";

interface PredictionFormProps {
  onResult: (result: PredictionResponse, state: string, year: number) => void;
}

export default function PredictionForm({ onResult }: PredictionFormProps) {
  const [state, setState] = useState<string>("");
  const [year, setYear] = useState<number>(2025);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!state) {
      return toast({
        title: "Missing information",
        description: "Please select a state",
        variant: "destructive",
      });
    }
    
    setLoading(true);
    try {
      const data = await getPrediction({ state, year });
      onResult(data, state, year);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full md:max-w-xl mx-auto">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="state" className="text-sm font-medium">
                State
              </label>
              <Select
                value={state}
                onValueChange={setState}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {US_STATES.map((stateName) => (
                      <SelectItem key={stateName} value={stateName}>
                        {stateName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="year" className="text-sm font-medium">
                Year
              </label>
              <Select
                value={year.toString()}
                onValueChange={(val) => setYear(parseInt(val))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {PREDICTION_YEARS.map((y) => (
                      <SelectItem key={y} value={y.toString()}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90"
            disabled={loading}
          >
            {loading ? "Processing..." : "Get Prediction"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
