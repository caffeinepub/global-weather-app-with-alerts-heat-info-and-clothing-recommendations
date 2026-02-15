import { useQuery } from '@tanstack/react-query';
import type { WeatherData } from '../features/weather/types';

interface Location {
  lat: number;
  lon: number;
}

async function fetchWeatherData(location: Location): Promise<WeatherData> {
  const { lat, lon } = location;
  
  // Fetch current weather and forecast from Open-Meteo API
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&timezone=auto&forecast_days=7`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  const data = await response.json();
  
  return {
    current: {
      temperature: data.current.temperature_2m,
      feelsLike: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      precipitation: data.current.precipitation,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      time: data.current.time,
    },
    daily: {
      time: data.daily.time,
      weatherCode: data.daily.weather_code,
      temperatureMax: data.daily.temperature_2m_max,
      temperatureMin: data.daily.temperature_2m_min,
      precipitationSum: data.daily.precipitation_sum,
      precipitationProbability: data.daily.precipitation_probability_max,
      windSpeedMax: data.daily.wind_speed_10m_max,
    },
    alerts: [], // Open-Meteo free tier doesn't provide alerts
  };
}

export function useWeatherData(location: { lat: number; lon: number } | null) {
  return useQuery<WeatherData>({
    queryKey: ['weather', location?.lat, location?.lon],
    queryFn: () => fetchWeatherData(location!),
    enabled: !!location,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
  });
}
