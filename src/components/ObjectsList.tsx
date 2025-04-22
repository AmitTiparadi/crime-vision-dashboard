
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DetectionResult } from "@/utils/api";
import { List } from "lucide-react";

interface ObjectsListProps {
  detectionResult: DetectionResult | null;
}

export default function ObjectsList({ detectionResult }: ObjectsListProps) {
  if (!detectionResult) {
    return null;
  }
  
  // Get unique labels and count them
  const objectCounts = detectionResult.labels.reduce<Record<string, number>>(
    (acc, label) => {
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    },
    {}
  );
  
  // Convert to array for rendering
  const objectList = Object.entries(objectCounts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
    
  // Get highest confidence per object
  const highestConfidence: Record<string, number> = {};
  detectionResult.labels.forEach((label, index) => {
    const score = detectionResult.scores[index];
    if (!highestConfidence[label] || score > highestConfidence[label]) {
      highestConfidence[label] = score;
    }
  });
  
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <List className="mr-2 h-5 w-5" />
          Detected Objects
        </CardTitle>
      </CardHeader>
      <CardContent>
        {objectList.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No objects detected
          </p>
        ) : (
          <ul className="space-y-2">
            {objectList.map(({ label, count }) => (
              <li key={label} className="flex justify-between p-2 border-b">
                <div className="flex items-center">
                  <span className="font-medium">{label}</span>
                  <span className="ml-2 text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {(highestConfidence[label] * 100).toFixed(0)}% confidence
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
