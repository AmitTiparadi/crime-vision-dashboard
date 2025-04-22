
interface CityData {
  city: string;
  state: string;
}

export const INDIA_CITIES: CityData[] = [
  { city: "Ahmedabad", state: "Gujarat" },
  { city: "Bengaluru", state: "Karnataka" },
  { city: "Chennai", state: "Tamil Nadu" },
  { city: "Coimbatore", state: "Tamil Nadu" },
  { city: "Delhi", state: "Delhi" },
  { city: "Ghaziabad", state: "Uttar Pradesh" },
  { city: "Hyderabad", state: "Telangana" },
  { city: "Indore", state: "Madhya Pradesh" },
  { city: "Jaipur", state: "Rajasthan" },
  { city: "Kanpur", state: "Uttar Pradesh" },
  { city: "Kochi", state: "Kerala" },
  { city: "Kolkata", state: "West Bengal" },
  { city: "Kozhikode", state: "Kerala" },
  { city: "Lucknow", state: "Uttar Pradesh" },
  { city: "Mumbai", state: "Maharashtra" },
  { city: "Nagpur", state: "Maharashtra" },
  { city: "Patna", state: "Bihar" },
  { city: "Pune", state: "Maharashtra" },
  { city: "Surat", state: "Gujarat" }
];

export const PREDICTION_YEARS = Array.from(
  { length: 6 }, 
  (_, i) => 2025 + i
);
