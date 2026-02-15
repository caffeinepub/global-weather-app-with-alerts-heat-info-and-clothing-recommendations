import type { HeatRiskLevel } from '../types';
import { getHeatRiskLevel } from '../heat/thresholds';

export interface HeatRiskInfo {
  level: HeatRiskLevel;
  label: string;
  guidance: string[];
}

export function getHeatRiskInfo(temperature: number, feelsLike: number): HeatRiskInfo {
  const level = getHeatRiskLevel(temperature, feelsLike);
  
  const info: Record<HeatRiskLevel, { label: string; guidance: string[] }> = {
    low: {
      label: 'Low Heat Risk',
      guidance: ['Comfortable conditions', 'Normal outdoor activities are safe'],
    },
    moderate: {
      label: 'Moderate Heat',
      guidance: ['Stay hydrated', 'Take breaks in shade during extended outdoor activities'],
    },
    high: {
      label: 'High Heat Risk',
      guidance: [
        'Drink water frequently, even if not thirsty',
        'Limit strenuous outdoor activities',
        'Take frequent breaks in shade or air conditioning',
        'Watch for signs of heat exhaustion',
      ],
    },
    extreme: {
      label: 'Extreme Heat Risk',
      guidance: [
        'Avoid prolonged outdoor exposure',
        'Stay in air-conditioned spaces when possible',
        'Drink water continuously throughout the day',
        'Postpone strenuous activities to cooler times',
        'Check on vulnerable individuals',
      ],
    },
  };
  
  return {
    level,
    ...info[level],
  };
}
