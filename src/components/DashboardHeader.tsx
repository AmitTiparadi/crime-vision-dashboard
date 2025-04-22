
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

export default function DashboardHeader() {
  const navigate = useNavigate();
  
  return (
    <header className="dashboard-header">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Crime Vision Dashboard</h1>
        <Tabs 
          defaultValue="predict" 
          className="w-[400px]"
          onValueChange={(value) => navigate(`/${value}`)}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="predict">Crime Predictor</TabsTrigger>
            <TabsTrigger value="detect">Object Detection</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
}
