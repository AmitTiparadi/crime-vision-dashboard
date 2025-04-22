
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DetectionResult } from "@/utils/api";

interface ObjectDetectionCanvasProps {
  imageUrl: string;
  detectionResult: DetectionResult | null;
}

export default function ObjectDetectionCanvas({ 
  imageUrl, 
  detectionResult 
}: ObjectDetectionCanvasProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw detection boxes
  useEffect(() => {
    if (!imageUrl || !detectionResult || !canvasRef.current || !imageRef.current) {
      return;
    }

    const image = imageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;

    // Function to draw once image is loaded
    const drawDetections = () => {
      // Set canvas dimensions to match image
      canvas.width = image.width;
      canvas.height = image.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw each box
      detectionResult.boxes.forEach((box, i) => {
        const [x1, y1, x2, y2] = box;
        const width = x2 - x1;
        const height = y2 - y1;
        const label = detectionResult.labels[i];
        const score = detectionResult.scores[i];
        
        // Draw box
        ctx.strokeStyle = "#0ea5e9";
        ctx.lineWidth = 3;
        ctx.strokeRect(x1, y1, width, height);
        
        // Draw label background
        ctx.fillStyle = "#0ea5e9";
        const text = `${label} ${(score * 100).toFixed(0)}%`;
        const textMetrics = ctx.measureText(text);
        const textHeight = 20;
        ctx.fillRect(x1, y1 - textHeight, textMetrics.width + 10, textHeight);
        
        // Draw label text
        ctx.fillStyle = "#ffffff";
        ctx.font = "14px Arial";
        ctx.fillText(text, x1 + 5, y1 - 5);
      });
    };

    // Draw when image is loaded
    if (image.complete) {
      drawDetections();
    } else {
      image.onload = drawDetections;
    }
    
    return () => {
      image.onload = null;
    };
  }, [imageUrl, detectionResult]);

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="canvas-container">
          <img
            ref={imageRef}
            src={imageUrl}
            className="w-full h-auto"
            alt="Uploaded for detection"
          />
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
        </div>
      </CardContent>
    </Card>
  );
}
