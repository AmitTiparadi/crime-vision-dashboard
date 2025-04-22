import { toast } from "@/components/ui/use-toast";

const API_BASE_URL = "https://YOUR_PROJECT.supabase.co/functions/v1"; // Replace with your actual Supabase project URL

export interface PredictionRequest {
  state: string;
  city: string;
  year: number;
}

export interface PredictionResponse {
  predicted_rate: number;
  historical_data?: { year: number; rate: number }[];
}

export const getPrediction = async (params: PredictionRequest): Promise<PredictionResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/predict-crime-rate?state=${encodeURIComponent(params.state)}&city=${encodeURIComponent(params.city)}&year=${params.year}`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    toast({
      title: "Error fetching prediction",
      description: error instanceof Error ? error.message : "Unknown error",
      variant: "destructive",
    });
    
    // Fallback mock response
    return { 
      predicted_rate: Math.random() * 20,
      historical_data: [
        { year: 2023, rate: Math.random() * 20 },
        { year: 2024, rate: Math.random() * 20 },
      ]
    };
  }
};

export const detectObjects = async (videoUrl: string): Promise<DetectionResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/detect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoUrl }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    toast({
      title: "Error running detection",
      description: error instanceof Error ? error.message : "Unknown error",
      variant: "destructive",
    });
    // Return mock data for development
    return {
      boxes: [[100, 100, 200, 200], [300, 300, 400, 400]],
      labels: ["person", "car"],
      scores: [0.92, 0.85]
    };
  }
};
