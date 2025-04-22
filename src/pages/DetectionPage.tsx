
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ImageUploader from "@/components/ImageUploader";
import ObjectDetectionCanvas from "@/components/ObjectDetectionCanvas";
import ObjectsList from "@/components/ObjectsList";
import { Button } from "@/components/ui/button";
import { detectObjects, DetectionResult } from "@/utils/api";
import { Play } from "lucide-react";

export default function DetectionPage() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const handleVideoSelected = (url: string) => {
    setVideoUrl(url);
    setDetectionResult(null);
  };
  
  const runDetection = async () => {
    if (!videoUrl) return;
    
    setIsProcessing(true);
    try {
      const result = await detectObjects(videoUrl);
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
          Enter a video URL and run YOLOv8 detection to identify objects within the video.
        </p>
        
        <div className="grid grid-cols-1 gap-8">
          {!videoUrl ? (
            <ImageUploader onImageSelected={handleVideoSelected} />
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <ObjectDetectionCanvas 
                  imageUrl={videoUrl} 
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
                        setVideoUrl(null);
                        setDetectionResult(null);
                      }}
                    >
                      Add New Video
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
