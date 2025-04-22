
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PredictionResponse } from "@/utils/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface PredictionResultProps {
  result: PredictionResponse;
  state: string;
  year: number;
}

export default function PredictionResult({ result, state, year }: PredictionResultProps) {
  // Prepare chart data
  const chartData = result.historical_data || [];
  // Add prediction to chart data if not already present
  if (!chartData.find(item => item.year === year)) {
    chartData.push({ year, rate: result.predicted_rate });
  }
  
  // Sort by year
  const sortedData = [...chartData].sort((a, b) => a.year - b.year);
  
  return (
    <Card className="w-full md:max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-xl">Prediction Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center p-4 bg-muted rounded-md">
            <p className="text-lg">Predicted crime rate for <span className="font-semibold">{state}</span> in <span className="font-semibold">{year}</span>:</p>
            <p className="text-3xl font-bold text-primary mt-2">
              {result.predicted_rate.toFixed(2)}
              <span className="text-lg font-normal text-muted-foreground ml-1">per 100k</span>
            </p>
          </div>
          
          {sortedData.length > 0 && (
            <div className="h-80 w-full">
              <p className="text-sm font-medium mb-2">Historical and Predicted Data</p>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={sortedData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    name="Crime Rate"
                    stroke="#2563eb"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
