export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  time: string;
}

export interface DailyForecast {
  time: string[];
  weatherCode: number[];
  temperatureMax: number[];
  temperatureMin: number[];
  precipitationSum: number[];
  precipitationProbability: number[];
  windSpeedMax: number[];
}

export interface WeatherAlert {
  title: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  description: string;
  startTime: string;
  endTime: string;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast;
  alerts: WeatherAlert[];
}

export type HeatRiskLevel = 'low' | 'moderate' | 'high' | 'extreme';

export interface ClothingRecommendation {
  category: string;
  suggestion: string;
  icon: string;
}
