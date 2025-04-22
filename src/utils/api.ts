
import { toast } from "@/components/ui/use-toast";

const API_BASE_URL = "https://api.example.com"; // Replace with actual API URL

export interface PredictionRequest {
  state: string;
  year: number;
}

export interface PredictionResponse {
  predicted_rate: number;
  historical_data?: { year: number; rate: number }[];
}

export interface DetectionResult {
  boxes: number[][];
  labels: string[];
  scores: number[];
}

export const getPrediction = async (params: PredictionRequest): Promise<PredictionResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/predict?state=${encodeURIComponent(params.state)}&year=${params.year}`
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
    // Return a mock response for development
    return { 
      predicted_rate: Math.random() * 20,
      historical_data: [
        { year: 2023, rate: Math.random() * 20 },
        { year: 2024, rate: Math.random() * 20 },
      ]
    };
  }
};

export const detectObjects = async (imageFile: File): Promise<DetectionResult> => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    
    const response = await fetch(`${API_BASE_URL}/detect`, {
      method: "POST",
      body: formData,
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
