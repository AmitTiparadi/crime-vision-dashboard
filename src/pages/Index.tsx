
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  // Redirect to prediction page
  useEffect(() => {
    navigate("/predict");
  }, [navigate]);

  return null;
};

export default Index;
