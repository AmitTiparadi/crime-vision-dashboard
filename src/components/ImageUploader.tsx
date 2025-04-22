
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Video } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ImageUploaderProps {
  onImageSelected: (url: string) => void;
}

export default function ImageUploader({ onImageSelected }: ImageUploaderProps) {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoUrl) {
      toast({
        title: "Error",
        description: "Please enter a video URL",
        variant: "destructive",
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(videoUrl);
      onImageSelected(videoUrl);
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid video URL",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-muted p-3">
              <Video className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-lg font-semibold">Add a video</h3>
              <p className="text-sm text-muted-foreground">
                Enter the URL of your video
              </p>
            </div>
            <Input
              type="url"
              placeholder="https://example.com/video.mp4"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="max-w-md"
            />
            <Button type="submit" className="mt-2">
              <Video className="mr-2 h-4 w-4" />
              Process Video
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
