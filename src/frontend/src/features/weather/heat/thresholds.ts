import type { HeatRiskLevel } from '../types';

export const HEAT_THRESHOLDS = {
  LOW: 25, // Below 25°C
  MODERATE: 30, // 25-30°C
  HIGH: 35, // 30-35°C
  EXTREME: 40, // Above 35°C
} as const;

export function getHeatRiskLevel(temperature: number, feelsLike?: number): HeatRiskLevel {
  const temp = feelsLike ?? temperature;
  
  if (temp >= HEAT_THRESHOLDS.EXTREME) return 'extreme';
  if (temp >= HEAT_THRESHOLDS.HIGH) return 'high';
  if (temp >= HEAT_THRESHOLDS.MODERATE) return 'moderate';
  return 'low';
}

export function getHeatRiskColor(level: HeatRiskLevel): string {
  switch (level) {
    case 'extreme':
      return 'text-destructive';
    case 'high':
      return 'text-orange-600 dark:text-orange-500';
    case 'moderate':
      return 'text-amber-600 dark:text-amber-500';
    case 'low':
      return 'text-emerald-600 dark:text-emerald-500';
  }
}

export function getHeatRiskBgColor(level: HeatRiskLevel): string {
  switch (level) {
    case 'extreme':
      return 'bg-destructive/10 border-destructive';
    case 'high':
      return 'bg-orange-500/10 border-orange-500/50';
    case 'moderate':
      return 'bg-amber-500/10 border-amber-500/50';
    case 'low':
      return 'bg-emerald-500/10 border-emerald-500/50';
  }
}
