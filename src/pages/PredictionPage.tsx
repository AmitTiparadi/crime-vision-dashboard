
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PredictionForm from "@/components/PredictionForm";
import PredictionResult from "@/components/PredictionResult";
import { PredictionResponse } from "@/utils/api";

export default function PredictionPage() {
  const [predictionResult, setPredictionResult] = useState<PredictionResponse | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  
  const handlePredictionResult = (result: PredictionResponse, city: string, state: string, year: number) => {
    setPredictionResult(result);
    setSelectedCity(city);
    setSelectedState(state);
    setSelectedYear(year);
  };
  
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">Crime Rate Predictor</h1>
        <p className="mb-8 text-muted-foreground">
          Enter a city and year to get a prediction of the crime rate for that location and time period.
        </p>
        
        <div className="grid grid-cols-1 gap-8">
          <PredictionForm onResult={handlePredictionResult} />
          
          {predictionResult && (
            <PredictionResult
              result={predictionResult}
              city={selectedCity}
              state={selectedState}
              year={selectedYear}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
