
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ImageUploader from "@/components/ImageUploader";
import ObjectDetectionCanvas from "@/components/ObjectDetectionCanvas";
import ObjectsList from "@/components/ObjectsList";
import { Button } from "@/components/ui/button";
import { detectObjects, DetectionResult } from "@/utils/api";
import { Play } from "lucide-react";

export default function DetectionPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const handleImageSelected = (file: File, url: string) => {
    setSelectedImage(file);
    setImageUrl(url);
    setDetectionResult(null);
  };
  
  const runDetection = async () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    try {
      const result = await detectObjects(selectedImage);
      setDetectionResult(result);
    } catch (error) {
      console.error("Detection error:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">Object Detection</h1>
        <p className="mb-8 text-muted-foreground">
          Upload an image and run YOLOv8 detection to identify objects within the image.
        </p>
        
        <div className="grid grid-cols-1 gap-8">
          {!imageUrl ? (
            <ImageUploader onImageSelected={handleImageSelected} />
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <ObjectDetectionCanvas 
                  imageUrl={imageUrl} 
                  detectionResult={detectionResult} 
                />
                {!detectionResult && (
                  <div className="mt-4 flex justify-center">
                    <Button 
                      onClick={runDetection}
                      disabled={isProcessing}
                      size="lg"
                      className="bg-accent hover:bg-accent/90"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {isProcessing ? "Processing..." : "Run Detection"}
                    </Button>
                  </div>
                )}
                {detectionResult && (
                  <div className="mt-4 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedImage(null);
                        setImageUrl(null);
                        setDetectionResult(null);
                      }}
                    >
                      Upload New Image
                    </Button>
                    <Button 
                      onClick={runDetection}
                      disabled={isProcessing}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {isProcessing ? "Processing..." : "Run Again"}
                    </Button>
                  </div>
                )}
              </div>
              <div>
                <ObjectsList detectionResult={detectionResult} />
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
