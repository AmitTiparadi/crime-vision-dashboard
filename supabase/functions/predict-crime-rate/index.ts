
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  // Parse request parameters
  const url = new URL(req.url)
  const state = url.searchParams.get('state')
  const city = url.searchParams.get('city')
  const year = url.searchParams.get('year')

  // Basic validation
  if (!state || !city || !year) {
    return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    // Simple prediction logic (replace with actual ML model later)
    const baseRate = 100 // Base crime rate
    const yearOffset = parseInt(year) - 2025 // Adjust prediction based on year
    const stateModifier = getStateModifier(state)
    const cityModifier = getCityModifier(city)

    const predictedRate = Math.max(0, baseRate + yearOffset * 2 + stateModifier + cityModifier)

    // Generate some mock historical data
    const historicalData = generateHistoricalData(parseInt(year), predictedRate)

    return new Response(JSON.stringify({
      predicted_rate: predictedRate,
      historical_data: historicalData
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})

function getStateModifier(state: string): number {
  const stateModifiers: { [key: string]: number } = {
    'Maharashtra': 10,
    'Delhi': 15,
    'Karnataka': 5,
    'Tamil Nadu': 8,
    'Gujarat': 6,
    // Add more states with their crime rate modifiers
    'default': 0
  }
  return stateModifiers[state] || stateModifiers['default']
}

function getCityModifier(city: string): number {
  const cityModifiers: { [key: string]: number } = {
    'Mumbai': 12,
    'Delhi': 18,
    'Bengaluru': 7,
    'Chennai': 10,
    'Hyderabad': 9,
    // Add more cities with their specific crime rate modifiers
    'default': 0
  }
  return cityModifiers[city] || cityModifiers['default']
}

function generateHistoricalData(currentYear: number, currentRate: number) {
  return Array.from({ length: 5 }, (_, i) => ({
    year: currentYear - i - 1,
    rate: Math.max(0, currentRate - i * Math.random() * 5)
  }))
}
