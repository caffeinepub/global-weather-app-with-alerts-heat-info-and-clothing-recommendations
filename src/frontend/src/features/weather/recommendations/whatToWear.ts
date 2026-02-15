import type { CurrentWeather, DailyForecast, ClothingRecommendation } from '../types';
import { getHeatRiskLevel } from '../heat/thresholds';

export function generateClothingRecommendations(
  current: CurrentWeather,
  daily: DailyForecast
): ClothingRecommendation[] {
  const recommendations: ClothingRecommendation[] = [];
  const temp = current.temperature;
  const feelsLike = current.feelsLike;
  const precipitation = current.precipitation;
  const heatRisk = getHeatRiskLevel(temp, feelsLike);

  // Base clothing
  if (temp < 0) {
    recommendations.push({
      category: 'Base Layers',
      suggestion: 'Heavy winter coat, thermal layers, warm sweater',
      icon: '🧥',
    });
  } else if (temp < 10) {
    recommendations.push({
      category: 'Base Layers',
      suggestion: 'Jacket or coat, long sleeves, layered clothing',
      icon: '🧥',
    });
  } else if (temp < 20) {
    recommendations.push({
      category: 'Base Layers',
      suggestion: 'Light jacket or sweater, comfortable layers',
      icon: '👕',
    });
  } else if (temp < 30) {
    recommendations.push({
      category: 'Base Layers',
      suggestion: 'Light, breathable clothing, short sleeves',
      icon: '👕',
    });
  } else {
    recommendations.push({
      category: 'Base Layers',
      suggestion: 'Very light, loose-fitting clothing in light colors',
      icon: '👕',
    });
  }

  // Rain gear
  if (precipitation > 0 || (daily.precipitationProbability[0] ?? 0) > 50) {
    recommendations.push({
      category: 'Rain Protection',
      suggestion: 'Waterproof jacket, umbrella, water-resistant footwear',
      icon: '☔',
    });
  }

  // Footwear
  if (temp < 0) {
    recommendations.push({
      category: 'Footwear',
      suggestion: 'Insulated winter boots with good traction',
      icon: '👢',
    });
  } else if (precipitation > 0) {
    recommendations.push({
      category: 'Footwear',
      suggestion: 'Waterproof shoes or boots',
      icon: '👢',
    });
  } else if (temp > 25) {
    recommendations.push({
      category: 'Footwear',
      suggestion: 'Breathable, comfortable shoes or sandals',
      icon: '👟',
    });
  } else {
    recommendations.push({
      category: 'Footwear',
      suggestion: 'Comfortable walking shoes',
      icon: '👟',
    });
  }

  // Heat-focused recommendations
  if (heatRisk === 'high' || heatRisk === 'extreme') {
    recommendations.push({
      category: 'Heat Safety',
      suggestion: 'Wide-brimmed hat, sunglasses, apply sunscreen regularly',
      icon: '🧢',
    });
    recommendations.push({
      category: 'Hydration',
      suggestion: 'Carry water bottle, drink frequently, avoid prolonged sun exposure',
      icon: '💧',
    });
  } else if (heatRisk === 'moderate') {
    recommendations.push({
      category: 'Sun Protection',
      suggestion: 'Hat or cap, sunglasses recommended, stay hydrated',
      icon: '🧢',
    });
  }

  // Wind
  if (current.windSpeed > 30) {
    recommendations.push({
      category: 'Wind Protection',
      suggestion: 'Windbreaker or wind-resistant outer layer',
      icon: '🌬️',
    });
  }

  return recommendations;
}
